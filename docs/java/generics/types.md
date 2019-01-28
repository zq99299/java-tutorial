# 泛型类型

泛型类型是通过类型参数化的泛型类或接口。下面的Box类将被修改来演示这个概念。

## 一个简单的Box类

```java
public class Box {
    private Object object;

    public void set(Object object) { this.object = object; }
    public Object get() { return object; }
}
```

由于它的方法接受或返回一个Object，你可以自由地传入任何你想要的，只要它不是原始类型之一。没有办法在编译时验证类是如何使用的。代码的一部分可能会在整个框中放置一个Integer，并希望从中取出Integer，而另一部分代码可能会错误地传递一个String，导致运行时错误。

## Box类的通用版本
一个_泛型类_的定义格式如下：

```java
class name<T1, T2, ..., Tn> { /* ... */ }
```

由尖括号（`<>`）分隔的类型参数部分在类名后面。它指定了类型参数（也称为类型变量）T1，T2，...，和Tn。


要更新Box类以使用泛型，可以通过将代码“ public class Box ”更改为“ public class Box <T> ” 来创建泛型类型声明。这引入了类型变量T，可以在类中的任何地方使用。

随着这个变化，Box类变成：

```java
/**
 * Generic version of the Box class.
 * @param <T> the type of the value being boxed
 */
public class Box<T> {
    // T stands for "Type"
    private T t;

    public void set(T t) { this.t = t; }
    public T get() { return t; }
}
```

正如你所看到的，所有出现的Object被T代替。类型变量可以是您指定的任何非基本类型：任何类类型，任何接口类型，任何数组类型或甚至另一个类型变量。

这种相同的技术可以应用于创建通用接口。

## 输入参数命名约定
按照惯例，类型参数名称是单个大写字母。这与你已经知道的变量命名约定形成了鲜明的对比 ，并且有很好的理由：没有这个约定，很难区分类型变量和普通类或接口名称。

最常用的类型参数名称是：

* E - 元素（由Java集合框架广泛使用）
* K - Key
* N - Number
* T - Type
* V - Value
* S,U,V etc. - 2nd, 3rd, 4th types

您将在整个Java SE API和本课的其余部分中看到这些名称。

## 调用和实例化一个泛型类型
要从代码中引用通用Box类，必须执行泛型类型调用，它用一些具体的值替换T，例如Integer：

```java
Box<Integer> integerBox;
```

您可以将泛型类型调用看作与普通的方法调用类似，但不是将方法的参数传递给方法，而是将_类型参数_（本例中为整数）传递给Box类本身。

> Type Parameter 和 Type Argument ：泛型的类型是 Type Argument

为了实例化这个类，像往常一样使用new关键字，但在类名和括号之间放置`<Integer>`：

```java
Box<Integer> integerBox = new Box<>();
```


## The Diamond 钻石？)
在Java SE 7和更高版本中，只要编译器可以根据上下文确定或推断类型参数，就可以用一组空类型参数（`<>`）替换调用泛型类的构造函数所需的类型参数。这一对尖括号，`<>`，非正式地称为钻石。例如，您可以使用以下语句创建`Box <Integer>`的实例：

```java
Box <Integer> integerBox = new Box <>（）;
```

有关菱形表示法和类型推断的更多信息，请参阅 类型推断。

## 多种类型参数

如前所述，泛型类可以有多个类型参数。例如，通用的OrderedPair类，它实现了通用的Pair接口：

```java
public interface Pair<K, V> {
    public K getKey();
    public V getValue();
}

public class OrderedPair<K, V> implements Pair<K, V> {

    private K key;
    private V value;

    public OrderedPair(K key, V value) {
	this.key = key;
	this.value = value;
    }

    public K getKey()	{ return key; }
    public V getValue() { return value; }
}
```

以下语句创建OrderedPair类的两个实例：

```java
Pair<String, Integer> p1 = new OrderedPair<String, Integer>("Even", 8);
Pair<String, String>  p2 = new OrderedPair<String, String>("hello", "world");
```

## 参数化类型
您也可以用参数化类型（即`List <String>`）替换类型参数（即K或V）。例如，使用`OrderedPair <K，V>`示例：

```java
OrderedPair <String，Box <Integer>> p = new OrderedPair <>（“primes”，new Box <Integer>（...））;
```