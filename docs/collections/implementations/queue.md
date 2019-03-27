# queue 实现

分为通用 和 并发实现

## 通用对象实现
正如上一节中所提到的，`LinkedList` 实现了 `Queue` 接口，用于提供先入先出（FIFO）队列操作 add，poll 等等。

`PriorityQueue` 类是基于所述一个优先级队列的数据结构。此队列根据构建时指定的顺序对元素进行拍戏，
这可以是元素的自然排序或显示的排序（`Comparator`）。此队列的头是按指定排序方式确定的最小元素。
如果多个元素都是最小值，则头是其中一个元素——选择方法是任意的。队列获取操作 `poll`、`remove`、`peek` 和 `element` 访问处于队列头的元素。
此类及其迭代器实现了 `Collection` 和 `Iterator` 接口的所有可选 方法。方法 `iterator() ` 中提供的迭代器不保证以任何特定的顺序遍历优先级队列中的元素。
如果需要按顺序遍历，请考虑使用  `Arrays.sort(pq.toArray())`。


## 并发队列实现

该 `java.util.concurrent` 包包含一组同步的 `Queue` 接口和类。 `BlockingQueue` 扩展 `Queue`,
在检索元素时等待队列变为非空的操作，以及在存储元素时空间在队列中可用的操作。此接口由以下类实现：

* LinkedBlockingQueue - 由链表节点支持的可选有界 FIFO 保护队列
* ArrayBlockingQueue - 由数组支持的有界 FIFO 阻塞队列
* PriorityBlockingQueue - 由堆支持的无界阻塞优先级队列
* DelayQueue - 由堆支持的基于时间的调度队列
* SynchronousQueue- 使用 BlockingQueue 接口的简单的交会机制

在 JDK 7 中， TransferQueue 是一个专门的 BlockingQueue 在哪个代码添加一个元素到队列可以选择等待（阻塞）另一个线程中的代码检索元素。
TransferQueue 有一个单一的实现：

* LinkedTransferQueue- TransferQueue 基于链接节点的无界
