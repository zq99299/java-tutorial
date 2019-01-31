# 继承
[[toc]]

在前面的课程中，你已经看到了几次提到的 **继承** 。在 Java 语言中，类可以从其他类派生，从而继承这些类的字段和方法。

## 定义
从另一个类派生的类称为子类（派生类，扩展类或子类）。派生子类的类称为超类（也是基类或父类）。

除了 Object 没有超类，每个类都有一个且只有一个直接超类（单继承）。在没有任何其他显式超类的情况下，每个类都是 Object 隐式的子类。

类可以派生自派生自类的类的类，等等，最终派生自最上面的 Object 类 。这样的类被认为是下降的所有继承链可以追溯到 Object 类。

继承的想法很简单，但功能强大：当你想创建一个新的类，并且已经有一个包含你想要的代码的类时，你可以从现有的类中派生出新的类。在这样做的时候，你可以重用现有类的字段和方法，而不必自己编写（和调试）它们。

子类从其父类继承所有成员（字段，方法和嵌套类）。构造函数不是成员，所以它们不会被子类继承，但是可以从子类中调用超类的构造函数。


## Java 平台类层次结构

Object 在 java.lang 包中定义的 ，类定义并实现了所有类共同的行为，包括你编写的类。在 Java 平台中，许多类直接派生自其他类，派生自其中一些类，等等，形成类的层次结构。

![](./assets/classes-object.gif)

Java 平台中的所有类都是 Object 的后代

在层次结构的顶部，Object 是所有类中最通用的。靠近层次结构底部的类提供更专业化的行为。

## 一个继承的例子

```java
public class Bicycle {

    // the Bicycle class has three fields
    public int cadence;
    public int gear;
    public int speed;

    // the Bicycle class has one constructor
    public Bicycle(int startCadence, int startSpeed, int startGear) {
        gear = startGear;
        cadence = startCadence;
        speed = startSpeed;
    }

    // the Bicycle class has four methods
    public void setCadence(int newValue) {
        cadence = newValue;
    }

    public void setGear(int newValue) {
        gear = newValue;
    }

    public void applyBrake(int decrement) {
        speed -= decrement;
    }

    public void speedUp(int increment) {
        speed += increment;
    }

}
```

Bicycle 的子类 MountainBike 可能如下所示：

```java
public class MountainBike extends Bicycle {

    // the MountainBike subclass adds one field
    public int seatHeight;

    // the MountainBike subclass has one constructor
    public MountainBike(int startHeight,
                        int startCadence,
                        int startSpeed,
                        int startGear) {
        super(startCadence, startSpeed, startGear);
        seatHeight = startHeight;
    }   

    // the MountainBike subclass adds one method
    public void setHeight(int newValue) {
        seatHeight = newValue;
    }   
}
```

MountainBike 继承 Bicycle 所有的字段和方法，并添加 seatHeight 字段和方法来设置它。除了构造函数外，就好像你已经从头开始写了一个新的类，有四个字段和五个方法。但是，你并不需要做所有的工作。如果 Bicycle 类中的方法复杂且需要大量的时间进行调试，这将是特别有价值的。

## 你可以在子类中做什么

子类继承父类的所有 public 和 protected 成员，不管子类是什么包。如果子类与其父类位于同一个包中，它也继承了父类的包 private 成员，您可以按原样使用继承的成员，替换它们，隐藏它们，或者用新成员补充它们:

* 继承的字段可以直接使用，就像其他字段一样。
* 您可以在子类中声明一个与超类中的字段相同的字段，从而隐藏它（不推荐）。
* 您可以在子类中声明不在超类中的新字段。
* 继承的方法可以直接使用。
* 您可以在与超类中签名相同的子类中编写一个新的 **实例** 方法，从而 **覆盖** 它。
* 你可以在子类中写一个新的 **静态** 方法，它与超类中的签名相同，从而 **隐藏** 它。
* 您可以在子类中声明不在超类中的新方法。
* 你可以编写一个调用超类的构造函数的子类构造函数，或者隐式地使用 super 关键字。


本课的以下部分将讲述这些主题。

## 父类的私有成员

子类不会继承其父类的 private 成员，但是，如果超类具有访问其私有字段的公共或受保护的方法，则这些也可以由子类使用。

## 对象
我们已经看到，一个对象是它实例化的类的数据类型。例如，如果我们写

```java
public MountainBike myBike = new MountainBike();
```

那么 myBike 的类型是 MountainBike。

MountainBike 是 Bicycle 和 Object 的子类，因此，MountainBike 是一个 Bicycle，也是一个 Object，并且它可用于任何要求 Bicycle 或 Object 对象的地方。

反过来并不一定是正确的： Bicycle 可能是 MountainBike，但不一定。同样，一个 Object 可能是一个 Bicycle 或一个 MountainBike，但不一定。

在继承和实现所允许的对象之中，Casting 显示使用一种类型的对象来代替另一种类型的对象。例如，如果我们写

```java
Object obj = new MountainBike();
```

然后 obj 是一个 Object 和一个 MountainBike（直到 obj 被分配的另一个对象不是一个 MountainBike）。这被称为 **隐式投射**。

如果，另一方面，我们写

```java
MountainBike myBike = obj;
```
我们会得到一个编译时错误，因为编译器不知道 obj 是一个 MountainBike。但是，我们可以告诉编译器，我们承诺通过显式的转换来分配一个 MountainBiketo 给 obj

```java
MountainBike myBike = (MountainBike)obj;
```

这个转换插入了一个运行时检查，这个检查 obj 被分配了一个 MountainBike，这样编译器就可以安全地假定它 obj 是一个 MountainBike。如果在运行时 obj 不是 MountainBike，则会抛出异常。

::: tip
您可以使用 instanceof 运算符对特定对象的类型进行逻辑测试。这可以避免由于不正确的转换造成的运行时错误。例如：
:::

```java
if (obj instanceof MountainBike) {
    MountainBike myBike = (MountainBike)obj;
}
```

在这里 instanceof 验证 obj 是否是 MountainBike，这样我们就可以知道将不会抛出运行时异常。
