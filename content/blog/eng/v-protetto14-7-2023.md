---
authors: ["engineering"]
comments: true
date: "2023-06-16 17:00:00"
draft: true
share: true
categories: ['Protected Fridays']
title: "Venerdì Protetto | July edition: Deserialization, Kubernetes, Machine Learning"
languageCode: "en-US"
type: "post"
twitterImage: '/images/logo_engineering.png'
toc: false
---

<script type="application/ld+json">
{ "@context": "https://schema.org", 
 "@type": "BlogPosting",
 "headline": "Venerdì Protetto - Jun 9th 2023",
 "keywords": "API, Generative AI, User stories", 
 "wordcount": "",
 "publisher": "Facile.it Engineering",
 "url": "https://engineering.facile.it/",
 "datePublished": "2023-07-17",
 "dateCreated": "2023-07-14",
 "dateModified": "2023-07-17",
 "description": "Abstracts of the talks held during the Venerdì Protetto on July 14th",
 "articleBody":"  ",
   "author": {
    "@type": "Person",
    "name": "Ana"
       }
 }
</script>

This page contains the abstracts of the talks held during the latest Venerdì Protetto on July 14, 2023. 

Topics:

- [Deserialization](#deserialization) by Alessio Giorgianni (Facile.it)
- [Kubernetes](#kubernetes) by Dario Tranchitella ([clastix.io](https://clastix.io/))
- [Machine Learning pipelines at Facile.it](#machine-learning-pipelines-at-facileit) by (Facile.it)


The overview of Venerdì Protetto is available [here](https://engineering.facile.it/blog/eng/v-protetto/).

<br>

## Deserialization

### The Attacker's Point Of View

<sup>by [Alessio Giorgianni]()<sup>      

<a href= "https://github.com/anaradujko/facile-it.github.io/blob/protected-friday/static/images/venerd%C3%AC_protetto/Deserialization.png?raw=true" target="_blank"> 
<img align="left" style="width:45%; margin-right: 0.5em" src="https://github.com/anaradujko/facile-it.github.io/blob/protected-friday/static/images/venerd%C3%AC_protetto/Deserialization.png?raw=true" alt="Deserialization" title="Deserialization" /> 
</a>

Serialization is a known concept within software development. Nonetheless, the developer often has only a superficial knowledge of this mechanism, ignoring especially the security-related issues.

So, what might happen if a skilled attacker is able to manipulate a serialized payload maliciously?

The purpose of this talk was to give an introductory overview of the potential attack scenarios that a user attacker could implement, and the consequences they could have (arbitrary file read/write, remote code execution, etc.) by focusing more on the PHP platform.

We started by writing simple introductory exploits and worked our way up to a complex exploit used in the recent bug from the well-known blog [VBullettin](https://www.vbulletin.com/).


<br>

## Kubernetes
### Kubernetes Multi-Tenancy 

<sup>by [Dario Tranchitella](https://clastix.io/)<sup> 

<a href= "https://github.com/anaradujko/facile-it.github.io/blob/protected-friday/static/images/venerd%C3%AC_protetto/Kubernetes.png?raw=true" target="_blank"> 
<img align="left" style="width:45%; margin-right: 0.5em" src="https://github.com/anaradujko/facile-it.github.io/blob/protected-friday/static/images/venerd%C3%AC_protetto/Kubernetes.png?raw=true" alt="Kubernetes" title="Kubernetes" /> 
</a>

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

<br>

## Machine Learning pipelines at Facile.it
### The Chubb and MetLife use cases

<sup>by [Luigi Cerone]( https://www.linkedin.com/in/luigi-cerone/) & [Jacopo Demichelis](https://www.linkedin.com/in/jacopo-maria-demichelis-b20b96196/)<sup> 

<a href= "https://github.com/anaradujko/facile-it.github.io/blob/protected-friday/static/images/venerd%C3%AC_protetto/Deserialization.png?raw=true" target="_blank"> 
<img align="left" style="width:45%; margin-right: 0.5em" src="https://github.com/anaradujko/facile-it.github.io/blob/protected-friday/static/images/venerd%C3%AC_protetto/Deserialization.png?raw=true" alt="Deserialization" title="Deserialization" /> 
</a>

Building a machine learning (ML) model could be challenging, but being able to handle its lifecycle in production at scale is a whole different problem.

In this talk, we shared what’s behind the curtain of many of the ML models in production at Facile. it.

We started from an existing use case, that is, the optimization of leads sold to Chubb and Metlife. 
We then covered both the creation of the models and all the technical solutions, pipelines, and procedures created in the last year to keep them updated and monitored.

<br>

[![IMAGE](https://img.youtube.com/vi/mCw9h0jIuqk/0.jpg)](https://www.youtube.com/embed/mCw9h0jIuqk)

  
The archive of all Venerdì Protetto talks is available [here](/categories/protected-fridays).
