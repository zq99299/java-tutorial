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

