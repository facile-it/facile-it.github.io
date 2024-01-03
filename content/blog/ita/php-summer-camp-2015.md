---
authors: ["sergio"]
comments: true
date: "2015-09-08"
draft: false
share: true
categories: [Italiano, Conferences, PHP]
title: "Php Summer Camp 2015"
type: "post"

languageCode: "it-IT"
aliases:
  - "/php-summer-camp-2015/"
---
# Introduzione
Dal 26 al 29 agosto 2015 ho avuto l'occasione di partecipare al [**PhpSummerCamp**](http://2015.phpsummercamp.com/) in Rovigno (Croazia).
Negli stessi giorni e nello stesso luogo si è svolto anche il [**SummerCamp EzPublish**](http://2015.ezsummercamp.com/).
Ciò ha consentito di accrescere ulteriormente la platea di partecipanti con cui è stato possibile condividere idee e soluzioni.

L'evento è costituito da numerosi **workshop** orientati allo sviluppo di applicazioni con il [framework PHP Symfony](http://symfony.com).
Le mattine e le prime metà del pomeriggio erano interamente dedicati ai workshop.
Nel tempo rimanente venivano condotte varie attività dedicate alla community e al confronto tra i partecipanti.

In questo articolo descriverò gli eventi a cui ho partecipato e gli argomenti trattati, con particolare riguardo a ciò che mi ha personalmente colpito di più.

# Indice
  * [Mercoledì 26 agosto](#mercoledi)
    * [Continuous integration with PHP](#ci)
    * [Modernising the legacy](#modernising)
    * [Frontend as design to backend middleware or some JS concepts that any good PHP dev should know](#frontend)
    * [Celebrity debate](#debate)
  * [Giovedì 27 agosto](#giovedi)
    * [Loose coupling in practice](#coupling)
    * [Next-gen package development with Puli](#puli)
    * [Unconference](#unconference)
  * [Venerdì 28 agosto](#venerdi)
    * [Profiling PHP Apps](#profiling)
    * [Migrating to Symfony 3](#symfony3)
    * [Meet the experts](#experts)
  * [Conclusione](#conclusione)

<a name="mercoledi"></a>
# Mercoledì 26 agosto
Un brevissimo keynote di apertura ha illustrato la storia del SummerCamp. Esso inizialmente ospitava soltanto la sezione EzPublish; solo negli ultimi anni è stata aggiunta la parte più generica relativa a Symfony e PHP.

<a name="ci"></a>
### Continuous integration with PHP (Michele Orselli)
Il primo workshop ha illustrato come configurare e utilizzare [**Jenkins**](https://jenkins-ci.org/).
L'obiettivo della sessione è stato abilitare un **sistema di continuous integration** su un piccolo progetto Symfony che già aveva alcune test suite.
È stato interessante notare la semplicità d'uso e di configurazione del sistema Jenkins.
Si è visto come installare e configurare il [**Clover PHP Plugin**](https://wiki.jenkins-ci.org/display/JENKINS/Clover+PHP+Plugin) per monitorare il cambiamento dello statement coverage dopo ciascuna build.
È stato dedicato anche dello spazio per parlare di [**Phing**](https://www.phing.info/), tool molto utile per realizzare build automatiche.
Sono state approfondite alcune configurazioni particolari di PhpUnit che consentono di dividere correttamente i test negli insiemi: test unitari, test d'integrazione e test funzionali.
È stato interessante veder utilizzare [**l'estenzione di PHPUnit Database**](https://phpunit.de/manual/current/en/database.html) per gestire automaticamente la connessione al database, la creazione dello schema e il caricamento/reset delle fixtures per ogni test case.

<a name="modernising"></a>
### Modernising the legacy (Marek Matulka)
Il presentatore ha illustrato le feature implementate da un'applicazione PHP legacy. Il codice era molto disordinato e praticamente impossibile da testare.
Logica di business, data retrieval e viste erano mescolate in un'applicazione che non era dotata nemmeno di un singolo [front-controller](https://it.wikipedia.org/wiki/Front_Controller_pattern).
<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Modernising legacy w/ <a href="https://x.com/super_marek">@super_marek</a> is kicking off at <a href="https://x.com/hashtag/phpsummer?src=hash">#phpsummer</a> <a href="http://t.co/aOIt1CWhNb">pic.x.com/aOIt1CWhNb</a></p>&mdash; Jakub Zalas (@jakub_zalas) <a href="https://x.com/jakub_zalas/status/636506399288201216">August 26, 2015</a></blockquote>
<script async src="//platform.x.com/widgets.js" charset="utf-8"></script>
L'applicazione era un semplice sito di e-commerce per la vendita di articoli e comprendeva una sezione di checkout.
Nel dover aggiungere un nuova funzionalità - il calcolo real-time delle spese di spedizione - si è voluto introdurre alcune componenti di Symfony per migliorare la qualità del sistema.
È stato illustrato come introdurre e configurare le seguenti componenti: [**DependencyInjection**](http://symfony.com/it/doc/current/components/dependency_injection/introduction.html), [**Twig**](http://twig.sensiolabs.org/) e [**HttpFoundation**](http://symfony.com/it/doc/current/components/http_foundation/index.html).
È stato interessante notare come i componenti di Symfony fossero altamente disaccoppiati e, per questo, introducibili sequenzialmente e senza grandi difficoltà.
Il miglioramento del design ha permesso di implementare alcuni test unitari per la nuova funzionalità. Si è visto quindi come configurare l'ambiente e i tool per il testing.
La struttura del workshop era particolare: ciascun macro-task era diviso in molti sotto-task. Il repository Git del progetto già conteneva, in branch diversi, tutte le soluzioni. Ciò ha consentito di evitare ritardi causati dai partecipanti che non riuscivano, per vari problemi, a seguire l'avanzamento della sessione.

<a name="frontend"></a>
### Frontend as design to backend middleware or some JS concepts that any good PHP dev should know (Damir Brekalo)
Purtroppo, data la scarsa presenza di partecipanti con competenze avanzate di JavaScript, la presentazione ha trattato argomenti abbastanza basilari rispetto a quelli pianificati.
Si è visto come applicare il [paradigma object oriented](https://it.wikipedia.org/wiki/Programmazione_orientata_agli_oggetti) in JavaScript con numerosi confronti di funzionalità e sintassi tra JS e PHP che hanno consentito a tutti di comprendere l'argomento.
La seconda parte del workshop ha analizzato e proposto soluzioni al problema dell'import di librerie di terze parti in applicazioni complesse.
È stato analizzato un progetto che implementava una [single page application](https://en.wikipedia.org/wiki/Single-page_application) senza alcun uso di framework. Essa era soltanto una composizione di più componenti eterogenei tra di loro.
Ciò ha permesso di apprendere che **la scelta affrettata di framework complessi non è sempre la migliore**. Talvolta può essere più produttivo ricorrere a componenti specifici per il problema da risolvere.
In generale il workshop è stato interessante ma, rispetto agli altri, conteneva molto meno lavoro pratico.

<a name="debate"></a>
### Celebrity debate
È stata una gara scherzosa tra i due partecipanti Ryan Weaver e Bernhard Schussek nel sostenere le loro opinioni su molteplici domande, alcune delle quali anche stabilite dal pubblico.
Alcuni esempi di domande: Mac vs Linux, [Functional programming](http://engineering.facile.it/programmazione-funzionale-perche-preoccuparsi/) vs [OOP](https://it.wikipedia.org/wiki/Programmazione_orientata_agli_oggetti), Tea vs Coffee, USA vs Europe
Il vincitore Ryan Weaver è stato selezionato dal pubblico in base ad un conteggio di consensi.
È stato un momento divertente con argomenti molto vari anche al di fuori dell'ambito informatico.
<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://x.com/symfony">@symfony</a> vs <a href="https://x.com/laravelphp">@laravelphp</a> debate on <a href="https://x.com/hashtag/ezsummer?src=hash">#ezsummer</a> <a href="https://x.com/hashtag/phpsummer?src=hash">#phpsummer</a> wanna bet on the winner? :-) <a href="http://t.co/f7HXqkoLXU">pic.x.com/f7HXqkoLXU</a></p>&mdash; Igor Vrdoljak (@ivrdoljak) <a href="https://x.com/ivrdoljak/status/636571466104967168">August 26, 2015</a></blockquote>
<script async src="//platform.x.com/widgets.js" charset="utf-8"></script>

<a name="giovedi"></a>
# Giovedì 27 agosto
<a name="coupling"></a>
### Loose coupling in practice (Jakub Zalas)
L'obiettivo della sessione era disaccoppiare l'applicazione [Symfony Demo](http://symfony.com/blog/introducing-the-symfony-demo-application) da [Doctrine ORM/DBAL](http://www.doctrine-project.org/) e di consentire lo switch ad altre strategie di storage.
<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Quite a crowd at <a href="https://x.com/jakub_zalas">@jakub_zalas</a> workshop on loose coupling with <a href="https://x.com/symfony">@Symfony</a>! <a href="https://x.com/PHPSummerCamp">@PHPSummerCamp</a> <a href="http://t.co/KnvqaafRfG">pic.x.com/KnvqaafRfG</a></p>&mdash; Marek ✈ (@super_marek) <a href="https://x.com/super_marek/status/636805256987455488">August 27, 2015</a></blockquote>
<script async src="//platform.x.com/widgets.js" charset="utf-8"></script>
Nonostante il sistema fosse un semplice gestionale per articoli di blog, il lavoro si è subito rilevato molto più lungo e complesso del previsto.
È stato interessante notare come Symfony full-stack abbia numerosi legami "nascosti" con Doctrine. Esempi sono il componente [Security](http://symfony.com/it/doc/current/book/security.html) e il [ParamConverter](http://symfony.com/it/doc/current/bundles/SensioFrameworkExtraBundle/annotations/converters.html).
Si è iniziato nel creare i **repository as services** in modo da consentire la rimozione di qualsiasi riferimento a Doctrine nei controller.
Successivamente sono stati realizzate delle classi ad hoc per i componenti: Security (definizione esplicita dallo UserProvider) e ParamConverter.
In seguito è stato richiesto di implementare una nuova strategia di storage utilizzando [PDO](http://php.net/manual/en/book.pdo.php) e [SQL](https://it.wikipedia.org/wiki/Structured_Query_Language).
Per questo task è stato interessante notare l'uso frequente del design pattern [Adapter](https://it.wikipedia.org/wiki/Adapter_pattern) nonché la definizione di **alias di servizi** per consentire di spostarsi da una modalità di storage all'altra senza troppe modifiche.
L'applicazione comprendeva già numerosi test che consentivano di verificare il corretto funzionamento dell'applicazione anche su differenti driver di persistenza.
Successivamente è stato richiesto di utilizzare il [componente cache di Doctrine](http://doctrine-orm.readthedocs.org/en/latest/reference/caching.html) per introdurre un layer di ottimizzazione tra applicazione e persistenza PDO.
A causa del poco tempo rimasto non è stato possibile affrontare l'ultimo task: implementare una nuova astrazione di storage su [elastic-search](https://www.elastic.co/).
Anche in questo workshop le soluzioni ai problemi erano già presenti nel repository Git. Ciò ha consentito di continuare e approfondire l'argomento anche dopo il termine della sessione.

<a name="puli"></a>
### Next-gen package development with Puli (Bernhard Schussek)
Questa sessione è stata divisa in due parti. La prima è una presentazione del **progetto [Puli](http://docs.puli.io/en/latest/)**. Sono state illustrate le funzionalità dell'applicazione e i problemi che essa risolve.
Puli è un gestore della configurazione di pacchetti che mira a rendere **le librerie PHP più omogenee e più semplici da configurare**. Esso, per funzionare, usa [Composer](https://getcomposer.org/) che continua a gestire il package retrieval e l'autoloading.
<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Finally learning about <a href="https://x.com/hashtag/Puli?src=hash">#Puli</a> from <a href="https://x.com/webmozart">@webmozart</a>. Great stuff! <a href="https://x.com/hashtag/phpsummer?src=hash">#phpsummer</a> <a href="http://t.co/l72oOuwtjY">pic.x.com/l72oOuwtjY</a></p>&mdash; Paweł Jędrzejewski (@pjedrzejewski) <a href="https://x.com/pjedrzejewski/status/636889138252357632">August 27, 2015</a></blockquote>
<script async src="//platform.x.com/widgets.js" charset="utf-8"></script>
Puli consente l'accesso alle risorse di un pacchetto in modo semplice e veloce. Le risorse qualitativamente possono essere molto varie: immagini, template, file per la localizzazione, fogli di stile, basi di dati, ecc.
Puli introduce il concetto di **percorso virtuale**, un nuovo standard per l'accesso alle risorse condivise da uno o più pacchetti.
Ciascun componente Puli definisce dei mappings che consentono di tradurre un percorso virtuale in percorso reale.
Questo significa che è possibile richiedere a Puli una risorsa locata virtualmente in `/vendorName/projectName/config/file.xml` senza conoscere esattamente dove tale risorsa sarà collocata nel file system.
Puli offre inoltre la possibilità di modificare alcune risorse tramite il meccanismo dell'**overriding**.
Similmente al composer.json, la configurazione di Puli risiede nel file puli.json.
Puli è integrabile con altre applicazioni per l'installazione e l'aggiornamento degli assets.
La seconda parte della presentazione è stata dedicata alla pratica.
L'obbiettivo era usare alcuni pacchetti Puli compatibili su un'applicazione [Silex](http://silex.sensiolabs.org/) per concludere lo sviluppo varie funzionalità.
È stato possibile vedere come Puli sia integrabile con altri tool per la gestione degli assets (nell'esercitazione è stato usato [Gulp](http://gulpjs.com/)).
Il format del workshop è stato diverso dal solito: ogni partecipante aveva a disposizione l'elenco dei problemi da risolvere con i relativi tutorial.
Ciò a consentito ai partecipanti di proseguire in autonomia senza ritardi collettivi.

<a name="unconference"></a>
### Unconference
A fine giornata si è svolta la sessione "unconference".
Sono stati trattati diversi argomenti interessanti, tra cui:

 * [**HTTP 2**](https://it.wikipedia.org/wiki/HTTP/2) e gestione migliorata della rete;
 * analisi delle strategie per consumer di [**code di messaggi**](https://en.wikipedia.org/wiki/Message_queue);
 * [**Docker**](https://www.docker.com/) per eseguire applicazioni desktop dotate di GUI.

<a name="venerdi"></a>
# Venerdì 28 agosto
<a name="profiling"></a>
### Profiling PHP Apps (Nicolas Grekas)
Una prima presentazione ha illustrato i concetti fondamentali della [**profilazione**](https://en.wikipedia.org/wiki/Profiling_(computer_programming)).
Sono state esaminate le tecniche principali di collezione delle informazioni: [**function hooks**](https://en.wikipedia.org/wiki/Hooking) e **sampling**, così come diversi tool per la profilazione: [XDebug](http://xdebug.org/), [Xhprof](http://xhprof.io/) e [New Relic](http://newrelic.com/).
Prove pratiche con questi tool hanno consentito di evidenziare le loro peculiarità e differenze. È stato interessante notare, ad esempio, l'accuratezza e la semplicità delle informazioni fornite dalla libreria Xhprof rispetto ai concorrenti.
Le prove pratiche hanno inoltre evidenziato che l'attività di profilazione non è semplice, soprattutto a causa del setup richiesto.
Anche l'interpretazione dei dati restituiti dal profiler può essere problematico: una buona rappresentazione delle informazioni conduce a soluzioni migliori.
Successivamente è stato introdotto il **profiler [Blackfire**](https://blackfire.io/): una collezione di tecnologie che consentono di semplificare l'attività di profilazione.
È stata analizzata la sua struttura interna. Esso è composto da 4 componenti: il server Blackfire, l'agente collettore, l'estensione Php e il companion lato browser per avviare la profilazione.
In seguito si è discusso su come individuare i punti critici dell'applicazione e le strategie per risolvere i problemi.
Ad esempio si è visto che un **autoloader non correttamente ottimizzato** rallenta significamente l'applicazione (sia pensi alla generazione dell'autoload non ottimizzato di Composer).
Le attività di Input/Output superflue causano rallentamenti, esempi sono le scritture sui **log troppo verbosi**.
È stato un workshop davvero completo facilmente comprensibile anche dai principianti della profilazione.

<a name="symfony3"></a>
### Migrating to Symfony 3 (Nicolas Grekas)
Questo workshop ha consentito di apprendere la **roadmap a lungo termine del framework Symfony**.
<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">on the way to symfony 3 at <a href="https://x.com/hashtag/phpsummer?src=hash">#phpsummer</a> with <a href="https://x.com/nicolasgrekas">@nicolasgrekas</a> <a href="http://t.co/vijn5ttzPG">pic.x.com/vijn5ttzPG</a></p>&mdash; dbu (@dbu) <a href="https://x.com/dbu/status/637233201635835904">August 28, 2015</a></blockquote>
<script async src="//platform.x.com/widgets.js" charset="utf-8"></script>
È stato annunciato che l'ultima versione LTS di Symfony 2 sarà **la versione 2.8 completamente compatibile, quanto a funzionalità, con la versione 3.0**.
È interessante notare che non ci saranno cambiamenti stravolgenti per Symfony vesione 3.0: essa infatti rimuove soltanto le funzionalità deprecate nelle versioni precedenti.
Sono stati alresì spiegati i concetti di [versionamento semantico](http://engineering.facile.it/git-flow-semantic-versioning/) adottati dal framework a partire dalla versione 2.3.
L'obiettivo della sessione pratica è stato migrare l'applicazione _Symfony Demo_ alla versione Symfony 3.
Sono state esaminate diverse strategie per rilevare le deprecation: debug toolbar, file di log, fallimenti di test.
È stato inoltre annunciato che sarà presto possibile **definire un servizio come deprecato nel service container**.
Ciò consente all'utente di rilevare subito eventuali utilizzi non corretti già durante la compilazione del container.

<a name="experts"></a>
### Meet the experts
Diversi gruppi di persone si sono riunite per parlare di molteplici argomenti.
<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Ecommerce on Symfony roundtable at <a href="https://x.com/PHPSummerCamp">@PHPSummerCamp</a> <a href="http://t.co/RD8ueJX7Nj">pic.x.com/RD8ueJX7Nj</a></p>&mdash; Ivo Lukač (@ilukac) <a href="https://x.com/ilukac/status/637288188231450625">August 28, 2015</a></blockquote>
<script async src="//platform.x.com/widgets.js" charset="utf-8"></script>
Ciascun gruppo comprendeva, tra gli altri partecipanti, un paio di persone esperte dell'argomento per moderare la discussione.
Io ho partecipato alla discussione di: [**E-commerce**](https://it.wikipedia.org/wiki/Commercio_elettronico) su Symfony (con particolare riguardo a [Sylius](http://sylius.org/)), [**software testing**](https://it.wikipedia.org/wiki/Collaudo_del_software) e **[API](https://it.wikipedia.org/wiki/Application_programming_interface) design**.
È stato interessante discutere su come progettare architetture orientate a microservizi cercando di definire API stabili e solide.
È emerso anche che le **applicazioni monolitiche** evolvono, a lungo termine, verso **design complessi** che hanno frequenti **problemi di manutenibilità**.
A tal proposito si parlava di build CI lente, deploy lento e isolamento delle responsabilità alquanto complessa.
Un confronto tra esperti, il miglior modo per chiudere la giornata.

<a name="conclusione"></a>
# Conclusione
Il PhpSummerCamp è un evento particolare: presentazioni, discussioni, workshop e attività extra lo hanno reso interessante e divertente allo stesso tempo.
Tesi rafforzata dalla continua affluenza di sviluppatori che ogni anno non vogliono perdersi tale evento.
Il SummerCamp è il luogo ideale per chi vuole sentirsi parte delle comunità Php e EzPublish.
