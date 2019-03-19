# Path 类
`java.nio.file` 包中一个主要入口 `Path` 类，Jdk7 引入。如果您的应用程序使用文件 I/O，您将需要了解此类的强大功能。

**注意：** 如果您使用的 JDK7 以前的代码，则可以使用 `java.io.File.toPath` 来得到 Path 实例。

顾名思义，Path 类是文件系统中路径的程序化表示。一个 Path 对象包含用于构建路径的文件名和目录列表，用于检查，定位和操作文件。

一个 Path 示例反映了基础平台。在在 Solaris OS 中，Path 使用 Solaris 语法（/home/joe/foo），
在 Microsoft Windows 中，Path 使用 Windows 语法（`C:\home\joe\foo`）。
Path 与系统无关。即使目录结构相同，并且两个实例都找到相同的相对文件，您无法与 PathSolaris 文件系统进行比较，并希望它与 PathWindows 文件系统匹配。

对应的文件或目录 Path 可能不存在。您可以通过 Path 多种方式创建一个实例并对其进行操作：
您可以附加一个实例，并将其提取出来，并将其与其他路径进行比较。在适当的时候，您可以使用 Files 类中的方法
来检查对应的文件的存在，创建文件，打开它，删除它，更改其权限等等。

下一节 Path 详细课程。
