# CookieHandler 回调机制
HTTP 状态管理是通过 Java .net. cookiehandler 类在 Java SE 中实现的。
CookieHandler 对象提供回调机制，以在 HTTP 协议处理程序中提供 HTTP 状态管理策略实现。
也就是说，使用 HTTP 作为协议的 URL，例如 new URL(“http://example.com”)，将使用 HTTP 协议处理程序。
这个协议处理程序调用 CookieHandler 对象(如果设置了)来处理状态管理。

CookieHandler 类是一个抽象类，它有两对相关的方法。第一对 getDefault() 和 setDefault(cookieHandler) 是静态方法，
它们使您能够发现当前安装的处理程序并安装自己的处理程序。

没有安装默认的处理程序，并且安装处理程序是在系统范围内完成的。对于在安全环境中运行的应用程序，
即安装了安全管理器，您必须具有获取和设置处理程序的特殊权限。有关更多信息，请参见 [java.net.CookieHandler.getDefault](https://docs.oracle.com/javase/8/docs/api/java/net/CookieHandler.html#getDefault--)。


第二对相关方法 put(uri,responseHeaders) 和 get(uri,requestheader) 使您能够分别为
响应/请求标头中的指定 uri 在 cookie 缓存中设置和获取所有适用的 cookie。
这些方法是抽象的，CookieHandler 的具体实现必须提供实现。

Java Web Start 和 Java 插件都安装了缺省的 CookieHandler。但是，如果您正在运行一个独立的应用程序，
并且希望启用 HTTP 状态管理，则必须设置一个系统范围的处理程序。本课接下来的两页将向您展示如何做到这一点。
