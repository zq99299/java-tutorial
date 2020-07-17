# 自定义排序规则

上一节讨论了如何使用区域设置的预定义规则来比较字符串。这些排序规则决定字符串的排序顺序。
如果预定义的排序规则不能满足您的需要，您可以设计自己的规则并将它们分配给 RuleBasedCollator 对象。

自定义排序规则包含在传递给 RuleBasedCollator 构造函数的字符串对象中。这里有一个简单的例子:

```java
String simpleRule = "< a < b < c < d";
RuleBasedCollator simpleCollator =  new RuleBasedCollator(simpleRule);
```

对于上例中的 simpleCollator 对象，a 小于 b， b 又小于 c，依此类推。比较方法在 **比较字符串时引用这些规则**。
用于构造排序规则的完整语法比这个简单示例更加灵活和复杂。有关语法的完整描述，请参阅 [RuleBasedCollator](https://docs.oracle.com/javase/8/docs/api/java/text/RuleBasedCollator.html)类的 API 文档。

下面的示例使用两个排序规则对西班牙语单词列表进行排序

首先定义 **英语** 和 **西班牙语** 的排序规则。该程序将按照传统方式对西班牙语单词进行排序。在按照传统规则排序时，字母 ch 和 ll 及其对等的大写字母在排序顺序中都有各自的位置。这些字对比较，好像他们是一个 character（字符）。例如，ch 作为单个字母排序，在排序顺序中紧随 cz。注意这两个排序器的规则是如何不同的:

```java
// 英语规则
String englishRules = (
    "< a,A < b,B < c,C < d,D < e,E < f,F " +
    "< g,G < h,H < i,I < j,J < k,K < l,L " +
    "< m,M < n,N < o,O < p,P < q,Q < r,R " +
    "< s,S < t,T < u

String smallnTilde = new String("\u00F1");    // ñ
String capitalNTilde = new String("\u00D1");  // Ñ

// 西班牙语规则
String traditionalSpanishRules = (
    "< a,A < b,B < c,C " +
    "< ch, cH, Ch, CH " +
    "< d,D < e,E < f,F " +
    "< g,G < h,H < i,I < j,J < k,K < l,L " +
    "< ll, lL, Ll, LL " +
    "< m,M < n,N " +
    "< " + smallnTilde + "," + capitalNTilde + " " +
    "< o,O < p,P < q,Q < r,R " +
    "< s,S < t,T < u,U < v,V < w,W < x,X " +
    "< y,Y < z,Z");
```

下面代码创建了排序器，并调用了排序程序

```java
try {
    RuleBasedCollator enCollator = new RuleBasedCollator(englishRules);
    RuleBasedCollator spCollator = new RuleBasedCollator(traditionalSpanishRules);

    sortStrings(enCollator, words);
    printStrings(words);
    System.out.println();

    sortStrings(spCollator, words);
    printStrings(words);
} catch (ParseException pe) {
    System.out.println("Parse exception for rules");
}
```

sortStrings 排序函数是通用的。它将根据任何排序器对象的规则对任意数组的单词进行排序:

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

使用英文排序规则进行排序时，单词数组如下：

```java
chalina
curioso
llama
luz
```

将前面的列表与下面的列表进行比较，下面的列表是按照西班牙传统的排序规则排序的：

```
curioso
chalina  # 这里不一样
luz
llama
```

## 完整程序

```java
import java.util.*;
import java.text.*;

public class RulesDemo {

    /**
     * 通用的排序方法，对 words 单词进行排序
     * @param collator
     * @param words
     */
    public static void sortStrings(Collator collator, String[] words) {
        String tmp;
        for (int i = 0; i < words.length; i++) {
            for (int j = i + 1; j < words.length; j++) {
                // Compare elements of the words array
                if (collator.compare(words[i], words[j]) > 0) {
                    // Swap words[i] and words[j]
                    tmp = words[i];
                    words[i] = words[j];
                    words[j] = tmp;
                }
            }
        }
    }

    public static void printStrings(String[] words) {
        for (int i = 0; i < words.length; i++) {
            System.out.println(words[i]);
        }
    }

    static public void main(String[] args) {
        // 自定义英语字母排序规则
        String englishRules =
                ("< a,A < b,B < c,C < d,D < e,E < f,F " +
                        "< g,G < h,H < i,I < j,J < k,K < l,L " +
                        "< m,M < n,N < o,O < p,P < q,Q < r,R " +
                        "< s,S < t,T < u,U < v,V < w,W < x,X " +
                        "< y,Y < z,Z");

        // 自定义法语排序规则
        String smallnTilde = new String("\u00F1");
        String capitalNTilde = new String("\u00D1");

        String traditionalSpanishRules =
                ("< a,A < b,B < c,C " +
                        "< ch, cH, Ch, CH " +
                        "< d,D < e,E < f,F " +
                        "< g,G < h,H < i,I < j,J < k,K < l,L " +
                        "< ll, lL, Ll, LL " +
                        "< m,M < n,N " +
                        "< " + smallnTilde + "," + capitalNTilde + " " +
                        "< o,O < p,P < q,Q < r,R " +
                        "< s,S < t,T < u,U < v,V < w,W < x,X " +
                        "< y,Y < z,Z");

        // 要排序的单词
        String[] words = {
                "luz",
                "curioso",
                "llama",
                "chalina"
        };

        try {
            // 构建排序器
            RuleBasedCollator enCollator =
                    new RuleBasedCollator(englishRules);
            RuleBasedCollator spCollator =
                    new RuleBasedCollator(traditionalSpanishRules);

            sortStrings(enCollator, words);
            printStrings(words);

            System.out.println();

            sortStrings(spCollator, words);
            printStrings(words);
        } catch (ParseException pe) {
            System.out.println("Parse exception for rules");
        }
    }
}
```

输出信息

```java
chalina
curioso
llama
luz

curioso
chalina
luz
llama
```

