# 走（walk?）文件树

您是否需要创建一个递归访问文件树中的所有文件的应用程序？也许您需要删除树中的每个`.class`结尾的文件，或查找去年没有访问的每个文件。你可以用[FileVisitor](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileVisitor.html)接口来做到这 一点。

本节包括以下内容

* FileVisitor接口
* 开始流程
* 创建FileVisitor时的注意事项
* 控制流
* 例子

## FileVisitor接口
要走一个文件树，你首先需要实现一个`FileVisitor`,指定遍历过程中关键点所需的行为：访问文件时，在访问目录之前，访问目录之后，或发生故障时。该接口有四种方法对应于这些情况：

* preVisitDirectory 
    
    在访问目录的条目之前调用。
* postVisitDirectory
    
    在访问目录中的所有条目之后调用。如果遇到任何错误，则将特定异常传递给该方法。
* visitFile 

    在被访问的文件上调用。该文件`BasicFileAttributes`被传递到该方法，或者您可以使用 文件属性包来读取一组特定的属性。例如，您可以选择读取文件`DosFileAttributeView`以确定文件是否具有“隐藏”位设置。
* visitFileFailed

    当文件无法访问时调用。该特定异常传递给该方法。您可以选择是否抛出异常，将其打印到控制台或日志文件等等。
    
如果你并不想要全部的四种方法，您可以扩展 `SimpleFileVisitor`该类。实现该接口访问树中的所有文件，并在遇到IOError错误时抛出异常。您可以扩展此类，仅覆盖所需的方法。


这是一个扩展`SimpleFileVisitor`到打印文件树中的所有条目的示例。它打印条目是否是常规文件，符号链接，目录或其他“未指定”类型的文件。它还打印每个文件的大小（以字节为单位）。任何遇到的异常都会打印到控制台。

```java
public class PrintFiles extends SimpleFileVisitor<Path> {
    // 打印有关信息
    // 打印文件的类型
    @Override
    public FileVisitResult visitFile(Path file,
                                     BasicFileAttributes attr) {
        if (attr.isSymbolicLink()) {
            System.out.format("Symbolic link: %s ", file);
        } else if (attr.isRegularFile()) {
            System.out.format("Regular（常规） file: %s ", file);
        } else {
            System.out.format("Other: %s ", file);
        }
        System.out.println("(" + attr.size() + "bytes)");
        return FileVisitResult.CONTINUE;
    }

    // 打印所访问的每个目录
    @Override
    public FileVisitResult postVisitDirectory(Path dir,
                                              IOException exc) {
        System.out.format("Directory: %s%n", dir);
        return FileVisitResult.CONTINUE;
    }

    // 如果发生错误应该覆盖此方法，让用户知道
    // 如果不用覆盖此访问将抛出IO异常
    @Override
    public FileVisitResult visitFileFailed(Path file,
                                           IOException exc) {
        System.err.println(exc);
        return FileVisitResult.CONTINUE;
    }
 }   
```
## 开始流程
## 创建FileVisitor时的注意事项
## 控制流
## 例子