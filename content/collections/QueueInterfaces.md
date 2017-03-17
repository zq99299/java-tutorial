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

