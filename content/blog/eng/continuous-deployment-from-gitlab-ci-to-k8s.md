---
authors: ["jean"]
date: "2018-01-31"
draft: true
share: true
categories: [English, Continuous integration, Continuous deployment, Docker, GitLab, Kubernetes]
title: "A continuous deployment pipeline from GitLab CI to Kubernetes"
type: "post"
languageCode: "en-EN"
toc: false
---

In the last month, I'm working on two different projects here at Facile.it: the first one, which is new and still in development, I decided to adopt **GitLab CI** for the build, since we use GitLab CE for our Git repositories; I also created a continuous deployment pipeline for the staging environment, directly to a **Kubernetes cluster**.

After, I decided to start migrating a previous, internal project of mine to the same approach, since it's currently in production with a dumb Docker Compose approach, which is not ideal for obtaining a rolling deployment.

A few days ago David Négrier‏ ([@david_negrier](https://twitter.com/david_negrier)) published a blog posts about his way of doing continuous deployment from GitLab CI:

<blockquote class="twitter-tweet" data-lang="it"><p lang="en" dir="ltr">Just blogged: &quot;Continuous Delivery of a PHP application with <a href="https://twitter.com/gitlab?ref_src=twsrc%5Etfw">@gitlab</a>, <a href="https://twitter.com/Docker?ref_src=twsrc%5Etfw">@Docker</a> and <a href="https://twitter.com/traefikproxy?ref_src=twsrc%5Etfw">@traefikproxy</a> on a dedicated server&quot;<br>                 <br> <a href="https://t.co/6piVuNBa7x">https://t.co/6piVuNBa7x</a><br><br>// <a href="https://twitter.com/coding_machine?ref_src=twsrc%5Etfw">@coding_machine</a></p>&mdash; David Négrier (@david_negrier) <a href="https://twitter.com/david_negrier/status/954306019655593984?ref_src=twsrc%5Etfw">19 gennaio 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

This post immediately captured my attention, due to my current work: David in his post avoided the usage of Kubernetes to not add too much cognitive load, and wrote a very straightforward piece. On the other hand, in my case I wrote a kinda complicated pipeline, learning a few tricks and pitfalls in the process, so I decided to write this down and share my experience.

# The basic pipeline
This is how my basic pipeline looks like when it's building a branch while I'm working on it:

![The basic pipeline](/images/continuous-deployment-from-gitlab-ci-to-k8s/basic-pipeline.png)

Three simple stages:

1. **Build**: a CI image is build with the code baked in
2. **Test**: multiple jobs to do various verification tasks in parallel (tests, static analysis, code style...)
3. **Cleanup**: deletion of the CI image built in the first step, to avoid bloating the Docker registry

Let's dive into the configuration details!

