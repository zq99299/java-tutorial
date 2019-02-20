# 泛型方法和有界类型参数

有界的类型参数是实现通用算法的关键。考虑下面的方法来计算大于指定元素 elem 在数组 T 中的元素个数。

```java
public static <T> int countGreaterThan(T[] anArray, T elem) {
    int count = 0;
    for (T e : anArray)
        if (e > elem)  // compiler error
            ++count;
    return count;
}
```

该方法的实现很简单，但是它不能编译，因为大于运算符（>）仅适用于诸如 short、int、double、long、float、byte 和 char 等基本类型。
您不能使用 > 运算符来比较对象。要解决此问题，请使用由 `Comparable <T>` 接口定界的类型参数：

```java
public interface Comparable<T> {
    public int compareTo(T o);
}
```

改写后：

```java
public static <T extends Comparable<T>> int countGreaterThan(T[] anArray, T elem) {
    int count = 0;
    for (T e : anArray)
        if (e.compareTo(elem) > 0)
            ++count;
    return count;
}
```
