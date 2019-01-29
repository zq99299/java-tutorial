# 什么是接口
正如你已经学到的，对象通过他们公开的方法来定义与外部世界的交互。方法形成对象与外界的界面 ; 例如，电视机前面的按钮是您和其塑料外壳另一侧的电线之间的接口。按“电源”按钮打开和关闭电视机。

在最场景的形式中，接口是一组具有空体的相关方法。如果指定为接口，自行车的行为可能会显示如下：

```java
interface Bicycle {

    //  每分钟转速
    void changeCadence(int newValue);

    void changeGear(int newValue);

    void speedUp(int increment);

    void applyBrakes(int decrement);
}
```

为了实现这个接口。你的 class 名字会改变（例如，一个特定的自行车平台`ACMEBicycle`）,你会使用关键字`implements`来声明

```java
class ACMEBicycle implements Bicycle {

    int cadence = 0;
    int speed = 0;
    int gear = 1;

   // 您比如全部实现接口中的方法，否则编译器将报错

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

实现接口允许一个类对其承诺提供的行为变得更正式。接口形成了类和外部世界的合同，并且该编译器在构建时强制执行该合同。如果您的类声称实现了一个接口，则该接口定义的所有方法必须在其成功编译之前必须出现在其源代码中。

::: tip
 要实际编译`ACMEBicycle`类，您需要将`public`关键字添加到实现的接口方法的开头。稍后您可以在类和对象和 接口和继承的课程中了解原因 。
:::
