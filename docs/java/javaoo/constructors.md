# 为您的 class 提供构造
一个类包含被调用以从类蓝图创建对象的构造函数。构造函数声明看起来像方法声明，除了它们使用类的名称并且没有返回类型。例如，Bicycle 有一个构造函数：

```java
public Bicycle(int startCadence, int startSpeed, int startGear) {
    gear = startGear;
    cadence = startCadence;
    speed = startSpeed;
}
```

要创建一个 Bicycle 被调用的新对象 myBike，new 运算符调用一个构造函数：

```java
Bicycle myBike = new Bicycle(30, 0, 8);  // 为对象创建内存空间并初始化其字段。
```

虽然 Bicycle 只有一个构造函数，它可以有其他的，包括一个无参数的构造函数：

```java
public Bicycle() {
    gear = 1;
    cadence = 10;
    speed = 0;
}
```

`Bicycle yourBike = new Bicycle();` 调用无参数构造函数来创建一个新的 Bicycle 对象 yourBike。

两个构造函数都可以被声明为 Bicycle 因为它们有不同的参数列表。与方法一样，Java 平台根据列表中的参数数量及其类型来区分构造函数。您不能为同一个类写入两个具有相同数量和类型的参数的构造函数，因为该平台将无法将它们分开。这样做会导致编译时错误。

您不必为类提供任何构造函数，但在执行此操作时必须小心。编译器自动为没有构造函数的任何类提供无参数，默认构造函数。这个默认构造函数将调用超类的无参数构造函数。在这种情况下，如果超类没有无参数的构造函数，编译器将会报错，因此您必须验证它是否正确。如果你的类没有明确的超类，那么它有一个隐含的超类 Object，它确实有一个无参数的构造函数。

您可以自己使用超类构造函数。在本课的开头  MountainBike 类就是这样做的。稍后将介绍接口和继承的课程。

您可以在构造函数声明中使用访问修饰符来控制哪些其他类可以调用构造函数。

::: tip
如果另一个类不能调用 MyClass 构造函数，它不能直接创建 MyClass 对象。
:::
