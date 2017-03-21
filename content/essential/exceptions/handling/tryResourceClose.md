# try-with-resources

在块中可以声明一个或多个资源。程序完成后，会自动释放该资源。实现了`java.lang.AutoCloseable`（包括实现的所有对象`java.io.Closeable`）可以用来声明。

```java
static String readFirstLineFromFile(String path) throws IOException {
    try (BufferedReader br =
                   new BufferedReader(new FileReader(path))) {
        return br.readLine();
    }
}
```