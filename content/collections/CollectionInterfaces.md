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

