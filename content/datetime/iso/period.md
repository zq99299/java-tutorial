# 周期和持续时间 / Period and Duration
当您编写代码来指定一段时间时，请使用最符合您需要的类或方法： Duration类， Period类或 ChronoUnit.between方法。甲持续时间测量使用基于时间的值（秒，毫微秒）的时间量。Period使用基于日期的值（年，月，日）。

**注：**一天的持续/Duration时间正好是24小时。一天的时间，当添加到ZonedDateTime时，可能会根据时区而变化。例如，如果它发生在夏令时的第一天或最后一天。

## Duration

在测量机器时间的情况下，Duration最合适，例如使用Instant对象的代码。Duration对象以秒或纳秒度量，不使用基于Date的结构，如年、月和日，尽管类提供了转换为天数、小时和分钟的方法。一个Duration可以有一个负值，如果它是在开始点之前发生的端点创建的。

以下代码以纳秒计算两个瞬间之间的持续时间：
```java
// 可以用来统计一个方法执行了多长时间
        Instant t1, t2;
...
        long ns = Duration.between(t1, t2).toNanos();
```

比如：将10秒变成一个Duration，再让start加上这个Duration，也就是加10秒； 

这种api可能会更灵活，在计算完两个时间点的持续时间后，还可以进行计算
```java
Instant start = Instant.now();
Duration gap = Duration.ofSeconds(10);
Instant later = start.plus(gap);
System.out.println(later);
```