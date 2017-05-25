---
authors: ["jean"]
comments: true
date: "2017-05-25"
draft: true
share: true
categories: [English, PHP, OOP]
title: "Why tipehints and interfaces are not visual debt"
twitterImage: "/images/phpday-2017/phpday-logo.png"

languageCode: "en-EN"
type: "post"
toc: false
---
A few days ago I stumbled on a strange tweet that was highlighting a controversy about scalar typehints.

<blockquote class="twitter-tweet" data-lang="it"><p lang="en" dir="ltr">Scalar type hints &amp; return types vs no scalar type hints &amp; return types is <a href="https://twitter.com/hashtag/PHP?src=hash">#PHP</a>&#39;s new spaces vs tabs</p>&mdash; Cees-Jan 🔊 Kiewiet (@WyriHaximus) <a href="https://twitter.com/WyriHaximus/status/865524687257862144">19 maggio 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

After asking references about this, someone alluded to this very short video: [**"PHP Bits: Visual Debt"**](https://laracasts.com/series/php-bits/episodes/1). After that, the author of the video was dragged into the conversation, and it blew up into a big tweetstorm in the following few hours.

The core of the controversy was the fact that the author of the video classified as ***visual debt*** a lot of stuff in his PHP example, like interfaces, scalar typehints and the final keyword.

## My opinion on the matter

I can agree with the bottom line of the video:

> Am I necessarily getting a benefit \[...\] ?  Question everything

Every choice in our line of work is always a **trade-off** between benefits and cons, and every new introduction in a projects should be evaluated and agreed upon between team members. But my personal preference leans a lot towards the opposite side in this specific matter: as I stated in a [previous blog post here]({{< ref "how-php-7-tdd-helped-me-sleep-better.md" >}}), I love the new addition that PHP 7 brought to us with scalar and return typehints, and I use them as often as I can. 

Probably this was influenced by the fact that previously I worked with C++, where type are a lot more intrusive compared with PHP 5; but over time and with usage, I learned the great benefits that we can achieve with this addition to our PHP 7 codebases, and I would like to explain myself and the reasons behind my arguments, recounting the benefits that I see in this.
 
## Scalar typehints as safeguards

In the video, the example had all along this class:

```php
class Event implements EventInterface
{
    protected $events = [];
    
    public function listen(string $name, callable $handler): void
    {
        $this->events[$name][] = $handler;
    }

    public function fire(string $name): bool
    {
        if (! array_key_exists($name, $this->events)) {
            return false;
        }
        
        foreach($this->events[$name] as $event) {
            $event();
        }

        return true;
    }
}
```
The video suggests to remove all typehints, since the code should still work and you could get rid of a lot of additional, not needed complications. I disagree completely with this.

**Typehints are safeguards** here, because they let you reduce to the bare minimum all the checks that you should do here before accepting the input arguments: 

 * because it's used as a key for an array, `$name` can only be a string (or an int, but it would not make sense) 
 * the `events` property can only accept callables, because its elements are invoked inside the foreach of the `fire()` method
 * because we don't need to insert additional `if`s in our methods, we **reduce the number of possible paths of execution**, hence reducing the number of cases that we need to check in our tests.

## Typehints and interfaces as contracts
In the video, it was suggested to also get rid of the interface:

```php
interface EventInterface
{
    public function listen(string $name, callable $handler): void;

    public function fire(string $name): bool;
}
```

I agree that an interface should be written only if needed, like if you want to write multiple concrete implementation of it with different inheritance hierarchy. But this doesn't mean that we will not have any interface at all: we still have the concrete implementation.

That is not the same of having a pure interface, but we will still be able to determine a **contract**, a list of method signatures that tells us what that object will accept as valid method calls. This kind of contracts are a must in object oriented programming, because they dictate how your object will interconnect, communicate and cooperate, and they are especially useful in combination with stricter typehints and **unit testing**.

When we write unit test, we use the real instance of the class which is under test, and everything else should be mocked. That means that we will use some test mocking library (i.e. I prefer [Prophecy](https://github.com/phpspec/prophecy), which is included in PHPUnit) to mimick the behavior of nearby objects.

How typehints would help us in this case? If we would have to mock the `EventInterface` (or the concrete class, it's unimportant here), having the return typehints for example would help us in writing good mocks, and not wrong ones. 

But how? Nearly every mocking library creates a mock extending at runtime the original class, since the mock needs to pass every check and typehint as if it was the original class; this means that it can't change the method signature, hence preserving the original return typehint.

This will translate in errors and test failures if we would write a mock that doesn't return the proper type, like in this example:

```php
class Person
{
    public function shout(): bool
    {
        $event = new Event();
        if ($event->fire('shout')) {
            // someone was listening!
            return true;
        }
        // ..
    }
}

class PersonTest extends PHPUnit\Framework\TestCase
{
    public function testShout()
    {
        $event = $this->prophesize(EventInterface::class);
        $event->fire('shout')
            ->shouldBeCalled();
        // ..
        
        $person = new Person();
        $person->shout();
    }
}
```

This mock, once used, **will make the test fail**. Why? Because the `fire()` method can only return a boolean, and by default ()if not instructed differently,) Prophecy's mocks will return null. Without the `: bool` return typehint, the mock would return `null` but the test would not fail, and the class under test would silently cast or interpret the return value as `false`, possibly causing an unintended behavior or a false positive.

This means that having complete typehints in your interfaces and method signatures only **makes your code more cohesive and your unit test more robust**; this kind of enforcing helps a lot also with refactoring, since changing a method's signature would cause failures in all the related tests that include a mock of that interface, as it could become inconsistent and unreliable after this change.

## Use interfaces as behavior checks

One of the counter example that popped up during the discussion on Twitter was this one:
 
```php
class Fireman
{
    // ...
}

class Building
{
    public function putOutFire(Fireman $fireman);
}

$building->putOutFire(new StrongAndAblePerson()); // type error!
```

This was cited to show how sometimes typehints can be a hindrance more that something helpful in your code: why a strong, capable person shouldn't be able to put out a fire? Who's the `Building` class to decide that? Are we maybe violating the Single Responsibility Principle? 

I think that this is misguided for a simple reason: it was **wrong to check against a concrete implementation** instead of an interface; and that's not evident because, in my opinion, the example was **cut too short**. 

Let's speculate on the content of the `putOutFire()` method:

```php
class Building
{
    public function putOutFire(Fireman $fireman)
    {
        $fireman->wearProtectiveGear();
        $fireman->shootWaterAtFlames();
    }
}
```

Why we had a typehint in the `putOutFire()` method? Surely because we want to rely on some method that a `Fireman` instance would give to us in the method body (i.e. the `wearProtectiveGear()` and `shootWaterAtFlames()`); if we remove the typehint, we would have no guarantees that those methods exists on the argument, and we would have to either use a `method_exists()` call twice (oh, the horror!) or expose our `Building` class to a possible fatal error.  


To take the example further, we can make the `StrongAndAblePerson` able to put out a fire if we **extract the needed methods in an interface**, defining a contract of what our `putOutFire()` needs to know and use:

```php
interface TrainedFireFighter
{
    public function wearProtectiveGear(): void;
    public function shootWaterAtFlames(): void;
}

class StrongAndAblePerson implements TrainedFireFighter { ... }
class Fireman implements TrainedFireFighter { ... }
```
... now we can have the `putOutFire()` method with a broader typehint, that would accept both a `Fireman` and any other class that implements the `TrainedFireFighter` interface:
```php
class Building
{
    public function putOutFire(TrainedFireFighter $firefighter)
}
```

## The final keyword

The only point of the video which I find relatable is the remark on the `final` keyword.

Apart from the funny joke (*"I'm not your daddy!"*), I find the final keyword not very usable in closed projects, since its only usefulness is to impede the extension of some object. When the persons that could work on a codebase are well known and they can be coordinated, its better to leave that liberty to the coders, and jsut have an agreement on what can and cannot be done with that class.

On the other hand, this keyword becomes useful when we are talking about open sourced code: using it is a clear statement that reduces the surface of the API that the library is exposing to end users, in the same way `private` is limiting access to properties.
 
Straightforwardly, the maintainer of the code is saying that this class is not extensible, because it may change internally without notice; this concept is also explained by Marco Pivetta in his signature "Extremely defensive PHP" talk (which we cited also in our previous blog post, [see related slide here](https://ocramius.github.io/extremely-defensive-php/#/90)) and [in his blog post about it](http://ocramius.github.io/blog/when-to-declare-classes-final/).
