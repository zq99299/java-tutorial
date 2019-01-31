# Lambda 表达式
[[toc]]

匿名类的一个问题是，如果您的匿名类的实现非常简单，例如仅包含一个方法的接口，则匿名类的语法可能看起来很笨重且不清楚。在这些情况下，您通常会尝试将功能作为参数传递给另一种方法，例如当有人点击按钮时应该采取什么措施。Lambda 表达式使您能够执行此操作，将功能视为方法参数或代码作为数据。

上一节 [匿名类](./anonymousclasses.md) 介绍如何实现基类而不给它一个名称。虽然这通常比命名类更简洁，对于只有一种方法的类，即使是匿名类似乎有点过于繁琐。Lambda 表达式可以更紧凑地表达单一方法类的实例。


## Lambda 表达式的理想用例

::: tip

这一节的文字有点多，机器翻译的感觉还是有点读不太通顺，我给总结了下下面的用意

就是通过一个查询等操作的需求，然后慢慢的把你从最原始的实现方法 引导至 lambda 表达式来实现。

原始的方法 -> 接口条件类 -> 匿名类 -> Lambda 表达式

---------

 **注意：** 这一章节由于官网摘录的程序，不是完整的 demo。所以我决定按照大致意思把 demo 重新编一个。

:::

假设你在做一个社交软件的搜索功能。

假设这个社交网络应用程序的成员由以下 Persion 类表示

```java
public class Person {
    public enum Sex {
        MALE, FEMALE
    }

    String name;
    LocalDate birthday;
    Sex gender;
    String emailAddress;
    int age;

    public Person(String name, LocalDate birthday, Sex gender, String emailAddress, int age) {
        this.name = name;
        this.birthday = birthday;
        this.gender = gender;
        this.emailAddress = emailAddress;
        this.age = age;
    }

    public int getAge() {
        return this.age;
    }

    @Override
    public String toString() {
        return "Persion{" +
                "name='" + name + '\'' +
                ", birthday=" + birthday +
                ", gender=" + gender +
                ", emailAddress='" + emailAddress + '\'' +
                ", age=" + age +
                '}';
    }

    public void printPerson() {
        System.out.println(this.toString());
    }
```

假设您的社交网络应用程序的成员存储在一个 `List<Person>` 实例中。

本节会从最基本的方式来实现，然后一步一步的引导到 Lambda 表达式中，使用 Lambad 表达式来实现功能

::: tip
这里我直接使用现有的编程经验来编写，而不再考虑没有学过的知识了。
:::

首先构建一个 `junit` 测试类，需要准备一些数据。大致的准备功能如下

```java
public class PersonTest {
    private List<Person> roster = new ArrayList<>();

    @Before
    public void buildData() {
        // 模拟10条数据
        for (int i = 0; i < 10; i++) {
            Person.Sex sex = (i % 2 == 0 ? Person.Sex.FEMALE : Person.Sex.MALE);

            roster.add(new Person(
                    "mrcode-" + i,
                    LocalDate.now(),
                    sex,
                    "email-" + i,
                    18 + i));
        }
    }
}
```

### 方法 1：创建搜索匹配一个特征的成员的方法

一种简单的方法是创建几种方法; 每个方法搜索符合一个特征的成员，如性别或年龄。以下方法打印比指定年龄更年长的成员

```java
public static void printPersonsOlderThan(List<Person> roster, int age) {
    for (Person p : roster) {
        if (p.getAge() >= age) {
            p.printPerson();
        }
    }
}
```
::: tip
List 是有序的 Collection。集合是一个对象，该组中的多个元素到单个单元中。集合用于存储，检索，操纵和传达聚合数据。

有关集合的更多信息，请参阅 [集合](/collections/README.md)。
:::

这种方法可能会使您的应用程序变得脆弱，这是因为引入更新（例如较新的数据类型）而导致应用程序无法正常工作的可能性。假设您升级应用程序并更改 Person 类的结构，使其包含不同的成员变量; 也许是使用不同数据类型或算法的类记录和测量年龄。您将不得不重写很多 API 以适应这一变化。此外，这种方法是不必要的限制; 如果你想打印比一定年龄小的会员怎么办？

### 方法 2：创建更广泛的搜索方法

以下方法比通用型 printPersonsOlderThan 更为普遍; 会在特定范围内打印成员：

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

如果要打印指定性别的成员，或指定性别和年龄范围的组合，该怎么办？如果您决定更改 Person 类并添加其他属性（如关系状态或地理位置），该怎么办？虽然这种方法比一般的方法 printPersonsOlderThan 支持的条件更多，但是为每个可能的搜索查询创建一个单独的方法仍然可能导致脆弱的代码。您可以将指定要在其他类中搜索的条件的代码分开。

### 方法 3：在本地类中指定搜索条件代码
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

该方法通过调用 `CheckPerson.test` 方法来检查参数中 Person 包含的每个实例是否满足参数中指定的搜索条件。如果方法返回一个值 true，那么该方法在该实例上被调用。

要指定搜索条件，您可以实现 CheckPerson 接口：

```java
interface CheckPerson {
    boolean test(Person p);
}
```

以下类 CheckPerson 通过指定方法的实现来实现接口 test。该方法可以筛选符合 CheckPersonEligibleForSelectiveService 的成员：如果 Person 参数为男性且年龄在 18 至 25 之间，则返回值 true：

```java
class CheckPersonEligibleForSelectiveService implements CheckPerson {
    public boolean test(Person p) {
        return p.gender == Person.Sex.MALE &&
            p.getAge() >= 18 &&
            p.getAge() <= 25;
    }
}
```

要使用此类，您将创建一个新的实例并调用该 printPersons 方法：

```java
printPersons(
    roster, new CheckPersonEligibleForSelectiveService());
```

虽然这种方法不那么脆弱了，如果宁更改 Persion 结构，可以不必重写该方法。但是如果你计划有更多不同的搜索条件（一种搜索条声明一个实现类），你可以使用一个匿名类而不是一个本地类，并绕过需要为每个搜索声明一个新的类。

### 方法 4：在匿名类中指定搜索条件代码

以下调用 printPersons 方法的一个参数是一个匿名类，用于过滤在美国有资格选择性服务的成员：男性和年龄在 18 至 25 岁之间的成员：

```java
printPersons(
    roster,
    new CheckPerson() {
        public boolean test(Person p) {
            return p.getGender() == Person.Sex.MALE
                && p.getAge() >= 18
                && p.getAge() <= 25;
        }
    }
);
```

::: tip
这里的 `p.getGender()` 在前面的定义中没有声明，这里响应的要修改 Persion 的结构，提供该方法
:::

这种方法减少了所需的代码量，因为您不需要为每个要执行的搜索创建一个新类。然而，匿名类的语法是庞大的，因为 CheckPerson 接口只包含一种方法。在这种情况下，您可以使用 lambda 表达式而不是匿名类，如下一节所述。

### 方法 5：使用 Lambda 表达式指定搜索条件代码

CheckPerson 接口是一个功能接口。功能接口是只包含一个抽象方法的任何接口 。（功能接口可能包含一个或多个 默认方法 或 静态方法）因为功能界面只包含一个抽象方法，所以在实现时可以省略该方法的名称。为此，您不需要使用匿名类表达式，而是使用 lambda 表达式。

```java
printPersons(
    roster,
    (Person p) -> p.getGender() == Person.Sex.MALE
        && p.getAge() >= 18
        && p.getAge() <= 25
);

// 如果只有一行代码的话，可以省略 return，上面的代码和下面的代码功能一致

printPersons(
        roster,
        (Person p) -> {
            return p.getGender() == Person.Sex.MALE
                    && p.getAge() >= 18
                    && p.getAge() <= 25;
        }
);
```

有关如何定义 lambda 表达式的信息，请参阅后面 小节 Lambda 表达式 的语法。

您可以使用标准的功能接口来代替接口 CheckPerson，进一步减少了所需的代码量。

### 方法 6：使用带有 Lambda 表达式的标准功能接口

```java
interface CheckPerson {
    boolean test(Person p);
}
```

这是一个非常简单的接口。它是一个功能接口，因为它只包含一个抽象方法。该方法使用一个参数并返回一个 boolean 值。该方法非常简单，可能不值得在应用程序中定义一个。因此，JDK 定义了几个标准的功能接口，您可以在 `java.util.function` 包中找到它们 。

例如，您可以使用 `Predicate<T>` 接口代替 CheckPerson。此接口包含以下方法 `boolean test(T t)`：

```java
interface Predicate<T> {
    boolean test(T t);
}
```

该接口 `Predicate<T>` 是通用接口的示例。(有关泛型相关信息请参考 [泛型](../generics/index.md) 章节)。例如，参数化类型 `Predicate<Person>` 如下：

```java
interface Predicate<Person> {
    boolean test(Person t);
}

```

该参数化类型包含一个具有相同返回类型和参数的方法 `CheckPerson.boolean test(Person p)`。因此，您可以使用以下方法 `Predicate<T>` 来代替 CheckPerson：

```java
public static void printPersonsWithPredicate(
    List<Person> roster, Predicate<Person> tester) {
    for (Person p : roster) {
        if (tester.test(p)) {
            p.printPerson();
        }
    }
}
```

因此，以下方法调用与 printPersons 在 方法 3 中调用的方法相同：在本地类中指定搜索条件代码以获取符合选择性服务的成员：

```java
printPersonsWithPredicate(
    roster,
    p -> p.getGender() == Person.Sex.MALE
        && p.getAge() >= 18
        && p.getAge() <= 25
);
```

这不是使用 lambda 表达式的唯一可能的方法。以下方法建议使用 lambda 表达式的其他方法。

### 方法 7：在整个应用程序中使用 Lambda 表达式

重新考虑 printPersonsWithPredicate 使用 lambda 表达式的方法：

```java
public static void printPersonsWithPredicate(
    List<Person> roster, Predicate<Person> tester) {
    for (Person p : roster) {
        if (tester.test(p)) {
            p.printPerson();
        }
    }
}
```

该方法检查参数中 Person 包含的每个实例是否满足参数中指定的条件。如果实例满足由此指定的条件，则该实例将调用该方法。

而不是调用该方法 printPerson，您可以指定在 Person 满足指定条件的那些实例上执行的其他操作 tester。您可以使用 lambda 表达式指定此操作。假设你想要一个类似于一个 lambda 表达式 printPerson，一个参数（一个类型的对象 Person）并返回 void。记住，要使用 lambda 表达式，需要实现一个功能接口。在这种情况下，您需要一个包含抽象方法的功能接口，该方法可以使用一个类型的参数 Person 并返回 void。`Consumer<T>` 接口包含 `void accept(T t)` 具有这些特征的方法 。以下方法将 `p.printPerson()` 使用 `Consumer<Person>` 调用该方法的实例替换该调用 accept：

```java
public static void processPersons(
    List<Person> roster,
    Predicate<Person> tester,
    Consumer<Person> block) {
        for (Person p : roster) {
            if (tester.test(p)) {
                block.accept(p);
            }
        }
}
```

因此，以下方法调用与 printPersons 在 方法 3 中调用的方法相同：在本地类中指定搜索条件代码以获取符合选择性服务的成员。

```java
processPersons(
     roster,
     p -> p.getGender() == Person.Sex.MALE
         && p.getAge() >= 18
         && p.getAge() <= 25,
     p -> p.printPerson()   //程序中调用 accept方法的时候，相当于回调这里的代码块，
     // 如果懂js的回调函数的话 。理解这一段代码就很好懂了
);
```

如果你想要更多的反馈信息，希望传递条件，且满足条件的按照你的规则打印信息，那么可以用到功能接口 `Consumer`，包含一个 `void accept(T t)` 方法。

```java
public static void processPersonsWithFunction(
    List<Person> roster,
    Predicate<Person> tester,
    Function<Person, String> mapper,
    Consumer<String> block) {
    for (Person p : roster) {
        if (tester.test(p)) {
            String data = mapper.apply(p);
            block.accept(data);
        }
    }
}
```

### 方法 8：更广泛地使用泛型

重新考虑该方法 processPersonsWithFunction。以下是它的通用版本，它接受包含任何数据类型的元素的集合作为参数：

```java
public static <X, Y> void processElements(
    Iterable<X> source,
    Predicate<X> tester,
    Function <X, Y> mapper,
    Consumer<Y> block) {
    for (X p : source) {
        if (tester.test(p)) {
            Y data = mapper.apply(p);
            block.accept(data);
        }
    }
}
```

要打印符合选择性服务的会员的电子邮件地址，请调用以下 processElements 方法：

```java
processElements(
                roster,
                p -> p.getGender() == Person.Sex.MALE
                        && p.getAge() >= 18
                        && p.getAge() <= 25,
                p -> p.getEmailAddress(),
                email -> System.out.println(email)
        );
```

此方法调用执行以下操作：

1. 从集合 source 中获取对象。在此示例中 roster 是 List，而 List 实现了 Iterable 接口。
2. 过滤与 Predicate.tester 匹配的条件。该 Predicate 对象是一个 lambda 表达式，它指定哪些成员将符合选择性服务的条件。
3. mapper 接收一个参数，并输出一个结果。在此示例中，该 Function 对象是一个返回成员的电子邮件地址的 lambda 表达式。
4. 由指定对象的实例调用 Consumer 的 block 方法。在这个例子中，Consumer 对象是一个 lambda 表达式，它打印一个字符串，它是 Function 对象返回的电子邮件地址。


您可以使用聚合操作替换这些操作。

### 方法 9：使用接受 Lambda 表达式作为参数的聚合操作

以下示例使用聚合操作打印包含在集合 roster 中的符合选择性服务的成员的电子邮件地址：

```java
roster
        .stream()
        .filter(
                p -> p.getGender() == Person.Sex.MALE
                        && p.getAge() >= 18
                        && p.getAge() <= 25)
        .map(p -> p.getEmailAddress())
        .forEach(email -> System.out.println(email));
```

下面列出了方法 processElements 执行的每个操作与相应的聚合操作：

1. 获得一个对象来源 ： `Stream<E> stream()`
2. 过滤与对象匹配的 Predicate 对象：`Stream<T> filter(Predicate<? super T> predicate)`
3. 将对象映射到由 Function 对象转换为另一个值：`<R> Stream<R> map(Function<? super T,? extends R> mapper)`
4. 执行由 Consumer 对象指定的操作 : `void forEach(Consumer<? super T> action)`


操作 filter，map 并且 forEach 是 **聚合操作**。来自流的聚合操作流程元素，而不是直接来自集合（这是在此示例中调用的第一个 stream 方法的原因）. 流是元素的序列,与集合不同，它不是存储元素的数据结构。相反，流携带来自源的值，例如通过管道的收集。**管道** 是流的操作的序列，在该示例中是 filter，map。 此外 forEach 聚合操作通常接受 lambda 表达式作为参数，使您能够自定义它们的行为

有关聚合操作的更详细的用法，请参阅 [聚合操作](/collections/streams/index.md)  课程


## Lambda 表达式在 GUI 应用程序

忽略。这个[官网原文地址](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html)。


## Lambda 表达式的语法


lambda 表达式由以下内容组成：

* 括号中的逗号分隔的正式参数列表。该 CheckPerson.test 方法包含一个参数， p 它表示 Person 该类的一个实例 。

    可以忽略 lambda 表达式中参数的数据类型。另外，如果只有一个参数，可以省略括号。例如，以下 lambda 表达式也是有效的：

    ```java
    p -> p.getGender() == Person.Sex.MALE
        && p.getAge() >= 18
        && p.getAge() <= 25
    ```

* 箭头符号 `->`
* 一个由单个表达式或语句块组成的体。此示例使用以下表达式：

    ```java
    p.getGender() == Person.Sex.MALE
        && p.getAge() >= 18
        && p.getAge() <= 25
    ```

    如果指定单个表达式，则 Java 运行时将评估表达式，然后返回其值。或者，您可以使用 return 语句：

    ```java
    p -> {
        return p.getGender() == Person.Sex.MALE
            && p.getAge() >= 18
            && p.getAge() <= 25;
    }
    ```

    返回语句不是表达式; 在 lambda 表达式中，必须用大括号`（{}）`括起来。但是，您不必在大括号中包含一个 void 方法调用。例如，以下是有效的 lambda 表达式：

    ```java
    email -> System.out.println(email)
    ```


请注意，lambda 表达式看起来很像一个方法声明; 你可以将 lambda 表达式视为匿名方法 - 没有名称的方法。


以下示例 Calculator 是一个使用多个形式参数的 lambda 表达式示例：


```java
public class Calculator {

    interface IntegerMath {
        int operation(int a, int b);
    }

    public int operateBinary(int a, int b, IntegerMath op) {
        return op.operation(a, b);
    }

    public static void main(String... args) {

        Calculator myApp = new Calculator();
        IntegerMath addition = (a, b) -> a + b;
        IntegerMath subtraction = (a, b) -> a - b;
        System.out.println("40 + 2 = " +
                                   myApp.operateBinary(40, 2, addition));
        System.out.println("20 - 10 = " +
                                   myApp.operateBinary(20, 10, subtraction));
    }
}
```
operateBinary 使用两个整数操作执行数学运算。操作本身由一个实例指定 IntegerMath。例子中定义了 lambda 表达式两个操作，addition 和 subtraction。该示例打印以下内容：

```java
40 + 2 = 42
20 - 10 = 10

````

## 访问封闭范围的局部变量

像本地和匿名类，lambda 表达式可以 捕获变量 ; 它们对包围范围的局部变量具有相同的访问权限。但是，与本地和匿名类不同，lambda 表达式没有任何阴影问题（有关详细信息，请参阅 阴影）。Lambda 表达式是词法的范围。这意味着它们不会从超类型继承任何名称或引入新的范围界定。lambda 表达式中的声明就像在封闭环境中一样被解释。以下示例 LambdaScopeTest 演示如下：

```java
public class LambdaScopeTest {

    public int x = 0;

    class FirstLevel {

        public int x = 1;

        void methodInFirstLevel(int x) {

            // 下面的x=99 将会使编译器报错
            // 将在statement A处出现错误信息："local variables referenced from a lambda expression
            // must be final or effectively final"
            //
            // x = 99;

            Consumer<Integer> myConsumer = (y) ->
            {
                System.out.println("x = " + x); // Statement A
                System.out.println("y = " + y);
                System.out.println("this.x = " + this.x);
                System.out.println("LambdaScopeTest.this.x = " +
                                           LambdaScopeTest.this.x);
            };

            myConsumer.accept(x);

        }
    }

    public static void main(String... args) {
        LambdaScopeTest st = new LambdaScopeTest();
        LambdaScopeTest.FirstLevel fl = st.new FirstLevel();
        fl.methodInFirstLevel(23);
    }
}
```

此示例生成以下输出：

```java
x = 23
y = 23
this.x = 1
LambdaScopeTest.this.x = 0
```

如果在 lambda 表达式的声明中替换参数 x，编译器将生成一个错误：

```java
Consumer<Integer> myConsumer = (x) -> {
    // ...
}
```

编译器报错：x 已经在被定义，因为 lambda 表达式不会引入新的范围界限。因此，您可以直接访问封闭范围的字段，方法和局部变量。例如，lambda 表达式直接访问 methodInFirstLevel 参数 x；要访问包围类中的变量，请使用关键字 this。在这个例子中，`this.x` 指的是成员变量 `FirstLevel.x`。


然而，像本地和匿名类一样，lambda 表达式只能访问最终或有效最终的封闭块的局部变量和参数。例如，假设您在 methodInFirstLevel 定义语句之后立即添加以下赋值语句：

```java
void methodInFirstLevel(int x) {
    x = 99;
    // ...
}
```

由于这个赋值语句，该变量 FirstLevel.x 不再有效地成为最终的。因此，lambda 表达式 myConsumer 尝试访问 FirstLevel.x 变量的时候 Java 编译器会生成类似于 “Variable used in lambda expression should be final or effectively final” 的错误消息.


## 目标类型

如何确定 lambda 表达式的类型？回想一下选择的成年男性以及 18 至 25岁 之间的 lambda 表达：

```java
p -> p.getGender() == Person.Sex.MALE
    && p.getAge() >= 18
    && p.getAge() <= 25
```

这个 lambda 表达式用于以下两种方法：

* `public static void printPersons(List<Person> roster, CheckPerson tester)` 在方法 3：在局部类指定搜索条件码
* `public void printPersonsWithPredicate(List<Person> roster, Predicate<Person> tester)` 在方法 6：Lambda 表达式使用标准的功能接口


当 Java 运行时调用 printPersons 该方法时 ，它期望数据类型 CheckPerson，因此 lambda 表达式是这种类型的。但是，当 Java 运行时调用 printPersonsWithPredicate 该方法时 ，它期待数据类型 `Predicate<Person>`，因此 lambda 表达式是这种类型的。这些方法期望的数据类型称为 **目标类型** 。要确定 lambda 表达式的类型，Java 编译器将使用上下文的目标类型或其中找到 lambda 表达式的情况。因此，您只能在 Java 编译器可以确定目标类型的情况下使用 lambda 表达式：

* 变量声明
* 赋值语句
* return 语句
* 数组初始化
* 方法或则构成参数
* Lambda 表达体
* 条件表达式 `?:`
* Cast expressions

说实话。我没有完全看明白这一段


## 目标类型和方法参数

对于方法参数，Java 编译器使用其他两种语言功能来确定目标类型：重载解析和类型参数推断。

考虑以下两个功能接口（ `java.lang.Runnable` 和 `java.util.concurrent.Callable<V>`）：

```java
public interface Runnable {
    void run();
}

public interface Callable<V> {
    V call();
}
```

`Runnable.run` 不返回值，而 `Callable.call` 返回值

假设你已经按照以下方法重载了该方法

```java
void invoke(Runnable r) {
    r.run();
}

<T> T invoke(Callable<T> c) {
    return c.call();
}
```

在以下语句中将调用哪种方法？

```java
String s = invoke(() -> "done");
```

`invoke(Callable<T> c)` 将被调用。因为该方法返回一个值，而 `invoke(Runnable r)` 没有，在这种情况下 lambda 表达式 `() -> "done"` 的类型是 `Callable<T>`。


## 序列化

如果 lambda 表达式的目标类型及其捕获的参数是可序列化的，则可以序列化它。然而，像内部类一样，强烈地不鼓励 lambda 表达式的序列化。
