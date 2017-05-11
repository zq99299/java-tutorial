# 锁对象
同步代码依赖于一种简单的可重入锁。这种锁很容易使用，但有很多限制。`java.util.concurrent.locks`软件包支持更复杂的锁 。我们不会详细检查这个包，而是将重点放在其最基本的接口上 [Lock](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/locks/Lock.html)。

Lock对象非常像同步代码使用的隐式锁。与隐式锁一样，一个线程只能拥有一个Lock对象。Lock对象还通过其关联的Condition对象来支持wait/notify机制 。

Lock最大优点是他们有能力退出获取锁的尝试。`tryLock`如果锁不能立即或在超时到期之前（如果指定）），该方法将退出。如果另一个线程在获取锁之前发送中断lockInterruptibly，该方法将退出。（这一段没有看明白是什么意思，翻译不通顺）

下例使用lock来解决 [Liveness.](/content/essential/concurrency/liveness.md)

```java

```