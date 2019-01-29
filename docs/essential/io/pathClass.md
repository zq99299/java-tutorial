# Path类
`java.nio.file`包中一个主要入口`Path`类，Jdk7引入。如果您的应用程序使用文件I/O,您将需要了解此类的强大功能。

**注意：**如果您使用的JDK7以前的代码，则可以使用`java.io.File.toPath` 来得到Path实例。

顾名思义，Path类是文件系统中路径的程序化表示。一个Path对象包含用于构建路径的文件名和目录列表，用于检查，定位和操作文件。

一个Path示例反映了基础平台。在在Solaris OS中，Path使用Solaris语法（/home/joe/foo），在Microsoft Windows中，Path使用Windows语法（C:\home\joe\foo）。Path与系统无关。即使目录结构相同，并且两个实例都找到相同的相对文件，您无法与PathSolaris文件系统进行比较，并希望它与PathWindows文件系统匹配。

对应的文件或目录Path可能不存在。您可以通过Path多种方式创建一个实例并对其进行操作：您可以附加一个实例，并将其提取出来，并将其与其他路径进行比较。在适当的时候，您可以使用Files类中的方法 来检查对应的文件的存在，创建文件，打开它，删除它，更改其权限等等。

下一节Path详细课程。