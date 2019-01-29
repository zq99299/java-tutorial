# 时间调节器/adjusters

TemporalAdjuster接口，在java.time.temporal包，提供了具有时间价值并返回调整值的方法。调节器可以用于任何基于时间/Temporal的类型。

如果一个调整器与一个ZonedDateTime一起使用，那么就会计算出一个新的日期，它保留了原始的时间和时区值。

## 预定义的调节器
 TemporalAdjusters类（注意是复数）提供了一组用于查找月的第一天或最后一天预定义的调节器，在今年的第一天或最后一天，每月的最后一个星期三，或特定日期后的第一个星期二，举几个例子。预定义的调整器被定义为静态方法，并被设计为与 静态导入语句一起使用。
 
 下示例使用多个TemporalAdjusters方法，并结合基于时间的类中定义的with方法计算基于2000年10月15日的原始日期的新日期： 下面每个TemporalAdjusters调用的方法 返回的都是一个 函数接口实例 TemporalAdjuster；
 
```java
// 2000 10 15
LocalDate date = LocalDate.of(2000, Month.OCTOBER, 15);
DayOfWeek dotw = date.getDayOfWeek(); // 获取当天是周几
System.out.printf("%s is on a %s%n", date, dotw);

System.out.printf("first day of Month: %s%n",
        date.with(TemporalAdjusters.firstDayOfMonth())); // 当月第一天
System.out.printf("first Monday of Month: %s%n",
        date.with(TemporalAdjusters.firstInMonth(DayOfWeek.MONDAY))); // 当月第一个周一
System.out.printf("last day of Month: %s%n",
        date.with(TemporalAdjusters.lastDayOfMonth())); // 当月最后一天
System.out.printf("first day of next Month: %s%n",
        date.with(TemporalAdjusters.firstDayOfNextMonth())); // 基于当前月的下个月第一天
System.out.printf("first day of next Year: %s%n",
        date.with(TemporalAdjusters.firstDayOfNextYear())); // 基于当前时间 下一年的第一天
System.out.printf("first day of Year: %s%n",
        date.with(TemporalAdjusters.firstDayOfYear())); // 基于当年的第一天
``` 

输出
```java
2000-10-15 is on a SUNDAY
first day of Month: 2000-10-01
first Monday of Month: 2000-10-02
last day of Month: 2000-10-31
first day of next Month: 2000-11-01
first day of next Year: 2001-01-01
first day of Year: 2000-01-01
```

## 自定义调结器
你也可以自定义一个调结器；比如：每月15号发工资，但是你是15号后入职的，那么就月底最后一天发，如果遇到周6周日，则推前到周5
```java
public void fun27(){
        LocalDate d1 = LocalDate.of(2018, 05, 13);
        LocalDate d2 = LocalDate.of(2018, 05, 16);
        PaydayAdjuster adjuster = new PaydayAdjuster();
        System.out.println(d1.with(adjuster));
        System.out.println(d2.with(adjuster));
}
 
 public class PaydayAdjuster implements TemporalAdjuster {

        /**
         * The adjustInto method accepts a Temporal instance
         * and returns an adjusted LocalDate. If the passed in
         * parameter is not a LocalDate, then a DateTimeException is thrown.
         */
        public Temporal adjustInto(Temporal input) {
            LocalDate date = LocalDate.from(input);
            int day;
            if (date.getDayOfMonth() < 15) {
                day = 15;
            } else {
                // 如果大于15号，则当月最后一天
                day = date.with(TemporalAdjusters.lastDayOfMonth()).getDayOfMonth();
            }
            date = date.withDayOfMonth(day);
            if (date.getDayOfWeek() == DayOfWeek.SATURDAY ||
                    date.getDayOfWeek() == DayOfWeek.SUNDAY) {
                // 如果是周6或周日，则当前时间的前一个星期五
                // 也就是：如果遇到发工资那天是星期周六日的话，则提前到周五
                date = date.with(TemporalAdjusters.previous(DayOfWeek.FRIDAY));
            }

            return input.with(date);
        }
    }
```

输出

```java
2018-05-15
2018-05-31
```