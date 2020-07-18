# 单词边界

调用 `getWordIterator` 方法实例化一个检测单词边界的 BreakIterator：

```java
BreakIterator wordIterator =
    BreakIterator.getWordInstance（currentLocale）;
```

当应用程序需要对 **单个单词** 执行操作时，需要创建这样的 BreakIterator。这些操作可能是常见的字处理功能，如选择、剪切、粘贴和复制。或者，您的应用程序可以搜索单词，它必须能够区分 **整个单词** 和 **简单字符串**。

当 BreakIterator 分析单词边界时，它区分 **单词** 和 **不属于单词的字符**。这些字符包括空格、制表符、标点符号和大多数符号，两边都有文字边界。

如下列程序，创建了一个 en_US 的单词边界  BreakIterator，并将它和字符串传递给了 markBoundaries 方法

```java
Locale currentLocale = new Locale ("en","US");

BreakIterator wordIterator =
    BreakIterator.getWordInstance(currentLocale);

String someText = "She stopped. " +
    "She said, \"Hello there,\" and then went " +
    "on.";

markBoundaries(someText, wordIterator);
```

此方法通过在 **目标字符串** 下面打印插入符号(`^`)来标记边界。在下面的代码中，请注意 while 循环，其中markBoundaries 通过调用 next 方法扫描字符串：

```java
static void markBoundaries(String target, BreakIterator iterator) {

    StringBuffer markers = new StringBuffer();
    markers.setLength(target.length() + 1);
    // 构建与原始字符串长度相同的空白字符
    for (int k = 0; k < markers.length(); k++) {
        markers.setCharAt(k, ' ');
    }

    iterator.setText(target);
    int boundary = iterator.first();
    // 然后扫描字符串，查找单词边界
    while (boundary != BreakIterator.DONE) {
        // 并在查找到的单词边界索引上插入符号 ^
        markers.setCharAt(boundary, '^');
        boundary = iterator.next();
    }

    // 最后打印 原始字符串
    System.out.println(target);
    // 再打印插入符号的字符串，组合起来就像是一个指示器一样
    System.out.println(markers);
}
```

markBoundaries 方法会输出如下结果

```
She stopped.  She said, "Hello there," and then went on.
^  ^^      ^^ ^  ^^   ^^^^    ^^    ^^^^  ^^   ^^   ^^ ^^
```

BreakIterator 类使从文本中选择单词变得容易。你不必写自己的程序来处理各种语言的标点规则，BreakIterator 类为您完成此工作。

下面示例中的 extractWords 方法提取并打印给定字符串的单词。注意，这个方法使用 `Character.isLetterOrDigit`，以避免打印包含空格字符的 「单词」。

```java
static void extractWords(String target, BreakIterator wordIterator) {

    wordIterator.setText(target);
    // 首先拿到单词边界开始和结束索引
    int start = wordIterator.first();
    int end = wordIterator.next();

    while (end != BreakIterator.DONE) {
        // 然后从原始字符串中，按索引截取单词出来
        String word = target.substring(start, end);
        // 如果第一个 char 是字母或则数字，则打印这个单词
        if (Character.isLetterOrDigit(word.charAt(0))) {
            System.out.println(word);
        }
        start = end;
        end = wordIterator.next();
    }
}
```

输出信息

```
She
stopped
She
said
Hello
there
and
then
went
on
```

