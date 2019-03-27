# list 实现
list 实现也分为通用实现和专用实现

## 通用实现
* ArrayList
* LinkedList

大多数时候，你可能会使用 ArrayList，他提供位置访问，速度快。它不必为每个元素分配一个节点。
可它可以利用 `System.arraycopy` 移动多个元素。没有同步的开销，而 Vector 有

如果你进程在元素的开头和在中间随机位置操作元素，你应该考虑使用 LinkedList。这些操作需要恒定的时间。

ArrayList 具有一个调整参数 - 初始容量。表示在扩容之前所能保存元素的容量
LinkedList 没有调整参数，但多了 6 个可选操作：addFirst，getFirst，removeFirst，addLast，getLast，和 removeLast。
LinkedList 也实现了 Queue 接口。

## 专用实现

CopyOnWriteArrayList

如果你 List 是固定的大小 - 也就是说，你永远不会使用 remove，add 或任何批量操作除了 containsAll- 你有第三个选择，绝对值得考虑：Arrays.asList 方便实施”部分。
