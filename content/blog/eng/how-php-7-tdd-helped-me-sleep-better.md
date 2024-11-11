---
authors: ["jean"]
comments: true
date: "2016-06-07"
draft: false
share: true
categories: [English, TDD, PHP]
title: "How PHP 7 & TDD helped me sleep better"

languageCode: "en-US"
type: "post"
twitterImage: '/images/how-php-7-tdd-helped-me-sleep-better/blue-elephpant.jpg'
---
# The enemies of programming
As many of you will agree with me, **sleep deprivation** is the enemy of programming.   
Maybe we fear only one thing more than that: **being interrupted**.
<p style="text-align: center;">

[![Why you shouldn't interrupt a programmer (by Jason Heeris)](/images/how-php-7-tdd-helped-me-sleep-better/interruption.png)](http://heeris.id.au/2013/this-is-why-you-shouldnt-interrupt-a-programmer/)
</p>


While writing code we have to think really hard, we use complex abstractions, we go through long business workflows and so on... fatigue and interruptions are the main enemies of those in this line of work.

# My experience 
On my day job, I do all this mental juggling on a pretty big project, which is based on PHP 5.5, Symfony 2.8, Doctrine etc.; luckily, in this project we use a good deal of **good practices**, and **automated software testing** is one of those. I actually switched to this job to learn about doing automatic testing, continuous integration and other best practices.

Almost half a year ago **I became a dad**. It has been great, and you also get some unexpected perks! For example, my colleagues got me this gift for my son:
<p style="text-align: center;">

![A blue elePHPant!](/images/how-php-7-tdd-helped-me-sleep-better/blue-elephpant.jpg)
</p>

So, we can say that his future is pretty clear... But don't say this to my wife! 

During the pregnancy, many of my friends and fellow parents warned me half jokingly about one thing: *"sleep now, you'll be deadly tired after!"*. Now I can say that they were a bit exaggerating, but I can't deny that, having a child takes a toll on your sleep schedule... Even if, as in my case having a 9 to 6 office job, my wonderful wife does all the parenting heavy lifting (and I consider myself pretty lucky for having her!). 

A few months after my son was born I also had the opportunity to start **a new, fresh project**. To be completely honest, it was not actually fresh: it was a **complete rewrite** of an internal service that's used to manage the invoices for multiple business units inside our company. I knew pretty well that the old system had to be replaced, so I was put in charge of redoing it from scratch.

One of the issue with the old system (and the main reason behind the rewrite) was **maintainability**: we had no tests, we had no proper development environment, and its design wasn't that great; also, bureaucracy and invoicing are the core domain of the system, so it was inherently complex. It was the perfect environment to witness the [broken windows theory](https://en.wikipedia.org/wiki/Broken_windows_theory) in action: the code base got worse over time, one patch, copy paste or quick fix at a time. 

Obviously, as anyone that's passionate in technology would do, I took the opportunity to use a lot of new shiny tools: I picked **PHP 7**, which had just been released, and started the project with something familiar to me but still pretty new and cool, **Symfony 3.0**.

# What I found to be useful
I rambled and thought about this project a lot in the past months with my colleagues, because the old system was costing us a lot of overhead in usage and maintenance, and we had a pretty clear idea of what its problems were, so I didn't need to study a lot before starting to write the first classes.

Thus, I had to spend *some* time thinking about an object oriented design for my project, but I was rapidly able to start writing code with confidence. In the end, most of this confidence came from a few choices that I pursued during the development of this project.

## TDD and high coverage
The first choice that I am pretty satisfied about is **automatic testing**: I already knew the advantages of doing tests and Test Driven Development, but in the previous project that practice was not introduced from the start, so not all the codebase was covered, and we couldn't (or wouldn't?) do TDD 100% of the time.

In this case instead **I wanted to write nearly everything with TDD**, and keep a **very high threshold for the minimum coverage** achieved through automatic testing. Right now I'm sitting on a ~92% test coverage, and I feel proud about it. This wasn't a mere "let's hit 100%!" mindless goal ([since it's pointless]({{< ref "software-testing-coverage-vs-efficacia.md" >}})), but it fueled **a positive feedback cycle** instead: the more I used TDD in writing new classes, the more the coverage rose and stayed high; at the same time, I found myself inspecting the coverage reports to find missing spots, and that allowed me to discover many edge-cases that I didn't test and should have been.

Of course, I still left some parts without coverage or specific tests, since it was pointless to test them (e.g. Doctrine entities), while I covered some parts multiple times, since they were **critical paths** inside my application.

## Unit tests to the rescue!
Last but not least, the main critical advantage that TDD gave me was **focus even on strained days**: I wrote the classes starting from unit tests, giving all my effort to one piece of code at a time, without having to keep in mind the entire project with its complexities.
 
I then wrote some functional tests to assure that the **collaboration between my unit-tested objects** was fine, and this later step was also useful in delaying the definition of the classes as services inside the Symfony DI container. I was also **able to change my mind** a few times on some details of the design without having to suffer mental confusion or rewrite too much code.

## PHP 7: scalar and return types declarations
The second good choice was **PHP 7**: among the reasons behind it as the language version of choice for this project were the [two main new features](http://php.net/manual/en/migration70.new-features.php) introduced: **scalar types** and **return type declarations**. 
<p style="text-align: center;">

![Return types, return types everywhere!](/images/how-php-7-tdd-helped-me-sleep-better/return-types-everywhere-meme.jpg)
</p>

Before Facile.it, I worked as C++ developer, and oh boy! did I miss scalars and return types!

*"I came onboard of the PHP community right on time"*, I thought... So I took advantage of the situation to start using all these new features. I enjoyed having again the possibility to typehint strings and integers; I discovered how return types declaration enforces the cohesion of your objects really well, making it **rightly painful to return different things**: it became impossible to return *something* OR *null*, for example.

Interestingly, in my tests I found myself writing a lot of this kind of code:

    $result = $testClass->method();
    $this->assertInstanceOf(SomeClass::class, $result);

I did this more than once, just to realize that I was wasting my time! This was normally the first TDD step on PHP 5.x code, but now this kinds of assertion were futile, because the return type was already checked at a language level! Great!

Return types also proved themselves to be a **double-edged sword** in some cases, especially on Doctrine entities: they are really useful to enforce consistency in your values, since they trigger a `\TypeError` each time you call a getter method on a erroneously empty property, but **you can't use them on nullable fields**, since it will break your application at any time during execution.

On the other hand, having return types declared on your business-logic classes it's pretty useful, even more when used in conjunction with TDD: every time you define a mock you are forced to declare expectations and predictions with the right types, so it **indirectly helps maintaining the collaboration contract between objects**, without too much hassle. If I changed a method's signature that was mocked somewhere, the mock would break the test, **highlighting the issue and making the tests** (and an high coverage) **even more valuable**.

# Conclusions
At the end of the day, these and other **good practices are helpful** for both your job and your personal life: you can go a long way in being fit and in the best shape while working, but stressful and (good) distracting events are unavoidable: you'll often have to fight stress, fatigue or distractions, and there will be days where you can't be at the top of your game, for any number of reasons.

Since programming is a mental job, I think that having instruments and good practices in your toolset is invaluable, being them the **essential tools of our craft**. Thus, I hope that those little life/programming lessons I learned in these months will be useful to other people like me.
