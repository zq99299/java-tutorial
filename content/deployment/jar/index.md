# 打包jar

打包不等于编译；编译的知识点不在这个课程里面；具体的还要去找？？？？？？？？？？？？？？？

Java™归档（JAR）文件格式使您可以将多个文件捆绑到一个归档文件中。通常，JAR文件包含与小应用程序和应用程序相关的类文件和辅助资源。

JAR文件格式提供了许多好处：
* 安全性：

    您可以对JAR文件的内容进行数字签名。识别您的签名的用户可以选择性地授予您的软件安全特权，否则它将不会拥有。

* 减少下载时间：

    如果您的applet被绑定到一个JAR文件中，那么applet的类文件和相关的资源可以在一个HTTP事务中被下载到浏览器，而不需要为每个文件打开一个新的连接。
* 压缩：JAR格式允许您压缩文件以获得有效的存储。
* 扩展包的打包：

    扩展框架提供了一种方法，您可以向Java核心平台添加功能，而JAR文件格式定义了扩展的包装。通过使用JAR文件格式，您也可以将您的软件转换为扩展。
* 包装密封：

    存储在JAR文件中的包可以选择性地密封，这样包就可以强制版本一致性。在JAR文件中密封一个包裹意味着在那个包中定义的所有类必须在同一个JAR文件中找到。
* 软件包版本控制：

    JAR文件可以保存关于它所包含的文件的数据，例如供应商和版本信息。
* 可移植性：处理JAR文件的机制是Java平台核心API的标准部分。


本课有四个部分：

## [使用JAR文件：基础](/content/deployment/jar/basicsindex.md)
本节介绍如何执行基本的JAR文件操作，以及如何运行捆绑在JAR文件中的软件。

## [使用清单文件：基础知识](/content/deployment/jar/manifestinde.md)
本节介绍清单文件以及如何对它们进行定制，以便您可以执行封装包和设置应用程序的入口点等内容。

## [签名和验证JAR文件](/content/deployment/jar/signindex.md)
本节介绍如何对JAR文件进行数字签名并验证JAR文件的签名。

## [使用JAR相关的API](/content/deployment/jar/apiindex.md)
本节将向您介绍Java平台的一些JAR处理功能。JAR文件格式是Java平台扩展机制的重要组成部分。您可以在本教程的扩展机制跟踪中了解有关JAR文件方面的更多信息。

## 问题和练习：JAR
测试你对JAR的了解。


## 其他参考
Java Development Kit（JDK）的文档包含有关Jar工具的信息：

* [Java归档（JAR）文件指南](https://docs.oracle.com/javase/8/docs/technotes/guides/jar/index.html)
* [JAR文件规范](https://docs.oracle.com/javase/8/docs/technotes/guides/jar/jar.html)