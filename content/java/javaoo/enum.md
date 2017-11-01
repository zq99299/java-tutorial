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