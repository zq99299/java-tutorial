# 使用预定义格式

通过调用 NumberFormat 类提供的方法，可以根据 Locale 对数字、货币和百分比进行格式化。下面通过一个示例程序来演示格式化技术。

## 数字

可以使用 NumberFormat  来格式化基本类型的数字。

```java
static public void displayNumber(Locale currentLocale) {

    Integer quantity = new Integer(123456);
    Double amount = new Double(345987.246);
    NumberFormat numberFormatter;
    String quantityOut;
    String amountOut;

    // 根据指定的 Locale 返回对应的 NumberFormat 实例
    numberFormatter = NumberFormat.getNumberInstance(currentLocale);
    // 然后进行格式化
    quantityOut = numberFormatter.format(quantity);
    amountOut = numberFormatter.format(amount);
    System.out.println(quantityOut + "   " + currentLocale.toString());
    System.out.println(amountOut + "   " + currentLocale.toString());
}
```

不同的 Locale 将显示不同的值，如下所示

```
123 456   fr_FR
345 987,246   fr_FR
123.456   de_DE
345.987,246   de_DE
123,456   en_US
345,987.246   en_US
123,456   zh_CN
345,987.246   zh_CN
```

## 使用阿拉伯数字以外的数字形状

默认情况下，当文本包含数值时，这些数值将使用阿拉伯数字显示。如果首选其他 Unicode 数字形状，请使用`java.awt.font.NumericShaper` 类。`NumericShaper` API允许您显示在内部以任何 Unicode 数字形状表示的ASCII 值。有关更多信息，请参见 [将拉丁数字转换为其他 Unicode 数字](../text/shapedDigits.md)。

此外，一些地区具有指定使用 Unicode 数字形状来代替阿拉伯数字的不同代码，例如泰国语言的地区。有关更多信息，请参见 [创建 Locale 中的变体代码内容](../locale/create.md)。

## 货币

- getCurrencyInstance ：获取币种格式化程序
- format：返回一个字符串，包括格式化的数字和适当的货币符号

```java
static public void displayCurrency( Locale currentLocale) {

    Double currencyAmount = new Double(9876543.21);
    Currency currentCurrency = Currency.getInstance(currentLocale);
    NumberFormat currencyFormatter =
        NumberFormat.getCurrencyInstance(currentLocale);

    System.out.println(
        // getDisplayName 会使用当前 jvm 默认的 Locale 来显示描述信息
        currentLocale.getDisplayName() + ", " +
        currentCurrency.getDisplayName() + ": " +
        // format 则会按照对应的 Locale 来格式化
        currencyFormatter.format(currencyAmount));
}
```

不同的 Locale 格式化后的币种格式不一样，如下

```
# 下面默认 Locale 是中文
中文 (中国), 人民币: ￥9,876,543.21
法文 (法国), 欧元: 9 876 543,21 €

# 下面默认是美国之类的英文 Locale
French (France), Euro: 9 876 543,21 €
German (Germany), Euro: 9.876.543,21 €
English (United States), US Dollar: $9,876,543.21
```

你可能会认为 `9.876.543,21 €` 并不等于 `$9,876,543.21`，的确是这样，NumberFormat 不会进行汇率的转换，它的职责是 **格式化货币**

另外 Currency 没有公共构造方法，被设计为单例模式，目的是为了任何给定货币不超过一个实例。

官网有一个例子，显示了如何通过汇率转换后，再格式化显示，并且是多语言的 [`InternationalizedMortgageCalculator.java`](https://docs.oracle.com/javase/tutorial/i18n/format/examples/InternationalizedMortgageCalculator.java) ，有界面用了 jwt，还比较复杂，这里就不去研究了。涉及了 Currency 类的几个方法如下：

- [`getAvailableCurrencies`](https://docs.oracle.com/javase/8/docs/api/java/util/Currency.html#getAvailableCurrencies--)  返回JDK 中所有可用的货币

- [`getCurrencyCode`](https://docs.oracle.com/javase/8/docs/api/java/util/Currency.html#getCurrencyCode--) 返回 Currency 实例的 ISO 4217 数字代码

- [`getSymbol`](https://docs.oracle.com/javase/8/docs/api/java/util/Currency.html#getSymbol--) 返回指定 Locale 的货币符号，如果不指定，则获取默认的

  ```java
  // 英文（英国）
  Locale enGBLocale = 
      new Locale.Builder().setLanguage("en").setRegion("GB").build();
  // 英文（美国）
  Locale enUSLocale =
      new Locale.Builder().setLanguage("en").setRegion("US").build();
  
  Currency currencyInstance = Currency.getInstance(enUSLocale);
  
  System.out.println(
      "Symbol for US Dollar, en-US locale: " +
      currencyInstance.getSymbol(enUSLocale));
  
  System.out.println(
      "Symbol for US Dollar, en-UK locale: " +
      currencyInstance.getSymbol(enGBLocale));
  ```

  输出信息

  ```
  Symbol for US Dollar, en-US locale: $
  Symbol for US Dollar, en-UK locale: USD
  ```

- [`getDisplayName`](https://docs.oracle.com/javase/8/docs/api/java/util/Currency.html#getDisplayName--) 返回显示的实例名称，同样可以指定一个 Locale

## 对 ISO 4217 货币代码的可扩展支持

[ISO 4217](http://www.iso.org/iso/support/faqs/faqs_widely_used_standards/widely_used_standards_other/currency_codes.htm) 是国际标准组织发布的标准。它指定了三个字母的代码（以及等效的三位数字代码）来表示货币和资金。该标准由外部机构维护，并独立于 Java SE 平台发布。

假设一个国家采用其他货币，并且 ISO 4217 维护机构发布了货币更新。要实现此更新并从而在运行时取代默认货币，请创建名为 `*<JAVA_HOME>*/lib/currency.properties` 的属性文件。此文件包含 [ISO 3166](http://www.iso.org/iso/country_codes/iso_3166_code_lists/country_names_and_code_elements.htm) 国家/ 地区代码和 ISO 4217 货币数据的键/值对 。值部分由三个逗号分隔的 ISO 4217 货币值组成：字母代码、数字代码和次单位。以井号（`#`）开头的任何行均被视为注释行。例如：

```
# 加拿大的示例货币属性
CA=CAD,124,2
```

- CAD ：表示加元
- 124：是加拿大元的数字代码
- 2：次要单位，是表示小数货币所需的小数位数。

如下，将加拿大货币替换为没有小数表示的货币

```
CA=CAD,124,0
```

## 百分比

您还可以使用 NumberFormat 类的方法 **格式化百分比**。要获得特定于 Locale 的格式化程序，请调用`getPercentInstance`方法。使用此格式化程序，小数部分(如 0.75)将显示为 75%。

下面的代码示例展示了如何格式化百分比。

```java
static public void displayPercent(Locale currentLocale) {

    Double percent = new Double(0.75);
    NumberFormat percentFormatter;
    String percentOut;

    // 获取百分比格式化
    percentFormatter = NumberFormat.getPercentInstance(currentLocale);
    // 格式化
    percentOut = percentFormatter.format(percent);
    System.out.println(percentOut + "   " + currentLocale.toString());
}
```

实例打印信息如

```
75 %   fr_FR
75%   de_DE
75%   en_US
```

## 完整演示程序

```java
package com.java;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Currency;
import java.util.Locale;

public class NumberFormatDemo {
    static public void main(String[] args) {
        final Locale aDefault = Locale.getDefault();
        ArrayList<Locale> locales = new ArrayList<>();
        locales.add(0, new Locale.Builder().setLanguage("fr").setRegion("FR")
                .build());
        locales.add(1, new Locale.Builder().setLanguage("de").setRegion("DE")
                .build());
        locales.add(2, new Locale.Builder().setLanguage("en").setRegion("US")
                .build());
        locales.add(3, new Locale.Builder().setLanguage("zh").setRegion("CN")
                .build());

        System.out.println("格式化数字");
        for (int i = 0; i < locales.size(); i++) {
            displayNumber(locales.get(i));
        }
        System.out.println("格式化货币");
        for (int i = 0; i < locales.size(); i++) {
            displayCurrency(locales.get(i));
        }
        System.out.println("格式化百分比");
        for (int i = 0; i < locales.size(); i++) {
            displayPercent(locales.get(i));
        }
    }

    static public void displayNumber(Locale currentLocale) {

        Integer quantity = new Integer(123456);
        Double amount = new Double(345987.246);
        NumberFormat numberFormatter;
        String quantityOut;
        String amountOut;

        // 根据指定的 Locale 返回对应的 NumberFormat 实例
        numberFormatter = NumberFormat.getNumberInstance(currentLocale);
        // 然后进行格式化
        quantityOut = numberFormatter.format(quantity);
        amountOut = numberFormatter.format(amount);
        System.out.println(quantityOut + "   " + currentLocale.toString());
        System.out.println(amountOut + "   " + currentLocale.toString());
    }

    static public void displayCurrency(Locale currentLocale) {

        Double currencyAmount = new Double(9876543.21);
        Currency currentCurrency = Currency.getInstance(currentLocale);
        NumberFormat currencyFormatter =
                NumberFormat.getCurrencyInstance(currentLocale);

        System.out.println(
                // getDisplayName 会使用当前 jvm 默认的 Locale 来显示描述信息
                currentLocale.getDisplayName() + ", " +
                        currentCurrency.getDisplayName() + ": " +
                        // format 则会按照对应的 Locale 来格式化
                        currencyFormatter.format(currencyAmount));
    }

    static public void displayPercent(Locale currentLocale) {

        Double percent = new Double(0.75);
        NumberFormat percentFormatter;
        String percentOut;

        // 获取百分比格式化
        percentFormatter = NumberFormat.getPercentInstance(currentLocale);
        // 格式化
        percentOut = percentFormatter.format(percent);
        System.out.println(percentOut + "   " + currentLocale.toString());
    }
}
```

测试输出

```
格式化数字
123 456   fr_FR
345 987,246   fr_FR
123.456   de_DE
345.987,246   de_DE
123,456   en_US
345,987.246   en_US
123,456   zh_CN
345,987.246   zh_CN
格式化货币
法文 (法国), 欧元: 9 876 543,21 €
德文 (德国), 欧元: 9.876.543,21 €
英文 (美国), 美元: $9,876,543.21
中文 (中国), 人民币: ￥9,876,543.21
格式化百分比
75 %   fr_FR
75%   de_DE
75%   en_US
75%   zh_CN
```

