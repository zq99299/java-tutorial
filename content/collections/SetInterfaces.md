# Set接口
一个不包含重复元素的 collection。更确切地讲，set 不包含满足 e1.equals(e2) 的元素对 e1 和 e2，并且最多包含一个 null 元素。正如其名称所暗示的，此接口模仿了数学上的 set 抽象。 

在所有构造方法以及 add、equals 和 hashCode 方法的协定上，Set 接口还加入了其他规定，这些规定超出了从 Collection 接口所继承的内容。出于方便考虑，它还包括了其他继承方法的声明（这些声明的规范已经专门针对 Set 接口进行了修改，但是没有包含任何其他的规定）。 

对这些构造方法的其他规定是（不要奇怪），所有构造方法必须创建一个不包含重复元素的 set（正如上面所定义的）。 

Java平台包含三个通用Set实现：HashSet，TreeSet，和LinkedHashSet。 
- HashSet，它将其元素存储在哈希表中，是最佳的执行; 然而它不能保证迭代的顺序。 
- TreeSet，其将其元素存储在红黑树中，基于它们的值对其元素排序; 它基本上慢于HashSet。 
- LinkedHashSet，它被实现为具有贯穿它的链表的哈希表，基于它们被插入到集合中的顺序（插入顺序）对其元素排序。比HashSet性能略高吗？

一个简单的示例,想要一个与e元素一样的集合，但是不包括重复元素。
```java
        ArrayList<String> e = new ArrayList<>();
        e.add("h");
        e.add("h");
        e.add("l");
        HashSet<String> strings = new HashSet<>(e);
        System.out.println(strings); //[l, h]
```
在jdk1.8+中还能使用Stream来操作，
```java
c.stream()
.collect(Collectors.toSet()); //没有重复
```

## set接口基本操作
- size : 返回 set 中的元素数（其容量）。
- add :  如果 set 中尚未存在指定的元素，则添加此元素（可选操作）。
- remove : 如果 set 中存在指定的元素，则将其移除（可选操作）。
- iterator : 返回在此 set 中的元素上进行迭代的迭代器。

```java
        ArrayList<String> e = new ArrayList<>();
        e.add("h");
        e.add("h");
        e.add("2");
        e.add("1");
        // 去重，不排序
        Set<String> sets = new HashSet<>(e);
        System.out.println(sets); //[2, 1, h]
        sets = new TreeSet<>(e);
        // 去重，并排序
        System.out.println(sets); //[1, 2, h]
```
通过接口来接实例，而不是直接使用实现类型实例，这样能方便直接切换实现类来达到改变程序。