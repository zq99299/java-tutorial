# 换行符边界

**格式化文本** 或执行 **换行** 的应用程序必须找到 **可能的换行符**。你可以通过 `getLineInstance` 方法创建的 BreakIterator 找到这些换行符或边界：

```java
BreakIterator lineIterator =
    BreakIterator.getLineInstance(currentLocale);
```

此 BreakIterator 确定字符串中文本可以在其中断开以继续下一行的位置。BreakIterator 检测到的位置是潜在的换行符。屏幕上显示的实际换行符可能不相同。

下面示例使用 markBoundaries 方法显示由 BreakIterator 检测到的行边界。markBoundaries 方法通过在目标字符串下面打印插入符号 `(^)` 来指示行边界。

根据 BreakIterator，行边界发生在一系列 **空格字符**(空格、制表符、换行符)结束之后。在下面的示例中，注意您可以在检测到的任何边界处中断该行：

::: tip

你可以看到下面的标记可能和单词的结果类似，这个就是 可能的换行符了，并不是寻找真正的换行符

:::

```java
She stopped.  She said, "Hello there," and then went on.
^   ^         ^   ^     ^      ^     ^ ^   ^    ^    ^  ^
```

可能的换行也会立即出现在连字符之后：

```java
There are twenty-four hours in a day.
^     ^   ^      ^    ^     ^  ^ ^   ^
```

下一个示例使用名为 formatLines 的方法将一个长文本字符串分解为固定长度的行。
此方法使用一个 BreakIterator 来定位 **可能的换行符**。formatLines 方法简短、简单，而且由于使用了BreakIterator，它是 Locale 敏感。以下是源代码：

```java
/**
* 格式化行
* @param target 要换行的字符串长文本
* @param maxLength 最多一行多少字符就换行
* @param currentLocale
*/
static void formatLines(String target, int maxLength,
                        Locale currentLocale) {

    BreakIterator boundary = BreakIterator.getLineInstance(currentLocale);
    boundary.setText(target);
    int start = boundary.first();
    int end = boundary.next();
    int lineLength = 0;

    while (end != BreakIterator.DONE) {
        // 截取到可能换行的单词
        String word = target.substring(start, end);
        lineLength = lineLength + word.length();
        // 截取出来的可能换行的句子，计算他们的长度，直到累加到大于 设置的换行长度，再进行换行
        if (lineLength >= maxLength) {
            System.out.println();
            lineLength = word.length();
        }
        System.out.print(word);
        start = end;
        end = boundary.next();
    }
}
```

比如，使用下面的一整段长文本，将它按最大 30 字符长度进行换行

```java
String moreText =
    "She said, \"Hello there,\" and then " +
    "went on down the street. When she stopped " +
    "to look at the fur coats in a shop + "
    "window, her dog growled. \"Sorry Jake,\" " +
    "she said. \"I didn't know you would take " +
    "it personally.\"";

formatLines(moreText, 30, currentLocale);
```

下面是处理结果

```
She said, "Hello there," and 
then went on down the 
street.  When she stopped to 
look at the fur coats in a 
shop window, her dog 
growled.  "Sorry Jake," she 
said.  "I didn't know you 
would take it personally."
```

