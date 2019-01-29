# finally 

finally块总是当try块退出执行。这确保了即使是在执行中发生了异常，finally也会执行。但它不仅仅是处理异常，还避免了你不小心绕过了一些资源清除的代码。比如 `return`, `continue`, or `break`.的时候。这往往是非常有用的

但最终不仅仅是异常处理是有用的——它允许程序员避免清除代码不小心绕过热土,继续,或休息。将在finally块中清理代码总是一个很好的实践,即使不预期的异常。

**注意:**如果JVM在执行try或catch代码时退出，则finally块可能无法执行。同样，如果执行try或catch代码的线程被中断或杀死，则该finally块可能不执行，即使应用程序作为一个整体继续。

例如前面的例子：打开一个PrintWriter。程序应在writeList方法退出之前关闭该流，但是该方法有以下几种退出方式：

1. new FileWriter语句失败并引发IOException。
2. list.get(i)语句失败并引发IndexOutOfBoundsException。
3. 一切成功，try块正常退出。

运行时系统总是执行`finally`块内的语句，而不管try快发生了什么.所以它是执行清理操作的完美场所。

下面演示了finally的writeList方法的清理功能
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

**重要：** 该`finally`块是防止资源泄漏的关键工具。在关闭文件或其他方式恢复资源时，请就爱那个代码放在`finally`块中。也可以考虑使用 `try-with-resources`语句，这会在不需要该资源时自动释放系统资源。下节会介绍。