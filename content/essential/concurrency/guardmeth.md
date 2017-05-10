# 守护块
线程通常必须协调他们的行动。最常见的协调语法是守护块。这样的块通过轮询可以继续之前必须为真的条件开始。为了正确执行，需要遵循以下步骤。

假设，例如一个方法guardedJoy，直到一个共享变量joy已被另一个线程设置，才能进行。在理论上，这种方法可以简单地循环，直到条件得到满足，但是循环是浪费的，因为它在等待时连续执行。

```java
public void guardedJoy() {
    // 简单的轮询保护，浪费时间，不要这样做
    while(!joy) {}
    System.out.println("Joy has been achieved!");
}
```

一个更高效的保护调用 `Object.wait`来暂停当前线程。调用wait不会返回，直到另一个线程发出一个可能发生某些特殊事件的通知 - 虽然不一定是此线程正在等待的事件：
```java
public synchronized void guardedJoy() {
    // 这个守护块只能针对每个特殊事件的循环一次，这可能不会是我们正在等待的事件
    while(!joy) {
        try {
            wait();
        } catch (InterruptedException e) {}
    }
    System.out.println("Joy and efficiency have been achieved!");
}
```

注意：`wait`使用在一个循环中，不要假定中断事件是针对你正在等待的特定条件。一定要条件为真才能中断

像许多暂停执行的方法一样，`wait`可以抛出`InterruptedException`。在这个例子中，我们可以忽略这个异常 - 我们只关心这个值joy。

为什么这个版本是`guardedJoy`同步的？假设d是我们用来调用的对象`wait`。当一个线程调用`d.wait`时，它必须拥有固有的锁d- 否则会抛出一个错误。调用synchronized方法的wait是获取内部锁的简单方法。

当`wait`被调用时，线程释放锁，并暂停执行。在将来的某个时间，另一个线程将获取相同的锁并调用 `Object.notifyAll`，通知所有等待该锁的线程发生了一些重要的事情：
```java
public synchronized notifyJoy() {
    joy = true;
    notifyAll();
}
```

在第二个线程释放锁时，第一个线程会重新获得锁的调用返回等待
```java
public class Test {
    @org.junit.Test
    public void test1() throws InterruptedException {
        final Test test = new Test();

        final Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                test.guardedJoy();
            }
        });
        thread.start();

        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    TimeUnit.SECONDS.sleep(3);
                    test.notifyJoy();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();


        thread.join();
    }

    private boolean joy = false;

    public void setJoy(boolean joy) {
        this.joy = joy;
    }

    public synchronized void guardedJoy() {
// 这个守护块只能针对每个特殊事件的循环一次，这可能不会是我们正在等待的事件
        while (!joy) {
            try {
                wait();
            } catch (InterruptedException e) {
            }
        }
        System.out.println("Joy and efficiency have been achieved!");
    }

    public synchronized void notifyJoy() {
        this.joy = true;
        notifyAll();
    }
}
```
如上面这个例子；在test对象中有两个synchronized方法。在外面定义了两个线程，如果`guardedJoy`的`wait`方法不释放锁的话，那么该示例就称为了死锁。

注意：还有一个通知方法`notify`，它唤醒一个线程。因为`notify`不允许你指定被唤醒的线程，所以它只在大规模并行应用程序中是有用的 - 也就是说，具有大量线程的程序，都做类似的事情。在这样的应用程序中，你不在乎哪个线程被唤醒。

让我们使用守护块来创建一个`Producer-Consumer`应用程序。这种应用程序在两个线程之间共享数据：创建数据的生产者和与之相关的消费者。两个线程使用共享对象进行通信。协调是至关重要的：消费者线程不得在生产者线程传递之前尝试检索数据，如果消费者没有检索到旧数据，生产者线程不得尝试传递新数据。

在此示例中，数据是一系列文本消息，它们通过以下类型的对象共享 Drop：
```java
public class Drop {
    // 生产的消息
    private String message;
    // 如果为true则消费者应该等待
    private boolean empty = true;

    public synchronized String take() {
        // 等待消息直到可用
        while (empty) {
            try {
                wait();
            } catch (InterruptedException e) {}
        }
        // 切换状态
        empty = true;
        // 通知生产者，该消息已经消费
        notifyAll();
        return message;
    }

    public synchronized void put(String message) {
        // 等待消息已经被消费
        while (!empty) {
            try {
                wait();
            } catch (InterruptedException e) {}
        }
        empty = false;
        // 存储消息
        this.message = message;
        // 通知消费者状态已改变
        notifyAll();
    }
}
```

定义的生产者线程 Producer发送一系列熟悉的消息。字符串“DONE”表示已发送所有消息。为了模拟现实世界应用程序的不可预测性质，生产者线程在消息之间暂停随机间隔。

```java
public class Producer implements Runnable {
    private Drop drop;

    public Producer(Drop drop) {
        this.drop = drop;
    }

    @Override
    public void run() {
        String importantInfo[] = {
                "Mares eat oats",
                "Does eat oats",
                "Little lambs eat ivy",
                "A kid will eat ivy too"
        };
        Random random = new Random();

        for (int i = 0;
             i < importantInfo.length;
             i++) {
            drop.put(importantInfo[i]);
            try {
                Thread.sleep(random.nextInt(5000));
            } catch (InterruptedException e) {
            }
        }
        drop.put("DONE");
    }
}
```


消费者线程，定义在 Consumer，只是检索消息并打印出来，直到它检索“DONE”字符串。这个线程也会随机停顿。
```java
public class Consumer implements Runnable {
    private Drop drop;

    public Consumer(Drop drop) {
        this.drop = drop;
    }

    @Override
    public void run() {
        Random random = new Random();
        for (String message = drop.take();
             !message.equals("DONE");
             message = drop.take()) {
            System.out.format("MESSAGE RECEIVED: %s%n", message);
            try {
                Thread.sleep(random.nextInt(5000));
            } catch (InterruptedException e) {
            }
        }
    }
}
```

注意：该Drop课程是为了展示守卫的块而编写的。为避免重新创建轮子，请在尝试编写自己的数据共享对象之前，先检查[Java Collections Framework](/content/collections/README.md)中的现有数据结构 。有关更多信息，请参阅问题和练习部分。