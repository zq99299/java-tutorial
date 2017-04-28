# 随机访问文件

**随机存取文件**允许非随机，或随机访问文件的内容。随机访问一个文件，打开文件，寻找一个特定的位置，并读取或写入文件。

该功能可以通过 `SeekableByteChannel`接口进行。`SeekableByteChannel`接口扩展 `channel I/O`与当前位置的概念。方法使您能够设置或查询位置，然后可以从该位置读取数据或将数据写入该位置。API由几个易于使用的方法组成：

* position - 返回通道的当前位置
* position(long) - 设置通道的位置
* read(ByteBuffer) - 从通道读入缓冲区中的字节
* write(ByteBuffer) - 将字节从缓冲区写入通道
* truncate(long) - 截断文件（或其他实体）链接的通道

[读取和写入文件使用通道I / O中](/content/essential/io/file.md)说道：`Path.newByteChannel`方法返回a的一个实例`SeekableByteChannel`。在默认文件系统上，您可以按原样使用该通道，也可以将其转换为 `FileChannel`允许访问更高级的功能，例如将文件的一个区域直接映射到内存中，以便更快的访问，锁定文件的一个区域，或从绝对位置读取和写入字节，而不影响通道的当前位置。

以下代码片段通过使用其中一种`newByteChannel`方法打开一个用于读取和写入的文件。将返回的`SeekableByteChannel`强制转换为`FileChannel`。
然后，从文件的开始读取12个字节，字符串是“123456"。在文件头头开始添加14个字节，在文件末尾增加14个字节

```java
 // 把这一句文字包装成 buffer
        String s = "I was here14!\n";
        byte data[] = s.getBytes();
        ByteBuffer out = ByteBuffer.wrap(data);

        // 开辟一个12字节的buffer对象用来存储从文件读取的内容
        /**
         * 有以下三个最主要的参数
         * int pos : 当前buffer指针所在的位置
         * int lim ：当次有多少内容
         * int cap : 当前buffer的存储能力是多少
         */
        ByteBuffer copy = ByteBuffer.allocate(12);

        // 文本文件中的内容为20个数字：12345678901234567890
        Path file = Paths.get("src/test/resources/test.txt");
        try (FileChannel fc = (FileChannel.open(file, StandardOpenOption.READ, StandardOpenOption.WRITE))) {
            System.out.println("file.size=" + fc.size()); // 20
            int nread = fc.read(copy); // 读取内容到buffer中，并且返回读到的字节数,这里由于内容足够，就一次性读到了12个字节

            // 启用随机访问的能力，把指针定位到文件的开头
            fc.position(0);
            // 如果该buffer有值（也就是pos ！= lim )
            while (out.hasRemaining()) {
                fc.write(out); // 把指定内容写入到文件中
            }
            // 20，因为写入的s这句话byte也是14字节，把源文件从0-14的字节覆盖了
            System.out.println("file.size=" + fc.size());
            // 上面读取了字节后，这里还原一下，这样再次执行out.hasRemaining()就还有内容了
            // 因为还要在文件末尾写入这一句话
            out.rewind();
            fc.position(fc.size()); // 把位置定位到文件最后
            while (out.hasRemaining()) {
                fc.write(ByteBuffer.wrap("\n".getBytes()));
                fc.write(out);
            }
        } catch (IOException x) {
            System.out.println("I/O Exception: " + x);
        }
    }
```
执行之后的结果对比：
```java
------------ 执行之前文件中的文本内容 ----------------
12345678901234567890


------------ 执行之后文件中的文本内容 ----------------
I was here14!
567890
I was here14!
```

我们来分析下这个结果：
```
    12345678901234 的字符消失了。怎么消失的呢？
1. "12345678901234" 这一串字符串的byte字节数 = 14.
2. "I was here14!\n" 这一串字符串的byte字节数 = 14. 

可以得到结果增加的内容是覆盖相应的字节长度，并不是我们正常世界中理解的是“增加”。也就能理解两次打印的文件长度都是一样的了。
```

该示例用到的相关类有以下几个：
1. FileChannel 
2. ByteBuffer 

最难懂的就是ByteBuffer 的使用，各种移动position的api需要慢慢领悟其设计意图。
FileChannel 也是移动position来支持随机访问文件内容的。

总的来说，太偏向底层了，比较难掌握和理解
    