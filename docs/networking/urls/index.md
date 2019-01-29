# 使用URL
URL是统一资源定位符(Uniform Resource Locator)首字母的缩写。它是Internet上资源的参考（地址）。您可以将URL提供给您最喜爱的Web浏览器，以便它可以在Internet上定位文件，就像您在信件上提供地址一样，以便邮局可以找到您的通讯记录。

与互联网交互的Java程序也可能使用URL来查找他们希望访问的Internet上的资源。Java程序可以使用java.net中的 [URL ](https://docs.oracle.com/javase/8/docs/api/java/net/URL.html)类来表示一个URL地址。

> 术语注意： 
术语URL可能不明确。它可以引用一个Internet地址或Java程序中的一个URL对象。在URL的含义需要具体说明的情况下，本文使用“URL地址”表示Internet地址，“ URL对象”是指URL程序中类的一个实例。

## [什么是URL？](/content/networking/urls/definition.md)

一个URL采用了一个字符串的形式，它描述了如何在Internet上找到资源。url有两个主要组件：访问资源和资源位置所需的协议。

## [创建一个URL](/content/networking/urls/creatingUrls.md)
在您的Java程序中，您可以创建一个表示URL地址的URL对象。URL对象始终引用绝对URL，但可以从绝对URL，相对URL或URL组件构建。

## [解析URL](/content/networking/urls/urlInfo.md)
解析URL来查找主机名，文件名和其他信息的日子已经一去不复返了。使用有效的URL对象，您可以调用其任何访问器方法来从URL获取所有信息，而无需执行任何字符串解析！

## [直接从URL中读取](/content/networking/urls/readingURL.md)
本节将介绍Java程序如何使用该openStream()方法从URL中读取数据。

## [连接到一个URL](/content/networking/urls/connecting.md)

如果您想要做的不仅仅是从URL中读取，您可以通过在URL上调用`openConnection()`来连接它。`openConnection()`方法返回一个URLConnection对象，您可以使用它来与URL进行更一般的通信，例如读取它、写入它，或者查询它的内容和其他信息。

## [URLConnection的读和写](/content/networking/urls/readingWriting.md)

某些URL（如许多连接到cgi-bin脚本的URL）允许您（甚至要求您）将信息写入URL。例如，搜索脚本可能需要将详细的查询数据写入URL才能执行搜索。本节介绍如何写入URL以及如何获取结果。