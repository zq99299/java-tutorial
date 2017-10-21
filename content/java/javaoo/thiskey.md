# 使用this关键字

在实例方法或构造函数中，this是_对当前对象_的引用，该对象的方法或构造函数被调用。您可以在实例方法或构造函数中通用this引用当前对象的任何成员。

## this 引用字段

使用this最场景的原因是因为一个字段被一个方法或则构造的参数名覆盖

例如

```java
public class Point {
    public int x = 0;
    public int y = 0;
        
    //constructor
    public Point(int a, int b) {
        x = a;
        y = b;
    }
}
```
但它可能是这样写的：

```java
public class Point {
    public int x = 0;
    public int y = 0;
        
    //constructor
    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
}
```

构造函数的每个参数都会影响对象的一个​​字段 - 构造函数内部的x是构造函数的第一个参数的本地副本。要引用该Point字段x，构造函数必须使用this.x。

## this 引用构造
























