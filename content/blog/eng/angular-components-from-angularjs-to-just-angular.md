---
authors: ["simone-lazzaroni"]
comments: true
date: "2017-02-01"
draft: false
menu: ""
share: true
categories: [English, Angular, Javascript, WebComponent, UI]
title: "Angular Components: from AngularJS to \"just Angular\""
languageCode: "en-En"
type: "post"
twitterImage: '/images/web-components-a-path-to-angular-2/angular.png'

---
<p align="center"> <img src="/images/web-components-a-path-to-angular-2/angular.png"> </p>


With version 1.5 and newer, Angular (formerly known as AngularJS, but apparently now [*it's just Angular*][its-just-angular]) introduced their own interpretation of [Web Components][web-components], back-porting *Components* from Angular 2.

Using *Components* with Angular today not only means writing code much more easily upgradeable to future framework versions (especially using ES6), but it also allows you to modularize and reuse code more easily, in line with the modern frontend programming style that will be more and more modular.

But, as with anything new, there are open questions:

- When should you use it?
- Why should you use it?
- What’s the difference between `.component()` and `.directive()` APIs?

According to the official documentation, a *Component* is like a *Directive*... but easier to use! 

## Directive vs Component

**Directive:**

- was the main API to access the DOM in Angular 1.x; 
- isolates parts of the DOM to create reusable building blocks; 
- can be both a [DOM element][MDN DOM Element docs] **and/or** a [DOM attribute][MDN DOM Attribute docs];
- uses link and compile functions to operate on the DOM and the  model.

**Component:** 

- is an higher level abstraction of *directives*
- can only be a DOM element (and aggregate others)
- has an isolated scope by default
- automatically uses `controllerAs` syntax
- uses controllers instead of link functions
- has `bindToController` option on by default

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

Here’s how you’ll write it with `.component()`:

``` javascript

app.component('list', {
  bindings: {
    items: '='
  },
  templateUrl: 'list.html',
  controller: function ListCtrl() {}
});

```
As you can see not much has changed, but things are a little simpler:

`bindToController` is the default and with the `bindings` property the scope is always isolated; `controllerAs` is on and defaults set to `$ctrl`.

Components so don’t manipulate the DOM or data that are outside their scope, but they receive inputs and produce outputs through the interaction with the view.
Another nice point is that we don’t need to write a **dumb** function that always returns the same object, we just define that object right here.

## Comparison between Directive definition and Component definition

  property     | Directive    | Component
-------------- | ------------ | -------------
`bindings`     | No           | Yes (binds to controller)
`bindToController` | Yes (default: `false`) | No (use bindings instead)
`compile()`   | Yes           | No
`controller`   | Yes          | Yes (defaults to `function() {}`)
`controllerAs` | Yes (default: `false`) | Yes (default `$ctrl`)
`link()`      | Yes           | No
`multiElement` | Yes          | No
`priority`     | Yes          | No
`require`      | Yes          | No
`scope`        | Yes (default: `false`) | No (scope is always isolate)
`template`     | Yes          | Yes, injectable
`templateNamespace` | Yes     | No
`templateUrl`  | Yes          | Yes, injectable
`terminal`     | Yes          | No
`transclude`   | Yes (default: `false`) | Yes (default: `false`)

## New other goodies:

#### One way data bindings

Previously, we could pass objects to child directives/components with the `=` binding:

``` javascript

app.component('bar', {
  templateUrl: 'bar.html',
  bindings: {
    foo: '='
  },
  controller: function() {}
});

```

This would have created a **two-way data binding** with the component’s parent. Whenever the parent would assign a new value to `foo`, or change the existing one, this would be propagated to the child too, and vice-versa; this is how two-way data binding operates by design.

While helpful, this isn’t a very common scenario in my experience, because it has its drawbacks: mostly, in complex applications it may become more difficult to reason about, and it can have heavy performance implications.

That’s why Angular has introduced one-way data bindings: these create just a single *watcher*, watching for changes on the parent and propagating them to the child. As a result we gain performance (by cutting in half the amount of watchers created) and things become less "error friendly".

The syntax is similar to the code below:

``` javascript

app.component('bar', {
  templateUrl: 'bar.html',
  bindings: {
    foo: '<'
  },
  controller: function() {}
});

```

Yeah, we just changed `=` to `<`.

Other data binding parameters are:

 * `@`: interpolation bindings (input parameter), also used in the directives for values ​​coming from the DOM as strings;
 * `&`: expression bindings, often used to pass a function to a component to provide a callback event (to generate an output) to the caller.

#### Lifecycle hook: `$onInit`, `$onChanges`, `$onDestroy` and `$postLink`

Lifecycle hooks provides us with an easy way of invoking operation based on the lifecycle of our components. The usage of these hooks lets us provide our users with relevant information or action at the appropriate time.

 * `$onInit()` is executed when all controllers on the element have been constructed and after their bindings are initialized.
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

This is a very simple example, but imagine we’d need to do some HTTP requests during initialization of this component or controller: now we have a better place for these kind of things.

 * `$onDestroy()` is called when its containing scope is destroyed. We can use this hook to release external resources, watches and event handlers.
In a scenario where you have attached non-native Angular event listeners or logic, we can use this hook to clean it up when the component is destroyed.
 * `$onChanges()` is a particular type of “watch” called  when changes occur in one way bindings on the input component interface. 
It gets called with an object that holds the changes of all one-way bindings with the current Value and the previous Value.
With `$onChanges` we can react to this changes and update the child component data effectively.

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

Now we want to prepend the user with “Hi” when the user is JohnDoe and otherwise put “Hello”. We can do that using the `$onChanges()` lifecycle hook. 
It gets called with an object that holds the changes of all one-way bindings along with the currentValue and the previousValue.

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

 * `$postLink()` is called after the controller's element and its children have been linked. When the component elements have been compiled and are ready to go, this hook will be fired;  
It can help us to implement some functionality that depends on the component elements to be fully compiled.
It’s important to note that this is not a complete replacement for DOM manipulation, this functionality should be handled by decorator directives.

## Conclusion

Adopting *Components* allows you to write code that is more easily portable to future Angular versions and introduces a modular architecture of the DOM that is more maintainable compared to the usual guidelines.

In a *Component* based architecture, an application becomes a tree structure of elements, with well-defined inputs and outputs, a clear data-flow, and predictable behaviours.

In this structure, the root elements are usually called "smart components" because these are the ones who manage the data, while those closest to the leaves are called "dumb components" instead, because they are more UI focused and are highly reusable.

In conclusion, `.component()` is a great addition to Angular. It’s a real upgrade for code quality and helps you prepare for the future.

So, upgrade to 1.5 and start using `.component()`: you have unlocked a new skill!

For more details refer to understanding components [docs](https://docs.angularjs.org/guide/component)

[web-components]: https://www.webcomponents.org/
[MDN DOM Element Docs]: https://developer.mozilla.org/en-US/docs/Web/API/Element
[MDN DOM Attribute Docs]: https://developer.mozilla.org/en-US/docs/Web/API/Attr
[its-just-angular]: http://angularjs.blogspot.it/2016/12/ok-let-me-explain-its-going-to-be.html#Its_just_Angular_39
