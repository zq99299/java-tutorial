# 问题和练习的答案：并发

## 问题
1. 你可以传递一个Thread对象Executor.execute吗？这样的调用是否有意义？

    `Thread` 实现了Runnable接口，这样你就可以通过Executor.execute执行`Thread`实例。但是，以`Thread`这种方式使用对象是没有意义的。如果对象直接实例化`Thread`，其run方法不执行任何操作。您可以继承`Thread`并重写`run`方法定义一个子类，但是这样一个类将实现执行器不会使用的功能。
    
## 练习
1. 以下代码怎么修改才能让主线程中的message始终都赋值成功,且打印出来？


    
