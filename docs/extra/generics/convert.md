# 将旧版代码转换为使用泛型

## 入参转换

如果您决定将旧代码转换为使用泛型，则需要仔细考虑如何修改 API。

你必须确保泛型 API 不受限制，它必须支持原来的旧的调用。考虑一个示例：`java.util.Collection`

```java
interface Collection {
    public boolean containsAll(Collection c);
    public boolean addAll(Collection c);
}
```

尝试把他修改为泛型的

```java
interface Collection<E> {
    public boolean containsAll(Collection<E> c);
    public boolean addAll(Collection<E> c);
}
```

虽然这个 API 保证了类型的安全，对于  `containsAll()` API 不符合原来的 API 了。

- `containsAll(Collection c)`：不同类型的集合是可以比较的，而新的必须要是两个 E 类型的集合
- 传入不同类型的集合不行了，可能是因为调用方不知道传入的集合的确切类型，或者因为它是集合 `<S>`，其中 S 是 E 的子类型。

对于 `addAll` 应该可以添加任何 E 类型的或 E 子类型的元素。这个在前面通用方法中讲解过了。

您还需要确保修订后的 API 保留与旧客户端的二进制兼容性。这意味着该 API 的擦除必须与原始的未经过增强的API 相同。在大多数情况下，这是自然而然的事情，但是有一些微妙的情况。我们将研究我们遇到的最微妙的情况之一：`Collections.max()`，在前面也讲解过。合理的签名是

```java
public static <T extends Comparable<? super T>> T max(Collection<T> coll)
```

删除泛型后

```java
public static Comparable max(Collection coll)

    可以看到与原始 API 不同了
    
public static Object max(Collection coll)
```

所有旧的二进制文件依赖返回  Object 的方法签名。

这个时候我们可以使用显示指定 **超类型来作为泛型变量的擦除**

```java
public static <T extends Object & Comparable<? super T>> T max(Collection<T> coll)
```

已知具有多个界限的类型变量是界限中列出的所有类型的子类型，**边界中第一个类型将用作类型变量的擦除**

JDK 中该方法的实际签名是 

```java
public static <T extends Object & Comparable<? super T>> T max(Collection<? extends T> coll)
```

## 返回参数类型转换

另一个问题是返回参数类型的优化，你 **不应该在旧的 API 中利用泛型功能**，下面我们来探讨下为什么

假设旧 API 为

```java
public class Foo {
    // 工厂方法，返回 Foo 或他的子类
    public Foo create() {
        ...
    }
}

public class Bar extends Foo {
    // 重写后，实际返回  Bar 类型
    public Foo create() {
        ...
    }
}
```

利用重载原理，我们可以把返回类型修改为实际的类型

```java
public class Foo {
    public Foo create() {
        ...
    }
}

public class Bar extends Foo {
    // 修改了返回类型
    public Bar create() {
        ...
    }
}
```

现在，假设您的代码的第三方客户端编写了以下内容：

```java
public class Baz extends Bar {
    // Actually creates a Baz.
    public Foo create() {
        ...
    }
}
```

Java 虚拟机 **不直接支持具有不同返回类型的方法的覆盖**。编译器支持此功能，因此 Baz 类必须重新，因为它不能覆盖 Bar 中的 create 方法，因为它返回的类型不是  Bar 中 create 返回的子类型。