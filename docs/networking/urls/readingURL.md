# 直接从 URL 中读取

您已成功建立 URL 后 ，你可以调用 URL 的 openStream() 方法来获得从中可以读取 URL 的内容流。
该 openStream() 方法返回一个 java.io.InputStream 对象，因此从 URL 读取与从输入流读取一样简单。

下面的小 Java 程序使用 openStream() 来获得 URL http://www.oracle.com/ 的输入流。
然后，它在输入流上打开一个 BufferedReader，并从 BufferedReader 中读取，从而读取 URL。
所有读取的内容都被复制到标准输出流：

```java
public class URLReader {
    public static void main(String[] args) throws Exception {
        URL oracle = new URL("https://www.oracle.com/index.html");
        BufferedReader in = new BufferedReader(
                new InputStreamReader(oracle.openStream()));

        String inputLine;
        while ((inputLine = in.readLine()) != null)
            System.out.println(inputLine);
        in.close();
    }
}
```

你可以看到输出内容为指定网址的网页信息，或者，该程序可能会挂起，或者您可能会看到异常堆栈跟踪。
如果发生后两个事件中的任何一个，您可能必须设置代理主机，以便程序可以找到 Oracle 服务器。


有一个问题需要注意：如果打开的是一个需要重定向的链接，那么不会有任何信息；
就相当于 url 不能自动处理重定向事件；比如把链接换成 “http://www.oracle.com”

## 设置代理
该路径不是该课程的内容；只是为了方便粘贴过来了；

您可以通过命令行设置代理主机。根据您的网络配置，您可能还需要设置代理端口。如有必要，请询问系统管理员网络上的代理主机名称。


```
UNIX
java -Dhttp.proxyHost=proxyhost
[-Dhttp.proxyPort=portNumber] URLReader

DOS shell (Windows 95/NT)
java -Dhttp.proxyHost=proxyhost
[-Dhttp.proxyPort=portNumber] URLReader
```
