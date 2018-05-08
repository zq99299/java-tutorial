# 解析与格式化

 Date-Time API中的基于时间（temporal）的类提供解析方法，用于解析包含日期和时间信息的字符串。这些类还提供格式化基于时间的对象进行显示的格式方法。在这两种情况下，这个过程都是类似的：你为DateTimeFormatter提供一个模式来创建一个格式化对象。然后将此格式化程序传递给 parse 或format 方法
 
[DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html#predefined)类提供了大量的 预定义的格式化，或者您也可以自己定义。

如果在转换过程中出现问题 ，parse 或format 会触发异常。因此，你应该捕获DateTimeParseException错误，并且您的格式代码应该捕获DateTimeException错误，有关异常处理的更多信息，请参见[ 捕获和处理异常](//content/essential/exceptions/handling/README.md)。

DateTimeFormatter类是不可变的和线程安全的; 它可以（也应该）在适当的时候分配给一个静态常量。

> **版本说明**：  java.time日期时间目标可直接使用java.util.Formatter中和的String.format通过使用与传统使用熟悉的基于模式的格式化java.util.Date和java.util.Calendar中类。

## parse
LocalDate类中的 单参数 `parse(CharSequence)`方法使用ISO_LOCAL_DATE格式化程序。自定义可使用 ` parse(CharSequence, DateTimeFormatter) `; 比如以下程序使用 BASIC_ISO_DATE ()

```java
String in = "20111203";
        LocalDate date = LocalDate.parse(in, DateTimeFormatter.BASIC_ISO_DATE);
```

您也可以使用自己的模式定义一个格式化程序。

```java
// 注意这个程序；MMM 三个m的 是需要本地语言环境下汉化
// 比如下面这个字符串"四月 03 2003"  否则会报错的
String input = Month.APRIL.getDisplayName(TextStyle.FULL, Locale.getDefault()) + " 03 2003";
try {
    DateTimeFormatter formatter =
            DateTimeFormatter.ofPattern("MMM d yyyy");
    LocalDate date = LocalDate.parse(input, formatter);
    System.out.printf("%s%n", date);
} catch (DateTimeParseException exc) {
    System.out.printf("%s is not parsable!%n", input);
    throw exc;      // Rethrow the exception.
}
// 'date' has been successfully parsed
```
DateTimeFormatter类 的文档指定了可用于指定格式化或解析的模式的 [完整符号列表](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html#patterns)。

该字符串转换在上例 非ISO日期转换页面提供的日期格式的另一个例子。

## format

` format(DateTimeFormatter) `方法转换使用指定的格式的基于时间的对象为字符串表示；

下面例子 日期的定义方式与之前的解析示例相同，但此模式还包括小时，分钟以及am和pm组件。
```java
// 之前说道了MMM的解析包括am等需要和本地语言环境挂钩，
// 所以这里需要时区信息
ZoneId leavingZone = ZoneId.systemDefault();
ZonedDateTime departure = ZonedDateTime.of(LocalDateTime.now(), leavingZone);

try {
    DateTimeFormatter format = DateTimeFormatter.ofPattern("MMM d yyyy  hh:mm a");
    String out = departure.format(format);
    // LEAVING:  五月 8 2018  03:02 下午 (GMT+08:00)
    System.out.printf("LEAVING:  %s (%s)%n", out, leavingZone);
} catch (DateTimeException exc) {
    System.out.printf("%s can't be formatted!%n", departure);
    throw exc;
}
}
``