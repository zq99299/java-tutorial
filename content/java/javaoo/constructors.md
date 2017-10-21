# 为您的class提供构造
一个类包含被调用以从类蓝图创建对象的构造函数。构造函数声明看起来像方法声明，除了它们使用类的名称并且没有返回类型。例如，Bicycle有一个构造函数：
```java
public Bicycle(int startCadence, int startSpeed, int startGear) {
    gear = startGear;
    cadence = startCadence;
    speed = startSpeed;
}
```

要创建一个Bicycle被调用的新对象myBike，new运算符调用一个构造函数：
```java
Bicycle myBike = new Bicycle(30, 0, 8);  // 为对象创建内存空间并初始化其字段。
```

虽然Bicycle只有一个构造函数，它可以有其他的，包括一个无参数的构造函数：

```java
public Bicycle() {
    gear = 1;
    cadence = 10;
    speed = 0;
}
```