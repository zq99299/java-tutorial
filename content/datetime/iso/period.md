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

## ChronoUnit
定义了用于测量时间的单位。当你想要在一个单位的时间内测量一段时间，比如几天或几秒时，ChronoUnit.between 可以做到。between方法与所有基于时间的对象一起工作，但是它只返回单个单元的数量。下面的代码以毫秒为间隔计算两个时间戳之间的差距：

```java
Instant current = Instant.now();
        // 10秒前
        Instant previous = current.minus(10, ChronoUnit.SECONDS);
        if (previous != null) {
            // 计算两个时间之前间隔多少毫秒
            long between = ChronoUnit.MILLIS.between(previous, current);
            System.out.println(between); // 10000
        }
```

而 Duration 类则可以转换为更多的时间单位；

## Period
要用基于日期的值（年、月、日）来定义大量的时间，使用周期类。周期类提供了各种get方法，例如 `getMonths`， `getDays`和 `getYears`，这样您就可以从周期中提取出时间的数量。

时间由三个单位组成：月、日、年。为了显示在一个单位时间内测量的时间量，比如天数，你可以使用ChronoUnit.between的方法。

下面的代码报告了你的年龄，假设你是在1960年1月1日出生的。周期类用于确定数年、月和日的时间。同一时期，在总天数中，是通过使用ChronoUnit.between来确定的。在方法之间，在括号中显示：
```java
LocalDate today = LocalDate.now();
// 1960.06.01
LocalDate birthday = LocalDate.of(1960, Month.JANUARY, 1);

Period p = Period.between(birthday, today);
long p2 = ChronoUnit.DAYS.between(birthday, today);
// 生活了58年，4个月，8天，总共21313天
System.out.println("You are " + p.getYears() + " years, " + p.getMonths() +
                           " months, and " + p.getDays() +
                           " days old. (" + p2 + " days total)");
                                   
// 下面是输出
You are 58 years, 4 months, and 8 days old. (21313 days total)
```

这些计算不考虑时区差异。举个例子，如果你出生在澳大利亚，但现在住在班加罗尔，这就会略微影响你的确切年龄。在这种情况下，使用一个周期与ZonedDateTime类一起使用。当你向一个ZonedDateTime添加一个Period时，时间差异就会被观察到。


## 总结
* Duration ： 可被转换为天,小时，分钟，秒，毫秒，纳秒
* Period ：可被转换为年，月，天
* ChronoUnit：可以测量任意一个单位的间隔时间；也提供了各种单位常量
