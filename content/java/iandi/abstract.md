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
   
   
   
   