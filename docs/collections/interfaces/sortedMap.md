# SortedMap接口

SortedMap是按升序维护其条目，按照键的自然排序或根据创建Comparator时提供的顺序排序.自然顺序和Comparators在“ [对象顺序](/content/collections/interfaces/objectOrdering.md)”一节中讨论 。该SortedMap接口提供正常Map操作和以下操作：

* Range view — 对排序后的map执行任意范围操作
* Endpoints — 返回mao中的第一个或则最后一个键
* Comparator access — 返回Comparator，如果有的话。

以下接口是模拟的 SortedSet。

```java
public interface SortedMap<K, V> extends Map<K, V>{
    Comparator<? super K> comparator();
    SortedMap<K, V> subMap(K fromKey, K toKey);
    SortedMap<K, V> headMap(K toKey);
    SortedMap<K, V> tailMap(K fromKey);
    K firstKey();
    K lastKey();
}
```

## map 操作
SortedMap继承自map，其他的都有相同的行为，但是有以下两个例外：

* 由Iterator返回iterator任何的有序映射的操作Collection，以便遍历集合。
* toArray操作返回的数组按顺序包含键，值或条目。


## 标准构造函数
按照惯例，所有的通用Map实施方式提供了一个标准转换构造函数。SortedMap实现也不例外。在TreeMap这个构造函数中创建一个实例，根据它们的键的自然顺序来对它的条目进行排序。这可能是一个错误。最好是动态检查指定的Map实例是否为SortedMap，如果是，则根据相同的标准（比较器或自然排序）对新映射进行排序。因为TreeMap采取了它所做的方法，它还提供了一个构造函数

SortedMap按照惯例，实现还提供了一个构造函数，该构造函数接受Comparator并返回根据指定排序的空映射Comparator。如果null传递给这个构造函数，它将返回一个Map根据它们的键的自然排序来排序它的映射。


## 与SortedSet比较

由于这个接口是一个精确的Map类比SortedSet，所以SortedSet接口部分中的所有语句和代码示例 SortedMap仅适用于微小的修改？？？？