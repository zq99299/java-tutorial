# 同步方法

Java编程语言提供了两个基本的同步成语：synchronized方法和synchronized语句。下一节将介绍两个同步语句的复杂度。这部分是关于同步的方法。

要使用同步方法，只需要将`synchronized`关键字添加到声明中：
```java
public class SynchronizedCounter {
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

如果count是一个SynchronizedCounter实例，那么使这些方法同步有两个效果：

* 首先，同一对象上的两个同步方法的调用不可能进行交织。当一个线程正在执行一个对象的`synchronized`方法时，调用同一个对象块的同步方法（挂起执行）的所有其他线程，直到第一个线程完成该对象。
* 第二，当一个`synchronized`方法退出时，它会自动建立一个与之相关的同步方法的任何后续调用的发生关系。这保证对对象的状态的更改对所有线程都是可见的。