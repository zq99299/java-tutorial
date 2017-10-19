# 分配、算术和一元运算符

您将遇到的最常见的运算符之一是简单的赋值运算符“=”。你在自行车课上看到这个操作员 它将其右侧的值分配给左侧的操作数：


```java
int cadence = 0;
 int speed = 0;
 int gear = 1;
```

此操作符也可用于对象分配对象引用，如 创建对象中所述。

# 算术运算符
Java编程语言提供执行加法，减法，乘法和除法的运算符。可能看起来很新的唯一符号是“%”，它将一个操作数除以另一个，并返回剩余部分作为结果。

| 操作者	| 描述
| ---------------
| +	| 加法运算符（也用于字符串连接）
| -	| 减法运算符
| *	| 乘法运算符
| /	| 部门经营者
| %	| 剩余操作员

以下程序， ArithmeticDemo测试算术运算符。

```java
class ArithmeticDemo {

    public static void main (String[] args) {

        int result = 1 + 2;
        // result is now 3
        System.out.println("1 + 2 = " + result);
        int original_result = result;

        result = result - 1;
        // result is now 2
        System.out.println(original_result + " - 1 = " + result);
        original_result = result;

        result = result * 2;
        // result is now 4
        System.out.println(original_result + " * 2 = " + result);
        original_result = result;

        result = result / 2;
        // result is now 2
        System.out.println(original_result + " / 2 = " + result);
        original_result = result;

        result = result + 8;
        // result is now 10
        System.out.println(original_result + " + 8 = " + result);
        original_result = result;

        result = result % 7;
        // result is now 3
        System.out.println(original_result + " % 7 = " + result);
    }
}

```

这个程序打印以下内容
````java
1 + 2 = 3
3 - 1 = 2
2 * 2 = 4
4 / 2 = 2
2 + 8 = 10
10 % 7 = 3
```

您还可以将算术运算符与简单赋值运算符组合以创建**复合赋值**。例如，x+=1;并且x=x+1;都将值增加x1。

+操作者也可以用于级联（接合）两个字符串在一起，如示于下述 ConcatDemo方案：
```java
class ConcatDemo {
    public static void main(String[] args){
        String firstString = "This is";
        String secondString = " a concatenated string.";
        String thirdString = firstString+secondString;
        System.out.println(thirdString);
    }
}
```
在该程序结束时，变量thirdString包含“This is a concatenated string.”，它被打印到标准输出。

## 一元运算符

一元运算符只需要一个操作数; 它们执行各种操作，例如将值递增/递减1，否定表达式或反转布尔值。


| 操作者	| 描述
| -----------
| +	| 一元加运算符; 表示正值（然而，数字为正数）
| -	| 一元减运算符 否定一个表达
| ++	| 增量算子 将值递增1
| --	| 递减算子 将值减1
| !	| 逻辑互补算子 反转布尔值的值

以下程序， UnaryDemo测试一元运算符：

```java
class UnaryDemo {

    public static void main(String[] args) {

        int result = +1;
        // result is now 1
        System.out.println(result);

        result--;
        // result is now 0
        System.out.println(result);

        result++;
        // result is now 1
        System.out.println(result);

        result = -result;
        // result is now -1
        System.out.println(result);

        boolean success = false;
        // false
        System.out.println(success);
        // true
        System.out.println(!success);
    }
}
```

递增/递减运算符可以应用在操作数之前（前缀）或之后（后缀）。代码result++;和++result;将在result两端被加一。唯一的区别是前缀version（++result）计算为递增值，而后缀version（result++）计算为原始值。

以下程序 PrePostDemo说明前缀/后缀一元增量运算符：
```java
public class PrePostDemo {
    public static void main(String[] args) {
        int i = 3;
        i++;
        // prints 4
        System.out.println(i);
        ++i;
        // prints 5
        System.out.println(i);
        // prints 6
        System.out.println(++i);
        // prints 6
        System.out.println(i++);
        // prints 7
        System.out.println(i);
    }
}