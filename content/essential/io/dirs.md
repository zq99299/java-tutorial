# 创建和读取目录

以前讨论过的一些方法，如delete文件，链接和目录。但是如何列出文件系统顶部的所有目录？如何列出目录的内容或创建目录？
本节介绍了目录特有的以下功能：

* 列出文件系统的根目录
* 创建目录
* 创建临时目录
* 列出目录的内容
* 使用Globbing过滤目录列表
* 编写自己的目录过滤器

## 列出文件系统的根目录
您可以使用`FileSystem.getRootDirectories`方法列出文件系统的所有根目录 。此方法返回一个`Iterable`，它使您能够使用 `enhanced for`语句来遍历所有根目录。

以下代码使用默认文件系统打印根目录
```java
Iterable<Path> dirs = FileSystems.getDefault().getRootDirectories();
for (Path name: dirs) {
    System.err.println(name);
    // 在windows系统中的话就是打印各个盘符路径
}
```


## 创建目录

您可以使用`createDirectory(Path, FileAttribute<?>)`方法创建一个新的目录 。如果不指定任何属性`FileAttributes`，则新目录将具有默认属性。例如：
```java
Path dir = ...;
Files.createDirectory(path);
```

以下代码片段在具有特定权限的POSIX文件系统上创建一个新目录：
```java
Set<PosixFilePermission> perms =
    PosixFilePermissions.fromString("rwxr-x---");
FileAttribute<Set<PosixFilePermission>> attr =
    PosixFilePermissions.asFileAttribute(perms);
Files.createDirectory(file, attr);
```