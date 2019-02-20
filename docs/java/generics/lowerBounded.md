# 下届通配符

[上界通配符](./upperBounded.md) 部分显示上界通配符将未知类型限制为特定类型或该类型的子类型，
并使用 extends 关键字来表示。以类似的方式，下限的通配符将未知类型限制为该类型的特定类型或超类型。

使用通配符（?）表示较低的有界通配符，紧随其后的是 super 关键字，紧跟其下界：`<? super A>`。

::: tip
您可以为通配符指定上界，也可以指定下界，但不能同时指定两者。
:::

假设你想写一个把 Integer 对象放入列表的方法。为了最大限度地提高灵活性，您希望方法在 `List <Integer>`、`List <Number>` 和 List `<Object>` 上工作 - 任何可以保存 Integer 值的东西。

要编写在 Integer 列表和 Integer 的超类型（例如 Integer、Number 和 Object）上工作的方法，
您可以指定 `List<? super Integer>`。
`List <Integer>` 和 `List<? super Integer>`，因为前者只匹配 Integer 类型的列表，而后者匹配任何 Integer 类型的任何类型的列表。

以下代码将数字 1 到 10 添加到列表的末尾：

```java
public static void addNumbers(List<? super Integer> list) {
    for (int i = 1; i <= 10; i++) {
        list.add(i);
    }
}
```

通配符使用指南部分提供有关何时使用上界通配符以及何时使用下界通配符指导。
