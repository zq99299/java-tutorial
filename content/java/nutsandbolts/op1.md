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