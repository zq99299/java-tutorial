# 什么是类？

在现实世界中，你经常会发现许多单独的对象都是同样的。可能有成千上万的其他自行车存在，所有相同的制造和模型。每辆自行车是由同一套蓝图构成的，因此包含相同的组件。在面向对象的术语，我们说你的自行车是一个**实例**中的**类的对象**被称为自行车。类是从中创建单个对象的蓝图。

下面是自行车类的一种可能的实施方式：

```java
class Bicycle {
    // 节奏
    int cadence = 0;
    // 速度
    int speed = 0;
    // 齿轮
    int gear = 1;

    void changeCadence(int newValue) {
         cadence = newValue;
    }

    void changeGear(int newValue) {
         gear = newValue;
    }

    void speedUp(int increment) {
         speed = speed + increment;   
    }

    void applyBrakes(int decrement) {
         speed = speed - decrement;
    }

    void printStates() {
         System.out.println("cadence:" +
             cadence + " speed:" +
             speed + " gear:" + gear);
    }
}
```

Java 编程语言的语法将看起来很新，但是这个类的设计是基于以前对自行车对象的讨论。字段 cadence，speed 和 gear 表示该对象的状态，并且这些方法（changeCadence，changeGear，speedUp 等）限定与外部世界的相互作用。

您可能已经注意到 Bicycle 该类不包含main方法。这是因为它不是一个完整的应用程序；它只是可能在应用程序中使用的自行车蓝图。创建和使用新 Bicycle 对象的责任属于您的应用程序中的其他类。

这是一个 BicycleDemo 创建两个单独 Bicycle 对象并调用其方法的类：
```java
class BicycleDemo {
    public static void main(String[] args) {

        // 创建两个不同的自行车对象
        Bicycle bike1 = new Bicycle();
        Bicycle bike2 = new Bicycle();

        // 调用这些对象的方法
        bike1.changeCadence(50);
        bike1.speedUp(10);
        bike1.changeGear(2);
        bike1.printStates();

        bike2.changeCadence(50);
        bike2.speedUp(10);
        bike2.changeGear(2);
        bike2.changeCadence(40);
        bike2.speedUp(10);
        bike2.changeGear(3);
        bike2.printStates();
    }
}
```

该测试的输出打印两辆自行车的结束踏板节奏，速度和档位：

```java
cadence:50 speed:10 gear:2
cadence:40 speed:20 gear:3
```
