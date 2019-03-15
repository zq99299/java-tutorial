# 扫描
`Scanner` 对象可用于将格式化的输入分解为令牌，并根据其数据类型翻译各个令牌。

## 解析令牌输入
默认情况下，`Scanner` 使用空白符分隔标记。（空白符包括空格，制表符和行终止符），有关完整列表，请参阅 `Character.isWhitespace`，
要知道 `Scanner` 是如何工作的，我们来看看 ScanXan 一个读取单个单词 xanadu.txt 并打印出来的程序：

```java
public class ScanXan {
    public static void main(String[] args) throws IOException {

        Scanner s = null;

        try {
            s = new Scanner(new BufferedReader(new FileReader("xanadu.txt")));

            while (s.hasNext()) {
                System.out.println(s.next());
            }
        } finally {
            if (s != null) {
                s.close();
            }
        }
    }
}
```

请注意：`s.close()`，它是 Scanner 的方法。即使 Scanner 不是流，但是你也需要关闭它，以表示已完成其底层流。

输出

```java
------------- xanadu.txt ------------------
I
n Xanadu did Kubla Khan
A stately pleasure-dome decree:
Where Alph, the sacred river, ran
Through caverns measureless to man
Down to a sunless sea.
中文

------------- 输出 ------------------
I
n
Xanadu
did
Kubla
Khan
...
```

要使用不同的令牌分隔符，请调用 `Scanner useDelimiter(String pattern) ` 指定正则表达式。
例如：假设您希望令牌分隔符为逗号，可选的后面跟一个或多个空白字符（[ \t\n\x0B\f\r]），
你会调用 `s.useDelimiter(",\\s*");`


```java
------------- xanadu.txt ------------------
I,
n, Xanadu did Kubla Khan
A,stately pleasure-dome decree:
Where Alph, the sacred river, ran
Through caverns measureless to man
Down to a sunless sea.
中文

------------- 输出 ------------------

I
n
Xanadu did Kubla Khan
A
stately pleasure-dome decree:
Where Alph
the sacred river
ran
Through caverns measureless to man
Down to a sunless sea.
中文
```

## 翻译个别令牌
该 ScanXan 示例将所有输入令牌视为简单 String 值。Scanner 还支持所有 Java 语言的基本类型（除了令牌 char），以及 BigInteger 和 BigDecimal。因此能够以标准格式以及扫描器语言环境的格式扫描数字，
如千位分隔符，在 US 环境中 Scanner 正确读取字符串 「32,767」 表示整数值。

我们必须提及的区域设置，因为千分位隔符和小数符号是特定于区域设置。因此，如果我们没有指定扫描程序应使用 US 语言环境，以下示例将无法在所有语言环境中正常工作。
这不是你通常不必担心的，因为您的输入数据通常来自使用相同语言环境的来源。
但是这个例子是 Java Tutorial 的一部分，并且遍布世界各地。

```java
public class ScanSum {
    public static void main(String[] args) throws IOException {

        Scanner s = null;
        double sum = 0;
        String usnumbers = ScanSum.class.getResource("/usnumbers.txt").getFile();
        try {
            s = new Scanner(new BufferedReader(new FileReader(usnumbers)));
            s.useLocale(Locale.US);  // 设置区域

            while (s.hasNext()) {
                // 如果下一个为 double类型，则累加
                if (s.hasNextDouble()) {
                    sum += s.nextDouble();
                } else {
                    s.next();
                }
            }
        } finally {
            s.close();
        }

        System.out.println(sum);
    }
}
```

```java
------------- usnumbers.txt ------------------
8.5
32,767
3.14159
1,000,000.1

------------- 输出 ------------------
1032778.74159

```

在某些区域设置中，该值是一个不同的字符，因为 `System.out` 它是一个 `PrintStream` 对象，
该类不提供覆盖默认语言环境的方法。我们可以覆盖整个程序的区域设置 - 或者我们只能使用格式化，
如下一个主题 格式化 章节。
