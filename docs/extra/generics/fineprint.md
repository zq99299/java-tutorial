# 细节

## 泛型类由其所有调用共享

以下代码打印信息是？

```java
List<String> l1 = new ArrayList<String>();
List<Integer> l2 = new ArrayList<Integer>();
System.out.println(l1.getClass() == l2.getClass());
```

你可能会想说 false，但是你错了，它打印 true；因为泛型类的 **所有实例都具有相同的运行时类**，而 **不管实际类型参数**如何。他们的 class 都是 `class java.util.ArrayList`

**使类具有泛型的原因是**，它对所有可能的 **类型参数都具有相同的行为**。可以将同一类视为具有许多不同的类型。

结果，类的 **静态变量** 和 **方法** 也将在所有实例之间共享。因此，在静态方法、初始化块、静态变量，静态初始化块声明中，**引用类型声明的类型参数是非法** 的。

```java
public static class Test<T> {
    // 比如在静态变量中使用泛型类型，就是非法的
    static T xx = null;
}
```

## 强制转换和 InstanceOf

泛型类在其所有实例之间共享的事实的另一个含义是：询问实例是否是 **泛型类型的特定调用的实例** 通常没有任何意义：

```bash
Collection cs = new ArrayList<String>();
// 非法.
if (cs instanceof Collection<String>) { ... }
```

还有类似的

```java
// Unchecked warning,
Collection<String> cstr = (Collection<String>) cs;
```

发出未经检查的警告，因为这不是运行时系统要检查的内容

类型变量也是如此

```java
// Unchecked warning. 
<T> T badCast(T t, Object o) {
    return (T) o;
}
```

**类型变量在运行时不存在**。这意味着它们在时间和空间上都没有性能开销，这很好。不幸的是，这也意味着您不能在类型转换中可靠地使用它们。

## 数组

数组对象的 **组件类型** 不能是 **类型变量** 或 **参数化类型**，除非它是(无界的) **通配符类型**。。您可以声明其元素类型为 **类型变量** 或 **参数化类型** 的 **数组类型**，但不能声明数组对象。

```java
// 不允许的
List<String>[] lsa = new List<String>[10];
Object o = lsa;
Object[] oa = (Object[]) o;

List<Integer> li = new ArrayList<Integer>();
li.add(new Integer(3));

// 不健全，但通过运行时存储检查
oa[1] = li;

// 运行时异常: ClassCastException.
String s = lsa[1].get(0);
```

如果允许使用参数化类型的数组，则前面的示例将在编译时没有任何未经检查的警告，但在运行时会失败。我们已经将类型安全性作为泛型的主要设计目标。特别是，该语言旨在确保 **如果使用`javac-source 1.5 `编译了整个应用程序而没有未经检查的警告**，则该语言是**安全的**。

```java
// 无界通配符类型的数组。
List<?>[] lsa = new List<?>[10];
Object o = lsa;
Object[] oa = (Object[]) o;

List<Integer> li = new ArrayList<Integer>();
li.add(new Integer(3));
// Correct.
oa[1] = li;

// Run time error, but cast is explicit.
String s = (String) lsa[1].get(0);
```

在导致编译时错误的下一个变体中，我们不创建元素类型为参数化的数组对象，但仍使用具有参数化元素类型的数组类型。

```java
// Error.
List<String>[] lsa = new List<?>[10];
```

同样，尝试创建其 **元素类型** 为 **类型变量** 的 数组对象会导致编译时错误：

```java
<T> T[] makeArray(T t) {
    return new T[100]; // Error.
}
```

由于类型变量在运行时不存在，因此无法确定实际的数组类型

解决这些限制的方法是使用 Class 类作为运行时类型令牌，如下一节中所述，Class 类作为运行时类型令牌。