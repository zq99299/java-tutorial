# Class 类作为运行时类型令牌

Jdk 5.0 中的一个变化是 java. lang. class 类是通用的。这是一个有趣的示例，用于容器类以外的其他对象。

有 Class 和 T，您可能会问，T 代表什么？它表示 Class 对象所表示的类型.

例如，String. Class 的类型是 `Class<String>`， Serializable. Class 的类型是 `Class<Serializable>`。
这可以用来提高反射代码的类型安全性。

```java
// java.lang.Class#newInstance
public T newInstance()
```

特别是：newInstance 返回 T，因此在反射创建对象时，您可以获得更精确的类型。

例如，假设您需要编写一个实用程序方法来执行数据库查询（以 SQL 字符串形式给出），并在数据库中返回与该查询匹配的对象的集合。

一种方法是显式传递工厂对象，编写如下代码：

```java
interface Factory<T> { T make();} 

public <T> Collection<T> select(Factory<T> factory, String statement) { 
    Collection<T> result = new ArrayList<T>(); 

    /* Run sql query using jdbc */  
    for (/* Iterate over jdbc results. */) { 
        T item = factory.make();
        /* Use reflection and set all of item's 
         * fields from sql results. 
         */ 
        result.add(item); 
    } 
    return result; 
}
```

可以如下调用

```java
xx.select(new Factory<EmpInfo>() {
    public EmpInfo make() {
        return new EmpInfo();
    }
}, "selection string");
```

或者您可以声明一个 `EmpInfoFactory` 类来实现 `Factory` 接口

```java
class EmpInfoFactory implements Factory<EmpInfo> {
    ...
    public EmpInfo make() { 
        return new EmpInfo();
    }
}
```

调用则如下

```java
select(getMyEmpInfoFactory(), "selection string");
```

该解决方案的缺点是它需要：

- 在调用时：需要使用比较长的匿名工厂类
- 或则为每种类型声明一个工厂类，并在调用时，传递一个工厂实例，这有点不自然

将 Class 类作为工厂对象是很自然的，然后通过反射使用它，这里没有泛型，代码可能如下

```java
Collection emps = sqlUtility.select(EmpInfo.class, "select * from emps");
...
public static Collection select(Class c, String sqlStatement) { 
    Collection result = new ArrayList();
    /* Run sql query using jdbc. */
    for (/* Iterate over jdbc results. */ ) { 
        Object item = c.newInstance(); 
        /* Use reflection and set all of item's
         * fields from sql results. 
         */  
        result.add(item); 
    } 
    return result; 
}
```

但是，这不能为我们提供所需的精确类型的集合。现在 `Class` 是通用的，我们可以改写以下内容

```java
Collection<EmpInfo> 
    emps = sqlUtility.select(EmpInfo.class, "select * from emps");
...
public static <T> Collection<T> select(Class<T> c, String sqlStatement) { 
    Collection<T> result = new ArrayList<T>();
    /* Run sql query using jdbc. */
    for (/* Iterate over jdbc results. */ ) { 
        T item = c.newInstance(); 
        /* Use reflection and set all of item's
         * fields from sql results. 
         */  
        result.add(item);
    } 
    return result; 
} 
```

上面的代码以类型安全的方式为我们提供了精确的集合类型。

使用 Class 类作为运行时类型标记的这种技术是一个非常有用的技巧，例如，它是一种新用法，在新的 API 中广泛使用来处理注释。