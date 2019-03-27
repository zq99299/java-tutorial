# 使用 Jar 文件：基础

JAR 文件以 ZIP 文件格式打包，因此您可以将它们用于无损数据压缩，归档，解压缩和归档解压缩等任务。
这些任务是 JAR 文件最常见的用途之一，您只需使用这些基本功能即可实现许多 JAR 文件的优点。

即使您想利用 JAR 文件格式提供的高级功能（如电子签名），您也需要先熟悉基本操作。

要使用 JAR 文件执行基本任务，请使用作为 Java Development Kit（JDK）的一部分提供的 Java 归档工具。
由于 Java 归档工具是通过使用 jar 命令调用的，因此本教程将其称为“Jar 工具”。

作为本节要介绍的一些主题的概要和预览，下表总结了常见的 JAR 文件操作：

Operation                              | Command
---------------------------------------|-----------------------------------
创建 jar                               | jar cf jar-file input-file\(s\)
查看 jar 文件内容                      | jar tf jar-file
提取/解压 jar 文件内容                 | jar xf jar-file
提取指定文件                           | jar xf jar-file archived-file\(s\)
运行 jar（需要 Main-class 清单头文件） | java -jar app.jar

调用打包为 JAR 文件的 applet

```xml
<applet code=AppletClassName.class
        archive="JarFileName.jar"
        width=width height=height>
</applet>
```

本节介绍如何执行最常见的 JAR 文件操作，并给出每个基本功能的示例：

- [创建一个 JAR 文件](./buil.md)

    本节介绍如何使用 Jar 工具将文件和目录打包到 JAR 文件中。

- [查看 JAR 文件的内容](./view.md)

    您可以显示 JAR 文件的目录，以查看它包含的内容，而无需实际解压缩 JAR 文件。

- [提取/解压 JAR 文件的内容](./unpack.md)

    您可以使用 Jar 工具来解压缩 JAR 文件。提取文件时，Jar 工具会复制所需的文件并将其写入当前目录，以再现文件在归档中的目录结构。

- [更新 JAR 文件](./update.md)

    本节介绍如何通过修改其清单或添加文件来更新现有 JAR 文件的内容。

- [运行 JAR 打包软件](./run.md)

    本节介绍如何调用和运行打包在 JAR 文件中的 applet 和应用程序。

- 其他参考

  JDK 的文档包括 Jar 工具的参考页面：

  * [适用于 Windows 平台的 Jar 工具参考](https://docs.oracle.com/javase/8/docs/technotes/tools/windows/jar.html)
  * [适用于基于 UNIX 平台的 Jar 工具参考](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/jar.html)
