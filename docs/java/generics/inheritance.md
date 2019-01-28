# 泛型，继承和子类型

正如你所知道的，只要类型是兼容的，就可以将一种类型的对象分配给另一种类型的对象。例如，可以将一个Integer赋值给一个Object，因为Object是Integer的超类型之一：

```java
Object someObject = new Object();
Integer someInteger = new Integer(10);
someObject = someInteger;   // OK
```
在面向对象的术语中，这被称为“是”的关系。由于Integer 是一种Object，所以赋值是允许的。但整数也是一种数字，所以下面的代码也是有效的：

```java
public void someMethod(Number n) { /* ... */ }

someMethod(new Integer(10));   // OK
someMethod(new Double(10.1));   // OK
```

您可以执行泛型类型调用，将Number作为其类型参数传递，如果参数与Number兼容，则可以允许任何后续的add调用：

```java
Box<Number> box = new Box<Number>();
box.add(new Integer(10));   // OK
box.add(new Double(10.1));  // OK
```

现在考虑下面的方法：

```java
public void boxTest(Box<Number> n) { /* ... */ }
```

通过查看它的签名，可以看到它接受一个类型为`Box <Number>`的单个参数。

这是什么意思？是否允许按照您所期望的方式传入`Box <Integer>`或`Box <Double>`？答案是“否”，因为`Box <Integer>`和`Box <Double>`不是`Box <Number>`的子类型。

在泛型编程中，这是一个常见的误解，但这是一个很重要的概念。

![](/assets/java/generics/generics-subtypeRelationship.gif)


> 注意：
给定两个具体类型A和B（例如Number和Integer），`MyClass <A>`与`MyClass <B>`没有关系，不管A和B是否相关。`MyClass <A>`和`MyClass <B>`的公共父项是Object。

> 有关如何在类型参数相关时如何在两个泛型类之间创建子类型关系的信息，请参阅通配符和子类型 。


## 泛型类和子类型

你可以通过继承或实现泛型类或接口，这样的类叫做泛型类的子类型，一个类或接口的类型参数与另一个类的类型参数之间的关系由扩展和实现条款决定。

以Collections类为例，`ArrayList <E>`实现`List <E>`，`List <E>`扩展`Collection <E>`。所以`ArrayList <String>`是`List <String>`的一个子类型，它是`Collection <String>`的一个子类型。只要不改变类型参数，子类型关系在类型之间保留。

![](/assets/java/generics/generics-sampleHierarchy.gif)

现在设想我们想要定义我们自己的列表接口PayloadList，它将泛型类型P的可选值与每个元素相关联。其声明可能如下所示：

```java
interface PayloadList<E,P> extends List<E> {
  void setPayload(int index, P val);
  ...
}
```

PayloadList 的以下参数是`List <String>`的子类型：

```java
PayloadList<String,String>
PayloadList<String,Integer>
PayloadList<String,Exception>
```

![](/assets/java/generics/generics-payloadListHierarchy.gif)



