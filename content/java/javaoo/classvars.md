# 了解类成员

在本节中，我们将讨论使用static关键字来创建属于类的字段和方法，而不是类的实例。

## 类变量

当从相同的类蓝图创建一些对象时，它们各自具有自己的_实例变量_的不同副本。在Bicycle类中，实例变量是cadence，gear和speed。每个Bicycle对象都有自己的这些变量的值，存储在不同的内存位置。

有时候，你想要有所有对象共有的变量。这是用static修饰语完成的。在其声明中具有static修饰符的字段称为静态字段或类变量。它们与类相关联，而不是与任何对象相关联。类的每个实例共享一个类变量，它位于内存中的一个固定位置。任何对象都可以改变类变量的值，但也可以在不创建类的实例的情况下操作类变量。例如，假设您要创建一些Bicycle对象并分配每个序列号，从第一个对象开始为1。该ID号对于每个对象是唯一的，因此是一个实例变量。同时，您需要一个字段来跟踪Bicycle已创建的对象数量，以便您知道要分配给下一个对象的ID。这样一个领域与任何个体对象无关，而与整个class有关。为此，您需要一个类变量，numberOfBicycles如下所示：

```java
public class Bicycle {
        
    private int cadence;
    private int gear;
    private int speed;
        
    // add an instance variable for the object ID
    private int id;
    
    // 添加一个类变量
    private static int numberOfBicycles = 0;
        ...
}
```

类变量由类名本身引用，如同

```java
Bicycle.numberOfBicycles
````

这使得它们是类变量。

> **注意：**  您也可以使用对象引用引用静态字段
>     `myBike.numberOfBicycles`
> 但是这是不鼓励的，因为它不清楚它们是类变量。

您可以使用Bicycle构造函数设置id实例变量并增加numberOfBicycles类变量：

```java
public class Bicycle {
        
    private int cadence;
    private int gear;
    private int speed;
    private int id;
    private static int numberOfBicycles = 0;
        
    public Bicycle(int startCadence, int startSpeed, int startGear){
        gear = startGear;
        cadence = startCadence;
        speed = startSpeed;

        // 增加自行车的数量
        // 并分配id号
        id = ++numberOfBicycles;
    }

    // 返回实例变量的id方法
    public int getID() {
        return id;
    }
        ...
}
```

## 类方法
Java编程语言支持静态方法以及静态变量。应该使用静态方法在其声明中使用static修饰符，而不需要创建类的实例，如

```java
ClassName.methodName(args)
```

静态方法的常见用途是访问静态字段。例如，我们可以添加静态方法Bicycle来访问numberOfBicycles静态字段：

```java
public static int getNumberOfBicycles() {
    return numberOfBicycles;
}
```

实例和类变量和方法并不是所有的组合：

* 实例方法可以直接访问实例变量和实例方法。
* 实例方法可以直接访问类变量和类方法。
* 类方法可以直接访问类变量和类方法。
* 类方法无法直接访问实例变量或实例方法 - 它们必须使用对象引用。此外，* * 类方法不能使用this关键字，因为没有实例this可以引用。

## 常量

static 和 final组合，也可以用来定义常量。该final修饰符表明这个字段的值不能改变。

例如，以下变量声明定义了一个常数PI，它的值是一个近似值（圆周长与其直径的比值）：

```java
static final double PI = 3.141592653589793;
```

以这种方式定义的常量不能重新分配，如果您的程序尝试这样做，这是一个编译时错误。按照惯例，常数值的名称拼写为大写字母。如果名称由多个单词组成，则单词将以下划线（_）分隔。

> **注意：**  如果一个原始类型或一个字符串被定义为一个常量，并且该值在编译时是已知的，则编译器将使用该值替代该代码中的常量名称。这被称为_编译时常量_。如果外部常量的值发生变化（例如，如果立法规定pi实际上应该是3.975），则需要重新编译使用此常量的任何类来获取当前值。
