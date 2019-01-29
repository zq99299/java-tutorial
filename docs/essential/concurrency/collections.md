# 并发集合
`java.util.concurrent`软件包包含许多`Java Collections Framework`的补充。这些都通过提供接口容易分类：

* BlockingQueue
   定义当您尝试添加到完整队列或从空队列中检索时，先入先出的数据结构将阻止或超时。
* ConcurrentMap 
   是 `java.util.Map`定义有用的原子操作的子接口。这些操作仅在键存在时才删除或替换键值对，或者仅在键不存在时才添加键值对。使这些操作成为原子有助于避免同步。`ConcurrentMap`标准的通用实现是 `ConcurrentHashMap`，它是一个并行模拟的`HashMap`。 
   
* ConcurrentNavigableMap
   是`ConcurrentMap`支持近似匹配的子接口。`ConcurrentNavigableMap`标准的通用实现是 `ConcurrentSkipListMap`，它是一个并行模拟的 `TreeMap`。  
   
所有这些集合都可以通过在将对象添加到集合的操作与后续的访问或删除该对象的操作之间定义一个` happens-before `的关系来帮助避免内存一致性错误。

!其实看完这里 我并不清楚 ConcurrentMap 为什么就能做到并发？什么场景下能验证？有什么效果？