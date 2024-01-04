---
authors: ["jean", "sergio"]
comments: true
date: "2016-05-31"
draft: false
share: true
categories: [English, PHP, Conferences]
title: "Facile.it devs @ PhpDay 2016"

languageCode: "en-EN"
type: "post"
toc: true

---
Almost like a nice tradition, we went to the **[PHP Day conference](http://2016.phpday.it/)** this year as well; this time too it was held in Verona, on **May 13th and 14th**. 

We participated and attended numerous talks and, [as last year]({{< ref "php-day-2015.md" >}}), we wanted to write a light summary; this won't be a full "review", but our intent instead is to highlight what captured our interest most, or what we found more valuable for our everyday work.

In this way, we hope to give a brief glimpse of what we experienced to fellow developers that hadn't the opportunity to attend, and to tempt some of you to join conferences like this one or those in the PHP community at large, for your personal and professional growth.

The talks are in chronological order, and we linked the slides when available. Enjoy your reading!

# Technical Talks
## Your API is a UI
 * Christopher Hoult ([@choult](http://x.com/choult))
 * Day 1 - 11:00 – 12:00 - track 1
 
This was an interesting and very smooth talk. It stayed pretty general with nice advices about **API development**, but showed some reasoning about a pyramidal "scheme of priorities" that we should follow, deriving from the [Maslow's hierarchy of needs](https://en.wikipedia.org/wiki/Maslow%27s_hierarchy_of_needs).

## Dip Your Toes in the Sea of Security
 * James Titcumb ([@asgrim](http://x.com/asgrim))
 * Day 1 - 14:30 – 15:30 - track 1 ([slides](http://www.slideshare.net/asgrim1/dip-your-toes-in-the-sea-of-security-phpday-2016))
 
In this talk we saw an interesting overview of **security issues** that a web application can encounter. It ranged from basic SQL injection, to timing attacks (that were explained pretty well!), to CSRF protection. 

## How I learned to stop worrying and love Regular Expressions 
 * Jordi Boggiano ([@seldaek](http://x.com/seldaek))
 * Day 1 - 15:30 – 16:30 - track 1 ([slides](http://slides.seld.be/?file=2016-05-13+How+I+learned+to+stop+worrying+and+love+Regular+Expressions.html))
 
In this talk we went from basic **regular expressions**, to basic pattern recognition, to advanced usage; the speaker took also the time to explain to us how the regex engine works, through thorough examples of pattern matching advancement and backtracking. Also, bonus points for the slides! They were pretty neat, and everything was themed to the _Dr. Strangelove_ movie, from images to phrases used in the examples.

## Dockerizing your PHP CI Pipelines
 * Paul Dragoonis ([@dr4goonis](http://x.com/dr4goonis))
 * Day 1 - 17:00 – 17:30 - track 2 ([slides](http://dragoonis.com/talks/phpday-may-2016/#/))

This talk was about **using Jenkins with Docker** and having optimized pipelines for fast builds and short commit-to-deploy times. It should have been a 1-hour-long talk, so the speaker had to cut short on a lot of things, but I took a lot of useful advice from it nonetheless. Fortunately, he was kind enough to give the extra bits of his talk in the unconference track the day after.  

## Drinking Beer with a Raspberry Pi and PHP
 * Andrew Carter ([@AndrewCarterUK](http://x.com/AndrewCarterUK))
 * Day 2 - 15:30 – 16:30 - track 1

This talk was uncommon but really funny. The speaker explained that programming the Raspberry Pi is possible even with PHP! He showed us a working example of an AaaS (Alcohol as a Service) machine. It was a simple tool with a liquid pump and a flow detector that is used to fill up glasses with any kind of drink. It can be activated via API as any regular service. The speaker also explained how it is possible to communicate with external devices via the powerful IO pins using Unix device files.

## Evolution of Web Application Architecture
 * Kore Nordmann ([@koredn](http://x.com/koredn))
 * Day 2 - 15:30 – 16:30 - track 2 ([slides](https://qafoo.com/resources/presentations/phpday_2016_2016/evolution_of_web_application_architecture.html))
 
The talk covered the **evolution of the technological stack** behind a normal web application, from single-server to multi-server architecture. Each addition to the stack was discussed and weighted, without taking for granted any single step: from adding a master-slave database configuration, to caching session and\or query results. This gave us a pretty clear idea of **when and why** such steps should be taken while adding new functionalities to a project, or overcoming technical challenges.

## Being functional in PHP
 * David de Boer ([@ddeboer_nl](http://x.com/ddeboer_nl))
 * Day 2 - 16:30 – 17:00 - track 1 ([slides](http://www.slideshare.net/boerdedavid/being-functional-in-php-php-day-italy-2016))

This talk was an **introduction to functional programming**. The speaker compared highly declarative languages such as Erlang with PHP. He demonstrated the options we have to adopt functional programming in PHP. Basic concepts were covered in a clear and simple way: mapping, reduction, function composition and higher-order functions. Particular focus was given to the use of pure functions and their main advantage: the absence of side effects. Finally, the speaker went through an interesting comparison between OOP and functional programming, showing their strengths and weaknesses.

# Keynotes
## Deploying PHP 7
 * Rasmus Lerdorf ([@rasmus](http://x.com/rasmus))
 * Day 1 - 09:45 – 10:45 ([slides](http://talks.php.net/phpday16#/))

Rasmus is a veteran at PHPDay, and he gives opening keynotes here almost every two years. This year's was obviously about PHP 7, and it was more a technical talk than else. It went from **benchmark data** to technical tips on how to smooth the transition to this new major version of PHP.

## How Badoo Saved $1M Switching to PHP7
 * Nikolay Krapivnyy
 * Day 2 - 09:45 – 10:45 ([slides](https://dl.dropboxusercontent.com/u/216377/verona_php_2.pdf))

The [blog post](https://techblog.badoo.com/blog/2016/03/14/how-badoo-saved-one-million-dollars-switching-to-php7/) about this technological switch made the rounds on a lot on PHP-related websites some months ago; this talk was very technical too, and it showed us how big is Badoo's technological stack, with 3000 servers, 1000 of which running PHP. It gave us a nice overview of the **technical challenges** that their tech team endured to do this upgrade, and how it gave them the possibility to save more than a half of their hardware resources; also...

<blockquote class="twitter-tweet" data-lang="it"><p lang="en" dir="ltr">Badoo put PHP 7 in production on Friday... <br>/cc <a href="https://x.com/agilegigi">@agilegigi</a> <a href="https://x.com/hashtag/poiluned%C3%ACcepensiamo?src=hash">#poilunedìcepensiamo</a> <a href="https://x.com/hashtag/phpday?src=hash">#phpday</a> <a href="https://t.co/OEj3Emxxee">pic.x.com/OEj3Emxxee</a></p>&mdash; Alessandro Lai (@AlessandroLai) <a href="https://x.com/AlessandroLai/status/731403882321063936">14 maggio 2016</a></blockquote>
<script async src="//platform.x.com/widgets.js" charset="utf-8"></script>
