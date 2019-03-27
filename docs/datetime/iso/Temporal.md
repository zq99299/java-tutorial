# Temporal 包

[java.time.temporal](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/package-summary.html)
提供了一组接口、类和枚举，它们支持日期和时间代码，特别是日期和时间计算。

这些接口的目的是在最低级别使用。典型的应用程序代码应该以具体类型的形式声明变量和参数，
比如 LocalDate 或 ZonedDateTime. 而不是 Temporal 接口。这与声明 String 类型的变量完全相同，而不是 CharSequence 类型。

## Temporal and TemporalAccessor

Temporal 接口提供了访问 temporal - based 对象的框架；并通过基于时间的类，如实现 Instant, LocalDateTime, and ZonedDateTime.
该接口提供了添加或减少时间单位的方法，使得基于时间的算术在各种日期和时间类中变得简单和一致。

TemporalAccessor 接口提供的只读版本 Temporal 接口。

Temporal and TemporalAccessor 对象是用字段来定义的，如[TemporalField](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/TemporalField.html) 接口，
 ChronoField 是一个具体的实现 TemporalField 接口的枚举类；并提供了一套丰富的定义的常量，如 DAY_OF_WEEK，MINUTE_OF_HOUR，和MONTH_OF_YEAR。

这些字段的单位由 [TemporalUnit](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/TemporalUnit.html) 接口指定 。
ChronoUnit 枚举实现 TemporalUnit 接口。ChronoField.DAY_OF_WEEK 字段是 ChronoUnit.DAYS和ChronoUnit.WEEKS 的组合；

ChronoField 和 ChronoUnit 枚举在下面的章节中讨论。

Temporal 接口中的基于算术的方法需要使用 [TemporalAmount](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/TemporalAmount.html)
值定义的参数 。Period and Duration 类实现了 TemporalAmount 接口


小结：

- Temporal： 是所有时间的超级接口
- TemporalAccessor ： 只提供只读版本的接口

好把。这个英文不好，不花更多时间去阅读是不理解的了；所以章节先就这样了

## ChronoField 和 IsoFields
实现 TemporalField 接口的 ChronoField 枚举提供了一组用于访问日期和时间值的常量。
一些示例是 CLOCK_HOUR_OF_DAY，NANO_OF_DAY 和 DAY_OF_YEAR。此枚举可用于表示时间的概念方面，
例如一年的第三周，一天的第 11 个小时或本月的第一个星期一。当你遇到位置类型的 Temporal 时，
可以使用 `TemporalAccessor.isSupported（TemporalField）` 方法来确定时态是否支持特定的字段。
下面这行代码返回 false，表明 LocalDate 不支持 ChronoField.CLOCK_HOUR_OF_DAY 字段：

```java
// 是否支持 am.pm 上午下午这样的字段
// 由于 LocalDate 不包含时分秒，所以不支持
boolean isSupported = LocalDate.now().isSupported(ChronoField.CLOCK_HOUR_OF_DAY);
```

其他字段，特定于 [ISO- 8601 日历系统](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/IsoFields.html)，
在 [IsoFields](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/IsoFields.html) 类中定义 。
以下示例显示如何使用 ChronoField 和 IsoFields 来获取字段的值：

```java
Instant time = Instant.now();
// 返回当前时间的毫秒数也就是秒后面的毫秒数0-999
int i = time.get(ChronoField.MILLI_OF_SECOND);
LocalDateTime date = LocalDateTime.now();
// 返回了当前日期所属日期
int qoy = date.get(IsoFields.QUARTER_OF_YEAR);
// 当前毫秒：256
System.out.println("当前毫秒：" + i);
// 所属季度：2
System.out.println("所属季度：" + qoy);
```

其他两个类定义了可能有用的附加字段， [WeekFields](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/WeekFields.html)
和 [JulianFields](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/JulianFields.html)。

* WeekFields : 提供了在某些周相关的访问，选下展示

    - 2008-12-31	星期三
    - 2008 年 12 月第 5 周
    - 2008 年 12 月第 5 周  
    - 2009 年第 1 周
    - 2008 年第 53 周
* JulianFields

    天文科学界的时间表达

## ChronoUnit
ChronoUnit 枚举实现 TemporalUnit 接口，并且提供了一组根据日期和时间，从毫秒到几千年标准单元。
请注意，并非所有类都支持 ChronoUnit 对象。例如，Instant 类不支持 ChronoUnit.MONTHS 或 ChronoUnit.YEARS。

TemporalAccessor.isSupported（TemporalUnit）方法可用于验证一个类是否支持特定时间单位。
以下对 isSupported 的调用返回 false，确认 Instant 类不支持 ChronoUnit.DAYS。

```java
boolean isSupported = instant.isSupported(ChronoUnit.DAYS);
```
