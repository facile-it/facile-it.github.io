---
authors: ["luca"]
comments: true
date: "2015-09-28"
draft: false
share: true
categories: [Italiano, PHP, Open Source, Python, Networking, Websocket, Symfony]
title: "WAMP, Web Application Messaging Protocol.. e PHP!"

languageCode: "it-IT"
type: "post"
aliases: 
  - "/wamp-web-application-messaging-protocol-e-php"
---

Dalle notifiche di Facebook ad un tweet stream, da Google Docs ai giochi multiplayer in HTML5, la necessità di uno **scambio dati** in **due direzioni**, **efficiente** e a **bassa latenza**, ha determinato l’ascesa negli ultimi anni di **soluzioni basate su {{< url-link "WebSocket" "https://www.websocket.org/" "_blank">}}**.

Internet delle cose e web 2.0 trovano oramai sempre **meno spazio** all’interno del protocollo **HTTP/1**. Le tecniche di **polling e long polling**, in voga fino a pochi anni fa, non permettevano di trasmettere in {{< url-link "full duplex" "https://it.wikipedia.org/wiki/Duplex" "_blank">}} (tra server e client) contemporaneamente, erano costrette ad un alto overhead HTTP e richiedevano **diversi sforzi** per simulare notifiche push server side.

## Il protocollo WAMP

**{{< url-link "WAMP" "http://wamp.ws/" "_blank">}}** (Web Application Messaging Protocol e non Windows, Apache, etc.!) offre un moderno **pattern di messaggistica** {{< url-link "RPC" "https://en.wikipedia.org/wiki/Remote_procedure_call" "_blank">}} e {{< url-link "Pub/Sub" "https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern" "_blank">}} in maniera unificata. Registrato presso lo {{< url-link "IANA" "https://en.wikipedia.org/wiki/Internet_Assigned_Numbers_Authority" "_blank">}} come sottoprotocollo WebSocket, definisce uno **standard aperto** per lo scambio di **messaggi in tempo reale** tra applicazioni e componenti, e permette la creazione di architetture **debolmente accoppiate** basate su **microservizi**. Utilizza canali full-duplex ordinati ed è quindi adatto ad implementazioni basate su WebSocket, ma supporta allo stesso modo socket Unix, socket raw o long polling HTTP.

Il protocollo risulta piuttosto **completo ed adeguato** a diversi scenari di utilizzo se comparato ad altri sistemi di messaggistica ed RPC.

<table>
<tbody>
<tr>
<th>Technology</th>
<th>PubSub</th>
<th>RPC</th>
<th>Routed RPC</th>
<th>Web native</th>
<th>Cross Language</th>
<th>Open Standard</th>
</tr>
<tr>
<td>WAMP</td>
<td>✔</td>
<td>✔</td>
<td>✔</td>
<td>✔</td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td>AJAX</td>
<td></td>
<td>✔</td>
<td></td>
<td>✔</td>
<td>✔</td>
<td></td>
</tr>
<tr>
<td>AMQP</td>
<td>✔</td>
<td>✔</td>
<td></td>
<td></td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td>REST</td>
<td></td>
<td>✔</td>
<td></td>
<td>✔</td>
<td>✔</td>
<td></td>
</tr>
<tr>
<td>SOAP</td>
<td></td>
<td>✔</td>
<td></td>
<td>✔</td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td>Socket.io</td>
<td>✔</td>
<td></td>
<td></td>
<td>✔</td>
<td></td>
<td></td>
</tr>
<tr>
<td>SockJS</td>
<td></td>
<td></td>
<td></td>
<td>✔</td>
<td>✔</td>
<td></td>
</tr>
<tr>
<td>XMPP</td>
<td>✔</td>
<td></td>
<td></td>
<td>✔</td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td>ZeroMQ</td>
<td>✔</td>
<td></td>
<td></td>
<td></td>
<td>✔</td>
<td></td>
</tr>
</tbody>
</table>
*fonte: Wikipedia*

Può essere utilizzato con profitto per sviluppare una piattaforma di gioco **online multiplayer**, strumenti di **business intelligence** real time e **piattaforme collaborative** per numerosi utenti.

Una piattaforma web di help desk ad esempio, può beneficiare di notifiche, chat, strumenti di scrittura multi-utente ed analisi dell’andamento in tempo reale  **sullo stesso protocollo WAMP**.

Per funzionare WAMP necessità di uno o più server di **routing centralizzati**, allo stesso modo di **RabbitMQ per AMQP**.
Per quanto esistano diverse implementazioni di router, in diversi linguaggi, lo standard *de facto* è rappresentato da **{{< url-link "Crossbar" "http://crossbar.io/" "_blank">}}**, sviluppato da {{< url-link "Tavendo" "http://tavendo.com/" "_blank">}}, alla quale si deve anche la **definizione del protocollo** stesso.


## Crossbar

Crossbar, scritto in python ({{< url-link "open source" "https://github.com/crossbario/crossbar" "_blank">}}, licenza AGPL v3), supporta completamente le funzionalità descritte dal protocollo oltre a vantare **configurazioni avanzate** come ad esempio le subscriptions {{< url-link "basate su pattern" "http://crossbar.io/docs/Pattern-Based-Subscriptions/" "_blank">}}, le {{< url-link "progressive result" "http://crossbar.io/docs/Progressive-Call-Results/" "_blank">}} su RPC e profili di autenticazione ed {{< url-link "autorizzazione" "http://crossbar.io/docs/Authorization/" "_blank">}} dinamici.

Nessuna delle altre implementazioni è poi al momento in grado di vantare le stesse **prestazioni** e la **stabilità** di Crossbar: una istanza del router è in grado di servire 1000 messaggi/secondo su Pub/Sub, a 1000 client, con una **latenza di 25ms** su una **RaspberryPi**!

<table>
<tbody><tr>
<th>Router</th>
<th>Broker</th>
<th>Dealer</th>
<th>Advanced Profile</th>
<th>Language</th>
</tr>
<tr>
<td>Crossbar</td>
<td>✔</td>
<td>✔</td>
<td>✔</td>
<td>Pyhton</td>
</tr>
<tr>
<td>Thruway</td>
<td>✔</td>
<td>✔</td>
<td>✔</td>
<td>PHP</td>
</tr>
<tr>
<td>wamp.rt</td>
<td>✔</td>
<td>✔</td>
<td>✔</td>
<td>NodeJS</td>
</tr>
<tr>
<td>jawampa</td>
<td>✔</td>
<td>✔</td>
<td></td>
<td>Java</td>
</tr>
<tr>
<td>WampSharp</td>
<td>✔</td>
<td>✔</td>
<td></td>
<td>C#</td>
</tr>
<tr>
<td>Erwa</td>
<td>✔</td>
<td>✔</td>
<td></td>
<td>Erlang</td>
</tr>
</tbody>
</table>
*fonte: WAMP.ws*

## ..e PHP?

Diverse applicazioni web di backend usate presso Facile.it permettono ad un gran numero di operatori di lavorare sulle stesse pratiche in maniera collaborativa in **tempo reale**.
Il protocollo WAMP è una tecnologia sulla quale è possibile sviluppare in maniera efficiente **dashboard collaborative** e realtime.. ma sarà anche in grado di funzionare adeguatamente assieme alle soluzioni PHP (spesso in Symfony 2) sviluppate in casa e **non precedentemente disegnate per l'uso con WebSocket**?

Esistono diverse librerie (come {{< url-link "Thruway" "https://github.com/voryx/Thruway" "_blank">}}) che permettono di operare come **client PHP** in ambiente WAMP, ma per **semplificare** l'integrazione del protocollo con altri servizi, Crossbar supporta il **{{< url-link "bridge HTTP" "http://crossbar.io/docs/HTTP-Bridge-Services/" "_blank">}}** delle funzionalità Pub/Sub e RPC.

In pratica, parlando ad esempio di Pub/Sub, è possibile **pubblicare via HTTP** (o HTTPS) su Crossbar messaggi che saranno inoltrati su topic ai **client connessi via WebSocket** in maniera trasparente. Altresì è possibile **iscriversi ai topic** fornendo un **endpoint HTTP** da chiamare per ricevere i messaggi pubblicati da client WebSocket.

L'esempio sottostante configura un router Crossbar in grado di accettare connessioni websocket, pubblicazioni via HTTP e che si occupa di forwardare alcuni messaggi ad un endpoint HTTPS:

<style type="text/css">
  .gist-file
  .gist-data {max-height: 500px;}
</style>
<script src="https://gist.github.com/peelandsee/51417b3c7c1dc400e85f.js"></script>

Il gist precedente può essere lanciato al volo con {{< url-link "docker" "https://docs.docker.com/" "_blank">}}:
`docker run -p 80:80 -p 8080:8080 -v $PWD/crossbar-config.json:/.crossbar/config.json vinelab/crossbar`.

Ovviamente l'esempio non tiene conto di profili di configurazione più avanzati, come **cifratura TLS**, autenticazione, ruoli separati di pubblicazione e/o iscrizione, disponibili nella documentazione di Crossbar.

Features come la firma delle richieste HTTP, richiedono più di qualche minuto di sviluppo, ma sono indispensabili in un **ambiente di produzione**.

Per semplificare l'adozione del bridge HTTP in **ambito PHP**, in Facile.it abbiamo sviluppato e rilasciato un **bundle** che permette la configurazione automatica di **servizi di Publisher WAMP nel service container** di Symfony 2.

Il bundle, disponibile su {{< url-link "Packagist (composer)" "https://packagist.org/packages/facile-it/crossbar-http-publisher-bundle" "_blank">}} può essere installato con
`$ composer require facile-it/crossbar-http-publisher-bundle dev-master`
e richiede una **configurazione rapida** ed intuitiva:

```
facile_crossbar_http_publisher:
  connections:
    foo_publisher_1:
        protocol: http
        host: 127.0.0.1
```
L'uso è molto semplice:
```
// recupero del servizio
$fooPublisher = $container
                ->get('facile.crossbar.publisher.foo_publisher_1');

$topic = 'com.myapp.hello';

// pubblicazione
$firstPublisher->publish($topic, ['foo',1]);
```

Con le poche righe sopra riportate, attraverso il metodo `publish()` viene effettuata una **chiamata HTTP POST** verso il router WAMP, ed il messaggio `['foo',1]` raggiunge in tempo (quasi) reale tutti i client (ad esempio **tutti i browser degli utenti**) iscritti al topic `com.myapp.hello`.

Anche in questo caso, la {{< url-link "configurazione" "http://crossbar.io/docs/Processes/" "_blank">}} può supportare diversi host, porte, uso TLS, signed request, e attraverso GitHub è possibile trovare {{< url-link "diversi esempi" "https://github.com/crossbario/crossbarexamples" "_blank">}} di **possibili configurazioni**.

## ..ma i miei utenti lo supporteranno?

Lato browser, passare a WAMP è davvero **semplice**:
la libreria **{{< url-link "Autobahn|JS" "http://autobahn.ws/js/" "_blank">}}** garantisce piena **compatibilità** anche per {{< url-link "node.js" "https://nodejs.org/en/" "_blank">}}, supporta l'autenticazione, ed è in grado di gestire in maniera **asincronia** sia RPC che Pub/Sub.

Qualora il browser di un vostro utente non supportasse WebSocket (e {{< url-link "dovrebbe" "http://caniuse.com/#feat=websockets" "_blank">}} oramai!), Autobahn|JS è in grado di fornire un **fallback automatico** a long polling.

Iscriversi ad un topic o pubblicare un messaggio richiede poche linee:

<script src="https://gist.github.com/peelandsee/c853bc3fd3971e78527c.js"></script>

Nell'esempio sopra riportato, il client JS **si iscrive** al topic `com.myapp.hello` e passa i messaggi ricevuti ad una semplice funzione `console.log()`; inoltre **pubblica un messaggio** sul topic `com.myapp.topic1`. Quest'ultimo, sarà anche **forwardato da Crossbar sul nostro endpoint HTTPS** `https://hostname/subscriptions`.  

Grazie alle **funzionalità HTTP bridge** di Crossabar l'utilizzo di WAMP in ambito PHP, senza connessioni persistenti o consumer sempre accesi, è **semplice ed immediato**!

Per un ulteriore **approfondimento su WAMP**, saranno inoltre utili le slide che seguono:

<iframe src="//www.slideshare.net/slideshow/embed_code/key/MEmo82CFgt1xND" width="700" height="550" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen></iframe>

## Riferimenti

 * [WAMP Protocol](http://wamp.ws/)
 * [Crossbar - Documentazione](http://crossbar.io/docs/TOC/)
 * [Crossbar - HTTP Bridge](http://crossbar.io/docs/HTTP-Bridge-Services/)
 * [Autobahn|JS - Documentazione](http://autobahn.ws/js/)
 * [Facile.it CrossbarHTTPPublisherBundle - GitHub](https://github.com/facile-it/crossbar-http-publisher-bundle)
