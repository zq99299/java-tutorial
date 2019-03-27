# 时间包

Date-Time API 由主包 java.time 和四个子包组成：

* java.time

    表示日期和时间的 API 的核心。它包括日期，时间，日期和时间相结合的类别，
    时区/zones，瞬间/instants，持续时间/duration 和 时钟/clocks。这些类基于 ISO-8601 中定义的日历系统，
    并且不可变且线程安全。

* java.time.chrono

    用于表示除默认 ISO-8601 以外的日历系统的 API。您也可以定义自己的日历系统。本教程不包含任何细节。

* java.time.format

    用于格式化和分析日期和时间的类。
* java.time.temporal

    扩展 API 主要用于框架和库编写器，允许日期和时间类之间的互操作，查询和调整。字段（TemporalField 和 ChronoField）
    和单位（TemporalUnit 和 ChronoUnit）在此包中定义。

* java.time.zone

    支持时区的类，时区的偏移和时区规则。如果使用时区，大多数开发人员只需使用 **ZonedDateTime** 和 **ZoneId** 或 **ZoneOffset**
