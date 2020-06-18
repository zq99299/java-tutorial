# 已安装扩展

已安装扩展是  JRE中 `/lib/ext` 目录中的 jar 文件。JRE 是 JAVA 开发套件的运行时部分，包含平台的核心 API，但没有诸如编译器和调试器之类的开发工具。 JRE 可以单独使用，也可以作为 Java 开发工具包的一部分使用。

JDK 软件目录树结构如下：



![JDK软件目录树](./assets/extb1.gif)

无论您的 JRE 是独立的还是 JDK 软件的一部分，JRE 目录的 lib/ext 中的任何 JAR 文件都会被运行时环境自动视为扩展。

由于已安装的扩展程序扩展了平台的核心API，明智地使用它们，它们很少适用于单个或小型应用程序使用的接口。

此外，由于已安装扩展定义的符号在所有 Java 进程中都可见，因此应注意确保所有可见符号遵循相应的「反向域名」和「类层次结构」约定。例如：`com.mycompany.MyClass`.

从 Java 6 起，扩展名 JAR 文件也可以放置在独立于任何特定 JRE 的位置，以便扩展可以由安装在系统上的所有 JRE 共享。在 Java 6 之前，`java.ext.dirs` 的值只能是单个目录，但截至 Java 6，它是指定搜索扩展的位置的目录列表（如 CLASSPATH）。路径的第一个元素始终是 JRE 的 lib/ext 目录。第二个元素是 JRE 外部的目录。此其他位置允许安装扩展 JAR 文件一次，并由安装在该系统上的多个 JREs 使用。位置因操作系统而异：

- Solaris™ Operating System: `/usr/jdk/packages/lib/ext`
- Linux: `/usr/java/packages/lib/ext`
- Microsoft Windows: `%SystemRoot%\Sun\Java\lib\ext`

## 一个简单的例子

下面编写了一个计算矩形面积的类

```java
public final class RectangleArea {
    public static int area(java.awt.Rectangle r) {
        return r.width * r.height;
    }
}
```

假设使用该类测试上述计算矩形面积的类

```java
import java.awt.*;

public class AreaApp {
    public static void main(String[] args) {
        int width = 10;
        int height = 5;

        Rectangle r = new Rectangle(width, height);
        System.out.println("The rectangle's area is " 
                           + RectangleArea.area(r));
    }
}
```

下面来准备下，下面要演示的环境

### 环境准备

![image-20200617140839468](./assets/image-20200617140839468.png)

如上图所示，这两个类，没有任何包名。他们也不是在同一个目录下，杜绝了可以获取当前「.」资源的情况。

下面用到了 [部署打包的知识](../../deployment/jar/buil.md)，如果忘记了，请回去看看他们

1. 给 `RectangleArea` 打成 area.jar 包

   ```bash
   # 编译成 class 文件
   javac RectangleArea.java
   # 打成 jar 包，这里打进来 .java 不重要。最重要的是要把 .class 文件打进来
   jar cf area.jar RectangleArea.class RectangleArea.java
   # 然后把 area.jar 包移动到  home/lib 目录下
   ```

2. 编译 AreaApp.java 为 AreaApp.class

   ```bash
   # 由于 area.jar 在 home/lib 目录下，这里需要，手动指定这个 jar 包的位置
   javac -classpath .;./home/lib/area.jar AreaApp.java
   ```

### 在没有扩展机制的情况下运行 AreaApp

`RectangleArea` 类不是 Java 平台的一部分，因此需要将他放在 classpath 中， area 的路径为 `home/lib/area.jar` ，则可以以下命令运行 AreaApp

```bash
java -classpath .;./home/lib/area.jar AreaApp
```

### 使用扩展机制运行 AreaApp

将 area.jar 放在  `jre/lib/ext` 目录下，笔者本机完整路径是 `D:\ProgramFiles\Java\jdk1.8.0_201\jre\lib\ext`。

无需指定类路径就可以运行

```bash
java AreaApp
```

这是因为你将 area.jar 作为了已安装的扩展，所以运行时环境也将能够查找和加载类；同样，系统上任何用户所运行的任何小程序或应用程序都将能够找到并使用 `RectangleArea` 类。

如果系统上安装了多个JRE（Java 6 或更高版本），并且希望  `RectangleArea`  类能作为这些 JAR 的扩展，就不是放到   `jre/lib/ext` 目录下，而是放到系统范围内的位置。在本章最前面已经讲解过了，每个系统的位置是不同的