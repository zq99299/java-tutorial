# 指定方法抛出异常
上一节中，展示了怎么编写异常处理程序。有时，它适合捕获代码的异常，但在其他情况下，最好让一个方法进一步向上调用堆栈处理异常。例如：你写了一个工具类，你可能无法预期所有用户的需求。在这种情况下，最好不要捕获异常。并允许一个方法进一步向上调用堆栈来处理它

在方法签名上用 throws 抛出指定的异常类型
```java
public void writeList() throws IOException, IndexOutOfBoundsException {
```
IndexOutOfBoundsException 是非检查异常，在 throws 条款中不是强制性的。你也可以这样写
```java
public void writeList() throws IOException {
```