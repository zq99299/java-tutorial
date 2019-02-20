# 泛型方法
**泛型方法** 是引入自己的类型参数的方法。这与声明泛型类型相似，但是类型参数的作用域仅限于声明它的方法。允许使用静态和非静态泛型方法，以及泛型类构造函数。

泛型方法的语法包括一个类型参数列表，里面的尖括号出现在方法的返回类型之前。对于静态泛型方法，类型参数部分必须出现在方法的返回类型之前。

所述的 Util 类包括泛型的方法，进行比较，其比较两个对象：

```java
public class Util {
    public static <K, V> boolean compare(Pair<K, V> p1, Pair<K, V> p2) {
        return p1.getKey().equals(p2.getKey()) &&
               p1.getValue().equals(p2.getValue());
    }
}

public class Pair<K, V> {

    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public void setKey(K key) { this.key = key; }
    public void setValue(V value) { this.value = value; }
    public K getKey()   { return key; }
    public V getValue() { return value; }
}
```

调用此方法的完整语法是：

```java
Pair<Integer, String> p1 = new Pair<>(1, "apple");
Pair<Integer, String> p2 = new Pair<>(2, "pear");
boolean same = Util.<Integer, String>compare(p1, p2);
```

类型已经明确提供，如上组后一行代码所示。通常，这可以省略，编译器会推断出所需的类型：
```java
Pair<Integer, String> p1 = new Pair<>(1, "apple");
Pair<Integer, String> p2 = new Pair<>(2, "pear");
boolean same = Util.compare(p1, p2);
```

这个功能称为 **类型推断**（type inference），它允许你像通常的方法那样调用泛型方法，而不用在尖括号之间指定类型。这个主题将在下一节中进一步讨论
