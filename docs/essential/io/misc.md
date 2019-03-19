# 其他有用的方法

在本课程中，有一些有用的方法并不适用于其他地方，并在此处介绍。本节包括以下内容：

* 确定 MIME 类型
* 默认文件系统
* 路径字符串分隔符
* 文件系统的文件存储

## 确定 MIME 类型

要确定文件的 MIME 类型，您可能会发现该 [probeContentType(Path)](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#probeContentType-java.nio.file.Path-) 方法很有用。例如：
```java
try {
    Path filename = Paths.get("D:/server.xml");
    String type = Files.probeContentType(filename);
    if (type == null) {
        System.err.format("'%s' has an" + " unknown filetype.%n", filename);
    } else if (!type.equals("text/plain")) {
        System.err.format("'%s' is not" + " a plain text file.%n", filename);
    }
} catch (IOException x) {
    System.err.println(x);
}
```

请注意，`probeContentType` 如果内容类型无法确定，则返回 null。

这种方法的实现是高度平台的，并不是绝对的。内容类型由平台的默认文件类型检测器决定。
例如，如果检测器确定文件的内容类型是 application/x-java 基于.class 扩展名，则可能会被愚弄。

[FileTypeDetector](https://docs.oracle.com/javase/8/docs/api/java/nio/file/spi/FileTypeDetector.html) 如果默认值不足以满足您的需求，则可以提供自定义 。

## 默认文件系统
要检索默认文件系统，请使用该 `FileSystems.getDefault` 方法。通常，该 FileSystems 方法（注意复数）被链接到其中一种 `FileSystem` 方法（注意单数），如下所示：

```java
PathMatcher matcher =
    FileSystems.getDefault().getPathMatcher("glob:*.*");
```

## 路径字符串分隔符
POSIX 文件系统的路径分隔符是正斜杠/ ，对于 Microsoft Windows 是反斜杠 `\`。其他文件系统可能使用其他分隔符。
要检索 Path 默认文件系统的分隔符，可以使用以下方法之一：

```java
String separator = File.separator;
String separator = FileSystems.getDefault().getSeparator();
// 该 getSeparator 方法还用于检索任何可用文件系统的路径分隔符。
```

## 文件系统的文件存储
一个文件系统有一个或多个文件存储以其持有的文件和目录。这个文件存储代表底层的存储装置。
在 UNIX 操作系统中，每个安装的文件系统都由文件存储区来表示。在 Microsoft Windows 中，每个卷都由一个文件存储：C:，... D: 等表示。

要检索文件系统的所有文件存储的列表，可以使用该 [FileSystem.getFileStores](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileSystem.html#getFileStores--) 方法。
此方法返回一个 `Iterable`，它允许您使用 `enhanced for` 语句遍历所有根目录。

```java
 // 遍历当前机器上的文件存储区
  for (FileStore store : FileSystems.getDefault().getFileStores()) {
      System.out.println(store);
  }

  // 查找 指定文件存储在哪一个存储区
  Path file = Paths.get("d:/server.xml");
  FileStore store = Files.getFileStore(file);
  System.out.println(store);
```
