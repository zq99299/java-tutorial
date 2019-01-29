# 简单示例

以下示例汇集了本节的一些概念。 SimpleThreads由两个线程组成。第一个是每个Java应用程序的主线程。主线程从Runnable对象创建一个新的线程MessageLoop，并等待它完成。如果MessageLoop线程花费的时间太长，主线程就会中断它。

该MessageLoop线程打印出一系列消息。在打印所有消息之前中断，MessageLoop线程将打印一条消息并退出。
```java
public class SimpleThreads {

    // 打印当前线程日志，格式为：线程名: 消息
    static void threadMessage(String message) {
        String threadName =
                Thread.currentThread().getName();
        System.out.format("%s: %s%n",
                          threadName,
                          message);
    }

    private static class MessageLoop
            implements Runnable {
        public void run() {
            String importantInfo[] = {
                    "Mares eat oats",
                    "Does eat oats",
                    "Little lambs eat ivy",
                    "A kid will eat ivy too"
            };
            try {
                for (int i = 0;
                     i < importantInfo.length;
                     i++) {
                    // Pause for 4 seconds
                    Thread.sleep(4000);
                    // Print a message
                    threadMessage(importantInfo[i]);
                }
                threadMessage("消息打印完成，我即将结束");
            } catch (InterruptedException e) {
                threadMessage("我被中断了");
            }
        }
    }

    public static void main(String args[])
            throws InterruptedException {

        // 耐心 等待 1小时，默认时间
        long patience = 1000 * 60 * 60;

        // 为了测试效果，模拟命令行传参

        args = new String[]{"5"}; // 这里等待5秒钟，MessageLoop中是等待4秒发一次，也就是说。我们至少能看到一条信息
        // 如果是命令行传进来的参数，那么命令行传入的参数按单位 秒计算，最后转换成 毫秒
        if (args.length > 0) {
            try {
                patience = Long.parseLong(args[0]) * 1000;
            } catch (NumberFormatException e) {
                System.err.println("Argument must be an integer.");
                System.exit(1);
            }
        }

        threadMessage("启动 MessageLoop 线程");
        long startTime = System.currentTimeMillis();
        Thread t = new Thread(new MessageLoop());
        t.start();

        threadMessage("等待 MessageLoop 线程结束");
        // 无限循环直到 MessageLoop 线程结束
        // t.isAlive() : 测试线程是否处于活动状态。如果线程已经启动且尚未终止，则为活动状态。
        while (t.isAlive()) {
            threadMessage("Still waiting...");
            // 最多等待 MessageLoop 线程一秒的时间，如果还没有结束，当前线程继续执行
            // 这里只是类似 sleep的效果，1秒钟回来一次
            t.join(1000);
            // 注意这里：判断一共等待了多久，是否已经超过了等待时间
            if (((System.currentTimeMillis() - startTime) > patience)
                    && t.isAlive()) {
                threadMessage("Tired of waiting!");
                t.interrupt();
                // 发起中断请求后，应该等待该线程自行中断结束后，主线程才应该结束
                // 否则，此线程可能没有机会处理中断逻辑
                t.join();
            }
        }
        threadMessage("Finally!");
    }
}
```