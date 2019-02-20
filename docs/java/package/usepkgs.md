# 使用包成员
[[toc]]

组成包的类型被称为包成员。

要从包外使用 public 包成员，您必须执行以下操作之一：

* 以完全合格的名称引用该成员
* 导入包成员
* 导入成员的整个包

每一个都适用于不同的情况，如下面的部分所述。

## 以合格的名称引用包装成员
到目前为止，本教程中的大多数示例都通过简单的名称（如 Rectangle 和）来引用类型 StackOfInts。
如果您正在编写的代码与该成员位于同一个包中，或者该成员已被导入，则可以使用包成员的简单名称。

但是，如果您试图使用不同软件包中的成员，并且该软件包尚未导入，则必须使用该成员的完全限定名称，
其中包含软件包名称。这是在前面的例子 Rectangle 中在 graphics 包中声明的类的全名。

```java
graphics.Rectangle

您可以使用此限定名称创建一个实例 graphics.Rectangle：

graphics.Rectangle myRect = new graphics.Rectangle();
```

合格的名字可以不经常使用。但是，当重复使用名称时，反复输入名称变得单调乏味，代码变得难以阅读。
或者，您可以导入（import）成员或其包，然后使用它的简单名称。

## import 包成员
要将特定成员导入到当前文件中，请在文件开始处的任何类型定义之前但在import 语句之后放置一个语句（如果有）。

```java
import graphics.Rectangle;

```

现在你可以用简单的名字 Rectangle 来引用这个类。

```java
Rectangle myRectangle = new Rectangle();
```
如果您只使用 graphics 包中的几个成员，这种方法运作良好。但是，如果您使用包中的许多类型，则应该导入整个包。

## 导入整个包

要导入包含在特定包中的所有类型，请使用 import 带有星号（`*`）通配符的语句

```java
import graphics.*;
```

import 语句中的星号只能用来指定包中的所有类，如下所示。它不能用于匹配包中类的子集。
例如，以下内容不匹配 graphics 以开头的包中的所有类 A。

```java
// does not work
import graphics.A*;
```

相反，它会生成一个编译器错误。通过 import 声明，您通常只导入一个包成员或整个包。

注意：另一种不太常见的形式是导入 public 的内部类

```java
import graphics.Rectangle;
import graphics.Rectangle.*;
```
请注意，第二个导入语句不会导入 Rectangle。

另一种不太常见的形式 import，import static 语句，将在本节结束讨论。

为了方便，Java 编译器自动为每个源文件导入两个完整的包：

1. java.lang 包
2. 当前包（当前文件的包）。


## 包的层次结构

起初，软件包似乎是分层的，但不是。例如，Java API 包含一个 java.awt 包，一个 java.awt.color 包，
一个 java.awt.font 包以及许多其他的以 java.awt 开始。但是，java.awt.color 软件包，
java.awt.font 软件包和其他 java.awt.xxxx 软件包不包含在 java.awt 软件包中。
前缀 java.awt（Java 抽象窗口工具包）用于许多相关的包，以使关系明显，但不显示包含。

导入 `java.awt.*` 包下的所有类，但它不会导入 java.awt.color，java.awt.font 或者任何其它 java.awt.xxxx 的包。
如果您打算使用类和其他类型 `java.awt.color` 以及 `java.awt` 其中的类，则必须将这两个包与其所有文件一起导入：

```java
import java.awt.*;
import java.awt.color.*;
```

简单来说就是导入的只是一个层次下的所有文件

## 名称歧义

如果一个包中的成员与另一个包中的成员共享其名称，并且这两个包都被导入，则必须以其限定名称引用每个成员。
例如，该 graphics 包定义了一个名为 Rectangle 的类 。该 java.awt 软件包还包含一个 Rectangle 类。
如果同时引进 graphics 与 java.awt，下面是模糊的。

```java
Rectangle rect;
```

在这种情况下，您必须使用该成员的完全限定名来准确指出 Rectangle 您想要的类。例如，

```java
graphics.Rectangle rect;
```

## 静态导入声明

有些情况下需要频繁访问一个或两个类的静态 final 字段（常量）和静态方法。
反复添加这些类的名称可能会导致代码混乱。静态导入提供一种方式导入这些成员，就不再需要使用类前缀访问了

```java
public static final double PI = 3.141592653589793;
public static double cos(double a)
{
    ...
}
```

通常，要使用来自其他类的这些对象，请按照以下方式使用，添加类名前缀。

```java
double r = Math.cos(Math.PI * theta);
```

您可以使用静态导入语句来导入 java.lang.Math 的静态成员，这样您就不需要为类名称加前缀 Math。静态成员 Math 可以单独导入：

```java

import static java.lang.Math.PI;

or

import static java.lang.Math.*;
```

导入后则可这样使用

```java
double r = cos(PI * theta);
```

显然，你可以编写你自己的包含常量和常用静态方法的类，然后使用静态导入语句。例如，

```java
import static mypackage.MyConstants.*;
```

::: tip
使用静态导入非常谨慎。过度使用静态导入会导致难以读取和维护的代码，因为代码的读者不知道哪个类定义了特定的静态对象。
正确使用，静态导入通过删除类名称重复使代码更具可读性。
:::
