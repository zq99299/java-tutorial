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

## format 方法

该 format 方法 基于格式字符串格式化多个参数。格式字符串包含静态文本嵌入格式说明符;除了格式说明符，格式字符串输出不变。
格式字符串支持许多功能。在本教程中，我们将介绍一些基础知识。有关完整的说明，请参阅 [format string syntaxAPI](https://docs.oracle.com/javase/8/docs/api/java/util/Formatter.html#syntax)规范。

以下示例

```java
        int i = 2;
        double r = Math.sqrt(i);

        System.out.format("The square root of %d is %f.%n", i, r);
```

这里输出：
```java
The square root of 2 is 1.414214.
```

像这个例子中，使用了三个格式说明符。所有的格式说明符都是以一个 `%` 开头 转换开始的，它们指定了正在生成的格式化输出的种类。这里使用的三个转换是：

* d 将整数值格式化为十进制值。
* f 将浮点值格式化为十进制值。
* n 结果为特定于平台的行分隔符 。

以下是其他转换：

* x 将整数格式化为十六进制值。
* s 将任何值格式化为字符串。
* tB 将整数格式化为特定于区域的月份名称。
还有很多其他的转换。

**注意： **
除了%%和%n，所有格式说明符必须匹配参数。如果没有，抛出异常。

在Java编程语言中，“\n”总是生成换行符“\u000A”。除非你特别明白你需要“\n”，否则不要使用，要获取本地平台的正确的行分隔符，请使用`%n`.
