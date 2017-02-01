---
authors: ["simone-lazzaroni"]
comments: true
date: "2017-01-24"
draft: false
menu: ""
share: true
categories: [Angular, Javascript, WebComponent, UI]
title: "Angular 1.5> .component() a path to Angular 2"
languageCode: "en-En"
type: "post"

---

AngularJS with version 1.5, has introduced natively  the concept of WebComponent, "inheriting" much of the experience made with Angular 2. 

Using Components with AngularJS today not only means writing code much more easily upgradeable to Angular 2, (especially if written in ES6), 
but also allows you to modularize and reuse more easily code, in line with the modern frontend programming style that will be more and more 
oriented to the components.

But, as with anything new, there are open questions:

- When should you use it?
- Why should you use it?
- What’s the difference between it and .directive()?

According to the official documentation, a component is like a directive ... but more easier to use! 

## Directive vs Component

**Directive:**

- isolate parts of the DOM to create components
- be an attributes of a tag
- you can compose and manipulate the DOM or model and so on (using link & compile function). 

**Component:** 

- can be only a tag (which aggregate other)
- have isolated scopes by default
- automatically use controllerAs syntax
- use controllers instead of link functions
- bindToController option is on by default

## Coding comparison

``` javascript

app.directive('list', function() {
  return {
    scope: {
      items: '='
    },
    restrict: “E”,
    templateUrl: 'list.html',
    controller: function ListCtrl() {},
    controllerAs: '$ctrl',
    bindToController: true
  }
});

```
It’s a simple component directive, with an isolated scope, binding, and a controller.

Here’s how you’ll write it with .component:

``` javascript

app.component('list', {
  bindings: {
    items: '='
  },
  templateUrl: 'list.html',
  controller: function ListCtrl() {}
});

```
As you can see, not much has changed, but, things are simpler:

 **bindToController** is the default and by **bindings** property the scope is always isolated; **controllerAs** is on and defaults set to **$ctrl**.

Components so don’t manipulate the DOM or data which are outside its scope, but receive inputs and produce outputs through the interaction of view.
Another nice point is that we don’t need to write a **stupid** function that always returns the same object.
We just define that object right here.

## Comparison between Directive definition and Component definition

  property   | Directive    | Component
------------ | ------------ | -------------
bindings | No | Yes (binds to controller)
bindToController | Yes (default: false) | No (use bindings instead)
compile () | Yes | No
controller | Yes | Yes (default function() {})
controllerAs | Yes (default: false) | Yes (default $ctrl)
link () | Yes | No
multiElement | Yes | No
priority | Yes | No
require | Yes | No
scope | Yes (default: false) | No (scope is always isolate)
template | Yes | Yes, injectable
templateNamespace | Yes | No
templateUrl | Yes | Yes, injectable
terminal | Yes | No
transclude | Yes (default: false) | Yes (default: false)

## New other goodies:

**One way data bindings**

Previously, we could pass objects to child directives/components with the = binding:

``` javascript

app.component('bar', {
  templateUrl: 'bar.html',
  bindings: {
    foo: '='
  },
  controller: function() {}
});

```

This would have created a two-way binding with the component’s parent. Whenever the parent would assign a new value, it would be propagated to the child. 
And vice-versa, if the component assigns a new value it will be copied to the parent, this is two-way data bindings.

This, while helpful, isn’t a very common scenario in my experience. That’s why Angular has finally introduced the new prospect of one-way bindings.
These create just a single watch, that watches for changes in the parent and syncs them to the child. We gain performance (by cutting in half the amount of watches created) 
and things become less error "friendly". 

The syntax is similar watch the code below:

``` javascript

app.component('bar', {
  templateUrl: 'bar.html',
  bindings: {
    foo: '<'
  },
  controller: function() {}
});

```

Yeah, we just change **=** to **<**.

other  bindings parameter:

**'@'**: Interpolation bindings (input parameter) also used in the directives for values ​​coming from the DOM as strings.

**'&'**: this symbol is used to pass a function in component to be used as a callback event (to generate an output) to the calling component

## Lifecycle hook: $onInit, $onChanges, $onDestroy and $postLink:

Lifecycle hooks provides us with an easy way of invoking operation based on the lifecycle of our components. Using this hooks lets us provide our users with relevant information or 
action at the appropriate time.

**$onInit()** is executed when all controllers on the element have been constructed and after their bindings are initialized.
This hook is meant to be used for any kind of initialization work for the controller.

``` javascript

app.component('MyCtrlComp', {
  templateUrl: 'user.html',
  controller: function() {
    this.$onInit = function() {
        this.username = 'John.Doe';
        console.log('User component initialized');
    };
  }
});

```

This is a stupis simple example , but imagine we’d need to do some HTTP requests during initialization of this component or controller.  
Now we have a better place for these kind of things.

**$onDestroy()** is called when its containing scope is destroyed. We can use this hook to release external resources, watches and event handlers.
In a scenario where you have attached non-native angular event listeners or logic, we can use this hook to clean it up when the component is destroyed.


**$onChanges()** is a particular type of “watch” called  when changes occur in one way bindings on the input component interface. 
It gets called with an object that holds the changes of all one-way bindings with the current Value and the previous Value.
With `$onChanges we can react to this changes and update the child component data effectively.

Suppose that we make the name property of our myUserCmp configurable from the outside using a one-way binding:

``` javascript

mod.component('myUserCmp', {
  template: '<h1>{{$ctrl.user}}</h1>',
  bindings: {
    name: '<'
  },
  controller: MyCtrlComp
});

```

in the markup we can now bind an expression to the component’s user property like this:


``` javascript

<my-cmp user="JohnDoe"></my-cmp>

```

Now we want to prepend the user with “Hi” when the user is JohnDoe and otherwise put “Hello”. We can do that using the $onChanges() lifecycle hook. 
It gets called with an object that holds the changes of all one-way bindings with the currentValue and the previousValue.

``` javascript

function MyCtrlComp() {
  this.$onChanges = function (changesObj) {
    if (changesObj.user) {
      var prfx;
      (changesObj.user.currentValue === 'JohnDoe') ?
        prfx = 'Hi ' : prfx = 'Hello ';
      this.user = prfx + this.user;
    }
  };
}

```


**$postLink()** is called after the controller's element and its children have been linked. When the component elements have been compiled and ready to go, this hook will be fired;  
can help us to implement some functionalities that depend on the component elements to be fully compiled.
It’s important to note that this is not a complete replacement for DOM manipulation, this functionality should be handled by decorator directives.


## Conclusion:

Adopt components allows you to write more easily portable code to Angular 2, introducing a modular architecture of the DOM more maintainable than the usual guidelines. 

In a components architecture, an application becomes a tree tag structure with well-defined inputs and outputs (limiting the two-way databinding) so as to make more predictable the 
change of state of application and its components. 
In this structure, usually the root tags are called "smart components" because they are the ones who manage the data, those closest to the leaves instead are called "dumb components" because 
they are pure interaction and are highly reusable.

Therefore .component() is a great addition to Angular. It’s a real upgrade for code quality and helps you preper for ng2.

So, upgrade to 1.5 and start using .component(): you have unlocked a new skill!

For more details refer to understanding components [docs](https://docs.angularjs.org/guide/component)

