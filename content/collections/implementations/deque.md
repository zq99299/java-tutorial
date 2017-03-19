# Deque 实现
名称 deque 是“double ended queue（双端队列）”的缩写，通常读为“deck”。可以实现为各种类型的Collections。分为通用和并发

## 通用Deque实现

通用实现包括 LinkedList 和 ArrayDeque类。支持在两端插入、移除、取回元素。
Arraydeque 是可变数组实现的。LinkedList是链表实现的。

基本的插入，删除和retieval操作，addFirst，addLast，removeFirst，removeLast，getFirst和getLast。操作首尾的元素。

LinkedList 比 ArrayDeque 的实现更灵活。 
ArrayDeque比LinkedList在两端的添加和去除操作更有效
LinkedList 比 ArrayDeque消耗更多的内存。

都可以使用 foreach 和 迭代器方式进行迭代。

## 并发Deque实现

该 LinkedBlockingDeque班是的并发执行Deque接口。如果双端队列为空，则等方法takeFirst和takeLast等待，直到元素变得可用，然后检索并删除相同的元素。