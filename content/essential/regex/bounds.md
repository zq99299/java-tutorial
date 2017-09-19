# 边界匹配者

到目前为止，我们只对某个特定输入字符串中的某个位置是否发现匹配感兴趣。我们从来不关心匹配发生在字符的哪里。

您可以通过使用边界匹配器指定这些信息来使您的模式匹配更精确。例如，也许你有兴趣找到一个特定的单词，但只有当它出现在一行的开头或结尾。或者也许你想知道匹配是发生在单词边界还是在上一场匹配结束时。

下表列出并解释了所有边界匹配器。


| 边界构造	| 描述
| ----------------------
| ^	| 一行的开始
| $	| 一行的结束
| \b	| 一个字边界
| \B	| 非字边界
| \A	| 输入的开始
| \G	| 上一场匹配结束
| \Z	| 输入的结尾，但是最后的终止符（如果有的话）
| \z	| 输入结束

下面的例子演示了如何使用边界匹配器^和$。如上所述，^匹配一行的开始，并且$匹配结束。
```java
---- Test code ----
System.out.println("===  ^dog$");
regexTest("^dog$", "dog");
System.out.println("===  ^dog$");
regexTest("^dog$", "       dog");
System.out.println("===  \\s*dog$ - s空白字符");
regexTest("\\s*dog$", "       dog");
System.out.println("===  ^dog\\w* - W单词字符");
regexTest("^dog\\w*", "dogblahblah");

---- Output ----
===  ^dog$
我发现文本中的 "dog" 在开始索引 0 和 结束索引 3.
===  ^dog$
No match found.
===  \s*dog$ - s空白字符
我发现文本中的 "       dog" 在开始索引 0 和 结束索引 10.
===  ^dog\w* - W单词字符
我发现文本中的 "dogblahblah" 在开始索引 0 和 结束索引 11.

```

第一个例子是成功的，因为该模式占据整个输入字符串。
第二个示例失败，因为输入字符串在开头包含多个空格。
第三个例子指定一个允许无限空格的表达式，后面是行尾的“dog”。
第四个例子要求“dog”出现在一行的开头，随后是无限数量的字符。

要检查一个模式是否开始和结束于一个单词边界（而不是一个较长的字符串中的子串），只需在任一侧使用`\b`; 例如，`\bdog\b`

```java
---- Test code ----
System.out.println("===  \\bdog\\b");
regexTest("\\bdog\\b", " The dog plays in the yard.");
System.out.println("===  \\bdog\\b");
regexTest("\\bdog\\b", " The doggie plays in the yard.");

---- Output ----
===  \bdog\b
我发现文本中的 "dog" 在开始索引 5 和 结束索引 8.
===  \bdog\b
No match found.

```

要匹配非字边界 请使用`\B`

注意下：在前面的章节中由于多次在调用处打印了 当前使用的正则，所以把之前的测试类稍微改动了下，把打印的语句放到了调用函数中。

```java
---- Test code ----
regexTest("\\bdog\\B", " The dog plays in the yard.");
regexTest("\\bdog\\B", " The doggie plays in the yard.");

---- Output ----
===  \bdog\B
No match found.
===  \bdog\B
我发现文本中的 "dog" 在开始索引 5 和 结束索引 8.

```
第一个例子失败了，是因为dog左边必须是单词边界，右边则不能是边界。
第二个例子成功了，符合表达式




