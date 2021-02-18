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

class Jedi 
{
    public const SIDE_OF_THE_FORCE = 'light';
}
```

But, the first requirement of your class property, as previously said, is that it has to be unchangeable.  
So, before using class constants, you need to be aware that every child class is allowed to redefine inherited constants.   
This means that, the following code, is correct

```php
<?php
declare(strict_types=1);

class Master 
{
    public const SIDE_OF_THE_FORCE = 'light';
}

class Padawan extends Master 
{
    public const SIDE_OF_THE_FORCE = 'dark';
}
```

Is that a proper behaviour?  
That's the question that backs the not yet accepted [proposal to forbid constants overriding](https://github.com/phpstan/phpstan-strict-rules/issues/37) via [PHPStan](https://phpstan.org).  
It depends on what kind of approach to programming you have. It's not in question that constants shouldn't be allowed to change (that's why they are called "constants") but maybe you could see this PHP feature like a curious implementation of [OTP (one-time programmability)](https://en.wikipedia.org/wiki/Programmable_ROM) on a per-class basis. In fact if you notice, every derived class can override the constant only once.

# Constants access

But, let's step back, how does class constants access work?  
You can't use the object operator `->` neither the pseudo-variable `$this`. PHP has another token, the scope resolution operator `::`, that from within an object context, needs to be combined with keywords like `self`, `parent` or `static`. Let's just focus on `self` for now, we'll come back later to this topic.  

# Using final

So, you still need your constant but, since you are not sure that it can't be changed, maybe you don't feel comfortable.  
Of course you could try to take advantage of `final` by creating a class that carries the constant you need and ensures that it can't be changed. But, since a final class can't be extended, inevitably you would need to do something awkward, like this

```php
<?php
declare(strict_types=1);

final class Jedi 
{
    public const SIDE_OF_THE_FORCE = 'light';
}

class Master 
{
    public function useTheForce(): string 
    {
        return Jedi::SIDE_OF_THE_FORCE;
    }
}
```

# Interface constants

PHP provides you with another powerful feature: interface constants.  
According to [PHP documentation](https://www.php.net/manual/en/language.oop5.interfaces.php#language.oop5.interfaces.constants), it's possible for interfaces to have constants and they can't be overridden by a class/interface that inherits them.  
So you can define an interface constant, like this

```php
<?php
declare(strict_types=1);

interface JediInterface 
{
    public const SIDE_OF_THE_FORCE = 'light';
}
```

But you can't override it, in fact the following code

```php
<?php
declare(strict_types=1);

interface JediInterface 
{
    public const SIDE_OF_THE_FORCE = 'light';
}

class Padawan implements JediInterface 
{
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

interface JediInterface 
{
    public const SIDE_OF_THE_FORCE = 'light';
}

class Master implements JediInterface 
{
}

class Padawan extends Master 
{
    public const SIDE_OF_THE_FORCE = 'dark';

    public function useTheForce(): string 
    {
        return self::SIDE_OF_THE_FORCE;
    }
}

$anakin = new Padawan();
echo $anakin->useTheForce(); 
// dark
```

This piece of code doesn't output any error.  
It turns out that a derived class from a super class that implements an interface, can override the interface constants, despite the super class can't.  
And in fact, if you make the derived class implement the interface likewise

```php
<?php
declare(strict_types=1);

interface JediInterface 
{
    public const SIDE_OF_THE_FORCE = 'light';
}

class Master implements JediInterface 
{
}

class Padawan extends Master implements JediInterface 
{
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
So, to get a sense of how things really are, we can just take a look to PHP source code, to *Zend/zend_inheritance.c* in particular.  
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

And here is where the check is called (*zend_do_implement_inferface()*)

```c
/* Check for attempt to redeclare interface constants */
ZEND_HASH_FOREACH_STR_KEY_PTR(&ce->constants_table, key, c) {
    do_inherit_constant_check(&iface->constants_table, c, key, iface);
} ZEND_HASH_FOREACH_END();
```

So the point is that the check (*do_inherit_constant_check()*) is called by a function (*zend_do_implement_interface()*) which is simply not called for implementors derived classes.  
Besides, PHP source code lists seven tests for interface constants inheritance and all of them only test direct inheritance.  
So, there's nothing that could make us think it's not a wanted (or tolerated) behaviour.

# Late static bindings

Anyway, is that a problem?  
For sure, knowing how [late static bindings](https://www.php.net/manual/en/language.oop5.late-static-bindings.php) feature works, can help you to avoid risky practices.  
Take a look to the following code

```php
<?php
declare(strict_types=1);

interface JediInterface 
{
    public const SIDE_OF_THE_FORCE = 'light';
    
    public function useTheForce(): string;
}

class Master implements JediInterface 
{
    public function useTheForce(): string 
    {
        return self::SIDE_OF_THE_FORCE;
    } 
}

class Padawan extends Master 
{
    public const SIDE_OF_THE_FORCE = 'dark';
}

$obiwan = new Master();
echo $obiwan->useTheForce(); 
// light
$anakin = new Padawan();
echo $anakin->useTheForce(); 
// light
```

It appears that the super class (in which the method *useTheForce()* belongs) is able to keep unchanged its constant.  
But what happens if you make a small change to the previous example?   
Try to change the access to the constant by replacing `self` with `static` this way

```php
<?php
declare(strict_types=1);

interface JediInterface 
{
    public const SIDE_OF_THE_FORCE = 'light';
    
    public function useTheForce(): string;
}

class Master implements JediInterface 
{
    public function useTheForce(): string 
    {
        return static::SIDE_OF_THE_FORCE;
    } 
}

class Padawan extends Master 
{
    public const SIDE_OF_THE_FORCE = 'dark';
}

$obiwan = new Master();
echo $obiwan->useTheForce(); 
// light
$anakin = new Padawan();
echo $anakin->useTheForce(); 
// dark
```

That's how late static bindings feature works.  
`self`, being a static reference to the current class, is resolved using the class in which the method belongs.  
On the other hand, late static bindings feature with the keyword `static` goes beyond that limitation, by referencing the class that was initally called at runtime.  
Is it safe to use late stating bindings with constants?  
Again, it's probably a matter of approach. Constants shouldn't be allowed to change, but in case, be sure that the things you do can't reveal unpleasant surprises. If you expect to get the light side of the force and you get the dark side, you could be disappointed.

# What the future holds...

It's a fact that, [Enumerations](https://wiki.php.net/rfc/enumerations) are going to become a real thing with version 8.1.  
So after that release, we will be able to write something like this  

```php
<?php
declare(strict_types=1);

enum Force: string 
{
    case LIGHT_SIDE = 'light';
    case DARK_SIDE = 'dark';
}

echo Force::LIGHT_SIDE->value;
// light
```

Why are we talking about that? Because Enumerations values are read-only properties and it could be interesting.
It is worth to say that Enumerations are much more than that, since they are built on top of classes and objects, so they can have costants, but methods too, they can implement interfaces and so on.  
It means that it will be possible writing something like that

```php
<?php
declare(strict_types=1);

enum Force
{
    case LIGHT_SIDE;
    case DARK_SIDE;
    
    public function control(): string 
    {
        return match($this) {
            self::LIGHT_SIDE => 'light',   
            self::DARK_SIDE => 'dark'
        }
    }
}

class Jedi
{
    private Force $force;

    public __construct(Force $force) 
    {
        $this->force = $force;
    }

    public function useTheForce(): string 
    {
        return $this->force->control();
    }
}

$force = Force::LIGHT_SIDE;
$obiwan = new Jedi($force);
echo $obiwan->useTheForce();
// light
```

# Conclusion

Constants should be the last concerns for developers, in PHP too. Nonetheless they carry with them a lot of situations that a developer needs to consider.  
Without claiming to be exhaustive, this article just gives a quick overview of the most common ones, trying to be a starting point to deepen the topic.
