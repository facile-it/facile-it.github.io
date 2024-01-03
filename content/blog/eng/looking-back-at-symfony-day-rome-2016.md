---
authors: ["mario-maraone", "salvatore-cordiano"]
date: "2016-11-07"
draft: false
share: true
categories: [English, Symfony, Conferences]
title: "Looking back at Symfony Day Rome 2016"
type: "post"
languageCode: "en-EN"
twitterImage: '/images/looking-back-at-symfony-day-rome-2016/symfonyday_collage.jpg'
---
Every year the [GrUSP](http://www.grusp.org/), in cooperation with one of the italian PHP user groups, organizes the italian **[Symfony](http://symfony.com/)** conference. This year the [event](http://2016.symfonyday.it/) was organized in the Capital on 28th October with the help of [PHP User Group Roma](http://roma.grusp.org/), and a part of Facile Dev Team was there for the occasion. In Facile we believe attending to events like this is a good way to learn new things, share practical experiences and improve our network.

This post would be a short recap of all the talks.

![A part of Facile Dev Team](/images/looking-back-at-symfony-day-rome-2016/faciledev_symfonyday_2016.jpg)

# Schedule{#schedule}

## Symfony and micro (not so much) service{#symfony-and-micro-not-so-much-service}

Talk by: **[Michele Orselli](https://x.com/_orso_)**
<br/>Duration: 30 minutes

Michele Orselli presented a case study of a [monolithic application](https://en.wikipedia.org/wiki/Monolithic_application) broken down into many smaller microservices. How many ways can we split a webapp? Why smaller is better? How services can interact each other? In his talk Michele answered all those questions focusing on all the advantages of the proposed architecture and a few common pitfalls.

*View slides [here](http://www.slideshare.net/MicheleOrselli/symfony-e-micro-non-cosi-tanto-services)*

## Scaling Symfony apps{#scaling-symfony-apps}

Talk by: **[Matteo Moretti](https://x.com/mat_teo8)**
<br/>Duration: 45 minutes

A scalable application must support an increasing amount of data or a growing number of users. In his talk, Matteo Moretti described the architecture needed to scale. He divided the overall architecture into 4 main components: web server, sessions, database and the filesystem. He explained the right configuration to his main purpose: improving performance of a webapp.

*View slides [here](http://www.slideshare.net/matteomoro8/scaling-symfony-apps)*

## E-commerce with Symfony: from case study to reality{#e-commerce-with-symfony-from-case-study-to-reality}

Talk by: **[Simone D'Amico](https://x.com/dymissy)**
<br/>Duration: 30 minutes

Sylius, Elcodi, Thelia, Sonata Project, Well Commerce, Shop Plus, Aimeos: these are the most popular results you can find if you google  "e-commerce solution with Symfony". But which one is the final winner? Why choosing one or another? Simone D'Amico reviewed all of these frameworks and libraries comparing strengths and drawbacks. Moreover he clarified the stack he used to build an e-commerce platform.

*View slides [here](http://www.slideshare.net/dymissy/ecommerce-con-sf-dal-case-study-alla-realt)*

## A journey into Symfony form component{#a-journey-into-symfony-form-component}

Talk by: **[Samuele Lilli](https://x.com/SamueleLilli)**
<br/>Duration: 45 minutes

[Symfony form component](http://symfony.com/doc/current/forms.html) is the main obstacle for beginners and newbies in the Symfony world. Samuele Lilli gave a talk with the purpose to clarify this hot topic with a lot of examples and code snippets. He started from the simplest form examples to more advanced ones. He revealed a lot of tips and explanations for several scenarios in order to make this powerful component understandable and manageable by everyone.

*View slides [here](http://www.slideshare.net/SamueleLilli/symfony-day-2016)*

![Symfony Day 2016](/images/looking-back-at-symfony-day-rome-2016/symfonyday_collage.jpg)

## PHP7 and Rich Domain Model{#php7-and-rich-domain-model}

Talk by: **[Massimiliano Arione](https://x.com/garakkio)**
<br/>Duration: 30 minutes

In this talk Massimiliano Arione told about his experience in the migration to PHP7 of a Symfony based project. Particularly he focused on the usage of type hinting and return types and the issues encountered with an [Anemic Domain Model](https://en.wikipedia.org/wiki/Anemic_domain_model) approach suggested by the framework official documentation. He showed how to combine a Rich Domain Model without giving up new language features.

*View slides [here](http://www.slideshare.net/garak/php7-e-rich-domain-model)*

## Relevance sorting with Elasticsearch & a bit of maths{#relevance-sorting-with-elasticsearch-and-a-bit-of-maths}

Talk by: **[Matteo Dora](https://x.com/mattbit_)**
<br/>Duration: 45 minutes

The main topic of the talk was [Elasticsearch](https://www.elastic.co/products/elasticsearch). Elasticsearch is a distributed, RESTful search and analytics engine with a great Symfony integration. Matteo Dora, the speaker of this talk, explained how to deal when the sorting by relevance becomes hard using the right amount of math and [FOSElasticaBundle](https://github.com/FriendsOfSymfony/FOSElasticaBundle).

*View slides [here](https://speakerdeck.com/mattbit/elasticsearch-and-a-bit-of-maths)*

## Command: the easy way{#command-the-easy-way}

Talk by: **[Antonio Carella](https://x.com/aczepod)**
<br/>Duration: 30 minutes

Antonio Carella illustrated a real case how to create command-line commands using the [Symfony console component](https://symfony.com/doc/current/console.html). He showed how console commands can be used for any recurring task, such as cronjobs, imports, or other batch jobs.

*View slides [here](http://www.slideshare.net/antoninocarella1/command-the-easy-way)*

## ORM hero{#orm-hero}

Talk by: **[Simone Di Maulo](https://x.com/toretto460)**
<br/>Duration: 45 minutes

This talk was a journey in the *magical world* of [Doctrine](http://www.doctrine-project.org/), the most known ORM for Symfony and not only. Simone Di Maulo described how Doctrine works under the hood to better understand when and why to use its features.

*View slides [here](http://www.slideshare.net/SimoneDiMaulo/orm-hero)*
