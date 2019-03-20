# 中断
一个 **中断** 是表明线程应该停止正在做的事和做其他的事情。它是由程序员决定究竟一个线程如何响应中断，
但它是很常见的线程终止。这是本课程的重点。

线程通过调用发送一个 [interrupt](https://docs.oracle.com/javase/8/docs/api/java/lang/Thread.html#interrupt--) 中断线程。
为使中断机制正常工作，中断的线程必须支持自身的中断。

## 支持中断
线程如何支持自己的中断？这取决于它目前在做什么。如果线程经常调用抛出 `InterruptedException` 的方法，
那么它会在 run 中捕获该异常之后从该方法返回。例如：假设以下代码是写在 run 方法中的。

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

如果一个线程很长时间没有调用一个抛出 `InterruptedException` 的方法怎么办？ 那么它必须定期调用`Thread.interrupted`，
如果已经接收到中断，则返回 true。例如：

```java
for (int i = 0; i < inputs.length; i++) {
    heavyCrunch(inputs[i]);
    if (Thread.interrupted()) {
        // 已经中断了
        return;
    }
}
```

在这个简单的例子中，代码只是测试中断并退出线程，如果已经被接收到。在更复杂的应用程序中，抛出 InterruptedException：

```java
if (Thread.interrupted()) {
    throw new InterruptedException();
}
```

这允许中断处理代码集中在catch子句中。

## 中断状态标志

中断机制使用称为中断状态的内部标志来实现。调用 `Thread.interrupt` 设置此标志。
当线程通过调用静态方法 `Thread.interrupted` 检查中断时，中断状态被清除。`isInterrupted` 一个线程用于查询另一个线程的中断状态的非静态方法不会改变中断状态标志。

按照惯例，任何方法抛出一个 `InterruptedException` 异常导致方法退出时。通过调用另一个线程调用 interrupt，中断状态总是可以立即重新设置。

其实没有看明白这个中断标志有什么用？清除与不清除有什么区别，下面我们来测试下：
代码测试内容如下： t1 和 t2 线程，t1 使用 sleep 获取中断异常跳出，t2 使用静态方法 interrupted 轮训判定跳出。

```java
 Thread t1 = new Thread(new Runnable() {
            @Override
            public void run() {
                Thread thread = Thread.currentThread();
                boolean flag = true;
                while (flag) {
                    try {
                        TimeUnit.MILLISECONDS.sleep(100);
                    } catch (InterruptedException e) {
                        System.out.println(thread.getName() + " : 已中断" + thread.isInterrupted() + ":" + new Date().getTime());
                        flag = false;
                    }
                }
                System.out.println(thread.getName() + "线程中循环结束后是否中断：" + thread.isInterrupted());
            }
        });
        t1.start();
        Thread t2 = new Thread(new Runnable() {
            @Override
            public void run() {
                Thread thread = Thread.currentThread();
                boolean flag = true;
                while (flag) {
                    if (thread.interrupted()) {
//                    if (thread.isInterrupted()) { // 使用该方法会发现结果能获取到true，就是没有被重置
                        System.out.println(thread.getName() + " : 已中断" + thread.isInterrupted() + ":" + new Date().getTime());
                        flag = false;
                    }
                }
                System.out.println(thread.getName() + "线程中循环结束后是否中断：" + thread.isInterrupted());
            }
        });
        t2.start();
        try {
            TimeUnit.MILLISECONDS.sleep(1000);
            t1.interrupt();
            t2.interrupt();
            TimeUnit.MILLISECONDS.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
```
输出：

```java
Thread-1 : 已中断false:1493971870833
Thread-1线程中循环结束后是否中断：false
Thread-0 : 已中断false:1493971870833
Thread-0线程中循环结束后是否中断：false
```
从上面的输出结果来看。所有的 isInterrupted 方法都是 false。但是线程的确被中断了，这是怎么回事呢？

我们在 t2 中使用 ` if (thread.isInterrupted()) ` 来得到是否中断的标志试试，下面是输出结果：

```java
Thread-0 : 已中断false:1493972102647
Thread-0线程中循环结束后是否中断：false
Thread-1 : 已中断true:1493972102653
Thread-1线程中循环结束后是否中断：true
```
可以看到 t2 中都获取到了 true.

初步结论：

1. isInterrupted 不会重置标志
2. interrupted 底层调用 isInterrupted(true)，一定会重置标志
3. InterruptedException 异常的方法，比如 sleep 底层估计也是类似轮训的原理来获取是否中断的？总之内部方法一定重置了中断标志

从上面几步看来，中断标志只能在一处被使用。是不容易出问题的
