# 列表接口

List 是有序 Collection（有时称为序列）。列表可能包含重复的元素。除了继承 Collection 的操作之外，List 接口还包括以下操作：

- Positional access

    基于它们在列表中的数字位置来操作元素。这包括的方法，例如 get， set，add，addAll，和 remove。
- Search

    在列表中搜索指定的对象，并返回其数值位置。搜索方法包括 indexOf 和 lastIndexOf。

- Iteration

    扩展 Iterator 语义以利用列表的顺序性质。该 listIterator 方法提供了这种行为。

- Range-view
    sublist 方法对列表执行任意范围操作。

Java 平台包含两个通用 List 实现。 ArrayList 通常是性能更好的实现， LinkedList 在某些情况下提供更好的性能。

## 集合操作
remove 操作总是删除列表中的第一个元素，在 add 和 addAll 操作总是追加新的元素（S）到列表末尾。

下面将一个列表追加到另外一个列表中

```java
list1.addAll（list2）;
```

像 Set 接口一样，List 加强对 equals 和 hashCode 方法的要求，使得两个 List 对象可以比较逻辑相等而不考虑它们的实现类。
如果两个对象包含相同顺序的相同元素，则它们相等。

## 位置访问和搜索操作
基本的位置操作是 get、set、add 和 remove。（set 和 remove 操作返回被覆盖或删除的旧值）。
其他操作（indexOf 和 lastIndexOf）返回列表中指定元素的第一个或最后一个索引。

addAll 操作 ，添加指定 collection 中的所有元素到此列表的结尾，顺序是指定 collection 的迭代器返回这些元素的顺序（可选操作）。

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

有一个很大的区别，这是一个多态性算法；它交换任何 List 中的两个元素，而不管其实现类型。
这是另一种使用前面 swap 方法的多态性算法

```java
  public static void shuffle(List<?> list, Random rnd) {
      for (int i = list.size(); i > 1; i--)
          swap(list, i - 1, rnd.nextInt(i));
  }
```

此算法包含在 Java 平台的 Collections 类中，使用指定的随机源随机置换指定的列表。
它有点微妙：它从底部向上运行列表，反复交换随机选择的元素到当前位置。
与大多数天真洗牌的尝试，它是公平的（所有的排列与平等的可能性发生，假设随机性的无偏来源)和快速(要求完全互换)。

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

实际上，这个程序还可以这样做

```java
  String[] arrs = {"1", "2", "3", "4", "5"};
  //  java.util.List<T> 该方法返回的是一个List，而内部实现确实一个 同名的内部类 ArrayList
  // 这种方法返回的list 不支持 add 和 remove 操作，且数组列表固定不可变。
  List<String> list = Arrays.asList(arrs);
  Collections.shuffle(list); // 使用默认随机源
  System.out.println(list);
```

!说实话的话，我一直不明白 `asList` 返回的 `ArrayList` 为什么不能进行更改。现在才知道。

## 迭代器
Iterator 由 List 的 iterator 操作返回正确的顺序列表元素的迭代器。
List 还提供了个更丰富的迭代器，ListIterator，它允许您在任一方向上遍历列表，
在迭代期间修改列表，并获取迭代器的当前位置。

ListIterator 从 Iterator（hasNext，next和remove）继承的三个方法在两个接口中执行完全相同的事情。
hasPrevious 和 previous 操作类似 hasNext 和 next。前面的操作引用（隐式）游标之前的元素，
而后者引用游标之后的元素。该 previous 操作光标向后移动，而 next 向前移动了。

这里是一个标准的迭代语句

```java
for( ListIterator<String> it = list.listIterator(list.size());it.hasPrevious();){
    String previous = it.previous();
    System.out.println(previous);
}
```

注意参数，无参数的 listIterator 返回的 Iterator 是以列表起始位置开始的迭代器。
而有参的是返回以指定位置开始的迭代器。

有一个 4 个元素的列表，光标位置有 5 个可能的位置：
```java
        element(0) | element(1) | element(2) | element(3)   
index    0         |     1      |      2     |     3        |   4
```

换句话说：由于有参的能自定义位置，所以，底层 previous() 的时候是 先将游标位置 -1，
而无参的游标位置始终都是 0，所以先取元素再 + 1。 所以就存在了图上的 4 元素存在 5 种可能的游标位置

previous 和 next 可以混合使用，但是需要小心别让自己获取到同一个元素。
nextIndex 和 previousIndex 返回下一个，上一个游标的位置，和 next 与 previous 的计算方式类似。

nextIndex 返回的数字总是 大于 previousIndex ，也就会产生两个边界，-1 和 list.size. 下面是 List.indexOf 的实现原理：
```java
    @Test
    public void test() {
        String[] arrs = {"1", "2", "3", "4", "5"};
        List<String> list = Arrays.asList(arrs);
        String target = "3";
        System.out.println(indexOf(list,target)); // 3
    }

    public int indexOf(List<String> list, String target) {
        for (ListIterator<String> it = list.listIterator(); it.hasNext(); ) {
            // next()之后，nextIndex 就已经是下一个元素的值了
            // 所以这里使用上一个元素的位置，正好得到匹配元素的位置
            if (target == null ? it.next() == null : target.equals(it.next()))
                return it.previousIndex();
        }
        return -1;
    }
```

Iterator,remove() 从列表中移除由 next 或 previous 返回的最后一个元素（可选操作）。
ListIterator 附加两个操作：add 和 set
- set(E e) 用指定元素替换 next 或 previous 返回的最后一个元素（可选操作）。

    ```java
        public void test() {
            String[] arrs = {"1", "2", "3", "4", "5"};
            List<String> list = new ArrayList<>(Arrays.asList(arrs));
            replace(list,"3","6");
            System.out.println(list); //[1, 2, 6, 4, 5]
        }
        public static <E> void replace(List<E> list, E val, E newVal) {
            for (ListIterator<E> it = list.listIterator(); it.hasNext(); )
                if (val == null ? it.next() == null : val.equals(it.next()))
                    it.set(newVal);
        }
    ```

- add(E e) 将指定的元素插入列表（可选操作）。

    下面的多态性算法说明了此方法，将指定值替换成指定列表中的值
    ```java
        @Test
        public void test() {
            String[] arrs = {"1", "2", "3", "4", "5"};
            String[] arrs2 = {"6", "7",};
            List<String> list = new ArrayList<>(Arrays.asList(arrs));
            replace(list, "3", new ArrayList<>(Arrays.asList(arrs2)));
            System.out.println(list); // [1, 2, 6, 7, 4, 5]
        }

        public static <E>
        void replace(List<E> list, E val, List<? extends E> newVals) {
            for (ListIterator<E> it = list.listIterator(); it.hasNext(); ) {
                if (val == null ? it.next() == null : val.equals(it.next())) {
                    it.remove();
                    for (E e : newVals)
                        it.add(e); // 是添加到当游标位置，操作指定位置的值
                }
            }
        }
    ```


## 范围视图操作
在 range-view 操作中，subList(int fromIndex, int toIndex) 返回 List 中指定的 fromIndex（包括 ）和 toIndex（不包括）之间的部分视图。

```java
for (int i = fromIndex; i < toIndex; i++) {
    ...
}
```

返回的是一个 `SubList` 对象，没有新建一个 List，而是使用源 list 中的容器，自己只不过维护了这部分视图的指针偏移量，和个数，
所以在 `sublist` 中操作其实也是在操作源 list；

如清空这部分视图，源 list 跟着改变

```java
String[] arrs = {"1", "2", "3", "4", "5"};
List<String> list = new ArrayList<>(Arrays.asList(arrs));
List<String> list1 = list.subList(0, 2);
list1.clear();
System.out.println(list1); //[]
System.out.println(list); // [3, 4, 5]
```

还可以用来做范围搜索

```java
String[] arrs = {"1", "2", "3", "4", "5"};
List<String> list = new ArrayList<>(Arrays.asList(arrs));
int i = list.subList(1, 4).indexOf("2");
int j = list.subList(1, 4).lastIndexOf("2");
System.out.println(i + "," + j); //0,0
```
要注意的是，返回的索引 是 subList 视图中的索引，而不是源列表中的


这里是一个多态的算法，从列表指定处移除 n 个元素，返回被移除的元素

```java
    @Test
    public void test() {
        String[] arrs = {"1", "2", "3", "4", "5"};
        List<String> list = new ArrayList<>(Arrays.asList(arrs));
        System.out.println(dealHand(list,3)); //[3, 4, 5]
        System.out.println(list); //[1, 2]

    }
    public static <E> List<E> dealHand(List<E> deck, int n) {
        int deckSize = deck.size();
        List<E> handView = deck.subList(deckSize - n, deckSize);
        List<E> hand = new ArrayList<E>(handView);
        handView.clear();
        return hand;
    }
```

**注意**，该算法从牌组的末端去除手牌。对于许多常见的 List 实现，例如 ArrayList，从列表的末尾移除元素的性能明显好于从开始移除元素的性能。

使用这个算法来实现 52 张牌的发牌

```java
public class Deal {
    public static void main(String[] args) {
        int numHands = 4; // 人数
        int cardsPerHand = 5; // 发牌数量

        // 生成52张牌
        String[] suit = new String[]{
                "黑桃", "红心",
                "方块", "梅花"
        };
        String[] rank = new String[]{
                "A", "2", "3", "4",
                "5", "6", "7", "8", "9", "10",
                "J", "Q", "K"
        };

        List<String> deck = new ArrayList<String>();
        for (int i = 0; i < suit.length; i++)
            for (int j = 0; j < rank.length; j++)
                deck.add(suit[i] + rank[j]);

        // Shuffle the deck.
        Collections.shuffle(deck);

        if (numHands * cardsPerHand > deck.size()) {
            System.out.println("Not enough cards.");
            return;
        }

        for (int i = 0; i < numHands; i++)
            System.out.println(dealHand(deck, cardsPerHand));
    }

    public static <E> List<E> dealHand(List<E> deck, int n) {
        int deckSize = deck.size();
        List<E> handView = deck.subList(deckSize - n, deckSize);
        List<E> hand = new ArrayList<E>(handView);
        handView.clear();
        return hand;
    }
}
```

输出结果

```
[方块K, 黑桃3, 梅花4, 黑桃7, 黑桃K]
[梅花Q, 梅花5, 梅花10, 红心6, 梅花J]
[红心10, 梅花K, 黑桃5, 红心A, 红心4]
[黑桃9, 黑桃10, 黑桃Q, 红心5, 方块Q]
```

虽然 subList 操作非常强大，但是使用必须小心，因为是共享，但是返回的对象不是同一个，维护困难，建议只是用来临时操作。


## 列表算法
Collections 类中的大多数多态性算法特别适用于 List。拥有所有这些算法在您的处置使它很容易操纵列表。
这里是这些算法的总结，这些算法在“ [算法](../algorithms.md)” 部分中有更详细的描述 。

* sort - List 使用归并排序算法,它提供了一种快速、稳定的排序。
* shuffle- 随机排列 List 中元素的顺序。
* reverse- 反转指定列表中元素的顺序。
* rotate- 根据指定的距离轮换指定列表中的元素。
* swap- 在指定列表的指定位置处交换元素。 。
* replaceAll - 使用另一个值替换列表中出现的所有某一指定值。
* fill- 使用指定元素替换指定列表中的所有元素。
* copy- 将源 List 复制到目标 List。
* binarySearch- 使用二分搜索法搜索指定列表，以获得指定对象
* indexOfSubList- 返回指定源列表中第一次出现指定目标列表的起始位置。
* lastIndexOfSubList- 返回指定源列表中最后一次出现指定目标列表的起始位置。
