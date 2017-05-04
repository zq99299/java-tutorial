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