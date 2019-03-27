# 日期、时间 API 概述

Java SE 8 发行版中引入的 Date-Time 包 java.time 提供了一个日期和时间的综合模型，并且是在 [JSR 310：Date and Time API](http://jcp.org/en/jsr/detail?id=310)
下开发的。虽然 java.time 基于国际标准化组织（ISO）日历系统，但常用的全球日历也受支持。

该轨迹涵盖了使用基于 ISO 的类来表示日期和时间以及操纵日期和时间值的基本原理。

时间似乎是一个简单的主题; 即使是便宜的手表也能提供相当准确的日期和时间。但是，仔细检查后，
您会发现影响您对时间理解的微妙复杂性和诸多因素。例如，闰年比 1 月 31 日增加一个月的结果与其他年份的结果不同。
时区也增加了复杂性。例如，一个国家可能会在短时间内进入或退出夏令时，或每年不止一次，或者可能会在特定年份内完全跳过夏令时。

日期 - 时间 API 使用 [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) 中定义的日历系统作为默认日历。
此日历基于公历系统，并在全球范围内用作表示日期和时间的事实标准。Date-Time API 中的核心类具有诸如
`LocalDateTime`，`ZonedDateTime` 和 `OffsetDateTime` 等名称。所有这些都使用 ISO 日历系统。
如果您想使用替代日历系统（例如 Hijrah 或泰国佛教徒），`java.time.chrono` 软件包允许您使用其中一个预定义日历系统。
或者你可以创建自己的。

Date-Time API 使用 [Unicode 通用语言环境数据存储库（CLDR）](http://cldr.unicode.org/)。
此存储库支持世界各种语言，并包含世界上最大的可用区域设置数据集合。这个存储库中的信息已被本地化为数百种语言。
日期时间 API 还使用[ 时区数据库（TZDB）](http://www.iana.org/time-zones)。该数据库自 1970 年以来提供有关全球每个时区变化的信息，
并介绍了自引入该概念以来的主要时区的历史记录。
