---
authors: ["elviro"]
comments: true
date: "2015-11-26"
draft: false
share: true
categories: [Italiano, Conferences, Codemotion]
title: "Facile.it devs @ Codemotion Milan 2015"

languageCode: "it-IT"
type: "post"
aliases:
  - "/facile-it-devs-codemotion-milan-2015"
---

L'appuntamento con il [Codemotion](http://milan2015.codemotionworld.com) di quest'anno a Milano è stato particolarmente **ricco**: tante tracce, moltissimi contenuti suddivisi tra talk tecnici, workshop e keynote, e alcuni ospiti illustri, tra cui il celebre [Rasmus Lerdorf](https://x.com/rasmus), creatore del linguaggio **PHP**. Come già fatto per il [PHP Day 2015](http://engineering.facile.it/php-day-2015/), proponiamo le nostre impressioni sulla conferenza, citando i talk che ci hanno colpito maggiormente: la scelta dei talk è basata sul gusto personale dei vari membri della redazione di Facile.it Engineering, e le considerazioni esposte non vanno lette come recensioni, ma come riflessioni di vario genere sulle tematiche trattate, volte a stimolare nei lettori l'interesse a **partecipare** a conferenze come il Codemotion.

I talk sono in ordine cronologico.

## Indice
- [A programmer is...](#a-programmer-is)
- [TDD per Android](#tdd-per-android)
- [Platformer 2D: jumping from XNA to Unity](#platformer-2d)
- [Building the world's largest grocery site in React](#grocery-site-in-react)
- [Alert overload: How to adopt a microservices architecture without being overwhelmed with noise](#alert-overload)
- [F#, not a game!!!](#f-sharp-not-a-game)
- [Applicazioni Real-Time con Polymer e Firebase](#polymer-firebase)
- [The new Mobile Challenge: Offline-Enablement for Web Applications](#offline-web-applications)
- [How to defeat feature gluttony](#feature-gluttony)
- [Is WebAssembly the killer of JavaScript?](#webassembly)
- [The evolution in the design of FATAL ERROR](#fatal-error)
- [Perché nel 2015 parliamo ancora di C++?](#ancora-cpp)
- [Mobile senza Unity: il caso SBK](#mobile-senza-unity)
- [Speeding up the Web with PHP 7](#php-7)

<a name="a-programmer-is"></a>
## A Programmer is...
- Birgitta Boeckeler ([@birgitta410](https://x.com/birgitta410))
- day 1 - 10:15 - 11:00 - Keynote Motivational ([slides](http://www.slideshare.net/Codemotion/keynote-birgitta-boeckeler-track-motivational-a-programmer-is))

In uno dei due *keynote* di apertura della prima giornata Birgitta Boeckeler ha affrontato la spinosa questione di ["cosa è un programmatore"](http://milan2015.codemotionworld.com/talk-detail/?detail=1980&sub=1), mostrando che assunzioni e incomprensioni **vecchie di 50 anni** ancora oggi influenzano la professione di programmatore e il modo in cui essa è considerata nel mondo, da addetti ai lavori e non. 

La [software crisis](http://engineering.facile.it/programmazione-funzionale-perche-preoccuparsi/) degli anni '60 aveva spinto aziende e università a elaborare metodi per distinguere i "buoni programmatori" sulla base di **test attitudinali** come l'*IBM PAT*, e influenti pubblicazioni accademiche come [A vocational interest scale for computer programmers](http://dl.acm.org/citation.cfm?id=1142628)(1966) hanno contribuito alla definizione del programmatore tipo come una persona che "ama i puzzle", "ama sperimentare e rischiare" e "odia la gente". 

Purtroppo questo archetipo sopravvive ancora oggi, e forse la sua conseguenza più grave è stato lo sviluppo dell'idea che una delle professioni più belle e appaganti che esistano sia una "cosa da uomini". Ma Birgitta nel suo *keynote* cita anche [Jean Bartik](https://en.wikipedia.org/wiki/Jean_Bartik), programmatrice di uno dei primi computer mai costruiti, l'[ENIAC](https://en.wikipedia.org/wiki/ENIAC), annunciato nel 1946: quando quella del "programmatore" non era ancora considerata una **vera professione**, ma era vista come poco più di un lavoro di segreteria, gran parte dei programmatori negli USA era composta da donne. Ma in una recente [intervista](http://computerhistory.org/revolution/birth-of-the-computer/4/78/2258) la Bartik ha fatto notare che molte delle tecniche che usiamo e delle problematiche che ci troviamo ad affrontare in quanto programmatori erano **già vere** negli anni '40: ad esempio, erano già evidenti i vantaggi del [pair programming](https://en.wikipedia.org/wiki/Pair_programming). 

Nell'ultima parte del talk, Birgitta mostra come questa erronea visione della professione di programmatore porti ancora oggi molte donne, interessate a una carriera nello sviluppo software, a **sentirsi escluse** dal club perché pensano che *veri* programmatori si nasca, e che se la propria passione non sia in realtà una vera e propria *ossessione* non si riuscirà mai ad eccellere: in realtà questo *status quo* è, come si è visto, il prodotto di decenni di incompresioni e [incredibili scivoloni](http://www.npr.org/sections/money/2014/10/21/357629765/when-women-stopped-coding) nello sviluppo della professione di programmatore, e che è possibile aspirare ai massimi livelli di tale professione anche con un approccio più *bilanciato*.

Nel seguente tweet Birgitta cita libri, articoli e talk che hanno ispirato il suo *keynote*:

<blockquote class="twitter-tweet" lang="it"><p lang="en" dir="ltr">Here is the material I used to put together my talk, <a href="https://x.com/hashtag/Codemotion?src=hash">#Codemotion</a>. Read! Especially &quot;Unlocking the Clubhouse&quot; <a href="https://t.co/ZKmdC1zvkf">pic.x.com/ZKmdC1zvkf</a></p>&mdash; Birgitta B. (@birgitta410) <a href="https://x.com/birgitta410/status/667646910161883136">20 Novembre 2015</a></blockquote> <script async src="//platform.x.com/widgets.js" charset="utf-8"></script>

<a name="tdd-per-android"></a>
## TDD per Android
- Matteo Vaccari ([@xpmatteo](https://x.com/xpmatteo))
- day 1 - 11:20 - 12:00 - Mobile track ([slides](http://www.slideshare.net/Codemotion/matteo-vaccari-tdd-per-android-codemotion-milan-2015))

Matteo Vaccari porta al codemotion un talk, dal titolo alla prima apparenza banale, ma indicato come livello *intermediate*. Con TDD per Android infatti, *non vuole introdurre né al testing di applicazioni Android, né al TDD*.
Piuttosto durante il talk vengono mostrati alcuni trucchi da lui scovati durante la sua esperienza per fare vero *Test Driven Development*. Come primo passo consiglia e spiega come affiancare al TestCase ufficiale dell' SDK Android, un altro strumento **semplificato ed ottimizzato** per una esecuzione veloce dei test unitari: esso, basandosi esclusivamente su JUnit, permette l’esecuzione veloce del “ciclo” Red, Green, Refactor, senza dover attendere i tempi del device virtuale (o meno). Matteo  quindi  passa a sviscerare alcuni *trick* più ricercati e specifici, dimostrandoli con due app d'esempio:

- [esempio 1](https://github.com/xpmatteo/unit-doctor)
- [esempio 2](https://github.com/xpmatteo/fairy-fingers)

<a name="platformer-2d"></a>
## Platformer 2D: jumping from XNA to Unity
- Paolo Cattaneo ([Raven Travel Studios](https://x.com/RavenTravelStd))
- day 1 - 12:10 - 13:10 - Game Dev track

Il vecchio ambiente di sviluppo **XNA** è ormai stato abbandonato da Microsoft da anni. Molti sviluppatori si sono quindi visti costretti a migrare su altri *tool*, come per esempio Unity, che con XNA condivide l’adozione del linguaggio C# per gli script. Il passaggio da una programmazione vecchio stampo ad un ambiente visuale può creare qualche problema, soprattutto per via di alcuni ostacoli apparentemente invalicabili. È realmente necessario creare manualmente per ogni *asset* di un progetto un GameObject in Unity? Diffidate delle guide ufficiali e sfruttate la generazione a *runtime* di nuovi GameObject, associando uno script di creazione ad un solo GameObject padre!

<a name="grocery-site-in-react"></a>
## Building the world's largest grocery site in React
- Robbie McCorkell ([@robbiemccorkell](https://x.com/robbiemccorkell))
- day 1 - 14:10 - 14:50 - Architecture track

Lo speaker Robbie McCorkell, tech lead presso [Red Badger](http://red-badger.com), società londinese che si occupa di web design per grossi partner internazionali, ci ha raccontato del viaggio che ha portato la sua azienda a creare il sito web di **Tesco**, negozio online e distributore di prodotti di vario genere che opera principalmente in Europa, Nord America ed Estremo Oriente.
La tecnologia chiave impiegata per la realizzazione è stata [React](https://facebook.github.io/react/), libreria open source realizzata da Facebook che consente di creare la view di applicazioni web mediante **componenti**.
Una delle esigenze alla base dello sviluppo di un sito per un marchio così famoso era la possibilità di fruire di esso sul **maggior numero possibile di dispositivi e browser**, cercando di minimizzare il traffico. La soluzione adottata da Red Badger a questo problema è stata la realizzazione di un applicazione **isomorfica**, cioè un sistema che condivide lo stesso codice sia lato server sia lato client ed è in grado di fornire al browser delle pagine **già renderizzate** che soltanto opzionalmente possono sfruttare javascript per l'interazione con gli elementi grafici.
Anche le ottimizzazioni per il SEO traggono benefici da un sito costruito in questo modo in quanto tutte le pagine sono **indicizzabili** dai motori di ricerca.
L'impiego di React è stata quasi una scelta obbligata, visto che esso mette a disposizione degli strumenti semplici ma potenti per raggiungere l'obiettivo che si sono posti.
Particolare attenzione durante il talk è stata posta sulla necessità di essere sempre al passo con le varie versioni di React e delle librerie ad esso collegate (soprattutto quelle ufficiali che Facebook stessa sviluppa ed utilizza per i suoi prodotti, tipo [Relay](https://facebook.github.io/relay/) e [GraphQL](https://facebook.github.io/react/blog/2015/05/01/graphql-introduction.html)).

<a name="alert-overload"></a>
## Alert overload: How to adopt a microservices architecture without being overwhelmed with noise
- Sarah Wells ([@sarahjwells](https://x.com/sarahjwells))
- day 1 - 14:10 - 14:50 - DevOps track ([slides](http://www.slideshare.net/Codemotion/sarah-wells-alert-overload-how-to-adopt-a-microservices-architecture-without-being-overwhelmed-with-noise))

Il talk di Sarah, come promesso dal titolo, dava una serie di consigli su come mantenere in produzione un'architettura a microservizi senza venir **sommersi dalle notifiche** di errore e dagli alert che ne derivano in caso di malfunzionamento:

- Pensare al monitoring dall'inizio, non è un attività che può essere posticipata;
- Gli alert devono presentarsi **solo quando richiedono un'interazione** da parte di chi amministra il sistema;
- Costruire il proprio sistema **pensando al supporto** (documentazione, test, etc..);
- Utilizzare il **tool giusto per il lavoro che bisogna compiere**;
- Configurare un'alert fa parte del fix del problema! *(Code -> Test -> Alert)*;
- Spegnere tutte le mail di notifica dai sistemi di monitoring (ci sono tool migliori: IRC, Slack, etc..;
- Assicurarsi di sapere se uno degli alert ha smesso di funzionare;

Oltre a questo Sarah ha anche parlato di alcuni **tool** che utilizza più o meno frequentemente quali:

- [Nagios](https://www.nagios.org): Monitoring e alerting
- [Splunk](http://www.splunk.com): Log aggregation
- [Grafana](http://grafana.org): Per creare grafici e dashboard
- [Sentry](https://getsentry.com/welcome): Per aggregare gli errori
- [Dashing](http://dashing.io): Framework per creare dashboard

<a name="f-sharp-not-a-game"></a>
## F#, not a game!!!
- Andrea Magnorsky ([@silverspoon](https://x.com/silverspoon))
- day 1 - 14:10 - 14:50 - Game Dev track ([slides](http://www.roundcrisis.com/presentations/2015-codemotion-milan/#/))

Andrea Magnorsky di [Digital Furnace Games](http://www.digitalfurnacegames.com) ha parlato dell'uso dei pattern di **programmazione funzionale** nello sviluppo del loro prossimo gioco *Onikira: Demon Killer*, per il quale hanno adottato il linguaggio funzionale [F#](https://en.wikipedia.org/wiki/F_Sharp_(programming_language)).

Nel giustificare un approccio più funzionale allo sviluppo software in generale, Andrea parla del bellissimo articolo [Out of the Tar Pit](http://shaffner.us/cs/papers/tarpit.pdf), di Ben Moseley e Peter Marks, già citato più volte su questo blog. L'eccessiva **complessità** può rendere ingestibili i progetti software, compresi i giochi, e un linguaggio come F#, basato - come ogni linguaggio funzionale - sull'uso di strutture dati immbutabili, funzioni pure e *pattern matching*, permette di gestire lo stato del sistema in maniera più semplice: F# risulta essere particolarmente potente per questo scopo, grazie agli [*active patterns*](http://fsharpforfunandprofit.com/posts/convenience-active-patterns/).

Nel corso del talk Andrea ha parlato anche dell'ottima interoperabilità di F# con C#, e dell'uso di librerie di [*property testing*](https://en.wikipedia.org/wiki/Property_testing) come [FsCheck](https://github.com/fscheck/FsCheck), e *building tools* come [FAKE](http://fsharp.github.io/FAKE/), mostrando quindi un ecosistema ricco di strumenti di sviluppo, perfettamente adeguato alla realizzazione di software ad alto livello, e cosa c'è di più *elevato* di un videogioco?

<a name="polymer-firebase"></a>
## Applicazioni Real-Time con Polymer e Firebase
- Michel Murabito ([@michelmurabito](https://x.com/michelmurabito))
- day 1 - 15:00 - 16:00 - Server-Side track

Il talk, portato al Codemotion 2015 dal GDG (Google Developer Group) Community Manager Italia  Michel Murabito, tratta due tecnologie emergenti nel panorama realtime, javascript (e non solo). Michael, attraverso un live tutorial atto a creare una todolist ci ha introdotto a [Polymer](https://www.polymer-project.org), accompagnandoci per mano alla scoperta dei [suoi components](https://elements.polymer-project.org/), spiegando come utilizzarli per ottenere senza sforzo un’interfaccia veloce e pulita, come personalizzarli e come crearne di nuovi. Successivamente ha integrato nell’applicazione ottenuta la persistenza dei dati utilizzando [Firebase](https://www.firebase.com/), un servizio API, basato su DB NO SQL, veloce e tecnologicamente avanzato, tra le cui peculiarità troviamo, ad esempio, la capacità di mantenere aggiornati in realtime i client connessi.
[App dimostrativa](https://t.co/kukysY8sgZ)

<a name="offline-web-applications"></a>
## The new Mobile Challenge: Offline-Enablement for Web Applications
- Christiane Kurz ([@learnui5](https://x.com/learnui5))
- day 1 - 15:00 - 16:00 - Mobile track ([slides](http://www.slideshare.net/Codemotion/christiane-kurz-the-new-mobile-challenge-offlineenablement-for-web-applications))

Ottimo talk che introduce tecnologie ancora poco conosciute nello sviluppo web, e offre un’ottima soluzione per iniziare a pensare a come rendere disponibili i nostri siti web anche in modalità offline. Questo apre orizzonti a nuove soluzioni e a nuove sfide, come salvare i dati lato client (nel talk si parla di [indexedDB](https://developer.mozilla.org/it/docs/Web/API/IndexedDB_API)), e gestire conflitti tra i dati durante la sincronizzazione col server, cercando possibili strumenti di compatibilità con vecchi browser: in effetti l'unica piccola pecca della soluzione proposta è la ridotta compatibilità con i browser, soprattutto mobile, consultabile anche a questo [link](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API#Browser_compatibility).

Che altro dire… questo è un ottimo spunto per iniziare a pensare a qualche possibile implementazione in vista di un maggior supporto.

<a name="feature-gluttony"></a>
## How to defeat feature gluttony
- Kasia Mrowca ([@MrowcaKasia](https://x.com/MrowcaKasia))
- day 1 - 15:00 - 16:00 - Startup track ([slides](http://www.slideshare.net/Codemotion/kasia-mrowca-how-to-defeat-feature-gluttony-codemotion-milan-2015-55472938))

Kasia Mrowca, ex programmatrice ed ora product owner, ci spiega le sue strategie per ovviare ai **problemi di backlog**: desiderare buone e nuove feature è una cosa buona, ma esagerare è male.

Per spiegarci tutto questo ci porta la sua esperienza, ad esempio come ha visto un backlog crescere così tanto da necessitare fino a 15 (!) persone per essere gestito; ovviamente questo è uno scenario catastrofico, i cui **costi di organizzazione** e comunicazione necessari tra tutte queste persone porta ad un rallentamento irrisolvibile. Nel suo talk ci illustra alcune tecniche utili di visualizzazione e organizzazione delle feature richieste, per selezionarle e prioritizzarle con criterio.

<a name="webassembly"></a>
## Is WebAssembly the killer of JavaScript?
- Boyan Mihaylov ([@bmihaylov](https://x.com/bmihaylov))
- day 1 - 17:10 - 17:50 - Languages track ([slides](http://www.slideshare.net/Codemotion/boyan-mihaylov-is-web-assembly-the-killer-of-javascript))

La presentazione è condotta da Boyan Mihaylov ed è un'introduzione al nuovo mondo di [WebAssembly](https://medium.com/javascript-scene/what-is-webassembly-the-dawn-of-a-new-era-61256ec5a8f6#.ee7hgs4df): una tecnologia in fase di sviluppo molto promettente nell'ambito internet.
JavaScript è il linguaggio del web. È nato nel 1995 per risolvere specifici problemi di computazione lato browser. Per molto tempo è stato un linguaggio **senza specifiche**, con conseguenti difficoltà nello scrivere script compatibili cross-broswer. Con il passare del tempo, sono stati definiti degli standard (ECMA) che hanno parzialmente risolto il problema.
Nell'ultimo periodo JavaScript si è diffuso molto. Oggi lo si usa praticamente ovunque per sviluppare applicazioni client-side, server-side, mobile e desktop.

Tuttavia molti problemi rimangono irrisolti:

 - Il browser esegue solo codice scritto in JavaScript;
 - JavaScript è spesso considerato verboso e carente di funzionalità rispetto ad altri linguaggi;
 - Ad ogni esecuzione, la sintassi dei programmi JavaScript deve essere elaborata con un significativo impatto sulle performance;
 - JavaScript è text-based, i file con codice sorgente possono raggiungere dimensioni notevoli per il trasferimento via rete;

Diverse strategie sono state attuate per aggirare questi problemi.
È frequente l'uso di tool di **minificazione** del sorgente per ridurre le dimensioni.
Sono stati sviluppati differenti flavour di JavaScript per aumentare l'espressività del linguaggio (CoffeeScript, TypeScript, ecc.);
Sono stati creati dei compilatori per tradurre in JavaScript programmi scritti in altri linguaggi.

Ciò tuttavia è molto inefficiente: perché non compilare il codice sorgente in una specie di bytecode? Sarebbe più performante in fase d'esecuzione e download.

La risposta è WebAssembly o WASM.
WASM è un linguaggio binario destinato ad essere eseguito da una virtual machine integrata nei browser.
Teoricamente qualsiasi linguaggio dotato di compilatore WebAssembly può essere utilizzato per sviluppare applicazioni browser-based.

WebAssembly beneficia di tutti i vantaggi di JS, compresa l'esecuzione in Sandbox.
WASM non sostituirà JavaScript in quanto quest'ultimo, tramite compilazione, genererà istruzioni WebAssembly.

WebAssembly è ancora in fase di prototipazione, è una tecnologia molto interessante e si pensa che essa detterà le basi per sviluppare virtual machine d'ultima generazione.

<a name="fatal-error"></a>
## The evolution in the design of FATAL ERROR
- Ciro Continisio ([@ccontinisio](https://x.com/ccontinisio)), Ennio Pirolo ([@SantEnnio](https://x.com/santennio))
- day 2 - 11:20 - 12:00 - Game Dev track ([slides](http://www.slideshare.net/Codemotion/ciro-continisio-ennio-pirolo-the-evolution-in-the-design-of-fatal-error))

A volte lo sviluppo di un videogioco può protrarsi per mesi, anche anni. È quello che è accaduto con FATAL ERROR, titolo nato dalle menti di Ciro Continisio ed Ennio Pirolo ben 2 anni fa in occasione della GamesWeek di Milano. Nel corso degli anni il processo di sviluppo iterativo tipico dei videogiochi ha portato a vari miglioramenti tecnici, rimanendo però fedeli alle prime linee guida di game design. L’IA nel gioco ha adottato un interessante meccanismo di comportamenti che, una volta associati ad un bot governato dalla CPU, permettono a seconda dell’azione su schermo di attivare un determinato comportamento. Un approccio applicabile anche al di fuori dello sviluppo di videogiochi.

<a name="ancora-cpp"></a>
## Perché nel 2015 parliamo ancora di C++?
- Marco Arena ([@italiancpp](https://x.com/italiancpp))
- day 2 - 12:10 - 13:10 - Languages track ([slides](http://www.slideshare.net/Codemotion/marco-arena-perch-nel-2015-parliamo-ancora-di-c-codemotion-milan-2015))

La domanda è lecita, a 30 anni dalla presentazione del linguaggio, ma Marco Arena ha tutte le risposte nonostante quel giorno non fosse ancora nato. Il C++ è *molto popolare*: diversi software di uso quotidiano, tra cui probabilmente il browser che state usando, sono scritti in questo linguaggio. È inoltre *compatibile con il C* e, più in generale, si *preoccupa del passato*: segue uno standard ISO, la retrocompatibiltà è sempre garantita e i miglioramenti sono ottenuti aggiungendo nuovi costrutti. Non è *garbage collected*: il lifetime di oggetti e risorse è *scoped*, garantendo in questo modo un comportamento deterministico ed evitando complicazioni in sistemi *latency-critical*. È *indipendente dal paradigma*, perché ne comprende diversi, ed è adatto al *system programming* grazie al suo accesso a basso livello alla memoria. Sta inoltre *crescendo in fretta*: dopo oltre 20 anni in cui è rimasto sostanzialmente immutato, ha recentemente presentato diverse innovazioni e molte altre sono state annunciate per i prossimi anni. Da ultimo, è immerso in un *ecosistema straordinario*, composto da industrie, mondo accademico e user groups.

<a name="mobile-senza-unity"></a>
## Mobile senza Unity: il caso SBK
- Giuseppe Navarria ([@WaveringRadiant](https://x.com/waveringradiant))
- day 2 - 12:10 - 13:10 - Game Dev track ([slides](http://www.slideshare.net/Codemotion/giuseppe-navarria-mobile-senza-unity-il-caso-sbk))

Con tool in circolazione come Unity ed Unreal Engine quasi ci si scorda di come vengono costruiti i motori grafici dei videogiochi. Giuseppe Navarria ha spiegato alcune caratteristiche del motore realizzato in C++ per le versioni mobile del gioco SBK, evidenziando alcuni pregi acquisiti grazie proprio al “fai da te”. L’utilizzo di lightmap generate da immagini HDR, gli effetti di rifrazione della luce con pixel shader e spheremaps, nonché ombre precalcolate con effetto blob shadow, hanno permesso di raggiungere livelli qualitativi di un certo spessore anche su dispositivi un po’ datati. Interessante la divisione in moduli del motore che seleziona il miglior set di componenti per il dispositivo sul quale opera.

<a name="php-7"></a>
## Speeding up the Web with PHP 7
- Rasmus Lerdorf ([@rasmus](https://x.com/rasmus))
- day 2 - 14:10 - 14:50 - Languages track

Da questo talk di **Rasmus Lerdorf** (creatore del linguaggio PHP) ci si sarebbe potuto aspettare una semplice lista delle nuove feature di PHP 7 (di cui abbiamo già parlato in [questo post](/php-7-overview), in realtà però il relatore si è spinto molto più in là mostrando alcuni **benchmark di comparazione delle performance** tra PHP 7, PHP 5 e HHVM 3.10, nei quali PHP 7 stracciava PHP 5 e teneva egregiamente il passo con HHVM 3.10, per poi dare una semplice ma approfondita overview rispetto ad alcune parti del lavoro fatto per ottenere quello che oggi è PHP 7 in termini di **performance e feature**.

Rasmus ha parlato del lungo lavoro di micro ottimizzazioni e di **refactoring** sulla codebase, soprattutto per quanto riguarda l'utilizzo della memoria da parte di HashTable e Zval che ora, nella maggior parte dei casi, è stato più che dimezzato.

Preziose sono state anche le informazioni riguardanti l'[AST](https://wiki.php.net/rfc/abstract_syntax_tree) ([Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree)) che è stata introdotta in questa nuova versione e che permette non solo di ragionare in termini più strutturati quando si effettuano modifiche agli internals del linguaggio ma che sarà causa della nascita, secondo Rasmus, di una serie infinita di tool come: analizzatori statici, compilatori, parser in userland etc..

Ultime ma non meno importanti sono le informazioni date riguardo la **FDO** di gcc ([Feedback Directed Optimization](https://gcc.gnu.org/onlinedocs/gcc-4.1.0/gcc/Optimize-Options.html)) con la quale, per chi compila PHP da sé, si possono ottenere degli ulteriori **incrementi di performance facendo training** sulla propria codebase in fase di compilazione della SAPI.
