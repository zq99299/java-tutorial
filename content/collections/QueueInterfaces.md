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

* add ：继承自Collection，插入一个元素，除非它会违反队列的容量限制，在这种情况下抛出IllegalStateException
* offer ：方法仅用于有界队列，不能插入时，返回 fasle

在remove与poll方法均除去并返回队列的头。删除哪个元素是队列的排序策略的函数。remove和poll仅当队列为空在他们的行为的方法不同。
* remove : removethrows NoSuchElementException
* poll : 返回null

element与peek方法返回，但不移除，队列的头。它们彼此不同的方式remove与poll以下方式完全相同：如果队列为空:
* element : 抛出NoSuchElementException
* peek : 返回null。


Queue实现通常不允许插入null元素。LinkedList改进Queue是一个例外。由于历史原因，它允许null元素，但是你应该避免利用这个，因为null它被用作poll和peek方法的特殊返回值。

队列实现通常不定义基于元素的方法equals和hashCode方法，而是从中继承基于身份的版本Object。

该Queue接口并没有定义阻塞队列的方法，这是并发编程常见。这些方法，等待元素出现或空间变得可用，在接口中定义 java.util.concurrent.BlockingQueue，它扩展Queue。

在以下的示例中，使用队列来实现倒计时定时器。只是演示用法
```java
    @Test
    public void countDown() throws InterruptedException {
        int time = 10;
        Queue<Integer> queue = new LinkedList<Integer>();

        for (int i = time; i >= 0; i--)
            queue.add(i);

        while (!queue.isEmpty()) {
            System.out.println(queue.remove());
            // 间隔一秒打印
            Thread.sleep(1000);
        }
    }
```
在以下示例中，使用优先级队列对元素集合进行排序。只是演示用法
```java
 @Test
    public void test() throws InterruptedException {
        String[] arrs = {"1", "2", "3", "4", "5","1"};
        List<String> list = new ArrayList<>(Arrays.asList(arrs));
        System.out.println(heapSort(list)); //[1, 1, 2, 3, 4, 5]

    }

    static <E> List<E> heapSort(Collection<E> c) {
        Queue<E> queue = new PriorityQueue<E>(c);
        List<E> result = new ArrayList<E>();

        while (!queue.isEmpty())
            result.add(queue.remove());

        return result;
    }
```