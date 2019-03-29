# 检索网络接口

NetworkInterface 没有 public 的构造函数，因此，您不能仅使用 new 操作符创建该类的新实例。
相反，下面的静态方法都可以让你可以从系统中检索接口的详细信息：

- getByInetAddress()
- getByName()
- getNetworkInterfaces()

当您已经知道 IP 地址或特定接口的名称时，将使用前两种方法。第三种方法 getNetworkInterfaces() 返回机器上的完整接口列表。

网络接口可以分层组织。NetworkInterface 类包含两个方法，它们与网络接口层次结构相关

- getParent()：返回一个接口的父网络接口。如果网络接口是子接口，返回 null
- getsubinterface()：一个网络接口的所有子接口。

以下示例程序列出了计算机上所有网络接口和子接口（如果存在）的名称。


```java
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Collections;
import java.util.Enumeration;

public class ListNIFs {
    public static void main(String args[]) throws SocketException {
        // 获取所有接口
        Enumeration<NetworkInterface> nets = NetworkInterface.getNetworkInterfaces();

        for (NetworkInterface netIf : Collections.list(nets)) {
            System.out.printf("Display name: %s\n", netIf.getDisplayName());
            System.out.printf("Name: %s\n", netIf.getName());
            displaySubInterfaces(netIf);
            System.out.printf("\n");
        }
    }

    static void displaySubInterfaces(NetworkInterface netIf) throws SocketException {
        Enumeration<NetworkInterface> subIfs = netIf.getSubInterfaces();

        for (NetworkInterface subIf : Collections.list(subIfs)) {
            System.out.printf("\tSub Interface Display name: %s\n", subIf.getDisplayName());
            System.out.printf("\tSub Interface Name: %s\n", subIf.getName());
        }
    }
}
```

输出

```
Display name: Software Loopback Interface 1
Name: lo

Display name: Microsoft 6to4 Adapter
Name: net0

Display name: WAN Miniport (IKEv2)
Name: net1

Display name: Microsoft Kernel Debug Network Adapter
Name: eth0

Display name: WAN Miniport (IP)
Name: eth1

Display name: Microsoft IP-HTTPS Platform Adapter
Name: net2

Display name: WAN Miniport (Network Monitor)
Name: eth2

Display name: WAN Miniport (SSTP)
Name: net3

Display name: WAN Miniport (PPPOE)
Name: ppp0

Display name: Realtek PCIe GBE Family Controller
Name: eth3

Display name: Microsoft Teredo Tunneling Adapter
Name: net4

Display name: WAN Miniport (PPTP)
Name: net5

Display name: WAN Miniport (L2TP)
Name: net6

Display name: WAN Miniport (IPv6)
Name: eth4

Display name: Realtek PCIe GBE Family Controller-WFP Native MAC Layer LightWeight Filter-0000
Name: eth5

Display name: Realtek PCIe GBE Family Controller-QoS Packet Scheduler-0000
Name: eth6

Display name: Realtek PCIe GBE Family Controller-WFP 802.3 MAC Layer LightWeight Filter-0000
Name: eth7

Display name: WAN Miniport (IP)-WFP Native MAC Layer LightWeight Filter-0000
Name: eth8

Display name: WAN Miniport (IP)-QoS Packet Scheduler-0000
Name: eth9

Display name: WAN Miniport (IPv6)-WFP Native MAC Layer LightWeight Filter-0000
Name: eth10

Display name: WAN Miniport (IPv6)-QoS Packet Scheduler-0000
Name: eth11

Display name: WAN Miniport (Network Monitor)-WFP Native MAC Layer LightWeight Filter-0000
Name: eth12

Display name: WAN Miniport (Network Monitor)-QoS Packet Scheduler-0000
Name: eth13

```

由于我本地安装了虚拟机，所以有好多的虚拟接口，而且没有子接口，不太了解是什么样子的表现

下面是官网的输出

```
Display name: bge0
Name: bge0
    Sub Interface Display name: bge0:3
    Sub Interface Name: bge0:3
    Sub Interface Display name: bge0:2
    Sub Interface Name: bge0:2
    Sub Interface Display name: bge0:1
    Sub Interface Name: bge0:1

Display name: lo0
Name: lo0
```
