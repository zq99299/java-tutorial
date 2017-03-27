# 文件操作
`java.nio.file`包中的`[Files](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html)`类是另一个主要入口点。

该类提供了一组丰富的静态方法，用于读取，写入和操作文件和目录。这些Files方法适用于Path对象的实例。在进行其余部分之前，您应该熟悉以下常见概念：

* 释放系统资源
* 捕捉异常
* 可变参数
* 原子操作
* 方法链
* What Is a Glob?
* 链接感知

## 释放系统资源
此API中使用的许多资源（如流或通道）实现或扩展了`java.io.Closeable`接口。Closeable 是可以关闭的数据源或目标。调用 close 方法可释放对象保存的资源（如打开文件）。忽略关闭资源可能会对应用程序的性能产生负面影响。在下一节try-with-resources语句中为您处理此步骤。

## 捕捉异常
使用文件I / O，意外情况：一个文件存在（或不存在），该程序无法访问该文件系统，默认的文件系统实现不支持一个特定的功能， 等等。可能会遇到许多错误。

访问文件系统的所有方法都可以抛出IOException。最好的做法是通过 JDK7 引入的 `try-with-resources语句`来捕获这些异常。使用`try-with-resources`语句，编译器会自动生成关闭的代码。帮你自动释放资源。
```java
Charset charset = Charset.forName("US-ASCII");
String s = ...;
try (BufferedWriter writer = Files.newBufferedWriter(file, charset)) {
    writer.write(s, 0, s.length());
} catch (IOException x) {
    System.err.format("IOException: %s%n", x);
}
```
有关更多信息，请参阅 [try-with-resources](//content/essential/exceptions/handling/tryResourceClose.md)语句。

或者，您可以将文件I / O方法嵌入到try块中，然后捕获块中的任何异常catch。如果你的代码打开了任何流或通道，你应该在一个finally块中关闭它们。前面的例子看起来像以下使用try-catch-finally方法：
```java
Charset charset = Charset.forName("US-ASCII");
String s = ...;
BufferedWriter writer = null;
try {
    writer = Files.newBufferedWriter(file, charset);
    writer.write(s, 0, s.length());
} catch (IOException x) {
    System.err.format("IOException: %s%n", x);
} finally {
    if (writer != null) writer.close();
}
```
有关详细信息，请参阅“ [捕获和处理异常](//content/essential/exceptions/handling/README.md)”。

除此之外IOException，还有许多具体的例外 [FileSystemException](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileSystemException.html)。这个类有一些有用的方法返回涉及的文件 （[getFile](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileSystemException.html#getFile--)），详细的消息字符串 （[getMessage](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileSystemException.html#getMessage--)），文件系统操作失败的原因 （[getReason](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileSystemException.html#getReason--)）和所涉及的“其他”文件（[getOtherFile](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileSystemException.html#getOtherFile--)如果有的话 ）。

```java
try (...) {
    ...    
} catch (NoSuchFileException x) {
    System.err.format("%s does not exist\n", x.getFile());
}
```

为了清楚起见，本课程中的文件I / O示例可能不会显示异常处理，但是您的代码应该总是包含它。

## 可变参数
Files当指定标志时，几种方法接受任意数量的参数。例如，在以下方法签名中，`CopyOption`参数之后的椭圆符号表示该方法接受可变数量的参数，或者通常称为varargs：
```java
Path Files.move(Path, Path, CopyOption...)
```

当一个方法接受一个varargs参数时，你可以传递一个逗号分隔的值列表或数组（CopyOption[]）的值。

在该move示例中，可以如下调用该方法：
```java
import static java.nio.file.StandardCopyOption.*;

Path source = ...;
Path target = ...;
Files.move(source,
           target,
           REPLACE_EXISTING,
           ATOMIC_MOVE);
```
有关varargs语法的更多信息，请参阅 [可变参数](http://docs.oracle.com/javase/tutorial/java/javaOO/arguments.html#varargs)。

## 原子操作

几种Files方法，例如move，可以在某些文件系统中以原子方式执行某些操作。

一个**原子文件操作**是不能被中断或“部分”执行的操作。执行整个操作或操作失败。当您有多个进程在文件系统的相同区域上运行时，这很重要，您需要确保每个进程访问完整的文件。

## 方法链
许多文件I / O方法支持`方法链接`的概念(链式编程)。

您首先调用返回对象的方法。然后立即调用该对象的方法，该方法返回另一个对象，依此类推。许多I / O示例使用以下技术：
```java
String value = Charset.defaultCharset().decode(buf).toString();
UserPrincipal group =
    file.getFileSystem().getUserPrincipalLookupService().
         lookupPrincipalByName("me");
```
# 什么是 glob ？
Files类中的两个方法接受一个glob参数，但是什么是glob？

您可以使用glob语法来指定模式匹配行为。

glob模式被指定为字符串，并与其他字符串匹配，例如目录或文件名。Glob语法遵循几个简单的规则：

* 一个星号“*”匹配任意数量的字符（包括无）。
* 两个星号“**”，类似“*”但跨越目录边界。这种语法通常用于匹配完整的路径。
* 一个问号“?”,恰好匹配一个字符
* 大括号指定子模式的集合。例如：
    * {sun,moon,stars} 匹配“sun”，“moon”或“stars”。
    * {temp*,tmp*} 匹配以“temp”或“tmp”开头的所有字符串。
* 方括号传送一组单个字符，或者使用连字符（-）时，会显示一系列字符。例如：   
    * [aeiou] 匹配任何小写元音。
    * [0-9] 匹配任何数字。
    * [A-Z] 匹配任何大写字母。
    * [a-z,A-Z] 匹配任何大写或小写字母。
    
* 匹配,*,?,可以使用 \ 来转义。

以下是glob语法的一些示例：

*.html – 匹配以 .html 结尾的所有字符串
??? – 匹配三个字母或数字的所有字符串
*[0-9]* – 匹配包含数值的所有字符串
*.{htm,html,pdf} – 匹配以 .htm, .html or .pdf 结尾的字符串
a?*.java – 匹配任何以a开头的字符串，后至少跟一字母或数字，以.java结尾
{foo*,*[0-9]*} – 匹配以 foo 开头的任何字符串或包含数值的任何字符串

glob语法功能强大且易于使用。但是，如果您的需求不足，您还可以使用正则表达式。有关更多信息，请参阅 [正则表达式课程](http://docs.oracle.com/javase/tutorial/essential/regex/index.html)。

有关glob sytnax的更多信息，请参阅API规范FileSystem类中的[getPathMatcher](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileSystem.html#getPathMatcher-java.lang.String-)方法 。

## 链接感知
该Files课程是“链接感知”。每个Files方法或者检测到遇到符号链接时该怎么做，或者提供一个选项，使您能够在遇到符号链接时配置该行为。