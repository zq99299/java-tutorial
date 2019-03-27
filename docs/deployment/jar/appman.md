# 设置应用程序的入口点
如果您的应用程序捆绑在 JAR 文件中，则需要某种方式指出 JAR 文件中的哪个类是您的应用程序的入口点。
您可以使用 Main-Class 提供此信息，其格式为：

```
Main-Class: classname
```

classname 是应用程序入口点的类名称(类路径名称)。

回想一下，入口点是一个具有签名方法的类 `public static void main(String[] args)。`

配置 Main-Class 后，然后使用以下形式的 java 命令运行 JAR 文件：

```
java -jar JAR-name
```

## 一个例子
当我们运行 JAR 文件时，我们希望在 MyPackage 包中的类 MyClass 中执行 main 方法。

我们首先创建一个名为 Manifest.txt 以下内容的文本文件：

```
Main-Class: MyPackage.MyClass
```
**警告：** 文本文件必须以新行或回车符结束。如果最后一行不以新行或回车结束，则不会正确解析。

然后我们通过输入以下命令来创建一个名为 MyJar.jar 的 JAR文件：

```bash
jar cfm MyJar.jar Manifest.txt MyPackage/*.class
```

这会创建具有以下内容的清单的 JAR 文件：

```
Manifest-Version: 1.0
Created-By: 1.7.0_06 (Oracle Corporation)
Main-Class: MyPackage.MyClass
```

当您使用以下命令运行 JAR 文件时，MyClass 执行的方法是 main：

```
java -jar MyJar.jar
```

## 使用 JAR 工具设置入口点

```
jar cfe app.jar MyApp MyApp.class
```

e 标志：命令执行把 MyApp.class 作为值更新清单文件中的 Main-Class 项；

您可以通过运行以下命令来直接调用该应用程序：

```
java -jar app.jar
```

如果入口点类名称在一个包中，它可以使用'.' （点）字符作为分隔符。例如，如果 Main.class 在名为包 foo 的入口点可以通过以下方式指定：

```
jar cfe Main.jar foo.Main foo/Main.class
```
