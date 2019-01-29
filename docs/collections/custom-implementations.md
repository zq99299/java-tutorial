# 自定义集合

一般中使用前面提供的就够用了，也许你需要自定义自己的Collection实现类。在Java平台提供的抽象实现的帮助下，这是相当容易的。

## 编写实现的原因
下面列表显示了自定Collection的实现原因：

* 持久性
    
    内置的实现类都是驻留在内存中。你可以构建一个数据库来实现 持久化在数据库中，这样的集合可以由多个程序同时访问。
* 特定的应用
    
    这是一个非常广泛的类别。比如 对map的操作进行事件的监测，get操作时，发起回调事件等
    
* 高性能，特殊用途
    
    很多数据结构采取限制使用的方式，比通用实现提供更好的性能。
    
* 增强功能

    比如让hashMap支持重复的元素
* 方便

    你可能需要额外的实现，提供超越Java平台所提供的便利。
* 适配器

    假设你使用的是传统的API,它有自己的特有的api。你可以编写一个运行这些集合在Java集合框架中操作的适配器实现。
           
## 如何编写自定义实现

```java
public class MyList<T> extends AbstractList<T> {
    private final T[] a;

    public MyList(T[] a) {
        this.a = a;
    }

    @Override
    public T get(int index) {
        return a[index];
    }

    @Override
    public int size() {
        return a.length;
    }
    //模仿java.util.Arrays 中的功能
    public static <T> List<T> asList(T[] a) {
        return new MyList<>(a);
    }

    public static void main(String[] args) {
        List<String> list = MyList.asList(new String[]{"1","2","3"});
        System.out.println(list);
    }
}
```

继承`AbstractList`,并实现`get`,`size`方法，就得到了ListIterator，批量操作，搜索操作，哈希代码计算，比较和字符串表示的toString

以下列表中间了抽象实现：

* AbstractCollection-一个Collection既不是Set也不是List。至少，你必须提供iterator和size方法。
* AbstractSet-一个Set; 利用相同AbstractCollection。
* AbstractList-一个List由一个随机存取数据存储备份，如数组。至少必须提供positional access的方法（get和任选set，remove和add）和size方法。抽象类需要照顾listIterator（和iterator）。
* AbstractSequentialList-一个List通过顺序存取数据存储备份，诸如链表。至少，你必须提供listIterator与size方法。抽象类负责位置访问方法。（这是相反的AbstractList。）
* AbstractQueue-至少，你必须提供的offer，peek，poll，和size方法以及iterator支持remove。
* AbstractMap-一个Map。至少，你必须提供entrySet视图。这通常是与实现AbstractSet类。如果Map是修改的，你还必须提供put方法。

## 编写自定义实现的过程如下

1. 从上面的列表中选择适当的抽象实现类
2. 为类的抽象方法提供实现。如果你的自定义集合是可修改的，你不得不重写一个或多个具体的方法。抽象实现类的API文档会告诉你需要覆盖哪些方法。
3. 测试，调试实现。
4. 如果你关注性能。请阅读你继承抽象实现类的API文档，然后重写实现，请务必衡量重写前后的性能比较。一般此步骤最好省略
                      