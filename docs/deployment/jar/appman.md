# 设置应用程序的入口点
如果您的应用程序捆绑在JAR文件中，则需要某种方式指出JAR文件中的哪个类是您的应用程序的入口点。您可以使用Main-Class提供此信息，其格式为：
```
Main-Class: classname
```
classname是应用程序入口点的类名称(类路径名称)。
回想一下，入口点是一个具有签名方法的类`public static void main(String[] args)。`

配置Main-Class后，然后使用以下形式的java命令运行JAR文件：

```
java -jar JAR-name
```

## 一个例子
当我们运行JAR文件时，我们希望在MyPackage包中的类MyClass中执行main方法。

我们首先创建一个名为Manifest.txt以下内容的文本文件：

```
Main-Class: MyPackage.MyClass
```
**警告： ** 文本文件必须以新行或回车符结束。如果最后一行不以新行或回车结束，则不会正确解析。

然后我们通过输入以下命令来创建一个名为MyJar.jar的JAR文件：

```bash
jar cfm MyJar.jar Manifest.txt MyPackage/*.class
```

这会创建具有以下内容的清单的JAR文件：

```
Manifest-Version: 1.0
Created-By: 1.7.0_06 (Oracle Corporation)
Main-Class: MyPackage.MyClass
```

当您使用以下命令运行JAR文件时，MyClass执行的方法是main：

```
java -jar MyJar.jar
```

## 使用JAR工具设置入口点

```
jar cfe app.jar MyApp MyApp.class
```

e 标志：命令执行把MyApp.class作为值更新清单文件中的Main-Class项； 

您可以通过运行以下命令来直接调用该应用程序：

```
java -jar app.jar
```

如果入口点类名称在一个包中，它可以使用'.' （点）字符作为分隔符。例如，如果Main.class在名为包foo的入口点可以通过以下方式指定：

```
jar cfe Main.jar foo.Main foo/Main.class
```