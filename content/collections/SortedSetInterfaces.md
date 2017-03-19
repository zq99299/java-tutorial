# SortedSet接口

进一步提供关于元素的总体排序 的 Set。这些元素使用其自然顺序进行排序，或者根据通常在创建有序 set 时提供的 Comparator 进行排序。该 set 的迭代器将按元素升序遍历 set。提供了一些附加的操作来利用这种排序。（此接口是 SortedMap 的 set 对应接口）。 

* Range view - 允许对排序集进行任意范围操作
* Endpoints - 返回排序集中的第一个或最后一个元素
* Comparator access- 返回Comparator用于对集合进行排序的（如果有）

接口代码如下：
```java
public interface SortedSet<E> extends Set<E> {
    // Range-view
    SortedSet<E> subSet(E fromElement, E toElement);
    SortedSet<E> headSet(E toElement);
    SortedSet<E> tailSet(E fromElement);

    // Endpoints
    E first();
    E last();

    // Comparator access
    Comparator<? super E> comparator();
}
```

## set 操作
继承set的相同的行为，但是有两个例外：
* Iterator
* toArray

虽然接口不能保证，但是Java平台的SortedSet实现的toString方法返回一个字符串,其中包含的所有元素的排序。

！没看明白这一段。是说上面两个例外的方法和set不具有相同行为的吗？还是等以后看源码的时候再来看这个好了。

## 构造函数
所有通用有序 set 实现类都应该提供 4 个“标准”构造方法：

1.  void（无参数）构造方法，它创建一个空的有序 set，按照元素的自然顺序进行排序。
2. 带有一个 Comparator 类型参数的构造方法，它创建一个空的有序 set，根据指定的比较器进行排序。
3. 带有一个 Collection 类型参数的构造方法，它创建一个新的有序 set，其元素与参数相同，按照元素的自然顺序进行排序。
4. 带有一个 SortedSet 类型参数的构造方法，它创建一个新的有序 set，其元素和排序方法与输入的有序 set 相同。无法保证强制实施此建议，因为接口不能包含构造方法。 

例如TreeSet自己有一个默认的自然排序算法，还提供一个接收比较器的构造函数。

## 范围视图操作

`range-view`操作有点类似于`List`接口。但是有一个很大的不同。
英文不好，看不懂了。。也没有用过这个接口
