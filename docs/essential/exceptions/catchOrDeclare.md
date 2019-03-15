# 捕获或 Specify Requirement
有效的 java 代码必须满足 `Catch` 和 `Specify Requirement`(怎么理解？)。
这意味着某些抛出异常的代码必须包含以下任意一项

* 一个 `try` 语句异常声明。必须提供一个处理异常的程序
* 一个指定它可以抛出异常的方法。该方法必须提供 `throws` 抛出异常列表的声明。

无法执行 Catch 或 Specify Requirement 的代码将无法编译

并非所有的异常都受 Catch 或 Specify Requirement 的约束。为了理解为什么，我们需要看看三个基本类别的异常。
其中只有一个符合要求。


## 第一种
`checked exception`。例如，假设应用程序提示用户输入文件名，然后将文件名传递给构造函数来打开该文件（java.io.FileReader）。
但是如果给定的文件不存在的话，那么将会抛出 `throws java.io.FileNotFoundException` 异常。
因此一个良好的程序应该捕获此异常并通知用户错误，可能会提示修正文件名。

受检异常 仅限于 捕获 或 Specify Requirement。除了 Error、RuntimeException 和他们的子类

## 第二种
`error`。 这些是应用程序外部的特殊条件，并且应用程序无法预期或恢复。例如，假设应用程序成功打开文件进行输入，
但由于硬件或系统故障而无法读取该文件。不成功的读取将抛出 `java.io.IOError`。
应用程序可能选择捕获此异常，以便通知用户该问题 ，但是程序也可以打印堆栈跟踪并退出

## 第三种
`运行时异常`。这些是应用程序内部的特殊情况，应用程序通常无法预期或恢复。
这些通常表示编程错误，例如逻辑错误或 API 的不当使用。例如，考虑前面描述的将文件名传递给构造函数的应用程序 FileReader。
如果一个逻辑错误导致一个 null 传递给构造函数，构造函数将抛出 `NullPointerException`。
应用程序可以捕获此异常，但它可能更有意义，以消除导致异常发生的错误。

运行时异常不受 捕获或 Specify Requirement 约束。运行时异常是由 RuntimeException 及其子类指示的异常。

错误（error）和运行时异常统称为非检查异常。

## 绕过捕获或 Specify Requirement
一些程序员认为 Catch 或 Specify Requirement 是异常机制的严重缺陷，并通过使用未检查的异常代替检查的异常来绕过它。
一般来说，这是不推荐。[Unchecked 异常 - 争议](./runtime.md) 部分 - 讨论何时使用非检查异常的异常是恰当的。
