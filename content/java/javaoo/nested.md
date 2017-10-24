# 嵌套类

Java编程语言允许您在另一个类中定义一个类。这样的一个类称为_嵌套类_，这里说明如下：

```java
class OuterClass {
    ...
    class NestedClass {
        ...
    }
}
```

> **术语:** 嵌套类分为静态和非静态两类。被声明static的_嵌套类_称为_静态嵌套类_。非静态嵌套类称为_内部类_。

```java
class OuterClass {
    ...
    static class StaticNestedClass {
        ...
    }
    class InnerClass {
        ...
    }
}
```