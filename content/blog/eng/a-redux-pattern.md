---
authors: ["pierroberto-lucisano"]
comments: true
date: "2022-04-13"
draft: true
share: true
categories: [Design patterns, Javascript]
title: "A Redux pattern"
languageCode: "en-EN"
type: "post"
toc: true
---

# Introduction

There is inconsistency around the Redux community about how to use actions. Redux Toolkit documentation suggests the following approach:

> [...] we recommend trying to treat actions more as "describing events that occurred", rather than "setters".

Why should we treat actions as events rather than setters? Dan Abramov, founder of Redux, said that Redux doesn't reinvent event sourcing. It's up to people how to use it. It's clear that there isn't a well accepted approach about how to use actions.

In this article I'll talk about a design pattern for Redux. I'll show you how it can help to resolve some known problems. In particular, I'll try to find a way to describe how to treat actions. This we'll lead us to deal better with the asynchronicity and the mutation problems. The main goal is to get a consistent state for our application. To achieve that, we'll look for a predictable way to mutate the state of the application.

# Actions

Starting from the basics, a Redux action has the following signature:

```
export interface Action<T = any> {
 type: T
}
```

An action is a plain object. It has a type, and it's `any` by default. This definition is general and not sufficient. We don't like to use `any` as a type. It would be better to have something more specific. Redux Toolkit (RTK) is a package intended to be the standard way to write Redux logic. RTK provides a set of tools which help to write Redux logic. Among these tools, there are more specific types and that's why RTK is going to be our main reference for our journey. An action has the following signature:

```
export declare type PayloadAction<P = void, T extends string = string, M = never, E = never> = {
 payload: P;
 type: T;
} & ([M] extends [never] ? {} : {
 meta: M;
}) & ([E] extends [never] ? {} : {
 error: E;
});
```

An action is an object. It can have some optional properties such as `payload`. The `type` property is `string` by default. Documentation suggests keeping the `type` property as a string because it's easier to serialize it.

# Commands

We know the signature of an action and we're ready to go deeper. Let's consider a real-life example.

_You're getting out of a building and ready to take the elevator. You're in a hurry and start to hit the call button many times. The hope is to make the wait shorter. Hitting the button multiple times doesn't make the elevator either coming to you faster or coming at all. Indeed, it may be occupied or even out of service. At this point, there are two possible scenarios happening. Good scenario: the elevator arrives and you leave the building. Bad scenario: the elevator doesn't arrive. Then you decide to go down stairs on foot (hopefully you're not at the last floor of Burj Khalifa)._

**A command is an attempt to update the state**. Components and sagas (more about them later) execute commands. A command can be dispatched one or multiple times. This definition matches the first part of the Redux official definition of action:

> An action is a plain object that represents an intention to change the state.

A command has the form of present tense. It's written in lower camel case notation. **A command doesn't mutate the state**. It represents an attempt to mutate the state in a way which can't be predicted by the command itself. A command doesn't have the knowledge of the state of the application. It can have an optional payload containing information useful to make decisions.

_When you hit the call button, you're sending important information to the elevator. In particular, your floor number and the direction it has to take. This information can only be sent by the person who hit the button. The elevator itself doesn't know where to go, either up or down. The elevator knows only where it's located. Hitting the button multiple times doesn't affect the behavior of the elevator. Indeed, it will ignore any extra request._

A command is not used to mutate the state, but it provides the saga with the information to make a decision. The signature of a command is the same signature of an action.

In our example, a good name for the command would be `callElevator`. This command could take the following shape:

```
import { PayloadAction } from '@reduxjs/toolkit'

const callElevator: PayloadAction<number> = {type: 'callElevator', payload: n }
```

where `n` is the floor number requested by the user.

[Redux style guide documentation](https://redux.js.org/style-guide/style-guide#model-actions-as-events-not-setters) strongly suggests to use events as naming convention for actions. Unfortunately, it cannot always be done. A click on a button is an attempt which triggers an event at a certain point. When a user clicks on a button there is no way to know if that request can be handled.

To sum up, commands are Redux actions triggered by components and sagas. They don't mutate the state and they don't resolve the asynchronicity problem yet. Next step is to understand how sagas manage events.

# Events

Back to our example.

_Hitting the button doesn't mean that you will take the elevator. There are two possible scenarios. In the first scenario, the elevator is free and ready to get you. The button changes color, becoming red. In the opposite situation, the elevator is occupied. A red light indicates that it's occupied and moving to get someone else. In this case hitting the button would have no effect on the elevator._

**An event represents an update of the state**. It's an action, written with the past tense and in Pascal case. An event has an optional payload. It contains the information useful to update the state. Its signature is the same as a Redux action.

Let's try to find valid events names. `ElevatorRequested` is the event for the successful request. It's right after the first hit to the button. `ElevatorCalled` occurs when a red light appears around the button. With `ElevatorReady` the elevator reaches the floor and the doors open. `ElevatorOccupied` happens when the request fails and a red light surrounds the button.

This is a simplified version of the scenarios that can happen. It could happen that the elevator is broken. Or maybe it breaks during its move. There are many events that we can take into account. The events we consider depend on how much we go deep into the process.

To sum up, an event has the same signature of an action. It's written with a specific notation (Pascal case) and with a specific verbal form (past tense).

# Sagas

A saga contains the business logic of the whole process. A saga decides whether to execute a command or not. A saga dispatches events and commands. A saga matches the same concept of saga used in [Redux-Saga](https://redux-saga.js.org/). A saga manages asynchronous flows and side effects. It tackles parallel execution, task concurrency, task racing, task cancellation and more.

Let's consider the case of an [autocomplete field](https://mui.com/components/autocomplete/). The goal is to fetch an updated list of cities and to render the elements of the list as items of the select. The list is filtered as the user starts to type inside the field. Every time a user types a letter, we dispatch a command (`fetchCities`). The autocomplete component will dispatch this command every time the input changes. This means making an API call for each letter which the user types. Making multiple API calls implies bad performances and a poor user experience. We need to filter out in some way the extra requests coming from the component. One way could be to add a check in the `onChange` function of the autocomplete component. We could add a debounce function which helps to avoid many requests. As pointed out before a component should only render and add styles to the UI. Following this reasoning, a saga, which keeps the logic of the autocomplete, should do this check. For our specific need, Redux-Saga comes with a helper, named [debounce](https://redux-saga.js.org/docs/recipes/#debouncing), which does exactly what we expect. Commands, dispatched by components, don't affect the state of our application. It's the saga which decides how to deal with the commands. In this case, the `debounce` helper resolves this problem.

The underlying idea is that components render while reducers and sagas manage the business logic. Components don't need to add additional checks. Every saga is responsible for a unique part of the business logic. In this specific case, it would be retrieving the list of the cities of a country area.

This moves our problem to sagas and how they should be used. A saga has an open-ended logic and it includes the lifecycle of a business process. Every saga should start with a `start` command and end with a `stop` command. Components will dispatch these two commands with a `useEffect`:

```
import React, { useEffect } from 'react'
import { dispatch } from '@reduxjs/toolkit'

const MyComponent = () => {

 useEffect(() => {
  dispatch(action.start())

  return () => {
    dispatch(action.stop())
  }
 }, [])

 return null
}
```

The `start` and the `stop` commands generate the two equivalent events: `Started` and `Stopped`. A `Started` event reflects the initial state of the reducer. The most interesting part relates to the `Stopped` event. It represents the end of the saga. This event resets the reducer to its initial state. When the event is dispatched, it's expected that every other running event will be canceled. A `cancel` effect, provided by Redux-Saga, achieves this.

![Commands and events](/images/a-redux-pattern/commands-events.gif)

In the picture there is an example of a process. It starts from a component which dispatches a command. Then the saga dispatches an event which updates the state. The state is updated and the component rerendered. Meanwhile, the saga makes an API request. When the backend sends a response, the saga dispatches another event containing the response. After the state is updated, the component rerenders, if necessary.

To sum up, this pattern suggests to use actions in two different ways. The first way is through commands. They don't mutate the state since they represent an attempt to mutate it. The second way is through events. Events mutate the state and represent something that happened. Grouping actions in two different types allow us to find a predictable way to mutate the state. We have a consistent state which only mutates when events occur.

Here some useful resources:

- https://martinfowler.com/bliki/CQRS.html
- https://udidahan.com/2009/12/09/clarified-cqrs/
- https://www.quirksmode.org/blog/archives/2015/07/stop_pushing_th.html
- https://martinfowler.com/bliki/DomainDrivenDesign.html
- https://engineering.tableau.com/redux-command-bus-or-event-store-2c4c044cd481
- https://martinfowler.com/eaaDev/EventSourcing.html
- https://docs.microsoft.com/en-us/azure/architecture/patterns/event-sourcing
- https://kickstarter.engineering/event-sourcing-made-simple-4a2625113224
- https://www.innoq.com/en/blog/domain-events-versus-event-sourcing/
- https://serialized.io/ddd/domain-event/
- https://khalilstemmler.com/blogs/camel-case-snake-case-pascal-case/
- https://github.com/gaearon/ama/issues/110#issuecomment-230331314
- https://github.com/reduxjs/redux/blob/master/src/types/actions.ts
- https://redux.js.org/understanding/thinking-in-redux/motivation
- https://github.com/xzhavilla/escqrs
