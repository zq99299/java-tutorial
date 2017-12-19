# 通配符使用指南

学习使用泛型进行编程时，更令人困惑的一个方面是确定何时使用上界有界的通配符，何时使用下界有界的通配符。本页面提供了设计代码时要遵循的一些指导原则。

为了讨论的目的，将变量看作提供以下两个函数之一是有帮助的：

* 一个 "In" 变量
    
    一个 in 变量将数据提供给代码。想象一下有两个参数的的复制方法 `copy(src,dest)` 该SRC参数提供的数据被复制，因此它是“in”参数。

* 一个 "Out" 变量

    “out”变量保存用于其他地方的数据。在复制示例copy(src,dest)中，dest参数接受数据，所以它是“out”参数。
    
当然，一些变量既用于“in”也用于“out”的目的 - 这个方案在准则中也有说明。

在决定是否使用通配符时，可以使用“in”和“out”原则，以及使用哪种类型的通配符。以下列表提供了遵循的准则：

通配符指南： 

* 一个“in”变量用一个上界的通配符来定义，使用extends关键字。
* 使用super关键字定义一个“out”变量，其下界为通配符。
* 在可以使用Object类中定义的方法访问“in”变量的情况下，使用无界通配符。
* 在代码需要以“in”和“out”变量访问变量的情况下，不要使用通配符。

这些准则不适用于方法的返回类型。应避免使用通配符作为返回类型，因为它强制程序员使用代码来处理通配符。

由` List<? extends ...>`可以非正式地认为是只读的，但这不是一个严格的保证。假设你有以下两个类：

```java
class NaturalNumber {

    private int i;

    public NaturalNumber(int i) { this.i = i; }
    // ...
}

class EvenNumber extends NaturalNumber {

    public EvenNumber(int i) { super(i); }
    // ...
}
```

考虑下面的代码：

```java
List<EvenNumber> le = new ArrayList<>();
List<? extends NaturalNumber> ln = le;
ln.add(new NaturalNumber(35));  // compile-time error
```

因为`List <EvenNumber>`是`List<? extends NaturalNumber>`，您可以将文件分配给ln。但是，您不能使用ln将自然数添加到偶数列表中。列表中的以下操作是可能的：

* 你可以添加null。
* 你可以调用清除。
* 你可以得到迭代器并调用remove。
* 您可以捕获通配符，并写入您从列表中读取的元素。