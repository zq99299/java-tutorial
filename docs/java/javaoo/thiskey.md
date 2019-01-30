# 使用 this 关键字
[[toc]]

在实例方法或构造函数中，this 是对 **当前对象** 的引用，该对象的方法或构造函数被调用。您可以在实例方法或构造函数中通过 this 引用当前对象的任何成员。

## this 引用字段

使用 this 场景的原因是因为一个字段被一个方法或则构造的参数名覆盖

例如

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

但它可能是这样写的：

```java
public class Point {
    public int x = 0;
    public int y = 0;

    //constructor
    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
}
```

构造函数的每个参数都会影响对象的一个​​字段 - 构造函数内部的 x 是构造函数的第一个参数的本地副本。要引用该 Point 字段 x，构造函数必须使用 this.x。

## this 引用构造

从构造函数中，您还可以使用该 this 关键字来调用同一个类中的另一个构造函数。这样做被称为 **显式构造函数调用**。这是另一个 Rectangle 类，与 [对象](./objects.md) 部分的实现不同 。

```java
public class Rectangle {
    private int x, y;
    private int width, height;

    public Rectangle() {
        this(0, 0, 1, 1);
    }
    public Rectangle(int width, int height) {
        this(0, 0, width, height);
    }
    public Rectangle(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    ...
}
```

这个类包含一组构造函数。每个构造函数初始化一些或所有矩形的成员变量。构造函数为参数不提供其初始值的任何成员变量提供默认值。例如，无参数构造函数 Rectangle 在坐标 0,0 处创建一个 1x1 。双参数构造函数调用四参数构造函数，传递宽度和高度，但始终使用 0 坐标。如前所述，编译器根据参数的数量和类型确定要调用的构造函数。

如果存在，则另一个构造函数的调用必须是构造函数中的第一行。
