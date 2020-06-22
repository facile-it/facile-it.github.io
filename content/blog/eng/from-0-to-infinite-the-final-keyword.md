---
authors: ["bruce"]
date: "2018-12-04"
draft: true
share: false
categories: [English, php, oop]
title: "From zero to infinite: the Final keyword"
type: "post"
languageCode: "en-EN"
toc: true
---

# Google from zero to infinite

Sometimes I do a full immersion on topics of my interest, generally related to programming, topics on testing, good design, etc. 
I apply a technique invented by me named: **"Google from zero to infinite"**.

Basically I use one or more keywords in Google, then I literally follow all the links of all the pages. It is a very long and laborious activity. But most of the time I find very interesting documents, otherwise difficult to reach. This time I decided to use the keyword final of PHP.

# The concept behind final keyword
 
The keyword final was introduced in version 5 of php. 

The manual says: 

> Final Keyword. PHP 5 introduces the final keyword, which prevents child classes from overriding a method by prefixing the definition with final. 
> If the class itself is being defined final then it cannot be extended. Note: Properties cannot be declared final, only classes and methods may be declared as final.

Java has the same keyword, c# too but it is called "sealed" instead of "final", but more or less have the same behavior: to prevent a class from being inherited (in our case we will see only this type of use, for example languages like Java support further behavior but in different contexts).

First of all we will try to understand what it is for, then we will try to do some additional reasoning, and finally we will talk about of comments on the net.

The concept that expresses the keyword final is that a class can not be extended, the decision must be taken by the programmer in the design stage utilizing just the final keyword. 

There are situations in which extension by inheritance is a good solution, others where it is not possible and others where it is wrong. The keyword final is a "tool" given to the programmer to express this decision.

So when the consumer of the class will meet the keyword final, it will have to use different approach from the inheritance. And this decision is imposed from the class designer.

Why someone should set such a strong constraint?. The answers are many, all aim of having a robust,  and more manageable code-base. For example to avoid the proliferation of infinite hierarchies of classes such as VCL (https://en.wikipedia.org/wiki/Visual_Component_Library), which are difficult to extend and maintain. In this case, even being a well-made library, the use of inheritance has been used a lot. 

Also I use final is to reduce the API surface that needs to be covered by BC breaks avoidance in a distributed library.

Further to use **final** in some cases forces adopt the interfaces, by testing for example, this is a positive side effect brought indirectly by the use of this keyword.

When we meet a class with the keyword final, who designed the class not allow us inherit from it, if we want to extend some behavior we must do it by composition or other mechanisms (like events, or plugins). 

I think that this is a good method. In fact, in relation to the time used for the analysis of the design class, through final we provide important information on how she should be useds, simplifying the effort of the developer.

# S.O.L.I.D, Liskov and final

Develop architecture isn't a trivial task, many programmers use inheritance as solution to all problems.  

There are many principles and guidelines to help to develop good design 
like S.O.L.I.D (https://en.wikipedia.org/wiki/SOLID), design patterns, (https://en.wikipedia.org/wiki/Design_pattern) etc.
But the problem is that these principles are difficult to apply, they almost always lead to writing more code. 
Not always this is possible, not always this is accepted. 

Regarding final, in my opinion, one of the principle that best represents it is LSP.

Let's see what **Liskov principle** says in more detail. 
The canonical statement is the following:

> "you should always be able to substitute the parent class with its derived class without any undesirable behaviour"

> The concept of this principle was introduced by Barbara **Liskov** in a 1987 conference keynote and later published in a paper together with Jannette Wing in 1994. 

This is a more precise definition:
>“if S is a subtype of T, then objects of type T in a program may be replaced with objects of type S without altering any of >the desirable properties of that program.”

Link to orginal paper: https://dl.acm.org/doi/pdf/10.1145/62138.62141

> Simplifying the following could be good guidelines:

> - Don’t stricter more validation rules on input parameters than those implemented by the parent class.
> - Objects should be replaceable with instances of their subtypes without altering the correctness of that program
> - Not add restriction in an overridden method if that restriction doesn't exist in baseline implementation

I used it as an example since it is specific to the design of hierarchies.

I do not want to write an article on how to respect the development according to **Liskov** in the net there is a lot of literature. I would just like to emphasize that building a hierarchy of objects is not easy, that more the hierarchy is deep then more we are faced with design problems and **final** helps use to prevent this. 

For this reason, before creating subclasses we should ask ourselves questions like the following or similar:

- is my derived class of the same type as the base class?
- I can use the derived class of base where requireds a base class without having "strange" behaviors in the code at runtime?
- Is my base class prepared to be derived?
- Are the enhancements made by the subclass primarily additive?

If the answers to these questions are negative, using inheritance could lead to complex and unmanageable hierarchies

Now some basic example of wrong use of inheritance:
```php
use App\Domain\Model;
class Stack extends ArrayList {
    public push(Object value) { … }
    public Object pop() { … }
}
```

Why is it wrong? Because the Stack class inheriting from ArrayList will have a lot of additional methods that are not related to the concept of ArrayList (e.g. push and pop).

In the previous example two main errors have been made:

 1. Stack IS NOT an Array.
 2. The cross-domain inheritance relationship.
Our domain classes must use implementations not to inherit them. In the example, stack was a concept of domain (focusing on reusing code only can be a problem).

You will be probably thinking that the OOP is not keeping its promise.
However, let us remember that we are programming in OOP (Object Oriented Programming) not in OOI (Object Oriented Inheritance). There is always a trade off between code reuse and good design. 
Inheritance should be mostly used for good design, for code reuse we choose composition.

I invite you, however, to do some tests with your classes to see if they adhere to these good practices and try to get a better design by avoiding inheritance.

# The concrete example, break the immutable object 

Let's see some example where the **final** keyword could be the right choice. 
Through **final** we create a immutable object with minimal effort. This is only a **POC** to show how **final** works, there are many ways to resolve this problem. 

Let's go see some code.

```php
class SomeImmutableObject
{
    private $someString;

    public function __construct(string $value)
    {
        $this->someString = $value;
    }

    public function getValue(): string
    {
        return 'the value is:' . $this->someString . ' - ';
    }
}
```

Let's concentrate, can we modify this object after it has been created? …. Yes we can!
```php
$one = new SomeImmutableObject('Pippo');
echo $one->getValue(); //Pippo
$one->__construct('Pluto'); 
echo $one->getValue(); //Pluto
```

try it! **[break the immutable object] (https://3v4l.org/CiHPG)**

This problem is easy to solve, we must put a flag in the constructor and if it is true throw an exception. 
_Another way to fix it, is to create a `named constuctor` and make the `__constructor` private_. 
let's do it using the first solution!

# The concrete example, break the immutable object first fix

```php
<?php declare(strict_types=1);

class SomeImmutableObject
{
    private $someString;
    private $flagCreate = false;

    public function __construct(string $value)
    {
        if (true === $this->flagCreate) {
            throw new \BadMethodCallException('This is an immutable object has already create.');
        }

        $this->someString = $value;
        $this->flagCreate = true;
    }

    public function getValue(): string
    {
        return 'the value is:' . $this->someString . ' - ';
    }
}

$two = new SomeImmutableObject('Pippo');
echo $two->getValue(); //Pippo
$two->__construct('Pluto'); // \BadMethodCallException 
echo $two->getValue();
```

Now we are happy and we have our immutable object, are we sure?, mmm no… look here! 

# The concrete example, break the immutable object the second way

```php
<?php
class SomeImmutableObject
{
    private $someString;
    private $flagCreate = false;

    public function __construct(string $value)
    {

        if ($this->flagCreate === true) {
            throw new \BadMethodCallException('This is an immutable object has already create.');
        }

        $this->someString = $value;
        $this->flagCreate = true;
    }

    public function getValue(): string
    {
        return 'the value is:' . $this->someString . ' - ';
    }
}

class AnotherClassToBreakImmutableObject extends SomeImmutableObject
{

    public function __construct(string $value)
    {
        $this->someString = $value;
    }

    public function getValue(): string
    {
        return 'the value is:' . $this->someString . ' - ';
    }

    public function change(): void
    {
        $this->someString .= ' and Minny';
    }
}

$three = new AnotherClassToBreakImmutableObject('Pippo');
echo $three->getValue(); //Pippo
echo $three->change();
echo $three->getValue(); //the value is: Pippo and Minny -
```
try it! **[break the immutable object] (https://3v4l.org/KpnfR)**

It doesn't work yet. Ok, now we're going to fix it, I promise!
The problem is that inheritance breaks encapsulation. Therefore, in this case using final is a good solution!.

**the definitive version**

# The concrete example definitive fix with final keyword

```php
<?php

final class SomeImmutableObject
{
    private $someString;
    private $flagCreate = false;

    public function __construct(string $value)
    {

        if ($this->flagCreate === true) {
            throw new \BadMethodCallException('This is an immutable object has already create.');
        }

        $this->someString = $value;
        $this->flagCreate = true;
    }

    public function getValue(): string
    {
        return 'the value is:' . $this->someString . ' - ';
    }
}

class TryToBreakImmutableObject extends SomeImmutableObject
{
    public $someString;

    public function __construct(string $value)
    {
        $this->someString = $value;
    }

    public function getValue(): string
    {
        return 'the value is:' . $this->someString . ' - ';
    }

    public function change(): void
    {
        $this->someString .= ' and Minny';
    }
}

$four = new TryToBreakImmutableObject('Pippo');
echo $four->getValue(); //Pippo
echo $four->change();
echo $four->getValue();
```

```PHP Fatal error:  Class BreakImmutableObject may not inherit from final class (SomeImmutableObject)```

try it! **[immutable object] (https://3v4l.org/OsOoW)**


… Here are some links to deepen the topic

- [Final or not final] (https://github.com/thephpleague/period/issues/54) 
- [Final classes by default] (https://github.com/symfony/symfony/issues/15233)
- [Final classes: Open for Extension, Closed for Inheritance] (http://verraes.net/2014/05/final-classes-in-php/)


Obviously it is not always all pink and flowers, not always literature especially in our work, it is perfectly suited to all needs. 
What I want to point out is that in some cases **final** can be a good ally and can help us to simplify the design.  
Using **final** keyword leads programmers to make a round of additional reasoning, to pay more attention to the use of the class. 
For example, during review, a diff with the removal of final keyword could lead to useful comments to find different solutions

This problem is solved in php by using the annotation @Final, even if it does not have the same validity as a language keyword. However, nowadays, with Ide inspectors, and with static analysis tools like PhpStan (https://phpstan.org/blog), Psalm (https://psalm.dev/docs/) the annotation is fully supported and it works properly.

A downside of the final keyword is that it is considered too coarse an instrument to be effective.
A developer can simply remove the **final** keyword and then do wrong things!. 

I not agree with this. Too many times I saw to use wrong the inheritance, so I think that this is useful for beginner but also a more senior developer.

To support the last topics I add some links on discussions against the use of **final**.

- [Michael Feathers: It's time to deprecate final](http://butunclebob.com/ArticleS.MichaelFeathers.ItsTimeToDeprecateFinal)
- [Please stop using "final" classes](https://groups.google.com/forum/?utm_medium=email&utm_source=footer#!msg/dddinphp/r9kZ5eI6eiw/TpopVjVv-VgJ)


Other links that I used as a starting point for this article

- https://matthiasnoback.nl/2018/09/final-classes-by-default-why/
- http://ocramius.github.io/blog/when-to-declare-classes-final/
- https://speakerdeck.com/stuartherbert/the-final-word-about-final?slide=108
- https://www.reddit.com/r/PHP/comments/2rk3en/when_to_declare_classes_final/
- https://stackoverflow.com/questions/526312/when-should-i-use-final
- https://softwareengineering.stackexchange.com/questions/89073/why-is-using-final-on-a-class-really-so-bad
- https://matthiasnoback.nl/2018/08/negative-architecture-and-assumptions-about-code/
- http://www.freeklijten.nl/2016/06/17/Final-private-a-reaction

# Conclusion

The topic is very complex, this article aimed at giving a general overview of it. I hope it will be useful as a starting point to deepen the subject and to evaluate when to use **final** in our classes.

From my point of view the use of keyword **final** can help to improve design. 
I would not write all my class with **final** but i'd start from the simplest cases: value objects, algorithms, patterns like the template method etc.  
In any case, the final keyword can be removed with with due precautions and, if nothing else, using it has forcibly added one more step to the analysis process."
