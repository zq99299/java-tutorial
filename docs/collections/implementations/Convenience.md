# 方便实现

本节介绍几个小型实现，当不需要全部功能时，可以比通用实现更方便，更高效。
本节中的所有实现都通过静态工厂方法而不是 public 类提供。

## 列出数组的视图

 Arrays.asList 方法返回 List 其数组参数的视图。集合的大小是数组的大小，不能更改，
 如果调用 add 或者 remove 方法将抛出异常 UnsupportedOperationException

 返回一个受指定数组支持的固定大小的列表。（对返回列表的更改会“直接写”到数组。）此方法同 `Collection.toArray()` 一起，
 充当了基于数组的 API 与基于 collection 的 API 之间的桥梁。返回的列表是可序列化的，并且实现了 RandomAccess。

 所以注意不要保留数组的引用。

## 不可变重复列表

返回由指定对象的 n 个副本组成的不可变列表。新分配的数据对象非常小（它只包含一个对该数据对象的引用）。
在通过与 List.addAll 方法组合来增大列表时，此方法很有用。返回的列表是可序列化的。

这种实现有两个主要用途。第一个是初始化一个新创建的 List，假设你希望最初由 1000 个 null 元素组成。

```java
List<Type> list = new ArrayList<Type>(Collections.nCopies(1000, (Type)null);
```

当然，每个元素的初始值不需要 null。

第二个主要用途是增长现有的 List。假设您要将字符串 "fruit bat" 的 69 个副本添加到 `List<String>` 末尾。

```java
lovablePets.addAll(Collections.nCopies(69, "fruit bat"));
```

还可以通过 `addAll(int index, Collection<? extends E> c)` 来添加到列表的中间。

## 不可变单元素 set

有时你需要一个不可变 Set 的单例，它由一个单独的指定元素组成。该 Collections.singleton 方法返回这样的 Set。
此实现的一个用途是从某个 Collection 中删除一个 等于 该单例 set 的元素。

```java
c.removeAll(Collections.singleton(e));
```

 在 map 中删除

 ```java
 job.values().removeAll(Collections.singleton(LAWYER));
 ```

 ## Empty Set, List, and Map Constants

 ```java
 Collections.emptySet()
 ```
