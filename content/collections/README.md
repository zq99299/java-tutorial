# 集合框架概述

## 介绍
一个集合代表一组对象，集合框架是用于表示和操纵集合的统一架构，使得集合能够独立于实现细节被操作。

集合框架包括：
- 集合接口
    
    表示不同类型的集合，例如sets, lists, and maps。这些接口构成了框架的基础。
- 通用实现
    
    集合接口的主要实现。
- 传统实现
    
    来自早期版本的集合类，Vector和 Hashtable，被改造以实现集合接口。
- 专用实现
    
    实施设计用于特殊情况。这些实现显示非标准性能特性，使用限制或行为。
- 并发实现
    
    实现设计用于高并发使用。
- 包装器实现
    
    向其他实现添加功能（如同步）。
- 方便实现
    
    集合接口的高性能“小型实现”。
- 抽象实现
    
    部分实现集合接口以方便定制实现。
- 算法
    
    对集合执行有用函数的静态方法，例如排序列表。
- 基础设施

    为集合接口提供必要支持的接口。
- 数组实用程序

    基本类型和引用对象数组的效用函数。严格来说，不是集合框架的一部分，这个特性在集成框架的同时被添加到Java平台，并依赖于一些相同的基础设施。
    
## 集合接口
集合接口被分成两组。最基本的接口java.util.Collection具有以下后代：

- java.util.Set
- java.util.SortedSet
- java.util.NavigableSet
- java.util.Queue
- java.util.concurrent.BlockingQueue
- java.util.concurrent.TransferQueue
- java.util.Deque
- java.util.concurrent.BlockingDeque

其他集合接口基于java.util.Map，而不是真正的集合。但是，这些接口包含 收集视图操作，这使得它们可以作为集合操作。map有以下子代：

- java.util.SortedMap
- java.util.NavigableMap
- java.util.concurrent.ConcurrentMap
- java.util.concurrent.ConcurrentNavigableMap

集合集合接口中的许多修改方法都是可选的。实现的时候可选支持一个或多个，不支持的方法在尝试执行时抛出运行时异常（UnsupportedOperationException）。
有以下几个术语：
- 不支持修改的操作（如add,remove,clear）
- 不可变集合
- 集合的大小不可变
- 支持随机访问列表，不支持的称为顺序访问列表，通过RandomAccess接口标记，使得通用算法可以改变其行为

还有一些限制可以存储什么元素，如map 的 key 和value 可能要求：
- 是一种特殊的类型
- 不是 null

试图添加违反实现的限制的元素会导致运行时异常，通常是 ClassCastException，IllegalArgumentException或NullPointerException。尝试删除或测试是否存在违反实现的限制的元素可能会导致异常。一些受限制的集合允许这种使用。

## 集合实现
实现集合接口的类通常具有< Implementation-style > < Interface > 形式的名称。下表总结了通用实现：

| 接口  |哈希表	|可变数组|	平衡二叉树|	链表|哈希表+链表
|------|-------|--------|---------------|---------|------------
| Set	|HashSet|- 	 |TreeSet        |-	     |LinkedHashSet
| List	|- 	|ArrayList|-	 	  |LinkedList|-	 
| Deque	|- 	|ArrayDeque|-	 	  |LinkedList|-	 
| Map	|HashMap|-	   |TreeMap       |-        |	LinkedHashMap


