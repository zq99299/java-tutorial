# 执行器接口
该`java.util.concurrent`包定义了三个执行器接口：

* Executor，一个支持启动新任务的简单接口。
* ExecutorService，这是一个Executor的子接口，它增加了帮助管理生命周期的功能
* ScheduledExecutorService，ExecutorService的子类，支持任务的未来和/或定期执行。

通常，引用执行器对象的变量被声明为这三种接口类型之一，而不是执行器类类型。

## Executor接口
`Executor`接口提供了一种单一的方法，被设计为一个常用的线程创建方案的替换。如果 r 是一个 `Runnable`对象，e 是一个`Executor`对象

```java
(new Thread(r)).start();

with

e.execute(r);
```

但是 `execute` 不太具体。低级的语法创建一个新线程并立即启动它。`Executor`可能会做同样的时间，但更有可能使用现有的工作线程来运行 r。也有可能将r放在队列中等待可用线程。

`java.util.concurrent.Executor` 有两个更高级的子接口`ExecutorService`和`ScheduledExecutorService`接口
