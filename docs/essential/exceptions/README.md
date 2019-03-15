# 异常
Java 编程语言使用异常处理错误和其他异常事件。这节课描述了何时以及如何使用异常。

* [什么是异常？](./definition.md)

    异常在程序执行期间发生的中断正常指令流的事件
* [捕获或指定需求](./catchOrDeclare.md)

    介绍如何捕获和处理异常。包括 try、catch 和  finally ，已经异常链和日志记录
* [如何抛出异常](./throwing.md)

    介绍 throw 语句和 Throwable 类极其子类
* [资源声明](./handling/tryResourceClose.md)

    本节介绍 `try-with-resource` 语句，这是一个 try，声明一个或多个资源，资源作为一个对象，
    在程序完成后必须关闭。`try-with-resource` 语句确保每个资源在语句结束时关闭。  

* [Unchecked异常 - 争议](./runtime.md)

    本节介绍正确和不正确使用 Unchecked 异常 RuntimeException 类

* [异常的优点](./advantages.md)

    使用异常来管理错误比传统的错误管理技术有一些优势。    

* [总结](./summary.md)
