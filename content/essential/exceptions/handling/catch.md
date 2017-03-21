# catch
语法格式一般是这样的，可以catch多个异常
```java
try {

} catch (ExceptionType name) {

} catch (ExceptionType name) {

}
```

## 用一个异常处理程序捕获多于一种类型的异常
在JDK7+版本中，单个catch块可以处理多种类型的异常。此功能可以减少代码重复，并减少捕获过宽泛异常

```java
catch (IOException|SQLException ex) {
    logger.log(ex);
    throw ex;
}
```