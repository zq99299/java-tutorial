# finally

finally 块总是当 try 块退出执行。
这确保了即使是在执行中发生了异常，finally 也会执行。但它不仅仅是处理异常，还避免了你不小心绕过了一些资源清除的代码。
比如 `return`、`continue` or `break` 的时候。这往往是非常有用的

但最终不仅仅是异常处理是有用的 —— 它允许程序员避免清除代码不小心绕过热土，继续或休息。
将在 finally 块中清理代码总是一个很好的实践，即使不预期的异常。

::: tip
如果 JVM 在执行 try 或 catch 代码时退出，则 finally 块可能无法执行。
同样，如果执行 try 或 catch 代码的线程被中断或杀死，则该 finally 块可能不执行，
即使应用程序作为一个整体继续。
:::

例如前面的例子：打开一个 PrintWriter。程序应 在writeList 方法退出之前关闭该流，但是该方法有以下几种退出方式：

1. new FileWriter 语句失败并引发 IOException。
2. `list.get(i)` 语句失败并引发 IndexOutOfBoundsException。
3. 一切成功，try 块正常退出。

运行时系统总是执行 `finally` 块内的语句，而不管 try 块发生了什么，所以它是执行清理操作的完美场所。

下面演示了 finally 的 writeList 方法的清理功能

```java
finally {
    if (out != null) {
        System.out.println("Closing PrintWriter");
        out.close();
    } else {
        System.out.println("PrintWriter not open");
    }
}
```

::: tip
 该 `finally` 块是防止资源泄漏的关键工具。在关闭文件或其他方式恢复资源时，
 那个代码放在 `finally`块中。也可以考虑使用 `try-with-resources` 语句，
 这会在不需要该资源时自动释放系统资源。下节会介绍。
:::
