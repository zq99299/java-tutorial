# 通配符和子类型

如 [泛型，继承和子类型](/content/java/generics/inheritance.md)中所述，泛型类或接口不仅仅是因为它们的类型之间有关系而是相关的。但是，可以使用通配符在泛型类或接口之间创建关系。

以下有两个非泛型的类

```java
class A { /* ... */ }
class B extends A { /* ... */ }
```
写下面的代码是合理的
```java
B b = new B();
A a = b;
```

这个例子显示了常规类的继承遵循这种子类型的规则：如果B继承A，则类B是类A的子类型。该规则不适用于泛型类型：

```java
List<B> lb = new ArrayList<>();
List<A> la = lb;   // 编译时错误
```

鉴于Integer是Number的子类型，`List <Integer>`和List `<Number>`之间的关系是什么？



![](/assets/java/generics/generics-listParent.gif)
共同的父类是 `List<?>`

虽然Integer是Number的子类型，但`List <Integer>`不是`List <Number>`的子类型，实际上这两个类型是不相关的。`List <Number>`和`List <Integer>`的公共父级是`List <?>`。

为了创建这些类之间的关系，以便代码可以通过`List <Integer>`的元素访问Number的方法，请使用上界的通配符：

```java
List<? extends Integer> intList = new ArrayList<>();
List<? extends Number>  numList = intList;  // ok ,List<? extends Integer>  是 List<? extends Number> 的子类型
```

因为Integer是Number的子类型，所以他们的list之间存在一个关系，下图标识了个泛型的关系
![](/assets/java/generics/generics-wildcardSubtyping.gif)

你可以看到由` List<? extends NaturalNumber> `不是只读的，但是您可能会这样想，因为您无法存储新元素或更改列表中的现有元素。




