# Pattern方法

到目前为止，我们只使用测试工具来创建Pattern最基本的对象。本节探讨了先进的技术，例如使用标志创建模式并使用嵌入式标志表达式。它还探讨了一些尚未讨论的其他有用的方法。

## 用标志创建Pattern

在Pattern类定义的替代compile，它接受一组影响匹配的方式的标志方法。flags参数是一个位掩码，可以包含以下任何公共静态字段：

* `Pattern.CANON_EQ` 
    
    启用规范等价。指定此标志后，当且仅当其完整规范分解匹配时，两个字符才可视为匹配。例如，当指定此标志时，表达式 "a\u030A" 将与字符串 "\u00E5" 匹配。默认情况下，匹配不考虑采用规范等价。指定此标志可能会造成性能损失。
    
* Pattern.CASE_INSENSITIVE

    启用不区分大小写的匹配。默认情况下，不区分大小写的匹配假定仅匹配 US-ASCII 字符集中的字符。可以通过指定 UNICODE_CASE 标志连同此标志来启用 Unicode 感知的、不区分大小写的匹配。 通过嵌入式标志表达式  (?i) 也可以启用不区分大小写的匹配。 指定此标志可能会造成轻微的性能损失。
    
* Pattern.COMMENTS

    模式中允许空白和注释。 此模式将忽略空白和在结束行之前以 # 开头的嵌入式注释。 通过嵌入式标志表达式  (?x) 也可以启用注释模式。 


* Pattern.DOTALL

    启用点阵模式。在dotall模式下，表达式`.`匹配任何字符，包括行终止符。默认情况下，此表达式与行终止符不匹配。Dotall模式也可以通过嵌入式标志表达式启用(?s)。（s是“单行”模式的助记符，这在Perl中也被使用）。
    
* Pattern.LITERAL

    启用模式的文字解析。当指定此标志时，指定模式的输入字符串将被视为文字字符序列。输入序列中的元字符或转义序列将没有特殊意义。当与此标志一起使用时，标志CASE_INSENSITIVE并UNICODE_CASE保留对匹配的影响。其他旗帜变得多余。没有嵌入的标志字符用于启用文字解析。
    
* Pattern.MULTILINE

    启用多行模式。在多行模式中，表达式^和$匹配恰好在之前或之前分别是行终止符或输入序列的结尾。默认情况下，这些表达式仅在整个输入序列的开头和结尾匹配。也可以通过嵌入式标志表达式启用多模式模式(?m)。
    
* Pattern.UNICODE_CASE

    启用 Unicode 感知的大小写折叠。当指定此标志时，不区分大小写的匹配（由CASE_INSENSITIVE标志启用）以与Unicode标准一致的方式完成。默认情况下，不区分大小写的匹配假定仅匹配US-ASCII字符集中的字符。Unicode感知案例折叠也可以通过嵌入式标志表达式启用(?u)。指定此标志可能会造成性能损失。
    
* Pattern.UNIX_LINES启用UNIX线路模式。在这种模式下，只有'\n'行结束在行为的认可.，^和$。UNIX线路模式也可以通过嵌入式标志表达式启用(?d)。

在以下步骤中，我们将修改测试工具， RegexTestHarness.java创建一个不区分大小写匹配的模式。

```java
Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);

---- Test code ----
regexTest("dog", "DoGDOg");

---- Output ----
===  dog
我发现文本中的 "DoG" 在开始索引 0 和 结束索引 3.
我发现文本中的 "DOg" 在开始索引 3 和 结束索引 6.

```

正如你所看到的，字符串文字“狗”匹配两种情况，不管情况如何。要编译具有多个标志的模式，请使用按位OR运算符“ |” 分隔要包含的标志。为了清楚起见，以下代码示例对正则表达式进行硬编码，而不是从以下代码中读取Console：

```java
pattern = Pattern.compile("[az]$", Pattern.MULTILINE | Pattern.UNIX_LINES);

也可以指定一个变量
 
final int flags = Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE;
Pattern pattern = Pattern.compile("aa", flags);
```


## 嵌入式标志表达式
也可以使用嵌入式标志表达式启用各种标志。嵌入式标志表达式是双参数版本的替代compile，并在正则表达式本身中指定。以下示例使用原始测试工具， RegexTestHarness.java使用嵌入式标志表达式(?i)来启用不区分大小写的匹配。

```java
---- Test code ----
regexTest("(?i)foo", "FOOfooFoOfoO");

---- Output ----
===  (?i)foo
我发现文本中的 "FOO" 在开始索引 0 和 结束索引 3.
我发现文本中的 "foo" 在开始索引 3 和 结束索引 6.
我发现文本中的 "FoO" 在开始索引 6 和 结束索引 9.
我发现文本中的 "foO" 在开始索引 9 和 结束索引 12.

```

无论情况如何，所有匹配再次成功。

对应于Pattern可公开访问的字段的嵌入式标志表达式如下表所示：

| 变量 | 	等效嵌入式标志表达式
| ----------------------------
| Pattern.CANON_EQ | 没有
| Pattern.CASE_INSENSITIVE|(?i)
| Pattern.COMMENTS | (?x)
| Pattern.MULTILINE | (?m)
| Pattern.DOTALL | (?s)
| Pattern.LITERAL | 没有
| Pattern.UNICODE_CASE	| (?u)
| Pattern.UNIX_LINES | (?d)


## matches(String,CharSequence)

Pattern类定义了一个方便的 [matches](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html#matches-java.lang.String-java.lang.CharSequence-)方法，可以让你快速地检查模式是否出现在给定的输入字符串。

与所有公共静态方法一样，您应该matches通过其类名称来调用`Pattern.matches("\\d","1");`。在此示例中，该方法返回true，因为数字“1”与正则表达式匹配\d。

## split(CharSequence input)

split方法是一种很好的工具，用于收集位于匹配模式两侧的文本。如下示例，该split方法可以从字符串“one:two:three:four:five”中提取单词“one two three four five”

```java
    String REGEX = ":";
    String INPUT = "one:two:three:four:five";
    Pattern pattern = Pattern.compile(REGEX);
    String[] split = pattern.split(INPUT);
    System.out.println(Arrays.toString(split));
    
---- Output ----
[one, two, three, four, five]

```

为了简单起见，我们匹配了字符串文字，冒号（:）而不是复杂的正则表达式。。由于我们仍在使用Pattern和Matcher对象，您可以使用split来获取任何正则表达式两边的文本。这是同样的例子，按数字拆分

```java
    String REGEX = "\\d";
    String INPUT = "one9two4three7four1five";
    Pattern pattern = Pattern.compile(REGEX);
    String[] split = pattern.split(INPUT);
    System.out.println(Arrays.toString(split));

---- Output ----
[one, two, three, four, five]


```

## 其他实用方法

* `public static String quote(String s)`
    
    返回指定 String 的字面值模式 String,此方法产生一个 String，可以将其用于创建与字符串 s 匹配的 Pattern，就好像它是字面值模式一样。输入序列中的元字符和转义序列不具有任何特殊意义。
    
    尝试了下，没有搞懂是啥，返回的全是 "\Qxxx\E" 的串
    
* `public String toString()` 

    返回String此模式的表示。这是编译此模式的正则表达式。
    
## java.lang.String    