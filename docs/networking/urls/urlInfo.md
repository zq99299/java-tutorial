# 解析 URL

URL 类提供了几种让您查询 URL 对象的方法。您可以使用这些方法从 URL 获得协议、权限、主机名、端口号、路径、查询、文件名和引用：

* getProtocol    返回 URL 的协议。
* getAuthority    返回 URL 的授权部分。
* getHost    返回 URL 的主机名组件。
* getPort 返回 URL 的端口号组件。

    该 getPort 方法返回一个整数，即端口号。如果端口未设置，则 getPort 返回-1。
* getPath    返回此 URL 的路径组件。
* getQuery 返回此 URL 的查询组件。
* getFile 返回 URL 的文件名组件。

    该 getFile 方法返回相同 getPath 的值，加上值的连接（getQuery 如果有的话）。
* getRef 返回 URL 的引用组件。

**注意：**
请记住，并非所有的 URL 地址都包含这些组件。URL 类提供了这些方法，因为 HTTP URL 确实包含这些组件，
并且可能是最常用的 URL。URL 类有点以 HTTP 为中心。

无论您用于创建 URL 对象的构造函数如何，您都可以使用这些方法获取有关 URL 的信息。getXXX

URL 类以及这些访问器方法使您无需再次解析 URL！给定 URL 的任何字符串规范，只需创建一个新的 URL 对象并调用任何访问器方法来获取所需的信息。
这个小示例程序根据字符串规范创建一个 URL，然后使用 URL 对象的访问器方法来解析 URL：

```java
public class ParseURL {
    public static void main(String[] args) throws Exception {

        URL aURL = new URL("http://example.com:80/docs/books/tutorial"
                                   + "/index.html?name=networking#DOWNLOADING");

        System.out.println("protocol = " + aURL.getProtocol());
        System.out.println("authority = " + aURL.getAuthority());
        System.out.println("host = " + aURL.getHost());
        System.out.println("port = " + aURL.getPort());
        System.out.println("path = " + aURL.getPath());
        System.out.println("query = " + aURL.getQuery());
        System.out.println("filename = " + aURL.getFile());
        System.out.println("ref = " + aURL.getRef());
    }
}

```

```
protocol = http
authority = example.com:80
host = example.com
port = 80
path = /docs/books/tutorial/index.html
query = name=networking
filename = /docs/books/tutorial/index.html?name=networking
ref = DOWNLOADING
```
