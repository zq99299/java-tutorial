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