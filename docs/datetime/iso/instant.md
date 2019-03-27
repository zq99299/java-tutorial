# 瞬时类 / Instant

Date-Time API 的核心类之一是 Instant 类，它表示时间轴上的纳秒开始。此类对于生成表示机器时间的时间戳很有用。

```java
import java.time.Instant;

Instant timestamp = Instant.now();
```

Instant 类返回的值计算从 1970 年 1 月 1 日（1970-01-01T00：00：00Z）第一秒开始的时间，
也称为 [EPOCH](https://docs.oracle.com/javase/8/docs/api/java/time/Instant.html#EPOCH)。
发生在时期之前的瞬间具有负值，并且发生在时期后的瞬间具有正值 （1970-01-01T00：00：00Z 中的 Z 其实就是偏移量为 0）



Instant 类提供的其他常量是
[MIN](https://docs.oracle.com/javase/8/docs/api/java/time/Instant.html#MIN)，
表示最小可能（远远）的瞬间，
[MAX](https://docs.oracle.com/javase/8/docs/api/java/time/Instant.html#MAX)
表示最大（远期）瞬间。

在 Instant 上调用 toString 产生如下输出：`2013-05-30T23：38：23.085Z` 这种格式遵循用于表示日期和时间的
[ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) 标准。

该类还提供了多种方法操作 Instant。加和减的增加或减少时间的方法。以下代码将 1 小时添加到当前时间：

```java
Instant oneHourLater = Instant.now().plusHours(1);
```

有比较时间的方法，比如 `isAfter` 和 `isBefore`。 `until` 返回两者直接发生了多长的时间；
如下代码 自 Java 时代开始以来发生了多少秒

```java
long secondsFromEpoch = Instant.ofEpochSecond(0L).until(Instant.now(),
                                                        ChronoUnit.SECONDS);

LocalDateTime start = LocalDateTime.of(2018, 05, 01, 0, 0, 0);
LocalDateTime end = LocalDateTime.of(2018, 05, 8, 0, 0, 0);
// 两个时间之间相差了7天
start.until(end, ChronoUnit.DAYS); // 还有其他时间类都提供了 unitl方法
```

Instant 不包含年，月，日等单位。但是可以转换成 LocalDateTime 或 ZonedDateTime，
如下 把一个 Instant + 默认时区转换成一个 LocalDateTime

```java
LocalDateTime ldt = LocalDateTime.ofInstant(Instant.now(), ZoneId.systemDefault());
// MAY 8 2018 at 13:37
System.out.printf("%s %d %d at %d:%d%n", ldt.getMonth(), ldt.getDayOfMonth(),
                                                        ldt.getYear(), ldt.getHour(), ldt.getMinute());
```

无论是 ZonedDateTime 或 OffsetTimeZone 对象可被转换为 Instant 对象，因为都映射到时间轴上的确切时刻。
但是，相反情况并非如此。要将 Instant 对象转换为 ZonedDateTime 或 OffsetDateTime 对象，需要提供时区或时区偏移信息。
