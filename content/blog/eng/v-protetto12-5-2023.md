---
authors: ["engineering"]
comments: true
date: "2023-05-18 17:00:00"
draft: false
share: true
categories: ['Protected Fridays', 'ChatGPT', 'API testing', 'Mental health']
title: "Venerdì Protetto | May edition: API testing, Chat GPT and React, Mental health at work"
summary: "This page contains the abstracts of the talks held during the latest Venerdì Protetto on May 12, 2023."
languageCode: "en-US"
type: "post"
twitterImage: '/images/social/orange-social-preview.png'
toc: false
---

<script type="application/ld+json">
{ 
  "@context": "https://schema.org", 
  "@type": "BlogPosting",
  "headline": "Venerdì Protetto | July edition: Deserialization, Kubernetes, Machine Learning",
  "keywords": "Deserialization, Kubernetes, Machine Learning", 
  "wordcount": "569",
  "publisher": "Facile.it Engineering",
  "url": "https://engineering.facile.it/",
  "datePublished": "2023-05-18",
  "dateCreated": "2023-05-18",
  "dateModified": "2023-08-31",
  "description": "Abstracts of the talks held during the Venerdì Protetto on May 12th, 2023",
  "articleBody":"API testing with Prism and Playwright Today's software landscape is highly competitive and users are increasingly reluctant to tolerate unreliable applications. An issue at the API level of an application can lead to user-facing errors or latency, which can erode customer trust, lead to churn, and negatively impact the business. This puts tremendous pressure on development teams to deliver consistently available, high-performing APIs. With the Prism proxy tool ([Stoplight](https://stoplight.io/)) we can validate requests and responses against a model and achieve clean and correct documentation ([OpenAPI](https://www.openapis.org/)). By writing tests through Playwright we can test different aspects of an API from request to response. During the talk, we discussed the following points: - What is API Testing? - Prism
- 10 API testing tips - How to develop test API? - Running API tests - Swagger-PHP (Zircote)
- Prism error types - Playwright test examples Using openAI APIs in a custom knowledge base   
This talk introduced the study of the potential of the artificial intelligence models exposed by OpenAI using chatGPT APIs in a React project, both without a custom knowledge base and with a restricted and specific knowledge base. In this talk, we learned what the learning models used by ChatGPT are. We saw a brief list of the models exposed by OpenAI and talked about tokenization and pricing. Furthermore, we saw the completions API i.e. the core API of the technology and verified the functioning of summarization, sentiment analysis and classification through a demo. We then saw a Python script within which we queried the model on data provided as input, requesting the same set of capabilities in a custom knowledge base. To learn more, take a look at these resources: - [How To Build Your Own Custom ChatGPT With Custom Knowledge Base](https://betterprogramming.pub/how-to-build-your-own-custom-chatgpt-with-custom-knowledge-base-4e61ad82427e) - [Llama Hub](https://llamahub.ai/) - [Tokenizer](https://platform.openai.com/tokenizer) Agile working, information technologies, and mental health - an introduction With the advent of the COVID-19 pandemic, worldwide governments enforced lockdown measures to contain the health crisis; this hurried many companies to adopt and enhance agile/remote work practices, in which information technologies played a pivotal role. Implementing such practices required heavy regulatory, logistical, infrastructural, and organizational changes, the acquisition of new skills and habits, and a new way to conceive work. Though challenging at first, these changes proved beneficial for both the organizations and the individual workers, with long-lasting consequences even after overcoming the critical phase of the pandemic. However, many concerns were raised regarding several issues, including workers' mental health and its impact from both an individual and organizational standpoint. The talk aimed to tackle the psychological aspects of agile work and the information technologies used to enable it, by focusing on its main emotional, cognitive, and relational dimensions and providing some strategies to address the most critical issues. The overview of Venerdì Protetto is available [here](/categories/protected-fridays).
",
  "author": {
    "@type": "Person",
    "name": "Ana"
  }
}
</script>


This page contains the abstracts of the talks held during the latest Venerdì Protetto on May 12, 2023. 

Topics: 

- [API testing](#api-testing) by Domenico Buttafarro & Vincenzo Gasparo Morticella (Facile.it)
- [ChatGPT and React](#chatgpt-and-react) by Alessio Monesi (Facile.it) 
- [Mental health at work](#mental-health-at-work) by Francesco Di Muro ([Lobby Frontali](https://lobbyfrontali.it/))

<!--more-->

<br>

## API testing 

### API testing with Prism and Playwright

<sup>by [Domenico Buttafarro](https://www.linkedin.com/in/domenicobuttafarro/) & [Vincenzo Gasparo Morticella](https://www.linkedin.com/in/vincenzogasparo/)<sup>


<a href= "/images/venerd%C3%AC_protetto/api_testing.png?raw=true" target="_blank"> 
<img align="left" style="width:35%; margin-right: 0.5em" src=/images/venerd%C3%AC_protetto/api_testing.png?raw=true" alt="API testing" title="API testing" /> 
</a>
  
Today's software landscape is highly competitive and users are increasingly reluctant to tolerate unreliable applications. 

An issue at the API level of an application can lead to user-facing errors or latency, which can erode customer trust, lead to churn, and negatively impact the business. This puts tremendous pressure on development teams to deliver consistently available, high-performing APIs.

With the Prism proxy tool ([Stoplight](https://stoplight.io/)) we can validate requests and responses against a model and achieve clean and correct documentation ([OpenAPI](https://www.openapis.org/)). By writing tests through Playwright we can test different aspects of an API from request to response.

During the talk, we discussed the following points:

- What is API Testing?
- Prism
- 10 API testing tips
- How to develop test API?
- Running API tests
- Swagger-PHP (Zircote)
- Prism error types 
- Playwright test examples
  
<br>

## ChatGPT and React

### Using openAI APIs in a custom knowledge base

<sup>by [Alessio Monesi](https://www.linkedin.com/in/alessiomonesi1992/)<sup>

<a href= "/images/venerd%C3%AC_protetto/chatgpt.png?raw=true" target="_blank"> 
<img align="left" style="width:35%; margin-right: 0.5em" src=/images/venerd%C3%AC_protetto/chatgpt.png?raw=true" alt="Chat GPT" title="Chat GPT" /> 
</a>

  
This talk introduced the study of the potential of the artificial intelligence models exposed by OpenAI using chatGPT APIs in a React project, both without a custom knowledge base and with a restricted and specific knowledge base.

In this talk, we learned what the learning models used by ChatGPT are. We saw a brief list of the models exposed by OpenAI and talked about tokenization and pricing.

Furthermore, we saw the completions API i.e. the core API of the technology and verified the functioning of summarization, sentiment analysis and classification through a demo. We then saw a Python script within which we queried the model on data provided as input, requesting the same set of capabilities in a custom knowledge base.

To learn more, take a look at these resources:
- [How To Build Your Own Custom ChatGPT With Custom Knowledge Base](https://betterprogramming.pub/how-to-build-your-own-custom-chatgpt-with-custom-knowledge-base-4e61ad82427e)
- [Llama Hub](https://llamahub.ai/)
- [Tokenizer](https://platform.openai.com/tokenizer)

<br>

## Mental health at work

### Agile working, information technologies, and mental health - an introduction

<sup>by [Francesco Di Muro](https://lobbyfrontali.it/)<sup>

<a href= "/images/venerd%C3%AC_protetto/mental_health.png?raw=true" target="_blank"> 
<img align="left" style="width:35%; margin-right: 0.5em" src=/images/venerd%C3%AC_protetto/mental_health.png?raw=true" alt="Mental health" title="Mental health" /> 
</a>

  
With the advent of the COVID-19 pandemic, worldwide governments enforced lockdown measures to contain the health crisis; this hurried many companies to adopt and enhance agile/remote work practices, in which information technologies played a pivotal role.

Implementing such practices required heavy regulatory, logistical, infrastructural, and organizational changes, the acquisition of new skills and habits, and a new way to conceive work. Though challenging at first, these changes proved beneficial for both the organizations and the individual workers, with long-lasting consequences even after overcoming the critical phase of the pandemic. However, many concerns were raised regarding several issues, including workers' mental health and its impact from both an individual and organizational standpoint.

The talk aimed to tackle the psychological aspects of agile work and the information technologies used to enable it, by focusing on its main emotional, cognitive, and relational dimensions and providing some strategies to address the most critical issues.


<br>

The overview of Venerdì Protetto is available [here](/categories/protected-fridays).
