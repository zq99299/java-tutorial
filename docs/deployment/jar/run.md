# 运行 Jar 文件

现在您已经学会了如何创建 JAR 文件，您如何真正运行打包的代码？考虑这些情况：

* 您的 JAR 文件包含要在浏览器中运行的小程序。
* 您的 JAR 文件包含要从命令行启动的应用程序。
* 您的 JAR 文件包含您想要用作扩展名的代码。

本节将介绍前两种情况。扩展机制教程中的一个单独的线索 涵盖了将 JAR 文件用作扩展。

## 小程序
不会小程序就不学习了，[原地址](https://docs.oracle.com/javase/tutorial/deployment/jar/run.html)

## 运行 jar 包
您可以使用 Java 启动程序（java 命令）运行 JAR 打包的应用程序。基本的命令是：

```bash
java -jar jar-file
```

要运行该 jar 还必须指定一个入口点信息；必须把 `Main-Class` 头添加到 manifest 文件中；也就是 `META-INF/MANIFEST.MF` 文件中.格式如下

```java
Main-Class: classname
``

要从另一个目录中的 JAR 文件运行应用程序，您必须指定该目录的路径： 

```java
java -jar path/app.jar
```
