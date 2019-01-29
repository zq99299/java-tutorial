# 死锁

**死锁**描述了两个或多个线程被永久阻塞的情况，等待彼此。

这是一个例子：Alphonse和Gaston是朋友，也是伟大的信徒。严格的礼貌规则是，当你向朋友鞠躬时，你必须保持鞠躬，直到你的朋友有机会返回弓。不幸的是，这个规则并没有说明两个朋友可能同时相互屈服的可能性。这个示例应用程序， Deadlock模拟这种可能性：

```java
public class Deadlock {
    static class Friend {
        private final String name;

        public Friend(String name) {
            this.name = name;
        }

        public String getName() {
            return this.name;
        }

        public synchronized void bow(Friend bower) {
            System.out.format("%s: %s"
                                      + "  向我鞠躬!%n",
                              this.name, bower.getName());
            bower.bowBack(this);
        }

        public synchronized void bowBack(Friend bower) {
            System.out.format("%s: %s"
                                      + " 向我回躬 to me!%n",
                              this.name, bower.getName());
        }
    }

    public static void main(String[] args) {
        final Friend alphonse =
                new Friend("Alphonse");
        final Friend gaston =
                new Friend("Gaston");
        new Thread(new Runnable() {
            public void run() {
                alphonse.bow(gaston);
            }
        }).start();
        new Thread(new Runnable() {
            public void run() {
                gaston.bow(alphonse);
            }
        }).start();
    }
}
```
它极有可能使两个线程将阻塞时，他们试图调用bowback。两块永远不会结束，因为每个线程都在等待bow的结束