# JarClassLoader

JarClassLoader类扩展java.net.URLClassLoader的。顾名思义，URLClassLoader旨在用于加载通过搜索一组URL来访问的类和资源。URL可以引用目录或JAR文件。

除了继承URLClassLoader之外，JarClassLoader还利用了其他两个新的与JAR相关的API，java.util.jar包和java.net.JarURLConnection类中的特性。在本节中，我们将详细介绍构造函数和JarClassLoader的两个方法。


## JarClassLoader构造函数

构造函数接受一个java.net.URL的实例作为参数。传递给此构造函数的URL将在JarClassLoader的其他地方用于查找要从中加载类的JAR文件。
```java
public JarClassLoader(URL url) {
    super(new URL[] { url });
    this.url = url;
}
```

## getMainClassName方法
一旦JarClassLoader对象使用JAR捆绑应用程序的URL构造，就需要一种方法来确定JAR文件中的哪个类是应用程序的入口点。这就是getMainClassName方法的工作：

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
我们来看看这个方法的细节，特别注意它使用的新的JAR处理特性：

### JarURLConnection类和JAR URL

getMainClassName方法使用java.net.JarURLConnection类指定的JAR URL格式。JAR文件的URL的语法如下所举：

```
jar:http://www.example.com/jarfile.jar!/
```
`jar:xxx!/` 分隔符标识xxx是远程jar地址；后面跟随的任何内容则是该jar中的文件内容
```
jar:http://www.example.com/jarfile.jar!/mypackage/myclass.class
```

getMainClassName方法中的第一行是：
```java
URL u = new URL("jar", "", url + "!/");
```
这个语句构造一个新的URL对象，它代表一个JAR URL，将`!/`分隔符附加到用于创建JarClassLoader实例的URL。

#### java.net.JarURLConnection类

该类表示应用程序和JAR文件之间的通信链接。它具有访问JAR文件清单的方法。getMainClassName的第二行是：

```java
JarURLConnection uc = (JarURLConnection)u.openConnection();
```
在此声明中，在第一行中创建的URL实例将打开一个URLConnection。然后将URLConnection实例转换为JarURLConnection，以便利用JarURLConnection的JAR处理功能。

#### 获取Manifest属性：java.util.jar.Attributes
通过JarURLConnection打开JAR文件，可以使用JarURLConnection的getMainAttributes方法访问JAR文件清单中的头信息。此方法返回java.util.jar.Attributes的实例，该类将JAR文件清单中的标题名称与其关联的字符串值进行映射。getMainClassName中的第三行创建一个Attributes对象：

```java
Attributes attr = uc.getMainAttributes();
```
要获取清单的Main-Class头的值，getMainClassName的第四行调用Attributes.getValue方法：

```java
return attr != null
               ? attr.getValue(Attributes.Name.MAIN_CLASS)
               : null;
```

#### invokeClass方法

我们已经看到JarURLClassLoader如何识别JAR捆绑应用程序中的主类。要考虑的最后一种方法是JarURLClassLoader.invokeClass，可以调用该主类来启动JAR捆绑的应用程序：

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

该invokeClass方法有两个参数：应用程序的入口点类的名称和字符串参数数组传递到入口点类的主要方法。首先，加载主类：

```java
Class c = loadClass(name);
```

所述的loadClass方法是继承自java.lang.ClassLoader中。
一旦加载了主类，就使用java.lang.reflect包的反射API 将参数传递给类并启动它。您可以参考The Reflection API上的教程来查看。

反射内容在javaee中使用的吧；后面高级课程再看
