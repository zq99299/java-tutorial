# 检查文件或目录
您有一个Path表示文件或目录的实例，但文件系统上是否存在该文件？是否可读？可写？可执行？

## 验证文件或目录的存在
Path类中的方法是语法？（就是不对真实的文件系统做操作），这意味着它们在Path实例上操作。但是最终你必须访问文件系统来验证某个特定Path是否存在，否则不存在。您可以使用[exists(Path, LinkOption...)](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#exists-java.nio.file.Path-java.nio.file.LinkOption...-)和 [notExists(Path, LinkOption...)](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#notExists-java.nio.file.Path-java.nio.file.LinkOption...-)方法来做到这一点 。注意!Files.exists(path)不等同于Files.notExists(path)。当您测试文件的存在时，可能有三个结果：

* 文件被验证存在。
* 该文件被验证为不存在。
* 该文件的状态是未知的。当程序无法访问该文件时，可能会发生此结果。

如果同时exists和notExists回报false，该文件的存在，无法验证。

## 检查文件可访问性

要验证需要的程序可以访问一个文件，你可以使用 [isReadable(Path)](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#isReadable-java.nio.file.Path-)， [isWritable(Path)](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#isWritable-java.nio.file.Path-)和 [isExecutable(Path)](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#isExecutable-java.nio.file.Path-)方法。

以下代码段验证特定文件是否存在，并且程序能够执行该文件。
```java
Path file = ...;
boolean isRegularExecutableFile = Files.isRegularFile(file) &
         Files.isReadable(file) & Files.isExecutable(file);
```

**注意：**一旦这些访问完成，就不能保证文件能访问，因为这些方法的结果是立即过时的。许多应用程序中常见的安全漏洞是执行检查，然后访问该文件。有关更多信息，请使用您最喜爱的搜索引擎查找TOCTTOU（发音为TOCK，TOCTOU是time-of-check-to-time-of-use的缩写）。