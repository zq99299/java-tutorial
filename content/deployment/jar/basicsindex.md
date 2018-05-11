# 使用Jar文件：基础

JAR文件以ZIP文件格式打包，因此您可以将它们用于无损数据压缩，归档，解压缩和归档解压缩等任务。这些任务是JAR文件最常见的用途之一，您只需使用这些基本功能即可实现许多JAR文件的优点。

即使您想利用JAR文件格式提供的高级功能（如电子签名），您也需要先熟悉基本操作。

要使用JAR文件执行基本任务，请使用作为Java Development Kit（JDK）的一部分提供的Java归档工具。由于Java归档工具是通过使用jar命令调用的，因此本教程将其称为“Jar工具”。

作为本节要介绍的一些主题的概要和预览，下表总结了常见的JAR文件操作：

| Operation | Command |
| --- | --- |
| 创建jar | jar cf jar-file input-file\(s\) |
| 查看jar文件内容 | jar tf jar-file |
| 提取/解压jar文件内容 | jar xf jar-file |
| 提取指定文件 | jar xf jar-file archived-file\(s\) |
| 运行jar（需要Main-class清单头文件） | java -jar app.jar |

调用打包为JAR文件的applet

```xml
<applet code=AppletClassName.class
        archive="JarFileName.jar"
        width=width height=height>
</applet>
```

本节介绍如何执行最常见的JAR文件操作，并给出每个基本功能的示例：

## 创建一个JAR文件

本节介绍如何使用Jar工具将文件和目录打包到JAR文件中。

## 查看JAR文件的内容

您可以显示JAR文件的目录，以查看它包含的内容，而无需实际解压缩JAR文件。

## 提取JAR文件的内容

您可以使用Jar工具来解压缩JAR文件。提取文件时，Jar工具会复制所需的文件并将其写入当前目录，以再现文件在归档中的目录结构。

## 更新JAR文件

本节介绍如何通过修改其清单或添加文件来更新现有JAR文件的内容。

## 运行JAR打包软件

本节介绍如何调用和运行打包在JAR文件中的applet和应用程序。

## 其他参考

JDK的文档包括Jar工具的参考页面：

* [适用于Windows平台的Jar工具参考](https://docs.oracle.com/javase/8/docs/technotes/tools/windows/jar.html)
* [适用于基于UNIX平台的Jar工具参考](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/jar.html)



