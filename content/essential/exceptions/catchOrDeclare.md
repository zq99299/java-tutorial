# 捕获或指定需求
有效的java代码必须满足`Catch`和`Specify Requirement`(指定需求？)。这意味着某些抛出异常的代码必须包含以下任意一项

* 一个`try`语句异常声明。必须提供一个处理异常的程序
* 一个指定它可以抛出异常的方法。该方法必须提供`throws`抛出异常列表的声明。

无法执行Catch或Specify Requirement的代码将无法编译

并非所有的异常都受Catch或Specify Requirement的约束。为了理解为什么，我们需要看看三个基本类别的异常。其中只有一个符合要求。


