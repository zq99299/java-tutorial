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

请注意，构造函数无法同步 - 使用`synchronized`带有构造函数的关键字是语法错误。同步构造函数没有任何意义，因为创建对象的线程在构造时应该可以访问它。

**警告： ** 构造一个将在线程之间共享的对象时，要非常小心，对对象的引用不会过早地“泄漏”。例如，假设你想共享一个对象，其中有一个名为instances的List的属性。您可能会尝试将以下行添加到构造函数中：
```java
instances.add(this);
```
但是其他的线程可以使用实例在对象构造完成访问对象。

同步方法是防止**线程干扰**和**内存一致性错误**的一个简单的策略：如果一个对象对多个线程可见，则对该对象变量的所有读取或写入都是通过synchronized方法完成的。（一个重要的例外：final字段，对象被创建后不能修改，可以通过非同步的方法来安全地读）。这种策略是有效的，但存在灵活性，稍后我们会讨论