# catch
语法格式一般是这样的，可以 catch 多个异常

```java
try {

} catch (ExceptionType name) {

} catch (ExceptionType name) {

}
```

## 用一个异常处理程序捕获多于一种类型的异常
在 JDK7+ 版本中，单个 catch 块可以处理多种类型的异常。此功能可以减少代码重复，并减少捕获过宽泛异常

```java
catch (IOException|SQLException ex) {
    logger.log(ex);
    throw ex;
}
```

::: tip
如果 catch 块处理多个异常类型，则该 catch 参数是隐式的 final。
在此示例中，catch 参数 ex 是 final，因此您不能在 catch 块中为其分配任何值。
:::
