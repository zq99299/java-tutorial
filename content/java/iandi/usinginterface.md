# 实现一个接口

要声明一个实现接口的类，可以在类声明中包含一个implements子句。您的类可以实现多个接口，因此implements关键字后跟由类实现的接口的逗号分隔列表。按照惯例，implements声明在extends声明之后，如果有的话。

## 一个例子

考虑一个定义如何比较对象大小的接口

```java
public interface Relatable {
        
    // 返回 1，0，-1
    // 大于，等于，小于
    public int isLargerThan(Relatable other);
}
```

如果你想能够比较类似对象的大小，不管它们是什么，实例化它们的类都应该实现Relatable。


Relatable如果有某种方法可以比较从类实例化的对象的相对“大小”，任何类都可以实现。对于字符串，可能是字符数量; 对于书籍，可能是页数; 对学生来说，这可能是重量; 等等。对于平面几何对象，面积将是一个不错的选择（请参见下面的RectanglePlus类），而体积可以用于三维几何对象。所有这些类都可以实现该isLargerThan()方法。

如果你知道一个类实现Relatable，那么你知道你可以比较从这个类实例化的对象的大小。

## 实现 Relatable 接口
下面是创建对象部分中Rectangle提供的类 ，重写后实现。Relatable

```java
public class RectanglePlus 
    implements Relatable {
    public int width = 0;
    public int height = 0;
    public Point origin;

    // four constructors
    public RectanglePlus() {
        origin = new Point(0, 0);
    }
    public RectanglePlus(Point p) {
        origin = p;
    }
    public RectanglePlus(int w, int h) {
        origin = new Point(0, 0);
        width = w;
        height = h;
    }
    public RectanglePlus(Point p, int w, int h) {
        origin = p;
        width = w;
        height = h;
    }

    // a method for moving the rectangle
    public void move(int x, int y) {
        origin.x = x;
        origin.y = y;
    }

    // a method for computing
    // the area of the rectangle
    public int getArea() {
        return width * height;
    }
    
    // 实现比较接口
    public int isLargerThan(Relatable other) {
        RectanglePlus otherRect 
            = (RectanglePlus)other;
        if (this.getArea() < otherRect.getArea())
            return -1;
        else if (this.getArea() > otherRect.getArea())
            return 1;
        else
            return 0;               
    }
}
```

由于RectanglePlus实现了Relatable，任何两个RectanglePlus对象的大小可以比较。

> 注意：
注意：isLargerThan在Relatable接口中定义 的方法需要一个类型的对象Relatable。在前面的例子中粗体显示的代码行转换other为RectanglePlus实例。类型转换告诉编译器该对象究竟是什么。getArea直接调用other实例（other.getArea()）将无法编译，因为编译器不明白，other实际上是一个实例RectanglePlus。