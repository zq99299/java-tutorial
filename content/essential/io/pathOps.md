# Path操作

该Path类，包括各种方法,可用于获取信息的路径,路径的访问元素,将路径转换为其他形式,或者提取部分的路径。也有方法匹配字符串的路径和方法去除冗余的路径。这节课讲解这些方法,有时被称为句法操作,因为他们操作路径本身,不要访问文件系统

本节包含以下内容

* 创建Path
* 检索Path信息
* 从Path中删除冗余
* 转换Path
* 连接两条Path
* 在两条Path之间创建路径
* 比较两条Path

## 创建Path
一个Path实例包含用于指定一个文件或目录的位置的信息。当它被定义时，提供一系列的一个或多个名称，可能包含根元素或文件名，但不是必需的。
Path可能只包含一个目录或文件名。

你可以使用助手类 Paths.get 方法轻松创建一个Path实例
```java
    public static void main(String[] args) {
        Path p1 = Paths.get("/tmp/foo");
        Path p2 = Paths.get(args[0]);
        Path p3 = Paths.get(URI.create("file:///Users/joe/FileTest.java"));
        // 在windows下使用这样的路径
                Path p4 = Paths.get("C:\\Users\\Administrator\\Desktop\\局域网屏幕分享");
        Path p5 = Paths.get(URI.create("file:/C:/Users/Administrator/Desktop/局域网屏幕分享/使用说明.txt"));
    }
```

这个Path.get是以下代码的简写（get的源码就是这句类似的代码）
```java
Path p4 = FileSystems.getDefault().getPath("/users/sally");
```

以下示例创建一个/u/joe/logs/foo.log 文件，那么在不同的系统上。落地的根目录也不同。假设在Linux上是"/u/joe/logs",在windows中是“c:/u/joe/logs”

```java
Path p5 = Paths.get(System.getProperty("user.home"),"logs", "foo.log");
```

## 检索路径信息
Path 将这些名称元素存储为一个序列，目录结构中的最高元素将位于索引 0.目录结构中的最低元素将位于索引处[n-1]，其中n是Path中的名称元素的数量（就是路径中目录或则文件的名称。而不是这个目录下的文件）
![](/assets/essential/io/io-dirStructure.png)
```java
    public static void main(String[] args) {
        // 以下操作都不需要有真实的文件与之对应
        // Microsoft Windows syntax
        Path path = Paths.get("C:\\home\\joe\\foo");

        // Solaris syntax
        // Path path = Paths.get("/home/joe/foo");

        System.out.format("toString: %s%n", path.toString());
        System.out.format("getFileName: %s%n", path.getFileName());
        System.out.format("getName(0): %s%n", path.getName(0));
        System.out.format("getNameCount: %d%n", path.getNameCount());
        System.out.format("subpath(0,2): %s%n", path.subpath(0, 2));
        System.out.format("getParent: %s%n", path.getParent());
        System.out.format("getRoot: %s%n", path.getRoot());
    }
```

如：上图路径：“/home/user1/foo”:那么它的path.getNameCount = 3.由三个“/” 分割的名称。

以下是Windows和Solaris操作系统的输出：

| 调用方法	| 在Solaris操作系统中返回 | 在Microsoft Windows中返回|	说明
|-------------------------------------------------------------------------
| toString	| /home/joe/foo	| C:\home\joe\foo	| 返回的字符串表示形式Path。如果使用Filesystems.getDefault().getPath(String)或Paths.get（后者是一种方便的方法getPath）创建路径，则该方法将执行较小的语法清理。例如，在UNIX操作系统中，它会将输入字符串“//home/joe/foo”更正为“/home/joe/foo”。
| getFileName	| foo	| foo	| 返回名称元素序列的文件名或最后一个元素。
| getName(0)	| home	| home	| 返回与指定索引对应的路径元素。第0个元素是最靠近根的路径元素。
| getNameCount	| 3	| 3	| 返回路径中的元素数。
| subpath(0,2)	| home/joe	| home\joe	| 返回Path由开始和结束索引指定的（不包括根元素）的子序列。
| getParent	| /home/joe	| \home\joe	| 返回父目录的路径。
| getRoot	| /	| C:\	| 返回路径的根。

上一个示例 是用绝对路径。在以下示例中，使用相对路径
```java
// Solaris syntax
Path path = Paths.get("sally/bar");
or
// Microsoft Windows syntax
Path path = Paths.get("sally\\bar");
```
以下是Windows和Solaris操作系统的输出：

| 调用方法	| 在Solaris操作系统中返回	| 在Microsoft Windows中返回
|------------------------------------------------------------------------
| toString	| sally/bar	| sally\bar
| getFileName	| bar	| bar
| getName(0)	| sally	| sally
| getNameCount	| 2	| 2
| subpath(0,1)	| sally	| sally
| getParent	| sally	| sally
| getRoot	| null	| null

## 从路径中删除冗余

许多文件系统使用 “.” 表示当前目录的符号，“..”表示父目录。您可能有一种情况，其中`Path`包含冗余的目录信息。也许服务器配置为其日志文件保存在“/dir/logs/.”,目录中的"/."要从路径中删除：

以下示例都包括冗余
```java
/home/./joe/foo
/home/sally/../joe/foo
```
该`normalize`方法删除任何冗余元素，其中包括任何“.”或“directory/..”出现。上述两个例子都归一化/home/joe/foo。

重要的是要注意，`normalize`当它清理路径时，不检查文件系统。这是一个纯粹的句法操作。在第二个示例中，如果`sally`是符号链接，则删除`sally/..`可能会导致`Path`不再找到预期文件。

## 转换路径
您可以使用三种方法来转换Path。如果您需要将路径转换为可以从浏览器打开的字符串，则可以使用[toUri](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Path.html#toUri--).

```java
Path p1 = Paths.get("/home/logfile");
// Result is file:///home/logfile
System.out.format("%s%n", p1.toUri());

Path path2 = Paths.get("C:\\Users\\Administrator\\Desktop\\局域网屏幕分享");
        System.out.format("%s%n", path2.toUri()); // Result is file:///C:/Users/Administrator/Desktop/局域网屏幕分享/
```
