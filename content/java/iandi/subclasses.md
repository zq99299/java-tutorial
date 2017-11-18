# 继承

在前面的课程中，你已经看到了几次提到的_继承_。在Java语言中，类可以从其他类_派生_，从而_继承_这些类的字段和方法。

> **定义： ** 

> 从另一个类派生的类称为子类（派生类，扩展类或子类）。派生子类的类称为超类（也是基类或父类）。

> 除了Object没有超类，每个类都有一个且只有一个直接超类（单继承）。在没有任何其他显式超类的情况下，每个类都是隐式的子类Object。

> 类可以派生自派生自类的类的类，等等，最终派生自最上面的类，Object。这样的类被认为是下降的所有继承链可以追溯到类Object。

继承的想法很简单，但功能强大：当你想创建一个新的类，并且已经有一个包含你想要的代码的类时，你可以从现有的类中派生出新的类。在这样做的时候，你可以重用现有类的字段和方法，而不必自己编写（和调试）它们。

子类从其父类继承所有成员（字段，方法和嵌套类）。构造函数不是成员，所以它们不会被子类继承，但是可以从子类中调用超类的构造函数。


## Java平台类层次结构

Object在java.lang包中定义的 类定义并实现了所有类共同的行为，包括你编写的类。在Java平台中，许多类直接派生自其他类，派生自其中一些类，等等，形成类的层次结构。

![](/assets/java/iandi/classes-object.gif)
Java平台中的所有类都是Object的后代

在层次结构的顶部，Object是所有类中最通用的。靠近层次结构底部的类提供更专业化的行为。

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

Bicycle的子类MountainBike可能如下所示：

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

MountainBike继承Bicycle所有的字段和方法，并添加字段seatHeight和方法来设置它。除了构造函数外，就好像你已经MountainBike从头开始写了一个新的类，有四个字段和五个方法。但是，你并不需要做所有的工作。如果Bicycle课堂中的方法复杂且需要大量的时间进行调试，这将是特别有价值的。

## 你可以在子类中做什么

子类继承父类的所有public和protected成员，不管子类是什么包。如果子类与其父类位于同一个包中，它也继承了父类的包private成员,您可以按原样使用继承的成员，替换它们，隐藏它们，或者用新成员补充它们:

* 继承的字段可以直接使用，就像其他字段一样。
* 您可以在子类中声明一个与超类中的字段相同的字段，从而隐藏它（不推荐）。
* 您可以在子类中声明不在超类中的新字段。
* 继承的方法可以直接使用。
* 您可以在与超类中签名相同的子类中编写一个新的_实例_方法，从而_覆盖_它。
* 你可以在子类中写一个新的_静态_方法，它与超类中的签名相同，从而_隐藏_它。
* 您可以在子类中声明不在超类中的新方法。
* 你可以编写一个调用超类的构造函数的子类构造函数，或者隐式地使用关键字super。


本课的以下部分将讲述这些主题。

## 父类的私有成员

子类不会继承其父类的private成员，但是，如果超类具有访问其私有字段的公共或受保护的方法，则这些也可以由子类使用。

## 对象
我们已经看到，一个对象是它实例化的类的数据类型。例如，如果我们写

```java
public MountainBike myBike = new MountainBike();
```
那么myBike的类型是MountainBike。

MountainBike 是Bicycle和Object的子类，因此，MountainBike是一个Bicycle，也是一个Object，并且它可用于任何Bicycle或Object对象被要求。

反过来并不一定是正确的： Bicycle 可能是 MountainBike，但不一定。同样，一个Object 可能是一个Bicycle或一个MountainBike，但不一定。

在继承和实现所允许的对象之中，Casting显示使用一种类型的对象来代替另一种类型的对象。例如，如果我们写

```java
Object obj = new MountainBike();
```

然后obj是一个Object和一个MountainBike（直到obj被分配的另一个对象不是一个MountainBike）。这被称为_隐式投射_。

如果，另一方面，我们写

```java
MountainBike myBike = obj;
```
我们会得到一个编译时错误，因为obj不知道编译器是一个MountainBike。但是，我们可以告诉编译器，我们承诺通过显式的转换来分配一个MountainBiketo ：obj

```java
MountainBike myBike = (MountainBike)obj;
```

这个转换插入了一个运行时检查，这个检查obj被分配了一个MountainBike,这样编译器就可以安全地假定它obj是一个MountainBike。如果在运行时obj不是MountainBike，则会抛出异常。

> **注意**

> 您可以使用instanceof运算符对特定对象的类型进行逻辑测试。这可以避免由于不正确的转换造成的运行时错误。例如：
> ```java
    if (obj instanceof MountainBike) {
        MountainBike myBike = (MountainBike)obj;
    }
> ```








