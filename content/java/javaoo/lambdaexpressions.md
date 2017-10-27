# Lambda表达式

匿名类的一个问题是，如果您的匿名类的实现非常简单，例如仅包含一个方法的接口，则匿名类的语法可能看起来很笨重且不清楚。在这些情况下，您通常会尝试将功能作为参数传递给另一种方法，例如当有人点击按钮时应该采取什么措施。Lambda表达式使您能够执行此操作，将功能视为方法参数或代码作为数据。

上一节“ 匿名类”介绍如何实现基类而不给它一个名称。虽然这通常比命名类更简洁，对于只有一种方法的类，即使是匿名类似乎有点过于繁琐。Lambda表达式可以更紧凑地表达单一方法类的实例。

本节包含以下主题：

* Lambda表达式的理想用例
 * 方法1：创建搜索匹配一个特征的成员的方法
 * 方法2：创建更广泛的搜索方法
 * 方法3：在本地类中指定搜索条件代码
 * 方法4：在匿名类中指定搜索条件代码
 * 方法5：使用Lambda表达式指定搜索条件代码
 * 方法6：使用带有Lambda表达式的标准功能接口
 * 方法7：在整个应用程序中使用Lambda表达式
 * 方法8：更广泛地使用泛型
 * 方法9：使用接受Lambda表达式作为参数的聚合操作
* Lambda表达式在GUI应用程序
* Lambda表达式的语法
* 访问封闭范围的局部变量
* 目标类型
 * 目标类型和方法参数
* 序列化


## Lambda表达式的理想用例

> **前言**
> 这一节的文字有点多，机器翻译的感觉还是有点度不太通顺，


假设您正在创建一个社交网络应用程序。您希望创建一个功能，使管理员能够对符合特定条件的社交网络应用程序的成员执行任何类型的操作（例如发送消息）。下表详细描述了这种用例：

| Field | 描述 |
|----------
| 名称	 | 对所选成员执行操作
| 主演员        | 管理员
| 前提条件	| 管理员已登录到系统。
| 后置条件	| 仅对符合指定条件的成员执行操作。
| 扩展     |1A。管理员可以选择在指定要执行的操作之前或选择提交按钮之前预览符合指定条件的成员。
| 发生频率	| 白天很多次

主要成功案例:	

1. 管理员指定执行某个操作的成员的标准。
2. 管理员指定对所选成员执行的操作。
3. 管理员选择提交按钮。
4. 系统查找与指定条件匹配的所有成员。
5. 系统对所有匹配的成员执行指定的操作。

假设这个社交网络应用程序的成员由以下Persion类表示

```java
public class Person {

    public enum Sex {
        MALE, FEMALE
    }

    String name;
    LocalDate birthday;
    Sex gender;
    String emailAddress;

    public int getAge() {
        // ...
    }

    public void printPerson() {
        // ...
    }
}
```

假设您的社交网络应用程序的成员存储在一个`List<Person>`实例中。

本节首先介绍了原生用列的方法，它使用本地和匿名类改进了这种方法，然后使用lambda表达式完成了一个高效简洁的方法。

### 方法1：创建搜索匹配一个特征的成员的方法
一种简单的方法是创建几种方法; 每个方法搜索符合一个特征的成员，如性别或年龄。以下方法打印比指定年龄更长的成员：

```java
public static void printPersonsOlderThan(List<Person> roster, int age) {
    for (Person p : roster) {
        if (p.getAge() >= age) {
            p.printPerson();
        }
    }
}
```
> **注意：**List是有序的 Collection。集合是一个对象，该组中的多个元素到单个单元中。集合用于存储，检索，操纵和传达聚合数据。有关集合的更多信息，请参阅 [集合](//content/collections/README.md)。

这种方法可能会使您的应用程序变得脆弱，这是因为引入更新（例如较新的数据类型）而导致应用程序无法正常工作的可能性。假设您升级应用程序并更改Person类的结构，使其包含不同的成员变量; 也许是使用不同数据类型或算法的类记录和测量年龄。您将不得不重写很多API以适应这一变化。此外，这种方法是不必要的限制; 如果你想打印比一定年龄小的会员怎么办？

## 方法2：创建更广泛的搜索方法

以下方法比通用型printPersonsOlderThan更为普遍; 会在特定范围内打印成员：

```java
public static void printPersonsWithinAgeRange(
    List<Person> roster, int low, int high) {
    for (Person p : roster) {
        if (low <= p.getAge() && p.getAge() < high) {
            p.printPerson();
        }
    }
}
```

如果要打印指定性别的成员，或指定性别和年龄范围的组合，该怎么办？如果您决定更改Person课程并添加其他属性（如关系状态或地理位置），该怎么办？虽然这种方法比一般的方法printPersonsOlderThan更多，但是为每个可能的搜索查询创建一个单独的方法仍然可能导致脆弱的代码。您可以将指定要在其他类中搜索的条件的代码分开。

## 方法3：在本地类中指定搜索条件代码
以下方法打印与您指定的搜索条件匹配的成员：

```java
public static void printPersons(
    List<Person> roster, CheckPerson tester) {
    for (Person p : roster) {
        if (tester.test(p)) {
            p.printPerson();
        }
    }
}
```

该方法通过调用该方法来检查参数中Person包含的每个实例是否满足参数中指定的搜索条件。如果方法返回一个值，那么该方法在该实例上被调用。
要指定搜索条件，您可以实现 CheckPerson接口：

```java
interface CheckPerson {
    boolean test(Person p);
}
```

以下类CheckPerson通过指定方法的实现来实现接口test。该方法可以筛选符合CheckPersonEligibleForSelectiveService的成员：如果Person参数为男性且年龄在18至25之间，则返回值true：

```java
class CheckPersonEligibleForSelectiveService implements CheckPerson {
    public boolean test(Person p) {
        return p.gender == Person.Sex.MALE &&
            p.getAge() >= 18 &&
            p.getAge() <= 25;
    }
}
```

要使用此类，您将创建一个新的实例并调用该printPersons方法：

```java
printPersons(
    roster, new CheckPersonEligibleForSelectiveService());
```

虽然这种方法不那么脆弱 - 如果您更改结构，您不必重写方法Person- 您仍然有其他代码：您计划在应用程序中执行的每个搜索的新界面和本地类。因为CheckPersonEligibleForSelectiveService 实现一个接口，你可以使用一个匿名类而不是一个本地类，并绕过需要为每个搜索声明一个新的类。

## 方法4：在匿名类中指定搜索条件代码