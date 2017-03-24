# 什么是路径？

文件系统以某种形式的媒体（通常为一个或多个硬盘驱动器）存储和组织文件，使得它们可以容易地被检索。目前使用的大多数文件系统将文件存储在树形（或分层）结构中。在树的顶部是一个（或多个）根节点。在根节点下，有文件和目录（Microsoft Windows中的文件夹）。每个目录可以包含文件和子目录，这些文件和子目录又可以包含文件和子目录，等等，可能几乎是无限的深度

本节包括以下内容：

* 什么是路径？
* 相对还是绝对？
* 符号链接

## 什么是路径？
下图显示了包含单个根节点的示例目录树。Microsoft Windows支持多个根节点。每个根节点映射到一个卷，如C:\ 或 D:\。Solaris OS支持单个根节点，以斜杠字符表示/。
![](/assets/essential/io/io-dirStructure.png)

通过文件系统的路径来识别文件，从根节点开始。例如，statusReport上图中的文件在Solaris操作系统中通过以下符号来描述：
```bash
/home/sally/statusReport
```
在Microsoft Windows中
```java
C:\home\sally\statusReport
```

用于分隔目录名称（也称为分隔符）的字符特定于文件系统：Solaris OS使用正斜杠（/），Microsoft Windows使用反斜杠斜杠（\）。