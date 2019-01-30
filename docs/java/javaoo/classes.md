# 类

[面向对象编程概念](../concepts/) 课程中面向对象概念的介绍以自行车类为例，山地自行车和串联自行车作为子类。 以下是可能实现 Bicycle 的代码，给你一个类声明的概述，本课程后续部分将陆续介绍，暂时不要关系这个细节

```java
public class Bicycle {

    // 自行车类有三个字段
    public int cadence;
    public int gear;
    public int speed;

    // 还有一个构造
    public Bicycle(int startCadence, int startSpeed, int startGear) {
        gear = startGear;
        cadence = startCadence;
        speed = startSpeed;
    }

    // 4个方法
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

MountainBike 作为 Bicycle 的子类可能看起来像这样

```java
public class MountainBike extends Bicycle {

    public int seatHeight;
    public MountainBike(int startHeight, int startCadence,
                        int startSpeed, int startGear) {
        super(startCadence, startSpeed, startGear);
        seatHeight = startHeight;
    }   
    public void setHeight(int newValue) {
        seatHeight = newValue;
    }   

}
```

MountainBike 继承了自行车的所有领域和方法，并添加了场地高度和一种设置方法（山地自行车具有可根据地形要求上下移动的座椅）。
