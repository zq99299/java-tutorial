# 守护块
线程通常必须协调他们的行动。最常见的协调语法是守护块。这样的块通过轮询可以继续之前必须为真的条件开始。为了正确执行，需要遵循以下步骤。

假设，例如一个方法guardedJoy，直到一个共享变量joy已被另一个线程设置，才能进行。在理论上，这种方法可以简单地循环，直到条件得到满足，但是循环是浪费的，因为它在等待时连续执行。

```java
public void guardedJoy() {
    // 简单的轮询保护，浪费时间，不要这样做
    while(!joy) {}
    System.out.println("Joy has been achieved!");
}
```

一个更高效的保护调用 `Object.wait`来暂停当前线程。调用wait不会返回，直到另一个线程发出一个可能发生某些特殊事件的通知 - 虽然不一定是此线程正在等待的事件：
```java
public synchronized void guardedJoy() {
    // 这个守护块只能针对每个特殊事件的循环一次，这可能不会是我们正在等待的事件
    while(!joy) {
        try {
            wait();
        } catch (InterruptedException e) {}
    }
    System.out.println("Joy and efficiency have been achieved!");
}
```

注意：`wait`使用在一个循环中，不要假定中断事件是针对你正在等待的特定条件。一定要条件为真才能中断