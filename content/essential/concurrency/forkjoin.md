# ForkJoin
Fork/Join框架的实现`ExecutorService`，帮助您充分利用多个处理器。它的设计工作可以分解为更小任务递归。目标是使用所有可用的处理能力来提高应用程序的性能。

与任何实现`ExecutorService`一样，`fork / join`框架将任务分配到线程池中的工作线程。`fork / join`框架是不同的，因为它使用**工作窃取算法**。工作线程无法完成的事情可能会从仍然忙碌的其他线程窃取任务。
`fork / join`框架的中心是 `ForkJoinPool`类，该类的扩展`AbstractExecutorService`。`ForkJoinPool`核心实现是工作窃取算法，可以执行 `ForkJoinTask`流程。

## 基本使用

使用fork / join框架的第一步是编写执行工作段的代码。您的代码应类似于以下伪代码：
```java
if(我的工作足够小){
    直接做工作
}else{
    把我的工作分成两部分
    调用并等待结果
}
```

将这个代码包含在一个`ForkJoinTask`子类中，通常使用一个更专业的类型`RecursiveTask`（可以返回一个结果）或 `RecursiveAction`。

在您的`ForkJoinTask`子类准备好之后，创建表示所有要完成的工作的对象，并将其传递给`ForkJoinPool`实例的`invoke()`方法。

## 模糊图形例子
为了帮助您了解fork / join框架的工作原理，请考虑以下示例。假设你想模糊图像。原始源图像是由整数的数组，其中每个整数包含用于单个像素的颜色值来表示。目标图像模糊也用与源的大小相同的整数数组表示。

通过一次处理一个像素的源数组来实现模糊。每个像素的周围像素（红色，绿色和蓝色分量被平均）进行平均，并将结果放在目标数组中。由于图像是一个大阵列，这个过程可能需要很长时间。您可以通过使用fork / join框架实现算法来利用多处理器系统上的并发处理。这是一个可能的实现：

1. 来看这部分代码。
```java
public class ForkBlur extends RecursiveAction {
    private int[] mSource;
    private int mStart;
    private int mLength;
    private int[] mDestination;

    //  处理大小，应该是奇数
    private int mBlurWidth = 15;

    /**
     * @param src    源
     * @param start  开始处理索引
     * @param length 处理个数
     * @param dst    目标承载
     */
    public ForkBlur(int[] src, int start, int length, int[] dst) {
        mSource = src;
        mStart = start;
        mLength = length;
        mDestination = dst;
    }
        /**
     * 计算平均值和填充目标值的逻辑，如果看不懂可以不必深究
     */
    protected void computeDirectly() {
        int sidePixels = (mBlurWidth - 1) / 2;
        for (int index = mStart; index < mStart + mLength; index++) {
            // 计算平均值
            float rt = 0, gt = 0, bt = 0;
            for (int mi = -sidePixels; mi <= sidePixels; mi++) {
                int mindex = Math.min(Math.max(mi + index, 0),
                                      mSource.length - 1);
                int pixel = mSource[mindex];
                rt += (float) ((pixel & 0x00ff0000) >> 16)
                        / mBlurWidth;
                gt += (float) ((pixel & 0x0000ff00) >> 8)
                        / mBlurWidth;
                bt += (float) ((pixel & 0x000000ff) >> 0)
                        / mBlurWidth;
            }

            // 重组目标像素
            int dpixel = (0xff000000) |
                    (((int) rt) << 16) |
                    (((int) gt) << 8) |
                    (((int) bt) << 0);
            mDestination[index] = dpixel;
        }
    }
...    
```
2. 使用fork / join框架必须实现的一个方法，在这里进行任务的拆分

```java
    protected static int sThreshold = 100000;

    /**
     * 现在您实现了抽象compute()方法，它可以直接执行模糊，也可以将其分成两个较小的任务。
     * 简单的数组长度阈值有助于确定工作是执行还是拆分。
     */
    @Override
    protected void compute() {
        // 如果当前处理的个数小于 定义的 100000 个，那么就直接计算
        if (mLength < sThreshold) {
            computeDirectly();
            return;
        }

        // 否则进行拆分成2个任务
        int split = mLength / 2;

        // 第一个任务处理：前一半的工作
        // 第二个任务处理：剩下的工作
        invokeAll(new ForkBlur(mSource, mStart, split, mDestination),
                  new ForkBlur(mSource, mStart + split, mLength - split,
                               mDestination));
    }
```

3. 启动这个任务

1. 创建实例
    ```java
    ForkBlur fb = new ForkBlur(src, 0, src.length, dst);
    Create the ForkJoinPool that will run the task.
    ```
ForkJoinPool pool = new ForkJoinPool();
Run the task.

pool.invoke(fb);