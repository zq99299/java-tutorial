# 编写服务器端

本节将向您展示如何编写一台服务器和与之相关的客户端。在客户端/服务器之间的对话是这样的:

```
Server: "Knock knock!"
Client: "Who's there?"
Server: "Dexter."
Client: "Dexter who?"
Server: "Dexter halls with boughs of holly."
Client: "Groan."
```

该示例由两个独立运行的Java程序组成：客户端程序和服务器程序。客户端程序由一个KnockKnockClient类实现，并且与上一节中的EchoClient示例非常相似 。服务器程序由两个类实现： KnockKnockServer和 KnockKnockProtocol。KnockKnockServer 类似于 EchoServer,包含main服务器程序的方法，并执行侦听端口，建立连接以及读取和写入套接字的工作。KnockKnockProtocol 跟着会话，并根据当前的对话返回各种文本片断，这个对象实现了协议 - 客户端和服务器同意用来通信的语言。

以下部分详细介绍了客户端和服务器中的每个类，然后向您展示如何运行它们。

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class KnockKnockServer {
    public static void main(String[] args) throws IOException {
        args = new String[]{"9000"};
        if (args.length != 1) {
            System.err.println("Usage: java KnockKnockServer <port number>");
            System.exit(1);
        }

        int portNumber = Integer.parseInt(args[0]);

        try (
                ServerSocket serverSocket = new ServerSocket(portNumber);
                Socket clientSocket = serverSocket.accept();
                PrintWriter out =
                        new PrintWriter(clientSocket.getOutputStream(), true);
                BufferedReader in = new BufferedReader(
                        new InputStreamReader(clientSocket.getInputStream()));
        ) {

            String inputLine, outputLine;

            // Initiate conversation with client
            // 初始化一个客户的会话状态
            KnockKnockProtocol kkp = new KnockKnockProtocol();
            outputLine = kkp.processInput(null);
            out.println(outputLine);

            // 然后不停的接收来自客户的的数据，并交给KnockKnockProtocol进行相应的处理
            while ((inputLine = in.readLine()) != null) {
                outputLine = kkp.processInput(inputLine);
                out.println(outputLine);
                if (outputLine.equals("Bye."))
                    break;
            }
        } catch (IOException e) {
            System.out.println("Exception caught when trying to listen on port "
                                       + portNumber + " or listening for a connection");
            System.out.println(e.getMessage());
        }
    }
}


public class KnockKnockProtocol {
    // 定义了一系列状态；每个状态必须回复指定的语句触发剧情对话
    private static final int WAITING = 0;
    private static final int SENTKNOCKKNOCK = 1;
    private static final int SENTCLUE = 2;
    private static final int ANOTHER = 3;

    private static final int NUMJOKES = 5;

    private int state = WAITING;
    private int currentJoke = 0;

    private String[] clues = {"Turnip", "Little Old Lady", "Atch", "Who", "Who"};
    private String[] answers = {"Turnip the heat, it's cold in here!",
            "I didn't know you could yodel!",
            "Bless you!",
            "Is there an owl in here?",
            "Is there an echo in here?"};

    public String processInput(String theInput) {
        String theOutput = null;

        if (state == WAITING) {
            theOutput = "Knock! Knock!";
            state = SENTKNOCKKNOCK;
        } else if (state == SENTKNOCKKNOCK) {
            if (theInput.equalsIgnoreCase("Who's there?")) {
                theOutput = clues[currentJoke];
                state = SENTCLUE;
            } else {
                theOutput = "You're supposed to say \"Who's there?\"! " +
                        "Try again. Knock! Knock!";
            }
        } else if (state == SENTCLUE) {
            if (theInput.equalsIgnoreCase(clues[currentJoke] + " who?")) {
                theOutput = answers[currentJoke] + " Want another? (y/n)";
                state = ANOTHER;
            } else {
                theOutput = "You're supposed to say \"" +
                        clues[currentJoke] +
                        " who?\"" +
                        "! Try again. Knock! Knock!";
                state = SENTKNOCKKNOCK;
            }
        } else if (state == ANOTHER) {
            if (theInput.equalsIgnoreCase("y")) {
                theOutput = "Knock! Knock!";
                if (currentJoke == (NUMJOKES - 1))
                    currentJoke = 0;
                else
                    currentJoke++;
                state = SENTKNOCKKNOCK;
            } else {
                theOutput = "Bye.";
                state = WAITING;
            }
        }
        return theOutput;
    }
}

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;

public class KnockKnockClient {
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
                Socket kkSocket = new Socket(hostName, portNumber);
                PrintWriter out = new PrintWriter(kkSocket.getOutputStream(), true);
                BufferedReader in = new BufferedReader(
                        new InputStreamReader(kkSocket.getInputStream()));
        ) {
            BufferedReader stdIn =
                    new BufferedReader(new InputStreamReader(System.in));
            String fromServer;
            String fromUser;

            // 阻塞的从服务器读取数据
            while ((fromServer = in.readLine()) != null) {
                System.out.println("Server: " + fromServer);
                if (fromServer.equals("Bye."))
                    break;

                // 服务器发来一句，我们就必须回复一句
                fromUser = stdIn.readLine();
                if (fromUser != null) {
                    System.out.println("Client: " + fromUser);
                    out.println(fromUser);
                }
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

以上是完整的类；
下面来逐一介绍

```java
try ( 
    ServerSocket serverSocket = new ServerSocket(portNumber);
    Socket clientSocket = serverSocket.accept();
    PrintWriter out =
        new PrintWriter(clientSocket.getOutputStream(), true);
    BufferedReader in = new BufferedReader(
        new InputStreamReader(clientSocket.getInputStream()));
) {
```

ServerSocket是java.net中的类，提供了客户端/服务器socket链接与系统无关的实现。如果构造函数ServerSocket无法侦听指定的端口（例如，端口已被使用），则会引发异常。在这种情况下，KnockKnockServer别无选择，只能退出。

如果服务器成功绑定到其端口，则该ServerSocket对象将成功创建，服务器将继续下一步 - 接受来自客户端的连接（try-with-resources语句中的下一个语句）：

```
clientSocket = serverSocket.accept（）;
```

accept方法一直等待，直到客户端启动并请求该服务器的主机和端口上的连接。accept方法返回一个新的socket对象，它被绑定到同一个本地端口，并且有它的远程地址和远程端口集到客户端。服务器可以通过这个新的套接字与客户端进行通信，并继续侦听原始ServerSocket上的客户端连接请求，这个特定版本的程序不监听更多的客户端连接请求。但是，在支持多个客户机时，提供了改良版的程序。

在服务器成功建立与客户端的连接之后，它使用以下代码与客户端进行通信：

```java
try (
    // ...
    PrintWriter out =
        new PrintWriter(clientSocket.getOutputStream(), true);
    BufferedReader in = new BufferedReader(
        new InputStreamReader(clientSocket.getInputStream()));
) {
    String inputLine, outputLine;
            
    // Initiate conversation with client
    KnockKnockProtocol kkp = new KnockKnockProtocol();
    outputLine = kkp.processInput(null);
    out.println(outputLine);

    while ((inputLine = in.readLine()) != null) {
        outputLine = kkp.processInput(inputLine);
        out.println(outputLine);
        if (outputLine.equals("Bye."))
            break;
    }
```
此代码执行以下操作：

1. 获取套接字的输入和输出流并打开其上的读和写。
2. 通过写入套接字来启动与客户端的通信。
3. 通过读取和写入套接字（while循环）与客户端进行通信。

第一步比较熟悉了。第二步中值得讲一下，创建了一个KnockKnockProtocol对象，跟踪当前的会话状态

## KnockKnockProtocol

KnockKnockProtocol类实现客户端和服务器使用通信的协议。这个类跟踪客户端和服务器在对话中的位置，并提供服务器对客户端语句的响应。该KnockKnockProtocol对象包含所有对话的文本，并确保客户端正确响应服务器的语句。

所有客户机/服务器对必须有一些协议，通过它们彼此交谈; 否则，来回传递的数据将毫无意义。您自己的客户端和服务器使用的协议完全取决于他们完成任务所需的通信。

##  KnockKnockClient

当你启动客户端程序时，服务器应该已经在运行并监听端口，等待客户端请求连接。因此，客户端程序所做的第一件事是打开一个连接到指定主机名和端口上运行的服务器的套接字：

```java
String hostName = args[0];
int portNumber = Integer.parseInt(args[1]);

try (
    Socket kkSocket = new Socket(hostName, portNumber);
    PrintWriter out = new PrintWriter(kkSocket.getOutputStream(), true);
    BufferedReader in = new BufferedReader(
        new InputStreamReader(kkSocket.getInputStream()));
)
```

当链接成功，将获得一个socket对象，请记住，服务器也会获得一个新的套接字。

接下来是while实现客户端和服务器之间通信的循环。服务器先说话，所以客户必须先听。客户端通过从连接到套接字的输入流读取数据。如果服务端说了`Bye.`,那么客户端将结束本次对话；否则当用户键入回车后，将把信息发送到服务端

```java
while ((fromServer = in.readLine()) != null) {
    System.out.println("Server: " + fromServer);
    if (fromServer.equals("Bye."))
        break;

    fromUser = stdIn.readLine();
    if (fromUser != null) {
        System.out.println("Client: " + fromUser);
        out.println(fromUser);
    }
}
```

## 支持多个客户端
为了保持KnockKnockServer简单的例子，我们设计它来监听和处理单个连接请求。但是，多个客户端请求可能会进入相同的端口，因此会进入相同的端口ServerSocket。客户端连接请求在端口排队，因此服务器必须按顺序接受连接。但是，服务器可以通过使用线程同时为它们提供服务 - 每个客户端连接一个线程。

在服务器的逻辑基本流程是这样的:

```java
while (true) {
    accept a connection; 接受链接
    创建一个线程来处理客户端
}
```
线程根据需要读取和写入客户端连接。


```java
public class KKMultiServer {
    public static void main(String[] args) throws IOException {

        if (args.length != 1) {
            System.err.println("Usage: java KKMultiServer <port number>");
            System.exit(1);
        }

        int portNumber = Integer.parseInt(args[0]);
        boolean listening = true;

        try (ServerSocket serverSocket = new ServerSocket(portNumber)) {
            while (listening) {
                new KKMultiServerThread(serverSocket.accept()).start();
            }
        } catch (IOException e) {
            System.err.println("Could not listen on port " + portNumber);
            System.exit(-1);
        }
    }
}
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class KKMultiServerThread extends Thread {
    private Socket socket = null;

    public KKMultiServerThread(Socket socket) {
        super("KKMultiServerThread");
        this.socket = socket;
    }

    public void run() {
        try (
                PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
                BufferedReader in = new BufferedReader(
                        new InputStreamReader(
                                socket.getInputStream()));
        ) {
            String inputLine, outputLine;
            KnockKnockProtocol kkp = new KnockKnockProtocol();
            outputLine = kkp.processInput(null);
            out.println(outputLine);

            while ((inputLine = in.readLine()) != null) {
                outputLine = kkp.processInput(inputLine);
                out.println(outputLine);
                if (outputLine.equals("Bye"))
                    break;
            }
            socket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```


我还是没有看到 服务端和客户端建立连接后，在服务端是用本地系统分配的端口和客户端保持链接的吗？如果只是一个端口，是怎么分辨不同的socket的呢？