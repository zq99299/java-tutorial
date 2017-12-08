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