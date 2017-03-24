# 字符流

Java平台使用`Unicode`约定存储字符值。字符流`I / O`自动将此内部格式转换为本地字符集。在西方语言环境中，本地字符集通常是ASCII的8位超集。

对于大多数应用，具有字符流的`I / O`并不比具有字节流的`I / O`复杂。使用流类完成的输入和输出自动转换到本地字符集和从本地字符集转换。使用字符流代替字节流的程序自动适应本地字符集，并准备好进行国际化 - 所有这些都不需要编程人员的额外努力。

如果国际化不是一个优先事项，您可以简单地使用字符流类，而不需要重视字符集问题。后来，如果国际化成为优先事项，您的程序可以进行调整，无需广泛的重新编码。有关更多信息，请参阅国际化章节。

## 使用字符流

所有字符流类都来自 `Reader`和 `Writer`。与字节流一样，有专门用于文件`I / O`的字符流类： `FileReader`和 `FileWriter`。这个 `CopyCharacters`例子说明了这些类。

```java
public class CopyCharacters {
    public static void main(String[] args) throws IOException {

        FileReader inputStream = null;
        FileWriter outputStream = null;

        try {
            inputStream = new FileReader("xanadu.txt");
            outputStream = new FileWriter("characteroutput.txt");

            int c;
            while ((c = inputStream.read()) != -1) {
                outputStream.write(c);
            }
        } finally {
            if (inputStream != null) {
                inputStream.close();
            }
            if (outputStream != null) {
                outputStream.close();
            }
        }
    }
}
```
`CopyCharacters`非常相似`CopyBytes`。
最重要的区别是`CopyCharacters`用途`FileReader`和`FileWriter`输入和输出代替`FileInputStream`和`FileOutputStream`。
注意两者`CopyBytes`和`CopyCharacters`使用一个int变量读取和写入。然而，
在`CopyCharacters`该int变量中，该变量保存其最后16位中的字符值;
在`CopyBytes`，int变量byte在其最后8位中保存一个值。

## 使用字节流的字符流

字符流通常是字节流的“包装器”。字符流使用字节流来执行物理I / O，而字符流处理字符和字节之间的转换，例如：FileReader 使用 FileInputStream，FileWriter使用FileOutputStream。

有两个通用的字节到字符“桥”流， InputStreamReader和 OutputStreamWriter。当没有满足您需求的预包装字符流类时，可以使用它们来创建字符流。在网络传输中，sockets展示了如何创建从套接字类提供的字节流的字符流。

## 面向行的I/O

字符I / O通常发生在比单个字符更大的单位中。一个常见的单位是行：一个字符串，在末尾有一个行终止符。线路终端器可以是回车/换行顺序（"\r\n"），单个回车（"\r"）或单行换行（"\n"）。支持所有可能的线路终端器允许程序读取在任何广泛使用的操作系统上创建的文本文件。

我们来修改CopyCharacters示例来使用面向行的I / O。要做到这一点，我们必须用我们以前没有见过两个类， BufferedReader和 PrintWriter。我们将在缓冲I / O和格式化中更深入地探索这些类。现在，我们只是对他们对面向行的I / O的简单介绍

 CopyLines示例调用BufferedReader.readLine并且PrintWriter.println一次输入和输出一行。
 
```java
 public class CopyLines {
    public static void main(String[] args) throws IOException {

        BufferedReader inputStream = null;
        PrintWriter outputStream = null;

        try {
            inputStream = new BufferedReader(new FileReader("xanadu.txt"));
            outputStream = new PrintWriter(new FileWriter("characteroutput.txt"));

            String l;
            while ((l = inputStream.readLine()) != null) {
                outputStream.println(l);
            }
        } finally {
            if (inputStream != null) {
                inputStream.close();
            }
            if (outputStream != null) {
                outputStream.close();
            }
        }
    }
}
```

调用readLine返回一行文本。CopyLines输出每行使用println，其附加用于当前操作系统的行终止符。这可能与输入文件中使用的行终止符不同。

有很多方法来实现文字输入输出一行的功能。有关信息，请参阅 扫描和格式化。
