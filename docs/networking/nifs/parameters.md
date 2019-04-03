# 网络接口参数

除了分配给网络接口的名称和 IP 地址外，还可以访问关于网络接口的网络参数

比如 `isUP()` 方法返回「up」（即运行）。以下方法指示网络接口类型：

- isLoopback() 指示网络接口是否是环回接口。
- isPointToPoint() 是否是点对点接口
- isVirtual() 是否是虚拟接口

其他参数获取：

- supportsMulticast() 是否支持多播
- getHardwareAddress() 获取物理硬件地址，通常称为 MAC 地址
- getMTU() 返回最大传输单元（MTU），这是最大的数据包大小。


```java
public class ListNetsEx {
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
            System.out.printf("IP : %s\n", inetAddress);
        }

        System.out.printf("Up? %s\n", netint.isUp());
        System.out.printf("回环接口? %s\n", netint.isLoopback());
        System.out.printf("点对点接口? %s\n", netint.isPointToPoint());
        System.out.printf("支持多播? %s\n", netint.supportsMulticast());
        System.out.printf("虚拟接口? %s\n", netint.isVirtual());
        System.out.printf("MAC 地址: %s\n",
                Arrays.toString(netint.getHardwareAddress()));
        System.out.printf("MTU: %s\n", netint.getMTU());
        System.out.printf("\n");
    }
}
```

程序输出

```
Name: lo
IP : /127.0.0.1
IP : /0:0:0:0:0:0:0:1
Up? true
回环接口? true
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1

Display name: Microsoft 6to4 Adapter
Name: net0
Up? false
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1

Display name: WAN Miniport (PPTP)
Name: net1
Up? false
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1

Display name: Microsoft IP-HTTPS Platform Adapter
Name: net2
Up? false
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1

Display name: WAN Miniport (L2TP)
Name: net3
Up? false
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1

Display name: Microsoft Teredo Tunneling Adapter
Name: net4
Up? false
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1

Display name: WAN Miniport (SSTP)
Name: net5
Up? false
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1

Display name: WAN Miniport (PPPOE)
Name: ppp0
Up? false
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1

Display name: WAN Miniport (IKEv2)
Name: net6
Up? false
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1

Display name: Microsoft Kernel Debug Network Adapter
Name: eth0
Up? false
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1

Display name: Intel(R) Ethernet Connection (7) I219-LM
Name: eth1
IP : /192.168.6.133
IP : /fe80:0:0:0:5d5:e894:f01b:756b%eth1
Up? true
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: [0, -40, 97, 32, -63, -35]
MTU: 1500

Display name: WAN Miniport (IPv6)
Name: eth2
Up? false
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1

Display name: WAN Miniport (IP)
Name: eth3
Up? false
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1

Display name: WAN Miniport (Network Monitor)
Name: eth4
Up? false
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1

Display name: Intel(R) Ethernet Connection (7) I219-LM-WFP Native MAC Layer LightWeight Filter-0000
Name: eth5
Up? false
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1

Display name: Intel(R) Ethernet Connection (7) I219-LM-QoS Packet Scheduler-0000
Name: eth6
Up? false
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1

Display name: Intel(R) Ethernet Connection (7) I219-LM-WFP 802.3 MAC Layer LightWeight Filter-0000
Name: eth7
Up? false
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1

Display name: WAN Miniport (IP)-WFP Native MAC Layer LightWeight Filter-0000
Name: eth8
Up? false
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1

Display name: WAN Miniport (IP)-QoS Packet Scheduler-0000
Name: eth9
Up? false
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1

Display name: WAN Miniport (IPv6)-WFP Native MAC Layer LightWeight Filter-0000
Name: eth10
Up? false
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1

Display name: WAN Miniport (IPv6)-QoS Packet Scheduler-0000
Name: eth11
Up? false
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1

Display name: WAN Miniport (Network Monitor)-WFP Native MAC Layer LightWeight Filter-0000
Name: eth12
Up? false
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1

Display name: WAN Miniport (Network Monitor)-QoS Packet Scheduler-0000
Name: eth13
Up? false
回环接口? false
点对点接口? false
支持多播? true
虚拟接口? false
MAC 地址: null
MTU: -1
```
