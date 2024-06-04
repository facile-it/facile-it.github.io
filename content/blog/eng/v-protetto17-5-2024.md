---

authors: ["mgarza"]
comments: true
date: "2024-05-30 17:00:00"
draft: false
share: true
categories: ['Protected Fridays']
title: "Venerdì Protetto | May 2024 edition"
description: "What happened in the last issue of Venerdì Protetto?"
languageCode: "en-US"
type: "post"
#twitterImage: '/images/social/social-preview-vp.png'
twitterImage: '/images/social/suggested/9_stock.jpg'
twitterLargeImage: '/images/social/suggested/9_stock.jpg'
toc: false

---


The April edition of Venerdì Protetto focused on company-related topics. Therefore, we didn't publish a blog post. 

Topics:

This page contains the abstracts of the talks held during the latest Venerdì Protetto on May 17, 2024.

Here they are:

- [Hack the Box Workshop](#hack-the-box-workshop) by [Alessio Giorgianni](https://www.linkedin.com/in/alessio-giorgianni-b90500123/) (Facile.it)
- [How to develop cognitive flexibility?](#how-to-develop-cognitive-flexibility) by [Arduino Mancini](https://www.linkedin.com/in/arduinomancini/) ([TIBICON](https://www.tibicon.net/))


## Hack the box Workshop

### What is this workshop? 
After the successful experience of [having a code challenge in March 2024](https://engineering.facile.it/blog/eng/v-protetto8-3-2024/ "Previously, on Venerdì Protetto... a code challenge!"), we decided to go further in delivering experiences to our colleagues.

Scouting around, I turned to Alessio Giorgianni, a developer with a passion for white hat hacking competition. We agree to try an experience using a platform called [Hack the Box](https://academy.hackthebox.com/). Hack the Box Academy offers lots of information and training about IT Security and, in our case, some exercises we can use for hacking dummy applications, with a whitebox example (i.e., an example where all the code is undisclosed to us. [There are also different kind of pentest](https://www.eccouncil.org/cybersecurity-exchange/penetration-testing/black-box-gray-box-and-white-box-penetration-testing-importance-and-uses/#:~:text=Objectives%3A%20Black%2Dbox%20testers%20seek,somewhere%20between%20these%20two%20extremes)). We agreed upon using a non-trivial quest, called [Jerrytok](https://www.hackthebox.com/achievement/challenge/48545/638). Jerrytok is a WAPT (Web App Penetration Testing) whitebox challenge. We got a simple web-application, written in PHP, which disclose the harm of using template engines in a not-proper way. It's a good introduction to SSTI, [Server Side Template Injection](https://portswigger.net/web-security/server-side-template-injection).

![Please wear your favorite hacker hoodie before trying the workshop]( /static/images/vp-may-2024/hack-the-box-v0-a56fw7h8a2aa1.webp "Hack the Box Wallpaper")
*Please wear your favorite hacker hoodie before trying the workshop*


### Preparing the workshop


![Topics of the workshop](/static/images/vp-may-2024/topics.png "Topics of the workshop")
*Topics we focused on*

Let's not fool ourselves: hacking an application is not a trivial task. It requires a fond knowledge of how the application works, while we must use several tools to diagnose and to break the application. Preparing all this stuff requires quite a lot of time.

So, we prepared a virtual machine with all the needed tools. We tried to create a lightweight yet simple to prepare VM, so we started from a [Debian 11 VM](https://mac.getutm.app/gallery/debian-11-ldxe), in which we installed:  

- a decoder and repeater, we used [Burp Suite community edition](https://portswigger.net/burp/communitydownload)
- a simple proxy, we used [FoxyProxy](https://getfoxyproxy.org/)
- a reverse proxy, we used [ngrok](https://ngrok.com/) 

### On to the job!

![Vulnerability discovered! Can you guess how?]( /static/images/vp-may-2024/vulnerability.png "JerryTok vulnerability disclosed") 
*Vulnerability discovered! Can you guess how?*

The workshop itself was divided into:

- a theoretical introduction to SSTI
- hands on the machine

During the introduction, we discovered what an SSTI is, which tools we need to control if a page can be affected by this problem and how to mitigate it.
Alessio guided the hands-on exercise while some volunteers shared their screens to have feedback directly from the learners. The machine used a basic security system, so hacking is not trivial (even if it's white-box).

Overall, it was a though yet interesting experience.

## How to develop cognitive flexibility?
In this webinar, we discovered ...

* ... some of the most common mistakes you can make when evaluating situations
* ... that NOT to follow your intuition can be highly convenient
* ... techniques that will help you develop cognitive flexibility, improving the efficacy by which you deal with complex situations
* ... books and movies that may be useful in your training journey.

Arduino Mancini, the business coach who held the webinar, well known to many at Facile, recommended having 6 toothpicks at hand during the webinar.😲

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
