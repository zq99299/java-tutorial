# 设置包版本信息
您可能需要将包版本信息包含在 JAR 文件的清单中。您在清单中使用以下头提供此信息：

Header                 | Definition
-----------------------|-----------------
Name                   | 规范名称
Specification-Title    | 规范标题
Specification-Version  | 规范版本号
Specification-Vendor   | 规范供应商
Implementation-Title   | 实现标题
Implementation-Version | 实现的内部版本号
Implementation-Vendor  | 实现的供应商

一套这样的头可以分配给每个包。版本控制标题应该直接出现在包的名称标题下。此示例显示了所有版本化标头：

```
Name: java/util/
Specification-Title: Java Utility Classes
Specification-Version: 1.2
Specification-Vendor: Example Tech, Inc.
Implementation-Title: java.util
Implementation-Version: build57
Implementation-Vendor: Example Tech, Inc.
```

**警告（清单文件都必须是该格式）：**  文本文件必须以新行或回车符结束。如果最后一行不以新行或回车结束，则不会正确解析。

然后我们通过输入以下命令创建一个名为 MyJar.jar 的 JAR 文件：

```
jar cfm MyJar.jar Manifest.txt MyPackage/*.class
```

这会创建具有以下内容的清单的 JAR 文件：

```
Manifest-Version: 1.0
Created-By: 1.7.0_06 (Oracle Corporation)
Name: java/util/
Specification-Title: Java Utility Classes
Specification-Version: 1.2
Specification-Vendor: Example Tech, Inc.
Implementation-Title: java.util
Implementation-Version: build57
Implementation-Vendor: Example Tech, Inc.
```
