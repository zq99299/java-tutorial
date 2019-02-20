# 创建和使用包

为了使类型更易于查找和使用，避免命名冲突，并控制访问，程序员将相关类型的组捆绑到包中。

**定义：** 一个包是相关类型提供访问保护和名字空间管理的分组。

::: tip
类型是指类、接口、枚举和注解类型。枚举和注解类型分别是类和接口的特殊类型，所以在本课中经常将类型称为类和接口。
:::


作为 Java 平台一部分的类型是通过函数捆绑类的各种包的成员：基础类在 java.lang，读写类（输入和输出）java.io 等等。你也可以把你的类型放在包里。

假设您编写了一组代表图形对象的类，例如圆形、矩形、线条和点。你也可以编写一个接口 Draggable，如果可以用鼠标拖动它们，那么这些类将实现。

```java
//in the Draggable.java file
public interface Draggable {
    ...
}

//in the Graphic.java file
public abstract class Graphic {
    ...
}

//in the Circle.java file
public class Circle extends Graphic
    implements Draggable {
    . . .
}

//in the Rectangle.java file
public class Rectangle extends Graphic
    implements Draggable {
    . . .
}

//in the Point.java file
public class Point extends Graphic
    implements Draggable {
    . . .
}

//in the Line.java file
public class Line extends Graphic
    implements Draggable {
    . . .
}
```

您应该将这些类和接口捆绑在一个包中，原因有很多，其中包括：

* 您和其他程序员可以轻松确定这些类型是相关的。
* 您和其他程序员知道在哪里可以找到可以提供图形相关功能的类型。
* 您的类型的名称不会与其他包中的类型名称冲突，因为该包会创建一个新的名称空间。
* 您可以允许包中的类型具有不受限制的访问权限，但仍然限制包之外的类型的访问权限。
