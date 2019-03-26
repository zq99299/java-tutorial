# 聚合操作

::: tip
为了更好地理解本节中的概念，请查看 [Lambda 表达式](../../java/javaoo/lambdaexpressions.md)
和 [方法引用](../../java/javaoo/methodreferences.md) 部分。
:::

你为什么使用集合？您不要简单地将对象存储在集合中。在大多数情况下，您使用集合来检索存储在其中的项目。

再次考虑 Lambda 表达式中描述的场景 。假设您正在创建一个社交网络应用程序。
您希望创建一项功能，使管理员能够对满足特定条件的社交网络应用程序的成员执行任何类型的操作，例如发送消息。

像以前一样，假设这个社交网络应用程序的成员由以下 Person 类表示 ：

```java
public class Person {

    public enum Sex {
        MALE, FEMALE
    }

    String name;
    LocalDate birthday;
    Sex gender;
    String emailAddress;

    // ...

    public int getAge() {
        // ...
    }

    public String getName() {
        // ...
    }
}
```

以下示例用 for-each 来打印集合中包含的所有成员的名称

```java
for (Person p : roster) {
   System.out.println(p.getName());
}
```

以下实例使用聚合操作的 forEach 来打印

```java
roster.stream().forEach(p -> System.out.println(p.getName()));
```

虽然在本例中，使用聚合操作的版本比使用 for-each 循环的版本更长，但您会看到使用批量数据操作的版本对于更复杂的任务将更加简洁。

涵盖以下主题：

* 管道和流
* 聚合操作和迭代器直接的区别

## 管道和流
一个 **管道** 是一系列聚合操作序列。以下示例使用由聚合操作 filter 和 forEach 组成的管道将集合名单中包含的男性成员打印出来

```java
roster
        .stream()
        .filter(p -> p.getGender() == Person.Sex.MALE)
        .forEach(p -> System.out.println(p.getName()));
```

将此示例与下面的示例进行比较 roster：使用 for-each 循环打印集合中包含的男性成员：

```java
for (Person p : roster) {
    if (p.getGender() == Person.Sex.MALE) {
        System.out.println(p.getName());
    }
}
```

管道包含以下组件：

* 来源

    这可能是一个集合，一个数组，一个生成器函数或一个 I / O 通道。在这个例子中，源是集合 roster。

* 零个或多个中间操作

    一个中间操作，例如 filter，产生一个新的流。
    流是元素的序列。与集合不同，它不是存储元素的数据结构。相反，一个流通过一个流水线从一个源头传送值。
    本示例 roster 通过调用方法从集合中创建一个流 stream。
    过滤器操作返回一个新的流，其中包含与谓词相匹配的元素（此操作的参数）。在这个例子中，谓词是 lambda 表达式 `p -> p.getGender() == Person.Sex.MALE`
    如果为 true 则返回该元素，因此，本例中的 filter 操作将返回包含 roster 集合中所有男性成员的流

* 终端操作

    一个终端操作，比如 forEach 产生一个非流结果，比如一个原始值（比如 double 值），一个集合，
    或者在 forEach 没有任何值的情况下。在这个例子中，forEach 操作的参数是 lambda 表达式`p -> System.out.println(p.getName())`
    它调用 p 对象上的 getName 方法。（Java 运行时和编译器推断对象 p 的类型是 Person。）


下面的例子计算集合中所有男性成员的平均年龄；管道由 filter、mapToInt、average 组成

```java
double average = roster
                .stream()
                .filter(p -> p.getGender() == Person.Sex.MALE)
                .mapToInt(Person::getAge)
                .average()
                .getAsDouble();
```

mapToInt 操作返回一个新类型 IntStream 的流（这是一个只包含整数值的流）。该操作将其参数中指定的函数应用于特定流中的每个元素。
在这个例子中，函数是 Person::getAge 返回成员年龄的方法引用。（也可以使用 p.getAge()）因此，
mapToInt 此示例中的操作返回包含集合中所有男性成员年龄的流

average 操作计算包含在 IntStream 类型流中的元素的平均值。它返回一个 OptionalDouble 类型对象。
如果流不包含元素，那么 average 操作返回一个空的实例 OptionalDouble,并调用 getAsDouble 方法时抛出一个 NoSuchElementException。
JDK 包含许多终端操作，例如 average 通过组合流的内容返回一个值。这些操作被称为还原操作; 有关更多信息，请参阅还原部分 。

## 聚合操作和迭代器之间的区别

聚合操作就像 forEach 和迭代器一样。但是，它们有几个基本的区别：

* 它们使用内部迭代：

    聚合操作不包含像 next 指示它们处理集合的下一个元素的方法。随着 **内部迭代** ，您的应用程序决定哪些集合进行迭代，
    但是 JDK 决定如何遍历集合。用 **外部迭代**，您的应用程序将确定迭代的集合以及它如何迭代它。
    但是，外部迭代只能依次迭代集合的元素。内部迭代没有这个限制。它可以更容易地利用并行计算，
    这涉及到将问题分解成子问题，同时解决这些问题，然后将解决方案的结果结合到子问题中。有关更多信息，请参见 Parallelism（并行）部分 。

* 他们处理流中的元素：

    从流中聚合操作流程元素，而不是直接从集合中获取。因此，他们也被称为流操作。

* 它们支持将行为作为参数：

    可以将[lambda表达式](../../java/javaoo/lambdaexpressions.md) 指定 为大多数聚合操作的参数。这使您可以自定义特定集合操作的行为。
