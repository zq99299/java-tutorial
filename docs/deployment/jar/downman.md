# 将类添加到 JAR 文件的类路径

您可能需要从 JAR 文件中引用其他 JAR 文件中的类。

例如，在一个典型的情况下，一个 applet 捆绑在一个 JAR 文件中，该 JAR 文件的清单引用了一个不同的 JAR 文件（或几个不同的 JAR 文件），作为该 applet 的用途。

您可以指定要包含在 Applet 或应用程序的清单文件的 Class-Path 头字段中的类。类路径报头的形式如下：

```
Class-Path: jar1-name jar2-name directory-name/jar3-name
```

通过配置清单中的 Class-Path，在运行 jar 文件时就不需要制定 `-classpath` 标志来 设置类路径

这一段话不是很明白是什么意思：

Note: The Class-Path header points to classes or JAR files on the local network, not JAR files within the JAR file or classes accessible over Internet protocols. To load classes in JAR files within a JAR file into the class path, you must write custom code to load those classes. For example, if MyJar.jar contains another JAR file called MyUtils.jar, you cannot use the Class-Path header in MyJar.jar's manifest to load classes in MyUtils.jar into the class path.

## 一个例子

我们希望把 **同目录下** 的 MyUtils.jar 添加到 Class-Path 中；
我们首先创建一个名为 Manifest.txt 的文本文件，内容如下：

```
Class-Path: MyUtils.jar
```

然后我们通过输入以下命令创建一个名为 MyJar.jar 的 JAR 文件：

```
jar cfm MyJar.jar Manifest.txt MyPackage/*.class
```

这会创建具有以下内容的清单的 JAR 文件：

```
Manifest-Version: 1.0
Class-Path: MyUtils.jar
Created-By: 1.7.0_06 (Oracle Corporation)
```

当运行 MyJar.jar 时，Myutils.jar 将会被加载
