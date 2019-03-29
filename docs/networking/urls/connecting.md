# 连接到一个 URL

成功创建 URL 对象后，可以调用 URL 对象的 openConnection 方法来获取 URLConnection 对象或其协议特定的子类之一，
例如 java.net.HttpURLConnection

您可以使用此 URLConnection 对象来设置连接前可能需要的参数和常规请求属性。
只有在 URLConnection.connect 调用该方法时才会启动到由 URL 表示的远程对象的连接。
当你这样做时，你正在通过网络初始化 Java 程序和 URL 之间的通信链接。例如，以下代码打开到该站点的连接 example.com：

```java
try {
    URL myURL = new URL("http://example.com/");
    URLConnection myURLConnection = myURL.openConnection();
    myURLConnection.connect();
} catch (MalformedURLException e) {
    // new URL() failed
    // ...
} catch (IOException e) {
    // openConnection() failed
    // ...
}
```

URLConnection 每次通过调用 openConnection 此 URL 的协议处理程序的方法创建一个新对象。

您并不总是需要显式调用该 connect 方法来启动连接。如果需要，取决于连接的操作（如 getInputStream，getOutputStream 等）将隐式执行连接。

既然已经成功地连接到您的 URL，您可以使用 URLConnection 对象来执行诸如读取或写入连接之类的操作。
下一节将向您展示如何操作。
