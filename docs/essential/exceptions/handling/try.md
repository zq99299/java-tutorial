# try
构成异常处理程序的第一步是封装可能出现的异常 在 try 块中。一般来说,一个try块如下所示：
```java
try {
    code
}
catch and finally blocks . . .
```
如果try块中发生异常，那么该异常由与其相关联的异常处理程序处理。要将异常处理程序与try块关联，