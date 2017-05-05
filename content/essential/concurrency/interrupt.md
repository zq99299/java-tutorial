# 中断
一个**中断**是表明线程应该停止正在做的事和做其他的事情。它是由程序员决定究竟一个线程如何响应中断，但它是很常见的线程终止。这是本课程的重点。

线程通过调用发送一个 [interrupt](https://docs.oracle.com/javase/8/docs/api/java/lang/Thread.html#interrupt--)中断线程。为使中断机制正常工作，中断的线程必须支持自身的中断。

## 支持中断
线程如何支持自己的中断？这取决于它目前在做什么。如果线程经常调用抛出`InterruptedException`的方法，那么它会在run中捕获该异常之后从该方法返回。例如：假设以下代码是写在run方法中的。
```java
for (int i = 0; i < importantInfo.length; i++) {
    // 睡眠4秒，该方法就会抛出InterruptedException 异常
    // 利用该异常就能支持中断操作
    try {
        Thread.sleep(4000);
    } catch (InterruptedException e) {
        // We've been interrupted: no more messages.
        return;
    }
    // Print a message
    System.out.println(importantInfo[i]);
}
```

如果一个线程很长时间没有调用一个抛出`InterruptedException`的方法怎么办？那么它必须定期调用`Thread.interrupted`，如果已经接收到中断，则返回true。例如：
```java
for (int i = 0; i < inputs.length; i++) {
    heavyCrunch(inputs[i]);
    if (Thread.interrupted()) {
        // 已经中断了
        return;
    }
}
```

在这个简单的例子中，代码只是测试中断并退出线程，如果已经被接收到。在更复杂的应用程序中，抛出InterruptedException：
```java
if (Thread.interrupted()) {
    throw new InterruptedException();
}
```
这允许中断处理代码集中在catch子句中。

## 中断状态标志

中断机制使用称为中断状态的内部标志来实现。调用`Thread.interrupt`设置此标志。当线程通过调用静态方法`Thread.interrupted`检查中断时，中断状态被清除。`isInterrupted`一个线程用于查询另一个线程的中断状态的非静态方法不会改变中断状态标志。

按照惯例，任何方法抛出一个`InterruptedException`异常导致方法退出时。通过调用另一个线程调用interrupt，中断状态总是可以立即重新设置。