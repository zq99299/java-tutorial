# 解析URL

URL类提供了几种让您查询URL对象的方法。您可以使用这些方法从URL获得协议、权限、主机名、端口号、路径、查询、文件名和引用：

* getProtocol    返回URL的协议。
* getAuthority    返回URL的授权部分。
* getHost    返回URL的主机名组件。
* getPort 

    返回URL的端口号组件。该getPort方法返回一个整数，即端口号。如果端口未设置，则getPort返回-1。
* getPath    返回此URL的路径组件。
* getQuery 返回此URL的查询组件。
* getFile 返回URL的文件名组件。该getFile方法返回相同getPath的值，加上值的连接（getQuery如果有的话）。
* getRef 返回URL的引用组件。

**注意：** 
请记住，并非所有的URL地址都包含这些组件。URL类提供了这些方法，因为HTTP URL确实包含这些组件，并且可能是最常用的URL。URL类有点以HTTP为中心。

无论您用于创建URL对象的构造函数如何，您都可以使用这些方法获取有关URL的信息。getXXX

URL类以及这些访问器方法使您无需再次解析URL！给定URL的任何字符串规范，只需创建一个新的URL对象并调用任何访问器方法来获取所需的信息。这个小示例程序根据字符串规范创建一个URL，然后使用URL对象的访问器方法来解析URL：

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