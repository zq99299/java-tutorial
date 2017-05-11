# 执行器接口
该`java.util.concurrent`包定义了三个执行器接口：

* Executor，一个支持启动新任务的简单接口。
* ExecutorService，这是一个Executor的子接口，它增加了帮助管理生命周期的功能
* ScheduledExecutorService，ExecutorService的子类，支持任务的未来和/或定期执行。

通常，引用执行器对象的变量被声明为这三种接口类型之一，而不是执行器类类型。

## Executor接口

```java
(new Thread(r)).start();

with

e.execute(r);
```