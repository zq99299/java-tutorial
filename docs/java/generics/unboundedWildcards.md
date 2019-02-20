# 无界通配符

无界通配符类型使用通配符（?）指定，例如 `List <?>`。这被称为未知类型的列表。
有两种情况，一个无界通配符是一个有用的方法：

* 如果您正在编写一个可以使用 Object 类中提供的功能实现的方法。
* 当代码使用泛型类中不依赖于类型参数的方法时。

    例如，List.size 或 List.clear。事实上，`Class<?>` 被如此经常使用，因为 `Class<T>` 大多数的方法中不依赖于 T。

考虑下面的 printList 方法：

```java
public static void printList(List<Object> list) {
    for (Object elem : list)
        System.out.println(elem + " ");
    System.out.println();
}
```

printList 的目标是打印任何类型的列表，但是它无法实现这个目标 - 它仅打印一个 Object 实例列表;
它不能打印 `List <Integer>`、`List <String>`、`List <Double>` 等，因为它们不是 `List <Object>` 的子类型。
要写一个通用的 printList 方法，使用 `List <?>`

```java
public static void printList(List<?> list) {
    for (Object elem: list)
        System.out.print(elem + " ");
    System.out.println();
}
```

因为对于任何具体类型 A，`List <A>` 是 `List <?>` 的子类型，所以可以使用 printList 打印任何类型的列表：

```java
List<Integer> li = Arrays.asList(1, 2, 3);
List<String>  ls = Arrays.asList("one", "two", "three");
printList(li);
printList(ls);
```

::: tip
Arrays.asList 这个静态工厂方法转换指定的数组并返回一个固定大小的列表。

`List <Object>` 和 `List <?>` 是不一样的。您可以将对象或任何对象的子类型插入到 `List <Object>` 中。
但是，只能将 null 插入到 `List <?>` 中。「通配符使用指南」部分提供了有关如何确定在给定情况下应使用哪种通配符（如果有）的更多信息。
:::
