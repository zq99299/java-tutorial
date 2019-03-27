# 标准日历 / Standard Calendar
Date-Time API 的核心是 [java.time](https://docs.oracle.com/javase/8/docs/api/java/time/package-summary.html) 包。
在 java.time 中定义的类将其日历系统基于 ISO 日历，这是表示日期和时间的世界标准。
ISO 日历遵循格雷戈里的规则。公历于 1582 年推出; 在格雷戈里日历中，日期从那时开始向后延伸，
以创建一致的统一时间表并简化日期计算。

本课包含以下主题：

- [概述 / Overview](./overview.md)

    本节比较了人类时间和机器时间的概念，提供了java.time包中基本的基于时间的类的表格。

- [DayOfWeek 和 Month 枚举](./enum.md)

    本节讨论定义一周中的日期（DayOfWeek）的枚举和定义月份（Month）的枚举。

- [日期类 / Date](./date.md)

    本部分显示仅处理日期的基于时间的类，没有时间或时区。这四个 Class 分别是 LocalDate，YearMonth，MonthDay 和 Year。

- [日期和时间类 / Date and Time](./datetime.md)

    本节介绍 LocalTime 和 LocalDateTime 类，分别处理时间，日期和时间，但不包含时区。

- [时区和偏移类 / Zone and Offset](./timezones.md)

    本节讨论存储时区（或时区偏移）信息，ZonedDateTime，OffsetDateTime 和 OffsetTime 的基于时间的类。
    还讨论了支持类 ZoneId，ZoneRules 和 ZoneOffset。

- [瞬时类 / Instant](./instant.md)

    本节讨论 Instant 类，它表示时间线上的瞬时时刻。

- [解析和格式](./format.md)

    本节概述如何使用预定义的格式化程序来格式化和分析日期和时间值。

-  [Temporal 包](./Temporal.md)

    本节概述 java.time.temporal 包，它支持时态类，字段（TemporalField 和 ChronoField）和
    单元（TemporalUnit 和 ChronoUnit）。本节还解释了如何使用时间调整器来检索调整后的时间值，
    如“4 月 11 日之后的第一个星期二”以及如何执行时间查询。

- [周期和持续时间 / Period and Duration](./period.md)

    本节介绍如何使用 Period 和 Duration 类以及 ChronoUnit.between 方法来计算时间量。

- [Clock](./clock.md)

    本节提供 Clock 类的简要概述。您可以使用此类为系统时钟提供另一个时钟。

- [非 ISO 日期转换](./nonIso.md)

    本节介绍如何将 ISO 日历系统中的日期转换为非 ISO 日历系统中的日期，如日语日期或 ThaiBuddhistDate

- [旧版日期时间代码](./legacy.md)

    本节提供了一些关于如何将旧的 java.util.Date 和 java.util.Calendar 代码转换为 Date-Time API 的提示。

- [总结/概要](./summary.md)

    本节提供了标准日历课程的摘要。
