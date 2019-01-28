# 有界类型参数

有时可能需要限制可以用作参数化类型的类型参数的类型。例如，对数字进行操作的方法可能只想接受Number实例或其子类。这是有界的类型参数。

要声明有界的类型参数，请列出类型参数的名称，后跟extends关键字，后跟其上限，在本例中为Number。注意，在这种情况下，extends在一般意义上用来表示“扩展”（如在类中）或“实现”（如在接口中）。

```java
public class Box<T> {

    private T t;          

    public void set(T t) {
        this.t = t;
    }

    public T get() {
        return t;
    }

    public <U extends Number> void inspect(U u){
        System.out.println("T: " + t.getClass().getName());
        System.out.println("U: " + u.getClass().getName());
    }

    public static void main(String[] args) {
        Box<Integer> integerBox = new Box<Integer>();
        integerBox.set(new Integer(10));
        integerBox.inspect("some text"); // error: this is still String!
    }
}
```

通过修改我们的泛型方法来包含这个有界的类型参数，编译将会失败，因为我们的调用inspect仍然包含String：

```bash
Box.java:21: <U>inspect(U) in Box<java.lang.Integer> cannot
  be applied to (java.lang.String)
                        integerBox.inspect("10");
                                  ^
1 error
```

除了限制可用于实例化泛型的类型之外，有界的类型参数还允许您调用在边界中定义的方法：

```java
public class NaturalNumber<T extends Integer> {

    private T n;

    public NaturalNumber(T n)  { this.n = n; }

    public boolean isEven() {
        return n.intValue() % 2 == 0;
    }

    // ...
}
```

ISEVEN方法通过类T调用的Integer中所定义的intValue方法

## 多重界限

前面的例子说明了使用带有单个边界的类型参数，但是一个类型参数可以有多个边界：

```java
<T extends B1 & B2 & B3>
```

具有多个边界的类型变量是边界中列出的所有类型的子类型。如果其中一个边界是一个类，则必须先指定它。例如：

```java
Class A { /* ... */ }
interface B { /* ... */ }
interface C { /* ... */ }

class D <T extends A & B & C> { /* ... */ }
```

如果未先指定绑定A，则会出现编译时错误：

```bash
class D <T extends B & A & C> { /* ... */ }  // compile-time error
```