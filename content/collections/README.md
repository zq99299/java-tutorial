# 概述
集合框架将介绍以下几个点。让你了解什么是集合，以及如何使用。您将了解构成Java集合框架的核心元素 - 接口，实现，聚合操作和算法

* [简介](/content/collections/intro.md) 他们会如何让你的工作更轻松，你的程序更好。您将了解构成的集合框架的核心要素：接口，实现 和算法。

* [接口](/content/collections/interfaces/README.md) 描述了核心集合接口，这是Java Collections Framework的心脏和灵魂。您将学习有效使用这些接口的一般准则，包括何时使用哪个接口。您还将学习每个界面的习语，这将帮助您充分利用接口。

* 聚合操作 迭代代表你的收藏，从而使您能够编写处理存储在集合的元素更简洁和高效的代码。-流操作和for循环，不记录了。

* [实现](/content/collections/implementations/README.md) 描述JDK的通用集合的实现 ，并告诉您何时使用哪种实现。您还可以了解包装的实现，这在通用实现添加功能。

* [算法](/content/collections/algorithms.md) 描述的多态算法由JDK提供的集合操作。运气好的话，你永远不会再写自己的排序程序了！

* [自定义实现](/content/collections/custom-implementations.md) 告诉你为什么，你可能要编写自己的集合实现（而不是使用由JDK提供的通用实现之一），以及你如何去了解它。这很容易与JDK的抽象集合的实现！

* 互操作性 告诉你怎么兼容老旧的API集合，此外，它还告诉您如何设计新的API，以便与其他新API无缝互操作。

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

## 并发集合
多个线程使用的集合，称为并发编程。

接口：
BlockingQueue
TransferQueue
BlockingDeque
ConcurrentMap
ConcurrentNavigableMap

实现类：
LinkedBlockingQueue
ArrayBlockingQueue
PriorityBlockingQueue
DelayQueue
SynchronousQueue
LinkedBlockingDeque
LinkedTransferQueue
CopyOnWriteArrayList
CopyOnWriteArraySet
ConcurrentSkipListSet
ConcurrentHashMap
ConcurrentSkipListMap


> 笔记来自
> http://docs.oracle.com/javase/7/docs/technotes/guides/collections/overview.html



