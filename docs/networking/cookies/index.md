# 使用 Cookie
虽然您可能已经熟悉 cookie，但可能不知道如何在 Java 应用程序中利用它们。
本课程将指导您了解 cookie 的概念，并解释如何设置 cookie 处理程序，以便您的 HTTP URL 连接将使用它

Java SE 为此功能提供了一个主要的类实现该此功能  java.net.CookieHandler，以及支持的类和接口
 java.net.CookieManager、java.net.CookiePolicy、java.net.CookieStore 和 java.net.HttpCookie

- [使用 Cookie 进行 HTTP 状态管理](./definition.md)

    此页面描述了 cookie 并说明了它们如何用于提供会话。

- [CookieHandler 回调机制](./cookiehandler.md)

    此页面说明了访问网站时如何调用 cookie 处理程序以及如何设置 cookie 处理程序。

- [默认 CookieManager](./cookiemanager.md)

    Java SE 提供了一个默认的 cookie 处理程序实现，在大多数情况下都足够并且可以高度自定义。

- [自定义 CookieManager](./custom.md)

    以下是一些如何自定义 cookie 策略并编写自己的 cookie 存储库的示例。
