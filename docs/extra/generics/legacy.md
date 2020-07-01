# 与旧版代码互操作

到目前为止，我们所有的示例都假设了一个理想化的世界：每个人都在使用支持泛型的 Java 编程语言的最新版本。实际上并非如此。数百万行代码已用该语言的早期版本编写。

稍后，在 [将旧版代码转换为使用泛型](./convert.md)部分中，我们将解决 **将旧代码转换为使用泛型的问题**。

在本节中，我们将关注一个简单的问题：旧代码和泛型代码如何互操作？这个问题分为两个部分：

- 在泛型代码中使用旧代码
- 在旧代码中使用泛型代码

## 在泛型代码中使用旧代码

在仍然享受自己代码中泛型的好处的同时，如何使用旧代码？

例如，假设您要使用 package  `com.Example.widgets`。Example.com 是一个销售库存控制系统，其要点如下所示：

```java
package com.Example.widgets;

public interface Part {...}

public class Inventory {
    public static void addAssembly(String name, Collection parts) {...}
    public static Assembly getAssembly(String name) {...}
}

public interface Assembly {
    Collection getParts();
}
```

现在，您想添加使用上述 API 的新代码。始终确保 `addAssembly()` 使用正确的参数进行调用是一件好事，也就是说，您传入的集合 `Collection` 中的元素的确是 `Part`。当然，泛型是为此而量身定制的：

```java
package com.mycompany.inventory;

import com.Example.widgets.*;

public class Blade implements Part {
    ...
}

public class Guillotine implements Part {
}

public class Main {
    public static void main(String[] args) {
        Collection<Part> c = new ArrayList<Part>();
        c.add(new Guillotine()) ;
        c.add(new Blade());
        Inventory.addAssembly("thingee", c);
        Collection<Part> k = Inventory.getAssembly("thingee").getParts();
    }
}
```

当我们调用 addAssembly 时，它期望第二个参数的类型为 Collection。实际参数的类型是 `Collection<Part>`。这是可行的，但为什么呢？毕竟，大多数集合不包含 Part 对象，因此通常，编译器无法知道 Collection 类型所指的集合类型。

在适当的 **泛型代码中**，集合总是伴随着 **类型参数**。当使用像 Collection 这样的泛型类型而 **不带类型参数** 时，它被称为 **原始类型**

多数人的本能会认为 `Collection` 是 `Collection<Object>`，正如前面所看到的，在需要 `Collection<Object>` 的地方传递 `Collection<Part>` 是不安全的。更准确的说，`Collection` 表示某种未知类型的集合，就像 `Collection<?>`

但是，等等，那也不对！考虑对 `getParts()` 的调用，该调用返回 `Collection`。然后将其分配给  `Collection<Part> k` 。如果调用的结果为 `Collection<?>`，则分配将为错误。

实际上，该分配是合法的，但是会生成 *未经检查的警告*。需要警告，因为事实是编译器无法保证其正确性。我们无法检查旧代码，`getAssembly()` 以确保确实返回的集合的元素是 `Part`。代码中使用的类型是 `Collection`，并且可以合法地将各种对象插入此类集合中。

所以，**这不应该是一个错误吗？从理论上讲，是的**。但是实际上，**如果泛型代码要调用旧代码**，则必须允许这样做。在这种情况下，由程序员（您自己）决定，这是安全的，因为即使类型签名没有显示，契约 `getAssembly()` 仍会返回 `Part`  的集合，这是安全的。

因此，**原始类型** 非常 **类似于通配符类型**，但是没有严格地对它们进行类型检查。这是一个经过深思熟虑的设计决策，以允许泛型与现有的旧代码互操作。

在泛型代码中调用旧代码本质上是危险的，他们一混合，泛型提供的安全保障将都失效，但是，与完全不使用泛型的情况相比，至少您知道自己的代码是一致的。

目前，存在更多的非泛型代码，然后是泛型代码，并且不可避免地会出现必须混合使用的情况。

如果发现 **必须混合使用旧代码和泛型代码**，请密切 **注意未检查的警告**。仔细考虑如何才能证明引起警告的代码的安全性。

如果您仍然犯了一个错误，并且引起警告的代码确实不是安全的，会发生什么？让我们来看看这种情况。在此过程中，我们将深入了解编译器的工作原理。

## 泛型擦除

```java
public String loophole(Integer x) {
    List<String> ys = new LinkedList<String>();
    List xs = ys;
    xs.add(x); //  编译时检查警告
    return ys.iterator().next();
}
```

这里将 ` List<String> ys ` 取了一个别名 `List xs`，将 Integer 类型放入了 String 类型的集合中。在程序运行时，将失败。

在程序运行时，上述代码行为类似与如下代码

```java
public String loophole(Integer x) {
    List ys = new LinkedList;
    List xs = ys;
    xs.add(x); 
    return(String) ys.iterator().next(); // 运行时异常
}
```

当我们从列表中提取一个元素，并尝试通过将其强制转换为 String 时，我们将得到一个 `ClassCastException`。

这样做的原因是，泛型由 Java 编译器实现为称为 *erasure* 的前端转换，将泛型版本，转换为非泛型版本。

结果，**即使存在未经检查的警告，Java 虚拟机的类型安全性和完整性也永远不会受到威胁**。

基本上会 **擦除 所有泛型类型信息**，擦除了尖括号之间的所有类型信息，例如，将类似的参数化类型`List<String> `转换为 `List`，类型变量的所有其余用法都由类型变量的上限（通常为 `Object` ）代替。而且，**只要结果代码的类型不正确，就会插入对相应类型的强制类型转换**，例如上述代码的最后一行。

擦除的全部细节不在本教程的讨论范围之内，但是我们刚刚给出的简单描述与事实并非遥不可及。最好对此有所了解，特别是如果您想做更复杂的事情，例如将现有的 API 转换为使用泛型

## 在旧代码中使用泛型

现在让我们考虑相反的情况。想象一下 Example.com 选择将其 API 转换为使用泛型，但其中一些客户端尚未使用。因此，现在的代码如下所示：

```java
package com.Example.widgets;

public interface Part { 
    ...
}

public class Inventory {
    public static void addAssembly(String name, Collection<Part> parts) {...}
    public static Assembly getAssembly(String name) {...}
}

public interface Assembly {
    Collection<Part> getParts();
}
```

客户端代码如下（未使用泛型的）：

```java
package com.mycompany.inventory;

import com.Example.widgets.*;

public class Blade implements Part {
...
}

public class Guillotine implements Part {
}

public class Main {
    public static void main(String[] args) {
        Collection c = new ArrayList();
        c.add(new Guillotine()) ;
        c.add(new Blade());

        // 1: unchecked warning
        Inventory.addAssembly("thingee", c);

        Collection k = Inventory.getAssembly("thingee").getParts();
    }
}
```

客户代码是在引入泛型之前编写的，但是它使用的包 `com.Example.widgets` 和集合库都使用泛型类型。客户端代码中所有泛型类型声明的使用都是 **原始类型**。

第 1 行产生一个未检查的警告，因为编译器不能确保  Collection 的元素是 Part 类型的