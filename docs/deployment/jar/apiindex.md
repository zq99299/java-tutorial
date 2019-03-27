# 使用 JAR 相关的 API

Java 平台包含几个用于 JAR 文件的类，其中一些 API 是：

* java.util.jar 中的包
* java.net.JarURLConnection 类
* java.net.URLClassLoader 类

为了让您了解这些新 api 所带来的可能性，本课程将指导您了解一个名为 JarRunner 的示例应用程序的内部工作原理。

## 一个示例 - JarRunner 应用程序

JarRunner 使您能够通过在命令行上指定 JAR 文件的 URL 来运行捆绑在 JAR 文件中的应用程序。
例如，如果名为 TargetApp 的应用程序捆绑在 `http://www.example.com/TargetApp.jar` 的 JAR 文件中，
则可以使用以下命令运行该应用程序：

```
java JarRunner http://www.example.com/TargetApp.jar
```

为了使 JarRunner 能够工作，它必须能够执行以下任务，所有这些都是通过使用新的 API 来完成的：

* 访问远程 JAR 文件并与其建立通信链接。
* 检查 JAR 文件的清单以查看归档中哪些类是主类。
* 加载 JAR 文件中的类。

`JarRunner` 应用程序由两个类 `JarRunner` 和 `JarClassLoader` 组成。`JarRunner` 将大部分 JAR 处理任务委托给
`JarClassLoader` 类。`JarClassLoader` 扩展了 `java.net.URLClassLoader` 类。继续本课程之前，
您可以浏览 `JarRunner` 和 `JarClassLoader` 类的源代码：

```java
import java.io.IOException;
import java.net.URL;
import java.net.MalformedURLException;
import java.lang.reflect.InvocationTargetException;

/**
 * Runs a jar application from any url. Usage is 'java JarRunner url [args..]'
 * where url is the url of the jar file and args is optional arguments to
 * be passed to the application's main method.
 */
public class JarRunner {
    public static void main(String[] args) {
        if (args.length < 1) {
            usage();
        }
        URL url = null;
        try {
            url = new URL(args[0]);
        } catch (MalformedURLException e) {
            fatal("Invalid URL: " + args[0]);
        }
        // Create the class loader for the application jar file
        JarClassLoader cl = new JarClassLoader(url);
        // Get the application's main class name
        String name = null;
        try {
            name = cl.getMainClassName();
        } catch (IOException e) {
            System.err.println("I/O error while loading JAR file:");
            e.printStackTrace();
            System.exit(1);
        }
        if (name == null) {
            fatal("Specified jar file does not contain a 'Main-Class'" +
                  " manifest attribute");
        }
        // Get arguments for the application
        String[] newArgs = new String[args.length - 1];
        System.arraycopy(args, 1, newArgs, 0, newArgs.length);
        // Invoke application's main class
        try {
            cl.invokeClass(name, newArgs);
        } catch (ClassNotFoundException e) {
            fatal("Class not found: " + name);
        } catch (NoSuchMethodException e) {
            fatal("Class does not define a 'main' method: " + name);
        } catch (InvocationTargetException e) {
            e.getTargetException().printStackTrace();
            System.exit(1);
        }
    }

    private static void fatal(String s) {
        System.err.println(s);
        System.exit(1);
    }

    private static void usage() {
        fatal("Usage: java JarRunner url [args..]");
    }
}
```

```java
import java.net.URL;
import java.net.URLClassLoader;
import java.net.JarURLConnection;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.lang.reflect.InvocationTargetException;
import java.util.jar.Attributes;
import java.io.IOException;

/**
 * A class loader for loading jar files, both local and remote.
 */
class JarClassLoader extends URLClassLoader {
    private URL url;

    /**
     * Creates a new JarClassLoader for the specified url.
     *
     * @param url the url of the jar file
     */
    public JarClassLoader(URL url) {
        super(new URL[] { url });
        this.url = url;
    }

    /**
     * Returns the name of the jar file main class, or null if
     * no "Main-Class" manifest attributes was defined.
     */
    public String getMainClassName() throws IOException {
        URL u = new URL("jar", "", url + "!/");
        JarURLConnection uc = (JarURLConnection)u.openConnection();
        Attributes attr = uc.getMainAttributes();
        return attr != null ? attr.getValue(Attributes.Name.MAIN_CLASS) : null;
    }

    /**
     * Invokes the application in this jar file given the name of the
     * main class and an array of arguments. The class must define a
     * static method "main" which takes an array of String arguemtns
     * and is of return type "void".
     *
     * @param name the name of the main class
     * @param args the arguments for the application
     * @exception ClassNotFoundException if the specified class could not
     *            be found
     * @exception NoSuchMethodException if the specified class does not
     *            contain a "main" method
     * @exception InvocationTargetException if the application raised an
     *            exception
     */
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

}
```


本课有两个部分：

JarClassLoader 类：本节向您展示 JarClassLoader 如何使用一些新的 API 来执行 JarRunner 应用程序工作所需的任务。

JarRunner 类：本节总结了构成 JarRunne r应用程序的 JarRunner 类。
