# 查找文件

如果您曾经使用过`shell`脚本，则很可能使用模式匹配来定位文件。其实你可能已经广泛使用了。如果您没有使用它，模式匹配使用特殊字符来创建一个模式，然后文件名可以与该模式进行比较。例如，在大多数`shell`脚本中，星号 * 匹配任意数量的字符。例如，以下命令列出当前目录中的所有文件`.html`：
```bash
% ls *.html

百分号是什么标记？我在linux中断中是这样的：

$ ls *.html
```

该`java.nio.file`软件包为此功能提供程序化支持。每个文件系统实现提供了一个 `PathMatcher`。您可以`PathMatcher`通过使用类中的 `getPathMatcher(String)`方法来检索文件系统`FileSystem`。以下代码片段将获取默认文件系统的路径匹配器：
```java
String pattern = ...;
PathMatcher matcher =
    FileSystems.getDefault().getPathMatcher("glob:" + pattern);
```

传递的`string参数`指定要`getPathMatcher`匹配的语法`flavor`和`pattern`。此示例指定`glob`语法。如果您不熟悉`glob`语法，请参阅 [什么是Glob-该文章中的章节](/content/essential/io/fileOps.md)。

Glob语法易于使用和灵活，但如果您愿意，还可以使用正则表达式或正则表达式语法。有关正则表达式的更多信息，请参见 [正则表达式的教程](http://docs.oracle.com/javase/tutorial/essential/regex/index.html)。一些文件系统实现可能支持其他语法。

如果要使用其他形式的基于字符串的模式匹配，您可以创建自己的`PathMatcher`类。本页中的示例使用glob语法。

一旦你创建了你的`PathMatcher`实例，你就可以根据它来匹配文件了。该`PathMatcher`接口有一个方法， `matches`它接受一个`Path`参数并返回一个布尔值：它与模式匹配，或者它不匹配。

以下代码片段查找以这些`.java`或`.class`结尾的文件打印到标准输出流：
```java
  Path targetPath = Paths.get("d:/server.xml");

        PathMatcher matcher =
                FileSystems.getDefault().getPathMatcher("glob:*.{xml}");
        // 特别注意这里。要返回FileName的path
        // 区别是：fileName的Path对象中的path就只有文件名，而targetPath中的path 是整个路径
        if (matcher.matches(targetPath.getFileName())) {
            System.out.println(targetPath);
        }
```

## 递归模式匹配

寻找匹配特定模式，走一个文件树，匹配成功出现了多少次。你知道一个文件在某处在文件系统中，但在哪里？也许你需要在文件树查找所有文件具有特定文件扩展名。
[该列子在上一章节中：](/content/essential/io/walk.md)