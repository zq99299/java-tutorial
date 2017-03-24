# 格式化

实现格式化的流对象是字符`PrintWriter`流类或 `PrintStream`字节流类的实例。

**注意：** 你可以能需要一个PrintStream实例，System.out and System.err 能返回一个PrintStream实例（更多的请查阅 命令行IO章节），当需要创建格式化的输出流时使用PrintWriter而不是PrintStream。

像所有字节和字符流对象一样，`PrintWriter`或 `PrintStream`的实例实现了write方法，输出简单字节和字符。另外他们实现相同的内部数据转换成格式化输出的方法，两个级别的格式支持：

* print和println以标准方式格式化各个值。
* format 基于格式字符串格式化几乎任何数量的值，并具有许多精确格式化选项。

## print 和 println 方法

在使用适当的方法转换值后调用print或println输出单个值toString。我们可以在Root示例中看到这一点 ：
```java
public class Root {
    public static void main(String[] args) {
        int i = 2;
        double r = Math.sqrt(i);

        System.out.print("The square root of ");
        System.out.print(i);
        System.out.print(" is ");
        System.out.print(r);
        System.out.println(".");

        i = 5;
        r = Math.sqrt(i);
        System.out.println("The square root of " + i + " is " + r + ".");
    }
}
```

这里是Root的输出
```java
The square root of 2 is 1.4142135623730951.
The square root of 5 is 2.23606797749979.
```

这个i和r变量被格式化了两次：第一次使用代码重载print，第二次由Java编译器自动生成的转换代码，这也是利用的toString。您可以通过这种格式设置任何值，但是您对结果的控制不够。