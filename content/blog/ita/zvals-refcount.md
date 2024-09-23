---
authors: ["lorenzo"]
comments: true
date: "2015-03-02"
draft: false
share: true
categories: [Italiano, PHP, PHP internals]
title: "ZVALs refcount AKA come vengono memorizzate le nostre variabili"

languageCode: "it-IT"
type: "post"
aliases: 
  - "/zvals-refcount"
---
Assegnare valori alle variabili è sicuramente l'operazione più comune all'interno di uno script PHP. Ma come vengono conservate queste informazioni dall'interprete? Vediamolo assieme!

L'unità fondamentale di storage dei dati in PHP è la Zend Value (zval). Si tratta di una struct definita alla [linea 334 di `zend.h`](https://github.com/php/php-src/blob/ae15e636e2b213bf748fa0b94ca95ac96d6eae3a/Zend/zend.h#L334-L340), la riporto qui di seguito per commentarne le proprietà.

<!--more-->

```
struct _zval_struct {
	zvalue_value value;	 /* Il valore assegnato alla variabile */
	zend_uint refcount__gc; /* Il conto delle referenze legato alla variabile */
	zend_uchar type;	/* L'identificativo del tipo di dato */
	zend_uchar is_ref__gc; /* Flag che indica se la variabile è o meno una referenza */
};
```

Il tipo di dato `zvalue_value` non è altro che una union contenente tutti i tipi di dato gestiti da php, per questo **ogni variabile** che instanziamo in PHP, sia essa un intero o una stringa occuperà comunque lo **stesso spazio in memoria** richiesto per il tipo di dato più grande.


Per mostrare come php gestisce l'allocazione delle variabili vediamo un semplice esempio:

```
$a = 1; // value=1, refcount=1
$b = $a; // value=1, refcount=2
$a++;    // value=2, refcount = 1
$c = $b; // value=1, refcount=2
```

Cosa succede qui? 

- `$a` viene allocata con valore `1`, e quindi per la variabile `$a` il refcount viene 
impostato a 1.

- Il valore di `$a` viene assegnato anche a `$b`, quindi PHP per evitare di sprecare memoria assegna la stessa zval anche a `$b`, aumentando di 1 il refcount.

- `$a` viene incrementato di `1`,

- Essendo il valore della zval di `$a` è cambiato, php crea una nuova zval per `$b` e `$c`

- Ora la zval di `$a` appartiene solo ad `$a` con valore `2` e refcount `1`

- `$b` ha una nuova zval con valore `1` e refcount `1`

- Essendo la zval di `$c` è la stessa di `$b` la zval di `$c` ha valore `1` e refcount `2`


