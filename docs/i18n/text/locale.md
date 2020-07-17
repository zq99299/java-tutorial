# 执行与 Locale 敏感的比较

排序规则定义字符串的排序序列。这些规则因地区而异，因为各种自然语言对单词的排序不同。
可以使用 Collator 类提供的预定义排序规则以与 Locale 敏感方式对字符串排序。

可以通过 `getInstance` 方法，创建 Collator 实例，使用默认的 Locale 创建一个排序器

```java
Collator myDefaultCollator = Collator.getInstance();
```

还可以创建 Collator 时，指定一个 Locale

```java
Collator myFrenchCollator = Collator.getInstance(Locale.FRENCH);
```

这个 `getInstance ` 方法返回一个 `RuleBasedCollator` 类，它是 Collator 的子类。RuleBasedCollator 包含一组规则，用于确定指定 Locale 的字符串的排序顺序。这些规则是针对每种 Locale 预定义的。因为规则被封装在RuleBasedCollator 中，所以您的程序不需要特殊的例程来处理排序规则随语言的变化。

调用 `Collator.compare` 方法来执行与 Locale 敏感的字符串比较。当第一个字符串参数小于、等于或大于第二个字符串参数时，compare 方法返回一个小于、等于或大于零的整数。下表包含一些调用 collator 的示例。

| Example                            | 返回值 | 说明                  |
| ---------------------------------- | ------ | --------------------- |
| `myCollator.compare("abc", "def")` | `-1`   | `"abc"` 小于  `"def"` |
| `myCollator.compare("rtf", "rtf")` | `0`    | 两个字符串相等        |
| `myCollator.compare("xyz", "abc")` | `1`    | `"xyz"`  大于 `"abc"` |

在执行排序操作时使用 compare 方法。
下列展示了使用 compare 方法对英语和法语单词数组进行排序。展示了当你用两种不同的排序器对相同的单词列表排序时会发生什么: 

```java
Collator fr_FRCollator = Collator.getInstance(new Locale("fr","FR"));
Collator en_USCollator = Collator.getInstance(new Locale("en","US"));
```

排序方法 sortStrings，可以与任何排序器一起使用。注意 sortStrings 方法调用了 compare 方法:

```java
public static void sortStrings(Collator collator, String[] words) {
    String tmp;
    for (int i = 0; i < words.length; i++) {
        for (int j = i + 1; j < words.length; j++) { 
            if (collator.compare(words[i], words[j]) > 0) {
                tmp = words[i];
                words[i] = words[j];
                words[j] = tmp;
            }
        }
    }
}
```

英文排序输出

```
peach
péché	   # 这是二声
pêche
sin
```

根据法语的排序规则，前面的列表顺序是错误的。在法语中，peche 应该跟在 peche 后面，形成一个排序列表。
法语排序器对单词数组进行正确排序，如下:

```
peach
pêche		# 这是一声
péché
sin
```

## 完成测试程序

```java
import java.util.*;
import java.text.*;

public class CollatorDemo {

    /**
     * 字符串排序
     * @param collator
     * @param words
     */
    public static void sortStrings(Collator collator, String[] words) {
        String tmp;
        for (int i = 0; i < words.length; i++) {
            for (int j = i + 1; j < words.length; j++) {
                // 一次比较数组中的两个元素。
                if (collator.compare(words[i], words[j]) > 0) {
                    // 交换 words[i] 和 words[j]
                    tmp = words[i];
                    words[i] = words[j];
                    words[j] = tmp;
                }
            }
        }
    }

    /**
     * 打印字符串
     * @param words
     */
    public static void printStrings(String[] words) {
        for (int i = 0; i < words.length; i++) {
            System.out.println(words[i]);
        }
    }

    /**
     * 字符串比较测试
     */
    public static void testCompare() {

        Collator myCollator = Collator.getInstance(new Locale("en", "US"));

        System.out.println(myCollator.compare("abc", "def"));
        System.out.println(myCollator.compare("rtf", "rtf"));
        System.out.println(myCollator.compare("xyz", "abc"));
    }

    static public void main(String[] args) {

        testCompare();
        System.out.println();

        // 创建与 locale 有关的比较器
        Collator fr_FRCollator = Collator.getInstance(new Locale("fr", "FR"));
        Collator en_USCollator = Collator.getInstance(new Locale("en", "US"));

        String eWithCircumflex = new String("\u00EA");
        String eWithAcute = new String("\u00E9");

        String peachfr = "p" + eWithAcute + "ch" + eWithAcute;
        String sinfr = "p" + eWithCircumflex + "che";

        String[] words = {
                peachfr,
                sinfr,
                "peach",
                "sin"
        };

        sortStrings(fr_FRCollator, words);
        System.out.println("Locale: fr_FR");
        printStrings(words);

        System.out.println();

        sortStrings(en_USCollator, words);
        System.out.println("Locale: en_US");
        printStrings(words);
    }
}
```

测试输出

```
-1
0
1

Locale: fr_FR
peach
pêche
péché
sin

Locale: en_US
peach
péché
pêche
sin
```

