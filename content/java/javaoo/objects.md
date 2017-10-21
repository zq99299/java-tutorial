# 对象

典型的Java程序创建许多对象，如您所知，通过调用方法进行交互。通过这些对象交互，程序可以执行各种任务，例如实现GUI，运行动画，或通过网络发送和接收信息。一旦对象完成了创建它的工作，它的资源将被回收以供其他对象使用。

例如，CreateObjectDemo它创建三个对象：一个 Point对象和两个 Rectangle对象。

```java
public class CreateObjectDemo {

    public static void main(String[] args) {
		
        // 创建三个对象
        Point originOne = new Point(23, 94);
        Rectangle rectOne = new Rectangle(originOne, 100, 200);
        Rectangle rectTwo = new Rectangle(50, 100);
		
        // 打印他们的信息
        System.out.println("Width of rectOne: " + rectOne.width);
        System.out.println("Height of rectOne: " + rectOne.height);
        System.out.println("Area of rectOne: " + rectOne.getArea());
		
        // 修改信息
        rectTwo.origin = originOne;
		
        System.out.println("X Position of rectTwo: " + rectTwo.origin.x);
        System.out.println("Y Position of rectTwo: " + rectTwo.origin.y);
		
        // 调用移动方法
        rectTwo.move(40, 72);
        System.out.println("X Position of rectTwo: " + rectTwo.origin.x);
        System.out.println("Y Position of rectTwo: " + rectTwo.origin.y);
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

稍后的课程将使用上述示例来描述程序中对象的生命周期。您将学习如何编写在自己的程序中创建和使用对象的代码。您还将了解一旦物体在生命结束后系统如何清理。