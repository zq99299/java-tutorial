# JarClassLoader

JarClassLoader 类扩展 java.net.URLClassLoader 的。顾名思义，URLClassLoader 旨在用于加载通过搜索一组URL来访问的类和资源。URL 可以引用目录或 JAR 文件。

除了继承 URLClassLoader 之外，JarClassLoader 还利用了其他两个新的与 JAR 相关的 API，
java.util.jar 包和 java.net.JarURLConnection 类中的特性。在本节中，我们将详细介绍构造函数和 JarClassLoader 的两个方法。


## JarClassLoader 构造函数

构造函数接受一个 java.net.URL 的实例作为参数。传递给此构造函数的 URL 将在 JarClassLoader 的其他地方用于查找要从中加载类的 JAR 文件。
```java
public JarClassLoader(URL url) {
    super(new URL[] { url });
    this.url = url;
}
```

## getMainClassName 方法
一旦 JarClassLoader 对象使用 JAR 捆绑应用程序的URL构造，就需要一种方法来确定 JAR 文件中的哪个类是应用程序的入口点。
这就是 getMainClassName 方法的工作：

```java
public String getMainClassName() throws IOException {
    URL u = new URL("jar", "", url + "!/");
    JarURLConnection uc = (JarURLConnection)u.openConnection();
    Attributes attr = uc.getMainAttributes();
    return attr != null
                   ? attr.getValue(Attributes.Name.MAIN_CLASS)
                   : null;
}
```
我们来看看这个方法的细节，特别注意它使用的新的 JAR 处理特性：

### JarURLConnection 类 和 JAR URL

getMainClassName 方法使用 java.net.JarURLConnection 类指定的 JAR URL 格式。JAR 文件的 URL 的语法如下所举：

```
jar:http://www.example.com/jarfile.jar!/
```

`jar:xxx!/` 分隔符标识 xxx 是远程 jar 地址；后面跟随的任何内容则是该 jar 中的文件内容

```
jar:http://www.example.com/jarfile.jar!/mypackage/myclass.class
```

getMainClassName 方法中的第一行是：

```java
URL u = new URL("jar", "", url + "!/");
```
这个语句构造一个新的 URL 对象，它代表一个 JAR URL，将 `!/` 分隔符附加到用于创建 JarClassLoader 实例的 URL。

#### java.net.JarURLConnection 类

该类表示应用程序和 JAR 文件之间的通信链接。它具有访问 JAR 文件清单的方法。getMainClassName 的第二行是：

```java
JarURLConnection uc = (JarURLConnection)u.openConnection();
```
在此声明中，在第一行中创建的 URL 实例将打开一个 URLConnection。然后将 URLConnection 实例转换为 JarURLConnection，
以便利用 JarURLConnection 的 JAR 处理功能。

#### 获取 Manifest 属性：java.util.jar.Attributes
通过 JarURLConnection 打开 JAR 文件，可以使用 JarURLConnection 的 getMainAttributes 方法访问 JAR 文件清单中的头信息。
此方法返回 java.util.jar.Attributes 的实例，该类将 JAR 文件清单中的标题名称与其关联的字符串值进行映射。
getMainClassName 中的第三行创建一个 Attributes 对象：

```java
Attributes attr = uc.getMainAttributes();
```
要获取清单的 Main-Class 头的值，getMainClassName 的第四行调用 Attributes.getValue 方法：

```java
return attr != null
               ? attr.getValue(Attributes.Name.MAIN_CLASS)
               : null;
```

#### invokeClass 方法

我们已经看到 JarURLClassLoader 如何识别 JAR 捆绑应用程序中的主类。要考虑的最后一种方法是 JarURLClassLoader.invokeClass，
可以调用该主类来启动 JAR 捆绑的应用程序：

```java
public void invokeClass(String name, String[] args)
    throws ClassNotFoundException,
           NoSuchMethodException,
           InvocationTargetException
{
    Class c = loadClass(name);
    Method m = c.getMethod("main", new Class[] { args.getClass() });
    m.setAccessible(true);
    int mods = m.getModifiers();
    if (m.getReturnType() != void.class || !Modifier.isStatic(mods) ||
        !Modifier.isPublic(mods)) {
        throw new NoSuchMethodException("main");
    }
    try {
        m.invoke(null, new Object[] { args });
    } catch (IllegalAccessException e) {
        // This should not happen, as we have disabled access checks
    }
}
```

该 invokeClass 方法有两个参数：应用程序的入口点类的名称和字符串参数数组传递到入口点类的主要方法。首先，加载主类：

```java
Class c = loadClass(name);
```

所述的 loadClass 方法是继承自 java.lang.ClassLoader中。
一旦加载了主类，就使用 java.lang.reflect包的反射API  将参数传递给类并启动它。您可以参考 The Reflection API 上的教程来查看。

反射内容在 javaee 中使用的吧；后面高级课程再看
