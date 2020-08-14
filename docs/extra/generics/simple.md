# 定义简单泛型

这是 java.util 包中接口 List 和 Iterator 的定义的一小部分摘录：

```java
public interface List <E> {
    void add(E x);
    Iterator<E> iterator();
}

public interface Iterator<E> {
    E next();
    boolean hasNext();
}
```

除了尖括号中的内容外，这段代码都应该很熟悉。这些是 List 和 Iterator 接口 的形式类型参数的声明。

类型参数可以在整个泛型声明中使用，几乎可以在使用普通类型的地方使用（尽管有一些重要限制：请参见 [细节](./fineprint.md) 部分 ）

你可能会这样想：这里的 `List<Integer>` 对于 `List<E>` 来说，E 被统一替换成了 Integer。

```java
public interface List <Integer> {
    void add(Integer x);
    Iterator<Integer> iterator();
}
```

这种想法是对于理解有帮助，但是会引起误解，因为泛型的声明实际上不会以这样的方式进行扩展，在内存中、编译后等都不会有这种方式存在

类型参数类似于方法或构造中的普通参数。就像方法具有描述其操作值得 **形参**，泛型也一样。调用方法时，将实际参数替换为形参。

对于类型参数的命名，使用大写的单字母，比如 `List<E>` 中的 E 是 元素 Element 的首字母。