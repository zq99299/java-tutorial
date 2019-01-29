# 并发随机数

在JDK 7中， `java.util.concurrent`包括一个方便类， `ThreadLocalRandom`用于期望从多个线程`ForkJoinTask`使用随机数的应用程序。

对于并发访问，使用`ThreadLocalRandom`而不是`Math.random()`更少的争用的结果，并最终使更好的性能。

所有你需要做的是`ThreadLocalRandom.current()`，然后调用其中一个方法来检索一个随机数。这是一个例子：
```java
int r = ThreadLocalRandom.current（）.nextInt（4，77）;
```