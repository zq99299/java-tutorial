# 编写数据报客户端和服务器

本节中的示例包含两个应用程序：客户端和服务器。
服务器通过 DatagramSocket 连续接收数据报包。然后返回一段文本信息给客户端，
文本信息从一个文件中读取，如果文件不存在，则只返回当前时间。

客户端发送数据。并接收来自服务端的反馈数据

## 服务端

```java
public class QuoteServer {
    public static void main(String[] args) throws IOException {
        new QuoteServerThread().start();
    }
}

public class QuoteServerThread extends Thread {

    protected DatagramSocket socket = null;
    protected BufferedReader in = null;
    protected boolean moreQuotes = true;

    public QuoteServerThread() throws IOException {
        this("QuoteServerThread");
    }

    public QuoteServerThread(String name) throws IOException {
        super(name);
        // 提供一个监听端口
        socket = new DatagramSocket(4445);

        try {
            // 获得一个文本文件的输入流，如果问津不存在则打印未找到文件信息
            in = new BufferedReader(new FileReader("one-liners.txt"));
        } catch (FileNotFoundException e) {
            System.err.println("Could not open quote file. Serving time instead.");
        }
    }

    public void run() {
        // 按是否还有更多文件内容而决定是否还继续监听请求
        while (moreQuotes) {
            try {
                byte[] buf = new byte[256];

                // 最多接收 256 个字符的数据，等待发送数据报
                // receive request
                DatagramPacket packet = new DatagramPacket(buf, buf.length);
                // 阻塞在这里，直到接收到一个数据报
                socket.receive(packet);

                // 反馈给客户端的数据，当文件不存在的时候就返回当前服务器时间
                // figure out response
                String dString = null;
                if (in == null)
                    dString = new Date().toString();
                else
                    dString = getNextQuote();

                buf = dString.getBytes();

                // send the response to the client at "address" and "port"
                // 通过 ip 地址和 端口号，把数据投递出去
                InetAddress address = packet.getAddress();
                int port = packet.getPort();
                packet = new DatagramPacket(buf, buf.length, address, port);
                socket.send(packet);
            } catch (IOException e) {
                e.printStackTrace();
                moreQuotes = false;
            }
        }
        socket.close();
    }

    protected String getNextQuote() {
        String returnValue = null;
        try {
            if ((returnValue = in.readLine()) == null) {
                in.close();
                moreQuotes = false;
                returnValue = "No more quotes. Goodbye.";
            }
        } catch (IOException e) {
            returnValue = "IOException occurred in server.";
        }
        return returnValue;
    }
}
```

## 客户端

```java
public class QuoteClient {
    public static void main(String[] args) throws IOException {
        args = new String[]{"localhost"};

        // 通控制台传递进来要发送数据的服务器
        if (args.length != 1) {
            System.out.println("Usage: java QuoteClient <hostname>");
            return;
        }

        // 构建一个 DatagramSocket
        // get a datagram socket
        DatagramSocket socket = new DatagramSocket();

        // send request
        byte[] buf = new byte[256];
        InetAddress address = InetAddress.getByName(args[0]);
        // 通过 ip 和 端口发送空的数据包
        DatagramPacket packet = new DatagramPacket(buf, buf.length, address, 4445);
        socket.send(packet);

        // get response
        packet = new DatagramPacket(buf, buf.length);
        // 发完之后就阻塞接收服务器的响应
        socket.receive(packet);

        // 从二进制数据变成字符串打印
        // display response
        String received = new String(packet.getData(), 0, packet.getLength());
        System.out.println("Quote of the Moment: " + received);

        socket.close();
    }
}

```

## 测试

服务器打印信息，因为这里我没有文件

```
Could not open quote file. Serving time instead.

```

客户端运行后

```
Quote of the Moment: Fri Mar 29 16:17:46 CST 2019
```
