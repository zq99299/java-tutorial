# 锁对象
同步代码依赖于一种简单的可重入锁。这种锁很容易使用，但有很多限制。`java.util.concurrent.locks` 软件包支持更复杂的锁 。
我们不会详细检查这个包，而是将重点放在其最基本的接口上 [Lock](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/locks/Lock.html)。

Lock 对象非常像同步代码使用的隐式锁。与隐式锁一样，一个线程只能拥有一个 Lock 对象。
Lock 对象还通过其关联的 Condition 对象来支持 wait/notify 机制 。

Lock 最大优点是他们有能力尝试获取锁的时候退出。`tryLock` 如果锁不能立即或在超时到期之前（如果指定）），
该方法将退出。如果另一个线程在获取锁之前发送中断 lockInterruptibly，该方法将退出。

下例使用 lock 来解决 [死锁中鞠躬的列子](./deadlock.md)。 该示例是假设这两个人互相鞠躬，鞠躬一次，必须回躬一次。且还不能死锁。

```java
public class Safelock {
    static class Friend {
        private final String name;
        private final Lock lock = new ReentrantLock();

        public Friend(String name) {
            this.name = name;
        }

        public String getName() {
            return this.name;
        }

        public boolean impendingBow(Friend bower) {
            Boolean myLock = false;
            Boolean yourLock = false;
            try {
                // 尝试获取锁，如果未能获取锁，则返回false
                myLock = lock.tryLock();
                yourLock = bower.lock.tryLock();
            } finally {
                if (!(myLock && yourLock)) {
                    if (myLock) {
                        lock.unlock();
                    }
                    if (yourLock) {
                        bower.lock.unlock();
                    }
                }
            }
            // 如果两个都没有鞠躬
            return myLock && yourLock;
        }

        /**
         * 鞠躬
         * @param bower 向我鞠躬的人
         */
        public void bow(Friend bower) {
            if (impendingBow(bower)) {
                try {
                    System.out.format("%s: %s 开始向我鞠躬!，该%s向%s回躬了%n",
                                      this.name, bower.getName(),this.name,bower.getName());
                    bower.bowBack(this);
                } finally {
                    lock.unlock();
                    bower.lock.unlock();
                }
            } else {
                 // 这里是其中一个在鞠躬的动作就取消鞠躬，静静的看着对方就好了
//                System.out.format("%s: %s 开始向我鞠躬，但看到我开始向他鞠躬%n",
//                                  this.name, bower.getName());
            }
        }

        /**
         * 回躬
         * @param bower 像我回躬的人
         */
        public void bowBack(Friend bower) {
            System.out.format("%s: %s 已向我回躬!%n",
                              this.name, bower.getName());
        }
    }

    static class BowLoop implements Runnable {
        private Friend bower;
        private Friend bowee;

        public BowLoop(Friend bower, Friend bowee) {
            this.bower = bower;
            this.bowee = bowee;
        }

        public void run() {
            Random random = new Random();
            for (; ; ) {
                try {
                    Thread.sleep(random.nextInt(10));
                } catch (InterruptedException e) {
                }
                bowee.bow(bower);
            }
        }
    }


    public static void main(String[] args) {
        final Friend alphonse =
                new Friend("Alphonse");
        final Friend gaston =
                new Friend("Gaston");
        new Thread(new BowLoop(alphonse, gaston)).start();
        new Thread(new BowLoop(gaston, alphonse)).start();
    }
}

```

其中一部分的输出
```java
Alphonse: Gaston 开始向我鞠躬!，该Alphonse向Gaston回躬了
Gaston: Alphonse 已向我回躬!
Gaston: Alphonse 开始向我鞠躬!，该Gaston向Alphonse回躬了
Alphonse: Gaston 已向我回躬!
Gaston: Alphonse 开始向我鞠躬!，该Gaston向Alphonse回躬了
```
