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