# Object作为超类 

Object在java.lang包装，坐镇类层次结构树的顶端。每个阶级都是阶级的直接或间接的后裔Object。您使用或编写的每个类都继承了Object实例方法。您不需要使用这些方法中的任何一种，但是，如果您选择这样做，则可能需要使用特定于您的类的代码来覆盖它们。本节讨论Object的方法是：

* `protected Object clone() throws CloneNotSupportedException`
     
	 传进并返回此对象的副本
* `public boolean equals(Object obj)`
      
	 其他某个对象是否“等于”这一个
* `protected void finalize() throws Throwable`
      
	 当垃圾收集确定没有更多的对象引用时，垃圾回收器调用该方法
* `public final Class getClass()`
      
	 返回对象的运行时类
* `public int hashCode()`
      
	 返回该对象的哈希码值
* `public String toString()`
      
	 返回对象的字符串表示形式。

notify，notifyAll和wait方法，它在后面的课程中讨论，并不会在这里介绍的同步独立运行的线程的活动中发挥作用。有五种方法：

* `public final void notify()`
* `public final void notifyAll()`
* `public final void wait()`
* `public final void wait(long timeout)`
* `public final void wait(long timeout, int nanos)`

> **注意：**  这些方法中有一些细微的方面，尤其是clone方法。


## `clone()` 方法

如果某个类或其某个超类实现了该Cloneable接口，则可以使用该clone()方法从现有对象创建一个副本。要创建一个克隆，你写：

```java
aCloneableObject.clone();
```

Object这个方法的实现将检查`clone()`被调用的对象是否实现了Cloneable接口。如果该对象没有，该方法抛出一个CloneNotSupportedException异常。异常处理将在后面的课程中介绍。目前，您需要知道`clone()`必须声明为

```java
protected Object clone() throws CloneNotSupportedException

or:

public Object clone() throws CloneNotSupportedException
```

如果你打算写一个`clone()`方法来覆盖Object。

如果`clone()`被调用的对象确实实现了Cloneable接口，则Object该`clone()`方法的实现将创建与原始对象相同类的对象，并将新对象的成员变量初始化为与原始对象的相应成员变量具有相同的值。

使类可复制的最简单的方法是添加implements Cloneable到类的声明中。那么你的对象可以调用`clone()`方法。

对于一些类，默认行为Object的`clone()`方法工作得很好。但是，如果某个对象包含对外部对象的引用,则可能需要重写`clone()`才能获得正确的行为。否则，外部引用对象所做的更改也将在克隆中可见。这意味着原始对象和它的克隆不是独立的，要解耦他们，必须重写。连引用的外部对象也需要克隆，以便该对象和它的克隆是真正独立的。

## equals 方法

equals方法比较两个对象是否相等，如果返回true则相等。Object中提供的equals方法使用 “==” 来确定两个对象是否相等，对于原始数据类型，这给出了正确的结果。然而，对于对象来说，事实并非如此。

为了测试两个包含相同信息的对象是否相等。必须重写equals方法。这里是一个例子

```java
public class Book {
    ...
    public boolean equals(Object obj) {
        if (obj instanceof Book)
            return ISBN.equals((Book)obj.getISBN()); 
        else
            return false;
    }
}
```

考虑这个测试Book类的两个实例是否相等的代码：

```java
// Swing Tutorial, 2nd edition
Book firstBook  = new Book("0201914670");
Book secondBook = new Book("0201914670");
if (firstBook.equals(secondBook)) {
    System.out.println("objects are equal");
} else {
    System.out.println("objects are not equal");
}
```

即使firstBook和secondBook引用不同的对象。它们被认为是相等的，因为比较的对象包含相同的ISBN号码。

如果equals默认的运算不符合你的类，则应该始始终重写该方法

> 注意：如果您重写equals()，您也必须重写hashCode()。