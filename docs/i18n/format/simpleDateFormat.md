# 自定义格式

上一节，介绍了 DateFormat 类提供的预定义格式，在大多数情况下，这些预定义格式已足够。但是，如果要创建自己的自定义格式，则可以使用 [`SimpleDateFormat`](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html) 类。

## 关于模式（Patterns）

创建 SimpleDateFormat 对象时，指定一个 **模式字符串**。模式字符串的内容决定 **日期和时间的格式**。有关模式语法的完整描述，请参阅本章后续章节。

```java
Date today;
String output;
SimpleDateFormat formatter;

// 传入自定义模式字符串 pattern
formatter = new SimpleDateFormat(pattern, currentLocale);
today = new Date();
output = formatter.format(today);
System.out.println(pattern + " " + output);
```
下表演示了 Date 在美国（en-US） Locale 下的输出

| Pattern                      | Output                        |
| ---------------------------- | ----------------------------- |
| dd.MM.yy                     | 30.06.09                      |
| yyyy.MM.dd G 'at' hh:mm:ss z | 2009.06.30 AD at 08:29:36 PDT |
| EEE, MMM d, ''yy             | Tue, Jun 30, '09              |
| h:mm a                       | 8:29 PM                       |
| H:mm                         | 8:29                          |
| H:mm:ss:SSS                  | 8:28:36:249                   |
| K:mm a,z                     | 8:29 AM,PDT                   |
| yyyy.MMMMM.dd GGG hh:mm aaa  | 2009.June.30 AD 08:29 AM      |

## 模式和 Locale

SimpleDateFormat 类是 Locale 敏感的。如果 `SimpleDateFormat` 不带 `Locale` 参数进行实例化，则将使用默认的 Locale 确定格式。对于相同的模式，Locale 不同，则格式化结果可能不同。

```java
Date today;
String result;
SimpleDateFormat formatter;

formatter = new SimpleDateFormat("EEE d MMM yy", currentLocale);
today = new Date();
result = formatter.format(today);
System.out.println("Locale: " + currentLocale.toString());
System.out.println("Result: " + result);
```

同一个模式，当 currentLocale 不同时，将输出如下信息

```
Locale: fr_FR
Result: mar. 30 juin 09
Locale: de_DE
Result: Di 30 Jun 09
Locale: en_US
Result: Tue 30 Jun 09
```

## 日期格式模式语法

你可以使用下表的符号来设计日期和时间格式的设计

| 符号 | 含义                        | 类型          | 例子                  |
| ---- | --------------------------- | ------------- | --------------------- |
| G    | 时代代号                    | Text          | AD                    |
| y    | 年                          | Number        | 2009                  |
| M    | 一年中的一个 **月**         | Text & Number | July & 07             |
| d    | 每月的一 **天**             | Number        | 10                    |
| h    | 小时 上午 am/下午 pm (1-12) | Number        | 12                    |
| H    | 一天中的 **小时 (0-23)**    | Number        | 0                     |
| m    | 小时中的 **分钟**           | Number        | 30                    |
| s    | 分钟中的 **秒**             | Number        | 55                    |
| S    | 毫秒                        | Number        | 978                   |
| E    | 星期几                      | Text          | Tuesday               |
| D    | 一年中的 **天**             | Number        | 189                   |
| F    | 每月的 **星期几**           | Number        | 2 (2nd Wed in July)   |
| w    | 一年中的 **周**             | Number        | 27                    |
| W    | 每月中的 **周**             | Number        | 2                     |
| a    | am/pm 上午/下午             | Text          | PM                    |
| k    | 一天中的 **小时 (1-24)**    | Number        | 24                    |
| K    | 上午/下午 am/pm (0-11)      | Number        | 0                     |
| z    | 时区                        | Text          | Pacific Standard Time |
| '    | 文本转义符号                | Delimiter     | (none)                |
| '    | 单引号                      | Literal       | '                     |

## 完整示例程序

```java
package com.java;

import java.util.*;
import java.text.*;

public class SimpleDateFormatDemo {

    /**
     * 相同模式，不同 Locale ，date 格式化
     *
     * @param currentLocale
     */
    static public void displayDate(Locale currentLocale) {

        Date today;
        String result;
        SimpleDateFormat formatter;

        formatter = new SimpleDateFormat("EEE d MMM yy", currentLocale);
        today = new Date();
        result = formatter.format(today);

        System.out.println("Locale: " + currentLocale.toString());
        System.out.println("Result: " + result);
    }

    /**
     * 自定义模式和 Locale ，date 格式化
     *
     * @param pattern
     * @param currentLocale
     */
    static public void displayPattern(String pattern, Locale currentLocale) {

        Date today;
        SimpleDateFormat formatter;
        String output;

        formatter = new SimpleDateFormat(pattern, currentLocale);
        today = new Date();
        output = formatter.format(today);

        System.out.println(pattern + "   " + output);
    }

    static public void main(String[] args) {

        Locale[] locales = {
                new Locale("fr", "FR"),
                new Locale("de", "DE"),
                new Locale("en", "US")
        };
        System.out.println("相同模式，不同 Locale ，date 格式化");
        for (int i = 0; i < locales.length; i++) {
            displayDate(locales[i]);
            System.out.println();
        }

        String[] patterns = {
                "dd.MM.yy",
                "yyyy.MM.dd G 'at' hh:mm:ss z",
                "EEE, MMM d, ''yy",
                "h:mm a",
                "H:mm",
                "H:mm:ss:SSS",
                "K:mm a,z",
                "yyyy.MMMMM.dd GGG hh:mm aaa"
        };
        System.out.println("自定义模式和 Locale ，date 格式化");
        for (int k = 0; k < patterns.length; k++) {
            displayPattern(patterns[k], new Locale("en", "US"));
            displayPattern(patterns[k], new Locale("zh", "CN"));
            System.out.println();
        }

        System.out.println();
    }
}

```

测试信息输出

```
相同模式，不同 Locale ，date 格式化
Locale: fr_FR
Result: jeu. 16 juil. 20

Locale: de_DE
Result: Do 16 Jul 20

Locale: en_US
Result: Thu 16 Jul 20

自定义模式和 Locale ，date 格式化
dd.MM.yy   16.07.20
dd.MM.yy   16.07.20

yyyy.MM.dd G 'at' hh:mm:ss z   2020.07.16 AD at 07:36:48 CST
yyyy.MM.dd G 'at' hh:mm:ss z   2020.07.16 公元 at 07:36:48 CST

EEE, MMM d, ''yy   Thu, Jul 16, '20
EEE, MMM d, ''yy   星期四, 七月 16, '20

h:mm a   7:36 PM
h:mm a   7:36 下午

H:mm   19:36
H:mm   19:36

H:mm:ss:SSS   19:36:48:429
H:mm:ss:SSS   19:36:48:430

K:mm a,z   7:36 PM,CST
K:mm a,z   7:36 下午,CST

yyyy.MMMMM.dd GGG hh:mm aaa   2020.July.16 AD 07:36 PM
yyyy.MMMMM.dd GGG hh:mm aaa   2020.七月.16 公元 07:36 下午
```

