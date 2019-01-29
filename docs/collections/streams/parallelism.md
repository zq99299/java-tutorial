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

此示例执行以下操作：
* 第一个管道listOfIntegers按照它们被添加到列表中的顺序打印列表的元素。
* 第二个管道listOfIntegers打印Collections.sort方法排序后 的元素
* 第三条和第四条管道以明显随机的顺序打印列表中的元素。请记住，流操作在处理流的元素时使用内部迭代。因此，当并行执行流时，Java编译器和运行时确定处理流元素的顺序，以最大限度地发挥并行计算的优点，除非流操作另有指定。
* 第五个管道使用forEachOrdered方法，它不管是以串行还是并行方式执行流，都按照源的指定顺序处理流的元素。请注意，如果使用forEachOrdered并行流等操作，则可能会失去并行性的好处。


## 副作用

如果一个方法或表达式除了返回或产生一个值，还会修改计算机的状态，这有一个副作用。示例包括可变reduction 以及调用System.out.println调试方法。JDK很好地处理了管道中的某些副作用。具体而言，该collect方法被设计为以并行安全的方式执行具有副作用的最常见的流操作。操作喜欢forEach和peek被设计为副作用; 返回void的lambda表达式，例如调用的void表达式，System.out.println除了产生副作用外，什么也不做。即使如此，你应该使用forEach和peek小心操作; 如果将这些操作之一用于并行流，那么Java运行时可能会从多个线程同时调用您作为其参数同时指定的lambda表达式。另外，绝对不要传递参数lambda表达式，这些表达式在诸如filter和之类的操作中有副作用map。以下部分讨论干扰和有状态的lambda表达式，这两个表达式可能是副作用的来源，并可能返回不一致或不可预知的结果，特别是在并行流中。然而，首先讨论懒惰的概念，因为它对干扰有直接的影响。

### 怠惰

所有的中间操作都是_懒惰_的。表达式，方法或算法只有在需要时才计算其值。（如果算法立即进行评估或处理，则算法是急切的）。中间操作是懒惰的，因为在终端操作开始之前，中间操作不会开始处理流的内容。处理流懒惰地使Java编译器和运行时能够优化它们如何处理流。例如，在一个管道，如filter- mapToInt- average在部分描述的示例 聚合操作中，average操作可能获得从由所述创建的流的第几个整数mapToInt操作，这从获得的元素filter的操作。该average 操作会重复这个过程，直到从流中获得所有必需的元素，然后计算平均值。

## 干扰

流操作中的Lambda表达式不应该受到干扰。当一个流的源被修改而一个流水线处理流时发生干扰。例如，下面的代码尝试连接包含在字符串中的字符串List listOfStrings。但是，它抛出了一个ConcurrentModificationException：

```java
try {
            List<String> listOfStrings =
                    new ArrayList<>(Arrays.asList("one", "two"));

            // This will fail as the peek operation will attempt to add the
            // string "three" to the source after the terminal operation has
            // commenced. 

            String concatenatedString = listOfStrings
                    .stream()

                    // 不要这样做，干扰发生在这里
                    .peek(s -> listOfStrings.add("three"))

                    .reduce((a, b) -> a + " " + b)
                    .get();

            System.out.println("Concatenated string: " + concatenatedString);

        } catch (Exception e) {
            System.out.println("Exception caught: " + e.toString());
        }
```

reduce操作，这是一个终端的操作。但是，这里的管道调用中间操作peek，试图添加一个新元素listOfStrings。请记住，所有的中间操作都是懒惰的。这意味着这个例子中的流水线在get调用操作时开始执行，并在get操作完成时结束执行。该peek操作的参数尝试在流水线执行期间修改流源，这将导致Java运行时抛出一个ConcurrentModificationException。

peek 经过测试，流在遍历元素的时候，都会调用一次该方法


## 有状态的Lambda表达式

避免使用有状态的lambda表达式作为流操作中的参数。有状态的lambda表达式的结果取决于在执行流水线期间可能会改变的任何状态。以下示例使用中间操作List listOfIntegers向新List实例添加元素map。它执行两次，首先是一个串行流，然后是一个并行流：

```java
        List<Integer> listOfIntegers =
                new ArrayList<>(Arrays.asList(8, 7, 6, 5, 4, 3, 2, 1));
        List<Integer> serialStorage = new ArrayList<>();

        System.out.println("Serial stream:");
        listOfIntegers
                .stream()

                // 不要这样做，使用一个有状态的拉姆达表达式
                .map(e -> {
                    serialStorage.add(e);
                    return e;
                })

                .forEachOrdered(e -> System.out.print(e + " "));
        System.out.println("");

        serialStorage
                .stream()
                .forEachOrdered(e -> System.out.print(e + " "));
        System.out.println("");

        System.out.println("Parallel stream:");
        List<Integer> parallelStorage = Collections.synchronizedList(
                new ArrayList<>());
        listOfIntegers
                .parallelStream()

                // Don't do this! It uses a stateful lambda expression.
                .map(e -> {
                    parallelStorage.add(e);
                    return e;
                })

                .forEachOrdered(e -> System.out.print(e + " "));
        System.out.println("");

        parallelStorage
                .stream()
                .forEachOrdered(e -> System.out.print(e + " "));
        System.out.println("");
    }
```

输出

```java
Serial stream:
8 7 6 5 4 3 2 1 
8 7 6 5 4 3 2 1 
Parallel stream:
8 7 6 5 4 3 2 1 
6 5 7 8 1 2 4 3 
```

forEachOrdered按照流指定的顺序处理元素，而不管流是以串行还是并行方式执行。但是，当并行执行流时，map操作会处理由Java运行时和编译器指定的流的元素。因此，每次运行代码时，`parallelStorage.add(e)` 添加的元素顺序都是有变化的，对于确定性和可预测的结果，请确保流操作中的lambda表达式参数不是有状态的。

> 注意：这个例子调用了这个synchronizedList方法，使得List parallelStorage是线程安全的。请记住，集合不是线程安全的。这意味着多个线程不应该同时访问特定的集合。假设parallelStorage在创建时不调用synchronizedList方法：

```java
List<Integer> parallelStorage = new ArrayList<>();
```
该示例的行为不正常，因为多个线程访问和修改parallelStorage没有像同步一样的机制来调度特定线程何时可以访问该List实例。因此，该示例可以打印类似于以下内容的输出：

```java
Parallel stream:
8 7 6 5 4 3 2 1
null 3 5 4 7 8 1 2
```


> 好难。。大部分没看懂。。。。。。
