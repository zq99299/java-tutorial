# 传统文件I/O代码
## 与旧版代码的互操作性
在Java SE 7发布之前，`java.io.File`该类是用于文件I / O的机制，但它有几个缺点。

* 许多方法在失败时没有抛出异常，因此无法获取有用的错误消息。例如，如果文件删除失败，程序将收到“删除失败”，但是不知道是不是因为该文件不存在，该用户没有权限或还有一些其他问题。
* 该rename方法在平台之间不能一致。
* 没有真正的支持符号链接。
* 需要对元数据的更多支持，例如文件权限，文件所有者和其他安全属性。
* 访问文件元数据效率低下。
* 许多File方法没有扩展。通过服务器请求大的目录列表可能导致挂起。大型目录也可能导致内存资源问题，导致拒绝服务。
* 不可能编写可靠的代码，可以递归地走一个文件树，如果有循环的符号链接，那么应该适当地做出回应。

也许你有遗留代码，使用`java.io.File`并希望利用这些功能，对`java.nio.file.Path`代码影响最小。

`java.io.File`类提供的 `toPath`方法，该方法旧式转换`File`实例的`java.nio.file.Path`实例，如下所示：
```java
Path input = file.toPath();
```

然后，您可以利用课程中可用的丰富功能集Path。

例如，假设您有一些删除文件的代码：
```java
file.delete();
```

您可以修改此代码以使用该`Files.delete`方法，如下所示：
```java
Path fp = file.toPath();
Files.delete（fp）;
```
相反，该 `Path.toFile`方法构造一个`java.io.File`对象的Path对象。


## 将java.io.File函数映射到java.nio.file

由于Java SE 7版本中完全重新构建了文件I / O的Java实现，因此无法交换另一种方法。如果要使用软件包提供的丰富功能`java.nio.file`，您最简单的解决方案是使用`File.toPath`上一节中建议的 方法。但是，如果您不想使用该方法或者不满足您的需要，则必须重写文件I / O代码。

两个API之间没有一对一的对应关系，但下表给出了`java.io.File`API 与`java.nio.file`概念类似的Api，并告诉您可以在哪里获取更多信息。

| java.io.File 功能 | java.nio.file 功能 | 教程覆盖
|------------------------------------------------
| java.io.File	| java.nio.file.Path	| [The Path Class](/content/essential/io/pathClass.md)
| java.io.RandomAccessFile | SeekableByteChannel | [随机访问文件](/content/essential/io/rafs.md)
| File.canRead, canWrite, canExecute | Files.isReadable, Files.isWritable, and Files.isExecutable.在UNIX文件系统的[管理元数据](/content/essential/io/fileAttr.md)（文件和文件存储属性）包是用来检查九个文件的权限。| [检查文件或目录](/content/essential/io/check.md) ，[元数据管理](/content/essential/io/fileAttr.md)
| File.isDirectory(), File.isFile(), and File.length() | Files.isDirectory(Path, LinkOption...), Files.isRegularFile(Path, LinkOption...), and Files.size(Path) | [元数据管理](/content/essential/io/fileAttr.md)
| File.lastModified() and File.setLastModified(long)	| Files.getLastModifiedTime(Path, LinkOption...) and Files.setLastMOdifiedTime(Path, FileTime) | [元数据管理](/content/essential/io/fileAttr.md)
| File的这些方法设置文件属性: setExecutable, setReadable, setReadOnly, setWritable | 这些方法替换 File的方法 setAttribute(Path, String, Object, LinkOption...). | [元数据管理](/content/essential/io/fileAttr.md)
| new File(parent, "newfile") 基于父目录得到新的文件	| parent.resolve("newfile") | [Path操作](/content/essential/io/pathOps.md)
| File.renameTo	 | Files.move | [移动文件或目录](/content/essential/io/move.md)
| File.delete	| Files.delete | [删除文件或目录](/content/essential/io/delete.md)
| File.createNewFile |	Files.createFile | [读、写、创建文件 - 创建文件](/content/essential/io/file.md)
| File.deleteOnExit |	使用该选项 DELETE_ON_CLOSE 替代 | [读、写、创建文件 - 创建文件](/content/essential/io/file.md)
| File.createTempFile | Files.createTempFile(Path, String, FileAttributes<?>), Files.createTempFile(Path, String, String, FileAttributes<?>) | [读、写、创建文件 - 创建文件](/content/essential/io/file.md) ， [读、写、创建文件 - 使用I / O流创建和写入文件](/content/essential/io/file.md) ， [读、写、创建文件 - 使用 Channel I/O 读写文件](/content/essential/io/file.md) 
| File.exists	| Files.exists and Files.notExists | [检查文件或目录](/content/essential/io/check.md)
| File.compareTo and equals |	Path.compareTo and equals | [Path操作 - 比较两路径](/content/essential/io/pathOps.md)
| File.getAbsolutePath and getAbsoluteFile | Path.toAbsolutePath  | [Path操作 - 转换路径](/content/essential/io/pathOps.md)
| File.getCanonicalPath and getCanonicalFile | Path.toRealPath or normalize | [Path操作 - 转换路径](/content/essential/io/pathOps.md) , [Path操作 - 从路径中删除冗余](/content/essential/io/pathOps.md)
| File.toURI	| Path.toURI | [Path操作 - 转换路径](/content/essential/io/pathOps.md)
| File.isHidden	| Files.isHidden | [Path操作 - 检索路径信息](/content/essential/io/pathOps.md)
| File.list and listFiles | Path.newDirectoryStream | [Path操作 - 检索路径信息](/content/essential/io/dirs.md)



