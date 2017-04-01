# 读、写、创建文件

此页讨论阅读、写入、创建和打开文件的详细信息。有多种文件I/O方法可供选择。为了帮助理解API，下面的图通过复杂性排列文件I/O方法。
![](/assets/essential/io/io-fileiomethods.png)

最左边的常用于小文件：

* readAllBytes
* readAllLines
* write方法

其次是 用于迭代流或文本行，如方法：

* newBufferedReader
* newBufferedWriter

再其次是无缓冲流，与与java.io包兼容，如方法

* newInputStream
* newOutputStream

在其次是：
* newByteChannels - 方法
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

## 常用的小文件方法
### 从文件中读取所有字节或行

如果你有一个小的文件。你想在一个方法读取全部的内容，你可以使用
[readAllBytes(Path)](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#readAllBytes-java.nio.file.Path-)或 [readAllLines(Path, Charset)](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#readAllLines-java.nio.file.Path-java.nio.charset.Charset-)方法

这些方法可以处理大部分的工作，比如打开和关闭流，但不能处理大文件。以下代码显示如何使用该readAllBytes方法：
```java
Path file = ...;
byte[] fileArray;
fileArray = Files.readAllBytes(file);
```

### 将所有字节或行写入文件

您可以使用一种写入方式将字节或行写入文件。

* [write(Path, byte[], OpenOption...)](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#write-java.nio.file.Path-byte:A-java.nio.file.OpenOption...-)
* [write(Path, Iterable< extends CharSequence>, Charset, OpenOption...)](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#write-java.nio.file.Path-java.lang.Iterable-java.nio.charset.Charset-java.nio.file.OpenOption...-)

以下代码片段显示了如何使用write方法。
```java
Path file = ...;
byte[] buf = ...;
Files.write(file, buf);
```

## 用于文本文件的缓冲I/O方法
java.nio.file软件包支持通道I / O，它在缓冲区中移动数据，绕过一些可能的IO瓶颈。

### 使用缓冲流I / O读取文件
[ newBufferedReader(Path, Charset)](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#newBufferedReader-java.nio.file.Path-java.nio.charset.Charset-)方法打开一个文件，返回一个BufferedReader可以有效地从文件中读取文本。

以下代码片段显示了如何使用该`newBufferedReader`方法从文件中读取。文件以“US-ASCII”编码。

```java
Charset charset = Charset.forName("US-ASCII");
try (BufferedReader reader = Files.newBufferedReader(file, charset)) {
    String line = null;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException x) {
    System.err.format("IOException: %s%n", x);
}
```

### 使用缓冲流I / O编写文件
您可以使用 `newBufferedWriter(Path, Charset, OpenOption...)`方法创建一个BufferedWriter。
```java
Charset charset = Charset.forName（“US-ASCII”）;
String s = ...;
try（BufferedWriter writer = Files.newBufferedWriter（file，charset））{
    writer.write（s，0，s.length（））;
} catch（IOException x）{
    System.err.format（“IOException：％s％n”，x）;
}
```

## 无缓冲流的方法并与java.ioAPI 互操作

### 使用I / O流读取文件
要打开一个文件进行阅读，可以使用该 newInputStream(Path, OpenOption...)方法。此方法返回一个无缓冲的输入流，用于从文件读取字节。
```java
Path file = ...;
try (InputStream in = Files.newInputStream(file);
    BufferedReader reader =
      new BufferedReader(new InputStreamReader(in))) {
    String line = null;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException x) {
    System.err.println(x);
}
```

## 使用I / O流创建和写入文件
您可以使用该`newOutputStream(Path, OpenOption...)`方法创建文件，附加到文件或写入文件 。此方法打开或创建用于写入字节的文件，并返回无缓冲的输出流。

该方法采用可选`OpenOption`参数。如果没有指定打开的选项，并且该文件不存在，**将创建一个新的文件**。如果文件存在，则会被截断。此选项相当于使用`CREATE`和`TRUNCATE_EXISTING` options 来调用该方法。

以下示例打开日志文件。如果文件不存在，则创建它。如果文件存在，它将被打开以进行追加。
```java
import static java.nio.file.StandardOpenOption.*;
import java.nio.file.*;
import java.io.*;

public class LogFileTest {

  public static void main(String[] args) {

    // Convert the string to a
    // byte array.
    String s = "Hello World! ";
    byte data[] = s.getBytes();
    Path p = Paths.get("./logfile.txt");

    try (OutputStream out = new BufferedOutputStream(
      Files.newOutputStream(p, CREATE, APPEND))) {
      out.write(data, 0, data.length);
    } catch (IOException x) {
      System.err.println(x);
    }
  }
}
```