# 理解扩展类加载

扩展框架利用了 **类加载委托机制**。当运行时环境需要为应用程序加载新类时，它将在以下位置按顺序查找该类：

- **Bootstrap** ：rt.jar、i18n.jar 或则其他

- 已安装的扩展：

  `jre/lib/ext`、系统范围的特定路径，如 Linux 的 `/usr/java/packages/lib/ext` （JDK6+）

- classpath：类路径

  在 `system property ` 中属性名为 `java.class.path` 路径中的：类、包括 JAR 中的类。

  如果类路径中的 jar 清单中还有 `Class-Path` 属性，那么还将继续搜索该属性指向的的 jar。

  默认情况下，该 `java.class.path` 属性的值为`.`当前目录。您可以使用 `-classpath` 或 `-cp` 命令行选项或设置 `CLASSPATH` 环境变量来更改值。命令行选项将覆盖 `CLASSPATH` 环境变量的设置。

例如：上面是一个优先级列表，你需要的类，没有在前一个中查找到时，才会去后面的项中找。

除非你处于特殊目的实例化了 **你自己的类加载器**，否则除了记住上面的 **优先级列表**之外，不需要了解太多。

你应该注意可能存在的任何 **类名冲突**，例如：你的 classpath 中有一个 `xx.A` 类，在运行时从已安装的扩展中也找到了一个 `xx.A` 类，由于优先级列表的因素，可能就与你期望的结果不一样。

## Java 类加载机制

Java 平台使用 **委派模型** 加载类。基本思想是：每个类加载程序都有一个**「父」类加载程序**。加载类时，类加载程序首先将搜索该类 「委派」到其父类加载程序，然后再尝试查找类本身。

以下是类加载 API 的一些要点：

- 实例化新的类加载器时，可以使用 `java.lang.ClassLoader` 及其子类中的构造函数指定父级。如果您未明确指定父级，则会将虚拟机的系统类加载器（ system class loader）指定为默认父级。
- ClassLoader 中的 loadClass 方法被调用，加载类时按顺序执行这些任务：
  1. 如果已经加载了一个类，它将返回它。
  2. 否则，它将对新类的搜索委托给父类加载器。
  3. 如果果父类加载器找不到该类，则 `loadClass` 调用 `findClass` 方法查找并加载该类。
- 如果父类加载器未找到该类，则 `ClassLoader` 的 `findClass` 方法将在当前类加载器中搜索该类。当您在应用程序中实例化类加载器子类时，您可能想覆盖此方法。
- `java.net.URLClassLoader` 类用作扩展和其他 JAR 文件的基本类加载器，它重写`java.lang.ClassLoader` 的 `findClass` 方法以在一个或多个指定的 URL 中搜索类和资源。

有关 JAR 相关的 API ，可参考部署中 [使用 JAR 相关的 API 章节](/deployment/jar/apiindex.md)

## 类加载和 Java 命令

Java 平台的类加载机制反映在 `java` 命令中。

- `--classpath`： 该选项是设置 `java.class.path` 属性的便捷方法
- `-cp`： 与  `--classpath` 是相同的作用
- `-jar`：该选项，运行打包在 JAR 文件中的应用程序。详细的可以参考 [运行 Jar 文件](/deployment/jar/run.md)