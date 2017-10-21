# 从方法返回值

一个方法返回到调用它的代码

* 完成方法中的所有语句，
* 达到return声明，或
* 抛出异常（稍后介绍），

以先到者为准。

在方法声明中声明方法的返回类型。在方法的正文中，您可以使用return语句返回值。

声明为void的任何方法下都不返回值，但是也可以使用return，在这种情况下，可以使用一个return语句来分支出一个控制流程块并退出该方法，并且简单地使用如下：

```java
return;
```

如果您尝试从声明为void的方法中返回值，您将收到编译器错误。

```java
return returnValue;
```

返回值的数据类型必须与方法声明的返回类型相匹配; 您不能从声明为返回布尔值的方法返回整数值。

在对象的部分中讨论getArea()的Rectangle Rectangle类中的方法返回一个整数：

```java
    public int getArea() {
        return width * height;
    }
```

此方法返回表达式width*height求值的整数。

getArea方法返回一个原始类型。一种方法也可以返回一个引用类型。例如，在一个程序中来处理Bicycle对象，我们可能有一个这样的方法：

```java
public Bicycle seeWhosFastest(Bicycle myBike, Bicycle yourBike,
                              Environment env) {
    Bicycle fastest;
    // code to calculate which bike is 
    // faster, given each bike's gear 
    // and cadence and given the 
    // environment (terrain and wind)
    return fastest;
}
```

## 返回类或接口
如果这个部分让你感到困惑，请跳过它并在完成接口和继承之后返回它。

当一个方法使用类名作为其返回类型时，例如whosFastest，返回对象的类型的类必须是返回类型的子类，或类的确切类。假设你有一个类层次结构，它ImaginaryNumber是java.lang.Number的子类，它又是Object的一个子类， 如下图所示。

![](/assets/java/javaoo/classes-hierarchy.gif)

现在假设你有一个方法声明返回Number：

```java
public Number returnANumber() {
    ...
}
```

eturnANumber方法可以返回ImaginaryNumber但不能返回Object。ImaginaryNumber是Number因为它是Number的一个子类。但是，这Object不一定是Number- 它可能是一种String或另一种类型。

您可以覆盖一个方法并定义它来返回原始方法的子类，如下所示：

```java
public ImaginaryNumber returnANumber() {
    ...
}
```

这种称为改变返回类型的技术意味着允许返回类型与子类相同的类型。

> **注意：**  您也可以使用接口名为返回类型。在这种情况下，返回的对象必须实现指定的接口。
























