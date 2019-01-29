# 时区和偏移类 / Zone and Offset
time 是其中使用相同的标准时间；每个时区都由一个标识符来描述，并且通常具有格式地区/城市（亚洲/东京）和格林威治/ UTC时间的偏移量。例如，东京的抵消是+09：00。

**林威治/ UTC时间的偏移量** 这个很重要；+3 +8 -4 这些都是一个不带时区的时间加上时区后，和UTC时间进行对比，快还是慢

比如：北京时间2018-05-03 12:00:00 那么utc时间就是2018-05-03 04:00:00;
```
// 在中国，是用下面的获取到的就是带时区的北京时间，里面的offset就是+8:00
ZonedDateTime.now() 
```

## ZoneId和ZoneOffset
Date-Time API提供了两个用于指定时区或偏移量的类：

* ZoneId指定时区标识符并提供Instant 和LocalDateTime之间转换的规则。
* ZoneOffset指定格林威治/ UTC时间的时区偏移量。

格林威治/ UTC时间的抵消通常在整个小时内定义，但也有例外。以下代码从 TimeZoneId示例中打印出使用Greenwich / UTC中的偏移量的所有时区的列表，这些时区不是整点，没有打印的时区 都是整点或则是没有被定义的

```java
// 获取所有可用的时区
Set<String> allZones = ZoneId.getAvailableZoneIds();

// 按自然顺序排序
// Create a List using the set of zones and sort it.
List<String> zoneList = new ArrayList<String>(allZones);
Collections.sort(zoneList);

LocalDateTime dt = LocalDateTime.now();
for (String s : zoneList) {
    // 获取到的字符串可以通过ZoneId.of获取实例
    ZoneId zone = ZoneId.of(s);
    // 把本地时间加时区信息 转换成一个ZonedDateTime
    // 但是这个LocalDateTime不包含时区信息，是怎么计算出来的呢？本地时间与这个时区相差n小时？
    // 这里的偏移量是针对 格林威治标准时间来说的 +3 ，就是比标准时间快3个小时
    // 如果说一个时区是 +3;而北京是+8，那么该时区比北京慢5个小时
    // 北京时间是12点，那么该时区12-5 = 7
    ZonedDateTime zdt = dt.atZone(zone);
    ZoneOffset offset = zdt.getOffset();
    int secondsOfHour = offset.getTotalSeconds() % (60 * 60);
    String out = String.format("%35s %10s%n", zone, offset);

    // Write only time zones that do not have a whole hour offset
    // to standard out.
    if (secondsOfHour != 0) {
        System.out.printf(out);
    }
}
}
```

输出

```java
                    America/Caracas     -04:30
                   America/St_Johns     -02:30
                      Asia/Calcutta     +05:30
                       Asia/Colombo     +05:30
                         Asia/Kabul     +04:30
                     Asia/Kathmandu     +05:45
                      Asia/Katmandu     +05:45
                       Asia/Kolkata     +05:30
                       Asia/Rangoon     +06:30
                        Asia/Tehran     +04:30
                 Australia/Adelaide     +09:30
              Australia/Broken_Hill     +09:30
                   Australia/Darwin     +09:30
                    Australia/Eucla     +08:45
                      Australia/LHI     +10:30
                Australia/Lord_Howe     +10:30
                    Australia/North     +09:30
                    Australia/South     +09:30
               Australia/Yancowinna     +09:30
                Canada/Newfoundland     -02:30
                       Indian/Cocos     +06:30
                               Iran     +04:30
                            NZ-CHAT     +12:45
                    Pacific/Chatham     +12:45
                  Pacific/Marquesas     -09:30
                    Pacific/Norfolk     +11:30
```

## 日期 - 时间类
Date-Time API提供了三个基于时间的类与时区一起工作：

* ZonedDateTime使用格林威治/ UTC的时区偏移量处理具有相应时区的日期和时间。
* OffsetDateTime使用格林威治/ UTC的相应时区偏移量处理日期和时间，但不包含时区ID。
* OffsetTime使用格林威治/ UTC的相应时区偏移量处理时间，但不包含时区ID。

你什么时候使用OffsetDateTime而不是ZonedDateTime？如果您正在编写复杂的软件，该软件根据地理位置对自己的日期和时间计算规则进行建模，或者将时间戳存储在仅跟踪格林威治/ UTC时间的绝对偏移量的数据库中，则可能需要使用OffsetDateTime。另外，XML和其他网络格式将日期时间传输定义为OffsetDateTime或OffsetTime。

尽管所有三个类都保持了格林威治/ UTC时间的偏移量，但只有ZonedDateTime使用 [ZoneRules](https://docs.oracle.com/javase/8/docs/api/java/time/zone/ZoneRules.html)（java.time.zone包的一部分）来确定偏移量对于特定时区的变化方式。例如，大多数时区在将时钟向前移动到夏令时时遇到间隙（通常为1小时），并且在将时钟移回标准时间和重复转换前的最后一个小时时，时间重叠。该ZonedDateTime类适应这种情况，而OffsetDateTime和OffsetTime类，它们不具备访问ZoneRules


### ZonedDateTime
实际上，结合了 LocalDateTime与类 了zoneid类。它用于表示具有时区（地区/城市，如欧洲/巴黎）的完整日期（年，月，日）和时间（小时，分钟，秒，纳秒）。

下面的代码从 Flight示例中定义了从旧金山到东京的航班的出发时间，作为美国/洛杉矶时区的ZonedDateTime。该withZoneSameInstant和plusMinutes方法用于创建实例ZonedDateTime代表在东京的预计到达时间，650分钟的飞行后。该ZoneRules.isDaylightSavings方法确定它是否是当飞机抵达东京是否是夏令时。

DateTimeFormatter对象用于格式化ZonedDateTime实例进行打印：

```java
//        DateTimeFormatter format = DateTimeFormatter.ofPattern("MMM d yyyy  hh:mm a");
        DateTimeFormatter format = DateTimeFormatter.ofPattern("YYYY-MM-dd  HH:mm:ss");

        // Leaving from San Francisco on July 20, 2013, at 7:30 p.m.
        //  2013-07-20  19:30:00
        LocalDateTime leaving = LocalDateTime.of(2013, Month.JULY, 20, 19, 30);
        ZoneId leavingZone = ZoneId.of("America/Los_Angeles");
        ZonedDateTime departure = ZonedDateTime.of(leaving, leavingZone);

        try {
            String out1 = departure.format(format);
            System.out.printf("LEAVING:  %s (%s)%n", out1, leavingZone);
        } catch (DateTimeException exc) {
            System.out.printf("%s can't be formatted!%n", departure);
            throw exc;
        }

        // Flight is 10 hours and 50 minutes, or 650 minutes
        ZoneId arrivingZone = ZoneId.of("Asia/Tokyo");
        // 使用美国洛杉矶出发的时间，然后换算成东京的时区，返回该时区对应的时间
        ZonedDateTime arrival = departure.withZoneSameInstant(arrivingZone)
                .plusMinutes(650); // 在该时区的基础上加650分钟

        try {
            String out2 = arrival.format(format);
            System.out.printf("ARRIVING: %s (%s)%n", out2, arrivingZone);
        } catch (DateTimeException exc) {
            System.out.printf("%s can't be formatted!%n", arrival);
            throw exc;
        }

        // 夏令时
        if (arrivingZone.getRules().isDaylightSavings(arrival.toInstant()))
            System.out.printf("  (%s daylight saving time will be in effect.)%n",
                              arrivingZone);
        else
            // 标准时间
            System.out.printf("  (%s standard time will be in effect.)%n",
                              arrivingZone);
    }
```

输出

```java
LEAVING:  2013-07-20  19:30:00 (America/Los_Angeles)
ARRIVING: 2013-07-21  22:20:00 (Asia/Tokyo)
  (Asia/Tokyo standard time will be in effect.)
```

总结下：

1. 首先固定一个不带任何时区的时间
2. 把这个时间加上需要的时区，就标识这个时间就是该时区的
3. 把带时区的时间转换成 目标 时区

### OffsetDateTime

实际上，结合了 LocalDateTime与类 ZoneOffset类。它用于表示格林威治/ UTC时间的偏移量（+/-小时：分钟，例如+06：00或-）的整个日期（年，月，日）和时间（小时，分钟，秒，纳秒）08:00）。

```java
// 2017.07.20 19:30
LocalDateTime localDate = LocalDateTime.of(2013, Month.JULY, 20, 19, 30);
ZoneOffset offset = ZoneOffset.of("-08:00");

OffsetDateTime offsetDate = OffsetDateTime.of(localDate, offset);

// 当前时间月中的最后一个周4
// 得到的时间是 2017.07.25 19:30 ；时间没有错，但是偏移量有啥用？
OffsetDateTime lastThursday =
        offsetDate.with(TemporalAdjusters.lastInMonth(DayOfWeek.THURSDAY));
System.out.printf("The last Thursday in July 2013 is the %sth.%n",
                  lastThursday.getDayOfMonth());

// 但是并没有看出来有什么作用
```

### OffsetTime

实际上，结合 LocalDateTime与类 ZoneOffset类。它用于表示格林威治/ UTC时间偏移（+/-小时：分钟，例如+06：00或-08：00）的时间（小时，分钟，秒，纳秒）。
OffsetTime类是在同一场合的使用OffsetDateTime类，但跟踪的日期时不需要。

**总结下时区和偏移量的用法和转换的时候其中两个api的区别**

* withZoneSameInstant : 调用了 toEpochSecond 把当前的时间纳秒 结合 指定的偏移量换算成新的纳秒
* withZoneSameLocal ：不会换算时间，只是把时区更改了

```java
// 一个不带任何时区的时间
LocalDateTime date = LocalDateTime.of(2018, 05, 01, 0, 0, 0);

ZonedDateTime d1 = ZonedDateTime.of(date, ZoneId.systemDefault());

ZoneOffset offset = ZoneOffset.of("+08:00");
OffsetDateTime d2 = OffsetDateTime.of(date, offset);

// 2018-05-01T00:00+08:00[GMT+08:00]
// ZoneId 带了具体的ID
System.out.println(d1);
// 2018-05-01T00:00+08:00
// 而偏移没有ID,因为多个ID对应的值有可能是一样的
System.out.println(d2);

// 那么把中国时间变成其他的时间
// 2018-04-30T20:00+04:00[Asia/Yerevan]
// 把该时间转换成指定时区了
d1.withZoneSameInstant(ZoneId.of("Asia/Yerevan"));
// 2018-05-01T00:00+04:00[Asia/Yerevan]
// 只是改变了时区
d1.withZoneSameLocal(ZoneId.of("Asia/Yerevan"));
```
