## 实现总结
实现是用于存储集合的数据对象，实现接口课程中描述的 接口。

Java 集合框架提供了几个通用的核心接口实现：

* 对于 Set 接口，HashSet 是最常用的实现。
* 对于 List 接口，ArrayList 是最常用的实现。
* 对于 Map 接口，HashMap 是最常用的实现。
* 对于 Queue 接口，LinkedList 是最常用的实现。
* 对于 Deque 接口，ArrayDeque 是最常用的实现。

每个通用实现提供其接口中包含的所有可选操作。

Java Collections Framework 还为需要非标准性能，使用限制或其他异常行为的情况提供了多种专用实现。

该 java.util.concurrent 包包含几个集合实现，它们是线程安全的，但不受单个排除锁管理。

Collections 类（相对于所述 Collection 接口）规定，或返回集合，这是已知的包装实施方式操作的静态方法。

最后，有几个 Convenience 实现，当你不需要他们的全部功能时，它可以比通用实现更有效。方便实现通过静态工厂方法提供。
