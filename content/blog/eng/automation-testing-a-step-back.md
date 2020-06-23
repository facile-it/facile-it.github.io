---
authors: ["carmine-laface"]
date: "2020-06-23"
draft: false
share: true
categories: [English, Software Testing]
title: "Automation testing: a step back"
type: "post"
languageCode: "en-EN"
toc: true
---

The goal of this article is to define basic concepts related to testing, trying not to take anything for granted.

# Why we test?

Why is it important to write automated tests? I asked myself and I did some research because the answer to this question was not obvious to me. I knew it was important but I didn't know why. So I decided to try to motivate it starting from a point of view as impartial as possible.

After some research I came to the conclusion that the benefits of the tests are four: they can avoid regression, they can count as documentation, they can help write better code and they can help find bugs during development.

Let's focus on one of them at the time and analyze it.

## Avoid regression

> When you implemented a feature in your app, you likely ran the code to verify that it worked as expected. You performed a test, albeit a manual test. As you continued to add and update features, you probably also continued to run your code and verify it works. But doing this manually every time is tiring, prone to mistakes, and does not scale.  
Computers are great at scaling and automation! So developers at companies large and small write automated tests, which are tests that are run by software and do not require you to manually operate the app to verify the code works.

This is the introduction of a Google test codelab. It not only defines in a pretty straightforward way what automated tests are, but it also tells why you should do that. The reason mentioned here is only the first of the four on the list that I have compiled before, but this is the main reason.

So we write automated tests to save time in the future, it's an investment. We suppose that when we add more features the old ones need to be checked again, and we invest our time in order to save more in the future, but in the short term we will not have a return.

If we imagine a big project with many developers it becomes more clear, we cannot check manually everything every time (if we want to release often or with simplicity). So if we want to release soon and we have no automation tests we end up testing only what seems most important at the moment, exposing ourselves to the risk of regression.

## Count as documentation

This is an easy point. Documentation can be important (less than working software, see agile manifesto) but it's a pain for most and takes a lot of time to do it well. But if tests are written in a certain way they can have the same information of product documentation, that evolves and adapts as the software grows. This way the software can be self-documented.

## Help write better code

This is a very generic sentence, what do I mean by "better code"? First say that software as every other built thing has a quality. A program can be better than another that does the same things based on some parameters (performance, usability and many others), we can divide these parameters into 2 big groups: the one that users notice and the one that users don't.

For example, if the same thing code is written without naming convection or indentation the user doesn't notice and the software runs exactly the same, so why should we care? Because if we want to modify this code, adding new features for example, it will be much much harder.

That said a code is "better" than another when, even if does the same things, it is easier to maintain and to evolve (beeing more readable, respecting the SOLID principles, etc...).

Test helps to increase quality because to make a portion of code testable we are often forced to restructure it and change the management of dependencies. This generally translates into a more correct distribution of responsibilities. So it's better from an architectural point of view.

This doesn't mean that untested code have worse distribution of responsibilities. But testing can help to achieve this goal putting us in a position where we need to rethink our code structure.

## Find bug during development

I think it's uncommon but can happen to find a bug out of an automated test during development. It happens because usually the tested cases in automated tests are more structured than manual tests. Precisely because we are forced to write them and we know that they will remain written it happens that we pay more attention to them. A developer rarely writes all the manual test cases to be performed and then runs them based on how he wrote them. For this reason, the process of writing an automatic test finds problems that may go unnoticed during a manual test.

Contrary to the first two points the benefits of this last two are immediate and do not increase over time, so a strategy could be to delete the test after the development is done. I know that it sounds weird but it makes sense if we don't consider the other points.

## Honorable mentions

There is another point that usually people talk about as a benefit of working on a well-tested project: it is confidence; since developing while having your shoulders covered by tests it's just mentally lighter.

I didn't put it on the list because I am not comparing automation-tests with no-tests, but automation-tests with manual-tests.

# Can test harm?

We have seen what are the pros of automation testing, now let's examine what are the cons.

Tests come at a cost: they can slow down the development process, they can slow down the CI, they can make harder maintenance and refactoring, they can make write worst code.

## Slow down the development process

It has happened to me several times that writing tests has consumed me much more time and effort than developing the tested feature. It can happen due to inexperience, or due to technical limitations for which there is a greater complexity in writing tests.

In these cases I always ask myself if it is really worth it, if the time invested in writing these tests will pay off, and if so after how long.

So focusing only on the first of the benefits, for simplicity, we compare the time invested by writing the tests with the gain that will be obtained over time. When investing money, we can understand if the investment is good based on how long it will take to get back into the investment. The same rule applies to software automation.

![enter image description here](https://imgs.xkcd.com/comics/is_it_worth_the_time_2x.png)

To evaluate it, I refer to this scheme found on internet.

## Slow down the CI

Having a test suite makes sense when it is used in a continuous integration system. Typically tests are fairly fast when taken individually, but these can start to become a problem when they are in large quantities.

This may seem like a marginal problem but having a slow CI is problematic. So be careful because at the beginning they can be like grains of sand and when the project becomes very large, the CI can become like a sandstorm and block the development process like a slow build.

## Make harder maintenance and refactoring

This is the case when a change to the codebase (like refactoring an implementation detail or adding a new feature) also implies changes to the test code even if the previous tested behavior doesn't change.

This means that your test code is heavily coupled with your tested code. And can make frustrating, slow and inefficient working on a project.

## Make write worst code

This point is the exact opposite of the one written above on the list of the pros. Indeed to make a portion of code testable we are often forced to restructure our code, but we can harm doing that.

This is called  _"test-induced design damage"_. This is a concept well expressed [here](https://dhh.dk/2014/test-induced-design-damage.html), that explains the process when the pursuit of easier, faster, or more testing warps your code through needless indirection or complexity.

# Many ways of testing (wrong)

Doing automation test is pretty complex. The first time I entered the testing world it was a nightmare, I was overwhelmed by how many concepts are needed only for testing purposes (things like all types of tests, test-driven development (TDD), test doubles, etc). And on top of that all the framework related stuff. So that I asked myself: is it worth it? Short answer: if you want to be a good developer, yes.

So there are many theoretical concepts and many ways of applying them, and it's really very simple to do it the wrong way.

For pure coding related concepts it's more simple to understand what we are doing wrong. Leaving out the functional aspect, because it is obvious that the code that works as we expect is better than the code that does not. Let's analyze it from an architectural point of view.

Like I said before the code that is easy to change even after months is better than the code that is harder to change, the code that doesn't break in point A when a point B is changed is better than the one how does, etc. So we can put ourselves in a position when, based on experience, we can define boundaries to respect our standard. And should be pretty clear when we cross those boundaries.

For test is a bit different, typically the testing code is not treated as source code, but _"__Test code  **is**  source code, you need to architect it, to maintain it, to refactor it. It's source code that you are not shipping to your users"._ Christina Lee

# How should we test?

Above you can find the reason why you should test and why you should do it carefully. It is really important to do it right or it could be more bad than good. But what are the 'rules' to do it right?

You will find them in the next article.
