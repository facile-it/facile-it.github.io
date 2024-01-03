---
authors: ["jean"]
comments: true
date: "2017-05-16"
draft: false
share: true
categories: [English, PHP, Conferences]
title: "Facile.it devs @ phpDay 2017"
twitterImage: "/images/phpday-2017/phpday-logo.png"

languageCode: "en-EN"
type: "post"
toc: false

---
Like clockwork, on May we head up to Verona to attend the **[phpDay conference](https://2017.phpday.it/)**; this time it was on **May 12th and 13th**. 

We met a lot of new people and known fellow PHP developers, and like [previous]({{< ref "php-day-2015.md" >}}) [years]({{< ref "php-day-2016.md" >}}), we wanted to write down a light summary; like the previous ones, this won't be a full "review" of the conference, but an highlight of the talks that captured most of our attention, or what we found more valuable for our everyday work.

We hope to give a brief glimpse of what we experienced to fellow developers that hadn't the opportunity to attend, and to tempt some of you to join conferences like this one or those in the PHP community at large, for your personal and professional growth. Like last year, we will later edit this article embedding the videos of the talks, when they will got released. 

<blockquote class="twitter-tweet" data-lang="it"><p lang="en" dir="ltr">Are you wondering how the first day of the <a href="https://x.com/hashtag/phpDay?src=hash">#phpDay</a> went? That was amazing! <a href="https://t.co/6630Zguq1Q">pic.x.com/6630Zguq1Q</a></p>&mdash; phpDay by GrUSP (@phpday) <a href="https://x.com/phpday/status/863314622656458753">13 maggio 2017</a></blockquote>
<script async src="//platform.x.com/widgets.js" charset="utf-8"></script>

The talks are in chronological order, and we linked the slides when available. Enjoy your reading!

# Technical Talks
## Climbing the Abstract Syntax Tree
 * James Titcumb ([@asgrim](https://x.com/asgrim))
 * Day 1 - 11:00 – 12:00 - track 2
 
This talk started a bit complicated, since it tackles a very complex matter: the Abstract Syntax Tree that has been added to PHP since version 7, and it the implications of its use; following up a bit, it included some very easy, low level example of how the language works with the AST, and the fact that the example were in PHP itself helped a lot in increasing the understanding of the matter. 

## Managing dependencies is more than running "composer update"
 * Nils Adermann ([@naderman](https://x.com/naderman))
 * Day 1 - 15:30 – 16:30 - track 2

Nils is one of the co-authors of Composer, but this talk was about "dependencies" in general, not just about the literal, software ones: every software project has a lot of dependecies apart from the libs that we install in the vendor folder, and he explained how we should approach them, and how we should mitigate the risks that they can add to our work.

## The Science of Code Reviews
 * Rick Kuipers ([@rskuipers](https://x.com/rskuipers))
 * Day 2 - 12:00 – 13:00 - track 2 ([slides](https://speakerdeck.com/rskuipers/the-science-of-code-reviews))

Code reviews and pair programming are two very valuable tools that we can leverage in our work as developers. This talk was really interesting, and it started from reasons behind why do them, up to suggestions and tips on how to improve them if you already do in your team.

## Extremely defensive PHP
 * Marco Pivetta ([@ocramius](https://x.com/ocramius))
 * Day 2 - 15:30 – 16:30 - track 1

Marco gave this talk already a lot of times on some conferences and some user groups, but it's great! He suggests how to write code in a "defensive" way, to avoid that others are able to do mistakes with it and create problems down the line.  

# Keynotes
## Code Manifesto
 * Graham Daniels ([@greydnls](https://x.com/greydnls))
 * Day 1 - 09:45 – 10:45

The first keynote wasn't strictly technical, but it was still more than interesting: Graham guided us through how much inequality and hidden problems minorities (and especially women) have to face everyday in our line of work; Graham is also the author behind the [Code Manifesto](https://github.com/greydnls/code-manifesto), a basic list of principles to be followed on OSS and workplaces to actively fight this issues and encourage diversity.

## NoEstimates: The 10 new principles for Software Projects - predicting without estimating
 * Vasco Duarte ([@duarte_vasco](https://x.com/duarte_vasco))
 * Day 2 - 09:45 – 10:45

Vasco is the famous author of the #NoEstimate strategy, and his keynote was aimed at explaining the wrong things the foundation of the issues of our industry, where estimates are always wrong and are often used to "bet" the future of our companies.

## Using Open Source for Fun and Profit
 * Gary Hockin ([@geeh](https://x.com/geeh))
 * Day 2 - 17:30 – 18:30

In his keynote, Gary told us his story of how, from a simple developer, he became a Zend contributor first, and the JetBrains Developer Advocate now; the basic lessons that we can take from his experience is that open source contributions (no matter how small) are good for your career, and that when you give to the community, the community will give back to you very soon.  

![The Facile.it engineering team at PHPDay 2017](/images/phpday-2017/facile-engineering-team-phpday-2017.jpeg)
