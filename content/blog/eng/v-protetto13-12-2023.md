---

authors: ["engineering"]
comments: true
date: "2023-12-30 17:00:00"
draft: true
share: true
categories: ['Protected Fridays']
title: "Venerdì Protetto | Christmas edition"
description: "What happened in the last Facile.it Venerdì Protetto?"
languageCode: "en-US"
type: "post"
twitterImage: '/images/venerdì_protetto/christmas_kata.png'
twitterLargeImage: '/images/venerdì_protetto/christmas_kata.png'
toc: false

---

<a href= "/images/venerd%C3%AC_protetto/vp_christmas.png?raw=true" target="_blank"> 
<img align="left" style="width:45%; margin-right: 0.5em" src=/images/venerd%C3%AC_protetto/vp_christmas.png?raw=true" alt="Architectural Kata" title="Architectural Kata" /> 
</a>


During the latest Venerdì Protetto on December 13th, Facile.it hosted a software architecture exercise called Architecture Kata with some of our lead developers. 

Architectural Katas are small-group exercises. A moderator assigns each group a different project that needs development, keeps track of time and acts as the facilitator. To learn about Architectural Katas, see https://nealford.com/katas/.

During the exercise, each team had a meeting to discover additional requirements, discuss possible technology options, and sketch out a rough vision of the solution. Then, each team presented the final solution to the other teams using UML, C4 model, or other diagrams and answered challenging questions about the presented project. Once all projects were presented, each team voted for their favorite project. Following the voting, two winners were selected:

- Team Isola bella vista with the [Architectural Kata "Room With A View"](#architectural-kata-room-with-a-view)

- Team Simfonia di Facilitatori with the [Architectural Kata "Concert Comparison"](#architectural-kata-concert-comparison)

Let’s take a look at the exercises and presented solutions.

<br />

## Architectural Kata "Room With A View"

Team: Isola bella vista

Moderator: Filippo Andrighetti

Participants: Francesco Benedetto, Francesco Trevis, Alessandro Lai, Marco Saletta, Giulia Chiola, Santolo Tubelli

#### Exercise

**Context**

A large hotel reservation company wants to build the next-generation hotel reservation and management system specifically tailored to high-end resorts and SPAs where guests can view and reserve specific rooms.

**Users**

- guests (hundreds)

- hotel staff (less than 20)

**Requirements**

Registration can be made via web, mobile, phone call, or walk-in. Guests can either book a type of room (standard, deluxe, or suite) or choose a specific room to stay in by viewing pictures of each room and its location in the hotel. The system must be able to maintain room status (booked, available, ready to clean, etc.) as well as when the room will be needed next. It must also have state-of-the-art housekeeping management functionality so that cleaning and maintenance staff can be directed to various rooms based on priority and reservation needs using proprietary devices supplied by the reservation company attached to the cleaning carts. Standard reservation functionality (e.g., payments, registration info, etc.) will be done by leveraging the existing reservations system. The system will be web-based and hosted by the reservation company.

**Additional context**

Peak season is quickly approaching so the system must be ready quickly or we have to wait until next year. The company is investing heavily in cutting-edge technology like smart room locks that open via a cell phone and is only interested in the high-end market. Salespeople have tremendous clout in the organization. People often scramble to make their promises true.

#### Presented solution

<a href= "/images/venerd%C3%AC_protetto/architectural_kata_2_2023.png?raw=true" target="_blank"> 
<img align="center" style="width:45%; margin-right: 0.5em" src=/images/venerd%C3%AC_protetto/architectural_kata_2_2023.png?raw=true" alt="Architectural Kata winner 1" title="Architectural Kata" /> 
</a>


<br />


## Architectural Kata "Concert Comparison"

Team: Sinfonia di Facilitatori

Moderator: Olegs Belousovs

Participants: Matteo Garza, Roberto Diana, Giulio Garofalo, Alessandra Frisullo, Ana Radujko, Luca Pacchiarotta, Giuseppe Rogato, Thomas Vargiu

#### Exercise

**Context**

A concert ticketing website with big acts and high volume needs an elastic solution to sell tickets.

**Users**

Thousand of concurrent users, bursts of up to 10,000/second when tickets go on sale.

**Requirements**

- Allow concurrent ticket buying.

- Do not sell a seat more than once.

- Shoppers can see an overview of the remaining seats.

**Additional context**

Consider an implementation in both Space-Based and Microservices architecture styles. Identify the tradeoffs for each solution.

#### Presented solution

<a href= "/images/venerd%C3%AC_protetto/architectural_kata_1_2023.png?raw=true" target="_blank"> 
<img align="center" style="width:45%; margin-right: 0.5em" src=/images/venerd%C3%AC_protetto/architectural_kata_1_2023.png?raw=true" alt="Architectural Kata winner 2" title="Architectural Kata" /> 
</a>


<br />


## Architectural Kata "Check Your Work”

Team: X-men

Moderator: Christian Nastasi

Participants: Angelo Landino, Edoardo Masselli, Gabriele Vener,i Davide Monfrecola, Vincenzo Gasparo, Cesare Bassu

#### Exercise

**Context**

A university has greatly expanded its CS course and wants to be able to automate the grading of simple programming assignments.

**Users**

- 300+ students per year
- staff and admin

**Requirements**

Students must be able to upload their source code, which will be run and graded. Grades and runs must be persistent and auditable. There must be a plagiarism detection system involving comparing with other submissions and also submitting to a web-based service (TurnItIn). There must be some level of integration with the University's learning management system (LMS).

#### Presented solution

<a href= "/images/venerd%C3%AC_protetto/architectural_kata_x-man-2023.png?raw=true" target="_blank"> 
<img align="center" style="width:45%; margin-right: 0.5em" src=/images/venerd%C3%AC_protetto/architectural_kata_x-man-2023.png?raw=true" alt="Architectural Kata partecipant" title="Architectural Kata" /> 
</a>


<br />


## Architectural Kata "1-800-AMI-SICK”

Team: Lambretta ipocondriaca

Moderator: Alessandro Manno

Participants: Filippo Del Moro, Federico Losi, Vito Di Bari, Oleksandr Savchenko, Gioele Farina, Mario Finelli


#### Exercise

**Context**

Your company wants to build a software system supporting call center nurses (advice nurses) answering questions from customers about potential health problems.

**Users**

250+ nurses worldwide

**Requirements** 

Be able to access patient medical histories, assist nurses in providing medical diagnosis, enable client customers to reach local medical staff if necessary, and contact the local medical staff directly ahead of time if necessary.

**Later phase requirements**

Anable parts of the system for direct client customer use.


#### Presented solution

<a href= "/images/venerd%C3%AC_protetto/architectural_kata_ami-sick-2023.png?raw=true" target="_blank"> 
<img align="center" style="width:45%; margin-right: 0.5em" src=/images/venerd%C3%AC_protetto/architectural_kata_ami-sick-2023.png?raw=true" alt="Architectural Kata partecipant" title="Architectural Kata" /> 
</a>


<br />


## Architectural Kata "I'll Have the BLT”

Team: BLT

Moderator: Enzo Camuto

Participants: Silverio Giancristofaro, Nicola Bonicelli, Samuel De Benedictis, Michele Milani, Stefano Giurgiano, Giovanni Lenoci, Mirko Urru

#### Exercise

**Context**

A national sandwich shop wants to enable "fax in your order" but over the Internet instead (in addition to their current fax-in service).

**Users**

millions+

**Requirements**

Users will place their order and then be given a time to pick up their sandwich and directions to the shop, which must integrate with Google Maps. If the shop offers a delivery service, dispatch the driver with the sandwich to the user. Provide mobile-device accessibility, offer national daily promotions/specials and local daily promotions/specials, and accept payment online or in person/on delivery.

#### Presented solution

<a href= "/images/venerd%C3%AC_protetto/architectural_kata_blt-2023.png?raw=true" target="_blank"> 
<img align="center" style="width:45%; margin-right: 0.5em" src=/images/venerd%C3%AC_protetto/architectural_kata_blt-2023.png?raw=true" alt="Architectural Kata partecipant" title="Architectural Kata" /> 
</a>


<script type="application/ld+json">
{ 
    "@context": "https://schema.org",
    "genre":["SEO","JSON-LD"],
    "@type": "BlogPosting",
    "headline": "Venerdì Protetto | Christmas edition",
    "keywords": ["Architectural Kata"],
    "wordcount": "543",
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
    "url": "https://engineering.facile.it/blog/eng/v-protetto9-6-2023/",
    "image": "https://engineering.facile.it/images/venerdì_protetto/vp_christmas.png",
    "datePublished": "2023-12-30",
    "dateCreated": "2023-12-30",
    "dateModified": "2023-12-30",
    "inLanguage": "en-US",
    "isFamilyFriendly": "true",
    "description": "Venerdì Protetto Christmas edition: Architectural Kata",
    "author": {
        "@type": "Person",
        "name": "Ana",
        "url": "https://www.linkedin.com/in/ana-radujko"
    }
}
</script>
