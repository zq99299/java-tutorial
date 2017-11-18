# 使用关键字 super


## 访问超类成员

如果你的方法覆盖了它的一个超类的方法，你可以通过使用关键字super来调用重写的方法。您也可以使用super引用隐藏字段（虽然不鼓励隐藏字段）。考虑这个类，Superclass：

```java
public class Superclass {

    public void printMethod() {
        System.out.println("Printed in Superclass.");
    }
}
```

是一个叫做Subclass的子类，它覆盖了printMethod()：

```java
public class Subclass extends Superclass {

    // overrides printMethod in Superclass
    public void printMethod() {
        super.printMethod();
        System.out.println("Printed in Subclass");
    }
    public static void main(String[] args) {
        Subclass s = new Subclass();
        s.printMethod();    
    }
}
```

其中Subclass，简单名称printMethod()是指在其中声明的名称，该名称将覆盖Superclass其中的名称。所以，要引用从printMethod()继承Superclass，Subclass必须使用一个合格的名称，使用super如图所示。编译和执行Subclass打印如下：

```java
Printed in Superclass.
Printed in Subclass
```

## 子构造

以下示例说明如何使用super关键字来调用超类的构造函数。回想一下这个 Bicycle 例子的一个子类MountainBike。这里是MountainBike（子类）调用超类构造函数的构造函数，然后添加自己的初始化代码：

```java
public MountainBike(int startHeight, 
                    int startCadence,
                    int startSpeed,
                    int startGear) {
    super(startCadence, startSpeed, startGear);
    seatHeight = startHeight;
}   
```

调用超类的构造函数必须是子类构造函数的第一行。

调用超类构造函数的语法是

```java
super();  
or:
super(parameter list);
```

`super()`，超类无参数构造函数被调用。用`super(parameter list)`，带有匹配参数列表的超类构造函数被调用。

> **注意：**

> 如果构造函数没有显式地调用超类构造函数，那么Java编译器会自动插入对超类的无参构造函数的调用。如果超类没有没有参数的构造函数，你会得到一个编译时错误。Object 确实有这样的构造函数，所以如果Object是唯一的超类，没有问题。


如果一个子类的构造函数调用了它的父类的构造函数，无论是显式的还是隐式的，你可能会认为将会有一整个调用的构造函数链，一直返回到构造函数Object。事实上，情况就是如此。它被称为_构造函数链_，并且当需要长时间的类下降时需要注意它。