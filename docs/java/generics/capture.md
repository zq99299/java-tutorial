# 通配符捕获和辅助方法

在某些情况下，编译器推断通配符的类型。例如，一个列表可以被定义为 `List <?>`，
但是当评估一个表达式时，编译器从代码中推断出一个特定的类型。这种情况被称为 **通配符捕获**。



大多数情况下，除了当您看到包含短语 「捕获」 的错误消息时，您不必担心通配符捕获。

该 WildcardError 示例编译时会产生捕获错误：

```java
import java.util.List;

public class WildcardError {

    void foo(List<?> i) {
        i.set(0, i.get(0));
    }
}
```

在此示例中，编译器将 i 输入参数处理为 Object 类型。当 foo 方法调用 `List.set(int,E)` 时，
编译器无法确认被插入到列表中的对象的类型，并产生错误。当发生这种类型的错误时，通常意味着编译器认为您将错误的类型分配给变量。
因为这个原因，泛型被添加到 Java 语言中 - 在编译时强制执行类型安全检查。

通过 Oracle JDK 7 javac 实现进行编译时 ，WildcardError 示例会生成以下错误：

```java
WildcardError.java:6: error: method set in interface List<E> cannot be applied to given types;
    i.set(0, i.get(0));
     ^
  required: int,CAP#1
  found: int,Object
  reason: actual argument Object cannot be converted to CAP#1 by method invocation conversion
  where E is a type-variable:
    E extends Object declared in interface List
  where CAP#1 is a fresh type-variable:
    CAP#1 extends Object from capture of ?
1 error
```

在这个例子中，代码试图执行一个安全的操作，所以如何解决编译器错误？你可以通过编写一个捕获通配符的私有帮助方法来修复它。
在这种情况下，可以通过创建专用辅助方法 fooHelper 来解决该问题，如下所示 WildcardFixed：

```java
public class WildcardFixed {

    void foo(List<?> i) {
        fooHelper(i);
    }


      //创建Helper方法，以便捕获通配符
    //通过类型推断
    private <T> void fooHelper(List<T> l) {
        l.set(0, l.get(0));
    }

}
```

由于辅助方法，编译器使用推理来确定 T 是调用中的捕获变量 CAP＃1。现在编译成功。

按照惯例，辅助方法通常被命名为 **originalMethodName Helper** 。

现在考虑一个更复杂的例子 WildcardErrorBad：

```java
public class WildcardErrorBad {
    void swapFirst(List<? extends Number> l1, List<? extends Number> l2) {
        Number temp = l1.get(0);
        l1.set(0, l2.get(0)); // 预计 CAP#1 继承 Number,
        // 得到一个 CAP#2 的 Number;
        // 相同的绑定，但不同的类型
        l2.set(0, temp);     
    }
}
```

在这个例子中，代码正在尝试一个不安全的操作。例如，请考虑以下对 swapFirst 方法的调用：

```java
List<Integer> li = Arrays.asList(1, 2, 3);
List<Double>  ld = Arrays.asList(10.10, 20.20, 30.30);
swapFirst(li, ld);
```

虽然 `List<Integer>` 和 `List<Double>` 都满足标准 `List<? extends Number>`，
从 Integer 值列表中取一个项目并尝试将其放入 Double 值列表显然是不正确的。

使用 Oracle 的 JDK javac 编译器编译代码会产生以下错误：

```bash
WildcardErrorBad.java:7: error: method set in interface List<E> cannot be applied to given types;
      l1.set(0, l2.get(0)); // expected a CAP#1 extends Number,
        ^
  required: int,CAP#1
  found: int,Number
  reason: actual argument Number cannot be converted to CAP#1 by method invocation conversion
  where E is a type-variable:
    E extends Object declared in interface List
  where CAP#1 is a fresh type-variable:
    CAP#1 extends Number from capture of ? extends Number
WildcardErrorBad.java:10: error: method set in interface List<E> cannot be applied to given types;
      l2.set(0, temp);      // expected a CAP#1 extends Number,
        ^
  required: int,CAP#1
  found: int,Number
  reason: actual argument Number cannot be converted to CAP#1 by method invocation conversion
  where E is a type-variable:
    E extends Object declared in interface List
  where CAP#1 is a fresh type-variable:
    CAP#1 extends Number from capture of ? extends Number
WildcardErrorBad.java:15: error: method set in interface List<E> cannot be applied to given types;
        i.set(0, i.get(0));
         ^
  required: int,CAP#1
  found: int,Object
  reason: actual argument Object cannot be converted to CAP#1 by method invocation conversion
  where E is a type-variable:
    E extends Object declared in interface List
  where CAP#1 is a fresh type-variable:
    CAP#1 extends Object from capture of ?
3 errors
```

没有帮助者的方法来解决这个问题，因为代码是根本错误的。
