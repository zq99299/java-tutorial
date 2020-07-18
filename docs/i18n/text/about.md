#  关于 BreakIterator  类

BreakIterator 类对 **语言环境（Locale）敏感**，因为文本边界随语言的不同而不同。例如，换行符的语法规则对所有语言都不相同。要确定 BreakIterator 类支持哪些 Locale ，调用 getAvailableLocales 方法，如下所示：

```java
Locale[] locales = BreakIterator.getAvailableLocales();
```

可以使用 BreakIterator 类分析四种边界：字符、单词、句子和潜在的换行符。当实例化一个 BreakIterator 时，调用适当的工厂方法：

- 字符：`getCharacterInstance`
- 单词：`getWordInstance`
- 句子：`getSentenceInstance`
- 换行符：`getLineInstance`

BreakIterator 的每个实例只能检测一种边界类型。例如，如果您希望同时定位字符和单词的边界，您可以创建两个单独的实例。

BreakIterator 有一个虚拟的光标，它指向文本字符串中的当前边界。您可以使用 previous（上一个）方法和 next（下一个）方法在文本中移动此光标。例如，如果使用 getWordInstance 创建了 BreakIterator，那么每次调用next 方法时，光标都会移动到文本中的下一个单词边界。指针移动方法返回一个整数，**指示边界的位置**。此位置是文本字符串中紧跟边界的字符的索引。与字符串索引一样，边界也是从零开始的。第一个边界是 0，最后一个边界是字符串的长度。下图显示了前一种方法在一行文本中检测到的单词边界：

![image-20200718131654321](./assets/image-20200718131654321.png)

您应该只对自然语言文本使用 **BreakIterator** 类。要对编程语言进行标记，请使用 **StreamTokenizer** 类。

接下来的小节为每种类型的边界分析提供了实例讲解，完整代码如下（建议看完后面的小节再回来看完整的）：

```java
package com.java;

import java.text.BreakIterator;
import java.util.Locale;

public class BreakIteratorDemo {

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

    static void reverseWords(String target, BreakIterator wordIterator) {

        wordIterator.setText(target);
        int end = wordIterator.last();
        int start = wordIterator.previous();

        while (start != BreakIterator.DONE) {
            String word = target.substring(start, end);
            if (Character.isLetterOrDigit(word.charAt(0)))
                System.out.println(word);
            end = start;
            start = wordIterator.previous();
        }
    }

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

    static void listPositions(String target, BreakIterator iterator) {

        iterator.setText(target);
        int boundary = iterator.first();

        while (boundary != BreakIterator.DONE) {
            System.out.println(boundary);
            boundary = iterator.next();
        }
    }

    static void characterExamples() {

        BreakIterator arCharIterator =
                BreakIterator.getCharacterInstance(new Locale("ar", "SA"));
        // Arabic word for "house"
        String house = "\u0628" + "\u064e" + "\u064a" +
                "\u0652" + "\u067a" + "\u064f";
        listPositions(house, arCharIterator);
    }

    static void wordExamples() {

        Locale currentLocale = new Locale("en", "US");
        BreakIterator wordIterator =
                BreakIterator.getWordInstance(currentLocale);
        String someText = "She stopped.  " +
                "She said, \"Hello there,\" and then went on.";
        markBoundaries(someText, wordIterator);
        System.out.println();
        extractWords(someText, wordIterator);
    }

    static void sentenceExamples() {

        Locale currentLocale = new Locale("en", "US");
        BreakIterator sentenceIterator =
                BreakIterator.getSentenceInstance(currentLocale);
        String someText = "She stopped.  " +
                "She said, \"Hello there,\" and then went on.";
        markBoundaries(someText, sentenceIterator);
        String variousText = "He's vanished!  " +
                "What will we do?  It's up to us.";
        markBoundaries(variousText, sentenceIterator);
        String decimalText = "Please add 1.5 liters to the tank.";
        markBoundaries(decimalText, sentenceIterator);
        String donneText = "\"No man is an island . . . " +
                "every man . . . \"";
        markBoundaries(donneText, sentenceIterator);
        String dogText = "My friend, Mr. Jones, has a new dog.  " +
                "The dog's name is Spot.";
        markBoundaries(dogText, sentenceIterator);
    }

    static void lineExamples() {

        Locale currentLocale = new Locale("en", "US");
        BreakIterator lineIterator =
                BreakIterator.getLineInstance(currentLocale);
        String someText = "She stopped.  " +
                "She said, \"Hello there,\" and then went on.";
        markBoundaries(someText, lineIterator);
        String hardHyphen = "There are twenty-four hours in a day.";
        markBoundaries(hardHyphen, lineIterator);
        System.out.println();
        String moreText = "She said, \"Hello there,\" and then " +
                "went on down the street.  When she stopped " +
                "to look at the fur coats in a shop window, " +
                "her dog growled.  \"Sorry Jake,\" she said. " +
                " \"I didn't know you would take it personally.\"";
        formatLines(moreText, 30, currentLocale);
        System.out.println();
    }

    static public void main(String[] args) {

        characterExamples();
        System.out.println();
        wordExamples();
        System.out.println();
        sentenceExamples();
        System.out.println();
        lineExamples();
    }

} // class

```

测试输出

```
0
2
4
6

She stopped.  She said, "Hello there," and then went on.
^  ^^      ^^ ^  ^^   ^^^^    ^^    ^^^^  ^^   ^^   ^^ ^^

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

She stopped.  She said, "Hello there," and then went on.
^             ^                                         ^
He's vanished!  What will we do?  It's up to us.
^               ^                 ^             ^
Please add 1.5 liters to the tank.
^                                 ^
"No man is an island . . . every man . . . "
^                                    ^^^^^^ ^
My friend, Mr. Jones, has a new dog.  The dog's name is Spot.
^              ^                      ^                      ^

She stopped.  She said, "Hello there," and then went on.
^   ^         ^   ^     ^      ^       ^   ^    ^    ^  ^
There are twenty-four hours in a day.
^     ^   ^      ^    ^     ^  ^ ^   ^

She said, "Hello there," and 
then went on down the 
street.  When she stopped to 
look at the fur coats in a 
shop window, her dog 
growled.  "Sorry Jake," she 
said.  "I didn't know you 
would take it personally."
```

