# 日期和时间类 / Date and Time

## LocalTime
[LocalTime](https://docs.oracle.com/javase/tutorial/datetime/iso/datetime.html)  此类对于表示基于人的时间（如电影时间）或本地图书馆的开始和结束时间很有用。它也可以用来创建数字时钟，如以下示例所示：

```java
@Test
public void fun9() {
    LocalTime thisSec;

    for (; ; ) {
        thisSec = LocalTime.now();

        // implementation of display code is left to the reader
        display(thisSec.getHour(), thisSec.getMinute(), thisSec.getSecond());
    }
}

private void display(int hour, int minute, int second) {
    System.out.println(hour + ":" + minute + ":" + second);
}
```

在LocalTime类不存储时区或夏令时信息。

## LocalDateTime

无时区的时间类是 LocalDateTime，它是Date-Time API的核心类之一。这个类用来表示日期（月 - 日 - 年）和时间（小时 - 分秒 - 纳秒），实际上是LocalDate和LocalTime的组合。本课程可以用来表示一个特定的事件，例如2013年8月17日下午1:10开始的美洲杯挑战者系列赛第一场路易威登杯决赛。请注意，这意味着下午1:10在当地时间。要包含时区，您必须使用ZonedDateTime或OffsetDateTime，如 时区和偏移类中所述。

除了 `now()` 方法外，还有各种的前缀或方法的方法可以创造一个实例。有一个from方法将实例从另一个时间格式转换为LocalDateTime实例。还有增加或减少小时，分钟，日，周和月的方法。以下示例显示了其中一些方法。

```java
System.out.printf("now: %s%n", LocalDateTime.now());

// 1994年4月15号11点30分
System.out.printf("Apr 15, 1994 @ 11:30am: %s%n",
        LocalDateTime.of(1994, Month.APRIL, 15, 11, 30));

// 基于 瞬时类 只有纳秒 + 时区id
System.out.printf("now (from Instant): %s%n",
        LocalDateTime.ofInstant(Instant.now(), ZoneId.systemDefault()));

// 6月后
System.out.printf("6 months from now: %s%n",
        LocalDateTime.now().plusMonths(6));

// 6月前
System.out.printf("6 months ago: %s%n",
        LocalDateTime.now().minusMonths(6));
```

输出

```
now: 2018-05-07T17:59:29.160
Apr 15, 1994 @ 11:30am: 1994-04-15T11:30
now (from Instant): 2018-05-07T17:59:37.499
6 months from now: 2018-11-07T17:59:37.499
6 months ago: 2017-11-07T17:59:37.499
```