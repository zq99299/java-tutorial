# 日期类 / Date

日期时间 API 提供四个专门处理日期信息的类，不考虑时间或时区。类名建议使用这些类：LocalDate，YearMonth，MonthDay 和 Year。


## LocalDate

一个 LocalDate 代表 年月日的 ISO 日历，表示没有时间的日期是有用的。您可以使用 LocalDate 跟踪重大事件，
例如出生日期或结婚日期。以下示例使用 of 和 with 方法来创建 LocalDate 的实例：

```java
// 2000年11月20日 星期一
LocalDate date = LocalDate.of(2000, Month.NOVEMBER, 20);
// 当前指定日期的下一个 星期三
LocalDate nextWed = date.with(TemporalAdjusters.next(DayOfWeek.WEDNESDAY));
// 当前指定日期的下一个 星期一
LocalDate nextMond = date.with(TemporalAdjusters.next(DayOfWeek.MONDAY));
System.out.println(DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL).format(date));
System.out.println(DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL).format(nextWed));
System.out.println(DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL).format(nextMond));
```

输出

```java
2000年11月20日 星期一
2000年11月22日 星期三
2000年11月27日 星期一
```

有关 TemporalAdjuster 接口的更多信息，请参阅 时间调节器。

除了通常的方法之外，LocalDate 类还提供获取关于给定日期的信息的 getter 方法。该 getDayOfWeek 方法返回一个特定日期适逢星期。
例如，下面这行代码返回 “MONDAY”：

```java
DayOfWeek dotw = LocalDate.of(2012, Month.JULY, 9).getDayOfWeek();
```

以下示例使用 TemporalAdjuster 检索特定日期后的第一个星期三。

```java
LocalDate date = LocalDate.of(2000, Month.NOVEMBER, 20);
TemporalAdjuster adj = TemporalAdjusters.next(DayOfWeek.WEDNESDAY);
LocalDate nextWed = date.with(adj);
System.out.printf("For the date of %s, the next Wednesday is %s.%n",
                date, nextWed);
```

输出
```java
For the date of 2000-11-20, the next Wednesday is 2000-11-22.
```

周期和持续时间 / Period and Duration 章节也有例子使用了 LocalDate 类


## YearMonth

[YearMonth](https://docs.oracle.com/javase/8/docs/api/java/time/YearMonth.html)
类代表一个特定的一年中的月份。以下示例使用 `YearMonth.lengthOfMonth()` 方法 返回该时间月有多少天

```java
// 2018-05: 31
YearMonth date = YearMonth.now();
System.out.printf("%s: %d%n", date, date.lengthOfMonth());

//2010-02: 28
YearMonth date2 = YearMonth.of(2010, Month.FEBRUARY);
System.out.printf("%s: %d%n", date2, date2.lengthOfMonth());

// 2012-02: 29
YearMonth date3 = YearMonth.of(2012, Month.FEBRUARY);
System.out.printf("%s: %d%n", date3, date3.lengthOfMonth());


// 2012-02: 366  // 返回该年有多少天
System.out.printf("%s: %d%n", date3, date3.lengthOfYear());
```

## MonthDay
MonthDay 类表示某月的一天，如新年的 1 月 1 日。

以下示例使用 MonthDay.isValidYear 方法来确定 2 月 29 日是否对 2010 年有效。该调用返回 false，确认 2010 年不是闰年。

```java
// 2月29号
MonthDay date = MonthDay.of(Month.FEBRUARY, 29);
// 对于 2010 年是否是有效的时间
boolean validLeapYear = date.isValidYear(2010);
```

## Year

Year 类代表一年，以下示例使用 Year.isLeap 方法来确定给定年份是否为闰年。返回了 true，表示 2012 年是闰年

```java
boolean validLeapYear = Year.of(2012).isLeap();
```
