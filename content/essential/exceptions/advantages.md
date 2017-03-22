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
