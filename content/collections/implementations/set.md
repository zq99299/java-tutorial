# set 实现

这些set实现被分组为 `通用` 和 `专用` 实现

## 通用实现
有三种通用set实现
* HahsSet
* TreeSet
* LinkedHashSet
HashSet比TreeSet（大多数操作的恒定时间对对数时间）快得多，但不提供排序保证。如果需要可以使用`SortedSet`操作，如果需要按值排序，请使用TreeSet。否则使用 Hashe。

LinkedHashSet 某种意义上是HashSet和TreeSet的合并。通过哈希表+链表来实现，它提供了插入顺序，运行速度几乎与HashSet一样快。

值得注意的一点是 HashSet，迭代数目和桶容量的综合是线性的。因此，选择太高的初始容量可能可能浪费空间和时间。另一方面，选择太低的初始容量，会导致每次扩容copy数据结构而浪费过多的时间。如果不指定容量，默认值为16。

还有一个参数，加载因子。与空间消耗有关，如果你不了解这些，那么就使用默认值是最好的。

LinkedHashSet 和 HashSet有相同的调正参数，TreeSet没有调整参数。