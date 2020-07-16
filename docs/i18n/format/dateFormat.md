# 使用预定义格式

DateFormat 类允许您以 Locale 敏感的方式使用 **预定义样式格式化日期和时间**。本节将演示如何使用 DateFormat。

## 日期

格式化日期需要两步：

- getDateInstance：获取格式化程序
- format：传入日期，返回格式化后的字符串

```java
Date today;
String dateOut;
DateFormat dateFormatter;
// 获取格式化程序
dateFormatter = DateFormat.getDateInstance(DateFormat.DEFAULT, currentLocale);
today = new Date();
// 格式化日期
dateOut = dateFormatter.format(today);

System.out.println(dateOut + " " + currentLocale.toString());
```

注意的是：DateFormat 是对 Locale 敏感的，根据传入的 Locale 不同格式化后的表现细节不同

```
30 juin 2009     fr_FR
30.06.2009       de_DE
Jun 30, 2009     en_US
2020-7-16 		 zh_CN
```

前面的代码示例指定了默认格式样式。默认样式只是 DateFormat 类提供的预定义格式样式之一，如下所示:

- DEFAULT
- SHORT
- MEDIUM
- LONG
- FULL

下表显示了在美国 Locale 和法国 Locale 在相同预设格式化下的值

| Style     | 美国  Locale           | 法国 Locale        |
| --------- | ---------------------- | ------------------ |
| `DEFAULT` | Jun 30, 2009           | 30 juin 2009       |
| `SHORT`   | 6/30/09                | 30/06/09           |
| `MEDIUM`  | Jun 30, 2009           | 30 juin 2009       |
| `LONG`    | June 30, 2009          | 30 juin 2009       |
| `FULL`    | Tuesday, June 30, 2009 | mardi 30 juin 2009 |

## 时间

Date 对象表示日期和时间，类似于日期格式化，不同的是获取格式化程序是使用 `getTimeInstance` 方法

```java
DateFormat timeFormatter =
    DateFormat.getTimeInstance(DateFormat.DEFAULT, currentLocale);
```

下面显示了美国 Locale 和德国 Locale 预定义格式化值

| Style     | 美国 Locale    | 德国 Locale  |
| --------- | -------------- | ------------ |
| `DEFAULT` | 7:03:47 AM     | 7:03:47      |
| `SHORT`   | 7:03 AM        | 07:03        |
| `MEDIUM`  | 7:03:47 AM     | 07:03:07     |
| `LONG`    | 7:03:47 AM PDT | 07:03:45 PDT |
| `FULL`    | 7:03:47 AM PDT | 7.03 Uhr PDT |

## 日期和时间

将 Date 格式化为日期和时间的完整字符串，使用 `getDateTimeInstance` 获取格式化程序：

- 第一个参数：是日期样式
- 第二个参数：是时间样式

```
DateFormat formatter = DateFormat.getDateTimeInstance(
                           DateFormat.LONG, 
                           DateFormat.LONG, 
                           currentLocale);
```

下表显示了在美国 Locale 和法国 Locale 在相同预设格式化下的值

| Style     | 美国 Locale                           | 法国 Locale                    |
| --------- | ------------------------------------- | ------------------------------ |
| `DEFAULT` | Jun 30, 2009 7:03:47 AM               | 30 juin 2009 07:03:47          |
| `SHORT`   | 6/30/09 7:03 AM                       | 30/06/09 07:03                 |
| `MEDIUM`  | Jun 30, 2009 7:03:47 AM               | 30 juin 2009 07:03:47          |
| `LONG`    | June 30, 2009 7:03:47 AM PDT          | 30 juin 2009 07:03:47 PDT      |
| `FULL`    | Tuesday, June 30, 2009 7:03:47 AM PDT | mardi 30 juin 2009 07 h 03 PDT |

## 完整示例程序

