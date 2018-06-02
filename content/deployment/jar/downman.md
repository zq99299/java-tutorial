# 将类添加到JAR文件的类路径

您可能需要从JAR文件中引用其他JAR文件中的类。

例如，在一个典型的情况下，一个applet捆绑在一个JAR文件中，该JAR文件的清单引用了一个不同的JAR文件（或几个不同的JAR文件），作为该applet的用途。

您可以指定要包含在Applet或应用程序的清单文件的Class-Path头字段中的类。类路径报头的形式如下：

```
Class-Path: jar1-name jar2-name directory-name/jar3-name
```

通过配置清单中的Class-Path，在运行jar文件时就不需要制定`-classpath`标志来 设置类路径

> 这一段话不是很明白是什么意思： 
Note: The Class-Path header points to classes or JAR files on the local network, not JAR files within the JAR file or classes accessible over Internet protocols. To load classes in JAR files within a JAR file into the class path, you must write custom code to load those classes. For example, if MyJar.jar contains another JAR file called MyUtils.jar, you cannot use the Class-Path header in MyJar.jar's manifest to load classes in MyUtils.jar into the class path.

## 一个例子

我们希望把**同目录下**的 MyUtils.jar 添加到Class-Path中；
我们首先创建一个名为Manifest.txt的文本文件，内容如下：

```
Class-Path: MyUtils.jar
```

然后我们通过输入以下命令创建一个名为MyJar.jar的JAR文件：

```
jar cfm MyJar.jar Manifest.txt MyPackage/*.class
```

这会创建具有以下内容的清单的JAR文件：

```
Manifest-Version: 1.0
Class-Path: MyUtils.jar
Created-By: 1.7.0_06 (Oracle Corporation)
```

当运行MyJar.jar时，Myutils.jar将会被加载
