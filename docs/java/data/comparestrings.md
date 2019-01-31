# 比较字符串和部分字符串

这个 String 类有许多比较字符串和字符串部分的方法。下表列出了这些方法。

* 若该字符串以指定的字符串结尾开始，则返回 true

    ```java
    boolean endsWith(String suffix)
    boolean startsWith(String prefix)
    ```

* 从索引 offset 开始，若该字符串以指定的字符串开始，则返回 true

    ```java
    boolean startsWith(String prefix, int offset)
    ```
* 按字母顺序比较两个字符串。返回一个整数，指示该字符串是否大于（结果是 > 0），等于（结果是 = 0）还是小于（结果是 <0）参数。

    ```java
    int compareTo(String anotherString)
    ```
* 按字母顺序比较两个字符串，忽略大小写的差异。返回一个整数，指示该字符串是否大于（结果是 > 0），等于（结果是 = 0）还是小于（结果是 <0）参数。

    ```java
    int compareToIgnoreCase(String str)
    ```
* 标识两个字符串为同一字符序列则返回 true

    ```java
    boolean equals(Object anObject)
    ```
* 标识两个字符串为同一字符序列则返回 true，忽略大小写差异

    ```java
    boolean equalsIgnoreCase(String anotherString)
    ```
* 测试此字符串的指定区域是否与 String 参数的指定区域匹配。区域的长度是 len 从 toffset 这个字符串和 ooffset 另一个字符串的索引处开始的。

    ```java
    boolean regionMatches(int toffset, String other, int ooffset, int len)
    ```
* 测试此字符串的指定区域是否与 String 参数的指定区域匹配。布尔参数指示是否应忽略大小写; 如果为 true，则比较字符时将忽略大小写。

    ```java
    boolean regionMatches(boolean ignoreCase, int toffset, String other, int ooffset, int len)
    ```
* 测试此字符串是否与指定的正则表达式匹配。正则表达式在标题为 [正则表达式](/essential/regex/) 的课程中讨论。

    ```java
    boolean matches(String regex)
    ```

以下程序 RegionMatchesDemo 使用该 regionMatches 方法在另一个字符串中搜索字符串：

```java
public class RegionMatchesDemo {
    public static void main(String[] args) {
        String searchMe = "Green Eggs and Ham";
        String findMe = "Eggs";
        int searchMeLength = searchMe.length();
        int findMeLength = findMe.length();
        boolean foundIt = false;
        for (int i = 0;
             i <= (searchMeLength - findMeLength);
             i++) {
            if (searchMe.regionMatches(i, findMe, 0, findMeLength)) {
                foundIt = true;
                System.out.println(searchMe.substring(i, i + findMeLength));
                break;
            }
        }
        if (!foundIt)
            System.out.println("No match found.");
    }
}
```

感觉这个很麻烦的样子，相当于调用 startsWith 了；
