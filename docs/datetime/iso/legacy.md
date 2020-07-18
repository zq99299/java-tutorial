# 旧版日期时间代码

可以说是旧版日期机制的代码迁移指南吧

在 Java SE 8 发布前，java 提供了日期时间机制的类 java.util.Date， java.util.Calendar
以及 java.util.TimeZone 类，以及它们的子类，如 java.util.GregorianCalendar 中。这些类有几个缺点，包括：

* Calendar 是不安全的
* 由于这些类是可变的，因此他们不能用于多线程
* 应用程序代码中的错误是常见的，原因是不寻常的几个月和缺乏类型安全。?

## 与遗留代码的互操作性

也序你使用了 java.util 的日期相关的类，并且想对现有代码进行最小改动的情况下使用 java.time 的功能

JDK8 提供了几个方法允许 java.util 和 java.time 对象之间进行转换：

* Calendar.toInstant()
* GregorianCalendar.toZonedDateTime()
* GregorianCalendar.from(ZonedDateTime)
* Date.from(Instant)
* Date.toInstant()
* TimeZone.toZoneId()

以下示例将 Calendar 实例转换为 ZonedDateTime 实例。请注意，必须提供时区才能将 Instant 转换为 ZonedDateTime：

```java
Calendar now = Calendar.getInstance();
ZonedDateTime zdt = ZonedDateTime.ofInstant(now.toInstant(), ZoneId.systemDefault());
```

以下示例 Date 和 Instant 之间的转换

```java
Instant inst = date.toInstant();

Date newDate = Date.from(inst);
```

以下示例将从 GregorianCalendar 转换为 ZonedDateTime，然后从 ZonedDateTime 转换为 GregorianCalendar。
其他基于时间的类是使用 ZonedDateTime 实例创建的：

```java
GregorianCalendar cal = new GregorianCalendar();

TimeZone tz = cal.getTimeZone();
int tzoffset = cal.get(Calendar.ZONE_OFFSET); // 获取偏移量

ZonedDateTime zdt = cal.toZonedDateTime();

GregorianCalendar newCal = GregorianCalendar.from(zdt);

LocalDateTime ldt = zdt.toLocalDateTime();
LocalDate date = zdt.toLocalDate();
LocalTime time = zdt.toLocalTime();
```

## java.util Date 与 java.time 功能映射

因为 Java SE 8 版本中已经完全重新设计了日期和时间的 Java 实现，所以您不能将一个方法替换为另一个方法。
如果您想要使用 java 提供的丰富功能。时间包，您最简单的解决方案是使用上一节中列出的 toInstant 或 toZonedDateTime 方法。
但是，如果您不想使用这种方法，或者它对您的需求来说是不够的，那么您必须重写您的日期时间代码。

在 [概述](./overview.md) 页面中的表格可以让你明白哪些类是复合你的需求的

这两个 api 之间没有一对一的映射对应关系，但是下面列出了 大致功能概念的映射

### java.util.Date 与 java.time.Instant
这两个类是相似的：

* 代表时间轴(UTC)上的瞬时点
* 保存一个与时区无关的时间
* 表示的是纳秒 epoch-seconds(自 1970-01-01T00:00:00Z 起)


`Date.from(Instant)` 和 `Date.toInstant()` 方法互相转换

### java.util.GregorianCalendar 和 java.time.ZonedDateTime
ZonedDateTime 类是替代 GregorianCalendar 的 。它提供了以下类似的功能。

人类时间


* LocalDate: 年，月，日
* LocalTime: 时，分，秒，纳秒
* ZoneId: 时区
* ZoneOffset: 从 GMT 的偏移量

`GregorianCalendar.from(ZonedDateTime)` 和 `GregorianCalendar.to(ZonedDateTime)` 相互转换

### java.util.TimeZone 和 java.time.ZoneId/ZoneOffset

* ZoneId 指定时区标识符和访问所使用的每个时区的规则
* ZoneOffset 指定一个从格林尼治/ UTC 偏移。有关更多信息，请参阅 [时区和偏移](./timezones.md) 类。

### GregorianCalendar 和 java.time.LocalTime

在 GregorianCalendar 实例中将日期设置为 1970-01-01 以便使用时间组件的代码可以替换为 LocalTime 实例。 因为 LocalTime 只包含时分秒

### GregorianCalendar 和 java.time.LocalDate

在 GregorianCalendar 实例中将时间设置为 00:00 以便使用日期组件的代码可以用 LocalDate 的实例替换。
（这样的方法有缺陷，因为在一些国家，由于过渡到夏令时，每年午夜都不会发生。）

## 日期和时间格式

尽管 java.time.format.DateTimeFormatter 为格式化日期和时间值提供了强大的机制，但您也可以直接使用
java.util.Formatter 和 String.format 来格式化 java.time 类
