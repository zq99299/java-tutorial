# 问题和练习

1. 以下代码怎么修改才能让主线程中的message始终都赋值成功,且打印出来？

```java
public class BadThreads {

    static String message;

    private static class CorrectorThread
        extends Thread {

        public void run() {
            try {
                sleep(1000); 
            } catch (InterruptedException e) {}
            // Key statement 1:
            message = "Mares do eat oats."; 
        }
    }

    public static void main(String args[])
        throws InterruptedException {

        (new CorrectorThread()).start();
        message = "Mares do not eat oats.";
        Thread.sleep(2000);
        // Key statement 2:
        System.out.println(message);
    }
}
```



2. 修改 [守护块](/content/essential/concurrency/guardmeth.md) 中的生产者 - 消费者示例，以使用标准库类而不是 `Drop` 类

