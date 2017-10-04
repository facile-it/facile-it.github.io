---
authors: ["salvatore-cordiano"]
date: "2017-10-04"
draft: false
share: true
categories: [English, PHP, OPCache, realpath_cache]
title: "Is it all PHP OPCache's fault?"
type: "post"
languageCode: "en-EN"
twitterImage: '/images/realpath-cache-is-it-all-php-opcache-s-fault/share.jpg'
---

# Abstract

_Upon migrating to a new infrastructure we started experiencing cache issues after each deploy: as we refreshed pages that were updated by the new release, we didn't see the right content for a very short period of time. Initially, we wrongly assumed that the cause of this issue was the PHP OPcache extension but, after our investigation, we understood that real path cache was the culprit._

# Introduction

When I started my software developer career, I was very surprised to read the following sentence, attributed to [Phil Karlton](https://martinfowler.com/bliki/TwoHardThings.html): _«There are only two hard things in Computer Science: **cache invalidation** and **naming things**»_. In the beginning I was incredulous, because I didn't really get the sense of these words. Not much later, I started to understand. 

Without digging too much into the past, I'd like to talk about a recent cache issue we experienced in on our production infrastructure. Particularly we noticed a strange behavior after each deploy: immediately after a successful deployment procedure, as we refreshed pages that were modified with the new release, we didn't see the updated code for a while. Actually, the scenario described above is very common with **PHP** web applications. We have seen this behavior in the past but, after we moved to our new production environment, it became more noticeable. Therefore, we decided to investigate it.

# Our deployment procedure

Before proceeding, I should describe how our deployment procedure works: our technology is mostly based on PHP, plus some frameworks like **Symfony** and **Zend Framework**. To ship our code in production we use an internal project called **shark-do**, written by my team leader [Luca](https://luca.bo/).

Shark-do's philosophy is:

> «If you can do it, you can do it in bash»

The project's in fact a bash script which allows to define a task and execute it from a recipe. Each project has its own recipe, as to manage the different steps needed, like delete useless files, generate configuration files, etc.

For example, I usually run `shark-do deploy collaboratori`, to execute the deploy tasks for the "collaboratori" project, in which I'm involved, more than 5 times a day. This is generally comprised of the following steps:

1. pull the last commit from origin/master;
2. setup folders, remove the unnecessary files and start creating a release;
3. install parameters, run composer install, download and dump assets;
4. create a release archive, transfer and extract it on the bastion machine;
5. call an Ansible procedure to start the release roll out using our infrastructure's REST API;
6. switch releases, clean and remove old releases on the bastion machine;
7. tag the new release on New Relic and notify the end of the task on our Slack channel.

We should focus on point 5 because it's the roll out phase. At that point, an [**Ansible playbook**](http://docs.ansible.com/ansible/latest/playbooks.html) is responsible for copying the new release from the [bastion host](https://en.wikipedia.org/wiki/Bastion_host) to all the target machines (front-end, batch, etc.), for setting up folders and permissions, and for doing cache warm-up and release switch. As described previously, each deployment procedure consists of many mandatory activities, but the turning point is when the current project's folder changes: this is usually done through a symlink swap from the previous release folder to the new one. The current project folder is the document root of the specific web application.

It's just something like this:

```bash
ln -sf /var/www/{APP_NAME}/releases/@YYYYMMDDHHIISS /var/www/{APP_NAME}/current
```

The `-s` option is used to create a symbolic link, while `-f` is used to force the symlink creation if the target already exists; `{APP_NAME}` represents the project's name.

Our deployment strategy is very common in the PHP world. We store multiple releases of the same application on the production machines, and we use a symlink to the current version. This way we should deploy **atomically and safely**, without impacting the production traffic.

Last but not least, we have about 15 front-end machines behind a load-balancer with a round-robin workload balancing policy (more than twice the previous number of servers). Now the question is: what happens after the release switch?

# It's all PHP OPCache's fault (?) 

Some caveats: the goal of this article is not to dive deeply in a PHP script execution flow, but to lay down the foundations to understand my reasoning about the problem; I am also only taking into account PHP version 7.

It can be useful to revisit how PHP code is executed. When we run a PHP script, our source code undergoes four phases: 

![How does PHP work?](/images/realpath-cache-is-it-all-php-opcache-s-fault/graph_1.png)
*How does PHP work?*

The first phase is managed by a lexer: the **PHP lexer** is responsible for matching language keywords like `function`, `return` and `static` to individual pieces generally called *tokens*. Each token is often decorated with some metadata, necessary for the next phase. 

The second phase is managed by a parser: the **PHP parser** is responsible for analyzing single or multiple tokens, and match them to language structure patterns. For example `$foo + 5` is recognized as a binary "sum" operation, and the variable `$foo` and the number `5` are recognized as operands. Here, the parser builds the [**Abstract Syntax Tree (AST)**](https://wiki.php.net/rfc/abstract_syntax_tree) in a recursive way. Usually, lexer and parser are mentioned together as a single task.

The third phase is the **compilation**. In this phase, the AST is visited and it's translated into an ordered sequence of OPCodes instructions. Every OPCode could be considered as a low-level **Zend Virtual Machine** operation. The full list of supported OPCodes is available [here](https://github.com/php/php-src/blob/php-7.0.0/Zend/zend_vm_opcodes.h). The last phase is the **execution**. The Zend VM runs every single task described by OPCode, and produces the result.

The first three phases of the above described "pipeline" (lexer, parser and compiler), and the third in particular takes a lot of time and resources (memory and CPU). To minimize the weight of the compilation phase, PHP 5.5 introduced the [**Zend OPcache extension**](http://php.net/manual/en/book.opcache.php). If enabled, this extension will cache the output of the compilation step (OPCodes) into shared memory (shm, mmap, etc.), such that every PHP script is compiled only once, and different requests can be executed skipping the compilation task. If the source code on the non-development environment is not frequently changed, the PHP execution time should be reduced by a factor of at least two.

The OPcache extension is also responsible for the OPCodes optimization, but that's out of scope for this article. 

In the light of the above, it's reasonable to expect that the strange behavior experienced in our production environment is all OPCache's fault. If that's right, we should be able to reproduce the issue and solve it by disabling the OPCache extension. To test this hypothesis I've prepared a very simple demo environment using a **Docker** container with PHP 7.0 and Apache 2.4. The full code is available on [Github](https://github.com/salvatorecordiano/facile-it-realpath_cache).

I wrote some shortcuts to simplify the process:

- `start.sh` starts the Docker container with the right configuration; 
- `release-switcher.sh` swaps the current release symlink every 10 seconds;
- `release-watcher.sh` checks the current release served by Apache every second, by making an HTTP request.

Just clone the GitHub repository and you're ready to test, assuming Docker is already installed on your machine.

```bash
git clone https://github.com/salvatorecordiano/facile-it-realpath_cache
cd facile-it-realpath_cache
docker pull salvatorecordiano/realpath_cache
```

To reproduce the cache issue, you have to run the following commands in parallel, using three different command lines:

```bash
# start the container with production configuration
./start.sh production 
# start switching the current release
./release-switcher.sh
# start watching the current web server response 
./release-watcher.sh
```

The following [video](https://www.youtube.com/watch?v=PNjyi42VwP4) shows the execution output.

{{<img-lazy src="/images/realpath-cache-is-it-all-php-opcache-s-fault/demo_production.gif" title="Execution with configuration: production" label="Execution with configuration: production">}}

As expected we are experiencing the cache issue: after a release switch, we're not seeing the right code as the output of an HTTP request.

Now we disable the OPCache extension and redo the test.

```bash
# start the container with production configuration and opcache disabled
./start.sh production-no-opcache 
# start switching the current release
./release-switcher.sh
# start watching the current web server response 
./release-watcher.sh
```

The following [video](https://www.youtube.com/watch?v=WB78eE0kwUo) shows the output of this new execution.

{{<img-lazy src="/images/realpath-cache-is-it-all-php-opcache-s-fault/demo_production_no_opcache.gif" title="Execution with configuration: production" label="Execution with configuration: production-no-opcache">}}

This is unexpected, we are experiencing the previous behavior, thus something is missing from our reasoning: **it's not all OPCache's fault after all**.

# realpath_cache: the true culprit

When we use `include/require` functions or PHP autoload, we should probably think about **realpath_cache**. Real path cache is a PHP feature that allows to **cache paths resolution for files and folders**, in order to minimize time-consuming disk lookups and improve performance. This is very useful when working with many third party libraries, or frameworks like Symfony, Zend or Laravel, because they use a huge number of files.

The path cache mechanism was introduced in PHP 5.1.0. At the present moment there's no mention of this feature in the official docs, if not for the functions `realpath_cache_get()`, `realpath_cache_size()`, `clearstatcache()` and the `php.ini` parameters `realpath_cache_size` and `realpath_cache_ttl`.  The only external reference I was able to find is an [old post](http://blog.jpauli.tech/2014/06/30/realpath-cache.html) written by **Julien Pauli** in 2014. In his post Pauli, a well-known PHP contributor, explains how PHP resolves a path behind the scenes.

When we access a file, PHP tries to resolve it's path using the `stat()` Unix system call: it returns file attributes (like permission, filename extensions and other metadata) about an **inode**. In the Unix world, an inode is a data structure used to describe a file system object such as a file or a directory. PHP puts the result of the system call in a data structure called `realpath_cache_bucket`, excluding some things like permissions and owners. So, if we try to access the same file twice, the bucket lookup will spare us another slow system call. To deepen the subject, I suggest reading this bit of [PHP source code](https://github.com/php/php-src/blob/php-7.0.0/Zend/zend_virtual_cwd.c).

The function `realpath_cache_get` was introduced in PHP 5.3.2 and it allows one to get an array of all the real path cache entries. For each element of the array, the key is the resolved path, and the value is another array of data like `key`, `is_dir`, `realpath`, `expires`.

What follows is the output of `print_r(realpath_cache_get());` in our Docker test environment:

```PHP
Array
(
    [/var/www/html] => Array
        (
            [key] => 1438560323331296433
            [is_dir] => 1
            [realpath] => /var/www/html
            [expires] => 1504549899
        )
    [/var/www] => Array
        (
            [key] => 1.5408950988325E+19
            [is_dir] => 1
            [realpath] => /var/www
            [expires] => 1504549899
        )
    [/var] => Array
        (
            [key] => 1.6710127960665E+19
            [is_dir] => 1
            [realpath] => /var
            [expires] => 1504549899
        )
    [/var/www/html/release1] => Array
        (
            [key] => 7631224517412515240
            [is_dir] => 1
            [realpath] => /var/www/html/release1
            [expires] => 1504549899
        )
    [/var/www/current] => Array
        (
            [key] => 1.7062595747834E+19
            [is_dir] => 1
            [realpath] => /var/www/html/release1
            [expires] => 1504549899
        )
    [/var/www/current/index.php] => Array
        (
            [key] => 6899135167081162414
            [is_dir] => 0
            [realpath] => /var/www/html/release1/index.php
            [expires] => 1504549899
        )
)
```

In the previous code:

- `key` is a float, and represents a hash associated with the path;
- `is_dir` is a boolean, and it's true when the resolved path is a directory, otherwise it's false;
- `realpath` is the resolved path, as a string;
- `expires` is an integer, and it represents the time when the path cache will be invalidated; this value is strictly related to the parameter `realpath_cache_ttl`.

In the previous sample we have 6 paths, but they're all related to the resolution of the path `/var/www/current/index.php`. PHP has created 6 cache keys to resolve just one path. So a path is resolved by splitting it in parts and resolving them one at a time. In our case the "real" path is `/var/www/html/release1/index.php` because `/var/www/current` is a symlink to the folder `/var/www/html/release1`.

Julien Pauli's post also specifies:

> «The realpath cache is process bound, and not shared into shared memory».

This means that the **cache must expire for every PHP process**. So if we are using [**PHP-FPM**](https://php-fpm.org) to clean the whole web server, we need to wait that the cache expires for every worker of the pool. This can be useful to understand what happens during our test while using the configuration `production-no-opcache`. Even if OPCache is disabled after the symlink swap, PHP will notify every process about the paths' expiration slowly.

In our real production environment we must consider that we have 15 front-end machines, hosting many web applications. Every machine has one PHP-FPM pool that is composed of 35 workers + 1 master process. This explains why the "strange behavior" is more evident in the new environment. We can **tune the real path cache impact** on our web application using the above mentioned the parameters `realpath_cache_size` and `realpath_cache_ttl`: the former determines the size of the real path bucket to be used by PHP. It is an integer and incrementing this value can be useful if our web application uses a huge number of files. The other configuration directive `realpath_cache_ttl`, as already mentioned, represents the duration in seconds for which the real path information should be cached.

Now we have the full picture, and we can re-enable the OPCache extension and disable real path cache, setting up size and time to live (TTL) as described below:

```bash
realpath_cache_size=0k
realpath_cache_ttl=-1
```

Let's run our (hopefully) last test:

```bash
# start the container with production configuration, opcache enabled and realpath_cache disabled
./start.sh production-no-realpath-cache 
# start switching the current release
./release-switcher.sh
# start watching the current web server response 
./release-watcher.sh
```

The following [video](https://www.youtube.com/watch?v=Qry6cvUmf3c) shows the output of the last execution.

{{<img-lazy src="/images/realpath-cache-is-it-all-php-opcache-s-fault/demo_production_no_realpath_cache.gif" title="Execution with configuration: production" label="Execution with configuration: production-no-realpath-cache">}}

It's crucial to point out that our last configuration is **strongly discouraged** on a production environment, because it will force PHP to always resolve every path it encounters, with a negative impact on the performance.

# Conclusions

The goal of this article was to unveil the mystery about our cache issue, and to share what I learned about OPCache and real path cache, and their differences. The scenario described at the beginning of the post is not a real issue but, for example, if a request starts on one version of the code, then it tries to access other files during its execution, and these files are updated, moved or deleted in subsequent versions of the code, it could result in actual problems: in the worst case a solution could be to guarantee the compatibility between two contiguous releases, but the said condition it's very hard to achieve.

It's necessary to implement an **atomic deployment strategy**, in the strict sense of the word. This could be reached for example using containers or more simply using a new isolated PHP-FPM memory pool for each deployed release. The last solution requires at least double the amount of memory, to keep more FPM pools up and running at the same time.

Another approach is to use an Apache module called `mod_realdoc` to support atomic deploys. It was written by [**Rasmus Lerdorf**](https://github.com/etsy/mod_realdoc). The trick implemented in `mod_realdoc` is to call real path on the `DOCUMENT_ROOT` symlink at the beginning of a request, and to set the absolute path as the real document root for the whole request. Consequently, requests that started before a symlink change will continue to execute on the previous symlink target. 
The only problem of that module is the requirement of [**Apache Multi-Processing Module (MPM) prefork**](https://httpd.apache.org/docs/2.4/mod/prefork.html). MPM prefork implements a non-threaded, forking based server that spawns new processes and keeps them alive to serve requests. It is the best MPM for isolating each request, so that a problem with a single request will not affect the others. But it's not the best for when the server is under heavy load, because there's going to be one process per request, thus concurrent requests will suffer since they're forced to wait until a server process is freed. The same result of `mod_realdoc` could be achieved at PHP level in the application front controller by defining the base root via `realpath(__FILE__)`.

If you're using the **nginx** web server in front of PHP, you are lucky! To avoid the symlinks update during ongoing requests, you must give nginx the responsibility to resolve symlinks and assign them to `DOCUMENT_ROOT`. You simply need to change a few lines on your server blocks, as described below: 

```bash
# default configuration
fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
fastcgi_param DOCUMENT_ROOT $document_root;
```

```bash
# configuration with real path resolution
fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
fastcgi_param DOCUMENT_ROOT $realpath_root;
```

With the above changes nginx will resolve the symlinks, hiding them from PHP.

These are just some discussed solutions to fight against real path cache issues, and there is no universal "right" way. You must always find the best solution considering your particular requirements and infrastructure.

# References

- [realpath_cache](http://blog.jpauli.tech/2014/06/30/realpath-cache.html)
- [Atomic deploys at Etsy](https://codeascraft.com/2013/07/01/atomic-deploys-at-etsy/)
- [mod_realdoc](https://github.com/etsy/mod_realdoc)
- [Understanding OpCache](https://www.sitepoint.com/understanding-opcache/)
- [PHP OPCache](https://secure.php.net/opcache)
- [Climbing the Abstract Syntax Tree](https://www.slideshare.net/asgrim1/climbing-the-abstract-syntax-tree-phpday-2017)
