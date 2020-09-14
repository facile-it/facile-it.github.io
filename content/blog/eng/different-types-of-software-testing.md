---
authors: ["andrea-gubellini"]
date: "2020-09-14"
draft: false
share: true
categories: [English, Testing, QA, Automation]
title: "Types of software testing"
type: "post"
languageCode: "en-EN"
toc: true
---

## Why do I need to test?

Everyone who works in software development has stumbled upon **software testing**.

Why should a developer know anything about testing?  
Well software testing is a valuable asset and a big part of development: it does not only test the application, it teaches to think outside the box and write code with quality in mind.  
Don't forget it helps finding those **scary bugs** we're all afraid of.

## Software testing is not finding bugs 

Software testing goal is not only to *find bugs* and *"break things"*, there should be a deep knowledge of the tested application, an idea of the whats, the whys and the hows the application is being tested and a strong concept of quality.  

Tests do not break software. In fact the software is already broken before the QA/Developer finds out by running some tests: if we put it this way it is clear that focusing on enhancing code quality, analyzing the features before development and having a good amount of tests are good things to do.

## Types

So how do we plan test design and how can we decide *which types* of tests suits *our application*?  

There are many types of software tests, in this list I am going to cover some of the **most common** ones and explain how they work.


### Acceptance tests

Acceptance tests are based on business requirements, this type of tests checks whether the end-to-end process works as intended by the business or user requirements.
We often see this type of tests as the last step of the software delivery cycle: whether it is run automatically in a CI or performed manually by a Developer or QA.
The software is usually accepted when the feature works as expected by the requirements.

### Functional tests

This type of tests checks that a specific feature functionality is working as intended by the business or user requirement. Differently from the previously seen **Acceptance Tests* this type does not rely on a fully functioning application as it only tests a specific feature of it.
An example of functional test may be checking that a login component is working as expected.

### Smoke tests

Smoke tests are usually run before executing other types of tests. This type is very basic as it checks the application is working from high level perspective.
These tests can check, for example, that a website's main page is loaded correctly while different types of tests will check the functionalities right after.
Smoke tests should be quick and easy to both automate and maintain.

### Integration tests

These tests usually verify that different sections and services of an application work together as expected. This type of test is usually quite easy to automate and maintain but can be very expensive due to the requirement of having different services up and running.

### Unit tests

Unit are source-level tests which are executed on an individual portion of the application code: these tests are typically automated and run by software developers.
Unit tests verify that the specific unit/function respects the intended design and works as expected.
This type of tests is usually seen automated and executed in continuous integration servers.

### Performance tests

Performance tests verify if the application performance is compromised during high loads. This type of tests split in mupltiple sub-types:

```
Load testing
Load testing is the simplest form of performance testing. A load test is usually conducted to understand the behaviour of the system under a specific expected load. This load can be the expected concurrent number of users on the application performing a specific number of transactions within the set duration. This test will give out the response times of all the important business critical transactions. The database, application server, etc. are also monitored during the test, this will assist in identifying bottlenecks in the application software and the hardware that the software is installed on.

Stress testing
Stress testing is normally used to understand the upper limits of capacity within the system. This kind of test is done to determine the system's robustness in terms of extreme load and helps application administrators to determine if the system will perform sufficiently if the current load goes well above the expected maximum.

Soak testing
Soak testing, also known as endurance testing, is usually done to determine if the system can sustain the continuous expected load. During soak tests, memory utilization is monitored to detect potential leaks. Also important, but often overlooked is performance degradation, i.e. to ensure that the throughput and/or response times after some long period of sustained activity are as good as or better than at the beginning of the test. It essentially involves applying a significant load to a system for an extended, significant period of time. The goal is to discover how the system behaves under sustained use.

Spike testing
Spike testing is done by suddenly increasing or decreasing the load generated by a very large number of users, and observing the behaviour of the system. The goal is to determine whether performance will suffer, the system will fail, or it will be able to handle dramatic changes in load.

Breakpoint testing
Breakpoint testing is similar to stress testing. An incremental load is applied over time while the system is monitored for predetermined failure conditions. Breakpoint testing is sometimes referred to as Capacity Testing because it can be said to determine the maximum capacity below which the system will perform to its required specifications or Service Level Agreements. The results of breakpoint analysis applied to a fixed environment can be used to determine the optimal scaling strategy in terms of required hardware or conditions that should trigger scaling-out events in a cloud environment.

Configuration testing
Rather than testing for performance from a load perspective, tests are created to determine the effects of configuration changes to the system's components on the system's performance and behaviour. A common example would be experimenting with different methods of load-balancing.

Isolation testing
Isolation testing is not unique to performance testing but involves repeating a test execution that resulted in a system problem. Such testing can often isolate and confirm the fault domain.

Internet testing
This is a relatively new form of performance testing when global applications such as Facebook, Google and Wikipedia, are performance tested from load generators that are placed on the actual target continent whether physical machines or cloud VMs. These tests usually requires an immense amount of preparation and monitoring to be executed successfully.
```
*source: wikipedia*

### Exploratory testing

Exploratory testing relies on finding all those not expected behaviors which may be not so obvious to design or cover in a test execution. 
There's usually a time limit and a specific part of the application that has to be covered by the exploratory tests: after the time limit has expired all the people involved in the execution reports all the unexpected behaviors found on the application.

This type of tests is one of the most expensive in terms of time but yet one of the best ways to cover your application from regression and UI bugs as the majority of the issues that are reported in this phase are usually difficult to find with automated tests.


## Notes and conclusions

We've understood that there's no such thing as 'breaking stuff', there are many types of testing (and many more than what we've covered) and most importantly that it's good to know atleast some of them.

Testing is part of the development and having knowledge about them should be a focus for everyone who works in the development of an application. 

Don't forget to check what's the best approach to test your application and plan some time with your team to discuss, review and create some tests for it!