# 问题和练习

## 问题

### 问题1
以下接口有什么问题？
```java
public interface House {
    @Deprecated
    void open();
    void openFrontDoor();
    void openBackDoor();
}
```

### 问题2

考虑这个接口的实现

```java
public class MyHouse implements House {
    public void open() {}
    public void openFrontDoor() {}
    public void openBackDoor() {}
}
```
如果你编译这个程序，编译器会产生一个警告，因为open被弃用(在接口中)。你能做什么来摆脱这个警告？

### 问题3
下面的代码没有错误的编译？为什么或则为什么不？


public @interface Meal { ... }

@Meal("breakfast", mainDish="cereal")
@Meal("lunch", mainDish="pizza")
@Meal("dinner", mainDish="salad")
public void evaluateDiet() { ... }

## 练习

定义与元素的怎去请求注解类型 id，synopsis，engineer 和 date。指定 unassigned 和 unknown日期的默认值
