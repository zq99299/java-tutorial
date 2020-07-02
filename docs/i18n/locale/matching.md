# 语言标记过滤与查找

Java 编程语言包含语言标签、语言标签筛选和语言标签查找的国际化支持。这些功能由[IETF BCP 47](http://tools.ietf.org/html/bcp47)指定 ，其中包含 [RFC 5646“用于识别语言的标签”](http://tools.ietf.org/html/rfc5646) 和 [RFC 4647“语言标签的匹配”。](http://tools.ietf.org/html/rfc4647) 本课描述了如何在 JDK 中提供此支持。

## 什么是语言标签？

语言标记是专门格式化的字符串，提供有关特定语言的信息。语言标签可能是一些简单的东西（如英语的 "en" ），复杂的东西（如 "zh-cmn-Hans-CN" 的中文，普通话，简化脚本，在中国使用），或介于两者之间的东西（如 "sr-Latn"，塞尔维亚语用拉丁文脚本写）。语言标记由用连字符分隔的 "子标记" 组成；此术语在整个 API 文档中使用。

java.util.locale 类支持语言标签。locale  包含几个不同的字段：

- 语言（如英语的 "en" 或日语的 "ja" ）、

- 脚本（如拉丁文的 "Latn" 或西里尔语的 "Cyrl"）、

- 国家/地区（例如美国/地区或法国的"FR"）、

- 变体（表示区域设置的某种变体）

- 扩展（为 String 值提供单个字符键的映射，表示除了语言标识之外的扩展）。

若要从语言标签字符串创建 locale  对象，请调用 `Locale.forLanguageTag(string)`，将语言标签作为唯一参数传递。这样做将创建并返回一个新的 Locale 对象，在程序中使用。

```java
package languagetagdemo;

import java.util.Locale;

public class LanguageTagDemo {
     public static void main(String[] args) {
         Locale l = Locale.forLanguageTag("en-US");
     }
}
```

注意：该 API 仅要求你的语言标签的语法格式正确，并不会执行额外的验证（如果检查标签是否存在）

## 什么是语言范围？

语言范围（由 `java.util.1.Locale.LanguageRange` 类表示）标识共享特定属性的语言标记集。语言范围分为基本或扩展，并且与语言标签类似，因为它们由用连字符分隔的子标记组成。基本语言范围的示例包括 "en"（英语）、"ja-JP"（日语、日语）和 "*"（匹配任何语言标签的特殊语言范围）。扩展语言范围的示例包括 "*-CH"（任何语言，瑞士）、"es-*"（西班牙语，任何地区）和 "zh-Hant-*"（繁体中文，任何地区）。

此外，语言范围可以存储在语言优先级列表中，使用户能够在加权列表中确定其语言首选项的优先级。语言优先级列表通过将语言范围对象放入 java.util.List 来表示，然后可以将其传递给接受语言范围对象列表的 "区域设置" 方法。

## 创建语言范围

`java.util.1.Locale.LanguageRange` 提供两个构造方法

```java
public Locale.LanguageRange(String range)
public Locale.LanguageRange(String range, double weight)
```

它们之间的唯一区别是第二个版本允许指定权重；如果将范围放入「语言优先级列表」，则将考虑此权重。

该类还提供了权重的常量

```java
public static final double MAX_WEIGHT;   // 权重为 1
public static final double MIN_WEIGHT;  // 权重为 0
```

```java
Locale l = Locale.forLanguageTag("en-US");

// 定义某些语言范围对象
Locale.LanguageRange range1 = new Locale.LanguageRange("en-US", Locale.LanguageRange.MAX_WEIGHT);
Locale.LanguageRange range2 = new Locale.LanguageRange("en-GB*", 0.5);
Locale.LanguageRange range3 = new Locale.LanguageRange("fr-FR", Locale.LanguageRange.MIN_WEIGHT);
```

上面创建了三种语言范围：英语（美国），英语（英国）和法语（法国）。对这些范围进行加权以从最优选到最不喜欢的顺序表达用户的偏好。

## 创建语言优先级列表

```java
Locale l = Locale.forLanguageTag("en-US");

// 创建语言优先级列表

String ranges = "en-US;q=1.0,en-GB;q=0.5,fr-FR;q=0.0";

List<Locale.LanguageRange> languageRanges = Locale.LanguageRange.parse(ranges);
```

权重通过 `q` 指定，多个语言优先级使用逗号分隔。

## 过滤语言标签

简单说：通过 Locale 找到我们定义的该 Locale 的优先级。

- [`public static List filter (List priorityList, Collection locales)`](https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html#filter-java.util.List-java.util.Collection-)
- [`public static List filter (List priorityList, Collection locales, Locale.FilteringMode mode)`](https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html#filter-java.util.List-java.util.Collection-java.util.Locale.FilteringMode-)

参数含义：

- priorityList：优先级列表

- Locale：要匹配的 Locale 列表

- mode：过滤模式

   [`Locale.FilteringMode`](https://docs.oracle.com/javase/8/docs/api/java/util/Locale.FilteringMode.html) 提供了许多不同的值。例如，选择 `AUTOSELECT_FILTERING`（对于基本语言范围滤波）或 `EXTENDED_FILTERING`（用于扩展语言范围滤波）。

下面提供了语言标签过滤的演示。

```java
package languagetagdemo;

import java.util.Locale;
import java.util.Collection;
import java.util.List;
import java.util.ArrayList;

public class LanguageTagDemo {

    public static void main(String[] args) {

        // 创建要赛选的 locale 集合
        Collection<Locale> locales = new ArrayList<>();
        locales.add(Locale.forLanguageTag("en-GB"));
        locales.add(Locale.forLanguageTag("ja"));
        locales.add(Locale.forLanguageTag("zh-cmn-Hans-CN"));
        locales.add(Locale.forLanguageTag("en-US"));

        // 使用表达式创建语言优先级列表
        String ranges = "en-GB;q=0.5,en-US;q=1.0,fr-FR;q=0.0";
        List<Locale.LanguageRange> languageRanges = Locale.LanguageRange.parse(ranges);

        // 过滤
        List<Locale> results = Locale.filter(languageRanges, locales);

        // 打印匹配到的 local
        for (Locale l : results) {
            System.out.println(l.toString());
        }
}
```

输出如下

```bash
en_US
en_GB
```

可以看到，从优先级列表中匹配相同的语言环境，然后按照优先级顺序返回匹配到的列表

该类还定义了两个用于过滤语言标签的方法

- [`public static List filterTags (List priorityList, Collection tags)`](https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html#filterTags-java.util.List-java.util.Collection-)
- [`public static List filterTags (List priorityList, Collection tags, Locale.FilteringMode mode)`](https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html#filterTags-java.util.List-java.util.Collection-java.util.Locale.FilteringMode-)

```java
package languagetagdemo;

import java.util.Locale;
import java.util.Collection;
import java.util.List;
import java.util.ArrayList;

public class LanguageTagDemo {

    public static void main(String[] args) {
        // 创建要匹配的语言标签
        Collection<String> tags = new ArrayList<>();
        tags.add("en-GB");
        tags.add("ja");
        tags.add("zh-cmn-Hans-CN");
        tags.add("en-US");

        // 通过表达式创建语言优先级列表
        String ranges = "en-US;q=1.0,en-GB;q=0.5,fr-FR;q=0.0";
        List<Locale.LanguageRange> languageRanges = Locale.LanguageRange.parse(ranges);

        // 开始过滤、匹配
        List<String> results = Locale.filterTags(languageRanges,tags);

        for(String s : results){
            System.out.println(s);
        }
    }
} 
```

同样输出

```java
en-us
en-gb
```

## 执行语言标签查找

简单说：在一堆 Locale 中，根据优先级程度，拿到匹配且权重最大的那一个  Locale

```java
package languagetagdemo;

import java.util.Locale;
import java.util.Collection;
import java.util.List;
import java.util.ArrayList;

public class LanguageTagDemo {

    public static void main(String[] args) {
       Collection<Locale> locales = new ArrayList<>();
        locales.add(Locale.forLanguageTag("en-GB"));
        locales.add(Locale.forLanguageTag("ja"));
        locales.add(Locale.forLanguageTag("zh-cmn-Hans-CN"));
        locales.add(Locale.forLanguageTag("en-US"));

        String ranges = "en-US;q=1.0,en-GB;q=0.5,fr-FR;q=0.0";
        List<Locale.LanguageRange> languageRanges = Locale.LanguageRange.parse(ranges);

        // 找到最佳匹配，并只返回一个结果
        Locale result = Locale.lookup(languageRanges,locales);
        System.out.println(result.toString());
    }
}
```

上述程序的输出结果是 `en-US` ， `en-US` 和 `en-GB` 都被匹配上，但是 `en-US` 的权重更高。

下面使用 String 类型的标签进行查找。

```java
package languagetagdemo;

import java.util.Locale;
import java.util.Collection;
import java.util.List;
import java.util.ArrayList;

public class LanguageTagDemo {

    public static void main(String[] args) {
        // Create a collection of String objects to match against
        Collection<String> tags = new ArrayList<>();
        tags.add("en-GB");
        tags.add("ja");
        tags.add("zh-cmn-Hans-CN");
        tags.add("en-US");

        // Express user's preferences with a Language Priority List
        String ranges = "en-US;q=1.0,en-GB;q=0.5,fr-FR;q=0.0";
        List<Locale.LanguageRange> languageRanges = Locale.LanguageRange.parse(ranges);

        // Find the BEST match, and return just one result
        String result = Locale.lookupTag(languageRanges, tags);
        System.out.println(result);
    }
} 
```

