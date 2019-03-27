# 在 JAR 文件中密封包
JAR 文件中的软件包可以选择性地进行封装，这意味着该软件包中定义的所有类必须存档在同一个 JAR 文件中。
例如，您可能想要封装一个包，以确保软件中的类之间的版本一致性。

您通过在清单中添加 Sealed 标头来封装JAR文件中的包，其具有以下一般形式：

```
Name: myCompany/myPackage/
Sealed: true
```

`myCompany/myPackage/` 是要封装的包的名称；请注意，包名称必须以“/”结尾。

## 一个例子

我们想要在 JAR 文件 MyJar.jar 中封装两个 package firstPackage 和 secondPackage。

我们首先创建一个名为 Manifest.txt 的文本文件，内容如下：

```
Name: myCompany/firstPackage/
Sealed: true

Name: myCompany/secondPackage/
Sealed: true
```

然后我们通过输入以下命令创建一个名为 MyJar.jar 的 JAR 文件：

```
jar cfm MyJar.jar Manifest.txt MyPackage/*.class
```

这会创建具有以下内容的清单的 JAR 文件：

```
Manifest-Version: 1.0
Created-By: 1.7.0_06 (Oracle Corporation)
Name: myCompany/firstPackage/
Sealed: true
Name: myCompany/secondPackage/
Sealed: true
```

## 密封 JAR 文件

如果您想确保包中的所有类都来自相同的代码源，请使用 JAR 密封。密封的 JAR 指定由该 JAR 定义的所有包都是密封的，
除非以每个包为基础进行覆盖。

要密封 JAR 文件，请使用值为 true 的密封清单标题。例如，
```
Sealed: true
```

指定该存档中的所有包都是密封的，除非明确覆盖具有清单条目中的 Sealed 属性的特定包。
