# 使用对象
创建对象后，您可能希望将其用于某个对象。您可能需要使用其中一个字段的值，更改其中一个字段，或者调用其中一个方法来执行操作。


## 引用对象的字段

对象字段以其名称访问。您必须使用明确的名称。

您可以在自己的类中为一个字段使用一个简单的名称。例如，我们可以在Rectangle中添加一个声明打印类width和height：

```java
System.out.println("Width and height are: " + width + ", " + height);
```

在这种情况下，width和height只是简单的名字。

对象类外的代码必须使用对象引用或表达式，后跟点（.）运算符，后跟一个简单的字段名称，如：

```java
objectReference.fieldName
```

例如，CreateObjectDemo类中的代码不在Rectangle类的代码之外。因此，要引用名为rectOne的Rectangle对象中的origin，width和height字段，CreateObjectDemo类必须分别使用名称rectOne.origin，rectOne.width和rectOne.height。该方案使用两个这些名称来显示的宽度和高度的rectOne：

```java
System.out.println("Width of rectOne: "  + rectOne.width);
System.out.println("Height of rectOne: " + rectOne.height);
```

尝试从CreateObjectDemo类中的代码使用简单的名称宽度和高度是没有意义的 - 这些字段只存在于对象内，并导致编译器错误。

之后，程序使用相似的代码显示有关rectTwo的信息。相同类型的对象具有自己的相同实例字段的副本。因此，每个Rectangle对象都有名为origin，width和height的字段。通过对象引用访问实例字段时，可以引用该特定对象的字段。两个对象rectOne和rectTwo在CreateObjectDemo程序具有不同的起源，宽度，和高度字段。

要访问某个字段，可以使用对象的_命名引用_，如上例所示，也可以使用返回对象引用的任何表达式。回想一下，_new_操作符返回对对象的引用。所以你可以使用从_new_返回的值来访问一个新的对象的字段：

```java
int height = new Rectangle().height;
```

此语句创建一个新的Rectangle对象，并立即获取其高度。实际上，该语句计算一个Rectangle的默认高度。请注意，在执行此语句之后，该程序不再具有对创建的Rectangle的引用，因为该程序从未在任何地方存储引用。该对象未被引用，其资源可以由Java虚拟机自由回收。


## 调用对象的方法

您还可以使用对象引用来调用对象的方法。您将方法的简单名称附加到对象引用中，并使用中间点运算符（.）。此外，您在封闭括号内提供该方法的任何参数。如果该方法不需要任何参数，请使用空括号。

```java
objectReference.methodName(argumentList);

or:

objectReference.methodName();
```

该矩形类有两个方法：`getArea()`来计算矩形的面积和`move()`来改变矩形的原点。这是调用这两个方法的CreateObjectDemo代码：

```java
System.out.println("Area of rectOne: " + rectOne.getArea());
...
rectTwo.move(40, 72);
```

第一个语句调用rectOne的getArea()方法并显示结果。第二行移动rectTwo，因为move（）方法为对象的origin.x和origin.y分配新值。

与实例字段一样，objectReference必须是对象的引用。您可以使用变量名称，但也可以使用返回对象引用的任何表达式。在_new_操作符返回一个对象引用，所以你可以使用从新返回的值来调用一个新的对象的方法：

```java
new Rectangle(100, 50).getArea()
```
表达式New Rectangle（100，50）返回引用Rectangle对象的对象引用。如上所示，您可以使用点符号来调用新的Rectangle的`getArea()`方法来计算新矩形的面积。

一些方法，如`getArea()`，返回一个值。对于返回值的方法，可以在表达式中使用方法调用。您可以将返回值分配给变量，使用它作出决定或控制循环。此代码将`getArea()`返回的值分配给变量areaOfRectangle：

```java
int areaOfRectangle = new Rectangle(100, 50).getArea();
```

记住，调用特定对象上的方法与向该对象发送消息相同。在这种情况下，调用`getArea()`的对象是构造函数返回的矩形。


## 垃圾收集器

一些面向对象的语言要求您跟踪所创建的所有对象，并且在不再需要时明确地销毁它们。明确管理内存是乏味且容易出错的。Java平台允许您根据需要创建尽可能多的对象（当然，受限于系统可以处理的内容），您不必担心会破坏它们。当Java运行时环境确定它们不再被使用时，它将删除对象。这个过程叫做_垃圾收集_。





