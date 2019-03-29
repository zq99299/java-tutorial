# URLConnection 的读和写
URLConnection 类包含了许多方法，让你的 URL 在网络上通信。URLConnection 是一个以 HTTP 为中心的类;
也就是说，只有在使用 HTTP URL 时，其许多方法才有用。但是，大多数 URL 协议允许您读取和写入连接。
本节介绍这两个功能。

## 从 URLConnection 读取
以下面的程序执行与 [直接从 URL 读取的 URLReader 程序](./readingURL.md) 是相同的功能。

然而，这个程序并不是直接从 URL 获取输入流，而是显式地检索 URLConnection 对象，并从连接获得一个输入流，
通过调用 getInputStream 隐式打开连接。然后，就像 URLReader 一样，这个程序在输入流上创建一个
BufferedReader，并从中读取。

```java
import java.net.*;
import java.io.*;

public class URLConnectionReader {
    public static void main(String[] args) throws Exception {
        URL oracle = new URL("http://www.oracle.com/");
        URLConnection yc = oracle.openConnection();
        BufferedReader in = new BufferedReader(new InputStreamReader(
                                    yc.getInputStream()));
        String inputLine;
        while ((inputLine = in.readLine()) != null)
            System.out.println(inputLine);
        in.close();
    }
}
```

该程序的输出与直接从 URL 打开流的程序的输出相同。您可以使用任何一种方式从 URL 中读取数据。
但是，从 URLConnection 而不是直接从 URL 读取可能会更有用。这是因为您可以同时将该 URLConnection 对象用于其他任务（如写入 URL）。

同样，如果程序挂起或者您看到错误消息，则可能必须设置代理主机，以便程序可以找到 Oracle 服务器。

可以看到上面的程序并没有调用 `.connect()` 而是通过 yc.getInputStream() 隐式的链接的

## URLConnection 写

许多 HTML 页面包含表单 - 文本字段和其他 GUI 对象，可让您输入数据以发送到服务器。
在输入所需信息并单击按钮启动查询后，Web 浏览器将数据写入网络上的 URL。在另一端，
服务器接收数据并对其进行处理，然后向您发送响应，通常采用新的 HTML 页面的形式。

这些 HTML 表单中的很多都使用 HTTP POST METHOD 将数据发送到服务器。因此写入 URL 通常称为 post 到 URL。
服务器识别 POST 请求并读取从客户端发送的数据。

要使 Java 程序与服务器端进程交互，它必须能够写入 URL，从而向服务器提供数据。它可以通过执行以下步骤来完成此操作：

1. 创建一个 URL。
2. 获取 URLConnection 对象。
3. 设置 URLConnection 输出功能。
4. 打开资源的连接。
5. 从连接中获取输出流。
6. 写入输出流。
7. 关闭输出流。

这是一个小 servlet 命名 （或者如果你喜欢 cgi-bin 脚本）。您可以使用此 servlet 来测试以下示例程序。
ReverseServlet

运行在容器中的 servlet 从它的 InputStream 中读取数据，反转字符串，并将其写入其 OutputStream。
该 servlet 需要输入表单 string=string_to_reverse，其中 string_to_reverse 是要按相反顺序显示其字符的字符串。


```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

public class Reverse {
    public static void main(String[] args) throws Exception {
        if (args.length != 2) {
            System.err.println("Usage:  java Reverse "
                                       + "http://<location of your servlet/script>"
                                       + " string_to_reverse");
            System.exit(1);
        }

        String stringToReverse = URLEncoder.encode(args[1], "UTF-8");

        URL url = new URL(args[0]);
        URLConnection connection = url.openConnection();
        connection.setDoOutput(true);

        OutputStreamWriter out = new OutputStreamWriter(
                connection.getOutputStream());
        out.write("string=" + stringToReverse);
        out.close();

        BufferedReader in = new BufferedReader(
                new InputStreamReader(
                        connection.getInputStream()));
        String decodedString;
        while ((decodedString = in.readLine()) != null) {
            System.out.println(decodedString);
        }
        in.close();
    }
}
```

扩展应用：模拟登陆和带 cookie 发送数据
```java
   CookieManager manager = new CookieManager();
    //设置cookie策略，只接受与你对话服务器的cookie，而不接收Internet上其它服务器发送的cookie
    manager.setCookiePolicy(CookiePolicy.ACCEPT_ORIGINAL_SERVER);
    CookieHandler.setDefault(manager);

    // 登录
    URL root = new URL("http://localhost:9114");
    URL signin = new URL(root, "/api/account/signin");
    URLConnection signinConnection = signin.openConnection();
    signinConnection.setDoOutput(true);
    OutputStreamWriter out = new OutputStreamWriter(
            signinConnection.getOutputStream());
    out.write("account=mrcode&pwd=123456");
    out.close();
    // 根据测试 好像在调用了获取输入流的时候 请求才发出去的？
    BufferedReader in = new BufferedReader(
            new InputStreamReader(
                    signinConnection.getInputStream()));
    String decodedString;
    while ((decodedString = in.readLine()) != null) {
        System.out.println(decodedString);
    }
    in.close();

    // 使用了CookieManager之后，这个再获取的时候就获取不到值了
//        String cookie = signinConnection.getHeaderField("Set-Cookie");
//        System.out.println(cookie);
    URL ugdDetail = new URL(root, "/api/ugd/20");
    URLConnection ugdDetailConnection = ugdDetail.openConnection();
//        ugdDetailConnection.addRequestProperty("Cookie", cookie.split(";")[0].trim());
    BufferedReader ugdDetailIn = new BufferedReader(
            new InputStreamReader(
                    ugdDetail.openStream()));
    String ugdDetailDecodedString;
    while ((ugdDetailDecodedString = ugdDetailIn.readLine()) != null) {
        System.out.println(ugdDetailDecodedString);
    }
```
