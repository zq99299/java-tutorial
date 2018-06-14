# 读取和写入

让我们看一个简单的例子，它说明了一个程序如何使用Socket类建立到一个服务器程序的连接，然后，客户端如何通过Socket向服务器发送数据并接收数据。

EchoClient 客户端；EchoServer 服务端，使用了[rfc862  Echo Protocol](https://tools.ietf.org/html/rfc862)；所以该服务端可以为所有基于rfc862协议的客户端服务；

EchoClient ： 提供输入，并打印服务器把我们输入的返回回来的数据

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class EchoServer {
    public static void main(String[] args) throws IOException {
        args = new String[]{"9000"};
        if (args.length != 1) {
            System.err.println("Usage: java EchoServer <port number>");
            System.exit(1);
        }

        int portNumber = Integer.parseInt(args[0]);

        try (
                ServerSocket serverSocket =
                        new ServerSocket(Integer.parseInt(args[0]));
                Socket clientSocket = serverSocket.accept();
                PrintWriter out =
                        new PrintWriter(clientSocket.getOutputStream(), true);
                BufferedReader in = new BufferedReader(
                        new InputStreamReader(clientSocket.getInputStream()));
        ) {
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                out.println(inputLine);
            }
        } catch (IOException e) {
            System.out.println("Exception caught when trying to listen on port "
                                       + portNumber + " or listening for a connection");
            System.out.println(e.getMessage());
        }
    }
}
```

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;

public class EchoClient {
    public static void main(String[] args) throws IOException {
        args = new String[]{"localhost", "9000"};
        if (args.length != 2) {
            System.err.println(
                    "Usage: java EchoClient <host name> <port number>");
            System.exit(1);
        }

        String hostName = args[0];
        int portNumber = Integer.parseInt(args[1]);

        try (
                Socket echoSocket = new Socket(hostName, portNumber);
                PrintWriter out =
                        new PrintWriter(echoSocket.getOutputStream(), true);
                BufferedReader in =
                        new BufferedReader(
                                new InputStreamReader(echoSocket.getInputStream()));
                BufferedReader stdIn =
                        new BufferedReader(
                                new InputStreamReader(System.in))
        ) {
            String userInput;
            while ((userInput = stdIn.readLine()) != null) {
                out.println(userInput);
                System.out.println("echo: " + in.readLine());
            }
        } catch (UnknownHostException e) {
            System.err.println("Don't know about host " + hostName);
            System.exit(1);
        } catch (IOException e) {
            System.err.println("Couldn't get I/O for the connection to " +
                                       hostName);
            System.exit(1);
        }
    }
}
```

代码很简单，就不啰嗦的翻译了；

这个客户端程序非常简单，因为echo服务器实现了一个简单的协议。客户端将文本发送到服务器，服务器将其回送。当您的客户端程序正在与更复杂的服务器（如HTTP服务器）交谈时，您的客户端程序也将更加复杂。然而，基础知识与他们在这个程序中的基本相同：

1. 打开一个socket。
2. 打开输入流并输出流到socket。
3. 根据服务器的协议读取和写入流。
4. 关闭流。
5. 关闭socket。

只有第3步因客户端而异，取决于服务器。其他步骤基本保持不变。