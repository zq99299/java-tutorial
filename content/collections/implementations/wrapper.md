# 包装器实现
包装器实现将他们所有的实际工作委托给指定的集合，但在该集合提供的顶部添加额外的功能。对于设计模式来说，这是一个 装饰模式 。

这些实现是匿名的，而不是提供一个公共类，类库提供了一个静态工厂方法。所有这些实现都在Collections类中找到。它又静态方法组成。

## 同步包装器

同步包装器将自动同步(线程安全)添加到任意集合。6个核心接口 Collection， Set， List， Map， SortedSet和 SortedMap-都有一个静态工厂方法。
```java
public static <T> Collection<T> synchronizedCollection(Collection<T> c);
public static <T> Set<T> synchronizedSet(Set<T> s);
public static <T> List<T> synchronizedList(List<T> list);
public static <K,V> Map<K,V> synchronizedMap(Map<K,V> m);
public static <T> SortedSet<T> synchronizedSortedSet(SortedSet<T> s);
public static <K,V> SortedMap<K,V> synchronizedSortedMap(SortedMap<K,V> m);
```

这些方法中的每一个都返回由指定集合Collection备份的同步（线程安全）。为了保证串行访问，必须通过返回的集合完成对后台集合的所有访问。保证这一点的简单方法不是保留对后台集合的引用。使用以下技巧创建同步集合。

```java
List<Type> list = Collections.synchronizedList(new ArrayList<Type>());
```

以这种方式创建的集合与正常同步的集合一样，都是线程安全的，例如 Vector。

对并发访问，当迭代它时，用户手动同步返回的集合是很重要的。原因是迭代通过对集合的多个调用来完成，这必须被组合成单个原子操作。以下是对包装器同步的集合进行迭代的示例。
```java
Collection<Type> c = Collections.synchronizedCollection(myCollection);
synchronized(c) {
    for (Type e : c)
        foo(e);
}
```

```java
Map<KeyType, ValType> m = Collections.synchronizedMap(new HashMap<KeyType, ValType>());
    ...
Set<KeyType> s = m.keySet();
    ...
// 在m上同步，而不是s
synchronized(m) {
    while (KeyType k : s)
        foo(k);
}
```