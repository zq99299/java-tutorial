# 问题与练习

## 问题

1. 在本课开始的时候，您已经了解到核心集合接口被组织成两个不同的继承树。特别是一个接口不被认为是真实的Collection，因此坐在它自己的树的顶部。这个接口的名字是什么？

    答：Map
2. 集合框架中的每个接口都用`<E>`语法来声明，它告诉你它是通用的。当你声明一个Collection实例时，指定它将包含的对象的类型有什么好处？
    
    答：指定类型允许编译器（在编译时）验证放入集合的对象的类型是否正确，从而减少运行时的错误。
3. 什么接口代表一个不允许重复元素的集合？
    
    答：Set
4. 什么接口形成了集合层次的根？
    
    答：Collection 
5. 什么接口表示可能包含重复元素的有序集合？ 
    
    答：List
6. 什么接口代表在处理之前保存元素的集合？
    
    答：Queue; 注意代表一词
7. 什么接口反映了一种将键映射到值的类型？
    
    答：Map
8. 什么接口代表双端队列？

    答：Deque
9. 命名三种不同的方式来遍历元素a的List。
    
    答：您可以使用Stream，增强for语句或迭代器。 
10. 对或错：聚合操作是修改基础集合的可变操作。

    答：错。聚合操作不会改变基础集合。实际上，在调用集合操作时，一定要小心，不要改变集合。这样做可能会导致并发性问题，如果在未来的某个时候将流更改为并行流。 


## 练习

1. 编写一个以随机顺序打印参数的程序。不要复制参数数组。演示如何使用流和传统的增强for语句打印出元素。 

    ```java
            Integer[] arr = new Integer[]{1, 2, 3, 4, 5, 6, 7, 8, 9};
    
            List<Integer> ints = Arrays.asList(arr);
            Collections.shuffle(ints);
    
            // for-each 打印
            for (Integer i : ints) {
                System.out.print(i + " ");
            }
            System.out.println();
            // jdk8 流打印
            ints.stream().forEach(i -> System.out.print(i + " "));
    ```
    
2. 把以下代码修改成 SortedSort,且添指定Comparator忽略大小写排序

    ```java
    public class FindDups {
        public static void main(String[] args) {
            Set<String> s = new HashSet<String>();
            for (String a : args)
                   s.add(a);
                   System.out.println(s.size() + " distinct words: " + s);
        }
    }
    ```
    答：
    ```java
            s = new TreeSet<>(new Comparator<String>() {
            @Override
            public int compare(String o1, String o2) {
                return o1.equalsIgnoreCase(o2) ? -1 : 1;
            }
        });
        for (String a : args)
            s.add(a);
        System.out.println(s.size() + " distinct words: " + s);
    ```
    
3. 练习：编写一个方法，将`List<String>`每个元素都应用于String.trim方法。

 ```java
 String[] args = new String[]{"10x", "10X", "2", "3 ", "4", " 5", "6", "7", "8", "9 "};
        List<String> strings = Arrays.asList(args);
        // 普通for
        for (int i = 0; i < strings.size(); i++) {
            strings.set(i, strings.get(i).trim());
        }

        // list迭代器
        ListIterator<String> it = strings.listIterator();
        while (it.hasNext()) {
            it.set(it.next().trim());
        }
 ``` 
 
4. 练习：考虑四个核心接口，Set，List，Queue，和Map。对于以下四个分配中的每一个，指定四个核心接口中的哪一个最适合，并说明如何使用它来实现分配。

    * 异想天开玩具公司（WTI）需要记录所有员工的姓名。每月从这些记录中随机抽取一名员工，领取免费玩具。
        
        使用一个List。通过选择一个随机0和size()-1之间的数字来确定中奖员工。
    * WTI已经决定，每个新产品都将以一名员工的名字命名 - 但是只有名字才会被使用，每个名字只能使用一次。准备一个独特的名字列表。
    
        使用一个Set。实现此接口的集合不允许多次输入相同的元素。
    * WTI决定只使用最受欢迎的玩具名称。计算每个名字的雇员人数。
    
        使用Map，其中的键是名字，每个值是具有该名字的雇员数量的计数。
    * WTI获得当地长曲棍球队的季票，由员工分享。为这个流行的运动创建一个等候名单。
    
        使用一个Queue。调用add()将员工添加到等待列表中，并将remove()其删除。