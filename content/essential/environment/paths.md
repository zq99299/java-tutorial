# PATH 和 CLASSPATH
本节介绍如何在Microsoft Windows，Solaris和Linux上使用PATH和CLASSPATH环境变量。请参阅安装Java Development Kit（JDK）软件包中随附的安装说明，了解当前信息。

安装软件后，JDK目录将具有如下所示的结构。
```bash
| - jdk1.version.0
    |- bin    包含编译器和启动器
    |- lib
    |- ...
```

## 更新PATH环境变量（微软Windows）
您可以在不设置PATH环境变量的情况下正常运行Java应用程序。或者，您可以选择将其设置为更方便。

设置PATH，如果你希望能够方便地运行可执行文件（环境变量javac.exe，java.exe，javadoc.exe从任何目录，等等），而不必输入命令的完整路径。如果不设置PATH变量，则需要在每次运行时指定可执行文件的完整路径，例 `C:\Java\jdk1.7.0\bin\javac MyClass.java`

PATH环境变量是一个系列（由分号分隔的目录;）。Microsoft Windows PATH从左到右依次查找目录中的程序。你应该只有一个jdk的bin在该条目中，因此如果已存在，则可以更新该特定条目。
```bash
C:\Java\jdk1.7.0\bin;C:\Windows\System32\;C:\Windows\;C:\Windows\System32\Wbem
```

PATH永久设置环境变量是有用的，因此它将在重新启动后保持不变。要永久更改PATH变量，请使用控制面板中的系统图标。精确的程序因Windows的版本而异：

**注意：**PATH从控制面板编辑时， 可能会看到类似于以下内容的环境变量：
```bash
%JAVA_HOME%\bin;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem
```
百分比符号中包含的变量是现有的环境变量，如果其中包含`JAVA_HOME`则可以直接修改这个变量的路径，其中有一些是操作系统的特殊变量，例如，`SystemRoot`是Microsoft Windows系统文件夹的位置。要获取环境变量的值，请在命令提示符下输入以下内容。（此示例获取SystemRoot环境变量的值）：
```bash
echo %SystemRoot%
```

## 更新PATH环境变量（Solaris和Linux）
```bash
$ java -version
```
如果上面的命令报错了，则该系统还未设置java的环境变量。
```bash
For C shell (csh), edit the startup file (~/.cshrc):

set path=(/usr/local/jdk1.7.0/bin $path)
For bash, edit the startup file (~/.bashrc):

PATH=/usr/local/jdk1.7.0/bin:$PATH
export PATH
For ksh, the startup file is named by the environment variable, ENV. To set the path:

PATH=/usr/local/jdk1.7.0/bin:$PATH
export PATH
For sh, edit the profile file (~/.profile):

PATH=/usr/local/jdk1.7.0/bin:$PATH
export PATH
Then load the startup file and verify that the path is set by repeating the java command:

For C shell (csh):

% source ~/.cshrc
% java -version
For ksh, bash, or sh:

% . /.profile
% java -version
```