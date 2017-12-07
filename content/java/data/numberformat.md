# 格式化打印输出

早些时候，您看到了使用print和println打印字符串到标准输出（System.out）的方法。由于所有的数字都可以转换为字符串（正如你将在本课稍后看到的），你可以使用这些方法打印出任意字符串和数字的混合。Java编程语言还有其他一些方法，可以让您在包含数字时对打印输出进行更多的控制。

##  printf 和 format 方法

java.io包中的PrintStream类，可以用来替换 print和println方法。format和printf和他们是等价的。System.out 就是一个 PrintStream 实例。所以之前用System.out/print/println 方法的地方都可以使用format和printf来代替；例如

```java
System.out.format(.....);
```
这两种方法的语法是一样的

```java
public PrintStream format(String format, Object... args)
```

其中format是指定要使用的格式的字符串，args是使用该格式打印的变量的列表。一个简单的例子是

```java
System.out.format("The value of " + "the float variable is " +
     "%f, while the value of the " + "integer variable is %d, " +
     "and the string is %s", floatVar, intVar, stringVar); 
```

第一个参数，format是一个格式字符串，指定如何args格式化第二个参数中的对象。格式字符串包含纯文本以及格式说明符，格式说明符是格式化参数的特殊字符（Object... args称为可变参数，这意味着参数的数量可能会有所不同。）

格式说明符以百分号（％）开头，并以转换器结束。转换器是一个字符，指示要格式化参数的类型。在百分号（％）和转换器之间，可以有可选的标志和说明符。有许多转换器，标志和说明符，这些都记载在 java.util.Formatter 中


这里是一个基本的例子：

```java
int i = 461012;
        System.out.format("The value of i is: %d%n", i);
```
%d指定是十进制整数。%n是一个平台无关的换行符。输出是：

```java
The value of i is: 461012
```

printf和format方法被重载。每个版本都有以下语法：

```java
public PrintStream format(Locale l, String format, Object... args)
```

要在语法系统中打印数字%f转化成十进制浮点数，用逗号代替小数点），可以使用：

```java
        float floatVar = 23.636F;
        int intVar = 1002;
        String stringVar = "hello";
        System.out.format(Locale.FRANCE,
                          "The value of the float " + "variable is %f, while the " +
                                  "value of the integer variable " + "is %d, and the string is %s%n",
                          floatVar, intVar, stringVar);
```

```java
The value of the float variable is 23,636000, while the value of the integer variable is 1002, and the string is hello
```