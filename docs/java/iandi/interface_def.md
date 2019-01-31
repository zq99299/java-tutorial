# 接口定义
[[toc]]

接口声明由关键字 interface 修饰，接口名称，父接口（如果有）和逗号分隔的接口列表组成。例如：

```java
public interface GroupedInterface extends Interface1, Interface2, Interface3 {

    // constant declarations

    // base of natural logarithms
    double E = 2.718282;

    // method signatures
    void doSomething (int i, double x);
    int doSomethingElse(String s);
}
```

public 访问指示符指示该接口可以通过任何类中的任何程序包一起使用。如果您没有指定接口是公共的，那么您的接口只能由与接口相同的包中定义的类访问。

一个接口可以继承其他接口，就像一个类的子类或继承另一个类一样。然而，一个类只能继承一个其他类，而一个接口可以继承任意数量的接口。接口声明包括它所继承的所有接口的逗号分隔列表。

## 接口体
接口体可以包含 抽象方法、默认方法 和 静态方法。接口中的抽象方法后面是分号，但没有大括号（抽象方法不包含实现）。默认方法是用 default 修饰符定义的，静态方法用 static 关键字定义。接口中的所有抽象，默认和静态方法都是隐式的 public，所以可以省略 public 修饰符。

另外，一个接口可以包含常量声明。在接口中定义的所有的恒定值是隐式地 public、static 和 final。再一次，你可以省略这些修饰符。
