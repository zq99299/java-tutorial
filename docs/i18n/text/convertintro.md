# 转换非 unicode 文本

在 Java 编程语言中，char 值表示 Unicode 字符。Unicode 是一种支持世界上主要语言的 16 位字符编码。你可以在[Unicode 协会的网站](http://www.unicode.org/) 上了解更多关于 Unicode 标准的信息。

目前很少有文本编辑器支持 Unicode 文本输入。我们用来编写本节代码示例的文本编辑器只支持 ASCII 字符，该字符限制为7位。为了表示不能用 ASCII 表示的 Unicode 字符，例如 ö，我们使用 `\uXXXX` 转义序列。转义序列中的每个 X 都是十六进制数字。下面的例子展示了如何用 **转义序列** 表示 ö 字符:

```java
String str = "\u00F6";
char c = '\u00F6';
Character letter = new Character('\u00F6');
```

各种字符编码被世界各地的系统使用。目前，这些编码很少符合 Unicode。因为程序需要 Unicode 中的字符，所以它 **从系统中获取的文本数据必须转换为 Unicode**，反之亦然。当文本文件中的数据的编码与 Java 虚拟机的默认文件编码相匹配时，**将自动转换为 Unicode**。你可以通过创建一个 OutputStreamWriter 来识别默认的文件编码，并要求它的规范名称：

```java
OutputStreamWriter out = new OutputStreamWriter(new ByteArrayOutputStream());
System.out.println(out.getEncoding());
// 比如笔者这里就显示默认编码为 UTF8
```

如果默认的文件编码与您想要处理的文本数据的编码不同，那么您必须自己执行转换。当处理来自另一个国家或计算平台的文本时，可能需要这样做。

本节讨论用于将非 Unicode 文本转换为 Unicode 的api。在使用这些 api 之前，应该验证希望转换为 Unicode 的字符编码是否受到支持。支持的字符编码列表不是 Java 编程语言规范的一部分。
因此，api 支持的字符编码可能因平台而异。要查看 Java 开发工具包支持哪些编码，请参阅 [支持的编码文档](https://docs.oracle.com/javase/8/docs/technotes/guides/intl/encoding.doc.html)。

下面的资料描述了将非 Unicode 文本转换为 Unicode 的两种技术。可以将 **非 unicode 字节数组转换为字符串对象**，反之亦然。或者您可以在 **Unicode 字符流和非 Unicode 文本的字节流** 之间进行转换。

- [字节编码和字符串](./string.md)

  本节向您展示如何将非 unicode 字节数组转换为字符串对象，反之亦然。

- [字符和字节流](./stream.md)

  在本节中，您将学习如何在 Unicode 字符流和非 Unicode 文本的字节流之间进行转换。