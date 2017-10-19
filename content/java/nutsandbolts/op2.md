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


## 条件运算符

`&&` 和 `||` 在两个布尔表达式运算中执行的时候。这些操作符表现出“短路”的行为，这意味着只有在需要时才对第二个操作数进行评估。

以下程序， ConditionalDemo1测试这些运算符：

```java
class ConditionalDemo1 {

    public static void main(String[] args){
        int value1 = 1;
        int value2 = 2;
        if((value1 == 1) && (value2 == 2))
            System.out.println("value1 is 1 AND value2 is 2");
        if((value1 == 1) || (value2 == 1))
            System.out.println("value1 is 1 OR value2 is 1");
    }
}
```

另一个条件运算符`?:`可以被认为是一个 `if-then-else` 语句的简写(将在本课后面章节进行讨论).该运算符也称为三元制运算符，因为它使用三个操作数。在下面的例子中，这个操作应该被解读为：如果 someCondition 为 true，将value1赋值给result，否则将value2赋值给result
以下程序， ConditionalDemo2测试`?:`操作：

```java
class ConditionalDemo2 {

    public static void main(String[] args){
        int value1 = 1;
        int value2 = 2;
        int result;
        boolean someCondition = true;
        result = someCondition ? value1 : value2;

        System.out.println(result);
    }
}
```
因为这someConditio为true，这个程序打印“1”到屏幕。 使用`?:`操作符而不是`if-then-else`声明，如果它使您的代码更可读;例如，当表达式紧凑并且没有副作用（如分配）时）。

## 类型比较运算符instanceof