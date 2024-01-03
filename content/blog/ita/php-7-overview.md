---
authors: ["lorenzo"]
comments: true
date: "2015-07-06"
draft: false
share: true
categories: [Italiano, PHP]
title: "PHP 7 Overview"

languageCode: "it-IT"
type: "post"
aliases:
  - "/php-7-overview"
---
Il linguaggio che ha contribuito alla nascita e alla crescita di più del 80% dei siti web oggi online, tra i quali alcuni dei più famosi al mondo, è prossimo a una svolta.

Secondo la [timeline ufficiale](https://wiki.php.net/rfc/php7timeline) PHP 7 sarà rilasciato intorno al **15 Ottobre 2015**: chi volesse provarlo in anteprima, tuttavia, può trovare binari, rpm, deb, dockerfiles e quant'altro su [php7.zend.com](http://php7.zend.com/).

La release 7 costituisce una delle più importanti per PHP, sia in termini di funzionalità che di performance.

Nell'ultimo anno il team degli internals ha affrontato innumerevoli sfide, tra cui:

- Implementazione dell'[Abstract Syntax Tree](http://c2.com/cgi/wiki?AbstractSyntaxTree);
- Riscrittura di grosse porzioni dello **Zend Engine** che ora può beneficiare di nuove strutture dati e gestione delle risorse ottimizzata;
- Disposizione di solide basi per aprire il linguaggio a futuri miglioramenti come la [Just in Time Compilation](https://en.wikipedia.org/wiki/Just-in-time_compilation);
- Implementazione di un corposo set di nuove feature, come vedremo a breve.

## Performance

Sull'onda degli ottimi risultati ottenuti dal team di HHVM, anche il team degli internals ha iniziato a lavorare estensivamente al miglioramento delle performance dell'implementazione originale di PHP. Gli impressionanti risultati (si parla di un miglioramento di circa il 100%) sono stati dimostrati da vari benchmark fatti sui vari CMS/Framework esistenti. Eccone di seguito due tra i più significativi:

- [Benchmark di Rasmus Lerdorf, 12 Marzo 2015, Sydney, Australia](http://talks.php.net/oz15#/boxspecs) - Benchmark su vari CMS/Applicativi scritti in PHP in esecuzione sulle varie versioni di PHP e HHVM
- [Infografica Zend](https://pages.zend.com/rs/zendtechnologies/images/PHP7-Performance%20Infographic.pdf) - Benchmark di vari CMS/Framework (Magento 1.9, Wordpress, Drupal, Zend Framework 2, Laravel) su PHP 5.6 PHP 7 e HHVM 3.7. Contiene inoltre una comparazione tra PHP e altri linguaggi di scripting.

## Features

Qui di seguito riportiamo alcune delle feature che ci hanno colpito maggiormente; l'elenco seguente non è da considerarsi esaustivo rispetto a tutte le feature di PHP 7: una lista completa di tutte le RFC può essere trovata [qui](https://wiki.php.net/rfc#php_70).


### Null Coalesce operator
PHP RFC: [Null Coalesce Operator](https://wiki.php.net/rfc/isset_ternary)

Il Null Coalesce operator (`??`) ritorna l'operando di sinistra se questo non è `null`, altrimenti ritorna l'operando di destra. Esso di fatto rappresenta un'abbreviazione dell'utilizzo di `isset()` in un operatore ternario.

```
<?php
$name = $_GET[’name’] ?? "Name";
// equivalente a
$name = isset($_GET[’name’]) ? $_GET[’name’] : "Name";
```
[▶ Demo](http://3v4l.org/SnCQY)

### Uniform Variable Syntax
PHP RFC: [Uniform Variable Syntax](https://wiki.php.net/rfc/uniform_variable_syntax)

PHP 7 Introduce una nuova e più consistente sintassi delle variabili, che apre le porte ad alcuni nuovi modi di costruire le espressioni, come mostrato nei due esempi di seguito. Una lista più completa di esempi può essere trovata al link del RFC.

**Annidare chiamate di funzione**
```
<?php
$sum = function($l) {
    return function($r) use ($l) {
        return $l + $r;
    };
};

echo $sum(4)(2); // 6
```
[▶ Demo](http://3v4l.org/mZHt3)

**Effettuare una chiamata a metodo su un array contenente una coppia di oggetto: nome metodo.**
```
<?php

class Person
{
    public function getName()
    {
        return "Lorenzo";
    }
}

$p = new Person();
echo [$p, 'getName']();
```
[▶ Demo](http://3v4l.org/bEU7t)


### Group use declarations
PHP RFC: [Group Use Declarations](https://wiki.php.net/rfc/group_use_declarations)
```
<?php
use Zend\ModuleManager\ModuleEvent;
use Zend\ModuleManager\ModuleManagerInterface;
```
Equivale a
```
<?php
use Zend\ModuleManager\{
    ModuleEvent,
    ModuleManagerInterface
}
```

### Combined Comparison operator
PHP RFC: [Combined Comparison (Spaceship) Operator](https://wiki.php.net/rfc/combined-comparison-operator)

Il Combined Comparison operator (aka *Spaceship Operator*) è il nuovo operatore che mette in relazione i due operandi restituendo:

- `-1` se l'operando di sinistra è minore dell'operando di destra
- `1` se l'operando di sinistra è maggiore dell'operando di destra
- `0` se gli operandi sono uguali

```
<?php
echo 100 <=> 200; // -1
echo 200 <=> 100; // 1
echo 200 <=> 200; // 0
```
[▶ Demo](http://3v4l.org/PV5kq)

### Context sensitive lexer
PHP RFC: [Context Sensitive Lexer](https://wiki.php.net/rfc/context_sensitive_lexer)

Allo stato attuale PHP ha circa 64 keyword riservate globalmente.
In PHP 7 questo comportamento è stato cambiato rendendo alcune keyword **riservate solo in maniera parziale.**

Nell'esempio vediamo come sia possibile dichiarare due metodi chiamati `list` e `forEach`. Questo non è possibile in PHP<7.0.0 per via del fatto che queste due keyword sono riservate globalmente e non parzialmente.

```
<?php
class Collection {
    public function forEach(callable $callback) {}
    public function list() {}
}
```

### Anonymous classes
PHP RFC: [Anonymous Classes](https://wiki.php.net/rfc/anonymous_classes)

PHP 7 introduce la possibilità di creare classi anonime che sono particolarmente utili, ad esempio nel caso in cui si abbia la necessità di implementare un'interfaccia per l'utilizzo immediato della classe stessa come dipendenza di un'altra classe.

Vediamo due esempi contrapposti, uno con named class e uno con classe anonima, assumendo di avere una classe `PersonNamePrinter`che accetta nel proprio costruttore instanze di`PersonInterface`. `PersonInterface` richiede di implementare il solo metodo `getName()`.

```
<?php
class SpecificPerson implements PersonInterface
{
   public function getName()
   {
        return "Lorenzo";
   }
}

```

```
$person = new SpecificPerson()
echo new PersonPrinter($person);
```

equivale a 

```
<?php
echo new PersonPrinter(new class implements PersonInterface {
    public function getName()
    {
        return "Lorenzo";
    }
});
```

### Scalar type hints

PHP RFC: [Scalar Type Hints](https://wiki.php.net/rfc/scalar_type_hints)

Questa feature introduce la possiblità di dichiarare il tipo di dato del parametro di una funzione utilizzando anche i nuovi tipi di dato scalari `int`, `float`, `string` e `bool`.

È possibile rendere i parametri rigorosi (strict) facendo **iniziare lo script con lo statement preposto a mutare questo comportamento**:
```
<?php
declare(strict_types=1)
```

Vediamo un esempio:

```
<?php

function printIntValue(int $value)
{
    var_dump($value);
}

printIntValue(5.9); // int(5)
```
[▶ Demo](http://3v4l.org/bp1Xt)

Nell'esempio precedente stiamo dichiarando una funzione `printIntValue` la quale richiede che `$value` sia di tipo `int`; quindi andiamo a chiamare la funzione stessa passando invece `$value` come `float(5.9)`.
Siccome al primo statement non abbiamo dichiarato i tipi come rigorosi, PHP costringerà il casting del valore passato a `int`, troncando la parte dopo la virgola e convertendolo in `int(5)`. Se invece avessimo dichiarato i tipi come rigorosi avremmo ottenuto un `TypeError`.


### Return Type Declarations

PHP RFC: [Return Type Declarations](https://wiki.php.net/rfc/return_types)
In PHP 7 è stata introdotta la possiblità di dichiarare il tipo di ritorno di una funzione.
Alcuni vantaggi di questa feature sono:

- Previene valori di ritorno non intenzionali;
- Documenta i tipi di ritorno in maniera strict, diversamente da come è oggi con i commenti e phpdoc.

Vediamo un esempio:

```
<?php
class DateTimeGenerator
{
    public function getDateTime() : \DateTime
    {
        return new \DateTime();
    }
}
```

[▶ Demo](http://3v4l.org/3QXVK)

Nell'esempio precedente abbiamo dichiarato una classe `DateTimeGenerator` che contiene un metodo `getDateTime()` che deve ritornare necessariamente un'instanza di `\DateTime`. Nel caso questo non avvenisse otterremmo ancora una volta un `TypeError`.


### Bind Closure on Call
PHP RFC: [Closure::call](https://wiki.php.net/rfc/closure_apply)

In PHP 5.4 era già possibile fare il binding dello scope di una classe all'interno di una closure utilizzando [Closure->bindTo()](http://php.net/manual/en/closure.bindto.php) e [Closure::bind()](http://php.net/manual/en/closure.bind.php). Questo metodo richiedeva però la creazione di una closure intermedia che facesse da *collante* tra l'invocazione della closure e il binding dello scope dell'oggetto.
Questo non è più richiesto in PHP 7, dove è stato introdotto il metodo `Closure::call` che permette di eseguire insieme i due step rendendo il tutto molto più compatto ed elegante.

```
<?php

class DummyClass {private $value = 1;}

// Before PHP 7
$getValueCallBack = function() {return $this->value;};
$getValue = $getValueCallBack->bindTo(new DummyClass, 'DummyClass');
echo $getValue();

// From PHP 7
$getvalue = function() {return $this->value;};
echo $getValue->call(new DummyClass);
```

[▶ Demo](http://3v4l.org/YKtPC)


### Filtered Unserialize
PHP RFC: [Filtered Unserialize](https://wiki.php.net/rfc/secure_unserialize)

Questa feature permette di prevenire eventuali injection abilitando l'opzione di impostare una lista di classi per le quali è possibile fare l'unserialize.
Tutte le classi non presenti nella lista saranno convertite nell'oggetto incompleto `__PHP_Incomplete_Class`.

Nell'esempio seguente il contenuto di `$foo` verrà deserializzato solo se `$foo` sarà instanza di `OnePossibleClass` o di `AnotherPossibileClass`, altrimenti verrà convertito in `__PHP_Incomplete_Class`
```
$data = unserialize($foo, ["allowed_classes" => ["OnePossibleClass", "AnotherPossibileClass"]);
```

## Conclusioni

Ora andate! Testate le vostre applicazioni su PHP 7 e, se potete, aiutate a migrare le estensioni. Non sapete come fare? No problem, chiunque può iniziare a fare qualcosa con i giusti punti di partenza.

Ecco alcune risorse utili:

- [GoPHP7-ext](http://gophp7.org/gophp7-ext/) Progetto che supporta la migrazione delle estensioni verso PHP 7, raccogliendo risorse e consigli utili ad ottenere questo scopo.
- [Getting started with PHP Extensions development](http://spaghetti.io/cont/article/getting-started-with-php-extensions-development/52/1.html) - Un mio breve articolo (in inglese) su come scrivere la propria prima estensione PHP.

Se il post vi è piaciuto non dimenticate di condividerlo e di commentarlo qui sotto o su twitter menzionando [@FacileIt_Engr](https://x.com/FacileIt_Engr).
