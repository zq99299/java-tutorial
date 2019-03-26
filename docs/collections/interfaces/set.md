# Set接口
一个不包含重复元素的 collection。更确切地讲，set 不包含满足 e1.equals(e2) 的元素对 e1 和 e2，
并且最多包含一个 null 元素。正如其名称所暗示的，此接口模仿了数学上的 set 抽象。

在所有构造方法以及 add、equals 和 hashCode 方法的协定上，Set 接口还加入了其他规定，
这些规定超出了从 Collection 接口所继承的内容。出于方便考虑，它还包括了其他继承方法的声明
（这些声明的规范已经专门针对 Set 接口进行了修改，但是没有包含任何其他的规定）。

所有构造方法必须创建一个不包含重复元素的 set（正如上面所定义的）。

Java 平台包含三个通用 Set 实现：HashSet、TreeSet 和 LinkedHashSet。

- HashSet，它将其元素存储在哈希表中，是最佳的执行; 然而它不能保证迭代的顺序。
- TreeSet，其将其元素存储在红黑树中，基于它们的值对其元素排序; 它基本上慢于 HashSet。
- LinkedHashSet，它被实现为具有贯穿它的链表的哈希表，基于它们被插入到集合中的顺序（插入顺序）对其元素排序。比 HashSet 性能略高吗？

一个简单的示例，想要一个与 e 元素一样的集合，但是不包括重复元素。
```java
  ArrayList<String> e = new ArrayList<>();
  e.add("h");
  e.add("h");
  e.add("l");
  HashSet<String> strings = new HashSet<>(e);
  System.out.println(strings); //[l, h]
```

在 jdk1.8+ 中还能使用 Stream 来操作，

```java
c.stream()
.collect(Collectors.toSet()); //没有重复
```

## set 接口基本操作

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


## set 接口批量操作
大部分操作适合 Set，代数运算，假设 s1 和 s2 是 sets，以下是批量操作
```java
    private Set getS1() {
        Set<String> s1 = new HashSet<>();
        s1.add("2");
        s1.add("3");
        s1.add("1");
        return s1;
    }

    private Set getS2() {
        Set<String> s2 = new HashSet<>();
        s2.add("1");
        s2.add("4");
        s2.add("5");
        s2.add("3");
        return s2;
    }

    @Test
    public void fun1() {
        // s2 是否是 s1 的子集（也就是说：s1 是否包含 s2的所有元素 ）
        System.out.println(getS1().containsAll(getS2())); //fasle
        // s1 和 s2 的并集
        Set s1 = getS1();
        System.out.println(s1.addAll(getS2())); // true
        System.out.println(s1); //[3, 2, 1, 5, 4]

        // s1 和 s2 的交集
        Set retainAllS1 = getS1();
        System.out.println(retainAllS1.retainAll(getS2()));
        System.out.println(retainAllS1); // [3, 1]

        // s1 和 s2 的差集 （也就是：在s1 不包含 s2有的元素）
        Set removeAllS1 = getS1();
        System.out.println(removeAllS1.removeAll(getS2()));
        System.out.println(removeAllS1); // [2]
    }
```

假设你需要找出哪些元素是唯一的，哪些元素是重复的，可以通过创建两个 set 来做：

```java
    private List<String> getData() {
        List<String> s1 = new ArrayList<>();
        s1.add("2");
        s1.add("3");
        s1.add("1");
        s1.add("1");
        s1.add("6");
        return s1;
    }

    @Test
    public void test() {
        // 唯一的
        Set<String> uniques = new HashSet<String>();
        // 重复的
        Set<String> dups = new HashSet<String>();

        List<String> data = getData();
        for (String ele : data) {
            if (!uniques.add(ele)) { // 没有添加成功 标识有重复的
                dups.add(ele);
            }
        }
        // 删除重复的元素
        uniques.removeAll(dups);
        System.out.println("Unique words:" + uniques);
        System.out.println("Duplicate words：" + dups);
    }

```

输出结果

```java
Unique words:[3, 2, 6]
Duplicate words：[1]
```

！我一直以为 set 只是不能有重复元素，这些重复元素会被覆盖。原来重复的不会被覆盖。而是直接失败。
 而 map 的 key 重复 value 是会被覆盖的。所以说 map 不是真正的集合，但是它是集合框架中的一员。
