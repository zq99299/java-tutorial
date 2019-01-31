# 自动装箱和拆箱
[[toc]]

**自动装箱** 是 Java 编译器在基础类型和相应的对象封装类之间进行的自动转换。
例如，将 int 转换为 Integer，double 转换为 Double 等等。如果转换是另一种方式，则称为 **拆箱**。

这是自动装箱最简单的例子： `Character ch = 'a';`

本节中的其他示例使用泛型。如果您还不熟悉泛型语法，请参阅 [泛型](../generics/) 课程。

考虑下面的代码

```java
List<Integer> li = new ArrayList<>();
for (int i = 1; i < 50; i += 2)
    li.add(i);
```

虽然您将 int 值作为基本类型（而不是整数对象）添加到 li，但代码将进行编译。
因为 li 是 Integer 对象列表，而不是 int 值列表，所以您可能会想知道为什么 Java 编译器不会发出编译时错误。
编译器不会生成错误，因为它会从 i 创建一个 Integer 对象，并将该对象添加到 li 中。
因此，编译器在运行时将以前的代码转换为以下代码：

```java
List<Integer> li = new ArrayList<>();
for (int i = 1; i < 50; i += 2)
    li.add(Integer.valueOf(i));
```

将原始值（例如 int）转换为相应包装类（Integer）的对象称为自动装箱。当一个原始值是以下情况的时候，Java 编译器应用自动装箱：

* 作为参数传递给期望相应包装类的对象的方法。
* 分配给相应的包装类的变量。

考虑以下方法

```java
public static int sumEven(List<Integer> li) {
    int sum = 0;
    for (Integer i: li)
        if (i % 2 == 0)
            sum += i;
        return sum;
}
```

由于余数（%）和一元加号（+=）运算符不适用于 Integer 对象，因此您可能想知道为什么 Java 编译器编译方法时不会发出任何错误。
编译器不会生成错误，因为它在运行时调用 intValue 方法将 Integer 转换为 int：

```java
public static int sumEven(List<Integer> li) {
    int sum = 0;
    for (Integer i : li)
        if (i.intValue() % 2 == 0)
            sum += i.intValue();
        return sum;
}
```

将包装类型（Integer）的对象转换为其对应的基础（int）值称为拆箱。当包装类的对象是以下情况时：Java 编译器应用拆箱

* 作为参数传递给期望相应基元类型值的方法。
* 分配给相应基元类型的变量。

这个 Unboxing 例子显示了这个工作原理：

```java
public class Unboxing {
    public static void main(String[] args) {
        Integer i = new Integer(-8);

        // 1. 通过方法调用拆箱
        int absVal = absoluteValue(i);
        System.out.println("absolute value of " + i + " = " + absVal);

        List<Double> ld = new ArrayList<>();
        ld.add(3.1416);    // 是通过方法调用自动装箱的。

        // 2. 变量赋值拆箱
        double pi = ld.get(0);
        System.out.println("pi = " + pi);
    }

    public static int absoluteValue(int i) {
        return (i < 0) ? -i : i;
    }
}
```

程序打印以下值

```java
absolute value of -8 = 8
pi = 3.1416
```

自动装箱和拆箱可以让开发人员编写更简洁的代码，使其更易于阅读。下表列出了 Java 编译器用于自动装箱和拆箱的基本类型及其对应的包装类：


| Primitive type | Wrapper class |
|----------------|---------------|
| boolean        | Boolean       |
| byte           | Byte          |
| char           | Character     |
| float          | Float         |
| int            | Integer       |
| long           | Long          |
| short          | Short         |
| double         | Double        |
