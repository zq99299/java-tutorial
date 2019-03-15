# 缓冲流

迄今为止我们看到的大多数示例都使用无缓冲的 I / O。这意味着每个读或写请求都由底层操作系统直接处理。
这可以使程序效率低得多，因为每个这样的请求经常触发磁盘访问，网络活动或相对昂贵的一些其他操作。

为了减少这种开销，Java 平台实现了缓冲的 I / O 流。缓冲输入流从称为缓冲区的存储区读取数据；
仅当缓冲区为空时才调用本地输入 API。类似地，缓冲输出流将数据写入缓冲区，只有当缓冲区已满时才调用本地输出 API。

程序可以使用我们已经使用过多次的包装习惯将无缓冲流转换为缓冲流，其中将无缓冲流对象传递给缓冲流类的构造函数。以下是在 CopyCharacters 示例中修改构造函数调用以使用缓冲 I / O的方法：

```java
inputStream = new BufferedReader(new FileReader("xanadu.txt"));
outputStream = new BufferedWriter(new FileWriter("characteroutput.txt"));
```

还有用于包装缓冲流 4 个缓冲流类：

* BufferedInputStream 与
* BufferedOutputStream 创建缓冲字节流，
* BufferedReader 与
* BufferedWriter 创建缓冲字符流。

## 冲洗缓冲流（Flushing Buffered Streams）

在关键点写出缓冲区通常是有意义的，而不用等待填充。这被称为 **冲洗缓冲区**。

一些缓冲输出类支持自动刷新，由可选的构造函数参数指定。当 `autoflush` 开启时，
某些关键事件会导致缓冲区被刷新。PrintWriter 对象在每次调用 println 或者 format 时，将自动冲洗缓冲区。
更多信息请查阅 [扫描和格式化](./scanfor.md) 章节

要手动刷新流，请调用其 flush 方法。flush 方法对任何输出流都有效，但除非流被缓冲，否则该方法无效。
