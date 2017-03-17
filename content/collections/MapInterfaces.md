# Map接口
Map是将键映射到值的对象。map不能包含重复的键：每个键最多可以映射一个值。

它模拟数学函数抽象。所述Map接口包括用于基本操作的方法（例如put，get，remove， containsKey，containsValue，size，和empty），批量操作（例如putAll和clear），和集合视图（例如keySet，entrySet和values）。

Java平台包含三个通用Map实现： HashMap， TreeMap，和 LinkedHashMap。他们的行为和性能正是类似于HashSet，TreeSet以及LinkedHashSet.

本页的Map其余部分详细讨论了接口。Jdk8 stream 对map提供了聚合操作，Collectors.groupingBy，Collectors.summingInt 分组，汇总等。JDK8+另寻机会学习。

## map的基本操作
Map的基本操作（put，get，containsKey，containsValue，size，和isEmpty）表现得完全像Hashtable。

下来来一个示例：统计单词出现的频率次数：
```java
    public void test()  {
        String[] arrs = {"1", "2", "3", "4", "5", "1","5"};
        Map<String, Integer> freqs = new HashMap<>();
        for (String a : arrs) {
            Integer freq = freqs.get(a);
            freqs.put(a, freq == null ? 1 : freq + 1);
        }

        System.out.println("不同的单词有：" + freqs.size()); //不同的单词有：5
        System.out.println(freqs); // {3=1, 2=1, 1=2, 5=2, 4=1}
    }
```
HashMap 能被替换成 TreeMap，将会看到按单词自然顺序排序的输出。

也可以替换成 LinkedHashMap，按单词出现的顺序 输出。

这种灵活性提供了基于接口的框架有力的说明。


像 Set和 List接口一样，Map加强对equals和hashCode方法的要求，使得Map可以比较两个对象的逻辑相等性，而不考虑它们的实现类型。如果它们代表相同的键-值映射关系的实例是相等的。

按照惯例，所有通用Map实现提供构造函数，它接受一个Map对象并初始化新的Map以包含指定的所有键值映射Map。这个标准Map转换构造函数完全类似于标准Collection构造函数：它允许调用者创建Map一个期望的实现类型，最初包含另一个实例类型中的所有映射Map，而不考虑其他Map实现类型。

例如，假设你有一个Map，命名m。以下一行创建一个新的，HashMap最初包含所有相同的键值映射m。
```java
Map<K, V> copy = new HashMap<K, V>(m);
```

## map 接口的批量操作
clear，移除此集合的所有映射。putAll从指定映射中将所有映射关系复制到此映射中（可选操作）。

以下是演示处理默认值的技巧：
```java
static <K, V> Map<K, V> newAttributeMap(Map<K, V>defaults, Map<K, V> overrides) {
    Map<K, V> result = new HashMap<K, V>(defaults);
    result.putAll(overrides);
    return result;
}
```

## 集合视图（Collection Views）

运行Map被视为一个 `collection` 视图的三种方法：
- keySet : set 视图，返回map中所有的 key
- values ： Collection视图，返回map中所有的value，因为多个key可以隐身到相同的值
- entrySet ： set 视图，元素为Map.Entry类型

集合视图提供map遍历的唯一手段
```java
for (KeyType key : m.keySet())
    System.out.println(key);
```
iterator:
```java
// Filter a map based on some 
// property of its keys.
for (Iterator<Type> it = m.keySet().iterator(); it.hasNext(); )
    if (it.next().isBogus())
        it.remove();
```        

```java
for (Map.Entry<KeyType, ValType> e : m.entrySet())
    System.out.println(e.getKey() + ": " + e.getValue());
```

很多人担心这些语法可能很慢，因为每次调用视图操作Map都必须创建一个新Collection示例。但是没有理由，Map每当请求Collection的时候都返回相同的对象。

！这些返回的视图同样是会反应到源map上的。

## 喜欢集合的观点：map 代数？
批量操作（containsAll，removeAll，和retainAll）会很方便。

- boolean containsAll(Collection<?> c) 

  如果此 set 包含指定 collection 的所有元素，则返回 true。

 按照类似的方式，假设你想知道两个Map对象是否包含所有相同的键映射
 ```java
 if (m1.keySet().equals(m2.keySet())) {
    ...
}
 ```   

### 检验必须的和允许的key属性示例：  
```java
    @Test
    public void test() {
        String[] arrs = {"1", "2", "3", "4", "5", "1"};
        Map<String, String> attrMap = new HashMap<>();
        for (String a : arrs) {
            attrMap.put(a, a);
        }
        // 必须的属性
        Set<String> requiredAttrs = new HashSet<>();
        requiredAttrs.add("7");

        // 允许的属性
        Set<String> permittedAttrs = new HashSet<>();
        permittedAttrs.add("4");
        validate(attrMap, requiredAttrs, permittedAttrs);
    }

    static <K, V> boolean validate(Map<K, V> attrMap, Set<K> requiredAttrs, Set<K> permittedAttrs) {
        boolean valid = true;
        Set<K> attrs = attrMap.keySet();

        // 所有的值 是否包含 必须的值
        if (!attrs.containsAll(requiredAttrs)) {
            Set<K> missing = new HashSet<K>(requiredAttrs);
            missing.removeAll(attrs);
            System.out.println("Missing attributes: " + missing);
            valid = false;
        }
        // 允许的值 是否 包含 要校验的值
        if (!permittedAttrs.containsAll(attrs)) {
            Set<K> illegal = new HashSet<K>(attrs);
            illegal.removeAll(permittedAttrs);
            System.out.println("Illegal attributes: " + illegal);
            valid = false;
        }
        return valid;
    }
``` 
输出
```java
Missing attributes: [7]
Illegal attributes: [3, 2, 1, 5]
```

## 假设你想知道两个Map的交集
```java
Set<KeyType>commonKeys = new HashSet<KeyType>(m1.keySet());
commonKeys.retainAll(m2.keySet());
```

上面几个示例都是非破坏性的，也就是操作后不会反应到源map中
这里有几个破坏性的：

## 假设你要删除Map与另一个map共同的键值对
```java
m1.entrySet().removeAll(m2.entrySet());

m1.keySet().removeAll(m2.keySet());
```

## 假设想要移除一个员工
```java
Employee simon = ... ;
managers.values().removeAll(Collections.singleton(simon));
```
注意，使用Collections.singleton一个静态工厂方法，返回一个不可变Set的单个指定的元素。

```java
Map<Employee, Employee> m = new HashMap<Employee, Employee>(managers);
m.values().removeAll(managers.keySet());
Set<Employee> slackers = m.keySet();
```
