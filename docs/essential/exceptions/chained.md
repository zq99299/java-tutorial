# 异常链
应用程序通常会抛出另一个异常来响应异常。实际上，第一个异常引起第二个异常？
异常链能帮助程序员知道这个异常是由另一个什么异常导致的。

以下方法和构造 Throwable 支持异常链

```java
Throwable getCause()
Throwable initCause(Throwable)
Throwable(String, Throwable)
Throwable(Throwable)
```

构造函数和 initCause 是设置导致当前异常的异常。getCause 返回导致当前异常的异常。

下面来演示如何使用异常链

```java
try {

} catch (IOException e) {
    throw new SampleException("Other IOException", e);
}
```

在本实施例中，当 IOException 被捕获，一个新的 SampleException 异常，同时附加了原始原因和异常的链被抛出到下一个更高的水平异常处理程序。

## 访问堆栈跟踪信息
现在让我们假设更高级别的异常处理程序想要以自己的格式转储堆栈跟踪。

**定义：** 一个堆栈跟踪提供有关当前线程的执行历史信息，并列出异常发生时的类和方法的名称。
堆栈跟踪是一个有用的调试工具，通常在抛出异常时会利用它。

下面的代码演示如何调用 getStackTrace 异常对象的方法。

```java
catch (Exception cause) {
    StackTraceElement elements[] = cause.getStackTrace();
    for (int i = 0, n = elements.length; i < n; i++) {       
        System.err.println(elements[i].getFileName()
            + ":" + elements[i].getLineNumber()
            + ">> "
            + elements[i].getMethodName() + "()");
    }
}
```

## 日志API
下面的代码片断，在 catch 块中记录了日志，然而，不是手动解析堆栈跟踪和 `System.err()` 发送的输出，
而是使用记录工具的文件 java.util.logging 包。

```java
try {
    Handler handler = new FileHandler("OutFile.log");
    Logger.getLogger("").addHandler(handler);

} catch (IOException e) {
    Logger logger = Logger.getLogger("package.name");
    StackTraceElement elements[] = e.getStackTrace();
    for (int i = 0, n = elements.length; i < n; i++) {
        logger.log(Level.WARNING, elements[i].getMethodName());
    }
}
```

比如这样使用控制台

```java
    public static void main(String[] args) {
        try {
            Handler handler = new ConsoleHandler();
            Logger.getLogger("").addHandler(handler);
            throw new Exception("xxx");
        } catch (Exception e) {
            Logger logger = Logger.getLogger("cn.mrcode.d20170313.jdksourcescode");
            StackTraceElement elements[] = e.getStackTrace();
            for (int i = 0, n = elements.length; i < n; i++) {
                logger.log(Level.WARNING, elements[i].getMethodName());
            }
        }
    }
```

测试了下，确实没有封装好的 sl4j 好用。
