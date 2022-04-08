---
authors: ["stapps"]
comments: true
date: "2022-04-04"
draft: true
share: true
categories: [English, Continuous integration, Continuous deployment, Docker, GitLab, Kubernetes, Opensource]
title: "How I became a GitLab contributor to fix an issue in our project's CI/CD pipeline"
toc: true
languageCode: "en-EN"
type: "post"
---
During these months in Facile.it I had to face many challenges regarding the improvement of the **CI/CD** pipelines for the *Insurance* team, with a strong focus on performances and reusability. This kind of focus is very important as it enables us to follow **GitLab**'s best practices for **CI/CD** such as the *fail fast principle*.

>💬
>
>Fail fast: On the CI side, devs committing code need to know as quickly as possible if there are issues so they can roll the code back and fix it while it’s fresh in their minds. The idea of “fail fast” helps reduce developer context switching too, which makes for happier DevOps professionals.
> 
> -- <cite>[How to keep up with CI/CD best practices - GitLab Blog](https://about.gitlab.com/blog/2022/02/03/how-to-keep-up-with-ci-cd-best-practices/#what-are-the-best-practices-for-cicd)</cite>

Following [this post](../continuous-deployment-from-gitlab-ci-to-k8s-using-docker-in-docker) from 2018, my team ended up having a **CI/CD** pipeline that fully relied on **Docker Compose** for every job besides the deployment ones.

Using **Docker Compose** has many advantages, mainly because it allows developers to use the very same configuration for both their local setups and the **CI/CD** jobs (e.g. `environment variables` and `services`). However, this comes with something that I believe to be a major drawback: job execution time using **Docker Compose** is not ideal at all, making our pipelines few times slower than an equivalent solution that doesn't use it!

This blog entry is not meant as a comparison between **Docker Compose** and other alternatives so I won't dive deep into numbers and details, but given the performances focus described in the first paragraph I decided to tackle this issue and to move forward from **Docker Compose** into a more "native" solution.

# Anatomy of our project

To better understand what made moving from **Docker Compose** way harder than I expected, we need to provide a brief overview on the project's structure and how the application that we're building is supposed to work.

The main idea behind this application (we'll call it `ins-gateway` from now on) is to act as some kind of gateway between our core services and multiple insurance companies. We can see it as an abstraction layer that is used to uniform both requests and responses so that we can conver them in our custom format, as every company may have a specific protocol/format.

Having to deal with a large amount of different protocols/formats makes everything error-prone: what if a certain company decides that a property is now a `number` instead of a `string` but they fail to let us know that their specifications changed?

We can't afford throwing errors to the end user because of such a small change, so we need a better way to be somehow proactive and intercept those changes before they reach our production systems.

For this reason we have a set of multiple tests that run in our **CI/CD** environment and that help us keeping everything in check.
Today we're going to focus on **unit tests** only.

## Unit tests and **Docker Compose**

In **DevOps** world, **unit tests** can be seen as an automated way to do **regression testing**, meaning that we can use them to guarantee that our new commit didn't break an already working feature.

This is extremely useful for projects that start to outgrow their team and that would require a significant effort to manually verify everything before committing.

In our scenario this means that we defined these **unit tests** in order to validate the request/response pair's format for each insurance company, thus being able to quickly react to their changes.

Since **unit tests** are not meant to depend on external systems, however, we decided to build another layer: **mock servers**.

Here's a quick chart showing a simplified version of our testing process including just two companies (I promise it's not that hard, it's just Mermaid some issues with circular layouts 🙂):

[![](https://mermaid.ink/img/pako:eNqVVFFvmzAY_CuWnwsd3tZuedhUkaqK0pZIqyZNsAcPvjRWAVPbtIpC_vs-Y6CUJp3Gk7k7H9zHmR1NZQZ0Ru8Vrzbkbp6UBK-L1SoWpfbuuYFnvv3t0PnlzziDJ8hlBeoFY2_Aq8VdfCXMNf_TAeEiDhen4by7vYnCZRAXMn3wUllUvNx6wYhirynWUdEyNqANsXgOBrIOX0aBI9Zc5JCRqeUyYgf53jeMblYXt7_iDie6glSsRcqNkKVG0ZCUeN63JvBJVetNY1MOcVuG-UTVZYNp-9Qt_LGDbbQpYd-rseMe5k48H6lPuAce6z5uG8c5BP9WMqdko2E77Wer1RWmgrHt8Ph213Epm74p6s588sRzkWFRDnp3pFTBTmh3933_HxZsZMHeWLy4t05b0A3W5CBXysY2ZcKxd_ax0T7WtwAtWvjczqeSCr-ePQJD046TdtWyXyxrlMBD0_Tlm0i--qSu7EBetcZJjwvsylX0w6ij9IQWoAouMjzmO6tMqNlAAQmd4TLj6iGhSblHnbO8zASmp7M1zzWcUF4b-WNbpnRmVA29aC44_jKKTrX_C-c4VcU)](https://mermaid.live/edit#pako:eNqVVFFvmzAY_CuWnwsd3tZuedhUkaqK0pZIqyZNsAcPvjRWAVPbtIpC_vs-Y6CUJp3Gk7k7H9zHmR1NZQZ0Ru8Vrzbkbp6UBK-L1SoWpfbuuYFnvv3t0PnlzziDJ8hlBeoFY2_Aq8VdfCXMNf_TAeEiDhen4by7vYnCZRAXMn3wUllUvNx6wYhirynWUdEyNqANsXgOBrIOX0aBI9Zc5JCRqeUyYgf53jeMblYXt7_iDie6glSsRcqNkKVG0ZCUeN63JvBJVetNY1MOcVuG-UTVZYNp-9Qt_LGDbbQpYd-rseMe5k48H6lPuAce6z5uG8c5BP9WMqdko2E77Wer1RWmgrHt8Ph213Epm74p6s588sRzkWFRDnp3pFTBTmh3933_HxZsZMHeWLy4t05b0A3W5CBXysY2ZcKxd_ax0T7WtwAtWvjczqeSCr-ePQJD046TdtWyXyxrlMBD0_Tlm0i--qSu7EBetcZJjwvsylX0w6ij9IQWoAouMjzmO6tMqNlAAQmd4TLj6iGhSblHnbO8zASmp7M1zzWcUF4b-WNbpnRmVA29aC44_jKKTrX_C-c4VcU)

While this is a simplified version of the process, the important thing to notice is that we have a single **mock server** even if we have two companies!

<ins>To avoid dealing with multiple code-bases we decided to build a generic **mock server** that is configured at runtime with the specific protocol/format used by a given company, and this configuration happens through `environment variables`.</ins>

If you're not already seeing the issue here, allow me to introduce **Docker Compose** in the current scenario by showing some of the contents of our old `docker-compose.yaml` file:

```yaml
version: '3.7'

services:
  ...

  mock-company-1:
    image: $MOCK_IMAGE:$COMMIT_ID
    env_file:
      - ./company-1/default.env

  mock-company-2:
    image: $MOCK_IMAGE:$COMMIT_ID
    env_file:
      - ./company-2/default.env
```

As you can see, in the `docker-compose.yaml` file we defined two different `services` with the very same **Docker** image and different `env_file`s to provide the specific configuration.

>⚠️
>
>The `env_file` contains the very same `environment variables` for both the `services` but with different values, and this is the root cause of the issue that I had to solve while moving away from **Docker Compose**!
> 
> This is a quick sample of an `env_file` for our **mock servers**
> ```
> APP_PORT=3000
> COMPANY_NAME=...
> PROTOCOL_VERSION=...
> ```

This works because of how **Docker Compose** work: every `service` has its own "context" and a set of `environment variables` that are not shared with the other `services`, meaning that there's no name collision.

But what happens if we replace **Docker Compose** with **GitLab**'s "native" `services`? Well, that's a completely different story.

# Moving away from **Docker Compose**: introducing **GitLab**'s `services`

**GitLab**'s `services` are a clever way to provide additional capabilities to your **CI/CD** job. These capabilities are usually external dependencies such as a database, or even a `docker-in-docker` helper that enables building **Docker** images from a running **Docker** container.

>ℹ️
>
>If you want to know more about **GitLab**'s `services`, their [documentation](https://docs.gitlab.com/ee/ci/services/) is a great starting point.

Given their nature, **GitLab**'s `services` can be naturally mapped from the **Docker Compose** ones, or at least that's what I thought when I started with this task.

Just like in **Docker Compose**, **GitLab**'s `services` are defined as:

```yaml
name: # Docker image to be used as service
alias: # optional hostname for your service in the internal networking
entrypoint: # optional override for the Docker entrypoint
command: # optional ovveride for the Docker entrypoint
```

**But... Isn't there something missing from what we had in our `docker-compose.yaml` file?**

The answer is yes: before [**GitLab** 14.8](https://about.gitlab.com/releases/2022/02/22/gitlab-14-8-released/), `services` couldn't specify a set of custom `environment variables` (as reported in [issue #23671](https://gitlab.com/gitlab-org/gitlab/-/issues/23671) on **GitLab**).

>ℹ️
>
>This change is not mentioned in the 14.8 release notes because it's been split over multiple releases, but you can refer to both [**GitLab** 14.5 changelog](https://gitlab.com/gitlab-org/gitlab/-/blob/master/CHANGELOG.md#1450-2021-11-19) and [**GitLab Runner** 14.8 changelog](https://gitlab.com/gitlab-org/gitlab-runner/blob/14-8-stable/CHANGELOG.md#new-features)

So, how are we supposed to add `environment variables` to our **GitLab**'s `services`?
**GitLab** `jobs` support the `variables` property which allows us to define a set of `environment variables` as a `YAML hash`, and `services` inherit all the variables defined in their parent `job`.

Let's make a quick example of what this means:

```yaml
job-1:
    variables:
        VAR: Job variable # This is meant as a variable to be used in job's script
        SVC_VAR: Service variable # This is meant as a variable to be used EXCLUSIVELY by the service
    services:
        - name: busybox:latest # Use a simple Busybox image so that we can a shell and just echo some variables
          entrypoint: [ "sh", "-c", "echo $VAR, $SVC_VAR" ]
    script:
        - ...
```

Upon `service` startup the `entrypoint` is executed, leading to the following output:

```
2022-04-04T12:56:48.722815200Z Job variable, Service variable
```

>ℹ️
>
>`service` output is printed at the beginning of your `job`'s output on **GitLab**. Additionaly, it can be extracted from **Docker** or **Kubernetes** container logs based on where your **GitLab Runner** is installed.

While this seems to work correctly, we have to remind about the warning that I mentioned in the previous chapter: we're using a single **mock server** which is configured using a set of `environment variables`, so each instance of the **mock server** requires exactly the very same `variables`.

Following from the previous example, let's move to something closer to our scenario by tanslating the `docker-compose.yaml` file into a `.gitlab-ci.yml` one:

```yaml
job-1:
    services:
        - name: $MOCK_IMAGE:$COMMIT_ID
          alias: company-1-mock
        - name: $MOCK_IMAGE:$COMMIT_ID
          alias: company-2-mock
    script:
        - npm run tests # Generic wrapper to test all the companies
    variables:
        COMPANY_NAME: company-1 ⚠️
        COMPANY_NAME: company-2 ⚠️
        ...
```

Hold on!

If both `company-1-mock` and `company-2-mock` use the same `COMPANY_NAME` variable, how can we pass the value `company-1` to `company-1-mock` and `company-2` to `company-2-mock`?

Well, we can't, and that's because `environment variables` are passed at `job` level and shared with all the linked `services`. The above snippet will still work, but both the **mock servers** will receive the latest value set for each variable, so they will both initialized with `COMPANY_NAME = company-2`, which is not what we want.

## A first workaround

Once getting to this issue I quickly realized that the task was about to get way more complicated than what I thought, because I got to a point in which I was limited by the lack of a feature on **GitLab**.

I'm not a developer anymore and I never had the chance to work with **Ruby** (which is the main backend language for **GitLab**), so I didn't feel confident enough to try and see if I could solve this by myself.

I decided to implement an "hacky" workaround that allowed my **CI/CD** pipeline to move away from **Docker Compose** while still keeping the ability to use multiple instances of the same **GitLab** `service`.

The workaround revolves around a fairly simple idea: as we already saw before, **GitLab**'s `services` support the override of both **Docker** image's `entrypoint` and `command`, and this can be used to provide additional logic that needs to be executed on the image's startup.

This, coupled with the shared `variables` between `jobs` and `services`, enabled me to provide some kind of "scoped" `variables` to each **mock server** instance in the following way:

```yaml
job-1:
    services:
        - name: $MOCK_IMAGE:$COMMIT_ID
          alias: company-1-mock
          entrypoint: ["/bin/sh"]
          command: ["-c", "echo \"$COMPANY_1_ENVIRONMENT\" > init.env && source init.env; <original Docker command>"]
        - name: $MOCK_IMAGE:$COMMIT_ID
          alias: company-2-mock
          entrypoint: ["/bin/sh"]
          command: ["-c", "echo \"$COMPANY_2_ENVIRONMENT\" > init.env && source init.env; <original Docker command>"]
    script:
        - npm run tests # Generic wrapper to test all the companies
    variables:
        COMPANY_1_ENVIRONMENT: |
            export COMPANY_NAME=company-1
            export OTHER_VAR=...
        COMPANY_2_ENVIRONMENT: |
            export COMPANY_NAME=company-2
            export OTHER_VAR=...
        ...
```

**Success, it works! ✅**

We basically replaced the startup process for each of our `services` in order to load the `variables` from a local file, and every `service` is provided with a different file. This kind of works like the `env_file` directive in the `docker-compose.yaml` file that we've seen before.

⚠️ Being this a workaround, however, there are some implications that need to be considered:

* we can't define the `variables` as plain `YAML` properties as we did with **Docker Compose**
* we still need to define a shared `variable` for each `service` at `job` level, meaning that `company-2-mock` can do `echo $COMPANY_1_ENVIRONMENT` and retrieve all the values for the other **mock server**, thus breaking the isolation between `services`
* we need to manually add the original **Docker** `command` at the end of our overriden one, meaning that we need to keep it updated in case the base **Docker** image changes

To overcome these issues we need a less "hacky" way to deal with our scenario, even if **GitLab** is not supporting it. Luckily **GitLab** is an **opensource** software, and this allows people to contribute to their code-base even if not directly employed by **GitLab** itself.

As I said before I'm not a developer anymore, but I decided to go ahead and took my chance at adding the feature that we needed to improve our **CI/CD** pipelines.

## Becoming a GitLab contributor to solve our issue with CI/CD

>ℹ️
>
>To develop on **GitLab**'s platform you need the [GitLab Development Kit](https://gitlab.com/gitlab-org/gitlab-development-kit). The kit is well documented so I won't go into the details of the workflow.

If you're not familiar with **GitLab**'s code-base, the initial experience will be daunting at best as their repository is quite huge. Lacking experience with **Ruby** didn't help either, but eventually I got a grip of which classes I needed to fiddle with in order to have my feature working.

The feature proposal was to extend `services` definition by adding the same `variable` property that was already available for `jobs`, so that the validation logic and `variables` handling could be reused.

This is the proposed structure, following the previous examples:

```yaml
job-1:
    variables:
        VAR: Job variable # This is meant as a variable to be used in job's script        
    services:
        - name: busybox:latest # Use a simple Busybox image so that we can a shell and just echo some variables
          variables:
            SVC_VAR: Service variable # This is meant as a variable to be used EXCLUSIVELY by the service
          entrypoint: [ "sh", "-c", "echo $VAR, $SVC_VAR" ]
    script:
        - echo $VAR, $SVC_VAR
```

As you can see, `SVC_VAR` was now moved as a child of the `service` definition, meaning that it's not shared at the `job` level as before.

Implementing this was easier than I thought, as I only had to copy the `variables` keyword from the `job` definitions (e.g. endpoints and internal data models) to their `service` counterparts. Between these changes, **GitLab**'s documentation and some **unit testing** I had only 20 added lines and 5 removed.

>ℹ️
>
>The complete history of my changes is tracked in the [merge request #72025](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/72025) on **GitLab**.

This small **merge request** was not enough however, as `services` are handled differently by each underlying provider (**Docker** and **Kubernetes**). These providers are implemented by the **GitLab Runner** project, which provides an executable that's responsible for getting and executing `jobs` from a registered **GitLab** instance.

This means that I had to add a specific logic to both the providers so that they could correctly deal with the new `variables` property defined in the `service` object.

While the changes on **GitLab** itself weren't really challenging, the way **GitLab Runner** handles `environment variables` made everything a lot more difficult. Without diving deep into details, **GitLab Runner** is responsible for variables expansion at shell level, so this new feature must not break the existing workflow.

The issue is better explained by [Arran Walker](https://gitlab.com/ajwalker), who reviewed my **merge request**:

>💬 
>
>My main concern was that we want a service's variables expanded when they reference a variable that is available to the main job too.
> 
>For example:
>
>```yaml
>variables:
>  TOP_LEVEL_VAR: "hello"
>
>job:
>  variables:
>    JOB_LEVEL_VAR: "world"
>  service:
>    - image: docker:dind
>      variables:
>        SERVICE_LEVEL_VAR: "$TOP_LEVEL_VAR $JOB_LEVEL_VAR"
>```
> `SERVICE_LEVEL_VAR` should be able to reference `TOP_LEVEL_VAR` and `JOB_LEVEL_VAR`. Expanding the service variables on their own won't achieve this.
>
> -- <cite>https://gitlab.com/gitlab-org/gitlab-runner/-/merge_requests/3158#note_740206844</cite>

After few months of back and forth with **GitLab Runner**'s team, we ended up finding a solution that enabled my use case while still retaining the correct variable expansion logic, as nobody wanted to introduce a breaking-change on such a big platform.

>ℹ️
>
>The complete history of my changes is tracked in the [merge request #3158](https://gitlab.com/gitlab-org/gitlab-runner/-/merge_requests/3158) on **GitLab Runner**.

My contributions were merged to **GitLab** with version **14.5** and to **GitLab Runner** with version **14.8**, making me a contributor to their platform!

![My contributor badge on GitLab](/images/how-i-became-a-gitlab-contributor-to-fix-an-issue-in-our-projects-cicd-pipeline/contributor.png)

## Our final **CI/CD** pipeline

At the end of this process, we were finally able to move away from **Docker Compose** while still having a **CI/CD** pipeline which didn't need workarounds or hacks to be fully functioning. With **GitLab** 14.8, our example pipeline can now be modified as it follows:

```yaml
job-1:
    services:
        - name: $MOCK_IMAGE:$COMMIT_ID
          alias: company-1-mock
          variables:
            COMPANY_NAME: company-1
            OTHER_VAR: ...
        - name: $MOCK_IMAGE:$COMMIT_ID
          alias: company-2-mock
          variables:
            COMPANY_NAME: company-1
            OTHER_VAR: ...
    script:
        - npm run tests # Generic wrapper to test all the companies
```

If we consider the issues mentioned in our [first workaround](#a-first-workaround), we can see that with this solution we were able to fix them all:

* ~~we can't define the `variables` as plain `YAML` properties as we did with **Docker Compose**~~ `variables` are now defined as plain `YAML` properties✅
* ~~we still need to define a shared `variable` for each `service` at `job` level, meaning that `company-2-mock` can do `echo $COMPANY_1_ENVIRONMENT` and retrieve all the values for the other **mock server**, thus breaking the isolation between `services`~~ `variables` are now defined on a `service` basis, thus they're not shared anymore✅
* ~~we need to manually add the original **Docker** `command` at the end of our overriden one, meaning that we need to keep it updated in case the base **Docker** image changes~~ we don't need to override the `entrypoint` and `command` for the `service` **Docker** image✅

# Conclusions

The goal of this post has been to show how an issue in everyday activities, coupled with a winning **opensource** culture, can be turned into an opportunity to grow up as a professional and to become a contributor to one of the world's biggest **DevOps** platforms. Usually we're somehow "limited" by our tooling when it comes to issues, and this means that we're kind of forced to find "hacky" workarounds to overcome them. By relying on widely supported **opensource** software, however, not only we can easily find a better solution to our problems, but we also have the chance to become part of the movement that enables our everyday tasks as IT professionals.