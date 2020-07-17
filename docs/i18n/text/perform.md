# 改善排序性能

对很长的字符串列表进行排序通常很耗费时间。如果你的排序算法 **反复比较字符串**，你可以通过使用 CollationKey 类来加速这个过程。

CollationKey 对象表示给定字符串和排序器的排序键。比较两个 CollationKey 对象涉及 **排序键的按位比较**，并且比使用 Collator.compare 方法比较字符串对象更快。但是，生成 CollationKey 对象需要时间。因此，**如果字符串只比较一次**，**Collator.compare 可以提供更好的性能**。

下面的示例使用 CollationKey 对象对单词数组进行排序。

在主方法中创建一个 CollationKey 对象的数组。若要创建 CollationKey，请调用 Collator 对象上的 getCollationKey 方法。**除非两个 CollationKey 对象来自同一个 Collor，否则不能比较它们**。主要方法如下：

```java
static public void main(String[] args) {
    Collator enUSCollator = Collator.getInstance(new Locale("en","US"));
    String [] words = {
        "peach",
        "apricot",
        "grape",
        "lemon"
    };

    // 创建 CollationKey
    CollationKey[] keys = new CollationKey[words.length];

    for (int k = 0; k < keys.length; k ++) {
        // 通过 getCollationKey 获取 CollationKey 实例
        keys[k] = enUSCollator.getCollationKey(words[k]);
    }

    sortArray(keys);
    printArray(keys);
}
```

排序方法则与之前通用的原始单词对比类似

```java
public static void sortArray(CollationKey[] keys) {
    CollationKey tmp;

    for (int i = 0; i < keys.length; i++) {
        for (int j = i + 1; j < keys.length; j++) {
            if (keys[i].compareTo(keys[j]) > 0) {
                tmp = keys[i];
                keys[i] = keys[j];
                keys[j] = tmp; 
            }
        }
    }
}
```

对 CollationKey 对象的数组进行排序，但最初的目标是对 String 对象的数组进行排序。要检索每个 CollationKey 的字符串表示形式，程序在 displayWords 方法中调用 getSourceString，如下所示：

```java
static void displayWords(CollationKey[] keys) {
    for (int i = 0; i < keys.length; i++) {
        System.out.println(keys[i].getSourceString());
    }
}
```

## 完整程序

```java
package com.java;


import java.util.*;
import java.text.*;

public class KeysDemo {

    /**
     * 通用的排序算法，对象是 CollationKey
     * @param keys
     */
    public static void sortArray(CollationKey[] keys) {

        CollationKey tmp;

        for (int i = 0; i < keys.length; i++) {
            for (int j = i + 1; j < keys.length; j++) {
                // Compare the keys
                if (keys[i].compareTo(keys[j]) > 0) {
                    // Swap keys[i] and keys[j]
                    tmp = keys[i];
                    keys[i] = keys[j];
                    keys[j] = tmp;
                }
            }
        }
    }

    static void displayWords(CollationKey[] keys) {

        for (int i = 0; i < keys.length; i++) {
            // 获取原始字符串
            System.out.println(keys[i].getSourceString());
        }
    }

    static public void main(String[] args) {

        Collator enUSCollator = Collator.getInstance(new Locale("en", "US"));

        String[] words = {
                "peach",
                "apricot",
                "grape",
                "lemon"
        };

        CollationKey[] keys = new CollationKey[words.length];

        for (int k = 0; k < keys.length; k++) {
            keys[k] = enUSCollator.getCollationKey(words[k]);
        }

        sortArray(keys);
        displayWords(keys);
    }
}
```

测试输出

```
apricot
grape
lemon
peach
```

