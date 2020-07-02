# Locale 敏感类服务 SPI

此功能启用了与 **语言环境相关的数据和服务的插件**。这样，第三方便能够在 `java.text` 和 `java.util` 包中提供大多数对 **语言环境敏感的类** 的实现。

SPI（服务提供商接口）的实现基于由服务提供商实现的抽象类和 Java 接口。在运行时，Java 类加载机制用于动态定位和加载实现 SPI 的类。

您可以使用 Locale 敏感的服务 SPI 提供以下 Locale 敏感实现：

- `BreakIterator`  对象

- `Collator` 对象

- `Locale` 类：

  Language code, Country code, and Variant name 。

  语言代码，国家代码 和变体名称

- Time Zone 时区名称

- Currency symbols 货币符号

- `DateFormat` 对象

- `DateFormatSymbol` 对象

- `NumberFormat` 对象

- `DecimalFormatSymbols` 对象

相应的 SPI 包含在 `java.text.spi` 和 `java.util.spi` 包中：

java.util.spi：

- `CurrencyNameProvider`
- `LocaleServiceProvider`
- `TimeZoneNameProvider`
- `CalendarDataProvider`

java.text.spi：

- `BreakIteratorProvider`
- `CollatorProvider`
- `DateFormatProvider`
- `DateFormatSymbolsProvider`
- `DecimalFormatSymbolsProvider`
- `NumberFormatProvider`

例如，如果要为新 Locale 提供 NumberFormat 对象，必须实现 java.text.spi.NumberFormatProvider 类。您需要扩展此类并实现其方法：

- `getCurrencyInstance(Locale locale)`
- `getIntegerInstance(Locale locale)`
- `getNumberInstance(Locale locale)`
- `getPercentInstance(Locale locale)`

```java
Locale loc = new Locale("da", "DK");
NumberFormat nf = NumberFormatProvider.getNumberInstance(loc);
```

这些方法首先检查 Java 运行时环境是否支持请求的 Locale；如果是这样， 他们使用这种支持。否则，这些方法将相应接口的已安装提供程序的 `getAvaableLocales()` 方法调用，以查找支持请求区域设置的提供程序。

本来还想实现下这个类，看了下里面的实现还挺复杂的。官方没有提供如何实现，暂时不研究了，有兴趣可以看已经实现的源码类