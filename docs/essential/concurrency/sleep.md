# 暂停执行与睡眠

`Thread.sleep` 导致当前线程在指定的时间段内暂停执行。这是使处理器时间可用于应用程序的其他线程或可能在计算机系统上运行的其他应用程序的有效手段，
该 sleep 方法也可以用于心跳，如下面所示间隔一定事件打印信息。

`sleep` 提供了两个重载版本：一个指定休眠时间为毫秒，另一个指定睡眠时间到纳秒。
**然而，这些睡眠时间不能保证是准确的**，因为它们受底层操作系统提供的设施的限制。
此外，休眠期可以通过中断终止，我们将在后面的部分中看到。在任何情况下，您不能假定调用 sleep 将在指定的时间段内暂停线程。

```java
public class SleepMessages {
    public static void main(String args[])
        throws InterruptedException {
        String importantInfo[] = {
            "Mares eat oats",
            "Does eat oats",
            "Little lambs eat ivy",
            "A kid will eat ivy too"
        };

        for (int i = 0;
             i < importantInfo.length;
             i++) {
            //Pause for 4 seconds
            Thread.sleep(4000);
            //Print a message
            System.out.println(importantInfo[i]);
        }
    }
}
```

请注意，`main` 声明它 `throws InterruptedException`。当另一个线程处于活动状态时中断当前 sleep 线程时，
这是一个异常。由于这个应用程序还没有定义另一个线程来引起中断，所以它并不会引起 InterruptedException。
