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
一旦你实现了`FileVisitor`，你如何启动它？Files中有两种walkFileTree方法。

* walkFileTree(Path, FileVisitor)
* walkFileTree(Path, Set<FileVisitOption>, int, FileVisitor)

**第一种：**只需要一个起点和一个`FileVisitor`实例。您可以按以下方式调用文件访问者：
```java
Path startingDir = Paths.get("g:/");
PrintFiles pf = new PrintFiles();
Files.walkFileTree(startingDir, pf);
```

**第二种：**使您能够额外指定访问级别数量和一组`FileVisitOption`枚举的限制。如果要确保此方法遍历整个文件树，可以指定`Integer.MAX_VALUE`最大深度参数。

您可以指定`FileVisitOption`枚举，`FOLLOW_LINKS`这表示应遵循符号链接。
```java
       Path startingDir = Paths.get("g:/");

        EnumSet<FileVisitOption> opts = EnumSet.of(FileVisitOption.FOLLOW_LINKS);
        FileVisitor fileVisitor = new PrintFiles();
        Files.walkFileTree(startingDir, opts, Integer.MAX_VALUE, fileVisitor);
```
## 创建FileVisitor时的注意事项

文件树首先是深度走过的，但是您不能对子目录访问的迭代顺序进行任何假设。

如果您的程序将更改文件系统，则需要仔细考虑如何实现FileVisitor。

例如，
1. 如果您正在编写递归删除，则在删除目录本身之前首先删除目录中的文件。在这种情况下，您将在`postVisitDirectory`中删除目录。

2. 如果您正在编写递归副本，则`preVisitDirectory`在尝试将文件复制到其中之前创建新目录如果要保留源目录的属性（类似于`UNIX cp -p`命令），则需要在文件复制后执行此操作`postVisitDirectory`。该 Copy示例显示如何执行此操作。

```java
xxx
```

## 控制流
## 例子