---
authors: ["jean"]
date: "2018-01-31"
draft: true
share: true
categories: [English, Continuous integration, Continuous deployment, Docker, GitLab, Kubernetes]
title: "A continuous deployment pipeline from GitLab CI to Kubernetes"
type: "post"
languageCode: "en-EN"
toc: true
---

In the last month, I'm working on two different PHP projects here at Facile.it: the first one, which is new and still in development, I decided to adopt **GitLab CI** for the build, since we use GitLab CE for our Git repositories; I then created a continuous deployment pipeline for the staging environment, directly to a **Kubernetes cluster**; leveraging **Docker Compose** to make the configuration easier.

After, I decided to start migrating a previous, internal project of mine to the same approach, since it's currently in production with a dumb approach that provokes some downtime during deployments; on the contrary, **doing a rolling deployment with Kubernetes is surprisingly easy**!

A few days ago David Négrier‏ ([@david_negrier](https://twitter.com/david_negrier)) published a blog posts about his way of doing continuous deployment from GitLab CI:

<blockquote class="twitter-tweet" data-lang="it"><p lang="en" dir="ltr">Just blogged: &quot;Continuous Delivery of a PHP application with <a href="https://twitter.com/gitlab?ref_src=twsrc%5Etfw">@gitlab</a>, <a href="https://twitter.com/Docker?ref_src=twsrc%5Etfw">@Docker</a> and <a href="https://twitter.com/traefikproxy?ref_src=twsrc%5Etfw">@traefikproxy</a> on a dedicated server&quot;<br>                 <br> <a href="https://t.co/6piVuNBa7x">https://t.co/6piVuNBa7x</a><br><br>// <a href="https://twitter.com/coding_machine?ref_src=twsrc%5Etfw">@coding_machine</a></p>&mdash; David Négrier (@david_negrier) <a href="https://twitter.com/david_negrier/status/954306019655593984?ref_src=twsrc%5Etfw">19 gennaio 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

This post immediately captured my attention, due to my current work: David in his post avoided the usage of Kubernetes to not add too much cognitive load, and wrote a very straightforward piece. On the other hand, in my case I wrote a kinda complicated pipeline, learning a few tricks and pitfalls in the process, so I decided to write this down and share my experience.

# The basic CI pipeline
This is how my basic pipeline looks like when it's building a branch while I'm working on it:

![The basic pipeline](/images/continuous-deployment-from-gitlab-ci-to-k8s/basic-pipeline.png)

Three simple stages:

1. **Build**: a CI image is build with the code baked in;
2. **Test**: multiple jobs to do various verification tasks in parallel (tests, static analysis, code style...);
3. **Cleanup**: deletion of the CI image built in the first step, to avoid bloating the Docker registry.

Let's dive into the configuration details! For now, in the code examples, I will omit any piece that is needed for the deployment part; we will see that later.

## The `.gitlab-ci.yml` configuration file
The GitLab CI is configurable just by adding a `.gitlab-ci.yml` file to the root of your project. The first part of mine looks like this:

```yaml
image: gitlab.facile.it/facile/my-project/docker-compose:1.2

services:
- name: docker:17.12.0-dind
  alias: docker
  command: ["--registry-mirror", "https://registry-mirror.facile.it"]

variables:
  GIT_DEPTH: "1"
  DOCKER_DRIVER: overlay2
  DOCKER_HOST: tcp://docker:2375
```

The `services` section allows me to declare a Docker container that will be spun up by GitLab CI each time and that will host the Docker daemon that I will use. Here resides **the main difference** between David's and my approach: in his case, he is using the host's machine Docker daemon, in my case I'm using an isolated daemon, **a real Docker-in-Docker approach**.

The combination of the `alias: docker` setting and the `DOCKER_HOST` environment variable points our job to the DinD daemon socket; the `--registry-mirror` option let the daemon use our internal registry mirror to speed up pulling official images; last but not least, the `DOCKER_DRIVER` uses the `overlay2` filesystem for the Docker build like in David's post, which is **faster and less space consuming** (I suggest you to use that on your local Linux machines too!).

> David's approach may be a bit **faster**, because the daemon is always the same and retains some build and image cache between jobs and builds, but it requires to run **privileged jobs**, and it's not isolated, so it may incur in some issues or slowdowns if **multiple builds** run at the same time, messing up image tags.
> 
> My approach is a bit more **robust**, but it's overall **slower**, because each job is **totally isolated** (which is good), but on the downside it has no memory of previous builds, so no cache is available: we will have to **pull from the registry each time**.

The `GIT_DEPTH` option makes the project clone process in each job a bit faster, pulling only the current commit, not the whole Git history.

The `image` option allows you to require a different base image in which to execute each job of the pipeline. In my case the image is pretty simple, because it's created from the base Docker image, and has in addition Docker Compose and `kubectl`, the [command line interface for Kubernetes](https://kubernetes.io/docs/reference/kubectl/overview/). My Dockerfile looks like this:

```dockerfile
FROM docker:17.12.0-ce

ARG DOCKER_COMPOSE_VERSION=1.18.0
 # install Docker Compose
RUN apk add --no-cache curl py-pip bash \
    && pip install docker-compose
 # install kubectl
RUN wget https://storage.googleapis.com/kubernetes-release/release/v1.9.1/bin/linux/amd64/kubectl \
    -O /usr/local/bin/kubectl \
    && chmod +x /usr/local/bin/kubectl
```

## Pipeline setup and Docker Compose configuration
The next part of my configuration looks like this:
```yaml
before_script:
  - docker login -u gitlab-ci-token -p $CI_JOB_TOKEN $CI_REGISTRY
  - cp docker-compose.yml.gitlab docker-compose.override.yml

stages:
  - Build
  - Test
  - Cleanup
```
In here we define the consecutive **stages** of the pipeline, and we define a `before_script` section to be executed before each job. The first instruction let us **log into the private Docker registry** that GitLab gives us along any project (if enabled), in which I decided to store my Docker images.

> GitLab CI jobs automatically have the `$CI_JOB_TOKEN` and `$CI_REGISTRY` environment variables populated to easily do that: the first one is a fresh unique token, which is [generated for each job](https://docs.gitlab.com/ee/user/project/new_ci_build_permissions_model.html#job-token); the second one is the URL of the registry associated with the current project; see the [GitLab CI documentation](https://docs.gitlab.com/ce/ci/variables/README.html) for more details.

The second instruction depends on **how I organized my Docker Compose files** to help me during development and in the pipeline too. I use 4 separated files:

 * `docker-compose.yml` is the base file, with the **basic configuration**.
 * `docker-compose.override.yml` that **overrides** stuff when needed; the name is [standard with the Docker Compose v3 configurations](https://docs.docker.com/compose/extends/#understanding-multiple-compose-files), so you don't have to specify it in the CLI, it's automatically picked up; this file is not commited and ignored by Git, because I use it to give each developer the freedom to customize the containers behavior, like port exposure or volume mounting.
 * `docker-compose.override.yml.dist` is a committed file with the **suggested override** configuration (default exposed ports, default mounts...).
 * `docker-compose.yml.gitlab` is an override file that I use **only during the build**, so that's why we need that `cp` instruction.

I will show you just the last file, which looks like this:
```yaml
version: '3.2'

services:
  php:
    image: ${CI_IMAGE_COMMIT_TAG}
    build:
      dockerfile: docker/development/php-ci/Dockerfile
      context: .
      cache_from:
        - ${CI_IMAGE_BRANCH_TAG}
  php-cache:
    image: ${CI_IMAGE_BRANCH_TAG}
```
I declared in my `php` service both the `image` and `build` sections, so I'm able to use this definition in all my jobs, **both for building and executing**. I'm also able to move the `Dockerfile`s inside a dedicated directory, thanks to the usage of the `dockerfile` and `context` options.

It's also very important to use `version: '3.2'`, because it's needed to use the `cache_from` option: since we do not have any cache in the daemon, I **tag the image twice**, once with the **commit hash** and once with the **branch name**; in this way I can pull the `php-cache` service with the branch tag as a cache from the previous build.

As you can see I'm using **environment variables** to define the image names. I do that in the GitLab CI configuration so I can **define them only once** and use them everywhere:

```yaml
variables:
    # ...
    CI_IMAGE_NAME: facile/my-project/php-ci
    CI_IMAGE_COMMIT_TAG: $CI_REGISTRY/$CI_IMAGE_NAME:$CI_COMMIT_SHA
    CI_IMAGE_BRANCH_TAG: $CI_REGISTRY/$CI_IMAGE_NAME:$CI_COMMIT_REF_SLUG
```

I still leverage GitLab's `$CI_REGISTRY` variable to compose the names, so basically my image names will be:

 * `gitlab.facile.it/facile/my-project/php-ci:79aef00e3893a39102ffc394bf96782e57adb956`
 * `gitlab.facile.it/facile/my-project/php-ci:branch-name`

Just remember to use `$CI_COMMIT_REF_SLUG` for the second tag, because it has slashes and other invalid chars stripped out automatically.

## The jobs definitions
At this point we just need to define the jobs! The **build job** is defined like this:

```yaml
build-image:
  stage: Build
  script:
    - docker-compose pull --ignore-pull-failures php-cache
    - docker-compose build php
    - docker tag $CI_IMAGE_COMMIT_TAG $CI_IMAGE_BRANCH_TAG
    - docker-compose push php php-cache
```
 * I **pull** the branch image as **cache** (with the `--ignore-pull-failures` to avoid failures on the first commit of a branch);
 * I **build** the image with the commit tag;
 * I **re-tag** the freshly built image with the branch tag;
 * I **push** both back into the registry.

Then we can pass onto the **test stage**. If I need multiple services, like for functional tests, I do it like this:
```yaml
test-coverage:
  stage: Test
  coverage: '/^\s*Lines:\s*\d+.\d+\%/'
  script:
    - docker-compose pull --parallel php mysql
    - docker-compose run --rm php vendor/bin/phing ci
```
 * I **pull** all the needed images with the `--parallel` option to speed up;
 * I **run** the needed task; in my case I use `phing` (a [PHP porting of Ant](https://packagist.org/packages/phing/phing)) inside the container to call everything with a single command;
 * The `coverage` options contains a regex that picks up the coverage percentage from PHPUnit's `--coverage-text` option.

If instead I need to execute just simple tasks, without external services, I can skip the `pull` command completely:
```yaml
phpstan:
  stage: Test
  script:
    - docker-compose run --rm --no-deps php phing phpstan_check
```
This is possible because I need just one image which will be pulled implicitly by Docker Compose, so the `--parallel` option is useless here; I also have to remember to use `--no-deps` to avoid pulling linked services, if for example my base configuration defines a dependency to other containers (like the database).
