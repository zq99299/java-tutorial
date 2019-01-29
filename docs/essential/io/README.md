# 基础I/O

本课程涵盖用于Java平台的基础`I/O` 类。它首先关注`I/O Streams`，这是一个强大的概念，可以大大简化`I/O`操作.该课程还可以看到序列化，这使得程序可以将整个对象写入流并再次读取它们。然后，该课程将查看`文件I/O`和文件系统操作，包括随机访问文件。

本`I/O Streams`大多数都是讲解针对`java.io`包。本`File I/O`大多数讲解都是针对`java.nio.file`包。

## [I/O 流](/content/essential/io/streams.md)

* [字节流（Byte Streams）](/content/essential/io/bytestreams.md)：处理原始二进制数据的`I/O`
* [字符流（Character Streams）](/content/essential/io/charstreams.md)：处理字符数据的`I/O`，自动处理和转换本地字符集
* [缓冲流（Buffered Streams）](/content/essential/io/buffers.md)： 优化输入和输出通过减少本机API调用的数量。
* [扫描和格式化 ](/content/essential/io/scanfor.md)：运行程序读取和写入格式化的文本
* [命令行I/O（I/O from the Command Line ）](/content/essential/io/cli.md) ：描述标准流和控制台对象
* [数据流（Data Streams）](/content/essential/io/datastreams.md)：处理原始数据类型和字符串的二进制I / O。
* [对象流（Object Streams）](/content/essential/io/objectstreams.md)：处理对象的的二进制I / O。


## 文件I/O (nio.2)
* 什么是 Path？：检查文件系统上的路径的概念。
* Path 类：介绍java.nio.file包的基础类。
* 路径操作：Path中方法操作和语法使用。
* 文件操作：介绍了许多文件I/O中通用的方法概念。
* 检查文件或目录：介绍如何检查文件的存在及其可访问性级别。
* 删除文件或目录。
* 复制文件或目录。
* 移动文件或目录。
* 管理元数据：介绍了如何读取和设置文件属性。
* 读取，写入和创建文件：介绍用于读取和写入文件的流和通道的方法。
* 随机访问文件：显示如何以非顺序方式读取或写入文件。
* 创建和读取目录：涵盖特定于目录的API，例如如何列出目录的内容。
* 链接，符号或其他：涵盖特定于符号和硬链接的问题。
* 文件树：演示如何递归地访问文件树中的每个文件和目录。
* 查找文件：演示如何使用模式匹配搜索文件。
* 监视目录变化：显示如何使用监视服务来检测在一个或多个目录中添加，删除或更新的文件。
* 其他有用的方法：涵盖了不适合课程其他地方的重要API。
* 传统文件I/O代码：演示如何使用 Path类将`java.io.File`Api过度到`java.nio.file`API。

## 总结
本章节的一个知识要点总结

## 问题和练习
通过尝试这些问题和练习来测试你在本章学到的东西


下一节，自定义网络 使用本课程中描述的I/O流来读取和写入网络连接。

安全考虑：某些I / O操作需要得到当前安全管理的批准。这些课程中包含的示例程序是独立的应用程序，默认情况下没有安全管理器。要在一个小程序中工作，这些例子中的大多数必须被修改。有关Applet的安全限制的信息，请参阅 Applet可以执行哪些操作。