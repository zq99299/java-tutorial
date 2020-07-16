# 自定义格式

可以使用 DecimalFormat 类将 **十进制数字格式化为特定于 Locale 的字符串**。这个类允许您控制 **前导和后导零**、**前缀和后缀**、**分组(千位)分隔符** 和 **十进制分隔符** 的显示。如果您希望更改格式化符号，比如十进制分隔符，可以将 `DecimalFormatSymbols` 与 `DecimalFormat` 类结合使用。这些类在数字格式化方面提供了很大的灵活性，但是它们会使代码更加复杂。

下面代码演示了如何使用  `DecimalFormatSymbols` 与 `DecimalFormat` ，文末会给出该示例的完整代码

## 构建模式

您可以使用 **模式字符串** 指定 DecimalFormat 的格式设置属性。该模式确定格式化后的数字是什么样。有关模式语法的完整说明，请参见后续数字格式模式语法。

下面的实例讲模式字符串传递给 DecimalFormat 构造函数来创建格式化程序。

```java
DecimalFormat myFormatter = new DecimalFormat(pattern);
// 接受一个 double 值，并返回格式化后的字符串
String output = myFormatter.format(value);
System.out.println(value + " " + pattern + " " + output);
```

下表展示了，不同 value 与不同的 pattern 的输出结果，和相关的说明

| `value`    | `pattern`         | `output`    | Explanation                                                  |
| ---------- | ----------------- | ----------- | ------------------------------------------------------------ |
| 123456.789 | ###,###.###       | 123,456.789 | `#` 表示一个数字，有几个表示几个；`,` 表示几个数组为一组进行分组的占位符；`.` 小数点分隔占位符 |
| 123456.789 | ###.##            | 123456.79   | value 有三位小数，但是 pattern 只有 2 位，结果将保留两位小数（通过 **舍入** 来保留） |
| 123.78     | 000000.000        | 000123.780  | 指定前导和后导 0 的个数，注意，这里 0 也代替 `#`，不足位数将使用  0 补足 |
| 12345.67   | $###,###.###      | $12,345.67  | pattern 的第一个字符是美元符号，它紧靠格式化输出中最左边的数字 |
| 12345.67   | \u00A5###,###.### | ¥12,345.67  | 该模式使用 Unicode 值 00A5 指定日元（¥）的货币符号。         |

## Locale 敏感格式化

前面创建 DecimalFormat 使用了默认的 Locale 创建的，要自定义 Locale 则需要使用如下的方式

```java
NumberFormat nf = NumberFormat.getNumberInstance(loc);
// NumberFormat 继承自 DecimalFormat，所以可以直接强转
DecimalFormat df = (DecimalFormat)nf;
// 再应用自定义模式
df.applyPattern(pattern);
String output = df.format(value);
System.out.println(pattern + " " + output + " " + loc.toString());
```

指定 `###,###.###` 模式，不同的 Locale 都会格式化为相同的格式字符串结果

```
###,###.###  123,456.789  en_US
###,###.###  123.456,789  de_DE
###,###.###  123 456,789  fr_FR
```

## 更改格式符号

您可以使用 DecimalFormatSymbols 类来更改出现在 format 方法生成的带格式数字中的符号。这些符号包括小数点分隔符，分组分隔符，减号和百分号等。

- setDecimalSeparator：设置小数点分隔符
- setGroupingSeparator：设置分组分隔符
- setGroupingSize：设置分组大小

```java
DecimalFormatSymbols unusualSymbols = new DecimalFormatSymbols(currentLocale);
unusualSymbols.setDecimalSeparator('|');
unusualSymbols.setGroupingSeparator('^');

// 注意这里的模式，是用的标准的模式语法
// 但是调用了上述方式之后，在格式化输出时会用上述自定义的分隔符覆盖掉默认的分隔符
String strange = "#,##0.###";
DecimalFormat weirdFormatter = new DecimalFormat(strange, unusualSymbols);
// 上面模式中定义的是 3 个分一组，但是这里重新定义为 4 个数字为一组
weirdFormatter.setGroupingSize(4);

String bizarre = weirdFormatter.format(12345.678);
System.out.println(bizarre);
// 结果 1^2345|678
// 实际上 #,##0.### 按标准的将会输出 12,345.678
```

## 数字格式模式语法

您可以按照以下 BNF 图指定的规则设计数字的格式格式：

```
pattern    := subpattern{;subpattern}
subpattern := {prefix}integer{.fraction}{suffix}
prefix     := '\\u0000'..'\\uFFFD' - specialCharacters
suffix     := '\\u0000'..'\\uFFFD' - specialCharacters
integer    := '#'* '0'* '0'
fraction   := '0'* '#'*
```

| 符号      | 描述                            |
| --------- | ------------------------------- |
| `X*`      | 0 个或多个 X                    |
| `(X | Y)` | X 或 Y                          |
| `X..Y`    | 从 X 到 Y 的任何字符（包括）    |
| `S - T`   | S 中的字符，但是 T 中的字符除外 |
| `{X}`     | X 是可选的                      |

在前面的  pattern 中，第一个  subpattern 是正数的模式，第二个是负数的模式（可选的），尽管在 BNF 图中未注明，但逗号 `,` 可能会出现在 integer 部分内。

在子模式中，可以使用特殊符号指定格式。下表描述了这些符号：

| 符号 | 描述                                                         |
| ---- | ------------------------------------------------------------ |
| `0`  | 一个数字                                                     |
| `#`  | 一个数字，0 表示不存在                                       |
| `.`  | 小数点分隔符的占位符                                         |
| `,`  | 分组分隔符的占位符                                           |
| `E`  | 以指数格式分隔位数和指数                                     |
| `;`  | 分隔格式                                                     |
| `-`  | 默认负前缀                                                   |
| `%`  | 乘以 100 并显示为百分比                                      |
| `?`  | 乘以 1000 并显示为千分之一                                   |
| `¤`  | 货币符号，被货币符号所取代；若加倍，以国际货币符号代替;<br/>如果在模式中出现，则使用货币小数分隔符而不是小数分隔符 |
| `X`  | 前缀或后缀中可以使用任何其他字符                             |
| `'`  | 用于在前缀或后缀中引用特殊字符                               |

## 完整示例

```java
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.NumberFormat;
import java.util.Locale;

public class DecimalFormatDemo {
    /**
     * 自定义模式
     * @param pattern
     * @param value
     */
    static public void customFormat(String pattern, double value) {
        DecimalFormat myFormatter = new DecimalFormat(pattern);
        String output = myFormatter.format(value);
        System.out.println(value + "  " + pattern + "  " + output);
    }

    /**
     * 自定义模式，并自定义 locale
     * @param pattern
     * @param value
     * @param loc
     */
    static public void localizedFormat(String pattern, double value,
                                       Locale loc) {
        NumberFormat nf = NumberFormat.getNumberInstance(loc);
        DecimalFormat df = (DecimalFormat) nf;
        df.applyPattern(pattern);
        String output = df.format(value);
        System.out.println(pattern + "  " + output + "  " + loc.toString());
    }

    static public void main(String[] args) {

        customFormat("###,###.###", 123456.789);
        customFormat("###.##", 123456.789);
        customFormat("000000.000", 123.78);
        customFormat("$###,###.###", 12345.67);
        customFormat("\u00a5###,###.###", 12345.67);

        Locale currentLocale = new Locale("en", "US");

        DecimalFormatSymbols unusualSymbols =
                new DecimalFormatSymbols(currentLocale);
        unusualSymbols.setDecimalSeparator('|');
        unusualSymbols.setGroupingSeparator('^');
        String strange = "#,##0.###";
        DecimalFormat weirdFormatter = new DecimalFormat(strange, unusualSymbols);
        weirdFormatter.setGroupingSize(4);
        String bizarre = weirdFormatter.format(12345.678);
        System.out.println(bizarre);

        Locale[] locales = {
                new Locale("en", "US"),
                new Locale("de", "DE"),
                new Locale("fr", "FR")
        };

        for (int i = 0; i < locales.length; i++) {
            localizedFormat("###,###.###", 123456.789, locales[i]);
        }
    }
}
```

测试输出

```
====== 自定义模式输出信息
123456.789  ###,###.###  123,456.789
123456.789  ###.##  123456.79
123.78  000000.000  000123.780
12345.67  $###,###.###  $12,345.67
12345.67  ¥###,###.###  ¥12,345.67

====== 自定义分隔符等信息输出
1^2345|678

====== 自定义模式和 Locale，使用同一个模式字符串发送
###,###.###  123,456.789  en_US
###,###.###  123.456,789  de_DE
###,###.###  123 456,789  fr_FR
```

