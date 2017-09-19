# 预定义字符类

[Pattern](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html) API包含了一些有用的**预定义的字符类**，他提供了常用的正则表达式的简写

| 构造	| 描述
| --------------
| .	| 任何字符（可能或可能不匹配行终止符）
| \d	| 数字： [0-9]
| \D	| 非数字： [^0-9]
| \s	| 空白字符： [ \t\n\x0B\f\r]
| \S	| 非空格字符： [^\s]
| \w	| 字词： [a-zA-Z_0-9]
| \W	| 非字词： [^\w]

上面左侧的每个构造都是右侧列中的字符类的简写，所以，尽可能使用预定义的类。它们使您的代码更容易阅读并消除由格式错误的字符类引入的错误。

以反斜杠开始的构造称为转义构造。[字符串文字](/content/essential/regex/literals.md)，我们提到使用反斜线和部分\Q和\E。如果您使用字符串文字中的转义构造，则必须在反斜杠之前使用要编译的字符串的另一个反斜杠。例如：
```java
private final String REGEX = "\\d"; // a single digit
```

```java
---- Test code ----
System.out.println("--- 任意字符");
regexTest(".", "@");
regexTest(".", "1");
regexTest(".", "a");
System.out.println("--- 数字： [0-9]");
regexTest("\\d", "1");
regexTest("\\d", "a");
System.out.println("--- 非数字： [^0-9]");
regexTest("\\D", "1");
System.out.println("--- 空白字符： [ \\t\\n\\x0B\\f\\r]");
regexTest("\\s", " ");
regexTest("\\s", "a");
System.out.println("--- 非空格字符： [^\\s]");
regexTest("\\S", " ");
regexTest("\\S", "a");
System.out.println("--- 字词： [a-zA-Z_0-9]");
regexTest("\\w", "a");
regexTest("\\w", "!");
System.out.println("--- 字词：非字词： [^\\w]");
regexTest("\\W", "a");
regexTest("\\W", "!");

---- Output ----
--- 任意字符
我发现文本中的 "@" 在开始索引 0 和 结束索引 1.
我发现文本中的 "1" 在开始索引 0 和 结束索引 1.
我发现文本中的 "a" 在开始索引 0 和 结束索引 1.
--- 数字： [0-9]
我发现文本中的 "1" 在开始索引 0 和 结束索引 1.
No match found.
--- 非数字： [^0-9]
No match found.
--- 空白字符： [ \t\n\x0B\f\r]
我发现文本中的 " " 在开始索引 0 和 结束索引 1.
No match found.
--- 非空格字符： [^\s]
No match found.
我发现文本中的 "a" 在开始索引 0 和 结束索引 1.
--- 字词： [a-zA-Z_0-9]
我发现文本中的 "a" 在开始索引 0 和 结束索引 1.
No match found.
--- 字词：非字词： [^\w]
No match found.
我发现文本中的 "!" 在开始索引 0 和 结束索引 1.

```

在前三个例子中，正则表达式是简单的.（“点”元字符），表示“任何字符”。因此，在所有三种情况下（随机选择的@字符，数字和字母），匹配成功。其余的示例每个都使用“ 预定义字符类”表中的单个正则表达式构造。你可以参考上面的表找出每个测试背后的逻辑：



