# 句子边界

可以使用 BreakIterator 来确定句子边界。首先使用 `getSentenceInstance` 方法创建一个 BreakIterator：

```java
BreakIterator sentenceIterator =
    BreakIterator.getSentenceInstance(currentLocale);
```

为了显示句子边界，该程序使用标记边界方法，在 [单词边界](./word.md) 中讲解过的标记方法。markBoundaries 方法在字符串下方打印插入符号 `(^)` 来表示边界位置。

处理逻辑都是一样的，只是 BreakIterator 不一样。下面是一些例子：

```java
She stopped.  She said, "Hello there," and then went on.
^             ^                                         ^

He's vanished!  What will we do?  It's up to us.
^               ^                 ^             ^

Please add 1.5 liters to the tank.
^                                 ^
```

