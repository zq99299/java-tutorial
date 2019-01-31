# 总结

大多数情况下，如果使用单个字符值，则将使用原始 char 类型。然而，有时需要使用 char 作为对象，例如，将对象作为方法参数。
Java 编程语言提供了一个包装类 Character.Character 包含了一个 char 类型，这个 Character 类还提供了许多有用的类（即静态）方法来处理字符。


字符串是一系列字符，广泛用于 Java 编程。在 Java 编程语言中，字符串是对象。该 String 类有 60 多个方法和 13个 构造。

大多数情况下，您使用类似的语句创建一个字符串 `String s = "Hello world!";` 而不是使用其中一个 String 构造函数。

String类有许多方法来查找和检索串; 这些可以很容易地使用+连接运算符重组为新的字符串。

tring类还包括许多的实用方法，其中split()，toLowerCase()，toUpperCase()，和valueOf()。后一种方法在将用户输入字符串转换为数字时是不可或缺的。Number子类也有字符串转换为数字，反之亦然方法。

除String外，还有 StringBuilder 。使用StringBuilder对象有时比使用字符串更有效。这个StringBuilder类提供了一些对字符串有用的方法，其中包括reverse()。但总的来说，这个String有更多种方法。

可以使用StringBuilder构造函数将字符串转换为StringBuilder。StringBuilder可以通过toString()方法转换为字符串。
