# 列出网络接口地址
您可以从网络接口获得的最有用的信息之一是分配给它的 IP 地址列表。您可以使用以下两种方法之一从 NetworkInterface 实例中获取此信息。
第一个方法 getinetaddress() 返回 InetAddress 的枚举。另一个方法 getinterfaceaddress() 返回 java.net.InterfaceAddress 实例的列表。
当您需要有关 IP 地址之外的接口地址的更多信息时，可以使用此方法。例如，当地址是 IPv4 地址时，
您可能需要关于子网掩码和广播地址的额外信息，如果是 IPv6 地址，则需要网络前缀长度。

以下示例程序列出了计算机上的所有网络接口及其地址：

```java
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Collections;
import java.util.Enumeration;

public class ListNets {
    public static void main(String args[]) throws SocketException {
        Enumeration<NetworkInterface> nets = NetworkInterface.getNetworkInterfaces();
        for (NetworkInterface netint : Collections.list(nets))
            displayInterfaceInformation(netint);
    }

    static void displayInterfaceInformation(NetworkInterface netint) throws SocketException {
        System.out.printf("Display name: %s\n", netint.getDisplayName());
        System.out.printf("Name: %s\n", netint.getName());
        Enumeration<InetAddress> inetAddresses = netint.getInetAddresses();
        for (InetAddress inetAddress : Collections.list(inetAddresses)) {
            System.out.printf("InetAddress: %s\n", inetAddress);
        }
        System.out.printf("\n");
    }
}
```

程序输出

```
Name: lo
InetAddress: /127.0.0.1
InetAddress: /0:0:0:0:0:0:0:1

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
InetAddress: /192.168.6.88
InetAddress: /fe80:0:0:0:8026:302b:f64a:745e%eth3

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

下面是官网的输出

```
Display name: TCP Loopback interface
Name: lo
InetAddress: /127.0.0.1

Display name: Wireless Network Connection
Name: eth0
InetAddress: /192.0.2.0
```
