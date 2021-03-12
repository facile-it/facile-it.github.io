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

Imagine you need to use a fixed numeric value in your code, let's say 20000. It is what we call a *literal constant*, that is a value that will always remain the exact same in your code.  
Now imagine you need to use that value more than once. Sooner or later you will read your code and you will not remember what 20000 was, it will happen for sure. But what if you assign the value to an immutable variable with a [meaningful name](https://en.wikipedia.org/wiki/Self-documenting_code)? Let's say something like this:

```
MAXIMUM_MIDICHLORIAN_COUNT = 20000 
```

It is different isn't it? By reading the name, you are immediately able to understand what its value is about. MAXIMUM_MIDICHLORIAN_COUNT is what we call a *named constant* or simply a constant.  
So, why do we use constants? As you have just seen, it is a matter of readability. But there's more.  
Let's say you have a function or a method that takes an argument and does something with it. For example, the argument could be a number and, based on its value, the function could behave differently.  
Take a look at the following code:

```php
<?php
declare(strict_types=1);

class JediTest
{
    public static function checkMidichlorianCount(int $midichlorianCount): string
    {
        if($midichlorianCount > 20000) {
            return "The chosen one, the boy may be!"
        }
        return "Just a regular Jedi...";
    }
}
```

Do you remember? 20000 was the value of MAXIMUM_MIDICHLORIAN_COUNT. Therefore we should have used that named constant insted of the literal one.  
Again, why do we use constants? As you have just seen, constants can be very useful to represent boundaries or edge cases.  
And there would be more, but let's just focus on the fact that we assign certain values to immutable variables instead of simple variables. Why is that? Because we need the programming language to protects us from the possibility that our value is changed.  
Therefore, in the end, why do we use constants? For sure it is a matter of safety.  
Programming languages have their own way to identify something that can't be changed, for example C++ uses `const` and Java uses `final`.  
It may not seem like it, but there are a few interesting things to say about constants in PHP.  

# Global scope constants

The easiest way to set a constant is using [global scope constants](https://www.php.net/manual/en/language.constants.php).  
With the keyword `define`, you can do something like that

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
 
However, let's say you don't need a global scope constant since you have a class hierarchy. Therefore, you need a constant that doesn't belong to a particular instance so that it can be shared between all the instances of its object.  
Something you would write, for instance in Java, using a `static final` field.  
PHP, at present (version 8.0.2) allows using [`final`](https://engineering.facile.it/blog/eng/from-zero-to-infinite-the-final-keyword/) only for classes and methods and that's why class constants exist.  

# Class constants

According to [PHP documentation](https://www.php.net/manual/en/language.oop5.constants.php), you can define constants on a per-class basis by using the keyword `const`.  
Therefore, you could achieve the desired result in the following way:  

```php
<?php
declare(strict_types=1);

class Jedi 
{
    protected const SIDE_OF_THE_FORCE = 'light';
}
```

However, we said that a constant needs to be unchangeable.  
Therefore, before using class constants, you need to be aware that every child class is allowed to redefine inherited constants.   
This means that the following code is correct.

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
It depends on what kind of approach to programming you have. There is no doubt that constants should not be allowed to change, it is a safety issue, as we said above. Perhaps, you could see this PHP feature as a curious implementation of [OTP (one-time programmability)](https://en.wikipedia.org/wiki/Programmable_ROM) on a per-class basis. In fact, if you notice, each derived class can overwrite the constant only once.  

# Constants access

But let's take a step back: how does the access to class constants work?  
You cannot use the object operator `->` neither the pseudo-variable `$this`. However, PHP has another token: the scope resolution operator `::`. This token, from within an object context, needs to be combined with the keywords `self`, `parent` or `static`. Let's just focus on `self` for now, we will come back to this topic later.  

# Using final
 
So, you still need a constant but since you are not sure it cannot be changed, maybe you are not comfortable with it.  
Obviously, you could try to use `final` by creating a class that carries the constant you need and that ensures that the constant cannot be changed. However, since a final class cannot be extended, you would inevitably need to do something awkward like this:  

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

This approach is one of the alternatives you can use to avoid [Constant interface](https://en.wikipedia.org/wiki/Constant_interface) anti-pattern.  
And that brings us to the topic of interfaces.  

# Interface constants

In fact, PHP allows you to use interface constants too.  
According to [PHP documentation](https://www.php.net/manual/en/language.oop5.interfaces.php#language.oop5.interfaces.constants), it is possible for interfaces to have constants and they cannot be overridden by a class/interface that inherits them.  
Therefore, you can define an interface constant, necessarily `public`, like this

```php
<?php
declare(strict_types=1);

interface JediInterface 
{
    public const SIDE_OF_THE_FORCE = 'light';
}
```

However, it is not possible to overwrite it. In fact, the following code produces a fatal error (see below the code):

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

```
Fatal error: Cannot inherit previously-inherited or override constant SIDE_OF_THE_FORCE from interface JediInterface in [...]
```

So, it seems you came to an end.   
You have your constant, it cannot be changed, it does not belong to a particular instance.  
However, it is not that simple.  

# An unexpected behaviour

Take a look at this code:

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
It turns out that a class derived from a superclass that implements an interface can override the interface constants, even though the superclass cannot.  
In fact, if you make the derived class implement the interface likewise, you will get a fatal error again (see below the code):  

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

```
Fatal error: Cannot inherit previously-inherited or override constant SIDE_OF_THE_FORCE from interface JediInterface in [...]
```

So, bug or feature?  
This is a fair question, since the PHPStorm static analysis tool, currently (version 2020.3.2), always reports an attempt to redefine an interface constant as an error. The error is reported even if the interface constant is redefined by a child class that does not directly implement the interface.  
Recently, [an issue was opened on the JetBrains tracking system](https://youtrack.jetbrains.com/issue/WI-56949) asking to fix the PHPStorm static analysis tool. In fact, the error mentioned above should be a false positive.  
For the sake of completeness, it must be said that a few years ago [an issue was opened on the PHP bug tracking system](https://bugs.php.net/bug.php?id=73348) (version 7.0.12) asking for the opposite thing. It was asked to fix the behaviour by applying the inheritance check to derived classes too.  
Therefore, to get an idea of how things really are, we can take a look at PHP source code, particularly at *Zend/zend_inheritance.c*.  
This is how PHP executes the inheritance check:  

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

And here is where the check is called (*zend_do_implement_inferface()*):

```c
/* Check for attempt to redeclare interface constants */
ZEND_HASH_FOREACH_STR_KEY_PTR(&ce->constants_table, key, c) {
    do_inherit_constant_check(&iface->constants_table, c, key, iface);
} ZEND_HASH_FOREACH_END();
```

Therefore, the point is that the check (*do_inherit_constant_check()*) is called by a function (*zend_do_implement_interface()*) which is not called in case of implementors derived classes.  
Besides, PHP source code lists seven tests for interface constants inheritance and all of them only test direct inheritance.  
Therefore, nothing could make us think this is not a wanted (or tolerated) behaviour.  

# Late Static Bindings

Anyway, is that a real problem?  
For sure, knowing how [Late Static Bindings feature](https://www.php.net/manual/en/language.oop5.late-static-bindings.php) works helps you avoid risky practices.  
Take a look at the following code:  

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

It appears that the super class, to which the method *useTheForce()* belongs, is able to keep unchanged its constant even when the derived class uses it.  
But what happens if you make a small change to the previous example?   
Try to change the access to the constant by replacing `self` with `static` this way:

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

This is how Late Static Bindings feature works.  
`self`, being a static reference to the current class, is resolved by using the class to which the method belongs.  
On the other hand, Late Static Bindings feature with the keyword `static` goes beyond that limitation, by referencing the class that was initally called at runtime.  
Is it safe to use Late Stating Bindings with constants?  
Again, it is probably a question of approach. Constants should not be allowed to change. But if you do allow it, be sure that what you do will not reveal any unpleasant surprises. If you expect to get the light side of the force and you get the dark side, you could be disappointed.  

# Namespace constants

Outside of a class hierarchy, PHP allows you define constants in a [namespace context](https://www.php.net/manual/en/language.namespaces.basics.php) too.  
In fact, you can do something like this:  

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

Please note the unusual namespace bracketed syntax. This is the only way for combining into a single file some global non-namespaced code with some namespaced code. However, this example is for demonstration purposes only. In fact, it is strongly discouraged as a programming practice to combine multiple namespaces in the same file.    
Also note that you are not allowed to use access modifiers for `const` because you are outside of any class hierarchy. Thus, `const` is set to default public visibility.  

# Sensing the future

All the scenarios we have briefly seen so far could be approached differently by thinking about one of PHP's new features.  
Although other languages have supported Enumerations for a long time, they will only be available in PHP from version 8.1.  
And it is a fact that [Enumerations](https://wiki.php.net/rfc/enumerations) (enumerated types with a fixed number of possible values) offer other interesting implementation possibilities. Maybe some ways to reconsider the use of constants too.  
Take a look at the following code:  

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
It is worth saying that Enumerations are much more than that, since they are built on top of classes and objects. Therefore, Enumerations can have their own constants and methods and they can also implement interfaces.  
So perhaps, going back to what we said when we dealt with class hierarchies, something similar to the following code does the trick:  

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
There are a few things to pay attention to but, for sure, the amount of possibilities that PHP gives puts the developer in a real creative position, with the concrete possibility to make consistent use of constants.  
Without claiming to be exhaustive, this article just gives a quick overview of the most common scenarios, trying to be a starting point to deepen the topic.
