# 周期和持续时间 / Period and Duration
当您编写代码来指定一段时间时，请使用最符合您需要的类或方法： Duration类， Period类或 ChronoUnit.between方法。甲持续时间测量使用基于时间的值（秒，毫微秒）的时间量。Period使用基于日期的值（年，月，日）。

**注：**一天的持续/Duration时间正好是24小时。一天的时间，当添加到ZonedDateTime时，可能会根据时区而变化。例如，如果它发生在夏令时的第一天或最后一天。

## Duration