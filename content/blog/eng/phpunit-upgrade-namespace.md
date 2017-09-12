---
authors: ["jean"]
comments: true
date: "2017-09-12"
draft: false
share: true
categories: [English, PHP, Software testing]
title: "How to gradually upgrade toward PHPUnit 6 with namespaced classes"

languageCode: "en-EN"
type: "post"
toc: false
---
In the latest months I wrote multiple times, in different projects, code migrating **PHPUnit** toward major **version 6**. This upgrade is harder than the previous one, since in this version it was introduced a big breaking change: **all classes got (finally!) namespaced**.

This means that any usage of those classes in your project needs to be updated. It may seem a simple find & replace job, but since you need to introduce at least one `use PHPUnit\Framework\TestCase` line at the top of each one of your test classes, it's a boring and a little more than trivial task; also, **upgrading it in a single big jump may not be feasible or prudent**, especially in the case of open source or distributed libraries, where backward compatibility and support for old PHP versions must be ensured.

In this article I will explain which steps I applied during those migrations, highlighting the most frequent hiccups.

## The easy one: only tests
To start with, you have to find all the **usages of PHPUnit classes** in your project: a simple search for every occurrence of the string `PHPUnit_` should be enough at the beginning. You should know that, in some recent versions previous to 6, PHPUnit delivers a **forward compatibility** layer; this means that some of the most extended classes in the library are present also in the namespaced version, so they can be used before upgrading to the fully namespaced version.

If you want to update a simple project, where the only usage of PHPUnit classes is to create tests, you are very lucky. You need to require at **minimum PHPUnit 4.8.35 or 5.4.3**, which includes the FC class `PHPUnit\Framework\TestCase` as an alias for `\PHPUnit_Framework_TestCase`.
 
You should choose the **newest version as possible**, and that depends on which minimum version of PHP you want to support: if you work with (at least) PHP 5.6, you can use PHPUnit 5, otherwise you're forced to use version 4.8.35. If you're working on a (open source) library that needs to support both, you can do this in your `composer.json`:
```json
{
  "require-dev": {
    "phpunit/phpunit": "^4.8.35|^5.4.0"  
  }
}
```  

In this way you can use both, and Composer will choose the most updated one, depending on which PHP version you are using; this is **pretty useful for testing with a CI tool** like Travis, since you should run your tests at least on the lowest and highest versions of PHP that you want to support. 

Once you have required and installed the right version, the only modification that you need to do in your code is this one:

Before:
```php
<?php

class MyTest extends \PHPUnit_Framework_TestCase
{
    // ...
}
```
After:
```php
<?php

use PHPUnit\Framework\TestCase;

class MyTest extends TestCase
{
    // ...
}
```
### Deprecations of PHPUnit 4
Depending on your codebase, you may be forced to do one last step: your tests may be **using deprecated methods from PHPUnit 4**, so you will need to fix those. Those issues are pretty easy to be found and fixed, because they will make your test fail when executed with PHPUnit 5. The full list of changes that may impact you are in the [changelog for version 5.0.0](https://github.com/sebastianbergmann/phpunit/blob/5.7/ChangeLog-5.0.md#500---2015-10-02), but the most notable ones are:

 * you need to declare a whitelist in your `phpunit.xml` configuration file to collect tests coverage
 * you must drop any usage of the `assertSelectCount()`, `assertSelectRegExp()`, `assertSelectEquals()`, `assertTag()`, `assertNotTag()` assertions

## The bumpy one: implementing a TestListener

If in your project you extend other classes or interfaces from PHPUnit, you need to check which one. If we are talking about one of the following:

 * `\PHPUnit_Framework_Assert`
 * `\PHPUnit_Framework_AssertionFailedError`
 * `\PHPUnit_Framework_Test` (interface)
 * `\PHPUnit_Framework_TestSuite`

... then your only requirement is to **use at least PHPUnit 5.7.21**. This means that you have to drop support to any PHP version older than 5.6, if you still support it (and you should!).

If, instead, you implement a `\PHPUnit_Framework_TestListener`, that may be a little trickier. The FC layer for that class is **problematic**, since it's an interface that has a lot of types applied to the methods' arguments; this, combined with the fact that in PHP you cannot change the type of an argument when extending (see [covariance and contravariance](https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science))), means that the FC class is nearly useless: **you cannot be compatible with both** `\PHPUnit_Framework_TestListener` and `\PHPUnit\Framework\TestListener` with the same class.

If you are working on a **single project**, you may just restrict the supported PHPUnit version and jump to the newest one while upgrading the listener too. But if you are working on a library, and you do not want to apply that restriction to your end users, it gets a little complicated.

In my case, while upgrading `facile-it/paraunit`, I preferred [jumping from supporting 4.x/5.x directly to 6.x](https://github.com/facile-it/paraunit/issues/54#issuecomment-302906556); Paraunit works directly on top of PHPUnit, and it works the same before and after this update (apart from new features), so **dropping the old versions altogether** seemed a good enough approach for me.

In other cases, the listener is just provided as an additional help of the main library, so **forcing the end user** to update his version of PHPUnit alongside with our library could be **too harsh** or slow down the adoption of the new release. I tried doing this on [with a pull reques on `friendsofsymfony/http-cache`](https://github.com/FriendsOfSymfony/FOSHttpCache/pull/365), where I had to solve this specific issue. The **only feasible solution** that I've found is this [specific snippet of code](https://github.com/symfony/phpunit-bridge/blob/3c0efb8609a32890a767bbbd39198a0e92572694/SymfonyTestsListener.php#L19), that it was used in `symfony/phpunit-bridge` to overcome the same problem:
```php
if (
    class_exists('PHPUnit_Runner_Version') 
    && version_compare(\PHPUnit_Runner_Version::id(), '6.0.0', '<')
) {
    class_alias('Legacy\MyTestListener', 'MyTestListener');
// Using an early return instead of a else does not work 
// when using the PHPUnit phar due to some weird PHP behavior 
// (the class gets defined without executing the code before it 
// and so the definition is not properly conditional)
} else {
    class MyTestListener extends BaseTestListener
    {
        // ...
    }
}
```
This approach is based on writing two versions of the listener, one (inside a `legacy` subfolder) which implements the old interface, the other that implements the new, namespaced one. With the above snippet, PHP is tricked into loading the right one, after checking if the loaded version of PHPUnit is lower than 6.0. In this way **the end user can ignore the difference between the two classes**, use only the new class name and go on, since they will be switched in a hidden and automatic way.
Once support for the old PHP and PHPUnit versions is dropped, this trick can be dropped too.

## The next step: from 5 to 6
Once all this migration is completed, and all the tests are green under all needed conditions, we can plan for the next step, **upgrading to PHPUnit 6**. In reality, this step depends on a bigger, previous step: **migrate to PHP 7**, because lower versions are no longer supported with PHPUnit 6.

When your project is ready for PHP 7, you can require the installation of PHPUnit 6; if you are working on a library that wants to support PHP 5.6 too, you can use the same trick as above in your `composer.json`:
```json
{
  "require-dev": {
    "phpunit/phpunit": "^5.4.0|^6.0"  
  }
}
```  
... so you'll be using PHPUnit 5 under PHP 5.6, and 6 with PHP 7.0+. As before, you need to check that your tests are still passing, and avoid using any functionality that is deprecated in PHPUnit 5. You can find the full list in the [PHPUnit changelog for 6.0.0](https://github.com/sebastianbergmann/phpunit/blob/6.0/ChangeLog-6.0.md#600---2017-02-03), but the most notable are:

 * `getMock()` must be replaced with `createMock()`
 * usages of `getMockWithoutInvokingTheOriginalConstructor()` are no longer needed, it's the default behavior now
 * if you intervene on global variables, it's better to enable the `--globals-backup` option, to save and restore them between tests (previously it was the default behavior)
 * `setExpectedException()` must be replaced:

```php
// before
$this->setExpectedException(Exception::class, $message);
// after
$this->expectException(Exception::class);
$this->expectExceptionMessage($message);
```

And that's all! I hope to make you save enough time and migraines with this little guide. Happy coding!
