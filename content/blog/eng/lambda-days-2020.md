---
authors: ["andrea-ceccarelli"]
comments: true
date: "2020-09-01"
draft: false
share: true
categories: [English, Conference, Lambda-days, Krakow, Functional programming]
title: "Lambda Days 2020"

languageCode: "en-US"
type: "post"
---

This year, Facile attended for the first time [Lambda Days](https://www.lambdadays.org/lambdadays2020) Conference in the beautiful polish city of Krakow.
It has been a two-days full immersion with speakers coming from all over the world.
The latest trends and academic research in the functional world were showcased, spanning from beginner's approaches to functional languages to highly specific scientific applications.
This conference was totally worth attending, albeit very intense (sometimes mind-bending, actually!). All the talks were of high quality and the organization was perfect.

Here is a short list of the talks that caught our attention:

- **Keynote: How to specify it! A guide to writing properties of pure functions**

[Video](https://www.youtube.com/watch?v=G0NUOst-53U&list=PLvL2NEhYV4ZsV9Bw0wp1P46SOdtk4pFW6&index=3&t=0s)

**John Hughes** one of Haskell creators presented his QuickCheck library and some best practices to use it.
John is a great entertainer, and in a funny way showed what is the so called *property based testing*.
Briefly, we could say that the code we are testing contains properties that must be proven. To do this, the best practice 
is to let the testing library generate hundreds of test cases.
During the talk, he stressed the idea that tests themselves need correctness to avoid errors like duplicating the logic 
we are testing against and listed some ways to model test that give correctness and completeness.
One key point worth mentioning is *optimize for correctness and not for performance*. 


- **The power of Π**
 
 
<iframe title="YouTube video player"
    width="640"
    height="480"
    src="https://www.youtube.com/watch?v=3zT5eVHpQwA&list=PLvL2NEhYV4ZsV9Bw0wp1P46SOdtk4pFW6&index=13&t=0s"
    frameborder="0"
    allow="encrypted-media"
    allowfullscreen
>
</iframe>


**Thorsten Altenkirch** from the University of Nottingham gave a talk about implementing dependent types.
Think for a second if it was possible to base return types in functions by the value at runtime. Normally you would think is not possible because we should run the code to know the actual input value.
The truth is that with some mathematical assumptions, it is possible to obtain types such as non-empty arrays that otherwise a compiler would not know.

- **Designing composable functional libraries, not just for data visualization**

[Video](https://www.youtube.com/watch?v=G1Dp0NtQHeY&list=PLvL2NEhYV4ZsV9Bw0wp1P46SOdtk4pFW6&index=11&t=0s)

**Tomas Petricek** from the Alan Turing Institute showed his tools library for data journalism.
He presented this library written in `f#` and during a live demo he built some graphs, thus highlighting the infinite possibilities given by composability.

- **Enhancing the type system with Refined Types**

[Video](https://www.youtube.com/watch?v=Fx8WXcAZWuk&list=PLvL2NEhYV4ZsV9Bw0wp1P46SOdtk4pFW6&index=28&t=0s)

**Juliano Alves**, Senior Software Engineer @TransferWise talked about refined types in Scala.
In this talks aimed to Scala beginners, he talked about how is achieve better return types.
Through [Refined](https://github.com/fthomas/refined) library, which is a porting from the homonymus Haskell one, he showed how is possible
constrain types using predicates and create types like below zero number and so on.


- **Effect Handlers: A New Approach to Computational Effects**

[Video](https://www.youtube.com/watch?v=6lv_E-CjGzg&list=PLvL2NEhYV4ZsV9Bw0wp1P46SOdtk4pFW6&index=37&t=0s)

**Maciej Piróg** is a researcher working on design and semantics of programming language.
His talk focused on managing effects with `Effect handlers` instead of Monads. He compared the pros and cons of both approaches. Then, 
he showed with a live coding session, how `Helium` language can easily and functionally handle effects without losing typings.
This sounds interesting albeit Helium is far from being a solid production-ready programming language.


- **One-shot algebraic effects as coroutines**

[Video](https://www.youtube.com/watch?v=JQwc1OBOt5k&list=PLvL2NEhYV4ZsV9Bw0wp1P46SOdtk4pFW6&index=22&t=0s)

**Satoru Kawahara** is a student at University of Tsukuba.
Exceptions can't resume computations, while algebraic effects can. The latter, and their advantages, are not available on commercial programming languages, therefore 
some of the advantages they provide are not available in everyday programming.
Satoru and his colleagues had an intuition about using one-time algebraic effects implemented as coroutines: you can catch it through resumable exceptions, 
then continue the computation (only once) as if you were using a free monad (on which they were implemented).
This intuition is particulary powerful because it is easy to implement (there are already many libraries based on it) in most programming languages.

### Conclusions

Lambda Days is probably one of the most important conferences in the functional world and we were impressed by the excellent organization. In this article, we only 
provided a brief list of what we found particularly interesting. Therefore, we suggest you to visit the conference website and see for yourself.
The commitee choose carefully all the speakers, thus providing ideas to a wide audience, from beginners to the most advanced researchers in the field.
We were also pleasantly suprised by the quality and quantity of delicacies provided for the breaks: cakes, sandwiches, juices, coffees, and many more.
So if the pandemic will give us some peace, we will be in Krakow next year!

![The Facile.it engineering team at Lambda Days 2020](/images/lambda-days-2020/the-team.jpg)
