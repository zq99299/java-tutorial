# 字节流

程序使用**字节流**执行 8-bit 字节的输入和输出。所有字节流类都来自 `InputStream`和 `OutputStream`。

## 使用字节流

我们将探索和研究一个示例程序,它使用字节流复制,一次一个字节。
```java
public class CopyBytes {
    public static void main(String[] args) throws IOException {
        FileInputStream in = null;
        FileOutputStream out = null;

        try {
            // 需要注意在ide中，这样写是找不到resources中中文件的
            // 用常规的文件查找方式就ok
            in = new FileInputStream("xanadu.txt");
            out = new FileOutputStream("outagain.txt");
            int c;

            while ((c = in.read()) != -1) {
                out.write(c);
            }
        } finally {
            if (in != null) {
                in.close();
            }
            if (out != null) {
                out.close();
            }
        }
    }
}
```

CopyBytes将大部分时间用在读取输入流和写入输出流的简单循环中，每次一个字节，如下 图所示。
![](/assets/essential/io/byteStream.png)

Integer Variable ：一个字节是一个int数值	0 - 255。二进制一个Byte表示也是最大255

## 始终关闭流

在不再需要时关闭流非常重要。CopyBytes使用finally块来保证即使发生错误也将关闭流，这一点非常重要。这种做法有助于避免严重的资源泄漏。

一个可能的错误是CopyBytes无法打开一个或两个文件。当这种情况发生时,流变量可能为null，所以要先保证流变量不为null，才能调用关闭方法关闭流。