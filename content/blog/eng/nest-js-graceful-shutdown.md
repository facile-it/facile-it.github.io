---
authors: ["pasqualino-desimone"]
comments: true
date: "2023-10-14"
draft: false
share: true
categories: [Node.js, NestJS, RabbitMQ, Typescript]
title: "NestJS graceful shutdown for RabbitMQ Microservices"
toc: true
languageCode: "en-US"
type: "post"
twitterImage: /images/nest-js-graceful-shutdown/nestjs-rabbitmq.webp
---

**_Dealing with a graceful shutdown is essential for a resilient and proficient application. In this article, I am going to explain how you can deal with this technique in NestJS using RabbitMQ as a Message Broker through the Microservices feature._**

![NestJS with RabbitMQ](/images/nest-js-graceful-shutdown/nestjs-rabbitmq.webp)

# What is the problem?

In my current job, my team deals with asynchronous jobs in our project daily.

Because of the intrinsic nature of **asynchronous jobs**, they take a long time to execute, sometimes over 30 seconds.

During those executions, many things could happen. A new deployment, downscaling, node changing on K8s or spot terminations, could require a **shutdown** of the current instance of your application.

But, what if during this shutdown request the application is **still executing some operation**?

The application should **wait** for the execution to end before definitively shutting down. At the same time, the application should guarantee that it doesn't accept new incoming requests of new jobs to avoid creating an infinite loop. This mechanism is named graceful shutdown _(for a more appropriate definition see below)_.

Our application sends commands between different services with **RabbitMQ** as the broker. We use **NestJS** as the main framework and, going deeper, we use the **Microservices RabbitMQ Transport** feature to perform the job associated with incoming messages.

Despite NestJS already having a RabbitMQ broker transport mechanism, it doesn’t deal the graceful shutdown natively for this kind of microservices. This means if you have a running execution, the shutdown kills it and exits directly.

> NestJS natively has a graceful shutdown mechanism for HTTP requests but not for RabbitMQ Microservices.

# What is a graceful shutdown?

The graceful shutdown is a technique with which the application, process, or system is intentionally shut down. With this technique, the involved system tries to shut down **preserving the state, preventing data corruption or malfunctions and completing pending operations before ending.**

Generally, a system receives a signal or event from the external world to start the graceful shutdown procedure.

Different systems or frameworks deal with this technique in different ways based on their intrinsic nature.

> Graceful shutdown means that **all** current requests in the system are executed before exiting from the process without having data corruption or failures.

Imagine having an HTTP server connected to the database during the execution of a query. What if during execution the process ends immediately? It could be possible to have several requests in execution that could not be ending correctly and maybe will have data corruption. For the right shutdown, the server should:

- block new incoming requests
- end the pending and current executions
- close all connections to third-party services
- exit from the process

In the same way, if you have a message broker like RabbitMQ that consumes messages from a queue, the application should:

- cancel the consumer listener to prevent new incoming messages from entering the queue
- perform the pending and current executions
- acknowledge current messages
- close all connections to third-party services
- exit from the process

Other systems can handle graceful shutdown in different ways.

# How do NestJS, NodeJS and RabbitMQ deal with graceful shutdown?

If you want to know how NodeJS generally handles graceful shutdown, you can read this [article](https://hackernoon.com/graceful-shutdown-in-nodejs-2f8f59d1c357).

On the other hand, [here](https://docs.nestjs.com/fundamentals/lifecycle-events#lifecycle-sequence) is an implementation of the NestJS graceful shutdown.

[Here](https://gist.github.com/eduardo-matos/2eb06ec4c6354e0f48ea3b60889c24f1) is an implementation of RabbitMQ's graceful shutdown.

# What are microservices in NestJS?

If you have landed here, I suppose that you already know what NestJS Microservices are and are very familiar with how RabbitMQ Transport works. Despite that, in the following text, you can find the information about Microservices and RabbitMQ documentation for NestJS. If you don’t know these concepts I advise you to read the following pages before continuing.

[NestJS Microservices](https://docs.nestjs.com/microservices/basics)

[RabbitMQ Microservice](https://docs.nestjs.com/microservices/rabbitmq)

In particular, on this [page](https://docs.nestjs.com/microservices/custom-transport), you can read about the creation of a Custom Transporter.

# The solution (maybe)

I created a repository with an example of a custom implementation of RabbitMQ Server Transport with graceful shutdown.

[https://github.com/pasalino/nestjs-rabbitmq-transporter-graceful-shutdown](https://github.com/pasalino/nestjs-rabbitmq-transporter-graceful-shutdown)

# In a nutshell

> As I write this article, I am gathering all of my thoughts and information and putting them in the repository mentioned earlier. In the future, I plan to make time to create a library about this topic.

The whole implementation is encapsulated in this file: [https://github.com/pasalino/nestjs-rabbitmq-transporter-graceful-shutdown/blob/main/src/graceful-server-rmq.ts](https://github.com/pasalino/nestjs-rabbitmq-transporter-graceful-shutdown/blob/main/src/graceful-server-rmq.ts)

You can paste it into your application.

To use it, at the moment of Microservice instantiation (on Bootstrap), utilize it as a strategy:

```typescript
const app = await NestFactory.createMicroservice(AppModule, {
  strategy: new GracefulServerRMQ({
    urls: ["amqp://localhost"],
    queue: "messages",
    // Here you can put all options of ServerRMQ
  }),
});
```

You must enable the `enableShutdownHooks` or close the app directly in the `SIGTERM` handler.

**_That’s all folks!_**

# TL;DR

If you like long explanations, follow me down the rabbit hole.

The [GracefulServerRMQ](https://github.com/pasalino/nestjs-rabbitmq-transporter-graceful-shutdown/blob/main/src/graceful-server-rmq.ts) Custom Transporter uses all features of ServerRMQ of NestJS, in fact, it extends this class.

export class GracefulServerRMQ extends ServerRMQ {

You can find the native implementation [here](https://github.com/nestjs/nest/blob/master/packages/microservices/server/server-rmq.ts):

Behind the scenes, the ServerRMQ uses [amqp-connection-manager](https://www.npmjs.com/package/amqp-connection-manager) to manage RabbitMQ connections and in deep this library is based on [amqplib](https://www.npmjs.com/package/amqplib).

Amqplib uses the `consume` method to handle incoming messages and return a [consumerTag](https://amqp-node.github.io/amqplib/channel_api.html#channel_consume). At the moment NestJS implementation does not handle the consumerTag and there isn’t a way to remove the consumer from the current channel.

GracefulServerRMQ overrides the `setupChannel` method from the base implementation and stores the consumer tag in a class field (you can compare the methods). The `setupChannel` is the method provided to the `createChannel` method of the amqp-connection-manager server.

> _As you can see in the amqp-connection-manager documentation:_ “The setup functions will be run every time amqp-connection-manager reconnects, to make sure your channel and broker are in a sane state.”

```typescript
public async setupChannel(channel: Channel, callback: () => void) {
    // If the server is closing, the setup channel doesn't re-open the consumer
    if (this.closing) {
      return;
    }
    if (!this.queueOptions.noAssert) {
      await channel.assertQueue(this.queue, this.queueOptions);
    }
    await channel.prefetch(this.prefetchCount, this.isGlobalPrefetchCount);

    const { consumerTag } = await channel.consume(
      this.queue,
      (msg: Record<string, any>) => this.handleMessage(msg, channel),
      {
        noAck: this.noAck,
      },
    );

    // The consumerTag is stored in the instance of the server
    this.consumerTag = consumerTag

    callback();
  }
```

After the connection, the handleMessage method, used by Microservices to handle a message from other microservices or external services, determines the message pattern and executes the correct handler (you can see it in the parent class).

To achieve the graceful shutdown without losing any execution, the custom implementation overrides the `handleMessage` method by adding a counter of the current executions.

```typescript
public async handleMessage(
    message: Record<string, any>,
    channel: Channel,
  ): Promise<void> {
     // Adding 1 if a new execution running
    this.runningMessages++;
    return super.handleMessage(message, channel)
      .finally(() => {
    // With finally method on the promise, we ensure that the counter remains consistent
	  // Removing 1 at the end of execution
	  this.runningMessages--;
       });
  }
```

This counter allows the Custom Transporter to wait for all handlers before closing the RabbitMQ Channel and Connection.

When the server is closing (when the `close` method is invoked):

1. At first, the Server cancels the RabbitMQ consumer associated with Channel. In this way, the server will not receive any new messages present in the queue.
2. The `close` method waits for the handler counter to be 0 (nothing in execution) or a timeout occurs.
3. At this point, the method closes the RabbitMQ channel and connection using the base implementation.
4. In the end, the application can exit gracefully.

```typescript
async close(): Promise<void> {
    // Notifies the instance that the server is being shut down
    this.closing = true;
    // If the channel is open yet
    if (this.channel) {
      // Trying to remove the setup according to amqplib-connection-manager documentation
      await this.channel.removeSetup(undefined, (channel: Channel) =>
          // Cancel the consumption of messages. At this stage, the server will not consume more messages from the queue
          channel.cancel(this.consumerTag),
      );
    }
    this.consumerTag = null;

    // Now the server will wait for the ending of pending handlers or exit for timeout
    // In this period, all handlers will end and the underlying channel is open yet. In this way, the consumer will be able to send ack message to RabbitMQ
    await Promise.race([
      this.waitingHandlers(),
      this.waitingEndingHandlersTimeoutMs > 0 &&
        sleep(this.waitingEndingHandlersTimeoutMs),
    ]);

    this.runningMessages = 0;
    // In the end the RabbitMQ channel and connection by base implementation
    super.close();
  }
```

# Summary

This implementation is one of the possible ways to obtain a grace shutdown of RabbitMQ for NestJS, which is surely a goal for any resilient application that deals with asynchronous messages with RabbitMQ. If you use an orchestrator, such as K8s, you face this problem daily. The GracefulServerRMQ allows you to avoid losing any execution and prevent data corruption with NestJS Microservices.
