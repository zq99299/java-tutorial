# 标准日历 / Standard Calendar
Date-Time API的核心是 [java.time](https://docs.oracle.com/javase/8/docs/api/java/time/package-summary.html)包。在java.time中定义的类将其日历系统基于ISO日历，这是表示日期和时间的世界标准。ISO日历遵循格雷戈里的规则。公历于1582年推出; 在格雷戈里日历中，日期从那时开始向后延伸，以创建一致的统一时间表并简化日期计算。

本课包含以下主题：

## 概述 / Overview

本节比较了人类时间和机器时间的概念，提供了java.time包中基本的基于时间的类的表格。

## DayOfWeek和Month枚举

本节讨论定义一周中的日期（DayOfWeek）的枚举和定义月份（Month）的枚举。

## 日期类 / Date

本部分显示仅处理日期的基于时间的类，没有时间或时区。这四个Class分别是LocalDate，YearMonth，MonthDay和Year。

## 日期和时间类 / Date and Time

本节介绍LocalTime和LocalDateTime类，分别处理时间，日期和时间，但不包含时区。

## 时区和偏移类 / Zone and Offset

本节讨论存储时区（或时区偏移）信息，ZonedDateTime，OffsetDateTime和OffsetTime的基于时间的类。还讨论了支持类ZoneId，ZoneRules和ZoneOffset。

## 瞬时类 / Instant

本节讨论Instant类，它表示时间线上的瞬时时刻。

## 解析和格式

本节概述如何使用预定义的格式化程序来格式化和分析日期和时间值。

## Temporal 包

本节概述java.time.temporal包，它支持时态类，字段（TemporalField和ChronoField）和单元（TemporalUnit和ChronoUnit）。本节还解释了如何使用时间调整器来检索调整后的时间值，如“4月11日之后的第一个星期二”以及如何执行时间查询。

## 周期和持续时间 / Period and Duration

本节介绍如何使用Period和Duration类以及ChronoUnit.between方法来计算时间量。

## Clock

本节提供Clock类的简要概述。您可以使用此类为系统时钟提供另一个时钟。

## 非ISO日期转换

本节介绍如何将ISO日历系统中的日期转换为非ISO日历系统中的日期，如日语日期或ThaiBuddhistDate

## 旧版日期 - 时间码

本节提供了一些关于如何将旧的java.util.Date和java.util.Calendar代码转换为Date-Time API的提示。

## 总结/概要

本节提供了标准日历课程的摘要。