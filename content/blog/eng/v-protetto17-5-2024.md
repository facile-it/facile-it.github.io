---

authors: ["mgarza", "ana-radujko"]
comments: true
date: "2024-03-11 17:00:00"
draft: false
share: true
categories: ['Protected Fridays']
title: "Venerdì Protetto | May 2024 edition"
description: "What happened in the last issue of Venerdì Protetto?"
languageCode: "en-US"
type: "post"
twitterImage: '/images/social/social-preview-vp.png'
twitterLargeImage: '/images/social/social-preview-vp.png'
toc: false

---


Topics:


During the last Venerdì Protetto (held on May 17, 2024), we had both a talk and a workshop. There they are:

- [Hack the Box Workshop](#hack-the-box-workshop) by [Alessio Giorgianni](https://www.linkedin.com/in/alessio-giorgianni-b90500123/) (Facile.it)
- [How to develop cognitive flexibility?](#how-to-develop-cognitive-flexibility) by [Arduino Mancini](https://www.linkedin.com/in/arduinomancini/) ([TIBICON](https://www.tibicon.net/))


# Hack the box Workshop

### What is this workshop? 
After the successful experience of [having a code challenge in March 2024](https://engineering.facile.it/blog/eng/v-protetto8-3-2024/ "Previously, on Venerdì Protetto... a code challenge!"), we decided to go further in delivering experiences to our colleagues.

Scouting around, I asked help to Alessio Giorgianni, a developer with a passion of white hat hacking competition. We agree upon trying an experience using a platform, called [Hack the Box](https://academy.hackthebox.com/). Hack the Box Academy offers lots of formation about IT Security and, in our case, some exercises we can use for hacking dummy application. We agree upon using a non-trivial quests, called [Jerrytok](https://www.hackthebox.com/achievement/challenge/48545/638). Jerrytok is a simple web-application, written in PHP, undisclosing the harmness of using template engines in not-proper way. It's a good introduction to SSTI, [Server Side Template Injection](https://portswigger.net/web-security/server-side-template-injection).

![Please wear your favorite hacker hoodie before trying the workshop]( /static/images/vp-may-2024/hack-the-box-v0-a56fw7h8a2aa1.webp "Hack the Box Wallpaper")
*Please wear your favorite hacker hoodie before trying the workshop*


### Preparing the workshop


![Topics of the workshop](/static/images/vp-may-2024/topics.png "Topics of the workshop")
*Topics we focused on*

Let's not hide ourself behind a finger: Hacking an application is not a trivial task. It requires a fond knowledge of how application works, several tools are used to diagnose and to try to break the application. But preparing all this stuff requires quite a lot of time.

So we prepared a virtual machine with all the needed tools. We try to create a lightweight yet simple to prepare VM, so we started from a [Debian 11 VM](https://mac.getutm.app/gallery/debian-11-ldxe), in which we installed:  

- the challenge itself
- a decoder and repeater, we used [Burp Suite community edition](https://portswigger.net/burp/communitydownload)
- a simple proxy - we used [FoxyProxy](https://getfoxyproxy.org/)
- a reverse proxy - we used [ngrok](https://ngrok.com/) 

### On to the job!

![Vulnerability discovered! Can you guess how?]( /static/images/vp-may-2024/vulnerability.png "JerryTok vulnerability disclosed") 
*Vulnerability discovered! Can you guess how?*

Workshop itself was subdivided in:

- a theoretical introduction to SSTI
- hands on the machine

During the introduction, we discovered what is an SSTI, several tool to analyze if a page can be affected by this problem and how to mitigate it.
Hands on was guided by Alessio, and some volunteers shared their screen in order to have feedback directly from the learners. The machine used some basic security system, so hacking is not trivial.

Overall, it was a though yet interesting experience.

# How to develop cognitive flexibility?
![]()
In this webinar you will discover ...

* ... some of the most common mistakes you can make when evaluating situations
* ... that NOT to follow your intuition can be highly convenient
* ... techniques that will help you develop cognitive flexibility, improving the efficacy by which you deal with complex situations
* ... books and movies that may be useful in your training journey.


PS: Arduino Mancini, the business coach who will hold the webinar and well-known to many in Facile.it, recommended that during the webinar you have 6 toothpicks at hand 😲

![Flessibilità cognitiva](/static/images/vp-may-2024/webinar%20fleco.jpg "A comic strip about cognitive flexibility (Italian)")


The overview of Venerdì Protetto is available [here](https://engineering.facile.it/blog/eng/v-protetto/).
 
<script type="application/ld+json">
{ 
    "@context": "https://schema.org",
    "genre":["SEO","JSON-LD"],
    "@type": "BlogPosting",
    "headline": "Venerdì Protetto | May 2024 edition",
    "keywords": [""],
    "wordcount": "",
    "publisher": {
        "@type": "Organization",
        "name": "Facile.it Engineering",
        "url": "https://engineering.facile.it/",
        "logo": {
            "@type": "ImageObject",
            "url": "https://engineering.facile.it/images/logo_engineering.png",
            "width":"1057",
            "height":"244"
        }
    },
    "url": "",
    "image": "",
    "datePublished": "",
    "dateCreated": "",
    "dateModified": "",
    "inLanguage": "en-US",
    "isFamilyFriendly": "true",
    "description": "",
    "author": {
        "@type": "Person",
        "name": "Matteo",
        "url": "https://www.linkedin.com/in/matteogarza"
    }
}
</script>
