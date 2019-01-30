# 方法返回值

一个方法返回到调用它的代码

* 完成方法中的所有语句，
* 达到 return 声明，或
* 抛出异常（稍后介绍），

以先到者为准。

在方法声明中声明方法的返回类型。在方法的正文中，您可以使用 return 语句返回值。

声明为 void 的任何方法下都不返回值，但是也可以使用 return，在这种情况下，可以使用一个 return 语句来分支出一个控制流程块并退出该方法，并且简单地使用如下：

```java
return;
```

如果您尝试从声明为 void 的方法中返回值，您将收到编译器错误。

```java
return returnValue;
```

返回值的数据类型必须与方法声明的返回类型相匹配；您不能从声明为返回布尔值的方法返回整数值。

在对象的部分中讨论 `getArea()` 的 Rectangle  类中的方法返回一个整数：

```java
    public int getArea() {
        return width * height;
    }
```

此方法返回表达式 width*height 求值的整数。

getArea 方法返回一个原始类型。一种方法也可以返回一个引用类型。例如，在一个程序中来处理 Bicycle 对象，我们可能有一个这样的方法：

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
如果这个部分让你感到困惑，请跳过它，并在完成 [接口和继承](../iandi/index.md) 之后再返回来观看。

当一个方法使用类名作为其返回类型时，例如 ImaginaryNumber 是 java.lang.Number 的子类，它又是 Object 的一个子类， 如下图所示。

![](./assets/classes-hierarchy.gif)

现在假设你有一个方法声明返回 Number：

```java
public Number returnANumber() {
    ...
}
```

returnANumber 方法可以返回 ImaginaryNumber 但不能返回 Object。ImaginaryNumber 是 Number 因为它是 Number 的一个子类。但是，Object 不一定是 Number- 它可能是一种 String 或另一种类型。

您可以覆盖一个方法并定义它来返回原始方法的子类，如下所示：

```java
public ImaginaryNumber returnANumber() {
    ...
}
```

这种称为改变返回类型的技术意味着允许返回类型与子类相同的类型。

::: tip
您也可以使用接口名为返回类型。在这种情况下，返回的对象必须实现指定的接口。
:::
