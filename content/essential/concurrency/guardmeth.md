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

像许多暂停执行的方法一样，`wait`可以抛出`InterruptedException`。在这个例子中，我们可以忽略这个异常 - 我们只关心这个值joy。

为什么这个版本是`guardedJoy`同步的？假设d是我们用来调用的对象`wait`。当一个线程调用`d.wait`时，它必须拥有固有的锁d- 否则会抛出一个错误。调用synchronized方法的wait是获取内部锁的简单方法。

当`wait`被调用时，线程释放锁，并暂停执行。在将来的某个时间，另一个线程将获取相同的锁并调用 `Object.notifyAll`，通知所有等待该锁的线程发生了一些重要的事情：
```java
public synchronized notifyJoy() {
    joy = true;
    notifyAll();
}
```