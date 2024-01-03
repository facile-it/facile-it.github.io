---
authors: ["jean"]
comments: true
date: "2015-05-19"
draft: false
share: true
categories: [Italiano, PHP, Conferences]
title: "Facile.it devs @ PHP Day 2015"

languageCode: "it-IT"
type: "post"
aliases:
  - "/php-day-2015"
---
Anche quest'anno si è svolto il **[PHP Day](http://2015.phpday.it/) a Verona, il 15 e 16 maggio**. Noi sviluppatori di Facile.it abbiamo partecipato con un folto gruppo e seguito i vari talks. 

In questo breve articolo vorremmo citare quelli che in qualche maniera **ci hanno colpito**, per motivi tecnici e non, per dare l'opportunità a chi non ha potuto partecipare di sapere qualcosa di più, o per dare **un assaggio della conferenza** a chi non ha mai partecipato a qualcosa del genere e, speriamo, invogliarlo a far parte della community!

Ovviamente non pretendiamo di fare una recensione, né quanto meno una classifica... I talk che abbiamo scelto di citare sono stati scelti per puro **gusto personale**, o ci hanno semplicemente colpito perché si avvicinavano di più alla nostra esperienza di sviluppatori, o perché toccavano più da vicino lo **stack tecnologico** da noi utilizzato.

I talk sono in ordine cronologico. Buona lettura!

#### Indice
 - [PHP object mocking framework world: let's compare Prophecy and PHPUnit](#prophecy)
 - [Containerize your PHP](#containerize)
 - [Going crazy with Symfony2 and Varnish](#varnish)
 - [Hello, PSR-7](#psr-7)
 - [PHP Data Structures (and the impact of PHP 7 on them)](#php7-data-structures)
 - [Doctrine ORM Good Practices and Tricks](#doctrine)

###### Keynotes
 - [Talmudic Maxims to Maximize Your Growth as a Developer](#coderabbi)
 - [Down the Rabbit Hole: Lessons Learned combining Career and Community](#calevans)
 - [Behind the Scenes of Maintaining an Open Source Project](#seldaek)


# Talk tecnici

<a name="prophecy"></a>
#### PHP object mocking framework world: let's compare Prophecy and PHPUnit
 * Sarah Khalil ([@saro0h](http://x.com/saro0h))
 * Day 1 - 14:30 – 15:30 - track 1 ([slides](https://speakerdeck.com/saro0h/php-day-verona-2015-php-object-mocking-framework-world))

<iframe src="https://player.vimeo.com/video/134728681" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Una buona esposizione su [prophecy](https://github.com/phpspec/prophecy-phpunit) la nuova tecnologia per effetuare mocking e stubbing. In questo talk sono state illustrate le API di prophecy e si è parlato di come questo strumento sarà sempre più integrato con phpunit (è già presente nella nuova versione 4.6) sino ad arrivare ad un completo rimpiazzo dei metodi nativi del famoso testing framework.

Ricordatevi di aggiungere qualche altra parola (oltre a prophecy) chiave nelle vostre ricerche su google per evitare riferimenti biblici.

<a name="containerize"></a>
#### Containerize your PHP
 * Marek Jelen ([@marek_jelen](http://x.com/marek_jelen))
 * Day 1 - 15:30 – 16:30 - track 2

<iframe src="https://player.vimeo.com/video/134728683" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Si è parlato tanto nelle Conferences dell'ultimo anno di **Docker e i container** come strumento di sviluppo, ma questo talk si è rivelato interessante, spiegando come fosse possibile utilizzare i container **come strumento di deploy** e di creazione di immagini, in modo tale da contenere anche il sorgente del proprio progetto; abbiamo scoperto il tool [Source to Image](http://github.com/openshift/source-to-image), che permette di creare queste immagini in maniera personalizzata e automatizzata partendo dal proprio codice (e dal `composer.json`), e il progetto [Openshift](http://www.openshift.com/), portato avanti da RedHat.
 
<a name="varnish"></a>
#### Going crazy with Symfony2 and Varnish
 * David De Boer
 * Day 1 - 17:30 – 18:00 - track 1

<iframe src="https://player.vimeo.com/video/134814726" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Prima di ascoltare questo talk, pensavamo che la **cache HTTP** (e Varnish) fossero praticamente inutilizzabili in un **ambito di sito non-pubblico**, dove i contenuti vanno serviti (e variano in base) ad utenti sempre autenticati.

Abbiamo scoperto il [FOSHttpCacheBundle](http://github.com/FriendsOfSymfony/FOSHttpCacheBundle), e il trucco che permette di fare caching anche di questo tipo di contenuti: Varnish prende il cookie e controlla la cache non in base a quello, ma in base ad un hash che viene fornito dall'applicazione stessa tramite un altra chiamata; questo permette di **mappare i contenuti cachati** non sui singoli utenti, ma **con logiche più ottimizzate** (gruppi di utenti? set di permessi?) ed eventualmente più legate alla business logic dell'applicazione stessa.

<a name="psr-7"></a>
#### Hello, PSR-7
 * Beau Simensen ([@beausimensen](http://www.x.com/beausimensen))
 * Day 2 - 11:00 – 12:00 - track 2 ([slides](https://beau.io/talks/2015/05/16/hello-psr-7-phpday-2015/))

<iframe src="https://player.vimeo.com/video/134281520" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

In questo talk abbiamo potuto conoscere da vicino la genesi dello **standard PSR-7** (di cui abbiamo già scritto in un [altro articolo](http://engineering.facile.it/php-fig-standard-psr-7-http-message-interfaces/)), raccontata da una delle persone che hanno seguito da vicino e contribuito alla scrittura della proposta stessa.

Lo standard sarà approvato a brevissimo (solo 3 giorni dopo il talk!) e molti aspettano di vedere cosa comporterà a livello di framework PHP.

<a name="php7-data-structures"></a>
#### PHP Data Structures (and the impact of PHP 7 on them)
 * Patrick Allaert ([@patrick_allaert](http://www.x.com/patrick_allaert))
 * Day 2 - 12:00 – 13:00 - track 1 ([slides](http://www.slideshare.net/patrick.allaert/php-data-structures-and-the-impact-of-php-7-on-them-php-days-2015))

<iframe src="https://player.vimeo.com/video/134070469" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Questo talk, dal sapore molto tecnico, ci ha fatto addentrare negli internals degli **array PHP**, e in quanto siano talmente specializzati a far tutto, da essere **inefficienti** in moltissimi casi; abbiamo visto numerose **alternative più specialistiche** per i vari casi d'uso ([SplFixedArray](http://php.net/manual/en/class.splfixedarray.php), [SplQueue](http://php.net/manual/en/class.splqueue.php), [SplStack](http://php.net/manual/en/class.splstack.php)...); sfruttare gli uni piuttosto che gli altri impatta fortemente sulle **prestazioni** nei tempi e nell'uso della memoria, e abbiamo visto nel dettaglio alcuni benchmark che mostrano come questi costi diminuiscono (spesso di gran lunga) **tra PHP 5.6 e PHP 7**.

<a name="doctrine"></a>
#### Doctrine ORM Good Practices and Tricks
 * Marco Pivetta ([@Ocramius](http://www.x.com/Ocramius))
 * Day 2 - 15:30 – 16:30 - track 1

<iframe src="https://player.vimeo.com/video/134178140" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Usiamo **Doctrine** tutti i giorni, ma questo talk, sebbene marcato come di livello **beginner**, si è rivelato molto interessante e fonte di numerose discussioni e **riflessioni** tra colleghi. Lo speaker è uno dei principali contributors al progetto [doctrine-orm](https://github.com/doctrine/doctrine2), e ci ha elencato una serie di **best practices**, partendo dal chiedersi se e quando è il caso di usare un ORM, passando poi a problemi quali l'uso e l'implementazione di entità, la loro consistenza, l'evitare di usare setter brutali o di esporre le ArrayCollection che rappresentano le nostre relazioni.

# Keynotes
Abbiamo voluto citare in questo articolo anche i **3 keynote** della conferenza: sono stati tutti piuttosto interessanti, profondamente motivazionali e coinvolgenti.

<a name="coderabbi"></a>
#### Talmudic Maxims to Maximize Your Growth as a Developer
 * Yitzchok Willroth ([@coderabbi](http://www.x.com/coderabbi))
 * Day 1 - keynote di apertura

Yitz, studente rabbinico poi passato alla programmazione, molto famoso nella community PHP, ci ha spinto a considerare alcuni suoi consigli su come poterci **migliorare come sviluppatori** e come membri della community stessa: cercare e coltivare un mentore, essere pazienti ed accettare i consigli, aiutare gli altri per ripagare tutto questo, partecipare nell'open source...

Personalmente, mi ha anche fatto scoprire tre siti piuttosto interessanti: 

 * [PHP Mentoring](http://phpmentoring.org/) e [Hackpledge](http://hackpledge.org), per chi è in cerca di un **mentore** o vuole diventarlo per aiutare altri a diventare programmatori migliori
 * [Up for grabs](http://up-for-grabs.net/), un sito raccoglitore di **issue su GitHub *semplici***, un ottimo punto di inizio per chi vorrebbe partecipare a progetti open source, ma non sa da dove cominciare

<a name="calevans"></a>
#### Down the Rabbit Hole: Lessons Learned combining Career and Community
 * Cal Evans ([@CalEvans](http://www.x.com/calevans))
 * Day 2 - keynote di apertura  

Cal è il community manager (ma non chiamatelo così!) per Zend, e ci ha raccontato con estrema passione, qualche lacrima e in maniera molto divertente la sua storia, come è nata la sua carriera di programmatore e come il suo percorso si è intrecciato con la community PHP e il mondo dell'open source. 

Tutto questo per spiegarci come **far parte della community è un valore** importante per tutti ma soprattutto per noi stessi, e come la nostra sia così grande, forte e basata su uno **spirito positivo**.

<a name="seldaek"></a>
#### Behind the Scenes of Maintaining an Open Source Project
 * Jordi Boggiano ([@seldaek](http://x.com/seldaek))
 * Day 2 - keynote di chiusura

Jordi è il creatore e mantainer di [Composer](https://getcomposer.org/), uno dei principali tool per un programmatore PHP. Nel suo keynote ci ha raccontato con franchezza la sua esperienza in prima persona nel **gestire un progetto open source** così vasto e popolare, come spesso sia difficile accontentare tutti, e alcuni retroscena e dettagli di qualche curiosa pull request.
