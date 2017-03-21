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

在该示例中生命的资源是`BufferedReader`,声明语句出现在try后的括号中。`BufferedReader`在jdk7+实现了`java.lang.AutoCloseable`接口。因此可以在`try-with-resource`语句中声明，无论try语句是正常完成还是意外完成（BufferedReader.readLine抛出IOException），它都将被关闭。

在jdk7之前，可以使用finally块来确保资源是否关闭。
在finally块来确保资源是否关闭的话。try块中出现异常会被抛出，并需要你捕获。而使用`try-with-resource`语句，则异常会被抑制。在JDK7+版本中，可以检索抑制异常。请参阅“禁止异常”一节。