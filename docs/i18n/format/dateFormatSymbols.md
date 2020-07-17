# 更改日期格式符号

SimpleDateFormat 类的 format 方法返回一个由 **数字和符号** 组成的字符串。例如，在字符串「Friday, April 10, 2009」中，符号是「Friday」和「April」。如果在 SimpleDateFormat 中封装的符号不能满足您的需要，您可以使用DateFormatSymbols 更改它们。您可以更改表示月份、星期数和时区等名称的符号。

下表列出了 DateFormatSymbols 修改符号的方法:

| Setter Method      | 修改示例 |
| ------------------ | -------- |
| `setAmPmStrings`   | PM       |
| `setEras`          | AD       |
| `setMonths`        | December |
| `setShortMonths`   | Dec      |
| `setShortWeekdays` | Tue      |
| `setWeekdays`      | Tuesday  |
| `setZoneStrings`   | PST      |

下面示例，将星期几的小写字母改成大写字母的示例

```java
import java.text.DateFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class DateFormatSymbolsDemo {
    public static void main(String[] args) {
        changeWeekDays();
    }

    static public void changeWeekDays() {
        Date today;
        String result;
        SimpleDateFormat formatter;
        DateFormatSymbols symbols;
        String[] defaultDays;
        String[] modifiedDays;

        symbols = new DateFormatSymbols(new Locale("en", "US"));
        defaultDays = symbols.getShortWeekdays();

        // 打印 en-us 默认格式化的符号
        for (int i = 0; i < defaultDays.length; i++) {
            System.out.print(defaultDays[i] + " ");
        }
        System.out.println();

        String[] capitalDays = {
                "", "SUN", "MON",
                "TUE", "WED", "THU",
                "FRI", "SAT"
        };
        symbols.setShortWeekdays(capitalDays);

        // 打印 en-us 自定义格式化的符号
        modifiedDays = symbols.getShortWeekdays();
        for (int i = 0; i < modifiedDays.length; i++) {
            System.out.print(modifiedDays[i] + " ");
        }
        System.out.println();
        System.out.println();

        formatter = new SimpleDateFormat("E", symbols);
        today = new Date();
        result = formatter.format(today);
        System.out.println("Today's day of the week: " + result);
    }
}
```

输出信息

```
 Sun Mon Tue Wed Thu Fri Sat 
 SUN MON TUE WED THU FRI SAT 

Today's day of the week: FRI
```

可以看到，默认的星期几是小写的，我们替换成我们自定义全大写的