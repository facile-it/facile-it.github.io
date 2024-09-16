---

authors: ["agiorgianni", "mgarza"]
comments: true
date: "2024-05-30 17:00:00"
draft: false
share: true
categories: ["Protected Fridays", "challenge", "security", "hacking"]
title: "Hack the Box Experience"
description: "How to prepare a white-box hacking workshop and live happily ever after"
languageCode: "en-US"
type: "post"
twitterImage: '/images/vp-may-2024/htb-experience.jpg'
twitterLargeImage: '/images/vp-may-2024/htb-experience.jpg'
toc: false

---

After the successful experience of [having a code challenge in March 2024](https://engineering.facile.it/blog/eng/v-protetto8-3-2024/ "Previously, on Venerdì Protetto... a code challenge!"), we decided to go further in delivering experiences to our colleagues.

Scouting around, I turned to Alessio Giorgianni, a developer with a passion for white hat hacking competition. We agree to try an experience using a platform called [Hack the Box](https://academy.hackthebox.com/). Hack the Box Academy offers lots of information and training about IT Security and, in our case, some exercises we can use for hacking dummy applications, with a whitebox example (i.e., an example where all the code is undisclosed to us. [There are also different kind of pentest](https://www.eccouncil.org/cybersecurity-exchange/penetration-testing/black-box-gray-box-and-white-box-penetration-testing-importance-and-uses/#:~:text=Objectives%3A%20Black%2Dbox%20testers%20seek,somewhere%20between%20these%20two%20extremes)). We agreed upon using a non-trivial quest, called [Jerrytok](https://www.hackthebox.com/achievement/challenge/48545/638). Jerrytok is a WAPT (Web App Penetration Testing) whitebox challenge. We got a simple web-application, written in PHP, which disclose the harm of using template engines in a not-proper way. It's a good introduction to SSTI, [Server Side Template Injection](https://portswigger.net/web-security/server-side-template-injection).

<!--more-->

![Please wear your favorite hacker hoodie before trying the workshop]( /images/vp-may-2024/hack-the-box-v0-a56fw7h8a2aa1.webp "Hack the Box Wallpaper")
*Please wear your favorite hacker hoodie before trying the workshop*

### Preparing the workshop


![Topics of the workshop](/images/vp-may-2024/topics.png "Topics of the workshop")
*Topics we focused on*

Let's not fool ourselves: hacking an application is not a trivial task. It requires a fond knowledge of how the application works, while we must use several tools to diagnose and to break the application. Preparing all this stuff requires quite a lot of time.

So, we prepared a virtual machine with all the needed tools. We tried to create a lightweight yet simple to prepare VM, so we started from a [Debian 11 VM](https://mac.getutm.app/gallery/debian-11-ldxe), in which we installed:  

- a decoder and repeater, we used [Burp Suite community edition](https://portswigger.net/burp/communitydownload)
- a simple proxy, we used [FoxyProxy](https://getfoxyproxy.org/)
- a reverse proxy, we used [ngrok](https://ngrok.com/) 

### On to the job!

![Vulnerability discovered! Can you guess how?]( /images/vp-may-2024/vulnerability.png "JerryTok vulnerability disclosed") 
*Vulnerability discovered! Can you guess how?*

The workshop itself was divided into:

- a theoretical introduction to SSTI
- hands on the machine

During the introduction, we discovered what an SSTI is, which tools we need to control if a page can be affected by this problem and how to mitigate it.
Alessio guided the hands-on exercise while some volunteers shared their screens to have feedback directly from the learners. The machine used a basic security system, so hacking is not trivial (even if it's white-box).

### Jerrytok, out!

Overall, it was a though yet interesting experience. It costs a little bit of effort preparing all the VM and the challenge, but attendees seemed to like it and we had a lot of discussion and curiosity about how the Alessio's hack works.

The overview of Venerdì Protetto is available [here](https://engineering.facile.it/blog/eng/v-protetto/).

<script type="application/ld+json">
{ 
    "@context": "https://schema.org",
    "genre":["SEO","JSON-LD"],
    "@type": "BlogPosting",
    "headline": "Hack the Box Experience",
    "keywords": ["hacking", "workshop", "ssti" "template"],
    "wordcount": "449",
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
    "url": "https://engineering.facile.it/blog/eng/hack-the-box-experience/",
    "image": "",
    "datePublished": "2024-06-05",
    "dateCreated": "2024-06-04",
    "dateModified": "2024-06-04",
    "inLanguage": "en-US",
    "isFamilyFriendly": "true",
    "description": "Let's not fool ourselves: hacking an application is not a trivial task. It requires a fond knowledge of how the application works, while we must use several tools to diagnose and to break the application. Scouting around, I turned to Alessio Giorgianni, a developer with a passion for white hat hacking competition. We agree to try an experience using a platform called Hack the Box Academy. Here's how we prepared the workshop",
    "author": [{
        "@type": "Person",
        "name": "Alessio Giorgianni",
        "url": "https://www.linkedin.com/in/alessio-giorgianni-b90500123/"
    },{
        "@type": "Person",
        "name": "Matteo",
        "url": "https://www.linkedin.com/in/matteogarza"
    }]
}
</script>
