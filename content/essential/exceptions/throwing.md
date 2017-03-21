# 如何抛出异常
一些代码必须抛出一个异常，任何代码都有可能抛出异常，无论什么引发异常，它总是抛出与throw语句。

您可能已经注意到，Java平台提供了许多异常类。所有类都是 `Throwable`的子类。并且都允许程序区分在程序执行期间可能发生的各种类型的异常。

你还可以创建自己的异常类来表示在你编写的类中可能发生的问题。事实上，如果你是包开发人员，您可能必须创建一组自己的异常类，以允许用户区分包中可能发生的错误与Java平台或则其他包中发生的错误。

你还可以创建**链接异常**，更多信息请参阅“链接异常”部分

## throw语句
所有方法都可以使用 `throw`语句。语法是：
```java
throw Throwable对象
```

让我们来看看throw上下文中的语句。以下pop方法来自实现公共堆栈对象的类。该方法从堆栈中删除顶层元素并返回对象。

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

该pop方法查看堆栈上是否有元素，没有则抛出一个异常对象，你需要记住的是：只可以抛出java.lang.Throwable的实例
