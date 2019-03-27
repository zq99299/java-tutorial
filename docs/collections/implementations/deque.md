# Deque 实现
名称 deque 是 “double ended queue（双端队列）” 的缩写，通常读为“deck”。可以实现为各种类型的 Collections。分为通用和并发

## 通用 Deque 实现

通用实现包括 LinkedList 和 ArrayDeque 类。支持在两端插入、移除、取回元素。
Arraydeque 是可变数组实现的。LinkedList 是链表实现的。

基本的插入，删除和 retieval 操作，addFirst，addLast，removeFirst，removeLast，getFirst 和 getLast。操作首尾的元素。

LinkedList 比 ArrayDeque 的实现更灵活。
ArrayDeque 比 LinkedList 在两端的添加和去除操作更有效
LinkedList 比 ArrayDeque 消耗更多的内存。

都可以使用 foreach 和 迭代器方式进行迭代。

## 并发 Deque 实现

LinkedBlockingDeque 支持并发的基于已链接节点的、任选范围的阻塞双端队列。
 如果双端队列为空，则等方法 takeFirst 和 takeLast 等待，直到元素变得可用，然后检索并删除相同的元素。
