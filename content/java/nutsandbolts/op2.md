# 平等、关系和条件运算符

## 平等和关系运算符
平等和关系运算符确定一个操作数是否大于，小于，等于或不等于另一个操作数。大多数这些运营商也可能看起来很熟悉。请记住，当测试两个原始值是否相等时，您必须使用“==”，而不是“=”。

```java
==      相等
!=      不等
>       大于
>=      大于等于
<       小于
<=      小于等于
```

以下程序， ComparisonDemo测试比较运算符：

```java
ComparisonDemo {

    public static void main（String [] args）{
        int value1 = 1;
        int value2 = 2;
        if（value1 == value2）
            System.out.println（“value1 == value2”）;
        if（value1！= value2）
            System.out.println（“value1！= value2”）;
        if（value1> value2）
            System.out.println（“value1> value2”）;
        if（value1 <value2）
            System.out.println（“value1 <value2”）;
        if（value1 <= value2）
            System.out.println（“value1 <= value2”）;
    }
}
```

输出
```java
value1 != value2
value1 <  value2
value1 <= value2
```
