# 列表接口

List是有序 Collection（有时称为序列）。列表可能包含重复的元素。除了继承的操作之外Collection，List接口还包括以下操作：

- Positional access
    
    基于它们在列表中的数字位置来操作元素。这包括的方法，例如get， set，add，addAll，和remove。
- Search 
    
    在列表中搜索指定的对象，并返回其数值位置。搜索方法包括 indexOf和lastIndexOf。

- Iteration

    扩展Iterator语义以利用列表的顺序性质。该 listIterator方法提供了这种行为。
    
- Range-view
    sublist方法对列表执行任意范围操作。
    
Java平台包含两个通用List实现。 ArrayList，这通常是性能更好的实现，并且 LinkedList在某些情况下提供更好的性能。

## 集合操作
remove操作总是删除列表中的第一个元素，在add和addAll操作总是追加新的元素（S）到列表末尾。

下面将一个列表追加到另外一个列表中
```java
list1.addAll（list2）;
```

像 Set接口一样，List加强对equals和hashCode方法的要求，使得两个List对象可以比较逻辑相等而不考虑它们的实现类。List如果两个对象包含相同顺序的相同元素，则它们相等。

## 位置访问和搜索操作
基本positional access操作是get，set，add和remove。（set和remove操作返回被覆盖或删除的旧值。）其他操作（indexOf和lastIndexOf）返回列表中指定元素的第一个或最后一个索引。

addAll操作 ，添加指定 collection 中的所有元素到此列表的结尾，顺序是指定 collection 的迭代器返回这些元素的顺序（可选操作）。

这里有一个小方法来交换两个索引的值
```java
    @Test
    public void test() {
        List<String> s1 = new ArrayList<>();
        s1.add("2");
        s1.add("3");
        s1.add("1");
        System.out.println(s1); //[2, 3, 1]
        swap(s1, 0, 1);
        System.out.println(s1); //[3, 2, 1]
    }

    public static <E> void swap(List<E> a, int i, int j) {
        E tmp = a.get(i);
        a.set(i, a.get(j));
        a.set(j, tmp);
    }
```

有一个很大的区别，这是一个多态性算法；它交换任何List中的两个元素，而不管其实现类型。这是另一种使用前面swap方法的多态性算法
```java
    public static void shuffle(List<?> list, Random rnd) {
        for (int i = list.size(); i > 1; i--)
            swap(list, i - 1, rnd.nextInt(i));
    }
```

此算法包含在Java平台的 Collections类中，使用指定的随机源随机置换指定的列表。它有点微妙：它从底部向上运行列表，反复交换随机选择的元素到当前位置。与大多数天真洗牌的尝试,它是公平的(所有的排列与平等的可能性发生,假设随机性的无偏来源)和快速(要求完全互换)。

下面使用随机算法在参数列表中打印单词：
```java
        String[] arrs = {"1", "2", "3", "4", "5"};
        List<String> list = new ArrayList<>();
        for (String arr : arrs) {
            list.add(arr);
        }
        Collections.shuffle(list, new Random());
        System.out.println(list);
```

实际上，这个程序还可以做得更端。
```java
        String[] arrs = {"1", "2", "3", "4", "5"};
        //  java.util.List<T> 该方法返回的是一个List，而内部实现确实一个 同名的内部类 ArrayList
        // 这种方法返回的list 不支持 add 和 remove 操作，且数组列表固定不可变。
        List<String> list = Arrays.asList(arrs);
        Collections.shuffle(list); // 使用默认随机源
        System.out.println(list);
```
!说实话的话，我一直不明白 `asList`返回的`ArrayList`为什么不能进行更改。现在才知道。