# Collection 接口
Collection 表示一组对象，这些对象也称为 collection 的元素。按照惯例，所有通用的 Collection 实现类（通常通过它的一个子接口间接实现 Collection）都有一个接受 Collection 参数的构造函数。此构造函数称为`转换构造函数`，初始化新集合已包含指定集合中的所有元素，而不管给定集合的子接口或实现类。换句话说，它允许你转换集合的类型。

比如：假设你有一个Collection<String> c,可是一个List或则一个Set，或另一种Collection。这样你就正转换：
```
List <String> list = new ArrayList <String>（c）;
```

Collection接口包含执行基本操作，如:

```java
int size()，boolean isEmpty()， boolean contains(Object element)，
boolean add(E element)，boolean remove(Object element)，和 Iterator<E> iterator()。
```

它还包含操作整个集合的方法,如:
```java
boolean containsAll(Collection<?> c)， boolean addAll(Collection<? extends E> c)， 
boolean removeAll(Collection<?> c)，boolean retainAll(Collection<?> c)，和 void clear()。
```
额外的数组操作方法，如:
```java
Object[] toArray()和<T> T[] toArray(T[] a)
```

在JDK 8和更高版本中，Collection接口还公开了方法Stream<E> stream()，并Stream<E> parallelStream()从底层集合获取顺序或并行流。（有关使用流的详细信息，请参阅标题为“ [聚合操作](http://docs.oracle.com/javase/tutorial/collections/streams/index.html) ”的课程 。）


Collection 表示一组对象，它有方法告诉你集合（size，isEmpty）中有多少元素，检查给定对象是否在collection（contains）中的方法，从集合（add，remove）中添加和删除元素的方法，以及提供迭代器对collection（iterator）；

**如add:**如果此 collection 由于调用而发生更改，则返回 true。（如果此 collection 不允许有重复元素，并且已经包含了指定的元素，则返回 false。）

**如remove**：如果此 collection 包含指定的元素（或者此 collection 由于调用而发生更改），则返回 true 。 


## 遍历集合
有三种遍历方式

1. stream ( 1.8 +)
2. forEach
3. Iterators