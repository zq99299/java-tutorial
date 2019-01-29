# 同步类示例

SynchronizedRGB类定义了表示颜色的对象。每个对象将颜色表示为代表原色值的三个整数，以及一个给出颜色名称的字符串。

```java
public class SynchronizedRGB {
    // 值必须是 0 到 255.
    private int red;
    private int green;
    private int blue;
    private String name;

    private void check(int red,
                       int green,
                       int blue) {
        if (red < 0 || red > 255
                || green < 0 || green > 255
                || blue < 0 || blue > 255) {
            throw new IllegalArgumentException();
        }
    }

    public SynchronizedRGB(int red,
                           int green,
                           int blue,
                           String name) {
        check(red, green, blue);
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.name = name;
    }

    public void set(int red,
                    int green,
                    int blue,
                    String name) {
        check(red, green, blue);
        synchronized (this) {
            this.red = red;
            this.green = green;
            this.blue = blue;
            this.name = name;
        }
    }

    // 这个rgb的算法没有什么意义吧？
    public synchronized int getRGB() {
        return ((red << 16) | (green << 8) | blue);
    }

    public synchronized String getName() {
        return name;
    }

    /**
     * 反转颜色
     */
    public synchronized void invert() {
        red = 255 - red;
        green = 255 - green;
        blue = 255 - blue;
        name = "Inverse of " + name;
    }
}
```

SynchronizedRGB必须小心使用，以免在不一致的状态下看到。假设，例如，线程执行以下代码：
```java
SynchronizedRGB color =
    new SynchronizedRGB(0, 0, 0, "Pitch Black");
...
int myColorInt = color.getRGB();      //语句 1
String myColorName = color.getName(); //语句 2
```

如果另一个线程`color.set`在语句1之后但在语句2之前调用，则该值`myColorInt`将不匹配`myColorName`。为了避免这种结果，两个语句必须绑定在一起：
```java
synchronized (color) {
    int myColorInt = color.getRGB();
    String myColorName = color.getName();
} 
```
SynchronizedRGB这种不一致只适用于可变对象 - 对于不可变版本来说，这不是一个问题。