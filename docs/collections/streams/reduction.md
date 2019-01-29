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

reduce操作始终返回一个新值。但是，累加器函数每次处理流的元素时都会返回一个新值。假设你想把一个流的元素reduce到一个更复杂的对象，比如一个集合。这可能会妨碍您的应用程序的性能。如果您的reduce操作涉及向集合中添加元素，则每当您的累加器函数处理元素时，都会创建一个包含该元素的新集合，效率低下。相反，更新现有的集合会更有效率。你可以用Stream.collect下一节描述的方法来做到这一点 。


## Stream.collect 方法

与reduce处理元素时始终创建新值的方法不同，collect方法修改或改变现有值。

考虑如何找到流中的平均值。您需要两个数据：总数值和这些值的总和。但是，与reduce方法和所有其他约简方法一样，该collect方法只返回一个值。您可以创建一个包含成员变量的新数据类型，这些成员变量跟踪值的总数和这些值的总和，如以下类 Averager：

```java
public class Averager implements IntConsumer {
    private int total = 0;
    private int count = 0;

    public double average() {
        return count > 0 ? ((double) total) / count : 0;
    }

    @Override
    public void accept(int i) {
        total += i;
        count++;
    }

    public void combine(Averager other) {
        total += other.total;
        count += other.count;
    }
}
```

下面的管道使用Averager类和collect方法来计算所有男性成员的平均年龄：

```java
        Averager averageCollect = roster.stream()
                .filter(p -> p.getGender() == Person.Sex.MALE)
                .map(Person::getAge)
                .collect(Averager::new, Averager::accept, Averager::combine);

        System.out.println("Average age of male members: " +
                                   averageCollect.average());
```

collect这个例子中的操作有三个参数：

* supplier：

    供应商是工厂职能; 它构造了新的实例。对于collect操作，它创建结果容器的实例。在这个例子中，它是这个Averager类的一个新实例。
* accumulator:

    累加器函数将流元素合并到结果容器中。在这个例子中，它Averager通过将count变量加1来修改结果容器，并向total成员变量添加流元素的值，该元素是表示男性成员年龄的整数。
* combiner：

    组合函数需要两个结果容器并合并它们的内容。在这个例子中，修改一个 Averager通过递增结果容器count由变量count的其他的成员变量Averager实例，并增加了total构件变量的其他的值Averager实例的total成员变量。---- 这个没有明白是什么？？？？？
    
    
请注意以下几点：

* 供应商是lambda表达式（或方法引用），而不是像reduce操作中的标识元素那样的值。
* 累加器和组合器功能不返回一个值。
* 您可以使用collect并行流的操作; 有关更多信息，请参见Parallelism部分 。（如果collect使用并行流运行该方法，那么只要组合器函数创建一个新对象（如Averager本例中的一个对象），JDK就会创建一个新线程，因此您不必担心同步。

尽管JDK为您提供了average计算流中元素平均值的collect操作，但是如果您需要从流元素计算多个值，则可以使用collect操作和自定义类。

该collect操作最适合收藏。以下示例使用以下collect操作将男性成员的姓名放入集合中：

```java
        List<String> namesOfMaleMembersCollect = roster
                .stream()
                .filter(p -> p.getGender() == Person.Sex.MALE)
                .map(p -> p.getName())
                .collect(Collectors.toList());
```

这个版本的collect操作需要一个Collector类型的参数 。该类在collect需要三个参数（供应商，累加器和组合器函数）的操作中封装用作参数的函数。

 Collectors类包含了许多有用的reduce操作，如累加元件到集合并且根据不同的标准总结元件。这些约简操作返回Collector类的实例，所以可以将它们用作collect操作的参数。
 
 这个例子使用 Collectors.toList操作，它将流元素累加到一个新的实例中List。与Collectors类中的大多数操作一样，toList操作符返回的Collector不是集合的实例。
 
 
以下示例roster按性别分组收集成员：

```java
        Map<Person.Sex, List<Person>> byGender =
                roster
                        .stream()
                        .collect(
                                Collectors.groupingBy(Person::getGender));
```
groupingBy操作返回一个Map，其键是通过应用指定的lambda表达式作为其参数（称为分类函数）而得到的值。在这个例子中，返回的map包含两个键，Person.Sex.MALE和Person.Sex.FEMALE。键的相应值是List包含流分析元素的实例，当由分类函数处理时，该元素对应于键值。例如，对应于键的值Person.Sex.MALE是List包含所有男性成员的实例。

以下示例检索roster集合中每个成员的名称，并按性别进行分组：

```java
        Map<Person.Sex, List<String>> namesByGender =
                roster
                        .stream()
                        .collect(
                                Collectors.groupingBy(
                                        Person::getGender,
                                        Collectors.mapping(
                                                Person::getName,
                                                Collectors.toList())));
```


groupingBy在这个例子中的 操作需要两个参数，一个分类函数和一个Collector实例。Collector参数称为_下游收集器_。这是Java运行时应用于其他收集器结果的收集器。因此，此groupingBy操作使您可以将collect方法应用于List由groupingBy操作员创建的值。此示例应用收集器mapping，该收集器 将映射函数应用于Person::getName流的每个元素。因此，结果流只包含成员的名称。包含一个或多个下游收集器的管道（如本例）称为多级reduce。


以下示例检索每个性别成员的总年龄：

```java
        Map<Person.Sex, Integer> totalAgeByGender =
                roster
                        .stream()
                        .collect(
                                Collectors.groupingBy(
                                        Person::getGender,
                                        Collectors.reducing(
                                                0,
                                                Person::getAge,
                                                Integer::sum)));
```

reducing操作有三个参数：

* identity：

   与Stream.reduce 一样，标识元素既是reduce的初始值，也是流中没有元素的默认结果。在这个例子中，标识元素是0; 如果roster集合中不存在成员，则这是年龄总和和默认值的初始值。
   
* mapper：

   reducing操作将此映射器函数应用于所有流元素。在这个例子中，mapper检索每个成员的年龄。
   
* operation：

   操作函数用于reduce映射值。在这个例子中，操作函数添加了Integer值。

以下示例检索每个性别成员的平均年龄：

```java
 Map<Person.Sex, Double> averageAgeByGender = roster
                .stream()
                .collect(
                        Collectors.groupingBy(
                                Person::getGender,
                                Collectors.averagingInt(Person::getAge)
                        ));
```
