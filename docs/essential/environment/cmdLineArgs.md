# 命令行参数

Java 应用程序可以从命令行接受任意数量的参数。这允许用户在启动应用程序时指定配置信息。

用户在调用应用程序时输入命令行参数，并在要运行的类的名称之后指定它们。
例如，假设一个名为 `Sort` 的 Java 在文件中排序行应用程序。要对命名的 `friends.txt` 文件中的数据进行排序，用户将输入：

```bash
java Sort friends.txt
```
当应用程序启动时，运行时系统通过 `Strings` 的数组将命令行参数传递给应用程序的 `main` 方法。
在前面的例子中，命令行参数传递给 `Sort` 应用在包含单个的阵列 `String："friends.txt"`。

## 显示每行的命令参数

```java
public class Echo {
    public static void main (String[] args) {
        for (String s: args) {
            System.out.println(s);
        }
    }
}
```

以下是用户输入和打印效果

```java
------------ 用户输入 -------------
java Echo Drink Hot Java

------------ 打印效果-------------

Drink
Hot
Java
```

注意的是：在命令行输入是空格分割。如果需要输入带空格的字符串需要用双引号包裹

```java
java Echo "Drink Hot Java"
```

## 解析数字命令行参数
如果应用程序需要支持数字命令行参数，则必须将表示数字的 String 参数（例如“34”）转换为数值。
这是一个将命令行参数转换为 int：

```java
int firstArg;
if (args.length > 0) {
    try {
        firstArg = Integer.parseInt(args[0]);
    } catch (NumberFormatException e) {
        System.err.println("Argument" + args[0] + " must be an integer.");
        System.exit(1);
    }
}
```
