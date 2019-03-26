# Collection 接口

Collection 表示一组对象，这些对象也称为 collection 的元素。
按照惯例，所有通用的 Collection 实现类（通常通过它的一个子接口间接实现 Collection）都有一个接受 Collection 参数的构造函数。
此构造函数称为`转换构造函数`，初始化新集合已包含指定集合中的所有元素，而不管给定集合的子接口或实现类。
换句话说，它允许你转换集合的类型。

比如：假设你有一个 `Collection<String> c`，可以转成 List 、Set，或另一种 Collection。

```java
List <String> list = new ArrayList <String>（c）;
```

Collection 接口包含执行基本操作，如:

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

在 JDK 8 和更高版本中，Collection 接口暴露了方法 `Stream<E> stream()` 和  `Stream<E> parallelStream()`，
从底层集合获得顺序的或并行的流。。（有关使用流的详细信息，请参阅标题为“ [聚合操作](../streams/index.md) ”的课程 。）

Collection 表示一组对象，它有方法告诉你集合（size，isEmpty）中有多少元素，检查给定对象是否在 collection（contains）中的方法，
从集合（add，remove）中添加和删除元素的方法，以及提供迭代器对 collection（iterator）；

**如 add:** 如果此 collection 由于调用而发生更改，则返回 true。（如果此 collection 不允许有重复元素，并且已经包含了指定的元素，则返回 false。）

**如 remove**：如果此 collection 包含指定的元素（或者此 collection 由于调用而发生更改），则返回 true 。


## 遍历集合
有三种遍历方式

1. stream ( 1.8 +)
2. forEach
3. Iterators

### stream
在 JDK 8 和更高版本中，迭代集合的首选方法是获取流并对其执行聚合操作。聚合操作通常与 lambda 表达式结合使用，
使编程更具表现力，使用更少的代码行。以下代码按顺序遍历一组形状并打印出 RED 对象：

```java
myShapesCollection.stream()
.filter(e -> e.getColor() == Color.RED)
.forEach(e -> System.out.println(e.getName()));
```

同样，您可以轻松地请求一个并行流，如果集合足够大，并且您的计算机具有足够的核心，则这可能是有意义的：

```java
myShapesCollection.parallelStream()
.filter(e -> e.getColor() == Color.RED)
.forEach(e -> System.out.println(e.getName()));
```
使用此 API 收集数据的方法有很多种。例如，您可能希望将元素转换为 String 对象，然后加入它们，并用逗号分隔：

```java
String joined = myShapesCollection.stream()
                .map(Object::toString)
                .collect(Collectors.joining(", "));
```

或则需要统计所有员工的薪水

```java
int total = employees.stream()
.collect(Collectors.summingInt(Employee::getSalary)));
```

这些只是使用流和聚合操作可以做的几个例子。有关更多信息和示例，请参阅标题为 “[聚合操作](../streams/index.md)” 的课程 。

Collections 框架总是提供了一些所谓的“批量操作”作为其 API 的一部分。这些措施包括在整个集合进行操作的方法，
如 containsAll、addAll、removeAll，等不要混淆在 JDK 8 的新特性和现有的批量操作（之间的主要区别中引入的聚合操作的那些方法 containsAll，addAll 等等。 ）旧版本都是可变的，这意味着它们都修改了底层的集合。相比之下，新的 stream 不会修改底层的集合。
当使用新的聚合操作和 lambda 表达式时，如果代码稍后从并行流中运行，则必须注意避免突变，以免将来引入问题。

### for-each
该 for-each 构造允许您使用 for 循环简洁地遍历集合或数组- [请参阅 for语句](/java/nutsandbolts/for.md)。
以下代码使用该 for-each 构造在单独的行上打印集合的每个元素。

```java
for (Object o : collection)
    System.out.println(o);
```

### 迭代器
Iterator 是一个对象，使您能够遍历集合，并根据需要从集合中有选择性地删除元素。
Iterator 通过调用它的 iterator 方法获得一个集合。以下是 Iterator 接口。

```java
public interface Iterator <E> {
    boolean hasNext（）;
    E next（）;
    void remove（）; // optional
}
```

**注意**，这 Iterator.remove 是在迭代期间修改集合的唯一安全方法；在迭代期间使用其他修改方式应该都会报错

当你需要以下操作时，应该选使用 Iterator 而不是 for-each：

- 迭代中删除元素，forEach 也是使用的 Iterator，但是语法糖上隐藏了 Iterator 的相关操作
- 遍历多个并行集合（！没有明白是什么意思）

以下方法使用 Iterator 来过滤任意 Collection，删除特定元素：

```java
  static void filter(Collection<?> c) {
      for (Iterator<?> it = c.iterator(); it.hasNext(); )
          // 唯一不同的就是这里 条件的判断
          if (!cond(it.next())) {
              it.remove();
          }
  }
```

这段代码是多态的，意味着使用与任何 Collection 实现。此示例演示使用 Java 集合框架编写多态性算法是多么容易。


## 集合接口批量操作
批量操作对整个集合进行操作。你可以使用的基本操作实现这些简化操作,尽管在大多数情况下这样的实现将是低效率的。

- containsAll - 如果此 collection 包含指定 collection 中的所有元素，则返回 true。
- addAll -  将指定 collection 中的所有元素都添加到此 collection 中（可选操作）。
- removeAll -  移除此 collection 中那些也包含在指定 collection 中的所有元素（可选操作）。
- retainAll- 从目标中删除 Collection 所有不包含在指定 Collection 中的元素。也就是说，它只保留目标 Collection 中那些也包含在指定 Collection 的元素。
- clear - 移除此 collection 中的所有元素（可选操作）。

如果目标 Collection 被修改，addAll，removeAll 以及 retainAll 方法都返回 true，

简单示例

```java
ArrayList<String> c = new ArrayList<>();
c.add("h");
c.add(null);
ArrayList<String> e = new ArrayList<>();
e.add("h");
e.add("l");
c.removeAll(Collections.singletonList("h"));
System.out.println(c); //[null]
// 删除集合中所有为null的值
c.removeAll(Collections.singleton(null));
System.out.println(c); //[]

```

`Collections.singletonList` 要注意使用，他是返回只有一个元素的集合，
所以不要这样使用 `Collections.singletonList(e)`.(除非你匹配的 list 中元素也是一个 e 类型的 list)


## 集合接口数组操作

`toArray` 此方法充当基于数组的 API 与基于 collection 的 API 之间的桥梁。

```java
  ArrayList<String> e = new ArrayList<>();
  e.add("h");
  e.add("l");
  // 该方法因为不确定是什么类型，就返回Obejct
  Object[] objects = e.toArray();
  System.out.println(objects);
  // 如果你明确的知道 e 是一个String泛型集合，那么可以把这些数据拷贝到这个新的数组中。
  String[] array = e.toArray(new String[e.size()]);
  System.out.println(array);
```
