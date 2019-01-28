# 操纵字符串中的字符
String类有许多检查字符串内容的方法，在字符串中查找字符或子字符串，和其他操纵字符串的方法。

## 通过索引获取字符和子字符串
您可以通过调用charAt()方法来获取字符串中特定索引处的字符。第一个字符的索引是0，而最后一个字符的索引是length()-1。例如，下面的代码在字符串中获取索引9处的字符：

索引从0开始，所以索引9处的字符是'O'，如下图所示：

![](./assets/objects-charAt.gif)

如果要从字符串中获取多个连续的字符，则可以使用该substring方法。该substring方法有两个版本，如下表所示：

* 返回一个新字符串，该字符串是该字符串的一个子字符串。子字符串从指定beginIndex开始，并延伸到索引endIndex - 1处的字符。

    ```java
    String substring(int beginIndex, int endIndex)
    ```
* 返回一个新字符串，该字符串是该字符串的一个子字符串。整数参数指定第一个字符的索引。这里，返回的子字符串延伸到原始字符串的末尾。

    ```java
    String substring(int beginIndex)
    ```

下面是一个例子

```java
String anotherPalindrome = "Niagara. O roar again!";
String roar = anotherPalindrome.substring(11, 15);
```
![](./assets/objects-substring.gif)


## 其他操纵字符串的方法

* 搜索由字符串参数（包含正则表达式）指定的匹配项，并相应地将此字符串拆分为一个字符串数组。可选的整数参数指定返回数组的最大大小。正则表达式在标题为“[正则表达式](/content/essential/regex/index.md)”的课程中进行了介绍。

    ```java
    String[] split(String regex)
    String[] split(String regex, int limit)
    ```

* 返回从beginIndex索引构建的新的字符序列，直到endIndex-1。

    ```java
    CharSequence subSequence(int beginIndex, int endIndex)
    ```

* 返回此字符串的副本，并删除前导空白和尾部空白。

    ```java
    String trim()
    ```

* 返回转换为小写或大写字符串的副本。如果不需要转换，这些方法将返回原始字符串。

    ```java
    String toLowerCase()
    String toUpperCase()
    ```

## 在字符串中搜索字符和子字符串

以下是String在字符串中查找字符或子字符串的其他一些方法。String类提供存取方法返回一个特定的字符或字符串的字符串中的位置：indexOf()和lastIndexOf()。该indexOf()方法从字符串的开头向前搜索，和lastIndexOf()方法从字符串的结尾向后搜索。如果找不到字符或字符串，indexOf()并lastIndexOf()返回-1。

String类还提供了一个搜索方法contains，如果字符串中包含特定字符序列返回true。当您只需要知道该字符串包含字符序列时，使用此方法，但精确的位置并不重要。

下表介绍了各种字符串搜索方法。

* 返回指定字符的第一个（最后一个）匹配项的索引。

    ```java
    int indexOf(int ch)
    int lastIndexOf(int ch)
    ```
* 返回指定字符的第一个（最后一个）出现的索引，从指定的索引向前（向后）搜索。

    ```java
    int indexOf(int ch, int fromIndex)
    int lastIndexOf(int ch, int fromIndex)
    ```
* 返回指定子字符串的第一个（最后一个）匹配项的索引。

    ```java
    int indexOf(String str)
    int lastIndexOf(String str)
    ```
* 返回指定子串的第一个（最后一个）匹配项的索引，从指定的索引向前（向后）搜索。

    ```java
    int indexOf(String str, int fromIndex)
    int lastIndexOf(String str, int fromIndex)
    ```
* 如果字符串包含指定的字符序列，则返回true。

    ```java
    boolean contains(CharSequence s)
    ```

> 注意： String类实现了CharSequence接口。因此，您可以使用字符串作为contains()方法的参数。
* 返回指定字符的第一个（最后一个）匹配项的索引。

## 将字符和子字符替换为字符串
String类有插入字符或字符串转换成字符串非常少的方法。一般情况下，它们不是必需的：您可以通过将您从字符串中删除的子字符串与要插入的子字符串连接来创建新字符串。

但是，String该类有四种方法来替换找到的字符或子字符串。他们是：

* 返回由newChar替换此字符串中出现的所有oldChar所产生的新字符串。
    ```java
    String replace(char oldChar, char newChar)
    ```
* 用与指定的文字替换序列相匹配的字符串替换此字符串的每个子字符串。
    ```java
    String replace(CharSequence target, CharSequence replacement)
    ```
* 用给定的替换替换此字符串中与给定正则表达式匹配的每个子字符串。
    ```java
    String replaceAll(String regex, String replacement)
    ```
* 用给定的替换替换此字符串中与给定正则表达式匹配的第一个子字符串。
    ```java
    String replaceFirst(String regex, String replacement)
    ```

## 一个例子

下面的类 Filename说明了文件名的不同部分的使用lastIndexOf()和substring()隔离。

> 注意：  以下Filename类中的方法不做任何错误检查，并假定它们的参数包含完整的目录路径和带有扩展名的文件名。如果这些方法是生产代码，他们会验证他们的论点是否正确构建。

```java
public class Filename {
    private String fullPath; // 全路径
    private char pathSeparator,  // 路径分割符
            extensionSeparator; // 后缀

    public Filename(String str, char sep, char ext) {
        fullPath = str;
        pathSeparator = sep;
        extensionSeparator = ext;
    }

    public String extension() {
        int dot = fullPath.lastIndexOf(extensionSeparator);
        return fullPath.substring(dot + 1);
    }

    // gets filename without extension
    public String filename() {
        int dot = fullPath.lastIndexOf(extensionSeparator);
        int sep = fullPath.lastIndexOf(pathSeparator);
        return fullPath.substring(sep + 1, dot);
    }

    public String path() {
        int sep = fullPath.lastIndexOf(pathSeparator);
        return fullPath.substring(0, sep);
    }
}
```

```java
        final String FPATH = "/home/user/index.html";
        Filename myHomePage = new Filename(FPATH, '/', '.');
        System.out.println("Extension = " + myHomePage.extension());
        System.out.println("Filename = " + myHomePage.filename());
        System.out.println("Path = " + myHomePage.path());
```

输出

```java
Extension = html
Filename = index
Path = /home/user
```

如下图所示，我们的extension方法用于lastIndexOf定位文件名中最后一次出现的句号（.）。然后substring使用返回值lastIndexOf来提取文件扩展名 - 也就是从字符串到句尾的子字符串。这段代码假定文件名有句点，如果文件名没有句点，则lastIndexOf返回-1，而substring方法则抛出一个StringIndexOutOfBoundsException。

![](./assets/objects-lastIndexOf.gif)
