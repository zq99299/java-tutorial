# 上界通配符

您可以使用上界的通配符来放宽对变量的限制。例如，假设你想要写上奏效的方法是 `List <Integer>` 、
`List<Double>` 和  `List<Number>`；你可以通过使用上界的通配符来实现这一点。

要声明上界通配符，请使用通配符「?」，接着是 extends 关键字，后跟上边界。

如：

```java
List<? extends Number>
List<Number>
```
第一个可以接收任何 Number 的子类（包括 Number）list，而第二个只能接收 Number list

考虑以下过程方法：

```java
public static void process(List<? extends Foo> list) { /* ... */ }
```

`List<? extends Foo>` 匹配 Foo 本身极其子类，process 可以方访问 Foo 元素

```java
public static void process(List<? extends Foo> list) {
    for (Foo elem : list) {
        // ...
    }
}
```

在 foreach 子句中，elem 变量迭代列表中的每个元素。任何在 Foo 类中定义的方法现在都可以在 elem 上使用。

该 sumOfList 方法返回一个列表中的数字的总和：

```java
public static double sumOfList(List<? extends Number> list) {
    double s = 0.0;
    for (Number n : list)
        s += n.doubleValue();
    return s;
}
```

以下代码使用 Integer 对象列表打印 sum = 6.0：

```java
List<Integer> li = Arrays.asList(1, 2, 3);
System.out.println("sum = " + sumOfList(li));
```

Double 值的列表可以使用相同的 sumOfList 方法。以下代码打印 sum = 7.0：

```java
List<Double> ld = Arrays.asList(1.2, 2.3, 3.5);
System.out.println("sum = " + sumOfList(ld));
```
