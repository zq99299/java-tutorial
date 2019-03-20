# 线程的定义和启动

创建 Thread 实例的应用程序必须提供将在该线程中运行的代码。有两种方法可以做到这一点：

提供一个`Runnable`对象。该 `Runnable` 接口定义了一个单一的 `run` 方法，
意味着包含在线程中执行的代码。该 `Runnable` 对象被传递给 `Thread` 构造函数，如 `HelloRunnable`示例所示：

```java
public class HelloRunnable implements Runnable {

    public void run() {
        System.out.println("Hello from a thread!");
    }

    public static void main(String args[]) {
        (new Thread(new HelloRunnable())).start();
    }

}
```

子类 `Thread`。在 `Thread` 类本身实现了 `Runnable`，虽然它的 `run` 方法不起作用。
应用程序可以子类化 `Thread`，提供自己的实现 `run`，如下 `HelloThread` 例所示：

```java
public class HelloThread extends Thread {

    public void run() {
        System.out.println("Hello from a thread!");
    }

    public static void main(String args[]) {
        (new HelloThread()).start();
    }

}
```

请注意，`Thread.start` 为了启动新线程，这两个例子都被调用。

你应该使用哪种方式？

* 使用 Runnable 对象的第一个方法更为通用，因为该 `Runnable` 对象可以对除其他类之外的类进行子类化 `Thread`。
* 第二种方法在简单应用程序中更容易使用，但受限于您的任务类必须是其 Thread 后代

本课重点介绍第一种方法，将 Runnable 任务与 Thread 执行任务的对象分开。这种方法不仅更加灵活，而且适用于以后涵盖的高级线程管理 API。

`Thread` 类定义了大量的线程管理有用的方法。这些包括 `static` 提供有关调用该方法的线程或影响状态的方法。
其他方法是从涉及管理线程和 `Thread` 对象的其他线程中调用的。我们将在以下部分中检查其中的一些方法。
