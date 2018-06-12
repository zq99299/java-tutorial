# URLConnection的读和写
URLConnection类包含了许多方法，让你的URL在网络上通信。URLConnection是一个以HTTP为中心的类; 也就是说，只有在使用HTTP URL时，其许多方法才有用。但是，大多数URL协议允许您读取和写入连接。本节介绍这两个功能。

## 从URLConnection读取
以下面的程序执行与[直接从URL读取的URLReader程序](/content/networking/urls/readingURL.md)相同的功能。

然而，这个程序并不是直接从URL获取输入流,而是显式地检索URLConnection对象，并从连接获得一个输入流,通过调用getInputStream隐式打开连接。然后，就像URLReader一样，这个程序在输入流上创建一个BufferedReader，并从中读取。

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

该程序的输出与直接从URL打开流的程序的输出相同。您可以使用任何一种方式从URL中读取数据。但是，从URLConnection而不是直接从URL读取可能会更有用。这是因为您可以同时将该URLConnection对象用于其他任务（如写入URL）。

同样，如果程序挂起或者您看到错误消息，则可能必须设置代理主机，以便程序可以找到Oracle服务器。

可以看到上面的程序并没有调用`.connect()` 而是通过yc.getInputStream()隐式的链接的