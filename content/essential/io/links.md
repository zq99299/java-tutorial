# 符号链接或其他


如前所述，`java.nio.file`包，特别是`Path`类，是“链接感知”。每个`Path`方法或者检测到遇到符号链接时该怎么做，或者提供一个选项，使您能够在遇到符号链接时配置该行为。

迄今为止的讨论一直是关于 [该章节中的-符号软链接](/content/essential/io/path.md) 
，但是一些文件系统也支持`硬链接`。硬链接比象征性链接更具限制性，如下所示：

* 链接的目标必须存在。
* 目录下通常不允许使用硬链接。
* 硬链接不允许跨越分区或卷。因此，它们不能跨文件系统存在。
* 一个硬链接看起来，像一个普通文件，所以他们很难找到。
* 对于所有意图和目的，硬链接与原始文件相同的实体。它们具有相同的文件权限，时间戳等。所有属性相同。

由于这些限制，硬链接不像符号链接那样经常使用，但Path方法与硬链接无缝连接。

几种方法专门针对链接进行处理，并在以下部分中介绍：

* 创建符号链接
* 创建硬链接
* 检测符号链接
* 查找链接的目标

## 创建符号链接

如果您的文件系统支持它，您可以使用该`createSymbolicLink(Path, Path, FileAttribute<?>)`方法创建一个符号链接 。第二个Path参数表示目标文件或目录，可能或可能不存在。以下代码片段将创建具有默认权限的符号链接：
```java
        Path newLink = Paths.get("d:/server2.xml");
        Path target = Paths.get("d:/server.xml");
        try {
            Files.createSymbolicLink(newLink, target);
        } catch (IOException x) {
            System.err.println(x);
        } catch (UnsupportedOperationException x) {
            //某些文件系统不支持符号链接。
            System.err.println(x);
        }
```
上面生成的文件我查看了一下，在windos中就是一个快捷图标文件，文件类型是`.symlink`

该FileAttributes可变参数，可以指定被原子设置在创建链接时初始文件属性。但是，这个论点是为了将来的使用而进行的，目前还没有实现。

## 创建硬链接

您可以使用该方法创建到现有文件的硬（或常规）链接 `createLink(Path, Path)`。第二个Path参数定位现有文件，它必须存在或`NoSuchFileException`抛出一个。以下代码片段显示了如何创建链接：
```java
Path newLink = ...;
Path existingFile = ...;
try {
    Files.createLink(newLink, existingFile);
} catch (IOException x) {
    System.err.println(x);
} catch (UnsupportedOperationException x) {
    // 某些文件系统不支持硬链接
    System.err.println(x);
}
```

上面代码在windows中生成的文件我看了一下，最直观的感受就是：貌似是一个复制出来的文件，文件类型和源文件一样。没有看出来有什么区别
