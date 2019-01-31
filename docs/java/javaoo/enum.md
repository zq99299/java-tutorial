# 枚举类型

一个 **枚举类型** 是一种特殊的数据类型，使一个变量是一组预定义的常量。变量必须等于一个已经预定义的值。常见的例子包括罗盘方向（NORTH、SOUTH、EAST 和 WEST 的值）和一周的几天。

因为它们是常量，枚举类型的字段的名称是大写字母。

在 Java 编程语言中，您可以使用 enum 关键字定义枚举类型。例如，您将指定一个星期的枚举类型为：

```java
public enum Day {
    SUNDAY, MONDAY, TUESDAY, WEDNESDAY,
    THURSDAY, FRIDAY, SATURDAY
}
```

任何时候您需要使用一组固定的常量来使用枚举类型。这包括自然枚举类型，例如我们的太阳系中的行星和数据集，您可以在编译时知道所有可能的值 - 例如菜单上的选项，命令行标志等。

以下是一些代码，显示如何使用上面定义 Day 的枚举：

```java
public class EnumTest {
    Day day;

    public EnumTest(Day day) {
        this.day = day;
    }

    public void tellItLikeItIs() {
        switch (day) {
            case MONDAY:
                System.out.println("星期一是糟糕的");
                break;

            case FRIDAY:
                System.out.println("星期五是最爽的");
                break;

            case SATURDAY:
            case SUNDAY:
                System.out.println("周末是最最安逸的");
                break;

            default:
                System.out.println("其他时间一般");
                break;
        }
    }

    public static void main(String[] args) {
        EnumTest firstDay = new EnumTest(Day.MONDAY);
        firstDay.tellItLikeItIs();
        EnumTest thirdDay = new EnumTest(Day.WEDNESDAY);
        thirdDay.tellItLikeItIs();
        EnumTest fifthDay = new EnumTest(Day.FRIDAY);
        fifthDay.tellItLikeItIs();
        EnumTest sixthDay = new EnumTest(Day.SATURDAY);
        sixthDay.tellItLikeItIs();
        EnumTest seventhDay = new EnumTest(Day.SUNDAY);
        seventhDay.tellItLikeItIs();
    }
}
```

程序输出

```java
星期一是糟糕的
其他时间一般
星期五是最爽的
周末是最最安逸的
周末是最最安逸的
```

Java 编程语言枚举类型比其他语言的类型更强大。该 enum 声明定义一个类（称为枚举类型）。枚举类体可以包括方法和其他字段。当它创建一个枚举时，编译器会自动添加一些特殊的方法。例如，它们有一个静态 values 方法，它返回一个包含枚举所有值的数组，并按它们被声明的顺序。该方法通常与 `for-each` 结构组合使用以迭代枚举类型的值。例如，下面的 Planet 类示例中的代码遍历太阳系中的所有行星。

```java
for (Planet p : Planet.values()) {
    System.out.printf("Your weight on %s is %f%n",
                      p, p.surfaceWeight(mass));
}
```

::: tip
所有枚举都会隐式继承 java.lang.Enum。因为一个类只能继承一个父类（请参阅 [声明类](./classdecl.md)），所以 Java 语言不支持状态的多重继承（请参见 [多重继承](../iandi/multipleinheritance.md)），因此枚举不能继承其他任何内容。
:::

在以下示例中，Planet 是表示太阳系中行星的枚举类型。它们被定义为具有恒定的质量和半径属性。

每个枚举常数都被声明为质量和半径参数的值。当创建常量时，这些值将传递给构造函数。Java 要求在任何字段或方法之前首先定义常量。此外，当有字段和方法时，枚举常量的列表必须以分号结尾。

::: tip
枚举类型的构造函数必须是包私有或私有访问。它会自动创建在枚举正文开头定义的常量。你不能自己调用​​枚举构造函数。
:::

```java
public enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    EARTH(5.976e+24, 6.37814e6),
    MARS(6.421e+23, 3.3972e6),
    JUPITER(1.9e+27, 7.1492e7),
    SATURN(5.688e+26, 6.0268e7),
    URANUS(8.686e+25, 2.5559e7),
    NEPTUNE(1.024e+26, 2.4746e7);

    private final double mass;   // in kilograms
    private final double radius; // in meters

    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }

    private double mass() {
        return mass;
    }

    private double radius() {
        return radius;
    }

    // universal gravitational constant  (m3 kg-1 s-2)
    public static final double G = 6.67300E-11;

    double surfaceGravity() {
        return G * mass / (radius * radius);
    }

    double surfaceWeight(double otherMass) {
        return otherMass * surfaceGravity();
    }

    public static void main(String[] args) {
        args = new String[1];
        args[0] = "175";
        if (args.length != 1) {
            System.err.println("Usage: java Planet <earth_weight>");
            System.exit(-1);
        }
        double earthWeight = Double.parseDouble(args[0]);
        double mass = earthWeight / EARTH.surfaceGravity();
        for (Planet p : Planet.values())
            System.out.printf("Your weight on %s is %f%n",
                              p, p.surfaceWeight(mass));
    }
}

```

程序输出

```java
Your weight on MERCURY is 66.107583
Your weight on VENUS is 158.374842
Your weight on EARTH is 175.000000
Your weight on MARS is 66.279007
Your weight on JUPITER is 442.847567
Your weight on SATURN is 186.552719
Your weight on URANUS is 158.397260
Your weight on NEPTUNE is 199.207413
```

虽然我不知道上面到底是在计算什么。但是枚举的用法就如上，和普通对象类似，只是不能在外部实例化。
