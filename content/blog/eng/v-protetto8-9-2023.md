---
authors: ["engineering"]
comments: true
date: "2023-09-18 13:00:00"
draft: false
share: true
categories: ['Protected Fridays']
title: "Venerdì Protetto | September edition: Code shipping, Community tools, Quix Streams Library"
languageCode: "en-US"
type: "post"
twitterImage: '/images/logo_engineering.png'
toc: false
---

<script type="application/ld+json">
{ 
  "@context": "https://schema.org", 
  "@type": "BlogPosting",
  "headline": "Venerdì Protetto | September edition: Code shipping, Community tools, Quix Streams Library",
  "keywords": "Code shipping, Community tools, Quix Streams Library", 
  "wordcount": "512",
  "publisher": "Facile.it Engineering",
  "url": "https://engineering.facile.it/",
  "datePublished": "2023-09-18",
  "dateCreated": "2023-09-12",
  "dateModified": "2023-09-18",
  "description": "Abstracts of the talks held during the Venerdì Protetto on September 8th, 2023",
  "articleBody": "This page contains the abstracts of the talks held during the latest Venerdì Protetto on September 8, 2023. Topics: Code shipping by Luca Florio (Spotify) Community tools by Giovanni Cardamone Quix Streams Library by Thomas Neubauer (Quix) The overview of Venerdì Protetto is available here. Code Shipping Ship it! From your laptop to production multiple times a day By Luca Florio, Spotify Shipping code We all love to ship our code to production as fast as possible. But how to ensure (well, kind of) that we are not breaking stuff? In the talk, we explored how to implement a CI/CD pipeline to bring the code from our laptops to our servers in the cloud in a safe way. We covered testing, PR review, infrastructure as a code, canary analysis, and all the safeguards that make it hard to take our service down by mistake. Oh, and we need to keep it up and running after we deploy it as well. That is important too, right? Community Tools A place where we can meet By Giovanni Cardamone, Facile.it Community tools Community Tools is an initiative to create a unified community within Facile.it. The key points are improving, having fun, and bringing value to everyone. The initiative focuses on introducing new tools to the company to build a nicer working environment and better integrate into the "Facile lifestyle". Every community member can make a difference by having a space to communicate and compare with others. Community Tools is also a place to find new stuff and learn from each other's work. New workflows, programming languages, and methodologies can be experimented with freely and without deadlines to build everything you think is missing. Quix Streams Library A Python-Kafka connector for data-intensive workloads By Thomas Neubauer, Quix Quix Streams Library This talk introduced Quix Streams, an open-source Python library for data-intensive workloads on Kafka. We discussed the unique problems that this library is designed to solve, and how it was shaped by the challenges of building a Kafka-based solution for Formula 1 cars at McLaren— a solution that needed to process a colossal firehose of sensor data coming in at thousands of samples per second. We also explained why we combined a Kafka API approach with a stream processing library and provided developers with a familiar Pandas DataFrame-like interface. We saw the library in action with a sentiment analysis demo. In this demo, we calculated sentiment scores for incoming messages in a demo chap app—all in real-time, using the HuggingFace Transformer's API. In the end, we connected to Twitter streaming API to send a high volume of data into the pipeline to simulate this use case at scale. We saw how the library can simplify tasks such as: Subscribing to topics and deserializing incoming messages into table rows. Running calculations on a rolling window of messages. Using memory states to apply different functions such as aggregation or filtering. Automatically outputting the results of calculations into downstream topics. Managing state without the hassle of checkpointing and queues. The archive of all Venerdì Protetto talks is available here.
",
  "author": {
    "@type": "Person",
    "name": "Ana"
  }
}
</script>


This page contains the abstracts of the talks held during the latest Venerdì Protetto on September 8, 2023. 

Topics:
- [Code shipping](#code-shipping) by [Luca Florio](https://www.linkedin.com/in/elleflorio/) ([Spotify](https://engineering.atspotify.com/))
- [Community tools](#community-tools) by [Giovanni Cardamone](https://www.linkedin.com/in/giovanni-cardamone-41306973)
- [Quix Streams Library](#quix-streams-library) by [Thomas Neubauer](https://www.linkedin.com/in/tom%C3%A1%C5%A1-neubauer-a10bb144/) ([Quix](https://quix.io/))

The overview of Venerdì Protetto is available [here](https://engineering.facile.it/blog/eng/v-protetto/).

<br>

## Code Shipping

### Ship it! From your laptop to production multiple times a day

<sup>By [Luca Florio](https://www.linkedin.com/in/elleflorio/), [Spotify](https://engineering.atspotify.com/)<sup>

<a href= "/images/venerdì_protetto/shipping-code-1.png?raw=true" target="_blank"> 
<img align="left" style="width:45%; margin-right: 0.5em" src="/images/venerdì_protetto/shipping-code-1.png?raw=true" alt="Shipping code" title="Shipping code" /> 
</a>

We all love to ship our code to production as fast as possible. But how to ensure (well, kind of) that we are not breaking stuff?

In the talk, we explored how to implement a CI/CD pipeline to bring the code from our laptops to our servers in the cloud in a safe way. We covered testing, PR review, infrastructure as a code, canary analysis, and all the safeguards that make it hard to take our service down by mistake. 

Oh, and we need to keep it up and running after we deploy it as well. That is important, too, right?

<br>

## Community Tools

### A place where we can meet

<sup>By [Giovanni Cardamone](https://www.linkedin.com/in/giovanni-cardamone-41306973), Facile.it<sup>

<a href= "/images/venerdì_protetto/community-tools.png?raw=true" target="_blank"> 
<img align="left" style="width:45%; margin-right: 0.5em" src="/images/venerdì_protetto/community-tools.png?raw=true" alt="Community tools" title="Community tools" /> 
</a>

Community Tools is an initiative to create a unified community within Facile.it. The key points are improving, having fun, and bringing value to everyone. 

The initiative focuses on introducing new tools to the company to build a nicer working environment and better integrate into the "Facile lifestyle". Every community member can make a difference by having a space to communicate and compare with others. 

Community Tools is also a place to find new stuff and learn from each other's work. New workflows, programming languages, and methodologies can be experimented with freely and without deadlines to build everything you think is missing.

<br>

## Quix Streams Library 

### A Python-Kafka connector for data-intensive workloads

<sup>By [Thomas Neubauer](https://www.linkedin.com/in/tom%C3%A1%C5%A1-neubauer-a10bb144/), [Quix](https://quix.io/)

<a href= "/images/venerdì_protetto/quix-streams.png?raw=true" target="_blank"> 
<img align="left" style="width:45%; margin-right: 0.5em" src="/images/venerdì_protetto/quix-streams.png?raw=true" alt="Quix Streams Library" title="Quix Streams Library" /> 
</a>

This talk introduced Quix Streams, an open-source Python library for data-intensive workloads on Kafka.

We discussed the unique problems that this library is designed to solve and how it was shaped by the challenges of building a Kafka-based solution for Formula 1 cars at McLaren. This solution needed to process a colossal firehose of sensor data coming in at thousands of samples per second. We also explained why we combined a Kafka API approach with a stream processing library and provided developers with a familiar Pandas DataFrame-like interface.

We saw the library in action with a sentiment analysis demo. In this demo, we calculated sentiment scores for incoming messages in a demo chap app, all in real-time, using the HuggingFace Transformer's API. In the end, we connected to Twitter streaming API to send a high volume of data into the pipeline to simulate this use case at scale.              

We saw how the library can simplify tasks such as:

- Subscribing to topics and deserializing incoming messages into table rows.
- Running calculations on a rolling window of messages.
- Using memory states to apply different functions such as aggregation or filtering.
- Automatically outputting the results of calculations into downstream topics.
- Managing state without the hassle of checkpointing and queues.

<br>

The archive of all Venerdì Protetto talks is available [here](/categories/protected-fridays).
