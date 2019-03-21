# Unicode 支持

作为 JDK 7 发布，正则表达式模式匹配的扩展功能支持 Unicode 6。

* 匹配一个特定的代码点
* Unicode 字符属性

## 匹配特定的代码点

您可以使用表单的转义序列匹配特定的 Unicode 代码点 `\uFFFF`，其中 FFFF 要匹配的代码点的十六进制值。
例如，`\u6771` 匹配汉字为“东”。

或则，您可以使用 Perl 样式十六进制表示法指定代码点 `\x{...}` 例如：

```java
String hexPattern = "\\x{" + Integer.toHexString(codePoint) + "}";
```

----？ 然而并没有看懂这个匹配的是个啥。

## Unicode 字符属性

每个 Unicode 字符，除了它的值，都有一些属性或属性。您可以将属于特定类别的单个字符与表达式 `\p{prop}` 进行匹配。

您可以将不属于特定类别的单个字符与表达式 `\p{prop}` 进行匹配。

三种支持的属性类型是脚本块和“一般”类别。

### 脚本

要确定代码点是否属于特定脚本，您可以使用 script 关键字或 sc 短格式，例如 `\p{script=Hiragana}`。
或者，您可以在脚本名称前面加上  Is  字符串，例如`\p{IsHiragana}`。

支持的有效脚本名称 Pattern 是被接受的 脚本名称[UnicodeScript.forName。](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.UnicodeScript.html#forName-java.lang.String-)

### 块

块可以利用来指定 block 的关键字，或 blk 短形式，例如，`\p{block=Mongolian}`。或者，
您可以使用字符串为块名称前缀 In，例如 `\p{InMongolian}`。

支持的有效的块名称 Pattern 是被接受的 [UnicodeBlock.forName](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.UnicodeBlock.html#forName-java.lang.String-)。

### 一般类别

可以使用可选前缀指定类别 Is。例如，IsL 匹配 Unicode 字母的类别。也可以使用 general_category 关键字或简写表来指定类别 gc。
例如，可以使用 general_category=Lu 或匹配大写字母 gc=Lu。

支持的类别是由类指定的版本中的
[Unicode标准](http://www.unicode.org/standard/standard.html)
[Character](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html)。


> ---?这一章节我是完全没有看懂是个啥
