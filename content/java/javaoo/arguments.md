# 将信息传递个方法或构造函数

方法或构造函数的声明声明该方法或构造函数的参数的数量和类型。例如，以下是根据贷款金额，利率，贷款期限（期间数）以及贷款的未来价值来计算住房贷款的每月支付的方法：

```java
public double computePayment(
                  double loanAmt,
                  double rate,
                  double futureValue,
                  int numPeriods) {
    double interest = rate / 100.0;
    double partial1 = Math.pow((1 + interest), 
                    - numPeriods);
    double denominator = (1 - partial1) / interest;
    double answer = (-loanAmt / denominator)
                    - ((futureValue * partial1) / denominator);
    return answer;
}
```
该方法有四个参数：贷款金额，利率，未来价值和期间数。前三个是双精度浮点数，第四个是一个整数。参数在方法体中使用，运行时将接受传入的参数的值。

> **注意** ： 参数是指方法声明中的变量列表。参数是调用该方法时传递的实际值。当您调用方法时，所使用的参数必须与声明的类型和顺序的参数相匹配。

## 参数类型
您可以使用任何数据类型作为方法或构造函数的参数。这包括原始数据类型，例如double，float和int，如您在computePayment方法中看到的，以及引用数据类型，如对象和数组。

这是一个接受数组作为参数的方法的例子。在此示例中，该方法创建一个新Polygon对象，并从Point对象数组初始化（假定Point是一个表示x，y坐标的类）：

```java
public Polygon polygonFrom(Point[] corners) {
    // method body goes here
}
```

> **注意** ： 如果要将方法传递给方法，请使用 lambda表达式或 方法引用。


## 任意数量的参数

您可以使用名为varargs的结构将任意数量的值传递给方法。当您不知道有多少个特定类型的参数将传递给该方法时，可以使用varargs。这是手动创建数组的快捷方式（以前的方法可以使用varargs而不是数组）。

要使用varargs，可以使用省略号（三个点，...），空格和参数名称来遵循最后一个参数的类型。然后可以使用该参数的任意数量来调用该方法，包括null。

```java
public Polygon polygonFrom(Point... corners) {
    int numberOfSides = corners.length;
    double squareOfSide1, lengthOfSide1;
    squareOfSide1 = (corners[1].x - corners[0].x)
                     * (corners[1].x - corners[0].x) 
                     + (corners[1].y - corners[0].y)
                     * (corners[1].y - corners[0].y);
    lengthOfSide1 = Math.sqrt(squareOfSide1);

    // 更多的方法身体代码如下，创建并返回一个 
}
```

您可以看到，在方法内部，corners被视为一个数组。该方法可以使用数组或参数序列来调用。方法体中的代码将在任一种情况下将该参数视为数组。

最常见的是使用打印方法的varargs; 例如，这种printf方法：

```java
public PrintStream printf(String format, Object... args)
```
运行您打印任意数量的对象。它可以这样调用

```java
System.out.printf("%s: %d, %s%n", name, idnum, address);
```

或这样

```java
System.out.printf("%s: %d, %s, %s, %s%n", name, idnum, address, phone, email);
```

## 参数名称

当您向方法或构造函数声明参数时，您将为该参数提供一个名称。该名称在方法体内用于引用传入参数。

参数的名称在其范围内必须是唯一的。它不能与同一方法或构造函数的另一个参数的名称相同，并且它不能是方法或构造函数中局部变量的名称。

一个参数可以与一个类的字段具有相同的名称。如果是这种情况，则称该参数会影响该字段。阴影字段可以使您的代码难以阅读，并且通常仅在设置特定字段的构造函数和方法中使用。例如，考虑以下Circle类及其setOrigin方法：

```java
public class Circle {
    private int x, y, radius;
    public void setOrigin(int x, int y) {
        ...
    }
}
```

该Circle班有三个字段：x，y，和radius。该setOrigin方法有两个参数，每个参数与其中一个字段具有相同的名称。每个方法参数阴影共享其名称的字段。所以使用简单的名字x或者y体内的方法是指参数，而不是字段。要访问该字段，必须使用限定名称。这将在本课后面的“使用this关键字” 一节中进行讨论。

## 传递原始数据类型参数

原始类型，如 int 或 double 通过值传递，这意味着对参数值的任何更改只存在于该方法的范围内。当方法返回时，参数将消失，对它们的任何更改都将丢失。这是一个例子：

```java
public class PassPrimitiveByValue {

    public static void main(String[] args) {
           
        int x = 3;
           
        // 使用 x 做为参数调用 passMethod() 
        passMethod(x);
           
        // 打印看看x的值是否已经修改
        System.out.println("After invoking passMethod, x = " + x);
           
    }
        
    // change parameter in passMethod()
    public static void passMethod(int p) {
        p = 10;
    }
}
```
当您运行这个程序时，输出

```java
After invoking passMethod, x = 3
```