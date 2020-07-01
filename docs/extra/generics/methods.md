# 通用方法

考虑写一种方法，将数组中的所有对象放入集合中，这是第一次尝试

```java
static void fromArrayToCollection(Object[] a, Collection<?> c) {
    for (Object o : a) {
        c.add(o); // compile-time error
    }
}
```

上一小节已经讲过，这里不能添加元素到一个位置类型集合中。

要解决这些问题就是使用 **通用方法**。 就像类型声明一样，**方法声明可以是通用** 的，即由 **一个或多个类型参数进行参数化**

```java
static <T> void fromArrayToCollection(T[] a, Collection<T> c) {
    for (T o : a) {
        c.add(o); // 正确
    }
}
```

我们可以使用任何类型的集合（其 **元素类型** 是 **数组的元素类型** 的 **超类型**）来调用此方法。

```java
Object[] oa = new Object[100];
Collection<Object> co = new ArrayList<Object>();

// T 被推导为 Object
fromArrayToCollection(oa, co);

String[] sa = new String[100];
Collection<String> cs = new ArrayList<String>();

// T 被推导为 Object
fromArrayToCollection(sa, cs);

// T 被推导为 Object
fromArrayToCollection(sa, co);

Integer[] ia = new Integer[100];
Float[] fa = new Float[100];
Number[] na = new Number[100];
Collection<Number> cn = new ArrayList<Number>();

// T 被推导为 Number
fromArrayToCollection(ia, cn);

// T 被推导为 Number
fromArrayToCollection(fa, cn);

// T 被推导为 Number
fromArrayToCollection(na, cn);

// T 被推导为 Object
fromArrayToCollection(na, co);

// 编译错误：cs 元素类型是 String，na 的元素类型为 Number
fromArrayToCollection(na, cs);
```

注意，我们不必将实际的类型参数传递给泛型方法。**编译器根据实际参数的类型为我们推断出类型参数**。通常，它将推断出使调用类型正确的 **最具体的类型参数**。

## 通用方法和通配符什么时候使用？

出现的一个问题是：**什么时候应该使用通用方法**，**什么时候应该使用通配符类型？**为了理解答案，让我们研究一下 `Collection` 库中的一些方法。

```java
interface Collection<E> {
    public boolean containsAll(Collection<?> c);
    public boolean addAll(Collection<? extends E> c);
}

将上述接口改为通用方法

interface Collection<E> {
    public <T> boolean containsAll(Collection<T> c);
    public <T extends E> boolean addAll(Collection<T> c);
    // 类型变量也可以有边界！
}
```

在上述场景中， T 只被使用一次（只有一个参数），返回类型也不依赖于 T，应该使用通配符，通配符旨在 **支持灵活的子类型**，这是我们在这里试图表达的。

通用方法允许 **使用类型参数** 来表示 **方法的一个或多个参数的类型** 和/或其 **返回类型之间的依赖性**。如果没有这种依赖性，则不应使用通用方法。

可以 **同时** 使用 **通用方法和通配符**。比如方法 `Collections.copy()`：

```java
class Collections {
    public static <T> void copy(List<T> dest, List<? extends T> src) {
    ...
}
```

注意两个参数的 **类型之间的依赖关系**。从源列表 src 复制的任何对象都必须分配给目标列表 dst 的元素类型 T。因此，**src 的元素类型可以是 T 的任何子类型**，我们不在乎是哪个子类型。copy 的签名使用 **类型参数** 表示依赖项，但对第二个参数的元素类型使用 **通配符**。

我们可以使用另一种方式编写此方法签名，而不使用通配符

```java
class Collections {
    public static <T, S extends T> void copy(List<T> dest, List<S> src) {
    ...
}
```

第一个类型参数在边界中被 S 使用，但是 S 本身只被使用了一次，这说明我们可以用通配符来代替 S。**使用通配符比声明显式类型参数更清晰，更简洁，因此尽可能使用通配符**

通配符还具有可以 **在方法签名之外使用的优点**，例如字段，局部变量和数组的类型。这是一个例子。

回到我们的形状绘图问题，假设我们要保留绘图请求的历史记录，可以将历史记录保存在 class 的静态变量内

```java
static List<List<? extends Shape>>
    history = new ArrayList<List<? extends Shape>>();

public void drawAll(List<? extends Shape> shapes) {
    // 这里将请求绘图的记录添加到历史记录中
    history.add(shapes);
    for (Shape s : shapes) {
        s.draw(this);
    }
}
```

## 类型参数命名约定

最后，让我们再次注意类型参数使用的命名约定。

当 **没有任何关于类型的更具体的东西来区分它** 时，我们使 **用 T 表示类型**。这在泛型方法中经常出现。

如果有 **多个类型参数**，我们可能会使用 **字母表中与 T 相邻的字母**，比如 s。

如果 **泛型方法出现在泛型类中**，最好 **避免对方法和类的类型参数使用相同的名称**，以避免混淆。嵌套泛型类也是如此。