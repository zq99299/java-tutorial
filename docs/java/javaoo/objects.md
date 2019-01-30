# 对象

典型的 Java 程序创建许多对象，如您所知，通过调用方法进行交互。通过这些对象交互，程序可以执行各种任务，例如实现 GUI，运行动画，或通过网络发送和接收信息。一旦对象完成了创建它的工作，它的资源将被回收以供其他对象使用。

例如，CreateObjectDemo 它创建三个对象：一个 Point 对象和两个 Rectangle 对象。

```java
public class Point {
    public int x = 0;
    public int y = 0;
    // 构造
    public Point(int a, int b) {
        x = a;
        y = b;
    }
}

public class Rectangle {
    public int width = 0;
    public int height = 0;
    public Point origin; // 使用 point对象表示矩形所在的坐标

    // 4个构造函数
    public Rectangle() {
        origin = new Point(0, 0);
    }

    public Rectangle(Point p) {
        origin = p;
    }

    public Rectangle(int w, int h) {
        origin = new Point(0, 0);
        width = w;
        height = h;
    }

    public Rectangle(Point p, int w, int h) {
        origin = p;
        width = w;
        height = h;
    }

    // 移动方法
    public void move(int x, int y) {
        origin.x = x;
        origin.y = y;
    }

    // 计算矩形面积
    public int getArea() {
        return width * height;
    }
}

public class CreateObjectDemo {
    public static void main(String[] args) {
        // 创建一个点和两个矩形对象
        Point originOne = new Point(23, 94);
        Rectangle rectOne = new Rectangle(originOne, 100, 200);
        Rectangle rectTwo = new Rectangle(50, 100);

        // 打印rectOne的对象信息
        System.out.println("rectOne宽度: " + rectOne.width);
        System.out.println("rectOne高度: " + rectOne.height);
        System.out.println("rectOne面积: " + rectOne.getArea());

        // 设置 rectTwo 的点
        rectTwo.origin = originOne;

        // 打印 rectTwo 的位置信息
        System.out.println("rectTwo X: " + rectTwo.origin.x);
        System.out.println("rectTwo Y: " + rectTwo.origin.y);

        // 将rectTwo移动到新的点
        rectTwo.move(40, 72);
        System.out.println("rectTwo X: " + rectTwo.origin.x);
        System.out.println("rectTwo Y: " + rectTwo.origin.y);
    }
}


```

该程序创建，操作和显示有关各种对象的信息。以下是输出

```java
Width of rectOne: 100
Height of rectOne: 200
Area of rectOne: 20000
X Position of rectTwo: 23
Y Position of rectTwo: 94
X Position of rectTwo: 40
Y Position of rectTwo: 72
```

稍后的课程将使用上述示例来描述程序中对象的生命周期。您将学习如何编写在自己的程序中创建和使用对象的代码。您还将了解一旦对象在生命结束后系统如何清理。
