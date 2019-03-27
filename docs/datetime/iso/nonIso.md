# 非 ISO 日期转换
本教程没有详细讨论 `java.time.chrono` 包。然而，如果知道这个包提供了几个预定义的时间点，
比如日语、希贾拉、Minguo 和泰国佛教徒，可能会很有用。你也可以使用这个包来创建你自己的年表。

本部分向您介绍如何在其他预定义时间顺序之一中基于 ISO 的日期和日期之间进行转换。

## 转换为非基于 ISO 的日期

您可以使用 `from(TemporalAccessor)` 方法（如 `JapaneseDate.from(TemporalAccessor)`）
将基于 ISO 的日期转换为另一个年代表中的日期。如果无法将日期转换为有效实例，则此方法会引发 DateTimeException。
以下代码将 LocalDateTime 实例转换为几个预定义的非 ISO 日历日期：

```java
LocalDateTime date = LocalDateTime.of(2013, Month.JULY, 20, 19, 30);
JapaneseDate jdate = JapaneseDate.from(date);
HijrahDate hdate = HijrahDate.from(date);
// 中华民国 台湾
MinguoDate mdate = MinguoDate.from(date);
ThaiBuddhistDate tdate = ThaiBuddhistDate.from(date);
```

下列程序将 LocalDate 转换为 ChronoLocalDate 并返回到 String；
采用指定的日历表格式化成指定的格式；另外采用指定的日历表和格式解析字符串为 date; 注意 `DateTimeFormatterBuilder()` 的使用

```java
/*
 * Convert LocalDate -> ChronoLocalDate -> String and back.
 */

public class StringConverter {

    /**
     * 将LocalDate（ISO）值转换为日期日期日期
     * 使用所提供的年表，然后格式化
     * 使用DateTimeFormatter与一个字符串的日期时间
     * 基于年表和当前地区的短模式。
     * @param localDate - ISO日期转换和格式。
     * @param chrono    - 可选的日历年表，如果为空则默认使用IsoChronology
     */
    public static String toString(LocalDate localDate, Chronology chrono) {
        if (localDate != null) {
            // 特定功能获取/设置缺省语言环境。
            // 获取默认的语言环境
            Locale locale = Locale.getDefault(Locale.Category.FORMAT);
            ChronoLocalDate cDate;
            if (chrono == null) {
                chrono = IsoChronology.INSTANCE;
            }
            try {
                cDate = chrono.date(localDate);
            } catch (DateTimeException ex) {
                System.err.println(ex);
                chrono = IsoChronology.INSTANCE;
                cDate = localDate;
            }
            String pattern = "M/d/yyyy GGGGG";
            DateTimeFormatter dateFormatter =
                    DateTimeFormatter.ofPattern(pattern);
            return dateFormatter.format(cDate);
        } else {
            return "";
        }
    }

    /**
     * 使用DateTimeFormatter将字符串解析为计时日期
     * 基于当前语言环境的短模式
     * 提供年表，然后将其转换为LocalDate（ISO）值。
     * @param text   - 已简短的格式输入日期文本
     * @param chrono - 可选的日历年表，如果为空则默认使用IsoChronology
     */
    public static LocalDate fromString(String text, Chronology chrono) {
        if (text != null && !text.isEmpty()) {
            Locale locale = Locale.getDefault(Locale.Category.FORMAT);
            if (chrono == null) {
                chrono = IsoChronology.INSTANCE;
            }
            String pattern = "M/d/yyyy GGGGG";
            DateTimeFormatter df = new DateTimeFormatterBuilder().parseLenient()
                    .appendPattern(pattern)
                    .toFormatter()
                    .withChronology(chrono)
                    .withDecimalStyle(DecimalStyle.of(locale));
            TemporalAccessor temporal = df.parse(text);
            ChronoLocalDate cDate = chrono.date(temporal);
            return LocalDate.from(cDate);
        }
        return null;
    }

    public static void main(String[] args) {
        LocalDate date = LocalDate.of(1996, Month.OCTOBER, 29);
        System.out.printf("%s%n",
                          StringConverter.toString(date, JapaneseChronology.INSTANCE));
        System.out.printf("%s%n",
                          StringConverter.toString(date, MinguoChronology.INSTANCE));
        System.out.printf("%s%n",
                          StringConverter.toString(date, ThaiBuddhistChronology.INSTANCE));
        System.out.printf("%s%n",
                          StringConverter.toString(date, HijrahChronology.INSTANCE));

      // 转换/解析为基于ISO的日期

        System.out.printf("%s%n", StringConverter.fromString("10/29/0008 H",
                                                             JapaneseChronology.INSTANCE));
        System.out.printf("%s%n",
                          StringConverter.fromString("10/29/0085 1",
                                                     MinguoChronology.INSTANCE));
        System.out.printf("%s%n",
                          StringConverter.fromString("10/29/2539 B.E.",
                                                     ThaiBuddhistChronology.INSTANCE));
        System.out.printf("%s%n",
                          StringConverter.fromString("6/16/1417 1",
                                                     HijrahChronology.INSTANCE));
    }
}
```

输出

```java
10/29/0008 H
10/29/0085 1
10/29/2539 B.E.
6/16/1417 1
1996-10-29
1996-10-29
1996-10-29
1996-10-29
```

## 转换/解析为基于 ISO 的日期
您可以使用静态 LocalDate.from 方法将非 ISO 日期转换为 LocalDate 实例 ，如以下示例所示：

```java
LocalDate date = LocalDate.from(JapaneseDate.now());
```

其他基于时间的类也提供此方法，如果无法转换日期，则会引发 DateTimeException。

示例在上面
