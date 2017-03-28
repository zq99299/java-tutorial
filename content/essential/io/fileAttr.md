# 管理元数据（文件和文件存储属性）
元数据的定义：“其他数据的数据”。使用文件系统，数据包含在其文件和目录中，元数据跟踪有关每个对象的信息：它是常规文件，目录还是链接？它的大小，创建日期，上次修改日期，文件所有者，组所有者和访问权限是多少？

文件系统的元数据通常称为其**文件属性**。Files类的方法可以用来获得一个文件的一个属性，或则设置一个文件的属性

| 方法	| 说明
|----------------------------
| `size(Path)`	| 以字节为单位返回指定文件的大小。
| `isDirectory(Path, LinkOption)`	| 如果指定Path的文件是目录，则返回true 。
| `isRegularFile(Path, LinkOption...)`	| 如果指定Path的文件是常规文件，则返回true 。
| `isSymbolicLink(Path)`| 如果指定的Path位置是一个符号链接的文件，则返回true 。
| `isHidden(Path)`	| 如果指定Path的文件系统被视为隐藏的文件，则返回true 。
| `getLastModifiedTime(Path, LinkOption...)`    `setLastModifiedTime(Path, FileTime)`	| 返回或设置指定文件的上次修改时间。
| getOwner(Path, LinkOption...)    setOwner(Path, UserPrincipal)	| 返回或设置文件的所有者。
| `getPosixFilePermissions(Path, LinkOption...)`    `setPosixFilePermissions(Path, Set<PosixFilePermission>)`	| 返回或设置文件的POSIX文件权限。
| `getAttribute(Path, String, LinkOption...)`    `setAttribute(Path, String, Object, LinkOption...)`	| 返回或设置文件属性的值。

如果程序在同一时间内需要多个文件属性，则使用检索单个属性的方法可能效率低下。重复访问文件系统以检索单个属性可能会不利地影响性能。因此，`Files`该类提供了两种`readAttributes`在一个批量操作中获取文件属性的方法。

| 方法	| 说明
|----------------
| `readAttributes(Path, String, LinkOption...)`	| 读取文件的属性作为批量操作。该String参数标识要读取的属性。
| `readAttributes(Path, Class<A>, LinkOption...)`	| 读取文件的属性作为批量操作。该Class<A>参数是所请求的属性的类型，该方法返回该类的对象。

在显示`readAttributes`方法的示例之前，应该提到不同的文件系统对于哪些属性应该被跟踪有不同的概念。因此，将相关的文件属性分组到视图中。视图映射到一个特定的文件系统的实例，如POSIX或DOS，或到共同的功能性，如文件所有权。

支持的视图如下：

* **BasicFileAttributeView** - 提供所有文件系统实现所需的基本属性视图。
* **DosFileAttributeView** - 扩展支持DOS属性的文件系统上支持的标准四位的基本属性视图。
* **PosixFileAttributeView** - 扩展支持POSIX系列标准的文件系统（如UNIX）上支持的属性的基本属性视图。这些属性包括文件所有者，组所有者和九个相关访问权限。
* **FileOwnerAttributeView** - 支持支持文件所有者概念的任何文件系统实现。
* **AclFileAttributeView** - 支持读取或更新文件的访问控制列表（ACL）。支持NFSv4 ACL模型。还可以支持任何具有对NFSv4模型的定义良好的ACL模型，如Windows ACL模型。
* **UserDefinedFileAttributeView** - 支持用户定义的元数据。该视图可以映射到系统支持的任何扩展机制。例如，在Solaris OS中，您可以使用此视图来存储文件的MIME类型。

特定的文件系统实现可能只支持基本的文件属性视图，或者可能支持其中几个文件属性视图。文件系统实现可能支持未包含在此API中的其他属性视图。

在大多数情况下，您不必直接处理任何`FileAttributeView`接口。（如果您确实需要直接使用`FileAttributeView`，则可以通过该`getFileAttributeView(Path, Class<V>, LinkOption...)`方法访问它 。）

这些`readAttributes`方法使用泛型，可用于读取任何文件属性视图的属性。本页其余部分的示例使用`readAttributes`方法。

本节的其余部分涵盖以下主题：

* 基本文件属性
* 设定时间戳
* DOS文件属性
* POSIX文件权限
* 设置文件或组所有者
* 用户定义的文件属性
* 文件存储属性

## 基本文件属性

如前所述，要阅读文件的基本属性，您可以使用一种`Files.readAttributes`方法，其中一种批量操作读取所有基本属性。这比单独访问文件系统来读取每个单独的属性要高得多。`varargs`参数目前支持 `LinkOption`枚举。当您不希望遵循符号链接时使用此选项`NOFOLLOW_LINKS`。

有关时间戳：这组基本属性包括三个时间戳：

* creationTime，
* lastModifiedTime，
* lastAccessTime

在特定实现中可能不支持任何这些时间戳，在这种情况下，相应的访问器方法返回实现特定的值。当支持时，返回时间戳`FileTime`对象。

以下代码片段读取并打印给定文件的基本文件属性，并使用`BasicFileAttributes`类中的 方法
```java
Path file = ...;
BasicFileAttributes attr = Files.readAttributes(file, BasicFileAttributes.class);

System.out.println("creationTime: " + attr.creationTime());
System.out.println("lastAccessTime: " + attr.lastAccessTime());
System.out.println("lastModifiedTime: " + attr.lastModifiedTime());

System.out.println("isDirectory: " + attr.isDirectory());
System.out.println("isOther: " + attr.isOther());
System.out.println("isRegularFile: " + attr.isRegularFile());
System.out.println("isSymbolicLink: " + attr.isSymbolicLink());
System.out.println("size: " + attr.size());
```

除了本示例演示的访问器外，有一个`fileKey`方法返回一个表示此文件的唯一标识，如果没有则返回null.在一部分系统上有这个`filekey`.

