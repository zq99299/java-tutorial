# 接口定义

接口声明由修饰符，关键字interface，接口名称，父接口（如果有）和逗号分隔的接口列表组成。例如：

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

public访问指示符指示该接口可以通过任何类中的任何程序包一起使用。如果您没有指定接口是公共的，那么您的接口只能由与接口相同的包中定义的类访问。

一个接口可以继承其他接口，就像一个类的子类或继承另一个类一样。然而，一个类只能继承一个其他类，而一个接口可以继承任意数量的接口。接口声明包括它所继承的所有接口的逗号分隔列表。

## 接口体
接口体可以包含 _抽象方法_，_ 默认方法_和 _静态方法_。接口中的抽象方法后面是分号，但没有大括号（抽象方法不包含实现）。默认方法是用default修饰符定义的，静态方法用static关键字定义。接口中的所有抽象，默认和静态方法都是隐式的public，所以可以省略public修饰符。

另外，一个接口可以包含常量声明。在接口中定义的所有的恒定值是隐式地public，static，和final。再一次，你可以省略这些修饰符。