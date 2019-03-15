# 如何抛出异常
一些代码必须抛出一个异常，任何代码都有可能抛出异常，无论什么引发异常，它总是抛出与 throw 语句。

您可能已经注意到，Java 平台提供了许多异常类。所有类都是 `Throwable` 的子类。并且都允许程序区分在程序执行期间可能发生的各种类型的异常。

你还可以创建自己的异常类来表示在你编写的类中可能发生的问题。事实上，如果你是包开发人员，
您可能必须创建一组自己的异常类，以允许用户区分包中可能发生的错误与 Java 平台或则其他包中发生的错误。

你还可以创建 **异常链**，更多信息请参阅 [异常链](./chained.md) 部分

## throw 语句
所有方法都可以使用 `throw` 语句。语法是：

```java
throw Throwable 对象
```

让我们来看看 throw 上下文中的语句。以下 pop 方法来自实现公共堆栈对象的类。
该方法从堆栈中删除顶层元素并返回对象。

```java
public Object pop() {
    Object obj;

    if (size == 0) {
        throw new EmptyStackException();
    }

    obj = objectAt(size - 1);
    setObjectAt(size - 1, null);
    size--;
    return obj;
}
```

该 pop 方法查看堆栈上是否有元素，没有则抛出一个异常对象，你需要记住的是：只可以抛出 java.lang.Throwable 的实例

请注意：pop 方法的声明不包含 `throws` 子句。`EmptyStackException` 是非检查异常。
因此 pop 方法可以不声明它

## Throwable 类及其子类
下图说明了 Throwable 类的类层次结构及其最重要的子类。正如你可以看到的，Throwable 有两个直接的后代： Error 和 Exception。

![](./assets/exceptions-throwable.png)

## Error 类

当 Java 虚拟机中发生动态链接失败或其他硬故障时，虚拟机抛出 Error。简单的程序通常不捕获或抛出 Error。


## Exception 类

大多数程序抛出和捕获从 Exception 类派生的对象。一个 Exception 表示出现一个问题，但它不是一个严重的系统的问题。你写的大多数程序会抛出和捕捉 Exceptions 而不是 Errors。

Java 平台定义了 Exception 类的许多后代。这些后代表示可能发生的各种类型的异常。例如:

- IllegalAccessException

  当应用程序试图反射性地创建一个实例（而不是数组）、设置或获取一个字段，或者调用一个方法，但当前正在执行的方法无法访问指定类、字段、方法或构造方法的定义时
- NegativeArraySizeException 如果应用程序试图创建大小为负的数组，则抛出该异常。

一个 Exception 子类：RuntimeException 是那些可能在 Java 虚拟机正常运行期间抛出的异常的超类。

运行时异常的一个示例是：NullPointerException 当方法尝试通过引用访问对象的成员时发生 null。


`Unchecked 异常 - 争议` 章节将讨论为什么大多数程序不应该抛出运行时异常。
