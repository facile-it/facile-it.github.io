---
authors: ["andreac"]
comments: true
date: "2020-04-09"
draft: false
share: true
categories: [English, Conference, Lambda-days, Krakow, Functional programming]
title: "Lambda-days-2020"
ita: "Lambda-days-2020"

languageCode: "en-US"
type: "post"
---

# Lambda Days 2021

This year, Facile attended for the first time to [Lambda Days](https://www.lambdadays.org/lambdadays2020) Conference in the beautiful polish city of Krakow.
It has been a two day full immersion, where the organizers have been able to gather speakers from all over the world
showcasing the latest trends and academic research in the functional world, spanning from beginner approaches to functional languages 
to super specific scientific applications.

This conference totally worth attending, albeit very intense (sometimens mind blowing, actually!), the talks were high quality, and perfect organization.

Here is a short list of talks that took our attention:

- **Keynote: How to specify it! A guide to writing properties of pure functions**

[Video](https://www.youtube.com/watch?v=G0NUOst-53U&list=PLvL2NEhYV4ZsV9Bw0wp1P46SOdtk4pFW6&index=3&t=0s)

**John Hughes** one of Haskell creators presented his QuickCheck library
In a funny manner, he showed how use his library to create automated test-cases and gave some tips on how to write tests that actually
verify your assumptions and not giving false green check.
He suggested first to write pure function as much as you can and creating properties by which test conditions can be automated.


- **The power of Π**

**Thorsten Altenkirch** from the University of Nottingham gave a talk about implementing dependent types
Think for a second if it was possible to base return types in functions by the value at runtime. Normally you would think is not possible
because we should be at runtime to know the actual input vale. The truth is that with some mathematical assumptions is possible to obtain
type like non empty arrays that otherwise a compiler would not know

[Video](https://www.youtube.com/watch?v=3zT5eVHpQwA&list=PLvL2NEhYV4ZsV9Bw0wp1P46SOdtk4pFW6&index=13&t=0s)

- **Designing composable functional libraries, not just for data visualization**

[Video](https://www.youtube.com/watch?v=G1Dp0NtQHeY&list=PLvL2NEhYV4ZsV9Bw0wp1P46SOdtk4pFW6&index=11&t=0s)

**Tomas Petricek** from the Alan Turing Institute showed his tools library for data journalism
He presented this library written in `f#`, and with a live demo built some graphs highlighting the endless possibilities given from the composability.


- **Enhancing the type system with Refined Types**

[Video](https://www.youtube.com/watch?v=Fx8WXcAZWuk&list=PLvL2NEhYV4ZsV9Bw0wp1P46SOdtk4pFW6&index=28&t=0s)

**Juliano Alves**, Senior Software Engineer @TransferWise talked about refined types in Scala
In this talks aimed to Scala beginners, he talked about how is achieve better return types.
Through [Refined](https://github.com/fthomas/refined) library, which is a porting from the homonymus Haskell one, he showed how is possible
constrain types using predicates and create types like below zero number and so on.


- **Effect Handlers: A New Approach to Computational Effects**

[Video](https://www.youtube.com/watch?v=6lv_E-CjGzg&list=PLvL2NEhYV4ZsV9Bw0wp1P46SOdtk4pFW6&index=37&t=0s)

**Maciej Piróg** is a researcher working on design and semantics of programming languge
His talk hinge on managing effects with `Effect handlers` instead of Monads, comparing the pros and cons of both approaches.
Then he showed with a live coding session, how `Helium` language can handle easily and in a functional manner effects without loosing typings.
This sounds interesting albeit `Helium` is far from being a solid production ready programming language.

- **One-shot algebraic effects as coroutines**

[Video](https://www.youtube.com/watch?v=JQwc1OBOt5k&list=PLvL2NEhYV4ZsV9Bw0wp1P46SOdtk4pFW6&index=22&t=0s)

**Satoru Kawahara** is a student at University of Tsukuba
Exceptions can't resume computations, while algebraic effects can. The latter, and their advantages, are not available on commercial programming languages, therefore 
some of the advantages they provide are not available in everyday programming.
Satoru and his collagues had an intuition about using one-time algebraic effects implemented as coroutines, thorugh resumable exceptions you can catch it then contnue
computation (only one time) as if it you were using a free monad (on which they were implemented).
This intuition is particulary powerful because is easy to implement (there are already many libraries based on this) in most programming languages.

### Conclusions

The Lambda Days is maybe one of the most important conference in the functional world and we were surprised by how well organized was; this is only a brief
list of what we found interesting and so we advise to go their website and see for yourself.
The commitee choose carefully all the speakers giving ideas for a wide audience, from the beginner to the most advanced researchers in the field.
We were also pleasantly suprised by the quality and quantity of tasties provided for the breaks: cakes, sandwiches, juices, coffees, and many more made available.
So if the pandemic will give some peace, surely we will be in Krakow next year!

![The Facile.it engineering team at Lambda Days 2020](/images/lambda-days-2020/the-team.jpg)
