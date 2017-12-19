---
authors: ["christian"]
comments: true
date: "2017-12-18"
draft: false
image: "images/understanding-functors/swift_logo.jpg"
menu: ""
share: true
categories: [English, Functional Programming, iOS, Swift]
title: "Understanding Functors (in Swift)"

languageCode: "en-En"
type: "post"


aliases: 
  - "/understanding-functors"
twitterImage: 'images/understanding-functors/swift_logo.jpg'
---

![Kotlin](/images/understanding-functors/swift_logo.jpg)

>Before we start: this is not going to be a theorical o mathematical article about the concept of Functor. There are many valid resources outside for that (you can find some of them at the end of the article). The main goal here is to show, step by step, what is a Functors and how to use it in practice. The examples are written in Swift, but of course these concepts are valid for many other languages.

## You are using functors every day
If you are not familiar with the concept of Functor, probably you aren't aware of the fact that you are using Functors many times per day. This is possible because some of the built in types of Swift are Functors. Let me list the (probably) most used:
- Optional
- Array

## What does make Optional and Array Functors?
To answer this quesiton, we need understand what do these types have in common.

### First: they are generic types that wrap values in a context.
Just make a little analysis of the phrase to better understand.

> "They are generic types..."

You can create an Optional with an associated value of any other type (Optional<Int>, Optional<String> or, if you prefere, Int?, String? and so on). Same story for Array (Array<Int>, Array<String>, or [Int], [String] and so on).

> "...that wrap values..."

When you create an Optional<Int> or an Array<Int> with a value, what you are doing is taking that value and wrapping it in another type. One of the effects of this wrapping is that you cannot apply anymore the functions available for the wrapped type.
```swift
let val1: Int? = 1
let val2: Int? = 2
val1 + val2    // Error!
```

Sounds bad, but things will get better soon.

> "...in a context."

It seems like that we have lost some control on our values wrapping them in this generic types. But we use Optional and Array types for a reason. And the reason define our "wrapping context". Asking help to the Swift documentation:

> You use optionals in situations where a value may be absent. An optional represents two possibilities: Either there is a value, and you can unwrap the optional to access that value, or there isn’t a value at all.

So, for Optional type, the context is "we may have or may not have a value of a specific type".

> An array stores values of the same type in an ordered list. The same value can appear in an array multiple times at different positions.

For Array type, the context is to store 0 or more values of the same type in an ordered way.

The second element that Optioanl and Array have in common will give us back the power that we lost wrapping.

### Second: they implement a `map` function
To understand what we are talking about, we create an Optional<Int> and an Array<Int>:
```swift
let opt: Int? = 5
let arr: [Int] = [1,3,5,7]
```

On each of them we can call a method called map:
```swift
opt.map { value in value * 2 }
arr.map { value in value * 2 }
```

The result of the first is a new Optional<Int> that contains 10, and the result of the second is a new Array<Int> that contains 2, 6, 10 and 14.

So, `map` is a function that takes another function (a transformation) and apply it to the wrapped value of a Functor. `map` will return the same functor with the transformed value.
This means that `map` extract the values inside the wrappers, give this value to the transformation function and create a new wrapper that wraps the returned valued of the function.

Now that we grasp some basic Functors concepts, it's time to build a new one by ourselves.

## Homemade Functor
We are going to implement a very simple one that we call Box:
```swift
struct Box<WrappedType> {
    let value: WrappedType
    init(_ value: WrappedType) {
        self.value = value
    }
}
```

This is a generic type that wraps a value in a context. But this is still not a Functor because it doesn't implement any `map` function. Lets do it.
```swift
extension Box {
    func map<T> (_ transformation: @escaping(WrappedValue) -> T) -> Box<T> {
        let transformedValue = tranformation(value)
        return Box<T>.init(transformedValue)
    }
}
```

Now it looks like a real Functor. Just try to do the same thing that we did with Optional<Int> and Array<Int>.
```swift
let box: Box<Int> = 5
box.map { value in value * 2 }
```

The result is a new Box<Int> that contains 10.
Compliments, you have created a new Functor...or is it?

## Functor Laws
There is one last step that we are missing to really say that we understood Functors. Functor is a concept from Abstract Algebraic. As promised, we won't dig in the mathematical aspects. The only thing that we really need to know is that a Functor obeys 2 simple laws.

### Identity Law
The Identity Law states that a type is a Functor if the result of mapping the identity function over a container will result in the same container object.
Sounds complicated but it's not. In our definition we talked about identity function. The identity function is just a function that takes a value and return it.

```swift
func identity<T> (_ value: T) -> T {
    return value
}
```

So our law says just that if we pass this function as transformation function of `map`, we should get back always exactly the same object.
Now we need the tools to compare two Functors. This means that we need to implement a `==` function. But our Functors cannot be Equatable, because they depends from a generic type (that is not necesserary Equatable). We solve this just implementing the `==` function only when the wrappend type is Equatable. Lets do this for Optional:
```swift
extension Optional where Wrapped: Equatable {
    static func == (_ lhs: Optional<Wrapped>, _ rhs: Optioanl<Wrapped>) -> Bool {
        switch (lhs, rhs){
        case (let left, nil):
            return false
        case (nil, let right):
            return false
        case (lert left, let right):
            return left == right
        case (nil, nil):
            return true
        }
    }
}
```

Now we are able to check the Identity Law for any Functor. Lets try with Optional.
```swift
let opt1: Int? = 5
let opt2: Int? = nil

opt1.map(identity) == opt1
opt2.map(identity) == opt2
```

## Composition Law
The Composition Law states that our Functor implementation should not break the composition of function.
Basically, with *composition* we mean that we can combine 2 functions to obtain a new function. So, if we identify *composition* with the `<>` operator, what we obtain is:
> (A) -> B <> (B) -> C = (A) -> C

We can now implement the `composition` function as follows:
```swift
func compose<A,B,C> (_ lhs: @escaping(A) -> B, _ rhs: @escaping(B) -> C) -> (A) -> C {
    return { a in
        rhs(lhs(a))
    }
}

precedencegroup CompositionGroup {
    associativity: left
}

infix operator <>: CompositionGroup

func <><A,B,C> (_ lhs: @escaping(A) -> B, _ rhs: @escaping(B) -> C) -> (A) -> C {
    return compose(lhs, rhs)
}
```

Now we are able to check the Composition Law for any Functor. Lets try with Array:
```swift
func triple(_ value: Int) -> Int {
    return value * 3
}

func quantity(_ value: Int) -> String {
    return "We have \(value) of something"
}
let arr1: [Int] = [1,2,3]
let arr2: [Int] = [4,5,6]

arr1.map(triple <*> quantity) == (arr1.map(triple).map(quantity))
arr2.map(triple <*> quantity) == (arr2.map(triple).map(quantity))
```

## Conclusion
And that's it, now we have a basic grasp of what Functors are, why we use them and how to implement them. Functors is one of the basic concepts of Functional Programming paradigm. If you want to go deeper, here there are some good references:
- [Swift Functors, Applicatives, and Monads in Pictures](http://www.mokacoding.com/blog/functor-applicative-monads-in-pictures/)
- [objc Functional Programming book](https://www.objc.io/books/functional-swift/)

