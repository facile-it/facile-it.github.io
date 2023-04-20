---
authors: ["engineering"]
comments: true
date: "2023-04-20 17:02:00"
draft: false
share: true
categories: [Venerdì Protetto]
title: "Venerdì Protetto 14 April 2023"
languageCode: "en-US"
type: "post"
twitterImage: '/images/logo_engineering.png'
toc: false
---

This page contains the abstracts of the talks held during the latest Venerdì Protetto on April 14, 2023. 

Topics: 

- [Backstage](#backstage) by Lee Mills  
- [Code revolution](#code-revolution) by Mirko Urru & Stefano Giurgiano 
- [Dynamic forms](#dynamic-forms) by Giovanni Fiorentino 

<br>

## Backstage 

### An introduction to Backstage, managing the chaos

<sup>by [Lee Mills](https://www.linkedin.com/in/codetoy/), Spotify</sup>

At the beginning of this year, our engineering teams adopted a new tool: Backstage, an open-source platform for building developer portals created at Spotify. During this Venerdì Protetto, we had the opportunity to host Lee Mills, a member of the Spotify engineering team. Here is a word from our guest:  

> At Spotify, we've always believed in the speed and ingenuity that comes from having autonomous development teams. But as we learned firsthand, the faster you grow, the more fragmented and complex your software ecosystem becomes. And then everything slows down again. Introducing Backstage, a developer portal designed to tame the chaos, bring consistency, and do it all while empowering autonomy and you to make decisions.
>

During the talk, we discussed the following points:

-   Introduction to Backstage
-   Extension points and potential of Backstage
-   Invitation to developers to contribute to the project
-   Development road map and new intriguing features to expect in future releases

To learn more about Backstage, visit the official [Backstage website](https://backstage.io/docs/overview/what-is-backstage/ "https://backstage.io/docs/overview/what-is-backstage/").

<br>

## Code revolution

### Codebase restructuring with Clean Architecture and NestJS

<sup>by [Mirko Urru](https://www.linkedin.com/in/mirkourru/) & [Stefano Giurgiano](https://www.linkedin.com/in/stefano-giurgiano-023545150/), Facile.it</sup>

Ensuring code organization and scalability of the software regardless of the framework. If this is your goal, you as well might be interested in the topic of Clean Architecture and its application in the context of software development.

In this talk, we learned how the Clean Architecture can be framework-independent and how it has been integrated into server-side applications in Node.js: NestJS. In particular, we explored how the NestJS approach to creating modules, services, and controllers can be used to implement a project structure based on the Clean Architecture. We also discussed how the dependency injection pattern of NestJS can be used to implement greater modularity within the Clean Architecture, allowing better separation of responsibilities and greater testability of the code.

To learn more, read one of the articles about this topic:

-   [Clean architecture with Nest.js](https://medium.com/@jonathan.pretre91/clean-architecture-with-nestjs-e089cef65045 "https://medium.com/@jonathan.pretre91/clean-architecture-with-nestjs-e089cef65045")
-   [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html")
-   [The Clean Architecture - Beginner's Guide](https://betterprogramming.pub/the-clean-architecture-beginners-guide-e4b7058c1165 "https://betterprogramming.pub/the-clean-architecture-beginners-guide-e4b7058c1165")  

<br>

## Dynamic forms

### Using React with in-house libraries

<sup>by [Giovanni Fiorentino](https://www.linkedin.com/in/giovanni-fiorentino-25004b74/), Facile.it</sup>

Creating a simple yet flexible and powerful form structure is always a topic of interest in front-end development, especially during an intensive rewriting and refactoring of the codebase.

In this talk, we learned about a need that emerged during the migration to React.js, carried out by our Gas & Power Team. In that circumstance, the team needed to create a set of forms for the Facile.it internal checkout. The forms had to have several similarities but also some differences, depending on the company and the offer. Rather than having many similar components or one that was too complex, our engineers chose to describe the forms through a unique configuration. They consequently built a component capable of designing the modules according to that unique configuration. For this purpose, they used two libraries of the Facile.it design system: Full Metal UI (FMUI) for layout and design of the form via custom components and Bilden for validation. This approach to creating forms was successfully applied to the internal checkout and the code was imported into a common library.

The talk included some practical examples of the use of this common library and a mini-workshop during which we had the opportunity to design forms.

To learn more about this topic, take a look at these resources:

- [Customising JSON Forms](https://kukshalkanishka.medium.com/customising-json-forms-7fc75f627fff)
- [JSON Forms](https://jsonforms.io/)

<br>

The overview of Venerdì Protetto is available [here](https://engineering.facile.it/categories/venerdi-protetto/).
