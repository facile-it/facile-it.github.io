---
authors: ["amaccis"]
comments: true
date: "2021-02-07"
draft: false
share: true
categories: [English, PHP, OOP]
title: "Careful with that constant, developer"
languageCode: "en-EN"
type: "post"
toc: true
---

# Introduction

It may not seem like it, but there are a few interesting things to say about constants in PHP.  
Imagine you need to define a class property that can't be changed and doesn't belong to a particular instance, since you need this property to be shared between all the instances of its object.  
Something you would write, for instance in Java, using `static final`.  
PHP, at present (version 8.0.2) allows [`final`](https://engineering.facile.it/blog/eng/from-zero-to-infinite-the-final-keyword/) only for classes and methods, so there's no chance to use it for properties. That's why constants exist.  

# Class constants

According to [PHP documentation](https://www.php.net/manual/en/language.oop5.constants.php) you can define constants on a per-class basis, using `const`.  
So, you probably should get the result you want this way

```php
<?php
declare(strict_types=1);

class Jedi {
    public const SIDE_OF_THE_FORCE = 'light';
}
```

But, the first requirement of your class property, as previously said, is that it has to be unchangeable.  
So, before using class constants, you need to be aware that every child class is allowed to redefine inherited constants.   
This means that, the following code, is correct

```php
<?php
declare(strict_types=1);

class Master {
    public const SIDE_OF_THE_FORCE = 'light';
}

class Padawan extends Master {
    public const SIDE_OF_THE_FORCE = 'dark';
}
```

And, you need to consider that.  
But, let's step back, how does accessing class constants work?  
You can't use the object operator `->` neither the pseudo-variable `$this`. PHP has another token, the scope resolution operator `::`, that from within an object context, needs to be combined with keywords like `self`, `parent` or `static`. Let's just focus on `self` for now, we'll come back later to this topic.  

# Using final

So, you still need your constant but, since you are not sure yet that it can't be changed, you don't feel comfortable.  
Of course you could try to take advantage of `final` by creating a class that carries the constant you need and ensures that it can't be changed. But, since a final class can't be extended, inevitably you would need to do something awkward, like this

```php
<?php
declare(strict_types=1);

final class Jedi {
    public const SIDE_OF_THE_FORCE = 'light';
}

class Master {
    public function useTheForce(): string {
        return Jedi::SIDE_OF_THE_FORCE;
    }
}
```

# Interface constants

PHP provides you with another powerful tool: interface constants.  
According to [PHP documentation](https://www.php.net/manual/en/language.oop5.interfaces.php#language.oop5.interfaces.constants), it's possible for interfaces to have constants and they can't be overridden by a class/interface that inherits them.  
So you can define an interface constant, like this

```php
<?php
declare(strict_types=1);

interface JediInterface {
    public const SIDE_OF_THE_FORCE = 'light';
}
```

But you can't override it, in fact the following code

```php
<?php
declare(strict_types=1);

interface JediInterface {
    public const SIDE_OF_THE_FORCE = 'light';
}

class Padawan implements JediInterface {
    public const SIDE_OF_THE_FORCE = 'dark';
}
```

outputs a fatal error

```
Fatal error: Cannot inherit previously-inherited or override constant SIDE_OF_THE_FORCE from interface JediInterface in [...]
```

So, it seems you came to an end.   
You have your property, it can't be changed, it doesn't belong to a particular instance.  
However, it's not that simple.  

# An unexpected behaviour

Take a look to this code

```php
<?php
declare(strict_types=1);

interface JediInterface {
    public const SIDE_OF_THE_FORCE = 'light';
}

class Master implements JediInterface {
}

class Padawan extends Master {
    public const SIDE_OF_THE_FORCE = 'dark';

    public function useTheForce(): string {
        return self::SIDE_OF_THE_FORCE;
    }
}

$anakin = new Padawan();
echo $anakin->useTheForce(); // returns dark
```
This piece of code doesn't output any error.  
It turns out that a derived class from a super class that implements an interface, can override the interface constants, despite the super class can't.  
And in fact, if you make the derived class implement the interface likewise
```php
<?php
declare(strict_types=1);

interface JediInterface {
    public const SIDE_OF_THE_FORCE = 'light';
}

class Master implements JediInterface {
}

class Padawan extends Master implements JediInterface {
    public const SIDE_OF_THE_FORCE = 'dark';
}
```

you get again a fatal error

```
Fatal error: Cannot inherit previously-inherited or override constant SIDE_OF_THE_FORCE from interface JediInterface in [...]
```

So, bug or feature?  
It's a fair question, bearing in mind that PHPStorm static analysis tool, currently reports always as an error the attempt to redefine an interface constant, even if it's redefined by a child class that doesn't implement directly the interface.  
Recently, they opened [an issue on JetBrains tracking system](https://youtrack.jetbrains.com/issue/WI-56949) asking to fix PHPStorm static analysis tool, since it should be a false positive.  
For the sake of completeness, it must be said that a few years ago, they opened [an issue on PHP bug traking system](https://bugs.php.net/bug.php?id=73348) too, (version 7.0.12) asking for the opposite, that is asking to fix the behaviour by applying the inheritance check to derived classes too.  
So, to get a sense of how things really are, we can just take a look to PHP source code, to Zend/zend_inheritance.c in particular.  
This is how PHP does the inheritance check

```c
static bool do_inherit_constant_check(HashTable *child_constants_table, zend_class_constant *parent_constant, zend_string *name, const zend_class_entry *iface) /* {{{ */
{
	zval *zv = zend_hash_find_ex(child_constants_table, name, 1);
	zend_class_constant *old_constant;

	if (zv != NULL) {
		old_constant = (zend_class_constant*)Z_PTR_P(zv);
		if (old_constant->ce != parent_constant->ce) {
			zend_error_noreturn(E_COMPILE_ERROR, "Cannot inherit previously-inherited or override constant %s from interface %s", ZSTR_VAL(name), ZSTR_VAL(iface->name));
		}
		return 0;
	}
	return 1;
}
/* }}} */
```

And this is where the check is called

```c
ZEND_API void zend_do_implement_interface(zend_class_entry *ce, zend_class_entry *iface) /* {{{ */
{
	uint32_t i, ignore = 0;
	uint32_t current_iface_num = ce->num_interfaces;
	uint32_t parent_iface_num  = ce->parent ? ce->parent->num_interfaces : 0;
	zend_string *key;
	zend_class_constant *c;

	ZEND_ASSERT(ce->ce_flags & ZEND_ACC_LINKED);

	for (i = 0; i < ce->num_interfaces; i++) {
		if (ce->interfaces[i] == NULL) {
			memmove(ce->interfaces + i, ce->interfaces + i + 1, sizeof(zend_class_entry*) * (--ce->num_interfaces - i));
			i--;
		} else if (ce->interfaces[i] == iface) {
			if (EXPECTED(i < parent_iface_num)) {
				ignore = 1;
			} else {
				zend_error_noreturn(E_COMPILE_ERROR, "Class %s cannot implement previously implemented interface %s", ZSTR_VAL(ce->name), ZSTR_VAL(iface->name));
			}
		}
	}
	if (ignore) {
		/* Check for attempt to redeclare interface constants */
		ZEND_HASH_FOREACH_STR_KEY_PTR(&ce->constants_table, key, c) {
			do_inherit_constant_check(&iface->constants_table, c, key, iface);
		} ZEND_HASH_FOREACH_END();
	} else {
		if (ce->num_interfaces >= current_iface_num) {
			if (ce->type == ZEND_INTERNAL_CLASS) {
				ce->interfaces = (zend_class_entry **) realloc(ce->interfaces, sizeof(zend_class_entry *) * (++current_iface_num));
			} else {
				ce->interfaces = (zend_class_entry **) erealloc(ce->interfaces, sizeof(zend_class_entry *) * (++current_iface_num));
			}
		}
		ce->interfaces[ce->num_interfaces++] = iface;

		do_interface_implementation(ce, iface);
	}
}
/* }}} */
```

So the point is that the check (do_inherit_constant_check()) in called by a function (zend_do_implement_interface()) which is simply not called for implementors derived classes.  
Besides, PHP source code lists seven tests for interface constants inheritance and all of them only test direct inheritance.  
So, there's nothing that could make us think it's not a wanted (or tolerated) behaviour.

# Late state bindings

Anyway, is that a real problem?  
For sure, knowing how [late state bindings](https://www.php.net/manual/en/language.oop5.late-static-bindings.php) feature works, can help us to get an idea.  
Take a look to the following example

```php
<?php
declare(strict_types=1);

interface JediInterface {
    public const SIDE_OF_THE_FORCE = 'light';
    
    public function useTheForce(): string;
}

class Master implements JediInterface {
    public function useTheForce(): string {
        return self::SIDE_OF_THE_FORCE;
    } 
}

class Padawan extends Master {
    public const SIDE_OF_THE_FORCE = 'dark';
}

$obiwan = new Master();
echo $obiwan->useTheForce(); // returns light
$anakin = new Padawan();
echo $anakin->useTheForce(); // returns light
```

It appears that the super class (in which the method useTheForce() belongs) is able to keep unchanged its constant.  
But what happens if you make a small change to the previous example?   
Try to change the access to the constant by replacing `self` with `static` this way

```php
<?php
declare(strict_types=1);

interface JediInterface {
    public const SIDE_OF_THE_FORCE = 'light';
    
    public function useTheForce(): string;
}

class Master implements JediInterface {
    public function useTheForce(): string {
        return static::SIDE_OF_THE_FORCE;
    } 
}

class Padawan extends Master {
    public const SIDE_OF_THE_FORCE = 'dark';
}

$obiwan = new Master();
echo $obiwan->useTheForce(); // returns light
$anakin = new Padawan();
echo $anakin->useTheForce(); // returns dark
```

That's how late static bindings feature works.  
`self`, being a static reference to the current class, is resolved using the class in which the method belongs.  
On the other hand, late state bindings feature with the keyword `static` goes beyond that limitation, by referencing the class that was initally called at runtime.

# Conclusion

Constants should be the less worrying thing for developers, in PHP too. Nonetheless they carry with them a lot of situations that a developer needs to consider.  
Without claiming to be exhaustive, this article just gives a quick overview of the most common ones, trying to be a starting point to deepen the topic.
