---
authors: ["AndreaRR18"]
date: "2020-03-24"
draft: true
share: true
categories: [English, Operators]
title: "Operators overview"
type: "post"
languageCode: "en-EN"
toc: true
---

# Operators overview
Operators are useful constructors and they are present in most programming languages. They are fundamental for much operations and in this article we will make an overview to better understand their properties.

This article is the first in a series of two about operators. Here we will do an overview of the main operators properties and in the next one we will discuss about some custom operators that we use in our production code.

# Definition

**An operator is a special symbol or expression that is used to check, change or combine values. Most programming languages support their construct and we can considered them like a functions but with a different syntax and semantic.**

Usually we use operators for arithmetics operations (+, -), logic (&&, ||) and comparison (==, >), but we also consider other types of operators including assignment and variable access operators.
Parameters that we pass to the operators are called **operands**.

There are three different types of operators:
* **Unary**: takes a single parameter placed before (prefix) or after (postfix) it.
* **Binary**: takes two parameters, it is placed between them. It’s also called infix operator.
* **Ternary**: takes three parameters, the first operand is a predicate and based on its result evaluate the first operand or the second.

# User defined operators
Some programming languages (e.g.: Haskell, F#, Swift, ...), allow to define custom operators with special symbols, some other languages (Kotlin, Pascal, ...) allows to define literal operators, in both cases we have to define a function that will be executed when we use some operator.
Other kind of programming languages allow operator overloading, this operation is identified like ad hoc polymorphism. **Ad hoc polymorphism** is a kind of polymorphism in which an operator can be applied to arguments of different types because a polymorphic operator can denote a different implementations depending on the type of arguments.

Operator overloading is to declare with the same name in the same scope, except that both declarations have different arguments type and different implementation.

# Operator syntax
Syntactically the declaration of an operator is like a function definition.  We can think of function as a prefix operator whose operands are the parameters passed in the parentheses or we can think about an operator as a function that takes one or two parameters as input.

As seen before we have three types of operators and their type depends on the position (prefix, postfix and infix), on their airiness (unary, binary and ternary), on their precedence and associativity. Let's see some examples:
 - **prefix**: !condition
 - **binary**: conditionA || conditionB
 - **ternary**: condition ? firstExpression : secondExpression

# Operator semantic
The semantic of an operator depends by its value, implementation and arity. An expression can involve an operator and simply return the result of an evaluation or may be an object allowing assignment.

There are some operators with an explicit semantic, like + or ==, than based on the context, perform an evaluation and return. However the semantics can be significantly different for example the assignment operator (var a = b), does not perform an evaluation, but it is used to store a value in a location address.


# Operator Properties

## Associativity
The associativity of an operator is a property that determines how operators of the same precedence are grouped in absence of parentheeses. The choice of which operations to apply to the operand, is determinated by the associativity of the operators. An operator can have the association property left, right, full or non-associative.

An operator is **left associative** if its application in an expression can be grouped together from left to right without affection the expression's meaning, while it is said to be **right associative** if its application in an expression can be grouped together from right to left it is right-associative.

An operator can be **full associative** if it is both left and right associative, in other words, it doesn't matter where you place the parentheses, the expression's evaluation always results in the same value.

Also, an operator could be **non-associative** this means that the operator cannot be chained with other operators, often because the output type is incompatible with the input types.

The associativity of an operator is important because it can change the result of an expression:
```
let left = (7 - 1) - 3 //3
let right = 7 - (1 - 3) //9
```

## Precedence
The operator **precedence** (aka operator binding) is a collection of rules that reflect conventions about which procedures perform first in order to evaluate a given expression. This conventions are very useful to eliminate ambiguity while we perform an expression with a group of operators.

## Operand coercion
Some languages also allow to the operands of an operator to be implicitly converted, or coerced, to suitable data types for the operation to occur.

For example, in Perl coercion rules lead into 12 + "3.14" producing the result of 15.14. The text "3.14" is converted to the number 3.14 before addition can takes place. Further, 12 is an integer and 3.14 is either a floating or fixed-point number (a number that has a decimal place in it) so the integer is then converted to a floating point or fixed-point number respectively.
```Perl
$firstValue = 12;
$secondValue = "3.14";
print $firstValue + $secondValue; // 15.14
```
JavaScript follows opposite rules—finding the same expression above, it will convert the integer 12 into a string "12", then concatenate the two operands to form "123.14".
```JavaScript
let firstValue = 12;
let secondValue = "3.14";
print(firstValue+secondValue); // "123.14"
```
In the presence of coercions in a language, the programmer must be aware of the specific rules regarding operand types and the operation result type to avoid subtle programming mistakes.


# Common operators

## Access operator
#### Symbol -> .

**Access operator** is used for to access a member of a namespace or a type (type.member). For example we can use access operator to access a nested namespace  String.Indices or to access type members static and non-static.

## Scope resolution operator
#### Symbol -> ::
The **scope resolution operator**, helps to identify and specify the context which an identifier refers.

## Indexer operator
#### Symbol -> [ ]
The **indexer operator** is typically used to access a variable in a sequence or in a pointer element access.

## Null-conditional operators
#### Symbols -> ?. , ?[ ]
**Null-conditional** operators allow access to a member only if that operand evaluates to non-null; otherwise, it returns null.

## Compound Assignment Operators
#### Symbols -> += , -=, *=, /=, %=, &=, |=, ^=, ...
**Compound assignment operators** provide a shorter syntax for assigning the result for an arithmetic and bitwise operator. They perform the operation on the two operands before assigning the result to the first operand.
For example  x += 2  is a shortcut for  x = x + 2.

## Invocation operator
#### Symbol -> ()
The invocation operator () call a method or invoke a delegate.

## Relational operator
The relational operator are constructs that define a type of relationship between two entities, this definition includes both equality and inequality.

An expression built with relational operators is called conditional expression and expressions of this type are defined **predicates**. If the language support the Boolean type (es. Java, PHP) the relational operator returns a true/false value, instead in other languages like C the relational operator returns 0 or 1, where the 0 correspond to false value and 1 to the true value.

In some dynamically typed languages, equality can also be done at the type level, for example:
• 4 === “4” is false because the left operand is an integer and the second is a string
• 4 == “4” is true because the both operands are 4


## Logical operator
#### Symbols -> && , || , !
Conditional logical operators modify or combine true or false boolean logical values.
The main conditional logic are:
* AND (a && b)
* OR (a || b)
* NOT (!a)

The AND operator creates a logical expression that returns a boolean, this expression return true if and only if both the left and right operands are true. During the evaluation of the result, on the first false operand encountered the AND operator return false without evaluate the rest of operands.
true && true && true  //true
true && false && true  //false

The logical OR operator creates a logical expression that returns a boolean, this expression return true if at least one of the operands is true. In most cases if left-hand operand is evaluated true, the right-hand operand is not evaluated.
false || false || true  //true
false || false || false  //false

The logical exclusive OR operator, also know as the XOR,  creates a logical expression that returns a boolean, this expression return true if the right and left operands are different.
true ^ true //false
false ^ true //true
true ^ false //true
false ^ false //false

The logical NOT operator is a prefix operator that reverse the boolean value of the operand.
!true //false

All the operators can be composed tighter to compose more complex expressions. This composition is possible because all the operators have the left associativity property. Otherwise we should use the parentheses.

## Ternary operator (Elvis operator)
#### Symbol -> ? :
In some programming languages the **Elvis operator** is declared like ?: or ||. It is a conditional operator with three operands, the first operand is a predicate, the other two operands are expressions.
If the predicate return true the operator performs the first expression, otherwise it performs the second expression.
```
condition ? firstExpression : secondExpression
```

## Null - Coalescing Operator
#### Symbol -> ??
The **null-coalescing** operator (a ?? b) return the wrapped value in the optional type if it exists, otherwise the operator returns the right operand. The wrapped type on the left and the type of the right operands are the same.
This operator is a shortcut to avoid the if and the force cast when we try to unwrap an Optional type, for example the expression:
```
a != null ? a! : b
```
 with coalescing operator becomes:
```
 a ?? b
 ```
If the value is non-null, the b value is not evaluated, this is also know as short-circuit evaluation.

## Range operators
#### Symbols -> ... , ..<
Some programming languages support the range operators, this operators are a shortcut to work with the range values. The main types are:
• Closed range (a...b): define a range from a to b, both a and b are included into the range
• half-open range (a..<b): define a range from a to b, the b value is not included into the range
• one-side ranges elementList[...2]:  this prefix operator work with array indices and when we used it, the output is an ArraySlice with all the elements in the elementList until the third value.

## Identity operator
#### Symbols -> === , !==
The identity operator  (=== and !==) compares directly the memory reference of two objects, it returns true if the two objects have the same memory address, false otherwise.

# Conclusion
Operators are useful developer tools available to the developer, knowing their potential allows you to make complex assessments in a few lines of code. In the next article we will create custom operators by introducing new concepts and we will explore the potential of operators even more in detail.

# References

* [Wikipedia](https://en.wikipedia.org/wiki/Operator_(computer_programming)
* [Swift basic operators](https://docs.swift.org/swift-book/LanguageGuide/BasicOperators.html)
* [C# operators](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/)
