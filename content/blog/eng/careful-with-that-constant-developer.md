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

Imagine you need to use a fixed numeric value in your code, let's say 20000. It's what we call a *literal constant*, that is a value that will always remain the exact same in your code. 
So, now image you need to use that value more than once. Sooner or later, you'll read your code and you won't remember what 20000 was about. It's a fact. But what if you assign the value to an immutable variable with a [meaningful name](https://en.wikipedia.org/wiki/Self-documenting_code)? Let's say something like this

```
MAXIMUM_MIDICHLORIAN_COUNT = 20000 
```

It's different isn't it? By reading the name, you are immediately able to understand what its value is about. MAXIMUM_MIDICHLORIAN_COUNT it's what we call a *named constant* or simply a constant.  
So, why do we use constants? As you just saw, it's a matter of readability. But there's more.  
Let's say you have a function or a method that takes an argument and does something with it. For example, the argument could be a number and based on its value, the function could behave differently.
Take a look at the following code

```php
<?php
declare(strict_types=1);

class JediTest
{
    public function midichlorianCount(int $midichlorian): string
    {
        if($midichlorian > 20000) {
            return "The chosen one, the boy may be!"
        }
        return "Just a regular Jedi...";
    }
}
```

Remeber? 20000 was the value of MAXIMUM_MIDICHLORIAN_COUNT, so we should have used that named constant insted of the literal one.  
Again, why do we use constants? As you just saw, constants could be very useful to represent boundaries or edge cases.  
And there would be more, but just focus on the fact that we assign certain values to immutable variables instead of simple variables. Why is that? Because we need the programming language protects us from the possibility that our value is changed.  
So finally, why do we use constants? For sure it's a matter of safety.  
Programming languages have their own way to identify something that can't be changed, for example C++ uses `const` and Java uses `final`.  
It may not seem like it, but there are a few interesting things to say about constants in PHP.  

# Global scope constants

The easiest way to set a constant is using [global scope constants](https://www.php.net/manual/en/language.constants.php).  
With the keyword `define` you can do something like that

```php
<?php
declare(strict_types=1);

define('LIGHT_SIDE_OF_THE_FORCE', 'light');
define('DARK_SIDE_OF_THE_FORCE', 'dark');

echo LIGHT_SIDE_OF_THE_FORCE;
// light
echo DARK_SIDE_OF_THE_FORCE;
// dark
```

But let's say you don't need a global scope constant since you have a class hierarchy and you need a constant that doesn't belong to a particular instance, you need it to be shared between all the instances of its object.  
Something you would write, for instance in Java, using a `static final` field.  
PHP, at present (version 8.0.2) allows [`final`](https://engineering.facile.it/blog/eng/from-zero-to-infinite-the-final-keyword/) only for classes and methods and that's why class constants exist.  

# Class constants

According to [PHP documentation](https://www.php.net/manual/en/language.oop5.constants.php) you can define constants on a per-class basis, using the keyword `const`.  
So, you probably should get the result you want this way  

```php
<?php
declare(strict_types=1);

class Jedi 
{
    protected const SIDE_OF_THE_FORCE = 'light';
}
```

But we said that a constant needs to be unchangeable.  
So, before using class constants, you need to be aware that every child class is allowed to redefine inherited constants.   
This means that, the following code, is correct

```php
<?php
declare(strict_types=1);

class Master 
{
    protected const SIDE_OF_THE_FORCE = 'light';
}

class Padawan extends Master 
{
    protected const SIDE_OF_THE_FORCE = 'dark';
}
```

Is that a proper behaviour?  
That's the question that backs the not yet accepted [proposal to forbid constants overriding](https://github.com/phpstan/phpstan-strict-rules/issues/37) via [PHPStan](https://phpstan.org).  
It depends on what kind of approach to programming you have. It's not in question that constants shouldn't be allowed to change, it's a matter of safety, we said. But maybe you could see this PHP feature like a curious implementation of [OTP (one-time programmability)](https://en.wikipedia.org/wiki/Programmable_ROM) on a per-class basis. In fact if you notice, every derived class can override the constant only once.

# Constants access

But, let's step back, how does class constants access work?  
You can't use the object operator `->` neither the pseudo-variable `$this`. PHP has another token, the scope resolution operator `::`, that from within an object context, needs to be combined with the keywords `self`, `parent` or `static`. Let's just focus on `self` for now, we'll come back later to this topic.  

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

This kind of approach is one of the alternatives you can use to avoid [Constant interface](https://en.wikipedia.org/wiki/Constant_interface) anti-pattern.  
And precisely, it brings us to speak of interfaces.  

# Interface constants

Indeed PHP allows you to use interface constants too.  
According to [PHP documentation](https://www.php.net/manual/en/language.oop5.interfaces.php#language.oop5.interfaces.constants), it's possible for interfaces to have constants and they can't be overridden by a class/interface that inherits them.  
So you can define an interface constant, necessarily `public`, like this

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
You have your constant, it can't be changed, it doesn't belong to a particular instance.  
However, it's not that simple.  

# An unexpected behaviour

Take a look at this code

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
It's a fair question, bearing in mind that the PHPStorm static analysis tool, currently (version 2020.3.2) reports always as an error the attempt to redefine an interface constant, even if it's redefined by a child class that doesn't implement directly the interface.  
Recently, they opened [an issue on the JetBrains tracking system](https://youtrack.jetbrains.com/issue/WI-56949) asking to fix the PHPStorm static analysis tool, since it should be a false positive.  
For the sake of completeness, it must be said that a few years ago, they opened [an issue on the PHP bug traking system](https://bugs.php.net/bug.php?id=73348) (version 7.0.12) asking for the opposite, that is asking to fix the behaviour by applying the inheritance check to derived classes too.  
So, to get a sense of how things really are, we can just take a look at PHP source code, to *Zend/zend_inheritance.c* in particular.  
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

So the point is that the check (*do_inherit_constant_check()*) is called by a function (*zend_do_implement_interface()*) which is simply not called in case of implementors derived classes.  
Besides, PHP source code lists seven tests for interface constants inheritance and all of them only test direct inheritance.  
So, there's nothing that could make us think it's not a wanted (or tolerated) behaviour.

# Late static bindings

Anyway, is that a real problem?  
For sure, knowing how [late static bindings](https://www.php.net/manual/en/language.oop5.late-static-bindings.php) feature works, can help you to avoid risky practices.  
Take a look at the following code

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

It appears that the super class (in which the method *useTheForce()* belongs) is able to keep unchanged its constant even when the derived class uses it.  
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
Again, it's probably a matter of approach. Constants shouldn't be allowed to change, but in case, be sure that the things you do, can't reveal unpleasant surprises. If you expect to get the light side of the force and you get the dark side, you could be disappointed.

# Namespace constants

Outside of a class hierarchy, PHP allows you to define constants in a [namespace context](https://www.php.net/manual/en/language.namespaces.basics.php) too.  
Indeed you can do something like this  

```php
<?php
declare(strict_types=1);

namespace Jedi {
    const SIDE_OF_THE_FORCE = 'light';
}

namespace Sith {
    const SIDE_OF_THE_FORCE = 'dark';
}

namespace {
    echo Jedi\SIDE_OF_THE_FORCE;
    // light
    echo Sith\SIDE_OF_THE_FORCE;
    // dark
}
```

Notice the unusual namespace bracketed syntax, it's the only way for combining into a single file global non-namespaced code with namespaced code. Anyway, this example, it's just for demonstration purposes, because it's strongly discouraged as a coding practice to combine multiple namespaces into the same file.  
Notice also that since you are out of any class hierarchy, you are not allowed to use access modifiers for `const` that is therefore set to a public default visibility. 

# Sensing the future

All the scenarios we've briefly seen until now, could be addressed differently, thinking of one of the new PHP features.  
Although other languages featured Enumerations for a long time, they are going to be available in PHP only since version 8.1.  
And it's a fact that [Enumerations](https://wiki.php.net/rfc/enumerations) (enumerated types with a fixed number of possible values) offer other interesting implementation possibilities. Maybe some way to reconsider the use of constants too.  
Take a look at the following code  

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

Why is that interesting? For example, because Enumerations cases are represented as constants on the enum itself and their values are read-only properties.  
It is worth to say that Enumerations are much more than that, since they are built on top of classes and objects, so they can have their own constants and methods too, and also they can implement interfaces.  
So maybe, coming back to what we were talking about when we were dealing with class hierarchies, something like the following code does the trick

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

$obiwan = new Jedi(Force::LIGHT_SIDE);
echo $obiwan->useTheForce();
// light
$anakin = new Jedi(Force::DARK_SIDE);
echo $anakin->useTheForce();
// dark
```

# Conclusion

Constants should be the last concern during development, in PHP too. Nonetheless, they carry with them a lot of situations that a developer needs to consider.  
There are a few things to pay attention to, but for sure, the amount of possibilities that PHP gives, puts the developer in a real creative position, with the concrete possibility to make consistent use of constants.  
Without claiming to be exhaustive, this article just gives a quick overview of the most common scenarios, trying to be a starting point to deepen the topic.