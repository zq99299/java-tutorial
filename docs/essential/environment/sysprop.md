# 系统属性

在 [属性](./properties.md) 中，我们使用 `Properties` 对象来维护配置，Java 平台本身使用 `Properties` 对象来维护自己的配置。
`System` 类维护一个 `Properties` 描述当前工作环境的配置对象。系统属性包括有关当前用户的信息，
Java 运行时的当前版本以及用于分割文件路径名的分隔符

下表描述了一些最重要的系统属性

key               | 含义
------------------|--------------------------------------------------------------------------------------------------------
"file.separator"  | 分离文件路径组件的字符。这是 UNIX 上的 “/” 和 Windows 上的“\”。
"java.class.path" | 用于查找包含类文件的目录和 JAR 存档的路径。类路径的元素由 path.separator 属性中指定的特定于平台的字符分隔。
"java.home"       | Java 运行时环境安装目录（JRE）
"java.vendor"     | JRE 厂商名称
"java.vendor.url" | JRE 供应商 URL
"java.version"    | JRE 版本号
"line.separator"  | 操作系统在文本文件中分隔行的顺序
"os.arch"         | 操作系统架构
"os.name"         | 操作系统名称
"os.version"      | 操作系统版本
"path.separator"  | 路径分隔符用于 java.class.path
"user.dir"        | 用户工作目录
"user.home"       | 用户主目录
"user.name"       | 用户帐号名称

## 读系统属性

`System` 类用来读取系统属性有两种方法 ： `getProperty` 和 `getProperties`。

 `getProperty` 有两个版本的，一个可以传递默认值，一个获取不到则返回 null；如：

 ```java
 System.getProperty("path.separator");
 // subliminal.message 不是一个有效的系统属性，所以会返回 后面 传入的默认值
 System.getProperty("subliminal.message", "Buy StayPuft Marshmallows!");
 ```

 System 该类为访问属性值提供的最后一个方法是 getProperties 返回 Properties 对象的方法 。该对象包含一套完整的系统属性定义。

## 写系统属性
要修改现有的系统属性集，请使用 `System.setProperties`。此方法接受已初始化的 `Properties` 对象，
以包含要设置的属性。此方法用 `Properties` 对象表示的新集合替换整个系统属性集。

**警告：** 更改系统属性有潜在危险，应自行决定。许多系统属性在启动后不会被重新读取，并且用于提供信息。
更改某些属性可能会有意想不到的副作用。

```java
---- myProperties.txt ----
subliminal.message=Buy StayPuft Marshmallows!

---- Test code ----
String path = PropertiesTest.class.getResource("/myProperties.txt").getPath();
FileInputStream propFile = new FileInputStream(path);
// 把系统属性设置为默认值的
Properties p = new Properties(System.getProperties());
// 从文件中读取配置
p.load(propFile);

System.out.println(p);
// 文件中是没有 java.version 这个属性的，但是能获取到值，就是上面初始化Properties的时候传入的系统属性
System.out.println(p.getProperty("java.version"));
System.getProperties().list(System.out);
```

文件中与系统属性同名的项，文件中的会覆盖掉系统的（类似覆盖效果）。所以要注意小心不要随便覆盖掉系统属性。

使用 `setProperties` 方法更改当前正在运行的应用程序的系统属性集。这些更改不会持续。
也就是说，更改应用程序中的系统属性不会影响此解释器或任何其他应用程序对 Java 解释器的未来调用。
运行时系统每次启动时都会重新初始化系统属性。如果系统属性的更改要持久化，则应用程序必须在退出之前将值写入某个文件，
并在启动时再次读取它们。
