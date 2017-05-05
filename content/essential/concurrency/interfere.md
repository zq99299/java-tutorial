# 线程干扰
考虑一个简单的类
```java
class Counter {
    private int c = 0;

    public void increment() {
        c++;
    }

    public void decrement() {
        c--;
    }

    public int value() {
        return c;
    }

}
```
Counter被设计成使得每次调用`increment`将添加1到c，并且每次调用`decrement`将从c-1。然而，如果一个`Counter`对象被多个线程引用，则线程之间的干扰可能会阻止这样的预期。