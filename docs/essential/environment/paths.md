# PATH 和 CLASSPATH
本节介绍如何在 Microsoft Windows，Solaris 和 Linux 上使用 PATH 和 CLASSPATH 环境变量。
请参阅安装 Java Development Kit（JDK）软件包中随附的安装说明，了解当前信息。

安装软件后，JDK 目录将具有如下所示的结构。

```bash
| - jdk1.version.0
    |- bin    包含编译器和启动器
    |- lib
    |- ...
```

## 更新 PATH 环境变量（微软 Windows）
您可以在不设置 PATH 环境变量的情况下正常运行 Java 应用程序。或者，您可以选择将其设置为更方便。

设置 PATH，如果你希望能够方便地运行可执行文件（环境变量 javac.exe，java.exe，javadoc.exe 从任何目录，等等），
而不必输入命令的完整路径。如果不设置 PATH 变量，则需要在每次运行时指定可执行文件的完整路径，例 `C:\Java\jdk1.7.0\bin\javac MyClass.java`

PATH 环境变量是一个系列（由分号分隔的目录;）。Microsoft Windows PATH 从左到右依次查找目录中的程序。
你应该只有一个 jdk 的 bin 在该条目中，因此如果已存在，则可以更新该特定条目。

```bash
C:\Java\jdk1.7.0\bin;C:\Windows\System32\;C:\Windows\;C:\Windows\System32\Wbem
```

PATH 永久设置环境变量是有用的，因此它将在重新启动后保持不变。要永久更改 PATH 变量，请使用控制面板中的系统图标。
精确的程序因 Windows 的版本而异：

**注意：** PATH 从控制面板编辑时， 可能会看到类似于以下内容的环境变量：

```bash
%JAVA_HOME%\bin;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem
```
百分比符号中包含的变量是现有的环境变量，如果其中包含 `JAVA_HOME` 则可以直接修改这个变量的路径，
其中有一些是操作系统的特殊变量，例如，`SystemRoot` 是 Microsoft Windows 系统文件夹的位置。
要获取环境变量的值，请在命令提示符下输入以下内容。（此示例获取 SystemRoot 环境变量的值）：

```bash
echo %SystemRoot%
```

## 更新 PATH 环境变量（Solaris 和 Linux）

```bash
$ java -version
```

如果上面的命令报错了，则该系统还未设置 java 的环境变量。

对于 shell (csh) 在文件(~/.cshrc)中

```bash
set path=(/usr/local/jdk1.7.0/bin $path)
```

对于 bash(csh) 在文件 (~/.bashrc) 中

```bash
PATH=/usr/local/jdk1.7.0/bin:$PATH
export PATH
```

对于 sh 在文件 (~/.profile) 中

```bash
PATH=/usr/local/jdk1.7.0/bin:$PATH
export PATH
```

然后重新加载资源文件，再重复验证 java 命令是否正确设置

For C shell (csh):
```bash
% source ~/.cshrc
% java -version
```

For ksh, bash, or sh:
```bash
% . /.profile
% java -version
```

## 检查 CLASSPATH 变量（所有平台）
CLASSPATH 变量是一种告诉应用程序的方法，包括 JDK 工具，在哪里查找用户类。（作为 JRE，JDK 平台和扩展的一部分的类应通过其他方式定义，例如引导类路径或扩展名目录。）

指定类路径的首选方法是使用 `-cp` 命令行开关。这允许 CLASSPATH 为每个应用程序单独设置，而不会影响其他应用程序。
设置 CLASSPATH 可能很棘手，应该小心执行。

类路径的默认值为“.”，表示只搜索当前目录。指定 CLASSPATH 变量或 `-cp` 命令行开关将覆盖此值。

要检查是否 CLASSPATH 在 Microsoft Windows NT / 2000 / XP 上设置，请执行以下操作：

```
C:> echo %CLASSPATH%
```

在 Solaris 或 Linux 上，执行以下操作：

```
$ echo $CLASSPATH
```

要修改 CLASSPATH，请使用与 PATH 变量相同的过程。

类路径通配符允许您在类路径中包含整个 .jar 文件目录，而不必单独明确地命名它们。有关详细信息，
包括类路径通配符的说明以及有关如何清理 CLASSPATH 环境变量的详细说明，请参阅
[设置类路径技术说明](https://docs.oracle.com/javase/8/docs/technotes/tools/windows/classpath.html)。
