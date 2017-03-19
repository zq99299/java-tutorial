# 方便实现

本节介绍几个小型实现，当不需要全部功能时，可以比通用实现更方便，更高效。本节中的所有实现都通过静态工厂方法而不是public类提供。

## 列出数组的视图

 Arrays.asList方法返回List其数组参数的视图。集合的大小是数组的大小，不能更改,如果调用add或者remove方法将抛出异常UnsupportedOperationException
 
 返回一个受指定数组支持的固定大小的列表。（对返回列表的更改会“直接写”到数组。）此方法同 Collection.toArray() 一起，充当了基于数组的 API 与基于 collection 的 API 之间的桥梁。返回的列表是可序列化的，并且实现了 RandomAccess。
 
 所以注意不要保留数组的引用。