## 超越基础算术
Java编程语言通过其算术运算符：`+， - ，*，/和％`来支持基本算术。java.lang包中的Math类为进行更高级的数学计算提供了方法和常量。

Math类中的方法都是静态的，所以你可以直接从类中调用它们，如下所示：`Math.cos(angle);`

> 注意：使用 static import 语言功能，您不必Math在每个数学函数前写：
import static java.lang.Math.*;
这使您可以Math通过简单的名称来调用类方法。例如：`cos(angle);`


## 常量和基本方法
Math类包含两个常量：

* Math.E，这是自然对数的基础，而且
* Math.PI，这是一个圆的周长与其直径的比率。

Math类还包括超过40种静态方法。下表列出了一些基本的方法。

* 返回参数的绝对值。

    ```java
    double abs(double d)
    float abs(float f)
    int abs(int i)
    long abs(long lng)
    ```

* 返回大于或等于参数的最小整数。作为double返回。

    ```java
    double ceil(double d)
    ```

* 返回小于或等于参数的最大整数。作为double返回。

    ```java
    double floor(double d)
    ```
    
* 返回值最接近参数的整数。作为double返回。

    ```java
   double rint(double d)
    ```

* 返回参数中最接近的long或int，如方法的返回类型所示。

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
    
以下程序 BasicMathDemo演示了如何使用其中一些方法：

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
