# 什么是网络接口？

网络接口是计算机与专用或公用网络之间的互连点。网络接口通常是网络接口卡（NIC），
但不必具有物理形式。相反，网络接口可以在软件中实现。例如，loopback 接口（IPv4 是 127.0.0.1，IPv6 是::1）
不是物理设备，而是模拟网络接口的软件。环回接口通常用于测试环境中。

java.net.NetworkInterface 类代表两种类型的接口。

网络接口适用于具有多个 nic 的多主系统。使用 NetworkInterface，您可以为特定的网络活动指定使用哪个 NIC。

例如，假设您有一台配置了两个 nic 的机器，并且希望向服务器发送数据。创建一个这样的套接字:

```java
Socket soc = new java.net.Socket();
soc.connect(new InetSocketAddress(address, port));
```

为了发送数据，系统确定使用哪个接口。但是，如果您有首选项或需要指定要使用的 NIC，
则可以在系统中查询相应的接口，并在要使用的接口上查找地址。创建套接字并将其绑定到该地址时，
系统将使用关联的接口。例如：

```java
NetworkInterface nif = NetworkInterface.getByName("bge0");
Enumeration<InetAddress> nifAddresses = nif.getInetAddresses();

Socket soc = new java.net.Socket();
soc.bind(new InetSocketAddress(nifAddresses.nextElement(), 0));
soc.connect(new InetSocketAddress(address, port));
```

您还可以使用 NetworkInterface 来标识要加入多播组的本地接口。例如：

```java
NetworkInterface nif = NetworkInterface.getByName("bge0");
MulticastSocket ms = new MulticastSocket();
ms.joinGroup(new InetSocketAddress(hostname, port), nif);
```

除了此处描述的两种用法之外，NetworkInterface 还可以通过许多其他方式与 Java API 一起使用。
