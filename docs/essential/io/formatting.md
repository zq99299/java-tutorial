# 格式化

实现格式化的流对象是字符 `PrintWriter` 流类或 `PrintStream` 字节流类的实例。

**注意：** 你可以能需要一个 PrintStream 实例，System.out and System.err 能返回一个 PrintStream 实例（更多的请查阅 命令行IO章节），
当需要创建格式化的输出流时使用 PrintWriter 而不是 PrintStream。

像所有字节和字符流对象一样，`PrintWriter` 或  `PrintStream` 的实例实现了 write 方法，
输出简单字节和字符。另外他们实现相同的内部数据转换成格式化输出的方法，两个级别的格式支持：

* print 和 println 以标准方式格式化各个值。
* format 基于格式字符串格式化几乎任何数量的值，并具有许多精确格式化选项。

## print 和 println 方法

在使用适当的方法转换值后调用 print 或 println 输出单个值 toString 。我们可以在 Root 示例中看到这一点 ：

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

这个 i 和 r 变量被格式化了两次：第一次使用代码重载 print，第二次由 Java 编译器自动生成的转换代码，这也是利用的 toString。
您可以通过这种格式设置任何值，但是您对结果的控制不够。

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

像这个例子中，使用了三个格式说明符。所有的格式说明符都是以一个 `%` 开头 转换开始的，它们指定了正在生成的格式化输出的种类。
这里使用的三个转换是：

* d 将整数值格式化为十进制值。
* f 将浮点值格式化为十进制值。
* n 结果为特定于平台的行分隔符 。

以下是其他转换：

* x 将整数格式化为十六进制值。
* s 将任何值格式化为字符串。
* tB 将整数格式化为特定于区域的月份名称。
还有很多其他的转换。

**注意：**
除了 %% 和 %n，所有格式说明符必须匹配参数。如果没有，抛出异常。

在 Java 编程语言中，“\n” 总是生成换行符 “\u000A”。除非你特别明白你需要“\n”，否则不要使用，要获取本地平台的正确的行分隔符，请使用 `%n`.

除了转换之外，格式说明符可以包含进一步自定义格式化输出的几个附加元素。这是一个例子， `Format` 它使用了每一种可能的元素。
```java
System.out.format("%f, %1$+020.10f %n", Math.PI);
```

这里是输出

```java
3.141593，+00000003.1415926536
```

附加元素都是可选的。下图显示了更长的说明符如何分解成元素。

![](./assets/io-spec.png)

元素必须按照显示的顺序显示。上图的工作方式是：

* % 是开始格式化的标识符
* Precision（精度）：对于浮点值，这是格式化值的数学精度。对于 s 和其他一般转换，这是格式化值的最大宽度; 如有必要，该值将被截断。
* Width （宽度）：格式化值的最小宽度; 如果需要，该值被填充。默认情况下，该值用空白填充。
* Flags （标志）：指定其他格式选项。

    在该Format示例中，该`+`标志指定该数字应始终使用符号格式化，并且`0`标志指定 “0” 是填充字符。
    还有一些其他标志在 `java.util.Formatter` 文档中有说明，请注意，某些标志不能与某些其他标志或某些转换一起使用。
* 1$ 是参数索引，因为是按照顺序，%f 默认对应第一个参数。后面的依次类推。可以使用参数索引重复匹配一个参数，如这里的示例。

从右往左边解读：%1$+020.10f %n 如下

* %n ： 换行
* f ： 格式化成浮点数
* `.10` ： 浮点数的精度为10位小数
* 20 : 整个字符串长度为20位，包括符号
* `+ 0` ：不满足宽度的则用 0 填充，且总是附加一个符号，这个 + 标识：如果要格式化的数值是一个整数那么 附加 “+”，如果是负数那么 附加 “-”
* `1$` : 格式化第一个参数
* `%` ：格式化说明符开始标致
