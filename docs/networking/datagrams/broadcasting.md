# 广播给多个收件人

除了 DatagramSocket 允许程序相互发送数据包之外，java.net 还包含一个名为 MulticastSocket 的类。
这种套接字在客户端用于侦听服务器向多个客户端广播的数据包。

将改写 QuoteServer 和 QuoteClient ，让服务器支持定义像多个客户端发送信息。

之前的三个类进行相应的修改：MulticastServer， MulticastServerThread 和 MulticastClient

## MulticastServer
```java
public class MulticastServer {
    public static void main(String[] args) throws java.io.IOException {
        new MulticastServerThread().start();
    }
}
```
```java
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.InetAddress;
import java.util.Date;

public class MulticastServerThread extends QuoteServerThread {

    private long FIVE_SECONDS = 5000;

    public MulticastServerThread() throws IOException {
        super("MulticastServerThread");
    }

    public void run() {
        while (moreQuotes) {
            try {
                byte[] buf = new byte[256];

                // construct quote
                String dString = null;
                if (in == null)
                    dString = new Date().toString();
                else
                    dString = getNextQuote();
                buf = dString.getBytes();

                // send it
                // 往固定的地址发送数据报，该地址是一个保留地址段，并不是互联网上任何一个存在的地址
                // 用于多点发送
                InetAddress group = InetAddress.getByName("230.0.0.1");
                DatagramPacket packet = new DatagramPacket(buf, buf.length, group, 4446);
                socket.send(packet);

                // sleep for a while
                try {
                    sleep((long) (Math.random() * FIVE_SECONDS));
                } catch (InterruptedException e) {
                }
            } catch (IOException e) {
                e.printStackTrace();
                moreQuotes = false;
            }
        }
        socket.close();
    }
}

```

虽然继承了 QuoteServerThread，创建的监听端口 4445，但是在此示例中，该端口没有参与，
因为不会有客户端向他发送信息

## MulticastClient

```java
public class MulticastClient {
    public static void main(String[] args) throws IOException {
        // 这里使用了 MulticastSocket
        MulticastSocket socket = new MulticastSocket(4446);
        InetAddress address = InetAddress.getByName("230.0.0.1");
        // 成为 230.0.0.1:4446 的组员
        socket.joinGroup(address);

        DatagramPacket packet;

        // get a few quotes
        for (int i = 0; i < 5; i++) {

            // 不是主动请求，而是被动接受服务端的广播推送
            byte[] buf = new byte[256];
            packet = new DatagramPacket(buf, buf.length);
            socket.receive(packet);

            String received = new String(packet.getData(), 0, packet.getLength());
            System.out.println("Quote of the Moment: " + received);
        }

        socket.leaveGroup(address);
        socket.close();
    }
}
```

但是我没有明白如果是在互联网中的话，这个需要怎么广播呢？
