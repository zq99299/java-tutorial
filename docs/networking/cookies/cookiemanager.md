# 默认 CookieManager
cookiemanager 提供了一个 CookieHandler 的具体实现，对于大多数用户来说，它足以处理 HTTP 状态管理。
CookieManager 将 cookie 的存储与设置、接受和拒绝它们的策略分开。
CookieManager 是用 java.net.CookieStore 和 java.net.CookiePolicy 初始化的。
CookieStore 管理 cookie 的存储。CookiePolicy 对 cookie 的接受和拒绝做出决策

下面的代码展示了如何创建和设置一个系统范围的 CookieManager:

```java
java.net.CookieManager cm = new java.net.CookieManager();
java.net.CookieHandler.setDefault(cm);
```

使用默认构造函数构造 CookieManager，将使用默认 cookie 存储和接受策略创建新实例。
CookieStore 是存储任何已接受的 HTTP cookie 的地方。如果在创建时未指定，则 CookieManager 实例将使用内存实现（InMemoryCookieStore）。
此实现不是持久性的，仅在 Java 虚拟机的生命周期内存在。需要持久存储的用户必须实现自己的存储。

CookieManageris 使用的默认 cookie 策略 CookiePolicy.ACCEPT_ORIGINAL_SERVER，仅接受来自原始服务器的 cookie。
因此，Set-Cookie 服务器的响应必须设置“域”属性，并且必须与 URL 中的主机域匹配。有关更多信息，
请参阅 [java.net.HttpCookie.domainMatches](https://docs.oracle.com/javase/8/docs/api/java/net/HttpCookie.html#domainMatches-java.lang.String-java.lang.String-)。
需要不同策略的用户必须实现 CookiePolicy 接口并将其传递给 CookieManager 构造函数，
或者 CookieManager 使用 setCookiePolicy(cookiePolicy) 方法将其设置为已构造的实例。

从 cookie 存储区检索 cookie 时，CookieManager 还要执行 [RFC 2965 第 3.3.4 节中的 path 匹配规则](https://www.ietf.org/rfc/rfc2965.txt) 。
因此，cookie 还必须设置其 “path” 属性，以便在从 cookie 存储中检索 cookie 之前应用路径匹配规则。


总之，CookieManager 提供了处理 cookie 的框架，并为 CookieStore 提供了一个很好的默认实现。
CookieManager 是高度可定制的，它允许您设置自己的 CookieStore、CookiePolicy 或两者兼备。

简单说：CookieManager 根据规范提供了操作 cookie 的方法，并且允许定制 cookie 的存储和策略
