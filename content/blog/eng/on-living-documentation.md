---
authors: ["veronica-bolognesi"]
comments: true
date: "2022-02-07"
draft: false
share: true
categories: [English, Agile, TDD, BDD, Documentation]
title: "On Living Documentation"

languageCode: "en-EN"
type: "post"
---
Today I want to talk about living documentation, having just finished the aptly-named book by Cyrille Martraire, **[Living Documentation: continuous knowledge sharing by design](https://www.pearson.com/store/p/living-documentation-continuous-knowledge-sharing-by-design/P100000797747/9780134689326)**, published by Pearson.

# The need for documentation
Documentation supplements the knowledge we might not have.
Lack of knowledge manifests in
- wasted time (finding the missing points or guessing them)
- biased decisions due to this lack

- Hint: when you don’t know something, you usually don’t know of not knowing ;)

So the time spent on harvesting knowledge should be considered helping build the stakeholders’ application mental model. And this is important because is that model that developers will use to augment the code, product owners will use to describe the stories to implements, and business owners will use to describe their objectives and key results….

Let’s hope that every stakeholder has a shareable and overlapping mental model!

#A little confession and the need for something better

I confess: I like to write documentation.

I admit: I am (sometimes) dedicated to the antipattern: human dedication (see page 32).

Sometimes I need to sketch up things while following the execution of the code, and it’s a pity to throw away those findings.

Other times I need to clear up my mind over some convoluted code.

In any case, I resort to the tool that the company I work for offers: Confluence pages.

Once I’ve done writing the article, that article begins to age, eventually reaching, as the author says, the information graveyard.

If I’m lucky enough, I can intercept changes to the code and amend the docs accordingly.

But not everyone is so fond of writing documentation.

And that’s where this book comes in handy: ideas on automating the generation of documentation.

#What this book is about and what it is not

This book is not about the end-user documentation, nor does aim to bookish-style, well-refined output.

This book is about sharing of knowledge and making it available in the right place, right on time.

By doing this, it hopes to shed a light on the overall design of the application being documented, eventually triggering an opportunity for refactoring.

Overall, it wishes the code to be so clear and self-documented that the additional documentation became useless and redundant.

And that’s why this is not a book about end-user documentation: not every audience is able/willing to read the code, nor that every audience should do it.

#Written documentation is not always the correct answer

The book follows the track of the agile / TDD / DDD / BTD development and builds on their pillars.

> With TDD, the tests are first considered as specifications. With DDD, we identify the code and the model of the business domain […]. … we expect the code to tell the whole story about the domain.
> 
> <cite>Source: the book, page 12</cite>

Since the purpose of the documentation is a transfer of knowledge, in many cases the preferable and more convenient way to achieve this is by having conversations, which is another way of saying

> The most efficient and effective method of conveying information to and within a development team is face-to-face conversation.
>
> <cite>>Source: the Agile Manifesto, https://agilemanifesto.org/iso/en/principles.html**

Fact is that even when we favour “conversation over documentation”, sometimes we need to summarize that we have discovered. That summary will be less wordy and up-to-the-point since all the assumptions and agreements have already been discussed.

(For instance, we might have decided to adopt the hexagonal architecture. Via some conversations, we might have discussed it amongst several alternatives. In the documentation, we can explain why we chose that architecture and the rationale for having discarded the other choices, without discussing what hexagonal architecture is. This is in fact a well-established knowledge that is not worth documenting again: to establish a common ground for those readers who haven’t got the chance to participate in the conversation we can effortlessly link to an external resource).

- Hint: as the author says (p. 13): we have conversations even with machines, and we call that experiments.

#What to document (in a written form)

- When in doubt about its usefulness, don’t document.
- If some information will be relevant for a very long period of time, document it.
- If some information should be spread to a large audience, document it.
- If some information is considered valuable or critical, document it.
- Anything that makes an application hard or expensive to change should be documented

> Avoid speculating on what should be documented. Instead, pay attention to all questions asked or questions that were not asked but that should have been asked, as signals that some knowledge needs to be documented.
>
> <cite>Source: the book, page 202</cite>

#Knowledge is around us (and in us)

One aspect the book states clearly and several times is that often the documentation is already there, you need only to recognize it as a source to draw information from.

Consider for instance the followings:

- Tests written for behavior-driven-development
- Configuration files
- Some README.md that you might have written times ago
- Annotations you already use for documenting routes, or for your ORM (like Doctrine) …
- …

The point is that every kind of information that “decorates” the code, gives it some context, and functions as a way to transfer knowledge (even from yourself of today to yourself of the future) is documentation.

Moreover, since most of this stuff needs always to be up-to-date because it is needed by the application to run (or to deploy), you can be assured that it will be always accurate and can become the single source of truth.

If anything, the problem of this kind of knowledge is its fragmentation and / or obfuscation. Not to mention the worst case scenario, that that knowledge is only in the developer’s mind and in the code we can read only its consequences.

> Documentation accelerates delivery because it shortens the time to rebuild your mental model of the system to work on.
> 
> <cite>Source: book, page 341</cite>

#Internal vs external documentation

The author distinguishes between internal documentation (placed in the code, for example via annotations or codes or near it, i.e. with README.md files) and external documentation. This kind of documentation can be leveraged even with the most sophisticated IDEs.

External documentation is something built from internal documentation but:

- embellished (maybe following the company’s guidelines, with the company logo, and so on)
- filtered: not every documentation should pass the code level because sometimes information is relevant only at a micro-level but becomes useless or distracting at upper levels. Moreover, what will be considered important for a particular audience would be noise for another.
- sometimes transformed to speak the language of the targeted audience (thas made more readable)
- published somewhere (thus made more searchable)

#So, what’s living documentation?

Living documentation is documentation that it is not a burden to maintain and that is always kept in sync with its sources of truth, eventually failing the CI/CD if they fail to synchronize.

Once the documentation is extracted, it can also be published in a format of your choice (say via Confluence API).

Of course, no one will ever automate the first step: writing and/or assembling the _automatable_ documentation.

> Developers don’t own the documentation, they just own the technical responsibility to deal with it.
> 
> <cite>(Source: the book, p. 22</cite>

> Living documentation is all about making each decision explicit, with not only the consequences in code but also the rationale, the context, and the associated business stakes expressed (or perhaps modeled) using all the expressiveness of the code as a documentation medium.
> 
> <cite>Source: the book, p. 50</cite>

> Anything that can answer a question can be considered documentation. If you can answer questions by using an application, then the application is part of the documentation.
> 
> <cite>Source: the book, p. 199</cite>

Moreover, sometimes the application is the only source of truth: think of legacy systems where no ona have prior knowledge of them. But

> don’t fall for the fallacy that the legacy system is in itself a sufficient description of the new system to be rebuilt. Take the opportunity of the rewriting to challenge every aspect from the legacy system.
>
> <cite>Source: the book, p. 403</cite>


#Not everything should be made alive

If the burden of implementing the automation is not worth the time it takes, because the knowledge won’t change much, maybe the traditional way is preferable. In other words: 
**[keep it simple, stupid](https://en.wikipedia.org/wiki/KISS_principle)**

The author defines such kind of documentation “evergreen documentation” (see p. 246).

#Some guidelines and suggestions

- Only one single source of truth is allowed: if you need to make it accessible somewhere else, use references (i.e. links or annotations that, in the publication phase, will copy from the source on the destination).
- Of course, with every publication, we provide an up-to-date snapshot of what was current at the time of the information harvesting. That’s why we should clearly version the documentation every time we publish it.
- Every published document should be considered read-only: if you need to amend it, publish another version.
- Use annotations to augment your code: the code tells the how, the annotations could tell the why, aka the rationale (see p. 122)
- Annotations can be used to mark security issues (@securityIssue(name=’blaBla’, jira=’<link to jira>’), or to declare that a class should have not setters
- Stick to one of these styles: declare @ Immutable, @NotNullable vs @ Mutable and @ Nullable. Don’t mix styles to avoid inconsistencies. [I put a space between @ and the annotation not to tag anyone ]
- Annotate elements with only intrinsic information (to explain this, the author uses the car example: its color and engine are intrinsic properties, while its location and owner are extrinsic, see p. 118). When used this way, if an element disappears from the code, all the relevant documentation goes with it, without side-effects in other parts of the documentation.
- If you link something directly in your documentation, you should prove their existence in life every time you publish your documentation. Another approach is to link to a google search that likely will show your desired first choice at the top of the list
- Consider a link registry
- You can use annotation also to highlight some best practices you find on the code
- 1You could create a glossary out of your entities or entity properties, maybe (but don’t create a Glossary annotation, use instead CoreConcept, see p. 164)
- You could create guided tours of particular sections of your code
- You could integrated also some diagrams (see **[Graphviz](https://graphviz.org/)** and “Living diagrams” and following, page 170).
- Don’t use primitive types, create your own: types don’t lie, and if you don’t use them properly, the pipeline will be red!
- Use tools to enforce the decisions made into guidelines (p. 301): they provide knowledge just in time where is needed (when someone violets them).

#Conclusion

That's (a lot) more than living documentation inside this book.

It goes on talking about code quality and code design techniques: for example, even when naming a method we could introduce a burden on the shoulders of the next developer or alleviate her voyage.

It touches code organization (aka, in which folder should I put this kind of files?), refactoring, architecture, agile, test-driven development…

I think it touches a lot of the aspects that make software development a craftmanship.

And I think several kinds of audiences would benefit from reading this book.

Besides developers, I think product owners would benefit because, apart from answering the questions "why we should document?' and "what?", it gives hints on how to write stories on Jira (which are indeed, some kind of documentation too).

I think some aspects touched in the book (decision logs, for instance) could be applied to any level of a company, of course with different kinds of granularity.

In summary, I really loved this book and would recommend it to anyone even slightly interested in documentation.

If you're like me, you'll end up full of ideas…. and the book gives also advice on how to sell the living documentation approach to your colleagues and boss :)