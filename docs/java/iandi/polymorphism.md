# 多态性

字典中的 **多态性** 定义是指生物学中的一个原理，其中生物或物种可以有许多不同的形式或阶段。这个原理也可以应用于面向对象的编程和像 Java 语言这样的语言。类的子类可以定义自己的唯一行为，但是可以共享父类的一些相同的功能。

可以通过对 Bicycle 类稍作修改来演示多态性。例如，可以将一个 printDescription 方法添加到显示当前存储在实例中的所有数据的类中。

```java
public void printDescription(){
    System.out.println("\nBike is " + "in gear " + this.gear
        + " with a cadence of " + this.cadence +
        " and travelling at a speed of " + this.speed + ". ");
}
```

为了演示 Java 语言中的多态特性，Bicycle 使用 MountainBike 和 RoadBikeclass 扩展类。
对于 MountainBike，添加一个字段suspension，这是一个String值，表明如果自行车有一个前减震器 Front。或者，这辆自行车有一个前后减震器 Dual。

```java
public class MountainBike extends Bicycle {
    private String suspension;

    public MountainBike(
               int startCadence,
               int startSpeed,
               int startGear,
               String suspensionType){
        super(startCadence,
              startSpeed,
              startGear);
        this.setSuspension(suspensionType);
    }

    public String getSuspension(){
      return this.suspension;
    }

    public void setSuspension(String suspensionType) {
        this.suspension = suspensionType;
    }

    public void printDescription() {
        super.printDescription();
        System.out.println("The " + "MountainBike has a" +
            getSuspension() + " suspension.");
    }
}
```

请注意重写的 printDescription 方法。除了之前提供的信息之外，有关暂停的其他数据也包含在输出中。

接下来，创建这个 RoadBike 类。由于公路赛车或赛车有稀薄的轮胎，请添加属性以跟踪轮胎宽度。这是 RoadBike：

```java
public class RoadBike extends Bicycle{
    // In millimeters (mm)
    private int tireWidth;

    public RoadBike(int startCadence,
                    int startSpeed,
                    int startGear,
                    int newTireWidth){
        super(startCadence,
              startSpeed,
              startGear);
        this.setTireWidth(newTireWidth);
    }

    public int getTireWidth(){
      return this.tireWidth;
    }

    public void setTireWidth(int newTireWidth){
        this.tireWidth = newTireWidth;
    }

    public void printDescription(){
        super.printDescription();
        System.out.println("The RoadBike" + " has " + getTireWidth() +
            " MM tires.");
    }
}
```

请注意，该 printDescription 方法再一次被覆盖。这次显示有关轮胎宽度的信息。

总之，有三大类：Bicycle、MountainBike 和 RoadBike。这两个子类重写 printDescription 方法并打印唯一信息。

这是一个创建三个 Bicycle 变量的测试程序。每个变量被分配到三个自行车类之一。然后打印每个变量。

```java
public class TestBikes {
  public static void main(String[] args){
    Bicycle bike01, bike02, bike03;

    bike01 = new Bicycle(20, 10, 1);
    bike02 = new MountainBike(20, 10, 5, "Dual");
    bike03 = new RoadBike(40, 20, 8, 23);

    bike01.printDescription();
    bike02.printDescription();
    bike03.printDescription();
  }
}
```

以下是测试程序的输出：

```java
Bike is in gear 1 with a cadence of 20 and travelling at a speed of 10.

Bike is in gear 5 with a cadence of 20 and travelling at a speed of 10.
The MountainBike has a Dual suspension.

Bike is in gear 8 with a cadence of 40 and travelling at a speed of 20.
The RoadBike has 23 MM tires.
```

Java 虚拟机（JVM）为每个变量中引用的对象调用适当的方法。它不调用变量类型定义的方法。这种行为被称为 **虚拟方法调用**，并演示了 Java 语言中重要的多态特性的一个方面。
