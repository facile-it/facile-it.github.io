---
authors: ["emulator000"]
date: "2018-11-15"
draft: true
share: true
categories: [English, RabbitMQ, AMQP, Consumer, PHP, Rust, Go]
title: "Common problems faced by PHP developers in consuming an AMQP message"
type: "post"
languageCode: "en-EN"
toc: true
---

When we use RabbitMQ and our project is in PHP, we have to run a Consumer and we could encounter some common and still unresolved problems.

In order to implement RabbitMQ in the project, there are different ready to use packages, especially when we use a framework like Symfony or Laravel. Usually these packages provide the full integration needed for the AMQP protocol, so we can easily configure it and create a Producer and a Consumer; then, we have to create a little script that will supervise the PHP process in order to make sure that all our consumers are running. 

# Consumer

In order to consume a message, we have to run a demon that will listen for new messages, then process each message executing some logic: this is a normal flow in case of blocking requests, and we don't want to block the user request nor loose it.

We want also to keep track of all requests and if one fails, we could retry to process it again or just ignore it if some blocking error occurs.

## The memory problem

A normal PHP script serves a single request, then the script _dies_ naturally as the execution of provided instructions is completed, and the allocated memory is freed. In a PHP consumer we have to execute a long running PHP process: this will cause us to face a memory problem, because PHP is not properly designed to achieve this goal, and this will cause trouble for sure if we don't pay attention to the script code.

Normally, you don't notice any memory issue due to fact that the script runs for few seconds; also, in a long running PHP process, if you try and run a simple script for few minutes it could not use any additional memory at all, but if you use some framework, an ORM or you are in a complex application with many dependencies, the application will eventually allocate some memory (e.g. for caching results), and you could even notice a progressive increase of the memory used by the PHP process due to some memory leaks.

That's not a problem at all in a normal case, where the script ends and the memory is freed normally, but the case is not that obvious for a long running process like the one required by a PHP consumer. It will break, leak and, in some cases, corrupt the memory, and this will make the process crash or, more drastically, fail to run some instructions, as the opcode cache gets changed while the process is running.

If you are interested in more accurate details and information, I suggest reading [this article](http://notjam.es/blog/2014/06/18/the-problems-with-long-running-php.html): it's pretty old, but explains this issue very well.

## Multiple consumers

If you are running a PHP consumer, is very hard to process multiple messages at time because PHP runs in a single thread and also, a proper async/await interface is not well supported or mature. One more time, PHP is not well designed for this scope and this could be a limit in some circumstances, scaling is very hard.

Running multiple PHP consumers is not a good idea as well, supposing a framework based application, this could use an huge amount of memory and could reach easily GBs of RAM used. If in the "waiting" time there are no messages, this is a very waste of memory that instead, could be used for some other resources or requests. 

## Updating the codebase

Another common problem when we have PHP consumers is when we have to update the codebase: if we deploy something that change the code and some service used by the consumer, we can easily break the integrity of the entire long running process execution.

We have to close all the consumers and sometimes we have to force kill processes, because, they hangs due to some memory corruption, so, we have to start them again and obviously, we have to provide a script that will do this automatically for us during the deploy or in the pipeline.

## The network problem

When we work with a network based service, we have to expect failures and we must have some reconnection policies. A common problem when we have a long running PHP process is a broken pipe (in a very popular bundle this is still an issue due to PHP nature, [see here](https://github.com/php-amqplib/RabbitMqBundle/issues/301)) because we can't use a feature that is exactly made for this sort of issues resolution, the Heartbeat. In a consumer connection, normally we have to implement a sort "ping" mechanism, this is a mention of the [official RabbitMQ documentation](https://www.rabbitmq.com/heartbeats.html):

> Network can fail in many ways, sometimes pretty subtle (e.g. high ratio packet loss). Disrupted TCP connections take a moderately long time (about 11 minutes with default configuration on Linux, for example) to be detected by the operating system. AMQP 0-9-1 offers a heartbeat feature to ensure that the application layer promptly finds out about disrupted connections (and also completely unresponsive peers). Heartbeats also defend against certain network equipment which may terminate "idle" TCP connections.

This is something that is still not possible in PHP and obviously cause troubles in our PHP consumer.

# Some solution

We ran this configuration for some time and we experienced ALL of these problems randomly during the normal application flows. We decided to find a good solution and we ended up with an external CLI command processor written in another language and designed for the scope.

The pros of having an external consumer like this is that we haven't to care of the supervision of the process nor the worries in case of changes on the codebase.

## RabbitMQ cli consumer

Initially we used [this consumer](https://github.com/corvus-ch/rabbitmq-cli-consumer) written in Go, it's very well documented and light enough. We still use it for some projects though.

> This is a fork of the work done by Richard van den Brand and provides a command that aims to solve the above described problem for RabbitMQ workers by delegate the long running part to a tool written in go which is much better suited for this task. The PHP application then is only executed when there is an AMQP message to process. This is comparable to how HTTP requests usually are handled where the webs server waits for new incoming requests and calls your script once for each request. 

Anyway, scaling with this consumer was a bit tedious because we have to attach more than one consumer per queue in order to run parallel processes. That could be okay for few consumers but if we have to run more than 10 consumers, this is not good for the RabbitMQ load and resource consumption as we create 10 parallel connections. Making too many connection is severely discouraged as mentioned [here](https://www.rabbitmq.com/tutorials/amqp-concepts.html#amqp-channels):

> Some applications need multiple connections to an AMQP broker. However, it is undesirable to keep many TCP connections open at the same time because doing so consumes system resources and makes it more difficult to configure firewalls. AMQP 0-9-1 connections are multiplexed with channels that can be thought of as "lightweight connections that share a single TCP connection".
>
> For applications that use multiple threads/processes for processing, it is very common to open a new channel per thread/process and not share channels between them.

## Our RabbitMQ consumer

I decided to write something internally here in Facile.it because our need was a bit different, we wanted a stable, scalable, connections optimized and memory usage consumer.

Another our need was to enable or disable a certain queue remotely, for example, with a MySQL database that allows changing of some parameters without restarting the consumer and we wanted just to enable or disable it with a click.

I could write this consumer in many languages, for example Go, Java or why not C++ but as I'm a Rust addicted, I decided to write this consumer in [Rust](https://www.rust-lang.org/en-US/).

Our RabbitMQ consumer is open-source and you can compile it for any OS compatible with Rust. You can found it on GitHub: https://github.com/facile-it/rabbitmq-consumer

If you want a ready to use binary, just go in [Releases](https://github.com/facile-it/rabbitmq-consumer/releases) and download a pre-compiled binary.

### Why Rust

I'll simply mention this quote directly from the Rust website:

> Rust is a systems programming language that runs blazingly fast, prevents segfaults, and guarantees thread safety.

Main features are:

* zero-cost abstractions
* move semantics
* guaranteed memory safety
* threads without data races
* trait-based generics
* pattern matching
* type inference
* minimal runtime
* efficient C bindings

Isn't this something that we would like to found in a RabbitMQ consumer? In fact, I looked for reliability, stability and memory safety first.

When I was looking for a good AMQP protocol integration library, I discovered [Lapin](https://github.com/sozu-proxy/lapin) that uses the asynchronous interface thanks to [Tokio](https://github.com/tokio-rs/tokio) and [Futures](https://github.com/rust-lang-nursery/futures-rs).

### Using the consumer

Place the downloaded binary and the configuration in a separated folder with the `config` folder and in order to start/stop the consumer process, you could create a little PHP script that will do this or manage it with supervisor in production.

You can start the process running:
```bash
rabbitmq-consumer
```

Attach an environment like `dev`, `prod` or any other preferred name in this way:
```bash
rabbitmq-consumer --env dev
```

Please make sure that the binary has the "execute" permission, when the process starts, it will print a log like this:
```log
2018-10-19 14:02:53 - config/config.toml loaded correctly.
2018-10-19 14:02:53 - Connection to: V4(127.0.0.1:5672)
2018-10-19 14:02:53 - Managing queues...
2018-10-19 14:02:53 - [example] Queue created
2018-10-19 14:02:53 - [example] Created channel with id: 1
2018-10-19 14:02:53 - [example] Consumer #0 declared "example_consumer_0"
```

### Sample configuration

You can use the default configuration provided by the repository and copy it as `config.toml` in order to run the binary without any additional parameter.

This is the default config content:
```toml
[rabbit]
host = "localhost"
port = 5672
username = "guest"
password = "guest"
vhost = "/"
queue_prefix = "queue_"

[[rabbit.queues]]
id = 1
queue_name = "example"
consumer_name = "example"
command = "php ../bin/console message:processor"
command_timeout = 30
base64 = false
start_hour = "00:00:00"
end_hour = "23:59:59"
count = 1
retry_wait = 120
retry_mode = "incremental"
enabled = true

[database]
enabled = false
host = ""
port = 3306
user = ""
password = ""
db_name = ""
retries = 3
```

The configuration is well explained in the [config.toml](https://github.com/facile-it/rabbitmq-consumer#configtoml) section of the repository, anyway this configuration provides one queue with the MySQL connection disabled.

For each received messages, the consumer will execute `php ../bin/console message:processor` command and sends the content as parameters, for example, if the received message is `--option 1`, the full executed command will be:
```bash
php ../bin/console message:processor --option 1
```

I put `../bin` here because usually I create a folder specific for the consumer binary content, so you have to go back by just one directory for the script path.

Using a relative path anyway is a bit discouraged, it's always better to put an absolute path as command path in order to avoid old code execution in case you deploy the consumer with the entire PHP application.

All the message content is parsed as arguments for our command, don't worry, this will can't execute any malicious command because every parameter is splits automatically by a space and can't be an executable (like grep or other commands).

You can found some details on how configure the consumer properly in the repository README, precisely in [this section](https://github.com/facile-it/rabbitmq-consumer#configuration).

### Queues in a MySQL database

If you want to manage remotely the queues, you must enable the database configuration:
```toml
[database]
enabled = true
host = "localhost"
port = 3306
user = "user"
password = "pass"
db_name = "example"
retries = 3
```

This configuration will allow the consumer to fetch a `queues` table directly from the database, you can found the needed DDL [here](https://github.com/facile-it/rabbitmq-consumer#queues-and-consumers).

The `retries` parameter defines the number of retry when the MySQL connection is lost, if all `3` retries fails, the process ends and you will have to restart it manually.

### A simple Symfony command

In order to execute a command, we need to create a PHP command, we use Symfony 3 (and 4) as framework for some projects and this could be an example of command created for the consumer:
```php
<?php

use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputDefinition;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class MessageProcessorCommand extends ContainerAwareCommand
{
    private const CODE_SUCCESS = 0;
    private const CODE_ERROR = 1;
    private const CODE_FATAL_ERROR = 2;
 
    protected function configure()
    {
        $this
            ->setName('message:processor')
            ->setDefinition(
                new InputDefinition(
                    [
                        new InputOption('option', 'o', InputOption::VALUE_OPTIONAL),
                        new InputOption('option2', 'o2', InputOption::VALUE_OPTIONAL),
                    ]
                )
            )
        ;
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     *
     * @return int
     */
    public function run(InputInterface $input, OutputInterface $output)
    {
        // We put this code here because we want to have the certainty of the
        // "exit code" returned if an unhandled exception occurs in a non-"ignored"
        // consumer "retry_mode" configuration
        //
        // For example: if you pass an invalid option to the Symfony command, this will
        // throw an exception that you can't handle in the "execute" method and the
        // default "exit code" is 0 and this means "Acknowledgement" for our consumer.
        try {
            return parent::run($input, $output);
        } catch (\Throwable $t) {
            return self::CODE_FATAL_ERROR;
        }
    }
 
    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     *
     * @return int
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        try {
            $option = $input->getOption('option') ?? '';
            $option2 = $input->getOption('option2') ?? '';

            // You can return any code if you are in "incremental" or "static" "retry_mode"

            return self::CODE_SUCCESS;
        } catch (\Throwable $t) {
            return self::CODE_FATAL_ERROR;
        }
    }
}
```

As you can see, I defined some constants like `CODE_SUCCESS`, `CODE_ERROR` and `CODE_FATAL_ERROR`, this will reflect the consumer exit codes logic as described on the consumer repository:

| Exit Code | Action                                |
|:---------:|---------------------------------------|
| 0         | Acknowledgement                       |
| 1         | Negative acknowledgement and re-queue |
| 2         | Negative acknowledgement              |

# Conclusions

Of course, the external RabbitMQ consumer is a good compromise because we can avoid common PHP problems and use a fully separated consumer. By the way, this solution also have a contraindication: you have to pay the command bootstrap time for each message.

If you run a simple application, this is not a big issue, the command calls a simple script and simply execute it but, if you use a framework, this could be a problem and slow down the application or use a bit more resources when the single command is executed each time.

As you can see, there isn't a perfect solution for this problem or anyway I didn't found it yet.

# References

* [Consuming AMQP messages in PHP](https://medium.com/@sergey.kolodyazhnyy/consuming-amqp-messages-in-php-6650c06936fa)
* [The problems with long running PHP scripts](http://notjam.es/blog/2014/06/18/the-problems-with-long-running-php.html)
* [Client Documentation](https://www.rabbitmq.com/clients.html)
* [13 common RabbitMQ mistakes](https://www.cloudamqp.com/blog/2018-01-19-part4-rabbitmq-13-common-errors.html)
* [PHP Meminfo and Memory Leaks](https://alanstorm.com/php-meminfo-and-memory-leaks/)
