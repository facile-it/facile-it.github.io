---

authors: ["engineering"]
comments: true
date: "2024-10-11 10:00:00"
draft: false
share: true
categories: ['Protected Fridays']
title: "Venerdì Protetto | October 2024"
description: "What happened in the latest Venerdì Protetto?"
languageCode: "en-US"
type: "post"
twitterImage: '/images/social/suggested/9_stock.jpg'
twitterLargeImage: '/images/social/suggested/9_stock.jpg'
toc: false

---

This page contains the abstracts of the talks held during the latest Venerdì Protetto on October 11, 2024. 

Topics:

- [Growing teams](#growing-teams) by [Ferdinando Santacroce](https://jesuswasrasta.com/) ([Agile Reloaded](https://www.linkedin.com/company/agile-reloaded/))
- [Digital twins](#digital-twins) by [Stefano Fago](https://www.linkedin.com/in/stefanofago/) ([Gewiss](https://www.linkedin.com/company/gewissgroup/))


<br>

## Growing teams

### Managing teams by mimicking the Agile model

<sup>by [Ferdinando Santacroce](https://jesuswasrasta.com/), ([Agile Reloaded](https://www.linkedin.com/company/agile-reloaded/))<sup>

<a href= "/images/venerd%C3%AC_protetto/growing_teams.png?raw=true" target="_blank"> 
<img align="left" style="max-width:40%; margin-right: 0.5em; margin-top: 0.5em" src=/images/venerd%C3%AC_protetto/growing_teams.png?raw=true" alt="" title="" /> 
</a>

The speaker is an experienced professional who transitioned from working as a developer to his current role as a trainer, coach, and consultant. Drawing on his extensive experience in software development, Ferdinando has mastered techniques to build software that can grow harmoniously on a solid foundation. During the talk, we explored how similar practices can be applied to evolve development teams effectively. The speaker shared thoughts and insights on how to grow teams and the people in them.

<br>

## Digital twins

### Key concepts in digital twin technology

<sup>by [Stefano Fago](https://www.linkedin.com/in/stefanofago/), ([Gewiss](https://www.linkedin.com/company/gewissgroup/))<sup> 

<a href= "/images/venerd%C3%AC_protetto/digital_twins.png?raw=true" target="_blank"> 
<img align="left" style="max-width:40%; margin-right: 0.5em; margin-top: 0.5em" src=/images/venerd%C3%AC_protetto/digital_twins.png?raw=true" alt="" title="" /> 
</a>

In this talk, we discussed the concept of digital twin in the context of an increasingly smart product landscape that is becoming more prominent in our lives. The discussion was enriched with an overview of the architecture of digital twin platforms, focusing on the real-time integration of physical entities with their digital counterparts. We explored key concepts such as digital twin aggregates, lifecycle management, and digital product passport (DPP), as well as the role of distributed systems in terms of scalability, resilience, fault tolerance, and security to ensure stability in complex and data-intensive environments.

<br>

The overview of Venerdì Protetto is available [here](https://engineering.facile.it/blog/eng/v-protetto/).


## Data Backbone, CDP & Marketing Automation

by Alessandro Lai, Nicola Bonicelli, Marco Saletta

This internal talk was prepared to show to the whole dev polutation the advancement on the internal project of Data Backbone, CDP & Marketing Automation. The union of these three platforms is a powerful driver for the growth of the company in the coming years.

The "Data Backbone" is an internal project that, leveraging Google Cloud Pubsub and BigQuery, aims to create a single platform to share data and democratize the access to it, across teams and projects. Each team will publish the core events that build their business logic using PubSub and AVRO schemas, and the data will be readily available in near-real-time via PubSub, and archived under BigQuery. To make the implementation easier, the Platform team has produced an SDK in the two main languages used in the company (PHP & Typescript), and the DXCP team has adopted [Crossplane](https://www.crossplane.io/) to allow each team to deploy the needed cloud resources and orchestrate them without having to worry about them or increase the team's cognitive load.

The CDP (Customer Data Platform) is a SaaS tool that we adopted to centralize and collect the information from the Data Backbone and many other sources, and in turn pass all the needed data to the third element of the chain, the Marketing Automation. The Marketing Automation is another SaaS tool that, once loaded with all the data, will allow our colleagues from the Marketing team do be autonomous in driving the comunications toward our customers, creating personalized customer journeys and email templates without dev intervention.

<script type="application/ld+json">
{ 
    "@context": "https://schema.org",
    "genre":["SEO","JSON-LD"],
    "@type": "BlogPosting",
    "headline": "Venerdì Protetto | October 2024",
    "keywords": ["Growing teams", "Digital twins"],
    "wordcount": "172",
    "publisher": {
        "@type": "Organization",
        "name": "Facile.it Engineering",
        "url": "https://engineering.facile.it/",
        "logo": {
            "@type": "ImageObject",
            "url": "https://engineering.facile.it/images/logo_engineering.png",
            "width":"1057",
            "height":"244"
        }
    },
    "url": "https://engineering.facile.it/blog/eng/v-protetto9-6-2023/",
    "image": "https://engineering.facile.it/images/social/social-preview.png",
    "datePublished": "2024-10-11",
    "dateCreated": "2024-10-18",
    "dateModified": "2024-10-18",
    "inLanguage": "en-US",
    "isFamilyFriendly": "true",
    "description": "About the latest Venerdì Protetto held on October 11th",
    "author": {
        "@type": "Person",
        "name": "Ana",
        "url": "https://www.linkedin.com/in/ana-radujko"
    }
}
</script>
