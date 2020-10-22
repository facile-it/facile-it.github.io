---
authors: ["carmine-laface"]
date: "2020-10-22"
draft: false
share: true
categories: [English, Software Testing]
title: "Automation testing: a step back"
type: "post"
languageCode: "en-EN"
toc: true
---

The goal of this article is to define basic concepts related to testing, trying not to take anything for granted.

# Why do we test??

Why is it important to write automated tests? I asked myself and I did some research because the answer to this question was not obvious to me. I knew it was important but I didn't know why. So, I decided to try to explain it starting from a point of view as impartial as possible.

After some research, I came to the conclusion that the benefits of tests are four: they can avoid regression, they can count as documentation, they can help write better code and they can help find bugs during development.

Let's focus on one at a time and analyze it.

## Avoid regression

> When you implemented a feature in your app, you likely ran the code to verify that it worked as expected. You performed a test, albeit a manual test. As you continued to add and update features, you probably also continued to run your code and verify it works. But doing this manually every time is tiring, prone to mistakes, and does not scale.  
Computers are great at scaling and automation! So developers at companies large and small write automated tests, which are tests that are run by software and do not require you to manually operate the app to verify the code works.

This is the introduction of a [Google test codelab](https://codelabs.developers.google.com/codelabs/advanced-android-kotlin-training-testing-basics/#0). It not only defines in a pretty straightforward way what automated tests are, but it also tells why you should do that. This reason is only the first of the four on the list that I have compiled before, but it is the main reason.

So, we write automated tests to save time in the future, it's an investment. We suppose that when we add more features the old ones need to be checked again. We invest our time in order to save more in the future but in the short term we will not have a return.

If we imagine a big project with many developers, it becomes clearer. If we want to release often or with simplicity, we cannot check everything manually every time. Therefore, if we want to release soon and we don't have any automation tests, we will end up testing only what seems most important at the moment. In this way, we expose ourselves to the risk of regression.

## Count as documentation

This is an easy point. Documentation can be important (less than working software, see agile manifesto) but it's a pain for most developers and takes a lot of time to do it well. But if tests are written in a certain way they can have the same information of product documentation, that evolves and adapts as the software grows. This way the software can be self-documented.

## Help write better code

This is a very generic sentence, what do I mean by "better code"? First, remember that software quality, as that of other built things, can be measured. A program can be better than another one that does the same things based on some parameters (performance, usability and many others). We can divide these parameters into 2 big groups: the one that users notice and the one that users don't.

For example, if the same code is written without naming convention or indentation, end-users don't notice it and the software runs exactly the same. So why should we care? Because if we want to modify this code, for example by adding some new features, it will be much harder without naming conventions and indentation.

That said, a code is "better" than another one when, even if does the same things, it is easier to maintain and to evolve (being more readable, respecting the SOLID principles etc.).

Tests help to increase quality, because making testable code forces us to restructure it and to change dependency management. This generally translates into a more correct distribution of responsibilities. So, it is better from an architectural point of view.

This doesn't mean that untested code has worse distribution of responsibilities. However, testing can help to achieve this goal by putting us in a position where we need to rethink our code structure.

## Find bug during development

I think it is uncommon, but it can happen to find a bug in an automated test during development. It is uncommon because test cases in automated tests are usually more structured than those in manual tests. This is because we are forced to write down automated test cases and we know that they will remain written. Therefore, we pay more attention to automated test cases. Developers do not write manual test cases often neither they run them based on how they wrote them. For this reason, the process of writing an automated test spots problems that may go unnoticed during a manual test.

Unlike the first two points, the benefits of the latter two are immediate and do not increase over time. Therefore, a good strategy could be to delete the test after the development is complete. I know that it sounds weird but it makes sense if we don't consider the other points.

## Honorable mentions

There is another point that is usually cited as an advantage of working on a well-tested project: confidence. In fact, developing with your shoulders covered by tests lightens your mind.

I didn't put this point on the list because I am not comparing automation-tests with no-tests, but automation-tests with manual-tests.

# Can test harm?

We have seen the pros of automation testing, now let's examine the cons.

Tests come at a cost: they can slow down the development process, they can slow down the CI, they can make maintenance and refactoring harder, they can make you write worse code.

## Slow down the development process

It has happened to me several times that writing tests took me longer and required more effort than developing the tested feature. This can happen due to inexperience, or due to technical limitations for which writing tests is more complicated.

In these cases I always ask myself if it is really worth it, if the time invested in writing these tests will pay off and, if so, after how long.

Therefore, focusing only on the first of the benefits for simplicity'sake, we compare the time spent in writing the tests with the gain that will be obtained over time. When you invest money, you can see if the investment is good based on how long it will take to get back into the investment. The same rule applies to software automation.

![enter image description here](https://imgs.xkcd.com/comics/is_it_worth_the_time_2x.png)

To evaluate it, I refer to this scheme found on internet.

## Slow down the CI

Having a test suite makes sense when used in a continuous integration system. Usually, tests are quite fast when taken individually, but they can start to become a problem when they are in large quantities.

This may seem like a marginal problem but having a slow CI is problematic. So be careful because at the beginning tests can be like grains of sand and when the project becomes very large, the CI can become a sandstorm and it can block the development process like a slow build.

## Make maintenance and refactoring harder

This is the case when a change to the codebase (like refactoring an implementation detail or adding a new feature) also implies changes to the test code even if the previous tested behavior doesn't change.

This means that your test code is heavily coupled with your tested code. This can make working on a project frustrating, slow and inefficient.

## Make write worse code

This point is the exact opposite of the one written above on the list of the pros. In fact, in order to make a part of the code testable we are often forced to restructure our code but this can be harmful.

This is a concept that is well expressed [here](https://dhh.dk/2014/test-induced-design-damage.html). By _"test-induced design damage"_, we refer to the process induced by the search for easier, faster or more tests that deforms your code through unnecessary indirection or complexity.

# Many ways of testing (wrong)

Doing automation test is pretty complex. The first time I entered the testing world it was a nightmare, I was overwhelmed by how many concepts are needed only for testing purposes (i.e. several types of tests, test-driven development (TDD), test doubles, etc). And on top of that, all the framework related stuff. So that I asked myself: is it worth it? Short answer: if you want to be a good developer, yes.

In fact, there are many theoretical concepts and many ways of applying them and it is really very likely to do it the wrong way.

With regard to pure coding related concepts, it is easier to understand what we are doing wrong. Leaving out the functional aspect, since it is obvious that the code that works as expected is better than the one that does not, let's analyze it from an architectural point of view.

Like I said before, code that is easy to change even after months is better than code that is hard to change. Code that does not break in point A when point B has changed is better than code that breaks, etc. Therefore, we can put ourselves in a position where, based on experience, we can define the boundaries to meet our standard. Then, it should be pretty clear when we cross those boundaries.

For what concerns tests, the situation is a bit different. Typically, testing code is not treated as source code, but _"__Test code is source code, you need to architect it, to maintain it, to refactor it. It's source code that you are not shipping to your users"._ Christina Lee

# How should we test?

Above you can find the reason why you should test and why you should do it carefully. It is really important to do it right, otherwise it can be more harmful than useful. But what are the 'rules' to do it right?

You will find them in the next article.
