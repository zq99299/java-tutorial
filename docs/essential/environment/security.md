# 安全管理器 （Security Manager）
安全管理器 是一个定义安全策略的对象。此策略指定不安全或敏感的操作。安全策略不允许的任何操作都会抛出 [SecurityException](https://docs.oracle.com/javase/8/docs/api/java/lang/SecurityException.html) 异常。
应用程序还可以查询其安全管理器允许哪些操作。

通常，Web 小程序与由浏览器或 Java Web Start 插件提供的安全管理器一起运行。其他类型的应用程序通常运行没有安全管理器，
除非应用程序本身定义一个。如果没有安全管理员，应用程序没有安全策略，没有限制。

本节介绍应用程序如何与现有安全管理器进行交互。有关详细信息，包括有关如何设计安全管理器的信息，
请参阅“ [安全指南](https://docs.oracle.com/javase/8/docs/technotes/guides/security/index.html)”。

## 与安全管理器进行交互
[SecurityManager](https://docs.oracle.com/javase/8/docs/api/java/lang/SecurityManager.html) 是一个安全管理器，
通过调用 System.getSecurityManager 来获得实例

```java
SecurityManager appsm = System.getSecurityManager();
```

如果没有安全管理器，则此方法返回 null。

一旦应用程序对安全管理器对象的引用，它可以请求许可来执行特定的事情。标准库中的许多类都这样做。
例如，`System.exit` 它终止具有退出状态的 Java 虚拟机，调用 `SecurityManager.checkExit` 以确保当前线程有权关闭应用程序。

`SecurityManager` 类定义了许多用于验证其他类型操作的其他方法。例如，`SecurityManager.checkAccess` 验证线程访问，
`SecurityManager.checkPropertyAccess` 验证对指定属性的访问。每个操作或一组操作有自己的 checkXXX() 方法，
此外，该组方法标识已经收到安全管理器保护的一组操作。通常，应用程序不需要直接调用任何 checkXXX（）方法.

## 认识违反安全的行为
许多没有安全管理器的常规操作可能会抛出 `SecurityException` 运行时异常。例如，考虑以下用于读取文件的代码：

```java
reader = new FileReader("xanadu.txt")
```

在没有安全管理器的情况下，此语句无错误地执行，只要 xanadu.txt 存在并且是可读的。
但是假设这个语句被插入到一个 web applet 中，该 applet 通常在不允许文件输入的安全管理器下运行。
可能会导致以下错误消息：

applet 没有接触过，不深入了。
