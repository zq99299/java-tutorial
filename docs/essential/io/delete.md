## 删除文件或目录

您可以删除文件，目录或链接。使用符号链接，链接被删除，而不是链接的目标。使用目录，目录必须为空，否则删除失败。

本 Files 类提供了两个删除方法。
[delete(Path)](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#delete-java.nio.file.Path-)
该方法将删除文件，如果删除失败，抛出异常。例如，如果文件不存在，NoSuchFileException 则抛出。您可以捕获异常以确定删除失败的原因。

如下：

```java
try {
    Files.delete(path);
} catch (NoSuchFileException x) {
    System.err.format("%s: no such" + " file or directory%n", path);
} catch (DirectoryNotEmptyException x) {
    System.err.format("%s not empty%n", path);
} catch (IOException x) {
    // File permission problems are caught here.
    System.err.println(x);
}
```

该 [deleteIfExists(Path)](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#deleteIfExists-java.nio.file.Path-)
方法也会删除该文件，但如果该文件不存在，则不会抛出任何异常。如果您有多个线程删除文件，并且您不希望抛出异常，因为一个线程首先执行此操作，那么默认情况下将无效。
