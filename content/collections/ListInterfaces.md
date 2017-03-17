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