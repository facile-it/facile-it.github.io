---
authors: ["bruce"]
date: "2018-12-04"
draft: true
share: false
categories: [English, php, oop]
title: "From 0 to infinite the final keyword"
type: "post"
languageCode: "en-EN"
toc: true
---

# Google from zero to infinite

Sometimes I do a full immersion on topics of my interest, generally related to programming, topics on testing, good design, etc. 
I apply a technique invented by me named: **"Google from zero to infinite"**.

# The concept behind final
 
Basically i use one or more search keywords, then i literally follow all the links of all the pages. It is a very long and laborious activity. 
But most of the times I find very interesting documents, otherwise difficult to reach. This time I decided to read up on the keyword final and how this is managed by php. 

The keyword final was introduced in version 5 of php. 

The manual says: 

> Final Keyword. PHP 5 introduces the final keyword, which prevents child classes from overriding a method by prefixing the definition with final. 
> If the class itself is being defined final then it cannot be extended. Note: Properties cannot be declared final, only classes and methods may be declared as final.

Java has the same keyword, in c# it is called sealed instead of final, but both have the same behavior, to prevent a class from being inherited (in our case we will see only this type of use, languages like java support further behavior but in different contexts). 

First of all we will try to understand what it is for, then we will try to do some additional reasoning, and finally  we will talk about the comments on the net.

The concept that expresses the keyword final is that a class can not be extended, the decision must be taken by the programmer in the design stage.
There are situations in which extension by inheritance is a good solution, others where it is not possible and others where it is wrong. The keyword final is a tool given to the programmer to express this decision.  

So when the consumer of the class will meet the keyword final, it will have to use different solutions from inheritance, solutions conveyed by the design of the base class. 

Why should you set such a strong constraint? The answers are many, all with the aim of having a robust, more manageable and more maintainable code-base.  

One reason is to avoid the proliferation of infinite hierarchies of classes such as VCL (Visual Component Library), which are difficult to extend and maintain.
As it is clearly visible from the image below, 

![big hierarchy](/images/from-0-to-infinite-the-final-keyword/big-hierarchy.png)


in this case (even being a well-made library) the use of inheritance has been used a lot.

When we meet a class with the keyword final, who designed the class is telling us that we can not derive from it, if we want to extend some behavior we must do it by composition or other mechanisms (like events, o plugins). I find this way of common sense. In fact in relation to the time used for the analysis of the class design, through final, 
i provide important information on how it should be used and how its use was thought. 

# S.O.L.I.D and Liskov

Unfortunately, many programmers use inheritance as a solution to all problems, without thinking that other methods exist, without knowing that there are principles that regulate object oriented design, principles 
like **S.O.L.I.D** but but also others, come to help us. Such as the principle of Liskov. 

Let's see what he says in more detail. 
The canonical statement says the following:

> "you should always be able to substitute the parent class with its derived class without any undesirable behaviour"

> The concept of this principle was introduced by Barbara **Liskov** in a 1987 conference keynote and later published in a paper together with Jannette Wing in 1994. 

> Their original definition is as follows:

> - Don’t implement any stricter validation rules on input parameters than implemented by the parent class.
> - Apply at the least the same rules to all output parameters as applied by the parent class
> - Objects should be replaceable with instances of their subtypes without altering the correctness of that program
> - In general: If you need to add some restriction in an overridden method and that restriction doesn't exist in baseline implementation, you probably violates Liskov Substitution Principle.

I do not want to write an article on how to respect the development according to **Liskov** on the internet there is a lot of literature. 
I would just like to emphasize that building a hierarchy of objects is not easy, that the more the hierarchy is deep the more we are faced with design problems. 
For this reason, before creating subclasses we should ask ourselves questions such as these: 

- is my derived class of the same type as the base class?
- can my derived class be exchanged with the base class without having "strange" behaviors in the code at runtime?
- is my base class prepared to be derived?
- the enhancements made by the subclass are primarily additive?

If the answers to these questions are negative, using inheritance in this use case, we will get hierarchies of wrong classes, so little maintenance. 
Now some example of wrong use of inheritance:
```php
use App\Domain\Model;
class Stack extends ArrayList {
    public push(Object value) { … }
    public Object pop() { … }
}
```

Why ? the Stack class inheriting from ArrayList will have a lot of additional methods not related to the concept of Stack (push or pop). 
To make the Stack work, you would have to remap the behavior of the extra methods, but this only because a design error was made. 

You are probably thinking that the OOP is not keeping its promise. 
However, let us remember that we are programming in OOP (Object Oriented Programming) not in OOI (Object Oriented Inheritance). 
There is always a trade off between code reuse and good design. 
Inheritance should be mostly used for good design, for code reuse we go with composition.

In the previous example two main errors have been made, first error a Stack IS NOT an Array!, second and the the biggest problem, 
is the cross-domain inheritance relationship. 
Simply, our domain classes must use implementations not to inherit them, in our example, stack was a concept of domain (Focusing only on reusing code can be a problem). 

Last example. A **"person"** relationship, **"employee"**. how would you design a relationship between a person entity and an employee entity? 
Would you go with inheritance or composition? ... it is a case of temporary relationship, so it should be modeled with the composition (employ is a role not a person). 

I invite you, however, to do some tests with your classes, to see if they adhere to these good practices and try to get a better design, avoiding inheritance.

# The concrete example, break the immutable object 

Let's see some example where the **final** keyword could be the right choice. 
Since in PHP it is not possible to create a pure, immutable object, using the **final** we can emulate the behavior. 
Let's go see some code.

```php
class SomeImmutableObject {
private $someString; 
  public function __construct(string $value) {
     $this->someString = $value; 
  }
  public function getValue(): string {
      return 'the value is:'. $this->someString.' - '; 
  }
}
```

Let's concentrate, can we modify this object after it has been created? …. Yes we can, This is php friend!
```php
$one = new SomeImmutableObject('Pippo');
echo $one->getValue(); //Pippo
$one->__construct('Pluto'); //Pluto
echo $two->getValue(); 
```

try it! **[break the immutable object] (https://paiza.io/projects/esxFsmZDajfHtqGTwdolCg)**


this problem is easy to solve, we must put a flag in the constructor and if it is true throw an exception. let's do it!

# The concrete example, break the immutable object the second way

```php
class SomeImmutableObject {
private $someString; 
private $flagCreate = false; 

  public function __construct(string $value) {
     if ($this->flagCreate === true) {
         throw new \BadMethodCallException('This is an immutable object has already create.');
     }
     $this->someString = $value; 
     $this->flagCreate = true;
  }
  public function getValue(): string {
      return 'the value is:'. $this->someString.' - '; 
  }
}

$one = new SomeImmutableObject('Pippo');
echo $one->getValue(); //Pippo
$one->__construct('Pluto'); //Pluto
echo $two->getValue(); 
```

Now we are happy and we have our immutable object, are we sure?, mmm no… look here! 

# The concrete example, break the immutable object the third way

```php
class SomeImmutableObject {

    protected $someString; 
    private $flagCreate = false; 

  public function __construct(string $value) {
     if ($this->flagCreate === true) {
         throw new \BadMethodCallException('This is an immutable object has already create.');
     }
     $this->someString = $value; 
     $this->flagCreate = true;
  }
  public function getValue(): string {
      return 'the value is:'. $this->someString.' - '; 
  }
}

class BreakImmutableObject extends SomeImmutableObject {
    
    public function __construct(string $value) {
     $this->someString = $value; 
    }
  
   public function getValue(): string {
      return 'the value is:'. $this->someString.' - '; 
   }
  
  public function change() {
     $this->someString .= ' and Minny';
  }
}

$one = new BreakImmutableObject('Pippo');
echo $one->getValue(); //Pippo
echo $one->change();  
echo $one->getValue(); //the value is:Pippo - the value is:Pippo and Minny -
```

There is still something wrong, the problem is that `$someString` variable is protected, let's change it! 

# The concrete example, break the immutable object the four way

```php
class SomeImmutableObject {
protected $someString; 
private $flagCreate = false; 

  public function __construct(string $value) {
     var_dump($this->flagCreate);
     if ($this->flagCreate === true) {
         throw new \BadMethodCallException('This is an immutable object has already create.');
     }
     $this->someString = $value; 
     $this->flagCreate = true;
  }
  public function getValue(): string {
      return 'the value is:'. $this->someString.' - '; 
  }
}

class AnotherClassToBreakImmutableObject extends SomeImmutableObject {
   public $someString;

    public function __construct(string $value) {
     $this->someString = $value; 
    }
  
   public function getValue(): string {
      return 'the value is:'. $this->someString.' - '; 
   }
  
  public function change() {
           $this->someString .= ' and always with Minny';
  }
}

$one = new AnotherClassToBreakImmutableObject('Pippo');
echo $one->getValue(); //Pippo
echo $one->change(); 
echo $one->getValue(); //the value is:Pippo - the value is:Pippo and always with Minny -
```

It still does not work, ok now we definitely correct promised!
The problem is that inheritance breaks the encapsulation so a good solution in this case is to use **final**!.
**the definitive version**

# The concrete example definitive fix with final 

```php
final class SomeImmutableObject {
protected $someString; 
private $flagCreate = false; 

  public function __construct(string $value) {
     var_dump($this->flagCreate);
     if ($this->flagCreate === true) {
         throw new \BadMethodCallException('This is an immutable object has already create.');
     }
     $this->someString = $value; 
     $this->flagCreate = true;
  }
  public function getValue(): string {
      return 'the value is:'. $this->someString.' - '; 
  }
}

class TryToBreakImmutableObject extends SomeImmutableObject {
   public $someString;

    public function __construct(string $value) {
     $this->someString = $value; 
    }
  
   public function getValue(): string {
      return 'the value is:'. $this->someString.' - '; 
   }
  
  public function change() {
           $this->someString .= ' and always with Minny';
  }
}

$one = new TryToBreakImmutableObject('Pippo'); 
echo $one->getValue(); //Pippo
echo $one->change(); 
echo $one->getValue();
```

```PHP Fatal error:  Class BreakImmutableObject may not inherit from final class (SomeImmutableObject)```

try it! **[immutable object] (https://paiza.io/projects/_uGKRlArzu3OdX5748pq6w?language=php)**


… Some links in-depth study

- [Final or not final] (https://github.com/thephpleague/period/issues/54) 
- [Final classes by default] (https://github.com/symfony/symfony/issues/15233)
- [Final classes: Open for Extension, Closed for Inheritance] (http://verraes.net/2014/05/final-classes-in-php/)


Obviously it is not always all pink and flowers, not always literature especially in our work, it is perfectly suited to all needs. 
What I want to point out is that in some cases **final** can be a good ally and can help us to simplify the design.  
Using **final** keyword leads programmers to make a round of additional reasoning, to pay more attention to the use of the class. 
For example, during review a diff with the removal of **final**, it could lead to useful comments to find different solutions. 

There are also some points against **final**. Testing becomes more complex as classes with **final** can not be mocked. 
A solution to this problem is partially solved in php, using the annotation **@final**, even if it does not have the same validity as a language keyword.
Moreover using the interfaces solved this, is a huge advantage brought indirectly by the use of the this keyword.

Another point to disadvantage is that it is considered an instrument too coarse to be effective. 
A developer can simply to remove the keyword **final** and then do wrong things!.

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

The theme is quite complex, this article wants to be a general overview. I hope it is useful as a starting point to deepen and begin to evaluate when to use **final** in our classes.

From my point of view the use of keyword **final** can help to improve design. 
I would not write all my class with **final** but i'd start from the simplest cases: value objects, algorithms, patterns like the template method etc.  
In any case, with the right attentions it can always be removed, if nothing else it has forcibly added one more step to the analysis process.

