# 使用 URL
URL 是统一资源定位符(Uniform Resource Locator)首字母的缩写。它是 Internet 上资源的参考（地址）。
您可以将 URL 提供给您最喜爱的 Web 浏览器，以便它可以在 Internet 上定位文件，
就像您在信件上提供地址一样，以便邮局可以找到您的通讯记录。

与互联网交互的 Java 程序也可能使用 URL 来查找他们希望访问的 Internet 上的资源。
Java 程序可以使用 java.net 中的 [URL](https://docs.oracle.com/javase/8/docs/api/java/net/URL.html)
类来表示一个 URL 地址。

::: tip
术语 URL 可能不明确。它可以引用一个 Internet 地址或 Java 程序中的一个 URL 对象。
在 URL 的含义需要具体说明的情况下，本文使用“URL 地址”表示 Internet 地址，“ URL对象”是指 URL 程序中类的一个实例。
:::

- [什么是 URL？](./definition.md)

    一个 URL 采用了一个字符串的形式，它描述了如何在 Internet 上找到资源。
    url 有两个主要组件：访问资源和资源位置所需的协议。

- [创建一个 URL](./creatingUrls.md)

    在您的 Java 程序中，您可以创建一个表示 URL 地址的 URL 对象。
    URL 对象始终引用绝对 URL，但可以从绝对 URL，相对 URL 或 URL 组件构建。

- [解析 URL](./urlInfo.md)

    解析 URL 来查找主机名，文件名和其他信息的日子已经一去不复返了。使用有效的 URL 对象，
    您可以调用其任何访问器方法来从 URL 获取所有信息，而无需执行任何字符串解析！

- [直接从 URL 中读取](./readingURL.md)

    本节将介绍 Java 程序如何使用该 openStream() 方法从 URL 中读取数据。

- [连接到一个 URL](./connecting.md)

    如果您想要做的不仅仅是从 URL 中读取，您可以通过在 URL 上调用 `openConnection()` 来连接它。
    `openConnection()` 方法返回一个 URLConnection 对象，您可以使用它来与 URL 进行更一般的通信，
    例如读取它、写入它，或者查询它的内容和其他信息。

- [URLConnection 的读和写](./readingWriting.md)

    某些 URL（如许多连接到 cgi-bin 脚本的 URL）允许您（甚至要求您）将信息写入 URL。
    例如，搜索脚本可能需要将详细的查询数据写入 URL 才能执行搜索。本节介绍如何写入 URL 以及如何获取结果。
