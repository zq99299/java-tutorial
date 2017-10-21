# 声明成员变量

有几种变量：

* 类中的成员变量 - 这些称为_字段_。
* 方法或代码块中的变量 - 这些被称为_局部变量_。
* 方法声明中的变量 - 这些称为_参数_。

Bicycle类使用了以下代码
```java
public int cadence;
public int gear;
public int speed;
```

字段声明由以下三个部分组成：

* 0个或多个修饰符,如 public 或 private
* 字段的类型
* 字段的名称

Bicycle中这些字段被命名为cadence，gear和，speed并且数据类型都是integer（int）。public关键字将这些字段标识为公共成员，任何对象都可访问这些变量。

## 访问修饰符

使用的第一个（最左侧）修饰符可让您控制其他类对成员字段的访问。目前，只考虑public和private。其他访问修饰符将在后面讨论。

* public 修饰符 - 该字段可从所有类访问。
* private 修饰符 - 该字段只能在其自己的类中访问。

以封装的精神，通常使字段私有。这意味着他们只能从Bicycle类直接访问。然而，我们仍然需要访问这些值。这可以通过添加为我们获取字段值的公共方法间接完成：

```java
public class Bicycle {
        
    private int cadence;
    private int gear;
    private int speed;
        
    public Bicycle(int startCadence, int startSpeed, int startGear) {
        gear = startGear;
        cadence = startCadence;
        speed = startSpeed;
    }
        
    public int getCadence() {
        return cadence;
    }
        
    public void setCadence(int newValue) {
        cadence = newValue;
    }
        
    public int getGear() {
        return gear;
    }
        
    public void setGear(int newValue) {
        gear = newValue;
    }
        
    public int getSpeed() {
        return speed;
    }
        
    public void applyBrake(int decrement) {
        speed -= decrement;
    }
        
    public void speedUp(int increment) {
        speed += increment;
    }
}
```

## 类型

所有变量必须有一个类型。您可以使用原始的类型，例如int，float，boolean等你也可以使用引用类型，如字符串，数组或对象。

## 变量名称

所有变量，无论是字段，局部变量还是参数，都遵循语言基础课程“[变量命名](/content/java/nutsandbolts/variables.md)”中涵盖的相同的命名规则和约定 。

在本课中，请注意，方法和类名称使用相同的命名规则和约定，除此之外

* 一个类名的第一个字母应该被大写
* 方法名称中的第一个（或唯一）单词应该是一个动词。