# 缓冲流

迄今为止我们看到的大多数示例都使用无缓冲的 I / O。这意味着每个读或写请求都由底层操作系统直接处理。这可以使程序效率低得多，因为每个这样的请求经常触发磁盘访问，网络活动或相对昂贵的一些其他操作。

为了减少这种开销，Java平台实现了缓冲的 I / O流。缓冲输入流从称为缓冲区的存储区读取数据; 仅当缓冲区为空时才调用本地输入API。类似地，缓冲输出流将数据写入缓冲区，只有当缓冲区已满时才调用本地输出API。

程序可以使用我们已经使用过多次的包装习惯将无缓冲流转换为缓冲流，其中将无缓冲流对象传递给缓冲流类的构造函数。以下是在CopyCharacters示例中修改构造函数调用以使用缓冲I / O的方法：
```java
inputStream = new BufferedReader(new FileReader("xanadu.txt"));
outputStream = new BufferedWriter(new FileWriter("characteroutput.txt"));
```

还有用于包装缓冲流4个缓冲流类：
* BufferedInputStream 与 
* BufferedOutputStream 创建缓冲字节流，
* BufferedReader 与 
* BufferedWriter 创建缓冲字符流。