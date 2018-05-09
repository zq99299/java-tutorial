# 问题和练习

## 问题

1. 你会在几年，几个月，几天，几秒和几纳秒之间使用哪一类来存储你的生日？
    
    答：LocalDate

2. 给定一个随机日期，你如何找到上个星期四的日期？
    
    答：
    ```java
     LocalDate date = LocalDate.now();
        // 通过TemporalAdjusters.previous返回一个函数
        // 对于该题来说，源码中 也是获取星期几然后进行往前推进几天，源码很简单
        LocalDate with = date.with(TemporalAdjusters.previous(DayOfWeek.THURSDAY));
    ```

3. ZoneId和ZoneOffset有什么区别？

    答：ZoneId中包含了ZoneOffset

4. 你如何将Instant转换为ZonedDateTime？你会如何转换一个ZonedDateTime到Instant？

    答：
    ```java
     Instant now = Instant.now();
        // instant 不包含时区信息，所以需要提供一个时区
        ZonedDateTime zonedDateTime = ZonedDateTime.ofInstant(now, ZoneId.systemDefault());
        zonedDateTime.toInstant();
    ```

## 练习
1. 写一个例子，在给定的一年里，报告当年每个月的时间长度。

2. 写一个例子，在当年的某个特定月份，列出当月的所有星期一。

3. 写一个例子，测试一个给定的日期是否发生在13日星期五。