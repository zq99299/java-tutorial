# 问题和练习
[[toc]]

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

答案：

文档应该反映为什么 open 不推荐使用，而应该使用什么。例如：

```java
public interface House {
    /**
     * @deprecated open 不鼓励使用了，请使用
     * openFrontDoor or
     * openBackDoor 代替.
     */
    @Deprecated
    public void open();
    public void openFrontDoor();
    public void openBackDoor();
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

如果你编译这个程序，编译器会产生一个警告，因为 open 被弃用(在接口中)。你能做什么来摆脱这个警告？

答案：

```java
从接口继承，并也标识为废弃

public class MyHouse implements House {
    // The documentation is
    // inherited from the interface.
    @Deprecated
    public void open() {}
    public void openFrontDoor() {}
    public void openBackDoor() {}
}

或则忽略该警告

public class MyHouse implements House {
    @SuppressWarnings("deprecation")
    public void open() {}
    public void openFrontDoor() {}
    public void openBackDoor() {}
}
```

### 问题3

下面的代码能编译吗？为什么？

```java
public @interface Meal { ... }

@Meal("breakfast", mainDish="cereal")
@Meal("lunch", mainDish="pizza")
@Meal("dinner", mainDish="salad")
public void evaluateDiet() { ... }
```

答：

代码无法编译。在 JDK 8 之前，不支持可重复的注释。从 JDK 8 开始，代码无法编译，因为 Meal 注释类型没有被定义为可重复的。可以通过添加 `@Repeatable` 元注释和定义容器注释类型来解决这个问题：

```java
@java.lang.annotation.Repeatable(MealContainer.class)
public @interface Meal { ... }

public @interface MealContainer {
    Meal[] value();
}
```

## 练习

定义与元素的 请求注解类型 id、synopsis、engineer 和 date。指定 unassigned 和 unknown 为日期的默认值

答案：

```java
/**
 * Describes the Request-for-Enhancement (RFE) annotation type.
 */
public @interface RequestForEnhancement {
    int id();
    String synopsis();
    String engineer() default "[unassigned]";
    String date() default "[unknown]";
}
```
