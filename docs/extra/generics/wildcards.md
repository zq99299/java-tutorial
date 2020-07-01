# 通配符

看下面两段代码

```java
    /**
     jdk 1.5 之前的写法
  	*/
    void printCollectionOld(Collection c) {
        Iterator i = c.iterator();
        for (int k = 0; k < c.size(); k++) {
            System.out.println(i.next());
        }
    }
    /**
     使用泛型和新的循环语法
    */
    void printCollectionNew(Collection<Object> c) {
        for (Object e : c) {
            System.out.println(e);
        }
    }
```

两个方法的功能都是打印集合中的元素：

- old 方法未使用泛型
- new 方法使用泛型，类型参数为 Object 类型

old 版本能接受任意类型的集合，然而 new 却只能接收类型参数为 Object 类型的集合，因为它不是 **所有种类集合的超类型**

`Collection<?>` 这个才是所有种类集合的超类型，读作 **未知集合**，匹配任意内容的集合。被称为 **通配符类型**，可以这样重写上面的代码

```java
    void printCollectionNew(Collection<?> c) {
        for (Object e : c) {
            System.out.println(e);
        }
    }
```

在 new 方法的内部，我们可以把集合中元素指定为 Object 类型，这对于集合元素来说是正确的。但是不能往里面添加 Object 类型的元素，因为并不安全

```java
 Collection<?> c = new ArrayList<String>();
 // 尝试将 Object 元素添加到未知集合中
 c.add(new Object()); // 编译时错误
```

由于我们不知道 `c` 代表什么元素类型，因此无法向其中添加对象。 

`add()` 方法接受元素类型为 `E`  的参数。当实际类型参数为 `?` 时，它代表某种未知类型。我们传递给 `add()` 方法的任何参数都必须是 **未知类型的子类型**。**由于我们不知道是什么类型，因此无法传递任何内容**。**null 是例外，因为它是每种类型的成员**

一样的道理：定义 `List<?>`，可以写成  `Object o = list.get()`，元素类型是未知的，但是我们始终知道它是一个 Object。因此将 `get()` 的结果赋值给任何期望的类型，都是安全的。

## 上限通配符

考虑一个简单的绘图应用程序，它可以绘制诸如矩形和圆形的形状。为了在程序中表示这些形状，您可以定义这样的类层次结构：

```java
// 形状
public abstract class Shape {
    // 绘制图形
    public abstract void draw(Canvas c);
}

// 圆
public class Circle extends Shape {
    private int x, y, radius;
    public void draw(Canvas c) {
        ...
    }
}

// 矩形
public class Rectangle extends Shape {
    private int x, y, width, height;
    public void draw(Canvas c) {
        ...
    }
}
```

该类可以在画布上绘制一个图形

```java
public class Canvas {
    public void draw(Shape s) {
        s.draw(this);
   }
}
```

有些工程需要绘制一批图形

```java
public void drawAll(List<Shape> shapes) {
    for (Shape s: shapes) {
        s.draw(this);
   }
}
```

drawAll 现在就只能接受  `List<Shape>` 类型的，而不能接受 `List<Circle>` 类型，由于 drawAll 方法只是调用 `Shape 上的 draw` 方法，因此我们需要一个可以 **接受任何形状（Shape）的列表**

我们可以如下定义，它将接受任何形状的列表

```java
public void drawAll(List<? extends Shape> shapes) {
    ...
}
```

`List<? extends Shape>` 是有界通配符的示例，在这种情况下，我们其实知道 `?`  这个未知类型实际上是 Shape 的子类型（它可以是 `Shape` 它本身，也可以是某些子类）。 这里的含义是  Shape 是通配符的 **上限**。

同样的，使用 **通配符的灵活性** 是要付出一定的代价。代价是：它不能写入一个形状了，如下

```bash
public void addRectangle(List<? extends Shape> shapes) {
    // 产生编译时错误
    shapes.add(0, new Rectangle());
}
```

因为 ` shapes.add()` 需要的参数是一个 `?` 未知类型的，我们无法传递一个未知的类型。

`Map<K,V> ` 是具有两个类型参数的通用类型的示例，它们代表映射的键和值。

```java
public class Census {
    public static void addRegistry(Map<String, ? extends Person> registry) {
}
...

// 使用有界通配符也是一样的表现
Map<String, Driver> allDrivers = ... ;
Census.addRegistry(allDrivers);
```

