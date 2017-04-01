# 读、写、创建文件

此页讨论阅读、写入、创建和打开文件的详细信息。有多种文件I/O方法可供选择。为了帮助理解API，下面的图通过复杂性排列文件I/O方法。
![](/assets/essential/io/io-fileiomethods.png)

最左边的常用于小文件：

* readAllBytes
* readAllLines
* write方法

其次是 用于迭代流或文本行，如：

* BufferedReader
* BufferedWriter

再其次是无缓冲流，与与java.io包兼容

* InputStream
* OutputStream

在其次是：
* ByteChannels
* SeekableByteChannels
* ByteBuffers
* ByteChannel

最后，最右边是FileChannel用于需要文件锁定或内存映射I / O的高级应用程序的方法。

！这一节感觉很难哇。通道什么的都没有怎么接触过。

**注意： ** 创建新文件的方法使您能够为文件指定一组可选的初始属性。例如，在支持POSIX标准集（如UNIX）的文件系统上，您可以在创建文件时指定文件所有者，组所有者或文件权限。“ [管理元数据](/content/essential/io/fileAttr.md)”介绍文件属性，以及如何访问和设置它们。

本节包含以下主题：

* OpenOptions参数
* 常用的小文件方法
* 用于文本文件的缓冲I/O方法
* 无缓冲流的方法并与java.io，API 互操作（包装缓冲流）
* 通道和ByteBuffers
* 创建常规和临时文件的方法

## OpenOptions参数
本节中的几个方法采用可选OpenOptions参数。此参数是可选的，API会告诉您，当没有指定时，该方法的默认行为是什么。

支持以下StandardOpenOptions枚举：

* **WRITE** – 打开文件写入访问
* **APPEND** – 将新数据追加到文件末尾。此选项与WRITE或CREATE选项一起使用。
* **TRUNCATE_EXISTING** – 将文件截断为零字节。该选项与WRITE选项一起使用
* **CREATE_NEW** – 创建一个新文件，如果该文件已经存在，则会引发异常。
* **CREATE **– 打开该文件（如果存在）或创建一个新的文件（如果没有）。
* **DELETE_ON_CLOSE** – 流关闭时删除文件。此选项对临时文件很有用。
* **SPARSE **– 提示新创建的文件将是稀疏的。这种高级选项在某些文件系统（如NTFS）上得到了遵守，其中具有数据“间隙”的大型文件可以以更有效的方式存储，这些空白间隔不会占用磁盘空间。
* **SYNC** – 保留与底层存储设备同步的文件（内容和元数据）。
* **DSYNC** – 保持与底层存储设备同步的文件内容。
