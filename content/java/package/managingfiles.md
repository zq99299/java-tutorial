# 管理源文件和类文件

Java平台的许多实现都依赖分层文件系统来管理源文件和类文件，尽管“Java语言规范 ”并不要求这样做。战略如下。

将类，接口，枚举或注释类型的源代码放在一个文本文件中，该文件的名称是类型的简单名称，其扩展名是.java。例如：

```java
//in the Rectangle.java file 
package graphics;
public class Rectangle {
   ... 
}
```

然后，将源文件放在名称反映类型所属包的名称的目录中：

```bash
.....\graphics\Rectangle.java
```

假定Microsoft Windows文件名分隔符反斜杠（对于UNIX，使用正斜杠），包成员的限定名称和文件的路径名是并行的。

```java
class name – graphics.Rectangle
pathname to file – graphics\Rectangle.java
```

正如您应该记得的，按照惯例，一家公司使用其反向因特网域名作为其包名。示例公司的互联网域名example.com将在其所有包名称之前com.example。包名称的每个组件都对应一个子目录。所以，如果公司有一个com.example.graphics包含Rectangle.java源文件的包，它将包含在一系列子目录中，如下所示：

```java
....\com\example\graphics\Rectangle.java
```

编译源文件时，编译器会为其中定义的每种类型创建一个不同的输出文件。输出文件的基本名称是类型的名称，其扩展名是.class。例如，如果源文件是这样的

```java
//in the Rectangle.java file
package com.example.graphics;
public class Rectangle {
      . . . 
}

class Helper{
      . . . 
}
```

那么编译的文件将位于：

```bash
父目录\com\example\graphics\Rectangle.class
父目录\com\example\graphics\Helper.class
```

像.java源文件一样，编译的.class文件应该在一系列反映包名称的目录中。但是，.class文件的路径不必与.java源文件的路径相同。您可以分别安排源和目录目录，如下所示：

```java
<path_one>\sources\com\example\graphics\Rectangle.java

<path_two>\classes\com\example\graphics\Rectangle.class
```

通过这样做，您可以将classes目录提供给其他程序员，而不会泄露您的源代码。您还需要以这种方式管理源文件和类文件，以便编译器和Java虚拟机（JVM）可以找到您的程序使用的所有类型。

classes目录的完整路径`<path_two>\classes`，称为类路径，并用CLASSPATH系统变量设置。编译器和JVM .class通过将包名称添加到类路径来构建文件的路径。例如，如果

```bash
<path_two>\classes
```

是你的类路径，包名是

```java
com.example.graphics,
```

那么编译器和JVM寻找files中的.class

```java
<path_two>\classes\com\example\graphics.
```

类路径可能包含多个路径，用分号（Windows）或冒号（UNIX）分隔。默认情况下，编译器和JVM搜索当前目录以及包含Java平台类的JAR文件，以便这些目录自动位于类路径中。

## 设置CLASSPATH系统变量

要显示当前CLASSPATH变量，请在Windows和UNIX（Bourne shell）中使用这些命令：

```java
In Windows:   C:\> set CLASSPATH
In UNIX:      % echo $CLASSPATH
```

要删除CLASSPATH变量的当前内容，请使用以下命令：

```java
In Windows:   C:\> set CLASSPATH=
In UNIX:      % unset CLASSPATH; export CLASSPATH 
```

要设置CLASSPATH变量，请使用这些命令（例如）：

```java
In Windows:   C:\> set CLASSPATH=C:\users\george\java\classes
In UNIX:      % CLASSPATH=/home/george/java/classes; export CLASSPATH
```