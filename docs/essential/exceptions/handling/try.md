# try
构成异常处理程序的第一步是封装可能出现的异常在 try 块中。
一般来说，一个 try 块如下所示：

```java
try {
    code
}
catch and finally blocks . . .
```

如果 try 块中发生异常，那么该异常由与其相关联的异常处理程序处理。要将异常处理程序与 try 块关联，
