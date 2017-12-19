# 擦除泛型方法

Java编译器也会擦除泛型方法参数中的类型参数。考虑下面的一般方法：

```java
// 计算数组中元素出现的次数
public static <T> int count(T[] anArray, T elem) {
    int cnt = 0;
    for (T e : anArray)
        if (e.equals(elem))
            ++cnt;
        return cnt;
}
```

由于T是无界的，因此Java编译器将其替换为Object：

```java
public static int count(Object[] anArray, Object elem) {
    int cnt = 0;
    for (Object e : anArray)
        if (e.equals(elem))
            ++cnt;
        return cnt;
}
```

假设定义了以下类：

```java
class Shape { /* ... */ }
class Circle extends Shape { /* ... */ }
class Rectangle extends Shape { /* ... */ }
```

你可以写一个通用的方法来绘制不同的形状：

```java
public static <T extends Shape> void draw(T shape) { /* ... */ }
```

Java编译器替换T

```java
public static void draw(Shape shape) { /* ... */ }
```
