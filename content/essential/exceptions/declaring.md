# 方法签名抛出异常

在方法签名上用 throws 抛出指定的异常类型
```java
public void writeList() throws IOException, IndexOutOfBoundsException {
```
IOException 是非检查异常，在 throws 条款中不是强制性的。你也可以不抛出不受检查异常
```java
public void writeList() throws IOException {
```