---
authors: ["nicola"]
comments: true
date: "2016-06-20"
draft: true
share: true
categories: [English, Agile, Scrum, Kanban]
title: "An Agile workflow"
ita: "un-flusso-di-lavoro-agile"

languageCode: "en-EN"
type: "post"
---
Talking about **agile methodologies** is very difficult. First of all, because it is not possible to define a generic method that is universally valid. I am used to listen that "with SCRUM you’ll be sure to get good results". I think this is incorrect.

Lots of people assume that the values and principles of the [Agile Manifesto](http://www.agilemanifesto.org/) are just a collection of "ready to use recipes" to achieve good results in a software development process. What is "*agile*" with this approach? It's like cooking with a kitchen robot. For this reason, I am sure that the perfect recipe is something to discover "testing" your favorite ingredients combined together (I’ll continue with the cooking puns... You’ve been warned!).

Some likes simple recipes, like a *grill*. For example, some groups like a very present manager, a boss that tells to every member of the team what he wants them to do, step by step. All is guided but efficient. 
Others love sophisticated organization, like a complex recipe of a *starred restaurant*. Very complicated systems to track communications and time organization (remote teams often needs procedures and tools, I admire this kind of complexity).
In the end, we have groups that love *fast food*. Fast food is the same everywhere and all people love it! Like SCRUM. 
So, someone can assume that SCRUM is a good recipe because many people like standard recipes. But, are we sure that the typical fast food sandwich is the best way to eat?

## Learn from your own mistakes
Our group have crossed some months trying to apply SCRUM. It was just trouble! We were trying to understand where we were failing, without any clue. We got a lot of stress and created a lot of conflicts, and our retrospectives seemed more like an Alcoholics Anonymous meeting rather than a time for giving feedback. Now we know some of the things that we did wrong:

 * our internal client had **fast-changing requirements**, that changed faster than our one-week iteration; these changes generated too much frustration and we were feeling that every iteration was failing;
 * we had just lose some important and senior developers; our domain is very complicated and we had trouble with estimation; every week we were reducing the quality of our codebase with technical debt and the quality of our work life;
 * we didn’t understand **how important is the SCRUM Master**; he is someone that protects the values and ceremonies of this practice; we moved between iteration without celebrating success or trying to change something.
 
 Trying to reproduce franchise-famous sandwiches, at home, by hand, without all the high standards and quality assurance that a big chain imposes on its affiliates it's a recipe for disaster.

## Change recipe
I think that being an **Agile Developer** is, first of all, don’t being trapped in a particular mindset. So, during an iteration, I halted the team and I told them that these was not what I think is being Agile. We started looking for **a different recipe**, something right for our needs. At first we looked to the characteristics of our group:

 * priorities change every day;
 * we want quality and high technological components;
 * our team is very good but many of us don’t know the domain well enough;
 * we don’t know our velocity yet and we think that this parameter will change every week with our understanding of the domain;
 * we can’t stop writing code because there are a lots of bugs, and our client needs our releases.

The team is composed by five developers and a product specialist (a team member that collect all the client needs and bugs and that helps us to keep processes useful).
Since we were receiving a continuous flux of new requestes, we opened a Google Drive Spreadsheet to track user stories from the product specialist, and to every story we put a label to describe the domain (frontend, invoicing, etc.) and a summary estimate (from little story to epic). This is our **backlog**.

At the begin of the month we use to have a **backlog review** with the manager to find the priorities and we remove stories in conflict, along the with business manager. An important ingredient is continuous adaptation, so we choose to use Kanban to review our workflow. We use Trello to see our stories (tasks) moving in the board, and the first column is "next steps": we do not have an iteration, we use the column to put up stories when it's empty, generally from the backlog or directly by the client's requests (that's continuous prioritization!). 

Every story contains a label from the backlog, so every developer can understand what kind of task is looking at (often a new member of team can make just a simple task). When a developer is available, he "adopts" a story and he moves the card into the "doing" column, and he puts his avatar on the card. Doing a story for us is: getting information from client, checking mock-ups, develop, create a demo environment and release. When the task is finished and released, we move the card in the "to be checked in production" column. After some days without issues, we can consider the task really "done" and we move it to the appropriate column.

For every story we try to adopt good practices like unit and functional testing. We check our activity with continuous integration tools. New domains stories are the most critical because we must made many important choices related to the project's architecture. I think that pair programming it is not a technique to double the release speed, rather a way to halve "stupidity" and mistakes of developers! Anyone can do something wrong but doing a mistake together is rare, probably someone will try to challenge the solution during important choices.
If there are some problems with a story, we use to help the team member in trouble even with two o three developer to move the story to the done column (this is Kanban practice).

Every two weeks, at least one member of the team protects the others developers from bugs, problems and various stuff needed by client and management. This kind of disturbance could damage our iteration plans. This developer protects the team from distractions. We call him "the wallman"! When the wallman is free, there is always some technical debt to be cleared or something to be refactored. Our team, following the Lean way, releases a lot of quick experimental features. Sometimes it's manipulation of pre-existent code. When the client gives us positive feedback, the wallman helps us to clean the code. So, the team can use time to develop new business features while the wallman protects them from small bugs.

This recipe is the combination of many ingredients. We like that! I’m not sure that is good in every situation and every team, but we think that it's good and it respects our values (and the values of the Agile Manifesto).

## The perfect recipe
I think that like in cooking, when every good recipe has a little part sweet and a part sour, every combination of practices must follow fundamentals principles. Put them in your world! We all need challenges, we all need retrospectives, and in the end, the right combination will make you forget *fast food* and you will discover a great homemade sandwich! 
