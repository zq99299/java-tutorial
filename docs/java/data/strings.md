# 字符串

在Java编程中广泛使用的字符串是一系列字符。在Java编程语言中，字符串是对象。

Java平台提供了创建和操作字符串的String 类。

## 创建字符串
创建字符串最直接的方法是编写：`String greeting = "Hello world!";`

在这种情况下，“Hello world！” 是一个字符串字面值 - 在您的代码中用双引号括起来的一系列字符。只要遇到代码中的字符串文字，编译器就会用它的值创建一个String对象。

与任何其他对象一样，您可以使用new关键字和构造函数创建对象。String类有13个构造函数，允许你使用不同的来源，诸如字符数组来提供串的初始值：

```java
char[] helloArray = { 'h', 'e', 'l', 'l', 'o', '.' };
String helloString = new String(helloArray);
System.out.println(helloString);
```

此代码段的最后一行显示hello.

> **注意：**  这个String类是不可变的，所以一旦创建了一个String对象就不能改变。这个String类有许多方法，其中一些方法将在下面讨论，这些方法似乎是修改字符串的。由于字符串是不可变的，这些方法真正做的是创建并返回一个包含操作结果的新字符串。

## 字符串长度
用于获取关于对象的信息的方法被称为_访问器方法_。length()方法可获取字符串的长度

```java
String palindrome = "Dot saw I was Tod";
int len = palindrome.length();
```

这是一个简短而低效的程序来翻转字符串。它调用String方法charAt(i)，返回字符串中的第 i 个字符，从0开始计数。

```java
 String palindrome = "Dot saw I was Tod";
        int len = palindrome.length();
        char[] tempCharArray = new char[len];
        char[] charArray = new char[len];

        // put original string in an
        // array of chars
        for (int i = 0; i < len; i++) {
            tempCharArray[i] =
                    palindrome.charAt(i);
        }

        // reverse array of chars
        for (int j = 0; j < len; j++) {
            charArray[j] =
                    tempCharArray[len - 1 - j];
        }

        String reversePalindrome =
                new String(charArray);
        System.out.println(reversePalindrome);
```

输出

```java
doT saw I was toD
```

为了完成字符串反转，程序必须将字符串转换为字符数组（第一个for循环），将数组反转为第二个数组（第二个for循环），然后转换回字符串。可以用以下的方式替换掉第一个循环

```java
palindrome.getChars(0, len, tempCharArray, 0);
```

## 连接字符串

所述String类包括用于连接两个字符串的方法：

```java
string1.concat(string2); 
```
这将返回一个新的字符串，将字符串2添加到字符串1的末尾

也可以直接这样
```java
"My name is ".concat("Rumplestiltskin");
```

字符串通常与+操作符连接在一起，如

```java
"Hello," + " world" + "!"  // "Hello, world!"
```

`+` 操作符号广泛用于print

```java
String string1 = "saw I was ";
System.out.println("Dot " + string1 + "Tod");

// 输出
Dot saw I was Tod
```

这样的操作可以是任意对象的混合，对于不是String类型的对象，则调用他们的  toString() 方法转换为 String

> 注：  Java编程语言不允许文字字符串跨越源文件中的行，所以您必须+在多行字符串中的每行末尾使用拼接运算符。例如：

>```java
String quote = 
    "Now is the time for all good " +
    "men to come to the aid of their country.";
```

## 创建格式字符串
您已经看到使用printf()和format()方法打印格式化数字的输出。所述String类具有等效类方法，format()即返回一个String对象，而不是一个PrintStream对象。

```java
System.out.printf("The value of the float " +
                  "variable is %f, while " +
                  "the value of the " + 
                  "integer variable is %d, " +
                  "and the string is %s", 
                  floatVar, intVar, stringVar); 

也可以这样写

String fs;
fs = String.format("The value of the float " +
                   "variable is %f, while " +
                   "the value of the " + 
                   "integer variable is %d, " +
                   " and the string is %s",
                   floatVar, intVar, stringVar);
System.out.println(fs);
```