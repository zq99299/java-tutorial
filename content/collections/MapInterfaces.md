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