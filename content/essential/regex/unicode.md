# Unicode支持

作为JDK 7发布，正则表达式模式匹配的扩展功能支持Unicode 6。

* 匹配一个特定的代码点
* Unicode字符属性

## 匹配特定的代码点

您可以使用表单的转义序列匹配特定的Unicode代码点`\uFFFF`，其中FFFF要匹配的代码点的十六进制值。例如，`\u6771`匹配汉字为“东”。

或则，您可以使用 Perl 样式十六进制表示法指定代码点 `\x{...}` 例如：
```java
        String hexPattern = "\\x{" + Integer.toHexString(codePoint) + "}";
```

----？然而并没有看懂这个匹配的是个啥。

## Unicode字符属性