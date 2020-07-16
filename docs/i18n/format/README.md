# 格式化

这节课解释了如何格式化数字、货币、日期、时间和文本信息。因为最终用户可以看到这些数据元素，所以它们的格式必须符合各种文化约定。下面的例子将教你如何:

- 以对 Locale 敏感的方式格式化数据元素
- 保持代码与 Locale 无关
- 避免为特定 Locale 编写格式化程序

有以下章节：

- [数字和货币](./numberintro.md)

  如何使用 `NumberFormat`，`DecimalFormat` 以及 `DecimalFormatSymbols` 类

- 日期和时间

  本节的重点是 `DateFormat`，`SimpleDateFormat` 和 `DateFormatSymbols` 类。

  版本说明：部分类容使用了 `java.util` 包中的日期和时间 API，JDK8+ 中的 `java.time` API 提供了全面的时间模型，该模型对 `java.util` 类进行了重大改进

- 文本消息

  介绍 `MessageFormat` 和 `ChoiceFormat` 类如何帮助您解决格式化文本消息时可能遇到的一些问题。

