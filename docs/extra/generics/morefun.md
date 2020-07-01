# 通配符带来更多乐趣

在本节中，我们将考虑通配符的一些更高级的用法。前面讲解了几个示例，其中从数据结构中读取数据时，有界通配符很有用。现在考虑相反的，**只写数据结构**。

```java
interface Sink<T> {
   void flush(T t);
}
```

如下使用：writeAll 将列表中的数据通过 flush 方法写入，然后返回最后一个写入的数据元素

```java
public static <T> T writeAll(Collection<T> coll, Sink<T> snk) {
    T last;
    for (T t : coll) {
        last = t;
        snk.flush(last);
    }
    return last;
}
...
Sink<Object> s;
Collection<String> cs;
String str = writeAll(cs, s); // Illegal call. 非法调用
```

对  `writeAll（）`  的调用是非法的，因为无法推导出有效的 **类型参数**，String 或则 Object 都不是 T 的合适类型，因为 Sink 元素和 Collection 元素类型要是相同的。

我们可以使用通配符来改写 writeAll 方法声明

```java
public static <T> T writeAll(Collection<? extends T>, Sink<T>) {...}
...
// 调用正常，但是返回类型错误
String str = writeAll(cs, s);
```

调用正常，但是返回类型错误，推导出的返回类似是 Objec，是由 s 变量推导出来的，cs 是 T 的子类，S 是 T。

## 下界通配符

解决方案是使用 **下界通配符**，`? super T`，表示未知类型是 T 的超类或则就是 T.

```java
public static <T> T writeAll(Collection<T> coll, Sink<? super T> snk) {
    ...
}
String str = writeAll(cs, s); // Yes! 
```

- `? super T`：下界通配符，至少是 T 类型
- `? extends T`：上限通配符，必须是 T 的子类或 T

让我们再来看一个例子， ` java.util.TreeSet<E>` 的 E 表示要排序的元素类型。在构造函数可以传入一个比较器

```java
TreeSet(Comparator<E> c) 


interface Comparator<T> {
    int compare(T fst, T snd);
}
```

假设我们想要创建一个 `TreeSet<String>` 并传递一个合适的比较器，我们需要传递一个可以比较字符串的比较器。这可以通过 `Comparator<String>` 完成，但是 `Comparator<Object>` 也可以完成。

但是，我们无法把   `Comparator<Object>`  传递给上面的构造函数，这个时候就可以使用下界通配符来获得我们想要的灵活性

```java
TreeSet(Comparator<? super E> c) 
```

这个测试用例如下，因为 TreeSet 已经使用下界通配符了，我们用自己的例子来演示

```java
public class Demo<E> {
    public static void main(String[] args) {
        new Demo<String>(new Comparator<Object>() {
            @Override
            public int compare(Object o1, Object o2) {
                return 0;
            }
        });
    }

    public Demo(Comparator<? super E> xx) {

    }

    interface Comparator<T> {
        int compare(T fst, T snd);
    }
}
```

再来看一个下界通配符的示例 `Collections.max()`，该方法返回给定参数集合中的最大元素，为了 max 方法能正常工作，必须传入集合中的元素都必须实现了  Comparable 接口。

```java
public static <T extends Comparable<T>> T max(Collection<T> coll)
```

也就是说，该方法采用与自身相当的某种 **类型 T** 的集合，并返回该类型的元素。但是，此代码过于严格。若要了解原因，请考虑与任意对象相当的类型：

```java
class Foo implements Comparable<Object> {
    ...
}
Collection<Foo> cf = ... ;
Collections.max(cf); // 应该正常工作
```

Foo 实现了 Comparable，因此每个 Foo 元素都可以与另一个 Foo 元素比较，但是调用被拒绝，失败了。

被推导为，T 必须和 T 比较，T 不必与自己完全可比。所需要做的就是让 T 与其超类型之一可比。这给我们：

```java
public static <T extends Comparable<? super T>> T max(Collection<T> coll)
```

通常

- `? super T`：下界通配符

  如果 API 用 T 作为参数

- `? extends T`：上限通配符

  如果 API 只返回 T

而上面的 max，又用 T 作为参数，又用 T 作为返回值。就合并起来用。

## 通配符捕获

```java
Set<?> unknownSet = new HashSet<String>();
...
/* Add an element  t to a Set s. */ 
public static <T> void addToSet(Set<T> s, T t) {
    ...
}
```

调用非法

```java
addToSet(unknownSet, "abc"); // Illegal.
```

作为参数传递的表达式是一组未知类型，不能保证是一组字符串，或者特别是任何类型。

因为可以从第 2 个传入的参数推导出是字符串类型，但是第一个参数是一个 `?` 未知类型。 他们又公用一个 T，所以调用非法。

看下面一个例子：

```java
class Collections {
    ...
    <T> public static Set<T> unmodifiableSet(Set<T> set) {
        ...
    }
}
...
Set<?> s = Collections.unmodifiableSet(unknownSet); // 这个调用正常，为什么？
```

从前面看起来，也是不允许的，但是因为这里只有一个参数，它是绝对安全的，毕竟，无论元素类型是什么， unmodifiableSet 都适用于任何类型的 Set。

由于这种情况经常发生，因此有一条特殊的规则允许在非常特殊的情况下使用此类代码，在这种情况下，可以证明该代码是安全的。该规则称为 **通配符捕获**，它允许编译器将通配符的未知类型作为通用方法的类型参数进行推断。

