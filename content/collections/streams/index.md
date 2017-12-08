# 聚合操作

> **注：**为了更好地理解本节中的概念，请查看[ Lambda表达式](/content/java/javaoo/lambdaexpressions.md)和 [方法引用](/content/java/javaoo/methodreferences.md)部分。

你为什么使用集合？您不要简单地将对象存储在集合中。在大多数情况下，您使用集合来检索存储在其中的项目。

再次考虑Lambda表达式中描述的场景 。假设您正在创建一个社交网络应用程序。您希望创建一项功能，使管理员能够对满足特定条件的社交网络应用程序的成员执行任何类型的操作，例如发送消息。

像以前一样，假设这个社交网络应用程序的成员由以下Person类表示 ：

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

以下示例用 for-each来打印集合中包含的所有成员的名称

```java
for (Person p : roster) {
   System.out.println(p.getName());
}
```

以下实例使用聚合操作的forEach来打印

```java
roster.stream().forEach(p -> System.out.println(p.getName()));
```

虽然在本例中，使用聚合操作的版本比使用for-each循环的版本更长，但您会看到使用批量数据操作的版本对于更复杂的任务将更加简洁。

涵盖以下主题：

* 管道和流
* 聚合操作和迭代器直接的区别

## 管道和流
一个_管道_是一系列聚合操作序列。以下示例使用由聚合操作filter和forEach组成的管道将集合名单中包含的男性成员打印出来

```java
        roster
                .stream()
                .filter(p -> p.getGender() == Person.Sex.MALE)
                .forEach(p -> System.out.println(p.getName()));
```

将此示例与下面的示例进行比较roster：使用for-each循环打印集合中包含的男性成员：

```java
    for (Person p : roster) {
        if (p.getGender() == Person.Sex.MALE) {
            System.out.println(p.getName());
        }
    }
```

管道包含以下组件：

* 来源
    
    这可能是一个集合，一个数组，一个生成器函数或一个I / O通道。在这个例子中，源是集合roster。
    
* 零个或多个_中间操作_

    一个中间操作，例如filter，产生一个新的流。
    流是元素的序列。与集合不同，它不是存储元素的数据结构。相反，一个流通过一个流水线从一个源头传送值。本示例roster通过调用方法从集合中创建一个流stream。
    过滤器操作返回一个新的流，其中包含与谓词相匹配的元素（此操作的参数）。在这个例子中，谓词是lambda表达式 `p -> p.getGender() == Person.Sex.MALE` 如果为true则返回该元素，因此，本例中的filter操作将返回包含roster集合中所有男性成员的流

* 终端操作
    
    一个终端操作，比如forEach产生一个非流结果，比如一个原始值（比如double值），一个集合，或者在forEach没有任何值的情况下。在这个例子中，forEach操作的参数是lambda表达式`p -> System.out.println(p.getName())` 它调用p对象上的getName方法。（Java运行时和编译器推断对象p的类型是Person。）
    

下面的例子计算集合中所有男性成员的平均年龄；管道由 filter、mapToInt、average组成

```java
double average = roster
                .stream()
                .filter(p -> p.getGender() == Person.Sex.MALE)
                .mapToInt(Person::getAge)
                .average()
                .getAsDouble();
```

mapToInt操作返回一个新类型IntStream的流（这是一个只包含整数值的流）。该操作将其参数中指定的函数应用于特定流中的每个元素。在这个例子中，函数是Person::getAge返回成员年龄的方法引用。（也可以使用 p.getAge()）因此，mapToInt此示例中的操作返回包含集合中所有男性成员年龄的流

average操作计算包含在IntStream类型流中的元素的平均值。它返回一个OptionalDouble类型对象。如果流不包含元素，那么average操作返回一个空的实例OptionalDouble,并调用方法getAsDouble时抛出一个NoSuchElementException。JDK包含许多终端操作，例如average通过组合流的内容返回一个值。这些操作被称为_还原操作_ ; 有关更多信息，请参阅还原部分 。




