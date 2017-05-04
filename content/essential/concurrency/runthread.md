# 线程的定义和启动

创建实例的应用程序Thread必须提供将在该线程中运行的代码。有两种方法可以做到这一点：

* 提供一个`Runnable`对象。该 `Runnable`接口定义了一个单一的方法，`run`意味着包含在线程中执行的代码。该`Runnable`对象被传递给`Thread`构造函数，如 `HelloRunnable`示例所示：

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

* 子类`Thread`。在`Thread`类本身实现了`Runnable`，虽然它的`run`方法不起作用。应用程序可以子类化`Thread`，提供自己的实现`run`，如下 `HelloThread`例所示：

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
