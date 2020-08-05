# 国际化服务提供商

国际化的服务提供商启用了与语言环境相关的数据和服务的插件。由于可以插入与语言环境有关的数据和服务，因此第三方能够在 `java.text`  和 `java.util` 包中提供大多数对语言环境敏感的类的实现。

服务是一组编程接口和类，提供对特定应用程序的功能或特性的访问。

- 服务提供者接口(SPI) 是服务定义的一组公共接口和抽象类。

- 服务提供者实现 SPI。服务提供者使您能够创建可扩展的应用程序，您可以对其进行扩展，而无需修改其原始代码库。

您可以使用新的插件或模块增强它们的功能。有关服务提供者和可扩展应用程序的详细信息，请参见 [创建可扩展应用程序](/ext/basics/spi.md)。

您可以使用服务提供商进行国际化，以提供以下 Locale 敏感类的自定义实现：

- [`BreakIterator`](https://docs.oracle.com/javase/8/docs/api/java/text/BreakIterator.html) 对象
- [`Collator`](https://docs.oracle.com/javase/8/docs/api/java/text/Collator.html) 对象
-  [`Locale`](https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html) 类 中的语言 code、国家 code 和 variant name 
- Time zone names ：时区名称
- Currency symbols：币种符号
- [`DateFormat`](https://docs.oracle.com/javase/8/docs/api/java/text/DateFormat.html) 对象
- [`DateFormatSymbols`](https://docs.oracle.com/javase/8/docs/api/java/text/DateFormatSymbols.html) 对象
- [`NumberFormat`](https://docs.oracle.com/javase/8/docs/api/java/text/NumberFormat.html) 对象
- [`DecimalFormatSymbols`](https://docs.oracle.com/javase/8/docs/api/java/text/DecimalFormatSymbols.html) 对象

相应的 SPI 包含在  `java.text.spi`  和  `java.util.spi` 包中

| `java.util.spi`                                              | `java.text.spi`                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`CurrencyNameProvider`](https://docs.oracle.com/javase/8/docs/api/java/util/spi/CurrencyNameProvider.html)<br/>[`LocaleServiceProvider`](https://docs.oracle.com/javase/8/docs/api/java/util/spi/LocaleServiceProvider.html)<br/>[`TimeZoneNameProvider`](https://docs.oracle.com/javase/8/docs/api/java/util/spi/TimeZoneNameProvider.html) | [`BreakIteratorProvider`](https://docs.oracle.com/javase/8/docs/api/java/text/spi/BreakIteratorProvider.html)<br/>[`CollatorProvider`](https://docs.oracle.com/javase/8/docs/api/java/text/spi/CollatorProvider.html)<br/>[`DateFormatProvider`](https://docs.oracle.com/javase/8/docs/api/java/text/spi/DateFormatProvider.html)<br/>[`DateFormatSymbolsProvider`](https://docs.oracle.com/javase/8/docs/api/java/text/spi/DateFormatSymbolsProvider.html)<br/>[`DecimalFormatSymbolsProvider`](https://docs.oracle.com/javase/8/docs/api/java/text/spi/DecimalFormatSymbolsProvider.html)<br/>[`NumberFormatProvider`](https://docs.oracle.com/javase/8/docs/api/java/text/spi/NumberFormatProvider.html) |

例如，如果您想为一个新的语言环境提供一个 NumberFormat 对象，请实现 `java.text.spi.NumberFormatProvider` 类，并实现以下方法:

- `getCurrencyInstance(Locale locale)`
- `getIntegerInstance(Locale locale)`
- `getNumberInstance(Locale locale)`
- `getPercentInstance(Locale locale)`

```java
Locale loc = new Locale("da", "DK");
NumberFormat nf = NumberFormatProvider.getNumberInstance(loc);
```

这些方法首先检查 Java 运行时环境是否支持所请求的语言环境；如果是，这些方法就使用这种支持。否则，这些方法将调用已安装提供程序的 getAvailableLocales 方法，以找到支持所请求的语言环境的提供程序。

有关如何使用服务提供者进行国际化的深入示例，请参见下一章的：[将自定义资源包作为扩展安装](./resourcebundlecontrolprovider.md)，向您展示如何实现 `ResourceBundleControlProvider` 接口，该接口允许您使用任何自定义的 `ResourceBundle.Control`  类，而无需对应用程序的源代码进行任何其他更改。

- [将自定义资源包作为扩展安装](./resourcebundlecontrolprovider.md)