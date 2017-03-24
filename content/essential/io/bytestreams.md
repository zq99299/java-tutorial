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