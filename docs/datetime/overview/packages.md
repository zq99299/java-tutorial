# 时间包

Date-Time API由主包java.time和四个子包组成：

* java.time

    表示日期和时间的API的核心。它包括日期，时间，日期和时间相结合的类别，时区/zones，瞬间/instants，持续时间/duration和时钟/clocks。这些类基于ISO-8601中定义的日历系统，并且不可变且线程安全。

* java.time.chrono

    用于表示除默认ISO-8601以外的日历系统的API。您也可以定义自己的日历系统。本教程不包含任何细节。
    
* java.time.format
    
    用于格式化和分析日期和时间的类。
* java.time.temporal

    扩展API主要用于框架和库编写器，允许日期和时间类之间的互操作，查询和调整。字段（TemporalField和ChronoField）和单位（TemporalUnit和ChronoUnit）在此包中定义。
    
* java.time.zone

    支持时区的类，时区的偏移和时区规则。如果使用时区，大多数开发人员只需使用**ZonedDateTime**和**ZoneId**或**ZoneOffset**