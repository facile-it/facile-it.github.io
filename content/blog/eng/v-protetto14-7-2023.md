---
authors: ["engineering"]
comments: true
date: "2023-07-27 13:00:00"
draft: false
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
 "headline": "Venerdì Protetto | July edition: Deserialization, Kubernetes, Machine Learning",
 "keywords": "Deserialization, Kubernetes, Machine Learning", 
 "wordcount": "368",
 "publisher": "Facile.it Engineering",
 "url": "https://engineering.facile.it/",
 "datePublished": "2023-07-27",
 "dateCreated": "2023-07-14",
 "dateModified": "2023-07-27",
 "description": "Abstracts of the talks held during the Venerdì Protetto on July 14th",
 "articleBody":"Deserialization The attacker's point of view by Alessio Giorgianni Serialization is a known concept within software development. Nonetheless, the developer often has only a superficial knowledge of this mechanism, ignoring especially the security-related issues. So, what might happen if a skilled attacker is able to manipulate a serialized payload maliciously? The purpose of this talk was to give an introductory overview of the potential attack scenarios that a user attacker could implement, and the consequences they could have (arbitrary file read/write, remote code execution, etc.) by focusing more on the PHP platform. We started by writing From great power comes great responsibility, as Uncle Ben said. And that's true when you use a Kubernetes cluster shared among multiple tenants. In this session, we discovered the principles required to develop an Internal Developer Platform that is multi-tenant aware such as self-service, security first, and declarative, besides the API primitives that Kubernetes offers to address the resource quota and isolation. Eventually, we discovered how Capsule can help to address all these requirements in a simpler way, without breaking the Kubernetes UX. Machine learning pipelines at Facile.it The Chubb and MetLife use cases by Luigi Cerone & Jacopo Demichelissimple introductory exploits and worked our way up to a complex exploit used in a recent bug from the well-known blog VBullettin. Kubernetes multi-tenancy by Dario Tranchitella Building a machine learning (ML) model could be challenging, but being able to handle its lifecycle in production at scale is a whole different problem. In this talk, we shared what’s behind the curtain of many of the ML models in production at Facile.it. We started from an existing use case, that is, the optimization of leads sold to Chubb and Metlife. We then covered both the creation of the models and all the technical solutions, pipelines, and procedures created in the last year to keep them updated and monitored. The archive of all Venerdì Protetto talks is available here.",
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
- [Machine learning pipelines at Facile.it](#machine-learning-pipelines-at-facileit) by (Facile.it)


The overview of Venerdì Protetto is available [here](https://engineering.facile.it/blog/eng/v-protetto/).

<br>

## Deserialization

### The attacker's point of view

<sup>by [Alessio Giorgianni]()<sup>      

<a href= "https://github.com/anaradujko/facile-it.github.io/blob/protected-friday/static/images/venerd%C3%AC_protetto/Deserialization.png?raw=true" target="_blank"> 
<img align="left" style="width:45%; margin-right: 0.5em" src="https://github.com/anaradujko/facile-it.github.io/blob/protected-friday/static/images/venerd%C3%AC_protetto/Deserialization.png?raw=true" alt="Deserialization" title="Deserialization" /> 
</a>

Serialization is a known concept within software development. Nonetheless, the developer often has only a superficial knowledge of this mechanism, ignoring especially the security-related issues.

So, what might happen if a skilled attacker is able to manipulate a serialized payload maliciously?

The purpose of this talk was to give an introductory overview of the potential attack scenarios that a user attacker could implement, and the consequences they could have (arbitrary file read/write, remote code execution, etc.) by focusing more on the PHP platform.

We started by writing simple introductory exploits and worked our way up to a complex exploit used in a recent bug from the well-known blog [VBullettin](https://www.vbulletin.com/).


<br>

## Kubernetes
### Kubernetes multi-tenancy 

<sup>by [Dario Tranchitella](https://clastix.io/)<sup> 

<a href= "https://github.com/anaradujko/facile-it.github.io/blob/protected-friday/static/images/venerd%C3%AC_protetto/Kubernetes.png?raw=true" target="_blank"> 
<img align="left" style="width:45%; margin-right: 0.5em" src="https://github.com/anaradujko/facile-it.github.io/blob/protected-friday/static/images/venerd%C3%AC_protetto/Kubernetes.png?raw=true" alt="Kubernetes" title="Kubernetes" /> 
</a>

From great power comes great responsibility, as Uncle Ben said. And that's true when you use a Kubernetes cluster shared among multiple tenants.


In this session, we discovered the principles required to develop an Internal Developer Platform that is multi-tenant aware such as self-service, security first, and declarative, besides the API primitives that Kubernetes offers to address the resource quota and isolation.


Eventually, we discovered how Capsule can help to address all these requirements in a simpler way, without breaking the Kubernetes UX.

<br>

## Machine learning pipelines at Facile.it
### The Chubb and MetLife use cases

<sup>by [Luigi Cerone]( https://www.linkedin.com/in/luigi-cerone/) & [Jacopo Demichelis](https://www.linkedin.com/in/jacopo-maria-demichelis-b20b96196/)<sup> 

<a href= "/images/venerd%C3%AC_protetto/machine_learning.png?raw=true" target="_blank"> 
<img align="left" style="width:45%; margin-right: 0.5em" src=/images/venerd%C3%AC_protetto/machine_learning.png?raw=true" alt="Machine Learning Pipelines at Facile.it" title="MachineLearningPipelines" /> 
</a>

Building a machine learning (ML) model could be challenging, but being able to handle its lifecycle in production at scale is a whole different problem.

In this talk, we shared what’s behind the curtain of many of the ML models in production at Facile.it.

We started from an existing use case, that is, the optimization of leads. We then covered both the creation of the models and all the technical solutions, pipelines, and procedures created in the last year to keep them updated and monitored.

<br>
  
The archive of all Venerdì Protetto talks is available [here](/categories/protected-fridays).
