# set 实现

这些set实现被分组为 `通用` 和 `专用` 实现

## 通用实现
有三种通用set实现

* HashSet
* TreeSet
* LinkedHashSet

HashSet比TreeSet（大多数操作的恒定时间对对数时间）快得多，但不提供排序保证。如果需要可以使用`SortedSet`操作，如果需要按值排序，请使用TreeSet。否则使用 HashSet。

LinkedHashSet 某种意义上是HashSet和TreeSet的合并。通过哈希表+链表来实现，它提供了插入顺序，运行速度几乎与HashSet一样快。

值得注意的一点是 HashSet，迭代数目和桶容量的综合是线性的。因此，选择太高的初始容量可能可能浪费空间和时间。另一方面，选择太低的初始容量，会导致每次扩容copy数据结构而浪费过多的时间。如果不指定容量，默认值为16。

还有一个参数，加载因子。与空间消耗有关，如果你不了解这些，那么就使用默认值是最好的。

LinkedHashSet 和 HashSet有相同的调正参数，TreeSet没有调整参数。

## 专用实现

有两个特殊用途的实现 `EnumSet`和`CopyOnWriteArraySet`

EnumSet 是 set 枚举类型的高性能实现。在内部由一个变量表示，通常是Long。枚举类型支持范围迭代，比如迭代星期
```java
for (Day d : EnumSet.range(Day.MONDAY, Day.FRIDAY))
        System.out.println(d);

```
提供了静态方法，可以快速创建
```java
    EnumSet.of(Style.BOLD, Style.ITALIC)
```

CopyOnWriteArraySet是一个Set由写时复制数组备份的实现。所有可变操作，如add，set，和remove，通过使所述阵列的一个新的复制来实现; 永远不需要锁定。即使迭代可以安全地同时进行元素插入和删除。不像大多数Set实施中，add，remove，和contains方法需要的时间与集合的大小。这个实现只适用于很少修改但频繁迭代的集合。它非常适合维护必须防止重复的事件处理程序列表。










