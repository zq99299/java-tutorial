# 队列接口

 Queue是用于在处理之前保持元素的集合。除了基本操作Collection之外，队列还提供额外的插入，移除和检查操作。该Queue如下。
```java
public interface Queue<E> extends Collection<E> {
    E element();
    boolean offer(E e);
    E peek();
    E poll();
    E remove();
}
```

每种Queue方法存在两种形式：
1. 如果操作失败，如果操作失败，抛出了一个异常
2. 其他的返回一个特殊值（null或者false，取决于操作）。

接口的常规结构 如下表所示。

| 操作类型 | 抛出异常 | 返回特殊值
|---------|----------|------------
| 插入    | add(e)    | offer(e)
| 移除    | remove()  | poll()
| 检查    | element() | peek()

队列通常（但不一定）以FIFO（先入先出）方式排序元素。例外是优先级队列，根据它们的值来排序元素 - 有关详细信息，请参阅 对象排序部分）。无论使用什么排序，队列的头都是通过调用remove或去除的元素poll。在FIFO队列中，所有新元素都插入到队列的尾部。其他类型的队列可以使用不同的布局规则。每个Queue实现必须指定其排序属性。

Queue的实现可以限制所持有元素的数量；这样的队列称为有界，有些Queue实现java.util.concurrent是有界的，但实现java.util不是。

* add : 继承自Collection，插入一个元素，除非它会违反队列的容量限制，在这种情况下抛出IllegalStateException
* offer：方法仅用于有界队列，不能插入时，返回 fasle
