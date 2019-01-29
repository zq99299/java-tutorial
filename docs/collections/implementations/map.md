# Map 实现

分为 通用 和 专用实现

## 通用实现
* HashMap
* TreeMap
* LinkedHashMap

如果需要排序可以使用：
* SortedMap
* TreeMap

如果想要快速且不关心迭代顺序，使用 HashMap
如果想要性能接近HashMap和插入顺序，使用LinkedHashMap。
对于这种情况，set 与 map类似。

LinkedHashMap 的 removeEldestEntry 功能，可以用来实现自定义缓存。
如果 设置100个容量的缓存，put的时候如果超过了该容量，会把最先进来的元素移除，再把新的加到末尾。该操作在put的时候被调用。

大概意思就是这样的。

## 专用实现
* EnumMap
* WeakHashMap
* IdentityHashMap。


WeakHashMap 中的每个键对象间接地存储为一个弱引用的指示对象。因此，不管是在映射内还是在映射之外，只有在垃圾回收器清除某个键的弱引用之后，该键才会自动移除。 


## 并发实现
java.util.concurrent包中包含的 ConcurrentMap接口，它延伸Map与原子putIfAbsent，remove和replace方法，以及 ConcurrentHashMap该接口的实现。

ConcurrentMap 是哈希表备份的高性能高并发实现。提供其他原子 putIfAbsent、remove、replace 方法的 Map。 替代Hashtable