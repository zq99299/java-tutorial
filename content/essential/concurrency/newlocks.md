# 锁对象
同步代码依赖于一种简单的可重入锁。这种锁很容易使用，但有很多限制。`java.util.concurrent.locks`软件包支持更复杂的锁 。我们不会详细检查这个包，而是将重点放在其最基本的接口上 [Lock](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/locks/Lock.html)。