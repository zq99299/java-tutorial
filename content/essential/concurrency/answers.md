# 问题和练习的答案：并发

## 问题
1. 你可以传递一个Thread对象Executor.execute吗？这样的调用是否有意义？

    `Thread` 实现了Runnable接口，这样你就可以通过Executor.execute执行`Thread`实例。但是，以`Thread`这种方式使用对象是没有意义的。如果对象直接实例化`Thread`，其run方法不执行任何操作。您可以继承`Thread`并重写`run`方法定义一个子类，但是这样一个类将实现执行器不会使用的功能。
    
## 练习
1. 以下代码怎么修改才能让主线程中的message始终都赋值成功,且打印出来？是否可以调整两个`sleep`的参数？如何保证始终都有效？

    解决方案：
    程序几乎总是打印："Mares do eat oats." 但是这个结果并不能保证，因为 两个修改语句之间没有发生关系。有两种方法可以保证：
    
    1. 在主线程中，保留对CorrectorThread实例的引用。然后join
    ```java
        CorrectorThread correctorThread = new CorrectorThread();
        correctorThread.start();
        correctorThread.join();
        message = "Mares do not eat oats.";
        System.out.println(message);
    ```
    2. 封装message在具有同步方法的对象中。message除了通过这些方法外，不要参考。
    
    这两种技术都建立了`happens-before`的关系，使得message可见的变化。
    
    第三种技术是简单地声明message为volatile。它们可能会顺序发生，但是由于调度的不确定性和未知的粒度sleep，这是不能保证的。
    
    改变两个sleep调用的参数也没有帮助，因为这并不能保证在关系之前发生。


    
