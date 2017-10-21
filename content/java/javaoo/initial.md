# 初始化字段

如您所见，您通常可以在其声明中为字段提供初始值：

```java
public class BedAndBreakfast {

    // initialize to 10
    public static int capacity = 10;

    // initialize to false
    private boolean full = false;
}
```

当初始化值可用并且初始化可以放在一行时，这很好。然而，这种初始化形式由于其简单性而受到限制。如果初始化需要一些逻辑（例如，错误处理或for填充复杂数组的循环），则简单的赋值是不够的。实例变量可以在构造函数中进行初始化，其中可以使用错误处理或其他逻辑。为了为类变量提供相同的功能，Java编程语言包括_静态初始化块_

> **注意：**  尽管这是最常见的做法，但不必在类定义的开头声明字段。在使用它们之前，只需要声明和初始化它们。

## 静态初始化块

静态初始化块是在大括号前用static修饰，例如

```java
static {
    // 这里需要初始化所需要的代码
}
```

一个类可以有任意数量的静态初始化块，它们可以出现在类体中的任何地方。运行时系统保证静态初始化块按照它们在**源代码中出现的顺序被调用**。

静态块有一个替代方法 - 你可以编写一个私有静态方法：

```java
class Whatever {
    public static varType myVar = initializeClassVariable();
        
    private static varType initializeClassVariable() {

        // initialization code goes here
    }
}
```

私有静态方法的优点是，如果需要重新初始化类变量，它们可以稍后重用。

## 初始化实例成员

通常，您将使用代码来初始化构造函数中的实例变量。使用构造函数来初始化实例变量有两种方法：initializer块和final方法。

实例变量的初始化程序块看起来像静态初始化程序块，但没有static关键字：

```java
{
    // 这里需要初始化所需的代码
}
```

Java编译器将初始化程序块复制到每个构造函数中。因此，这种方法可以用于在多个构造函数之间共享一个代码块。

final方法不能在子类中被覆盖。这将在接口和继承的课程中讨论。以下是使用final方法初始化实例变量的示例：

```java
class Whatever {
    private varType myVar = initializeInstanceVariable();
        
    protected final varType initializeInstanceVariable() {

        // initialization code goes here
    }
}
```

如果子类可能需要重新使用初始化方法，这是非常有用的。该方法是最终的，因为在实例初始化期间调用非最终方法可能会导致问题。
