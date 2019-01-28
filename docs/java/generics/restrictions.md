# 对泛型的限制

要有效地使用Java泛型，您必须考虑以下限制：

* 不能实例化具有原始类型的泛型类型
* 无法创建类型参数的实例
* 不能声明类型是类型参数的静态字段
* 不能使用带有参数化类型的转换或instanceof
* 不能创建参数化类型的数组
* 无法创建，捕捉或抛出参数化类型的对象
* 不能重载每个过载的形式参数类型擦除到相同的原始类型的方法

## 不能实例化具有原始类型的泛型类型

考虑以下参数化类型：

```java
class Pair<K, V> {

        private K key;
        private V value;

        public Pair(K key, V value) {
            this.key = key;
            this.value = value;
        }

        // ...
    }
```

创建Pair对象时，不能将基本类型替换为类型参数K或V

```java
Pair<int, char> p = new Pair<>(8, 'a');  // compile-time error
```

您只能用非原始类型替换类型参数K和V：

```java
Pair<Integer, Character> p = new Pair<>(8, 'a');

自动装箱将自动使用以下语句

Pair<Integer, Character> p = new Pair<>(Integer.valueOf(8), new Character('a'));
```

有关更多信息请参阅
[自动装箱子拆箱](//content/java/data/autoboxing.md)

## 无法创建类型参数的实例

你不能创建一个类型参数的实例。例如，下面的代码导致编译时错误：

```java
    public static <E> void append(List<E> list) {
        E elem = new E();  // compile-time error
        list.add(elem);
    }
```

作为解决方法，您可以通过反射来创建类型参数的对象：

```java
public static <E> void append(List<E> list, Class<E> cls) throws Exception {
    E elem = cls.newInstance();   // OK
    list.add(elem);
}
```

您可以按如下方式调用append方法：

```java
List<String> ls = new ArrayList<>();
append(ls, String.class);
```

## 不能声明类型是类型参数的静态字段

类的静态字段是由类的所有非静态对象共享的类级变量。因此，不允许使用类型参数的静态字段。考虑以下类：

```java
public class MobileDevice<T> {
    private static T os;

    // ...
}
```

如果允许类型参数的静态字段，那么下面的代码会被混淆：

```java
MobileDevice<Smartphone> phone = new MobileDevice<>();
MobileDevice<Pager> pager = new MobileDevice<>();
MobileDevice<TabletPC> pc = new MobileDevice<>();
```

因为静态字段os被电话，寻呼机和pc共享，所以os的实际类型是什么？它不能同时是智能手机，寻呼机和平板电脑。因此，您不能创建类型参数的静态字段。

## 不能对参数化类型使用cast或instanceof

因为Java编译器会删除泛型代码中的所有类型参数，所以无法验证运行时正在使用的泛型类型的参数化类型：

```java
public static <E> void rtti(List<E> list) {
    if (list instanceof ArrayList<Integer>) {  // compile-time error
        // ...
    }
}
```

传递给rtti方法的参数化类型的集合是：

```java
S = { ArrayList<Integer>, ArrayList<String> LinkedList<Character>, ... }
```

运行时不会跟踪类型参数，所以它不能区分`ArrayList <Integer>`和`ArrayList <String>`。你可以做的最多的是使用一个无界的通配符来验证列表是一个`ArrayList`：

```java
public static void rtti(List<?> list) {
    if (list instanceof ArrayList<?>) {  // OK; instanceof requires a reifiable type
        // ...
    }
}
```

通常，除非通过无界通配符进行参数化，否则不能强制转换为参数化类型。例如：

```java
List<Integer> li = new ArrayList<>();
List<Number>  ln = (List<Number>) li;  // compile-time error
```

但是，在某些情况下，编译器知道类型参数总是有效的并且允许转换。例如：

```java
List<String> l1 = ...;
ArrayList<String> l2 = (ArrayList<String>)l1;  // OK
```

## 不能创建参数化类型的数组

您不能创建参数化类型的数组。例如，下面的代码不能编译：

```java
List<Integer>[] arrayOfLists = new List<Integer>[2];  // compile-time error
```

以下代码演示了将不同类型插入到数组中时会发生什么情况：

```java
Object[] strings = new String[2];
strings[0] = "hi";   // OK
strings[1] = 100;    // An ArrayStoreException is thrown.
```

如果你用一个通用列表尝试同样的事情，会出现一个问题：

```java
Object[] stringLists = new List<String>[];  //编译错误，假装是允许的
stringLists[0] = new ArrayList<String>();   // OK
stringLists[1] = new ArrayList<Integer>();  // An ArrayStoreException should be thrown,
                                            // 运行时无法检测到它
```

如果允许参数化列表数组，则以前的代码将无法抛出所需的ArrayStoreException。

## 无法创建，捕捉或抛出参数化类型的对象

泛型类不能直接或间接地扩展Throwable类。例如，以下类将不会编译：

```java
// Extends Throwable indirectly
class MathException<T> extends Exception { /* ... */ }    // compile-time error

// Extends Throwable directly
class QueueFullException<T> extends Throwable { /* ... */ // compile-time error
```

一个方法不能捕获一个类型参数的实例：

```java
public static <T extends Exception, J> void execute(List<J> jobs) {
    try {
        for (J job : jobs)
            // ...
    } catch (T e) {   // compile-time error
        // ...
    }
}
```

但是，您可以在throws子句中使用类型参数：

```java
class Parser<T extends Exception> {
    public void parse(File file) throws T {     // OK
        // ...
    }
}
```

## 不能重载每个过载的形式参数类型擦除到相同的原始类型的方法

一个类不能有两个重载方法，在类型擦除之后将具有相同的签名。

```java
public class Example {
    public void print(Set<String> strSet) { }
    public void print(Set<Integer> intSet) { }
}
```

重载将全部共享相同的类文件表示，并将生成编译时错误。