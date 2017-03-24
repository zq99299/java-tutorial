# 基础I/O

本课程涵盖用于Java平台的基础`I/O` 类。它首先关注`I/O Streams`，这是一个强大的概念，可以大大简化`I/O`操作.该课程还可以看到序列化，这使得程序可以将整个对象写入流并再次读取它们。然后，该课程将查看`文件I/O`和文件系统操作，包括随机访问文件。

本`I/O Streams`大多数都是讲解针对`java.io`包。本`File I/O`大多数讲解都是针对`java.nio.file`包。

## I/O 流

* 字节流（Byte Streams）：处理原始二进制数据的`I/O`


Character Streams handle I/O of character data, automatically handling translation to and from the local character set.
Buffered Streams optimize input and output by reducing the number of calls to the native API.
Scanning and Formatting allows a program to read and write formatted text.
I/O from the Command Line describes the Standard Streams and the Console object.
Data Streams handle binary I/O of primitive data type and String values.
Object Streams handle binary I/O of objects.

## 文件I/O (nio.2)