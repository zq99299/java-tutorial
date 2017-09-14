# 环境变量

许多操作系统使用环境变量将配置信息传递给应用程序。与Java平台中的属性一样，环境变量是键/值对，键和值都是字符串。用于设置和使用环境变量的约定在操作系统之间以及命令行解释器之间有所不同。要了解如何将环境变量传递给系统上的应用程序，请参阅系统文档。

## 查询环境变量

在Java平台上，应用程序 `System.getenv`用于检索环境变量值。没有参数，`getenv`返回一个只读实例`java.util.Map`，其中映射键是环境变量名，映射值是环境变量值。这在 EnvMap示例中演示：
```java
import java.util.Map;

public class EnvMap {
    public static void main (String[] args) {
        Map<String, String> env = System.getenv();
        for (String envName : env.keySet()) {
            System.out.format("%s=%s%n",
                              envName,
                              env.get(envName));
        }
    }
}
```

使用`String`参数`getenv`返回指定变量的值。如果未定义变量，`getenv`则返回`null`。该 Env示例使用getenv这种方式查询在命令行中指定的特定环境变量：

```java
public class Env {
    public static void main (String[] args) {
        for (String env: args) {
            String value = System.getenv(env);
            if (value != null) {
                System.out.format("%s=%s%n",
                                  env, value);
            } else {
                System.out.format("%s is"
                    + " 未分配.%n", env);
            }
        }
    }
}
```

## 将环境变量传递给新进程
当Java应用程序使用 [ProcessBuilder](https://docs.oracle.com/javase/8/docs/api/java/lang/ProcessBuilder.html)对象创建新进程时，传递给新进程的默认环境变量集与应用程序的虚拟机进程相同。应用程序可以更改此集合`ProcessBuilder.environment`。

## 平台依赖问题

在不同系统上实现环境变量的方式之间存在许多微妙的差异。例如，`Windows`忽略环境变量名称中的大小写，而UNIX则不会。环境变量的使用方式也各不相同。例如，`Windows`中被称为环境变量提供的用户名`USERNAME`，而`UNI`X实现可能在提供用户名USER，LOGNAME或两者兼而有之。

为了最大限度地提高可移植性，在系统属性中的相同值可用时，不要引用环境变量。例如，如果操作系统提供用户名，则它将始终在系统属性中可用`user.name`。