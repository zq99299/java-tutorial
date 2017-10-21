# 创建对象

你知道，一个类提供了对象的蓝图; 你从类创建一个对象。从CreateObjectDemo程序中获取的每个以下语句 创建一个对象并将其分配给一个变量：

```java
Point originOne = new Point(23, 94);
Rectangle rectOne = new Rectangle(originOne, 100, 200);
Rectangle rectTwo = new Rectangle(50, 100);
```

第一行创建一个Point类的对象， 第二行和第三行每个都创建一个Rectangle类的对象 。

这些陈述有三个部分（下面详细讨论）：

* 声明：等号左边的代码都是将变量名称与对象类型相关联的变量声明。
* 实例化：new关键字是创建对象的Java操作符。
* 初始化：new运算符后跟一个构造函数的调用，该构造函数初始化新对象。

## 声明变量来引用对象
以前，你了解到要声明一个变量，你写：

```java
type name
```

这将通知编译器，您将使用name来引用其type 类型的数据。使用原始变量，该声明还为变量保留适当的内存量。

您也可以在自己的行上声明一个引用变量。例如：

```java
Point originOne;
```

如果你这样声明originOne，它的值将不确定，直到一个对象被创建并分配给它。简单地声明一个引用变量不会创建一个对象。为此，您需要使用new操作符，如下一节所述。在代码中使用originOne之前，您必须指定一个对象。否则，您将收到编译器错误。

## 实例化一个类

_new_通过一个新的对象分配内存，并返回到内存的引用实例化一个类。在_new_的操作符后还调用对象的构造函数。

> **注意：**  “实例化一个类”这个短语意味着与“创建对象”相同。创建对象时，您正在创建一个类的“实例”，因此“实例化”一个类。

_new_操作符需要一个单一的，后缀的参数：一个构造函数的调用。构造函数的名称提供要实例化的类的名称。

new 操作符反回到它创建的对象的引用。此引用通常分配给适当类型的变量，如：

```java
int height = new Rectangle().height;
```

本声明将在下一节讨论。

## 初始化对象
这是Point类的代码：

```java
public class Point {
    public int x = 0;
    public int y = 0;
    //constructor
    public Point(int a, int b) {
        x = a;
        y = b;
    }
}
```

这个类包含一个单一的构造函数。您可以识别一个构造函数，因为它的声明使用与该类名相同的名称，它没有返回类型。Point类中的构造函数由代码（int a，int b）声明的两个整数参数。以下语句提供了23和94作为这些参数的值：

```java
Point originOne = new Point(23, 94);
```

执行该语句的结果可以在下图中说明：

![](assets/java/javaoo/objects-oneRef.gif)
