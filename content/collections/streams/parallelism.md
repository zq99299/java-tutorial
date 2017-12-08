# parallelism

并行计算包括将问题分解为子问题，同时解决这些问题（并行地，每个子问题在一个单独的线程中运行），然后将解决方案的结果结合到子问题中。Java SE提供了 [fork / join框架](/content/essential/concurrency/forkjoin.md)，使您能够更轻松地在您的应用程序中实现并行计算。但是，在这个框架下，您必须指定问题如何细分（分区）。通过聚合操作，Java运行时为您执行此分区和解决方案的组合。

在使用集合的应用程序中实现并行性的一个难点是集合不是线程安全的，这意味着多个线程不能在不引入[线程干扰](/content/essential/concurrency/interfere.md)或 [内存一致性错误](/content/essential/concurrency/memconsist.md)的情况下操作集合 ，Collections Framework提供了 [同步包装器](/content/collections/implementations/wrapper.md)，它可以将自动同步添加到任意集合中，从而保证线程安全,但是，同步引入了 [线程争用](/content/essential/concurrency/sync.md)。你想避免线程争用，因为它阻止了线程并行运行。集合操作和并行流使您可以实现非线程安全集合的并行性，只要您在操作集合时**不要修改集合**。


请注意，并行性不会比连续执行操作的速度快，但可能是因为您拥有足够的数据和处理器内核。虽然汇总操作使您可以更轻松地实现并行性，但仍然有责任确定您的应用程序是否适合并行。

本节涵盖以下主题：

* 并行执行流
* 并发Reduction
* 订购
* 副作用
    * 怠惰
    * 干扰
    * 有状态的Lambda表达式
    
## 并行执行流
您可以串行或并行执行流。当一个流并行执行时，Java运行时将流分成多个子流。聚合操作并行迭代并处理这些子流，然后合并结果。

创建流时，除非另有说明，否则它始终是串行流。要创建并行流，请调用该操作 Collection.parallelStream。或者，调用该操作 BaseStream.parallel。例如，下面的语句计算所有男性成员的平均年龄：

```java
double average = roster
                .parallelStream()
                .filter(p -> p.getGender() == Person.Sex.MALE)
                .mapToInt(Person::getAge)
                .average()
                .getAsDouble();
```

## 并发Reduction
再次考虑下面的例子（在[Reduction](/content/collections/streams/reduction.md)部分中描述 ），按性别对成员进行分组。这个例子调用这个collect操作，这个操作将roster Reduction 为一个 Map：

```java
Map<Person.Sex, List<Person>> byGender =
    roster
        .stream()
        .collect(
            Collectors.groupingBy(Person::getGender));

下面是等价的并行流

ConcurrentMap<Person.Sex, List<Person>> byGender =
    roster
        .parallelStream()
        .collect(
            Collectors.groupingByConcurrent(Person::getGender));
```

这被称为并发Reduction。如果对于包含该collect操作的特定管道，以下所有条件都成立，则Java运行时将执行并发Reduction：

* 流是并行的
* collect操作参数收集器具有这个特点 Collector.Characteristics.CONCURRENT。要确定收集器的特性，请调用该 Collector.characteristics方法。
* 流是无序的，或者收集器有特征 Collector.Characteristics.UNORDERED。为了确保流是无序的，调用该 BaseStream.unordered操作。

> 注意：这个例子返回的是一个ConcurrentMap实例，而不是Map和调用 groupingByConcurrent 操作。与groupingBy操作不同

## 顺序

流水线处理流元素的顺序取决于流是以串行还是并行方式执行，流的来源和中间操作。例如，考虑下面的例子中，打印的实例中的元素ArrayList与forEach操作几次：

```java
        // 正常顺序的普通流
        Integer[] intArray = {1, 2, 3, 4, 5, 6, 7, 8};
        List<Integer> listOfIntegers =
                new ArrayList<>(Arrays.asList(intArray));

        System.out.println("listOfIntegers:");
        listOfIntegers
                .stream()
                .forEach(e -> System.out.print(e + " "));
        System.out.println("");
        
        // 顺序颠倒之后的普通流
        System.out.println("listOfIntegers sorted in reverse order:");
        Comparator<Integer> normal = Integer::compare;
        Comparator<Integer> reversed = normal.reversed();
        Collections.sort(listOfIntegers, reversed);
        listOfIntegers
                .stream()
                .forEach(e -> System.out.print(e + " "));
        System.out.println("");

        // 并行流
        System.out.println("Parallel stream");
        listOfIntegers
                .parallelStream()
                .forEach(e -> System.out.print(e + " "));
        System.out.println("");

        // 并行流
        System.out.println("Another parallel stream:");
        listOfIntegers
                .parallelStream()
                .forEach(e -> System.out.print(e + " "));
        System.out.println("");

        // 并行流且保证迭代顺序
        System.out.println("With forEachOrdered:");
        listOfIntegers
                .parallelStream()
                .forEachOrdered(e -> System.out.print(e + " "));
        System.out.println("");
```
输出

```java
1 2 3 4 5 6 7 8 
listOfIntegers sorted in reverse order:
8 7 6 5 4 3 2 1 
Parallel stream
3 4 1 2 6 5 7 8 
Another parallel stream:
3 4 1 2 7 8 5 6 
With forEachOrdered:
8 7 6 5 4 3 2 1 
```