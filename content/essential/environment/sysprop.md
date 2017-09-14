# 系统属性

在 [属性](/content/essential/environment/properties.md) 中，我们使用`Properties`对象来维护配置，Java平台本身使用 `Properties`对象来维护自己的配置。`System`类维护一个 `Properties` 描述当前工作环境的配置对象。系统属性包括有关当前用户的信息，Java运行时的当前版本以及用于分割文件路径名的分隔符

下表描述了一些最重要的系统属性

| key | 含义 |
|------------------
| "file.separator"  | 分离文件路径组件的字符。这是UNIX上的“/”和Windows 上的“\”。
| "java.class.path" | 用于查找包含类文件的目录和JAR存档的路径。类路径的元素由path.separator属性中指定的特定于平台的字符分隔。
| "java.home"       | Java运行时环境安装目录（JRE）
| "java.vendor"	    | JRE厂商名称
| "java.vendor.url" | JRE供应商URL
| "java.version"    | JRE版本号
| "line.separator"  | 操作系统在文本文件中分隔行的顺序
| "os.arch"    | 操作系统架构
| "os.name"    | 操作系统名称
| "os.version"    | 操作系统版本
| "path.separator"| 路径分隔符用于 java.class.path
| "user.dir"	| 用户工作目录
| "user.home"	| 用户主目录
| "user.name"	| 用户帐号名称