# 格式化打印输出
[[toc]]

早些时候，您看到了使用 print 和 println 打印字符串到标准输出（System.out）的方法。
由于所有的数字都可以转换为字符串（正如你将在本课稍后看到的），你可以使用这些方法打印出任意字符串和数字的混合。
Java 编程语言还有其他一些方法，可以让您在包含数字时对打印输出进行更多的控制。

##  printf 和 format 方法

java.io 包中的 PrintStream 类，可以用来替换 print 和 println 方法。format 和 printf 和他们是等价的。
System.out 就是一个 PrintStream 实例。所以之前用 System.out/print/println 方法的地方都可以使用 format 和 printf 来代替；例如

```java
System.out.format(.....);
```

这两种方法的语法是一样的

```java
public PrintStream format(String format, Object... args)
```

其中 format 是指定要使用的格式的字符串，args 是使用该格式打印的变量的列表。一个简单的例子是

```java
System.out.format("The value of " + "the float variable is " +
     "%f, while the value of the " + "integer variable is %d, " +
     "and the string is %s", floatVar, intVar, stringVar);
```

第一个参数，format 是一个格式字符串，指定如何 args 格式化第二个参数中的对象。
格式字符串包含纯文本以及格式说明符，格式说明符是格式化参数的特殊字符（Object... args 称为可变参数，这意味着参数的数量可能会有所不同。）

格式说明符以百分号（%）开头，并以转换器结束。转换器是一个字符，指示要格式化参数的类型。
在百分号（%）和转换器之间，可以有可选的标志和说明符。有许多转换器，标志和说明符，这些都记载在 java.util.Formatter 中


这里是一个基本的例子：

```java
int i = 461012;
System.out.format("The value of i is: %d%n", i);
```
%d 指定是十进制整数。%n 是一个平台无关的换行符。输出是：

```java
The value of i is: 461012
```

printf 和 format 方法被重载。每个版本都有以下语法：

```java
public PrintStream format(Locale l, String format, Object... args)
```

要在语法系统中打印数字 %f 转化成十进制浮点数，用逗号代替小数点，可以使用：

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

## 一个例子
下表列出了示例程序中使用的一些转换器和标志，他们在表格后面。

| Converter | Flag | Explanation                                                       |
|-----------|------|-------------------------------------------------------------------|
| d         | -    | 十进制整数。                                                      |
| f         | -    | 浮动。                                                            |
| n         | -    | 适合运行应用程序的平台的新行字符。你应该总是使用 %n，而不是 \n。  |
| tB        | -    | 日期和时间转换 - 地区特定的月份全名                               |
| td, te    | -    | 日期和时间转换 - 每月两位数的日期。td 根据需要具有前导零，te 不。 |
| ty, tY    | -    | 日期和时间转换 - ty = 两位数年份，tY = 四位数年份。               |
| tl        | -    | 日期和时间转换为 12 小时制。                                      |
| tM        | -    | 日期和时间转换 - 以 2 位数分钟，必要时带前导零。                  |
| tp        | -    | 日期和时间转换 - 特定于区域的 am / pm（小写）。                   |
| tm        | -    | 日期和时间转换 - 两位数的月份，必要时带前导零。                   |
| tD        | -    | 日期和时间转换日期为 %tm%td%ty                                    |
| -         | 08   | 八个字符的宽度，必要时带前导零。                                  |
| -         | +    | 包括标志，无论是正还是负。                                        |
| -         | ,    | 包含特定于语言环境的分组字符                                      |
| -         | -    | 左对齐..                                                          |
| -         | .3   | 小数点后三位。                                                    |
| -         | 10.3 | 宽度为十个字符，右对齐，小数点后三位。                            |


```java
public class TestFormat {
    public static void main(String[] args) {
        long n = 461012;
        System.out.format("%d%n", n);      //  -->  "461012"
        System.out.format("%08d%n", n);    //  -->  "00461012"
        System.out.format("%+8d%n", n);    //  -->  " +461012"
        System.out.format("%,8d%n", n);    // -->  " 461,012"
        System.out.format("%+,8d%n%n", n); //  -->  "+461,012"

        double pi = Math.PI;

        System.out.format("%f%n", pi);       // -->  "3.141593"
        System.out.format("%.3f%n", pi);     // -->  "3.142"
        System.out.format("%10.3f%n", pi);   // -->  "     3.142"
        System.out.format("%-10.3f%n", pi);  // -->  "3.142"
        System.out.format(Locale.FRANCE,
                          "%-10.4f%n%n", pi); // -->  "3,1416"

        Calendar c = Calendar.getInstance();
        System.out.format("%tB %te, %tY%n", c, c, c); // -->  "May 29, 2006"

        System.out.format("%tl:%tM %tp%n", c, c, c);  // -->  "2:34 am"

        System.out.format("%tD%n", c);    // -->  "05/29/06"
    }
}
```

::: tip
本节中的讨论仅涵盖 format 和 printf 方法的基础知识。进一步的细节可以 [基础 I/O 格式化中找到](/essential/io/formatting.md#format-方法) 。
:::

使用 String.format 创建的字符串在下一个章节 [字符串](./strings.md)。


## DecimalFormat 类
您可以使用 java.text.DecimalFormat 该类来控制前导和尾随零，前缀和后缀的显示，分组（千位）分隔符和小数点分隔符。
DecimalFormat 在数字格式化方面提供了很大的灵活性，但它可以使你的代码更加复杂。

```java
public class DecimalFormatDemo {
    static public void customFormat(String pattern, double value) {
        DecimalFormat myFormatter = new DecimalFormat(pattern);
        String output = myFormatter.format(value);
        System.out.println(value + "  " + pattern + "  " + output);
    }

    static public void main(String[] args) {

        customFormat("###,###.###", 123456.789);
        customFormat("###.##", 123456.789);
        customFormat("000000.000", 123.78);
        customFormat("$###,###.###", 12345.67);
    }
}
```

输出

```java
123456.789  ###,###.###  123,456.789
123456.789  ###.##  123456.79
123.78  000000.000  000123.780
12345.67  $###,###.###  $12,345.67
```

下表解释了每一行的输出

| Value      | Pattern      | Output      | Explanation                                                                 |
|------------|--------------|-------------|-----------------------------------------------------------------------------|
| 123456.789 | ###,###.###  | 123,456.789 | 井号（#）表示数字，逗号是分组分隔符的占位符，而句号是小数点分隔符的占位符。 |
| 123456.789 | ###.##       | 123456.79   | 保留两位小数，该 format 方法通过四舍五入来处理。                            |
| 123.78     | 000000.000   | 000123.780  | 指定前导和尾随零，因为 0 字符被用来代替井号（#）。                          |
| 12345.67   | $###,###.### | $12,345.67  | 美元符号在数字的最左边                                                      |
