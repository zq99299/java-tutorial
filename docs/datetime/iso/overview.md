# 概述
有两种表示时间的基本方法。
 * 人类时间：比如年，月，日，时，分和秒。
 * 机器时间：以时间线连续测量时间，从一个称为时代的起点开始，以纳秒为单位。
 
 Date-Time包提供了丰富的表示日期和时间的类。Date-Time API中的某些类用于表示机器时间，其他类更适合表示人类时间。
 
 首先确定您需要的日期和时间的哪些方面，然后选择满足这些需求的课程或课程。选择基于时间的课程时，首先要确定是否需要表示人类时间或机器时间。然后，您可以确定需要表示的时间。你需要一个时区吗？日期和时间？仅限日期？如果你需要一个日期，你需要月，日和年，或者一个子集？
 
 > 术语：在本教程 中，Date-Time API中用于捕获和处理日期或时间值（如Instant，LocalDateTime和ZonedDateTime）的类称为基于时间的类（或类型）。支持类型，如TemporalAdjuster接口或DayOfWeek枚举，不包含在此定义中。
 
 例如，您可以使用LocalDate对象来表示出生日期，因为大多数人在同一天观察他们的生日，无论他们是在其出生城市还是在国际日期线的另一侧的全球范围内。如果您正在追踪占星术时间，那么您可能需要使用LocalDateTime对象来表示出生日期和时间，或者使用ZonedDateTime（其中还包括时区）。如果你正在创建一个时间戳，那么你很可能会使用一个Instant，它允许你将时间线上的一个瞬时点与另一个点进行比较。
 
 下表总结了java.time包中存储日期和/或时间信息或可用于测量时间量的基于时间的类。列中的复选标记表示该类使用该特定类型的数据，而toString 列显示使用toString方法打印的实例。
 
| 类或枚举| Year | Month | Day| Hours| Minutes| Seconds* | 区域偏移 / Zone Offset | 区域ID / Zone ID | toString输出 | 相关课程 
|--|--|--|--|--|--|--|--|--|---|--
| Instant | - | - |- |- |- | ✔ |- |- | 2013-08-20T15：16：26.355Z | [瞬时](/content/datetime/iso/instant.md) 
| LocalDate | ✔ | ✔ | ✔ | - |- | - |- |- | 2013-08-20 | [日期类 ](/content/datetime/iso/date.md)
| LocalDateTime | ✔ | ✔ |✔ |✔ |✔  | ✔  |- |- | 2013-08-20T08:16:26.937 | [日期和时间类 ](/content/datetime/iso/datetime.md)
| ZonedDateTime | ✔| ✔ | ✔ | ✔ | ✔ | ✔ |✔ | ✔ | 2013-08-21T00:16:26.941+09:00[Asia/Tokyo] | [时区和偏移类](/content/datetime/iso/timezones.md)
| LocalTime | - | - |- |✔ |✔ | ✔ |- |- | 08:16:26.943 | [日期和时间类 ](/content/datetime/iso/datetime.md)
| MonthDay | - | ✔ | ✔ |- |- | - |- |- | --08-20 | [日期类 ](/content/datetime/iso/date.md)
| Year | ✔ | - |- |- |- | - |- |- | 	2013 | [日期类 ](/content/datetime/iso/date.md)
| YearMonth | ✔ | ✔ |- |- |- | - |- |- | 2013-08 | [日期类 ](/content/datetime/iso/date.md)
| Month | - | ✔ |- |- |- | - |- |- | 	AUGUST | [DayOfWeek and Month Enums](/content/datetime/iso/enum.md)
| OffsetDateTime | ✔ | ✔ |✔ |✔ |✔  | ✔ |- |- | 	2013-08-20T08:16:26.954-07:00 | [时区和偏移类](/content/datetime/iso/timezones.md)
| OffsetTime | - | - |- |✔ |✔ | ✔ |- |- | - | [时区和偏移类](/content/datetime/iso/timezones.md)
| Duration | - | - | `**` | `**` | `**` | ✔  |- |- | PT20H (20 hours) | [周期和持续时间](/content/datetime/iso/period.md)
| Period | ✔ | ✔ |✔ |- |- | - |`***`|`***`| P10D (10 days) | [周期和持续时间](/content/datetime/iso/period.md)

* `*`秒被捕获到纳秒精度。
* `**`这个类不存储这些信息，但有方法在这些单元中提供时间。
* `***`将周期添加到ZonedDateTime时，会观察到夏令时或其他本地时差。
