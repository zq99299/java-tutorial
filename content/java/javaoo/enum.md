# 枚举类型

一个_枚举类型_是一种特殊的数据类型，使一个变量是一组预定义的常量。变量必须等于一个已经预定义的值。常见的例子包括罗盘方向（NORTH，SOUTH，EAST和WEST的值）和一周的几天。

因为它们是常量，枚举类型的字段的名称是大写字母。

在Java编程语言中，您可以使用enum关键字定义枚举类型。例如，您将指定一个星期的枚举类型为：

```java
public enum Day {
    SUNDAY, MONDAY, TUESDAY, WEDNESDAY,
    THURSDAY, FRIDAY, SATURDAY 
}
```

任何时候您需要使用一组固定的常量来使用枚举类型。这包括自然枚举类型，例如我们的太阳系中的行星和数据集，您可以在编译时知道所有可能的值 - 例如菜单上的选项，命令行标志等。

以下是一些代码，显示如何使用上面定义Day的枚举：

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


































