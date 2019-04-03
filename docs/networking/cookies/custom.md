# 自定义 CookieManager
CookieManager 类的两个方面可以定制：CookiePolicy 和 CookieStore。

## CookiePolicy
为了方便起见，CookiePolicy 为接受 cookie 定义了以下预定义策略:

- CookiePolicy.ACCEPT_ORIGINAL_SERVER 仅接受来自原始服务器的 cookie。
- CookiePolicy.ACCEPT_ALL 接受所有 cookies。
- CookiePolicy.ACCEPT_NONE 不接受任何 cookie。

另外你可以实现 CookiePolicy 的 shouldAccept 方法，来构造自己的策略，并通过
CookieManager 的构造函数或者 setCookiePolicy(cookiePolicy) 方法来使用自己的策略

以下示例演示了在 ACCEPT_ORIGINAL_SERVER 策略之前拒绝黑名单主机的 cookie 自定义策略

```java
package cn.mrcode.newstudy.javasetutorial.networking.cookies;

import java.net.CookiePolicy;
import java.net.HttpCookie;
import java.net.InetAddress;
import java.net.URI;
import java.net.UnknownHostException;

public class BlacklistCookiePolicy implements CookiePolicy {
    String[] blacklist;

    public BlacklistCookiePolicy(String[] list) {
        blacklist = list;
    }

    public boolean shouldAccept(URI uri, HttpCookie cookie) {
        String host;
        try {
            host = InetAddress.getByName(uri.getHost()).getCanonicalHostName();
        } catch (UnknownHostException e) {
            host = uri.getHost();
        }

        for (int i = 0; i < blacklist.length; i++) {
            if (HttpCookie.domainMatches(blacklist[i], host)) {
                return false;
            }
        }
        // 自己逻辑处理完成之后，再使用 ACCEPT_ORIGINAL_SERVER 策略来过滤
        return CookiePolicy.ACCEPT_ORIGINAL_SERVER.shouldAccept(uri, cookie);
    }
}

```

以下方式传递了一个黑名单列表

```java
String[] list = new String[]{".example.com"};
CookieManager cm = new CookieManager(null, new BlacklistCookiePolicy(list));
CookieHandler.setDefault(cm);
```
被拒绝的地址如下：

- host.example.com
- domain.example.com

被放行的如下：

- example.com
- example.org
- myhost.example.org

## CookieStore
CookieStore 是一个表示 cookie 存储区域的接口。
CookieManager 为每个 HTTP 响应添加 cookie，
并为每个 HTTP 请求检索 cookie 存储到 CookieStore 中。

您可以实现这个接口来提供您自己的 CookieStore，并在创建期间将其传递给 CookieManager。
在创建 CookieManager 实例之后，不能设置 CookieStore。但是，您可以通过调用 CookieManager.getCookieStore() 获得对 CookieStore 的引用。
这样做很有用，因为它使您能够利用 Java SE 提供的默认内存 CookieStore 实现并补充其功能。

例如，您可能想要创建一个持久的 cookie 存储，它将保存 cookie，以便即使重新启动 Java 虚拟机也可以使用它们。
您的实现将类似于以下工作:

- 任何之前保存的 cookie 都将被读入。
- 在运行期间，将从内存中存储和检索 cookie。
- 退出之前，cookie 被写到持久存储中。

下面例子向您展示了如何利用 Java SE 默认内存中 CookieStore，以及如何扩展它的功能。

```java
import java.net.CookieManager;
import java.net.CookieStore;
import java.net.HttpCookie;
import java.net.URI;
import java.util.List;

/**
 * @author zhuqiang
 * @date 2019/4/3 16:51
 */
public class PersistentCookieStore implements CookieStore, Runnable {
    CookieStore store;

    public PersistentCookieStore() {
        // 获取默认的 内存 CookieStore
        store = new CookieManager().getCookieStore();

        // todo: 你可以从持久层中读取 cookie
        // 并添加到内存中
        // 如 store.add(xx,xx);

        // 添加一个钩子，当系统正常退出的时候可以写出到持久层中
        Runtime.getRuntime().addShutdownHook(new Thread(this));
    }

    @Override
    public void run() {
        // todo: 将存储中的 cookie 写入持久存储
    }

    public void add(URI uri, HttpCookie cookie) {
        store.add(uri, cookie);
    }

    @Override
    public List<HttpCookie> get(URI uri) {
        return store.get(uri);
    }

    @Override
    public List<HttpCookie> getCookies() {
        return store.getCookies();
    }

    @Override
    public List<URI> getURIs() {
        return store.getURIs();
    }

    @Override
    public boolean remove(URI uri, HttpCookie cookie) {
        return store.remove(uri, cookie);
    }

    @Override
    public boolean removeAll() {
        return store.removeAll();
    }
}
```

上述程序在持久层读取地方做了注释，但是没有实现，提供了思路，其他的委托了默认的内存存储 InMemoryCookieStore
