# 问题和练习

## 问题

> 1. 编写一个通用方法来计算具有特定属性（例如，奇数整数，素数，回文）的集合中元素的数量。

答：
```java
public class Algorithm {
    public static void main(String[] args) {
        Collection<Integer> ci = Arrays.asList(1, 2, 3, 4);
        int count = Algorithm.countIf(ci, new OddPredicate());
        System.out.println("Number of odd integers = " + count);
    }

    public static <T> int countIf(Collection<T> c, UnaryPredicate up) {
        int count = 0;
        for (T t : c) {
            // 可以看到通过接口操作把判定逻辑放到了 传递进来的实例中
            if (up.test(t)) {
                count++;
            }
        }
        return count;
    }

    // 一元操作接口； 该接口和Java8中的拉姆达表达式部分接口类似
    interface UnaryPredicate<T> {
        boolean test(T t);
    }

    // 奇数操作
    static class OddPredicate implements UnaryPredicate<Integer> {

        @Override
        public boolean test(Integer val) {
            return val % 2 != 0;
        }
    }
}
```

> 2. 下列类会编译？如果没有，为什么？

```java
public final class Algorithm {
    public static <T> T max(T x, T y) {
        return x > y ? x : y;
    }
}    
```
答：大于小于运算符只能用于数字。这里的T有可能不是一个数字

> 3. 编写一个通用的方法来交换数组中两个不同元素的位置。

答：
```java
public final class Algorithm {
    public static <T> void swap(T[] a, int i, int j) {
        T temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}
```

> 4. 如果编译器在编译时擦除所有类型参数，为什么要使用泛型？

答：您应该使用泛型，因为：

* Java编译器在编译时对泛型代码执行更严格的类型检查。
* 泛型支持编程类型作为参数。
* 泛型使您能够实现泛型算法。

> 5. 类型擦除后转换为以下类别的是什么？

```java
public class Pair<K, V> {

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey(); { return key; }
    public V getValue(); { return value; }

    public void setKey(K key)     { this.key = key; }
    public void setValue(V value) { this.value = value; }

    private K key;
    private V value;
}
```

答：K和V都转换为Object了

> 6. 类型擦除后转换为以下方法是什么？

```java
public static <T extends Comparable<T>>
    int findFirstGreaterThan(T[] at, T elem) {
    // ...
}
```

答：

```java
public static int findFirstGreaterThan(Comparable[] at, Comparable elem) {
// ...
}
```
> 7. 下面的方法会编译吗？如果没有，为什么？

```java
public static void print(List<? extends Number> list) {
    for (Number n : list)
        System.out.print(n + " ");
    System.out.println();
}
```

答：可以被编译

> 8. 编写一个通用的方法来查找列表范围[begin，end）中的最大元素。

答：

```java
    public static <T extends Object & Comparable<? super T>>
T max(List<? extends T> list, int begin, int end) {

    T maxElem = list.get(begin);

    for (++begin; begin < end; ++begin)
        if (maxElem.compareTo(list.get(begin)) < 0)
            maxElem = list.get(begin);
    return maxElem;
}

--------- 下面是我自己写的一个版本 ------------
public static <T extends Comparable<T>> T max(List<T> list, int begin, int end) {
    T max = null;
    for (int i = begin; i < end; i++) {
        T t = list.get(i);
        if (max == null) {
            max = t;
            continue;
        }
        if (max.compareTo(t) < 0) {
            max = t;
        }
    }
    return max;
}

-------------- 测试 -----------

List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 3);
System.out.println(max(list, 0, list.size()));  // 5
List<String> listStr = Arrays.asList("a", "v", "xk", "oooo", "z", "d"); // z
System.out.println(max(listStr, 0, list.size()));
```
官网的版本看上去就是高大上一点

> 9. 下列类会编译？如果没有，为什么？

```java
public class Singleton<T> {

    public static T getInstance() {
        if (instance == null)
            instance = new Singleton<T>();

        return instance;
    }

    private static T instance = null;
}
```
答：不可以。您不能创建类型参数T的静态字段。

> 10. 鉴于以下类：

```java
class Shape { /* ... */ }
class Circle extends Shape { /* ... */ }
class Rectangle extends Shape { /* ... */ }

class Node<T> { /* ... */ }
```
下面代码将被编译？如果没有，为什么？

```java
Node<Circle> nc = new Node<>();
Node<Shape>  ns = nc;
```
答：不可以，因为`Node <Circle>`不是`Node <Shape>`的子类型。

> 11. 考虑这个类：

```java
class Node<T> implements Comparable<T> {
public int compareTo(T obj) { /* ... */ }
// ...
}
```
下面代码将被编译？如果没有，为什么？
```java
Node<String> node = new Node<>();
Comparable<String> comp = node;
```
答：被编译

> 12. 你如何调用下面的方法来查找列表中的第一个整数是相对于指定整数列表的主要？

```java
public static <T>
    int findFirst(List<T> list, int begin, int end, UnaryPredicate<T> p)
```
答：？？？题目翻译的不好，没有看明白
