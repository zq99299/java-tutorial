# 创建和读取目录

以前讨论过的一些方法，如delete文件，链接和目录。但是如何列出文件系统顶部的所有目录？如何列出目录的内容或创建目录？
本节介绍了目录特有的以下功能：

* 列出文件系统的根目录
* 创建目录
* 创建临时目录
* 列出目录的内容
* 使用Globbing过滤目录列表
* 编写自己的目录过滤器

## 列出文件系统的根目录
您可以使用`FileSystem.getRootDirectories`方法列出文件系统的所有根目录 。此方法返回一个`Iterable`，它使您能够使用 `enhanced for`语句来遍历所有根目录。

以下代码使用默认文件系统打印根目录
```java
Iterable<Path> dirs = FileSystems.getDefault().getRootDirectories();
for (Path name: dirs) {
    System.err.println(name);
    // 在windows系统中的话就是打印各个盘符路径
}
```


## 创建目录

您可以使用`createDirectory(Path, FileAttribute<?>)`方法创建一个新的目录 。如果不指定任何属性`FileAttributes`，则新目录将具有默认属性。例如：
```java
Path dir = ...;
Files.createDirectory(path);
```

以下代码片段在具有特定权限的POSIX文件系统上创建一个新目录：
```java
Set<PosixFilePermission> perms =
    PosixFilePermissions.fromString("rwxr-x---");
FileAttribute<Set<PosixFilePermission>> attr =
    PosixFilePermissions.asFileAttribute(perms);
Files.createDirectory(file, attr);
```

当一个或多个父目录可能不存在时，要创建一个目录多个级别深度，可以使用方便的方法` createDirectories(Path, FileAttribute<?>)`。与该`createDirectory(Path, FileAttribute<?>)`方法一样，您可以指定一组可选的初始文件属性。以下代码片段使用默认属性：
```java
Files.createDirectories(Paths.get("foo/bar/test"));
```

根据需要，从上到下创建目录。在该foo/bar/test示例中，如果foo目录不存在，则创建它。接下来，bar如果需要，test创建目录，最后创建该目录。

在创建一些但不是全部的父目录之后，这种方法可能会失败。

## 创建临时目录

您可以使用以下createTempDirectory方法之一创建临时目录：
```java
1. createTempDirectory(Path, String, FileAttribute<?>...)
2. createTempDirectory(String, FileAttribute<?>...)
```

第一种方法允许代码指定临时目录的位置，第二种方法在默认临时目录中创建一个新目录。

## 列出目录的内容

您可以使用该`newDirectoryStream(Path)`方法列出目录的所有内容 。此方法返回一个实现该接口的 `DirectoryStream`对象。实现接口的类`DirectoryStream`也实现了`Iterable`，所以你可以遍历目录流，读取所有的对象。这种方法可以很好地扩展到非常大的目录。

**记住： ** 返回的`DirectoryStream`是一条流。如果您不使用`try-with-resources`语句，请不要忘记关闭`finally`块中的流。建议使用`try-with-resources`语句

以下代码片段显示如何打印目录的内容：
```java
 Path dir = Paths.get("d:/");
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir)) {
            for (Path file : stream) {
                System.out.println(file.getFileName());
            }
        } catch (IOException | DirectoryIteratorException x) {
            // IOException can never be thrown by the iteration.
            // In this snippet, it can only be thrown by newDirectoryStream.
            System.err.println(x);
        }
```

此方法返回目录的全部内容：文件，链接，子目录和隐藏文件。如果您希望对所检索的内容更有选择性，可以使用其他`newDirectoryStream`方法之一，如本页后面所述。

请注意，如果在目录迭代期间`DirectoryIteratorException`有异常，那么将`IOException`作为原因抛出。迭代器方法不能抛出异常异常。

## 使用Globbing过滤目录列表
如果要仅获取每个名称与特定模式匹配的文件和子目录，可以使用 `newDirectoryStream(Path, String)`提供内置`glob`过滤器的方法来实现。如果您不熟悉`glob`语法，请参阅 [什么是Glob？](/content/essential/io/fileOps.md)

例如，以下代码片段列出了与Java有关的文件：.class，.java和.jar文件：
```java
 Path dir = Paths.get("d:/");
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir, "*.{java,class,jar}")) {
            for (Path file : stream) {
                System.out.println(file.getFileName());
            }
        } catch (IOException | DirectoryIteratorException x) {
            // IOException can never be thrown by the iteration.
            // In this snippet, it can only be thrown by newDirectoryStream.
            System.err.println(x);
        }
```

## 编写自己的目录过滤器

也许你想基于除模式匹配之外的一些条件来过滤目录的内容。您可以通过实现接口创建自己的过滤器 `DirectoryStream.Filter<T>`。该接口由一个方法`accept`组成，它确定文件是否满足搜索要求。

例如以下代码实现 仅仅检索目录的过滤器：
```java
        DirectoryStream.Filter<Path> filter = new DirectoryStream.Filter<Path>() {
            @Override
            public boolean accept(Path entry) throws IOException {
                return entry.toFile().isDirectory();
            }
        };
```

一但创建过滤器，就可以使用`newDirectoryStream(Path, DirectoryStream.Filter<? super Path>)`方法来调用过滤器，如
```java
DirectoryStream<Path> stream = Files.newDirectoryStream(dir, filter)
```

此方法仅用于过滤单个目录。但是，如果要查找文件树中的所有子目录，您将使用“ 走文件树”的机制。