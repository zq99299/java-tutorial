# reduction

在上一小节中介绍了怎么计算一个集合中的平均年龄

```java
double average = roster
                .stream()
                .filter(p -> p.getGender() == Person.Sex.MALE)
                .mapToInt(Person::getAge)
                .average()
                .getAsDouble();
```

JDK包含许多终端的操作（如 average， sum， min， max，和 count通过组合一个流的内容返回一个值，在 java.util.stream.IntStream中）。这些操作被称为_reduce操作_。JDK还包含返回集合而不是单个值的简化操作。许多简化操作执行特定任务，例如查找值的平均值或将元素分组到各个类别中。然而，JDK提供了通用操作 reduce和 collect，此节详细介绍。

本节涵盖以下主题：

Stream.reduce 方法
Stream.collect 方法

## Stream.reduce 方法

该 Stream.reduce方法是通用的reduce操作。考虑以下管道，它计算roster集合中男性成员年龄的总和。它使用 Stream.sum简化操作：

```java
int sum = roster
                .stream()
                .filter(p -> p.getGender() == Person.Sex.MALE)
                .mapToInt(Person::getAge)
                .sum();
```

将其与以下管道进行比较，该管道使用该Stream.reduce操作来计算相同的值：

```java
Integer totalAge = roster
                .stream()
                .map(Person::getAge)
                .reduce(
                        0,
                        (a, b) -> a + b);
```

reduce这个例子中的操作有两个参数：

* identity：

   标识元素既是reduce的初始值，也是流中没有元素的默认结果。在这个例子中，标识元素是0; 如果roster集合中不存在成员，则这是年龄总和和默认值的初始值。
   
* accumulator：

  累加器函数有两个参数：reduce的部分结果（在本例中为所有已处理整数的总和）和流的下一个元素（在本例中为整数）。它返回一个新的部分结果。在这个例子中，累加器函数是一个lambda表达式，它添加了两个Integer值并返回一个Integer值：
  
  ```java
   （a，b）→a + b
  ```

  这样写就明白了。

  ```java
   roster
    .stream()
    .map(Person::getAge)
    .reduce(
        0,
        (a, b) -> {
            return a + b;
        });
  ```
  reduce通用的提供操作，这个累加器的第一个参数就是上一次计算的结果，和下一个元素的值

## Stream.collect 方法

