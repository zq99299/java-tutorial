# DayOfWeek 和 Month 枚举

日期时间 API 提供了用于指定一周中的几天和一年中的几个月的枚举。

## DayOfWeek

[DayOfWeek](https://docs.oracle.com/javase/8/docs/api/java/time/DayOfWeek.html)
由七个常量形容一周的日子：星期一至星期日。DayOfWeek 常量的整数值范围从 1（星期一）到 7（星期日）。
使用定义的常量（DayOfWeek.FRIDAY）使您的代码更具可读性。

此枚举还提供了许多方法，类似于基于时间的类提供的方法。例如，以下代码将“周一”添加 3 天并打印结果。输出是 “THURSDAY”：

```java
System.out.printf("%s%n", DayOfWeek.MONDAY.plus(3));
```

使用  [getDisplayName(TextStyle, Locale) ](https://docs.oracle.com/javase/8/docs/api/java/time/DayOfWeek.html#getDisplayName-java.time.format.TextStyle-java.util.Locale-) 方法，
相当于使用指定的语言环境进行翻译，TextStyle 枚举允许您指定要显示什么样的字符串；
以下示例为“星期一” 打印 TextStyle 的三种主要形式：

```java
DayOfWeek dow = DayOfWeek.MONDAY;
Locale locale = Locale.getDefault();
// 星期一
System.out.println(dow.getDisplayName(TextStyle.FULL, locale));
// 一
System.out.println(dow.getDisplayName(TextStyle.NARROW, locale));
// 星期一
System.out.println(dow.getDisplayName(TextStyle.SHORT, locale));
```
在其他语言环境下 有可能是下面这样

```java
Monday
M
Mon
```
## Month

Month 枚举包含 一月（1）至十二月（12），使用定义的常量（Month.SEPTEMBER）使您的代码更具可读性。

该枚举还包括了一些方法；如下，打印了 2 月份最大可能的天数

```java
System.out.printf("%d%n", Month.FEBRUARY.maxLength());
```

该类也实现了 getDisplayName(TextStyle, Locale) 方法；

```java
Month month = Month.AUGUST;
Locale locale = Locale.getDefault();
System.out.println(month.getDisplayName(TextStyle.FULL, locale));
System.out.println(month.getDisplayName(TextStyle.NARROW, locale));
System.out.println(month.getDisplayName(TextStyle.SHORT, locale));
```
输出如下：

```java
八月
8
八月

其他语言环境下可能是

August
A
Aug
```
