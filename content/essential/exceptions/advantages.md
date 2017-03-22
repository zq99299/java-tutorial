# 异常的优点

## 优点1：将错误处理代码与“常规”代码分离

在传统的编程中，错误检测，报告和处理常常导致混乱。例如：这里的伪代码将整个文件读入内存
```java
readFilr{
    打开文件
    确定大小
    分类内存
    将文件读入内存
    关闭文件
}
```
乍一看，这个功能看起来很简单，但它护绿了以下所有潜在的错误

* 如果文件无法打开，会发生什么？
* 如果文件的长度无法确定，会发生什么？
* 如果无法分配足够的内存，会发生什么？
* 如果读取失败，会发生什么？
* 如果文件无法关闭，会发生什么？

为了处理这种情况，readFile函数必须有更多的代码进行错误检测，报告和处理。这可能是这样的

```java
errorCodeType readFile {
    initialize errorCode = 0;
    
    打开文件
    if (theFileIsOpen) {
        确定文件长度
        if (gotTheFileLength) {
            分配指定内存
            if (gotEnoughMemory) {
                将文件读入内存
                if (readFailed) {
                    errorCode = -1;
                }
            } else {
                errorCode = -2;
            }
        } else {
            errorCode = -3;
        }
       关闭文件
        if (theFileDidntClose && errorCode == 0) {
            errorCode = -4;
        } else {
            errorCode = errorCode and -4;
        }
    } else {
        errorCode = -5;
    }
    return errorCode;
}
```
有这么多错误检测，报告和返回值，原来的7行代码丢失了。更糟糕的是，代码的逻辑流程也已经丢失，因此难以判断代码是否正确的执行正确的操作：如果函数无法分配足够的内存，文件是否真的关闭？在编写三个月后修改方法时，确保代码继续执行正确的操作更加困难。许多程序员通过简单的忽略它来解决这个问题，程序崩溃时间就会报错。

异常使您能够编写代码的主要流程，并处理其他地方的异常情况。如果readFile 函数使用异常而不是创痛的错误管理技术，那么它看起来更像如下示例

```java
readFile {
    try {
       打开文件
        确定大小
        分类内存
        将文件读入内存
        关闭文件
    } catch (fileOpenFailed) {
       doSomething;
    } catch (sizeDeterminationFailed) {
        doSomething;
    } catch (memoryAllocationFailed) {
        doSomething;
    } catch (readFailed) {
        doSomething;
    } catch (fileCloseFailed) {
        doSomething;
    }
}

```

请注意：异常并不是完全代替你做了这些工作。但是他们有助于您更有效地组织工作。

## 优势2 ：传播错误调用堆栈

第二个有点是传播错误报告方法调用堆栈的能力。假设该readFile 方法是主程序进行的一系列嵌套方法调用中的第4个方法，method1调用method2，调用method3，最后调用readFile。

```java
method1 {
    call method2;
}

method2 {
    call method3;
}

method3 {
    call readFile;
}
```
假设只有method1关心readFile所产生的错误，传统的错误管理技术，将强制要求每个方法都关系并返回。

```java
method1 {
    errorCodeType error;
    error = call method2;
    if (error)
        doErrorProcessing;
    else
        proceed;
}

errorCodeType method2 {
    errorCodeType error;
    error = call method3;
    if (error)
        return error;
    else
        proceed;
}

errorCodeType method3 {
    errorCodeType error;
    error = call readFile;
    if (error)
        return error;
    else
        proceed;
}
```

回想一下，Java运行时系统通过调用堆栈向后搜索找到任何有兴趣处理特定异常的方法。一种方法可以阻止其中抛出任何异常，从而允许一个方法使调用堆栈更上一层来捕捉它。因此，只有关心错误的方法才能担心检测错误。

```java
method1 {
    try {
        call method2;
    } catch (exception e) {
        doErrorProcessing;
    }
}

method2 throws exception {
    call method3;
}

method3 throws exception {
    call readFile;
}
```

然而，伪代码显示，排除异常需要中间方法的一些努力。必须在其throws子句中指定可以在方法中抛出的任何检查的异常。

## 有点3：分组和区分错误类型

因为程序中抛出的所有异常都是对象，所以异常的分组或分类是类层次结构的自然结果。Java平台中的一组相关异常类的一个例子是在java.io- IOException及其后代中定义的异常类。IOException是最通用的，表示执行I / O时可能发生的任何类型的错误。其后代代表更具体的错误。例如，FileNotFoundException意味着文件不在磁盘上未找到

一种方法可以编写可以处理非常特定异常的特定处理程序。本FileNotFoundException类有没有后代，所以下面处理器只能处理一种类型的异常。

```java
catch (FileNotFoundException e) {
    ...
}
```

方法可以通过在语句中指定任何异常的超类来捕获基于其组或通用类型的catch异常。例如，要捕获所有I / O异常，无论其特定类型如何，异常处理程序都会指定一个IOException参数。

```java
catch (IOException e) {
    ...
}
```

这个处理程序将能够捕获所有的I / O异常，包括FileNotFoundException，EOFException等等。您可以通过查询传递给异常处理程序的参数来查找发生的详细信息。例如，使用以下命令打印堆栈跟踪。
```java
catch (IOException e) {
    // Output goes to System.err.
    e.printStackTrace();
    // Send trace to stdout.
    e.printStackTrace(System.out);
}
```

你甚至可以设置一个异常处理程序，Exception在这里可以捕获任意异常
```java
// A (too) general exception handler
catch (Exception e) {
    ...
}
```