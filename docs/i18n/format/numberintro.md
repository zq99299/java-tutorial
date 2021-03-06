# 数字和货币

程序以与 **Locale 无关** 的方式存储和操作数字。在显示或打印数字之前，程序必须将其 **转换为 Locale 境敏感** 格式的字符串。例如，在法国，数字 123456.78 应该格式化为 123456,78，在德国应该显示为 123.456,78。在本节中，您将了解如何使程序独立于小数点、千位分隔符和其他格式化属性的 Locale 约定。

- [使用预定义格式](./numberFormat.md)

  使用 NumberFormat 类提供的工厂方法，您可以获得数字、货币和百分比的特定于 Locale 的格式。

- [自定义格式](./decimalFormat.md)

  使用 DecimalFormat 类，您可以用字符串 **模式** 指定数字的格式。DecimalFormatSymbols 类允许修改格式化符号，如小数分隔符和减号。