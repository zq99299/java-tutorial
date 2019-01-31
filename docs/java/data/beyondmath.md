## 超越基础算术
[[toc]]

Java 编程语言通过其算术运算符：`+、- 、*、/ 和 %` 来支持基本算术。
java.lang 包中的 Math 类为进行更高级的数学计算提供了方法和常量。

Math 类中的方法都是静态的，所以你可以直接从类中调用它们，如下所示：`Math.cos(angle);`

::: tip
使用 static import 语言功能，您不必在每个数学函数前写：
`import static java.lang.Math.*;`

这使您可以通过简单的名称来调用类方法。例如：`Math.cos(angle);`
:::

## 常量和基本方法
Math 类包含两个常量：

* Math.E，这是自然对数的基础，而且
* Math.PI，这是一个圆的周长与其直径的比率。

Math 类还包括超过 40种 静态方法。下表列出了一些基本的方法。

* 返回参数的绝对值。

    ```java
    double abs(double d)
    float abs(float f)
    int abs(int i)
    long abs(long lng)
    ```

* 返回大于或等于参数的最小整数。作为 double 返回。

    ```java
    double ceil(double d)
    ```

* 返回小于或等于参数的最大整数。作为 double 返回。

    ```java
    double floor(double d)
    ```

* 返回值最接近参数的整数。作为 double 返回。

    ```java
   double rint(double d)
    ```

* 返回参数中最接近的 long 或 int，如方法的返回类型所示。

    ```java
    long round(double d)
    int round(float f)
    ```

* 返回两个参数中较小的一个。

    ```java
    double min(double arg1, double arg2)
    float min(float arg1, float arg2)
    int min(int arg1, int arg2)
    long min(long arg1, long arg2)
    ```

* 返回两个参数中较大的一个。

    ```java
    double max(double arg1, double arg2)
    float max(float arg1, float arg2)
    int max(int arg1, int arg2)
    long max(long arg1, long arg2)
    ```

以下程序 BasicMathDemo 演示了如何使用其中一些方法：

```java
public class BasicMathDemo {
    public static void main(String[] args) {
        double a = -191.635;
        double b = 43.74;
        int c = 16, d = 45;

        System.out.printf("%.3f 的绝对值是 %.3f%n",
                          a, Math.abs(a));

        System.out.printf("%.2f 向上取整 %.0f%n",
                          b, Math.ceil(b));

        System.out.printf("%.2f 向下取整 %.0f%n",
                          b, Math.floor(b));

        System.out.printf("%.2f 最接近的整数(四舍五入) %.0f%n",
                          b, Math.rint(b));

        System.out.printf("%d 和 " + "%d 最大数 %d%n",
                          c, d, Math.max(c, d));

        System.out.printf("%d " + "和 %d 最小数 %d%n",
                          c, d, Math.min(c, d));
    }
}
```

输出

```java
-191.635 的绝对值是 191.635
43.74 向上取整 44
43.74 向下取整 43
43.74 最接近的整数(四舍五入) 44
16 和 45 最大数 45
16 和 45 最小数 16
```

## 指数和对数方法
## 三角函数

[暂不翻译，官网传送门](https://docs.oracle.com/javase/tutorial/java/data/beyondmath.html)

## 随机数
`random()` 方法返回 0.0 到 1.0 之间的伪随机选择的数字。范围包括 0.0 但不是 1.0。
换句话说：`0.0 <= Math.random() < 1.0`。要获得不同范围的数字，可以对随机方法返回的值执行算术运算。
例如，要生成一个 0 到 9 之间的整数，你可以这样写：

```java
int number = (int)(Math.random() * 10);
```

通过乘以 10，可能值的范围变成 `0.0 <= number < 10.0`。

Math.random 当需要生成一个随机数时，使用效果很好。
如果您需要生成一系列随机数，则应该在 java.util.Random 对象上创建一个实例并调用方法来生成数字。
