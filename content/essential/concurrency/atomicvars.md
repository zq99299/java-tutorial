# 原子变量
`java.util.concurrent.atomic`包定义了支持单个变量上的原子操作的类。所有类都有`get`和`set`方法像`volatile`变量读写一样工作。也就是说，`set`与get`同一个变量上的任何后续的事件发生关系。原子`compareAndSet`方法还具有这些内存一致性特征，简单的原子算术方法也适用于整数原子变量。

要了解如何使用这个包，我们回到我们原来用来演示线程干扰的类`Counter`：
```java

class Counter {
    private int c = 0;

    public void increment() {
        c++;
    }

    public void decrement() {
        c--;
    }

    public int value() {
        return c;
    }

}
```

使`Counter`线程干扰安全的一种方法是使其方法同步，如 `SynchronizedCounter`：
```java
class SynchronizedCounter {
    private int c = 0;

    public synchronized void increment() {
        c++;
    }

    public synchronized void decrement() {
        c--;
    }

    public synchronized int value() {
        return c;
    }

}
```

对于这个简单的类，同步是一个可以接受的解决方案。但是对于一个更复杂的类，我们可能希望避免不必要的同步的活动影响。用`AtomicInteger`替换`int`字段可以防止线程干扰而不要求同步，如 `AtomicCounter`：
```java
import java.util.concurrent.atomic.AtomicInteger;

class AtomicCounter {
    private AtomicInteger c = new AtomicInteger(0);

    public void increment() {
        c.incrementAndGet();
    }

    public void decrement() {
        c.decrementAndGet();
    }

    public int value() {
        return c.get();
    }

}
```