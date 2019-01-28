# 问题和练习

## 问题

1. 使用API​​文档来查找以下问题的答案：

    * Integer可以使用什么方法将int字符串转换为以十六进制表示数字的字符串？例如，什么方法将整数65转换为字符串“41”？
    答：
    ```java
    Integer.toHexString(16) // 10
    Integer.toHexString(65) // 41

    ```
    
    * Integer会用什么方法将基数5中的字符串转换成等价的int？例如，如何将字符串“230”转换为整数值65？显示您将用于完成此任务的代码。
    答：
    ```java
    valueOf. Here's how:

    String base5String = "230";
    int result = Integer.valueOf(base5String, 5);
    ```
    * 您可以使用什么Double方法来检测浮点数是否具有特殊值不是一个 NaN
    答：
    ```java
    Double.isNaN(number)
    ```
    
2. 问题：下列表达式的值是什么？为什么？

```java
Integer.valueOf(1).equals(Long.valueOf(1))
```
答：错。两个对象（Integer和Long）是不同的类型。

## 练习

1. 把下列代码修改成 打印最小值；并删除 aChar和aBoolean

```java
public class MaxVariablesDemo {
    public static void main(String args[]) {

        //integers
        byte largestByte = Byte.MAX_VALUE;
        short largestShort = Short.MAX_VALUE;
        int largestInteger = Integer.MAX_VALUE;
        long largestLong = Long.MAX_VALUE;

        //real numbers
        float largestFloat = Float.MAX_VALUE;
        double largestDouble = Double.MAX_VALUE;

        //other primitive types
        char aChar = 'S';
        boolean aBoolean = true;

        //Display them all.
        System.out.println("The largest byte value is "
                                   + largestByte + ".");
        System.out.println("The largest short value is "
                                   + largestShort + ".");
        System.out.println("The largest integer value is "
                                   + largestInteger + ".");
        System.out.println("The largest long value is "
                                   + largestLong + ".");

        System.out.println("The largest float value is "
                                   + largestFloat + ".");
        System.out.println("The largest double value is "
                                   + largestDouble + ".");

        if (Character.isUpperCase(aChar)) {
            System.out.println("The character " + aChar
                                       + " is uppercase.");
        } else {
            System.out.println("The character " + aChar
                                       + " is lowercase.");
        }
        System.out.println("The value of aBoolean is "
                                   + aBoolean + ".");
    }
}
```

答：

```java

public class MinVariablesDemo {
    public static void main(String args[]) {

        // integers
        byte smallestByte = Byte.MIN_VALUE;
        short smallestShort = Short.MIN_VALUE;
        int smallestInteger = Integer.MIN_VALUE;
        long smallestLong = Long.MIN_VALUE;

        // real numbers
        float smallestFloat = Float.MIN_VALUE;
        double smallestDouble = Double.MIN_VALUE;

        // display them all
        System.out.println("The smallest byte value is " + smallestByte);
        System.out.println("The smallest short value is " + smallestShort);
        System.out.println("The smallest integer value is " + smallestInteger);
        System.out.println("The smallest long value is " + smallestLong);

        System.out.println("The smallest float value is " + smallestFloat);
        System.out.println("The smallest double value is " + smallestDouble);
    }
}
```

剩下2，3 题不想看了。https://docs.oracle.com/javase/tutorial/java/data/QandE/numbers-answers.html