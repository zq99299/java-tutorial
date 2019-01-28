# 抽象方法和类

一个_抽象类_是声明abstract的类-它可能会或可能不包括抽象方法。抽象类不能被实例化，但它们可以被子类化。

一个_抽象方法_是没有实现（没有括号，并且随后是分号），像这样的方法：

```java
abstract void moveTo(double deltaX, double deltaY);
```

如果一个类包含抽象方法，那么这个类本身必须被声明abstract，如下所示：

```java
public abstract class GraphicObject {
   // declare fields
   // declare nonabstract methods
   abstract void draw();
}
```
当抽象类被子类化时，子类通常为其父类中的所有抽象方法提供实现。但是，如果没有，那么子类也必须声明abstract。

> **注意：**

> 接口中的  方法（请参阅 [接口](//content/java/iandi/createinterface.md)部分）中没有声明为默认或静态的方法是隐式抽象的，所以abstract不用于接口方法。（可以使用，但没有必要）

## 抽象类与接口相比

抽象类与接口类似。你不能实例化它们，它们可能包含一个声明有或没有实现的混合方法。但是，对于抽象类，您可以声明非静态和final的字段，并定义public，protected, 和 private 的具体方法。使用接口，所有的字段都是自动public的，static和finall的。你声明或定义的所有方法（作为默认方法）是public的。另外，只能继承一个类，不管它是否抽象，而可以实现任意数量的接口。

什么情况下使用抽象类或接口？

* 如果这些语句适用于您的情况，请考虑使用抽象类：
   * 你想在几个密切相关的类中分享代码。
   * 您期望扩展抽象类的类具有许多常用的方法或字段，或者需要公共访问修饰符（例如protected和private）。
   * 您想要声明非静态或非finall字段。这使您可以定义可访问和修改其所属对象状态的方法。

 * 如果以下任何一种语句适用于您的情况，请考虑使用接口：    
   * 你期望不相关的类将实现你的接口。例如，接口 Comparable和 Cloneable许多不相关的类实现。
   * 您想要指定特定数据类型的行为，但不关心谁实现其行为。
   * 你想利用类型的多重继承。


JDK中的抽象类的一个例子 AbstractMap是集合框架的一部分。它的子类（包括HashMap，TreeMap，和ConcurrentHashMap）共享许多方法（包括get，put，isEmpty，containsKey，和containsValue），其AbstractMap限定。


实现几个接口在JDK的类的例子是 HashMap，它实现了接口Serializable，Cloneable和`Map<K, V>`。通过阅读这个接口列表，你可以推断出一个实例HashMap（不论开发人员或公司是谁实现了这个类）是可以被克隆的，是可序列化的（这意味着它可以被转换成一个字节流;参见 Serializable对象），并具有map的功能。此外，该`Map<K, V>`接口已经增强了很多默认的方法，如merge和forEach那些已实现了这个接口，旧的类不必定义。

请注意，许多软件库都使用抽象类和接口; 在HashMap类实现多个接口，并且还扩展了抽象类AbstractMap。


## 一个抽象类的例子
在面向对象的绘图应用程序中，您可以绘制圆形，矩形，线条，贝塞尔曲线和许多其他图形对象。这些对象都有一些共同的状态（例如：位置，方向，线条颜色，填充颜色）和行为（例如：moveTo，rotate，resize，draw）。其中一些状态和行为对于所有图形对象都是相同的（例如：位置，填充颜色和moveTo）。其他需要不同的实现（例如，调整大小或绘制）。所有人都必须能够自己画画或调整自己的身材; 他们只是不同的方式。这对抽象超类来说是一个完美的情况。您可以利用相似性并声明所有图形对象从相同的抽象父对象（例如，GraphicObject）继承，

![](./assets/classes-graphicObject.gif)

首先，你声明一个抽象类，GraphicObject提供所有子类完全共享的成员变量和方法，比如当前位置和moveTo方法。GraphicObject也为方法声明抽象方法，比如draw或者resize需要被所有的子类实现，但是必须以不同的方式实现。这个GraphicObject类可以看起来像这样：

```java
abstract class GraphicObject {
    int x, y;
    ...
    void moveTo(int newX, int newY) {
        ...
    }
    abstract void draw();
    abstract void resize();
}
```

每个非抽象子类（GraphicObject如Circleand Rectangle）都必须提供draw和resize方法的实现：

```java
class Circle extends GraphicObject {
    void draw() {
        ...
    }
    void resize() {
        ...
    }
}
class Rectangle extends GraphicObject {
    void draw() {
        ...
    }
    void resize() {
        ...
    }
}
```

## 当一个抽象类实现一个接口
在这一节中 [Interfaces](/content/java/iandi/createinterface.md)，有人指出实现接口的类必须实现接口的所有方法。但是，可以定义一个没有实现所有接口方法的类，只要该类声明为abstract。例如，

```java
abstract class X implements Y {
  // implements all but one method of Y
}

class XX extends X {
  // implements the remaining method in Y
}
```

在这种情况下，类X必须是abstract因为它没有完全实现Y，但是类XX实际上是实现的Y。

## 类成员
抽象类可能有static字段和static方法。您可以像使用任何其他类一样，将这些静态成员与类引用（例如，AbstractClass.staticMethod()）一起使用。
