# 上界通配符

您可以使用上界的通配符来放宽对变量的限制。例如，假设你想要写上奏效的方法是`List <Integer>` ，`List<Double>`，和 `List<Number>` ; 你可以通过使用上界的通配符来实现这一点。

要声明上界通配符，请使用通配符（'?'），接着是extends关键字，后跟上边界。请注意，在这种情况下，extends在一般意义上用来表示“继承”（如在类中）或“实现”（如在接口中）。

如：

```java
List<? extends Number>
List<Number>
```
第一个可以接收任何 Number的子类（包括Number）list，而第二个只能接收Number list

考虑以下过程方法：

```java
public static void process(List<? extends Foo> list) { /* ... */ }
```

`List<? extends Foo>` 匹配Foo本身极其子类，process可以方访问Foo元素

```java
public static void process(List<? extends Foo> list) {
    for (Foo elem : list) {
        // ...
    }
}
```

在foreach子句中，elem变量迭代列表中的每个元素。任何在Foo类中定义的方法现在都可以在elem上使用。

该sumOfList方法返回一个列表中的数字的总和：

```java
public static double sumOfList(List<? extends Number> list) {
    double s = 0.0;
    for (Number n : list)
        s += n.doubleValue();
    return s;
}
```

以下代码使用Integer对象列表打印sum = 6.0：

```java
List<Integer> li = Arrays.asList(1, 2, 3);
System.out.println("sum = " + sumOfList(li));
```

Double值 的列表可以使用相同的sumOfList方法。以下代码打印sum = 7.0：

```java
List<Double> ld = Arrays.asList(1.2, 2.3, 3.5);
System.out.println("sum = " + sumOfList(ld));
```

