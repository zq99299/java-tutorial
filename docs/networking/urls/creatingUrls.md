# 创建一个URL
创建URL对象最简单的方法就是用一个人类可读形式的字符串来创建；

```
URL myURL = new URL("http://example.com/");
```

上面创建的URL对象代表一个绝对URL。一个绝对的URL包含了到达问题资源所必需的所有信息。您还可以从相对URL地址创建URL对象。

## 创建相对URL
相对URL只包含足够的信息来访问相对于另一个URL（或在其上下文中）的资源。

相对URL规范通常在HTML文件中使用。例如，假设您编写了一个名为JoesHomePage.html的HTML文件。在这个页面中 PicturesOfMe.html和MyKids.html是指向其他页面的链接，并且位于同一台计算机上，并位于同一目录中

```html
<a href="PicturesOfMe.html">Pictures of Me</a>
<a href="MyKids.html">Pictures of My Kids</a>
```

这些URL地址是相对URL。也就是说，这些url是相对于它们被包含的文件指定的——JoesHomePage.html。

在您的Java程序中，您可以根据相对URL规范创建URL对象。例如，假设您知道网站上有两个网址example.com：

```
http://example.com/pages/page1.html
http://example.com/pages/page2.html
```
你可以基于公共基础对象 URL: http://example.com/pages/ ；来创建另外两个相对URL对象

```
URL myURL = new URL("http://example.com/pages/");
URL page1URL = new URL(myURL, "page1.html");
URL page2URL = new URL(myURL, "page2.html");
```

这个代码片段使用URL构造器，它允许您从另一个URL对象（基础）和一个相对URL规范创建一个URL对象。这个构造函数的一般形式是：

```java
URL(URL baseURL, String relativeURL)
```

如果baseURL为null，那么这个构造函数relativeURL就像一个绝对的URL规范。相反，如果relativeURL是绝对URL规范，那么构造函数会忽略baseURL。

这个构造函数对于在一个文件中创建命名锚（也称为引用）的URL对象也很有用。例如，假设page1.html文件在文件的底部有一个名为BOTTOM的命名锚。您可以使用相对URL构造器来为它创建一个URL对象：

```java
URL page1BottomURL = new URL(page1URL,"#BOTTOM");
```

## 其他URL构造函数

URL类为创建URL对象提供了两个额外的构造函数。当您使用URL时，这些构造函数是有用的，例如HTTP URL，它们在URL的资源名称部分有主机名、文件名、端口号和引用组件。当您没有包含完整URL规范的字符串时，这两个构造函数是有用的，但是您确实知道URL的各种组件。

```java
new URL("http", "example.com", "/pages/page1.html");
```
这相当于
```java
new URL("http://example.com/pages/page1.html");
```

第一个参数是协议，第二个参数是主机名，最后一个是文件的路径名。请注意，文件名在开始处包含正斜杠。这表明文件名是从主机的根目录指定的。

最后的URL构造函数将端口号添加到前面构造函数中使用的参数列表中：

```java
URL gamelan = new URL("http", "example.com", 80, "pages/page1.html"); 
```

这会创建一个以下的网址

```
http://example.com:80/pages/page1.html
```

如果您使用这些构造函数之一构造一个URL对象，您可以通过使用URL对象的`toString`方法或等效的`toExternalForm` 方法来获得包含完整URL地址的字符串。


## 具有特殊字符的网址

某些URL地址包含特殊字符，例如空格字符：

```
http://example.com/hello world/
```

为了使这些字符合法，在将它们传递给URL构造函数之前，需要对它们进行编码。

```
URL url = new URL("http://example.com/hello%20world");
```

在这个例子中对特殊字符进行编码很简单，因为只有一个字符需要编码，但对于有几个这些字符的URL地址，或者如果在编写代码时不确定哪些URL地址需要访问，您可以使用java.net.URI该类的多参数构造函数 来为您自动处理编码。

```java
URI uri = new URI("http", "example.com", "/hello world/", "");
```

然后将URI转换为URL。

```java
URL url = uri.toURL();
```

## MalformedURLException

如果对构造函数的参数引用null或未知协议，那么四个URL构造函数中的每一个都会抛出一个MalformedURLException异常。通常，您希望通过在tr/catch对子中嵌入URL构造器语句来捕获和处理这个异常，如下所述：

```java
try {
    URL myURL = new URL(...);
} 
catch (MalformedURLException e) {
    // exception handler code here
    // ...
}
```

有关处理异常的信息，请参阅 [异常](/content/essential/exceptions/README.md)。

> 注意： 
URLs是“一次写入”对象。创建URL对象后，您不能更改其任何属性（协议，主机名，文件名或端口号）。