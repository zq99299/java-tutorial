# 捕获和处理异常

本节将介绍如何使用这三个异常处理部件- `try`，`catch`和`finally`块-写一个异常处理程序。然后使用 JDK7提供的新特性 ` try-with-resources`语句来自动关闭资源.这个语句特别适合用于实现了Closeable的对象，比如流。

本节最后通过一个示例来分析发生在各种场景下的情况。

以下示例：在构造函数中初始化10个数字，并拥有一个`writeList`方法，用于将数字列表写入“OutFile.txt”文件中
```java
public class ListOfNumbers {
    private List<Integer> list;
    private static final int SIZE = 10;

    public ListOfNumbers() {
        list = new ArrayList<Integer>(SIZE);
        for (int i = 0; i < SIZE; i++) {
            list.add(new Integer(i));
        }
    }

    public void writeList() {
        // The FileWriter constructor throws IOException, which must be caught.
        PrintWriter out = new PrintWriter(new FileWriter("OutFile.txt"));

        for (int i = 0; i < SIZE; i++) {
            // The get(int) method throws IndexOutOfBoundsException, which must be caught.
            out.println("Value at: " + i + " = " + list.get(i));
        }
        out.close();
    }
}
```

！现在没有人会用记事本写代码了把。直接用ide打开
可以看到PrintWriter提示需要捕获异常，是因为这抛出的是一个检查异常。
而`list.get(i)`并没有提示，是因为它抛出的是一个 非检查异常

现在你已经熟悉了该类，并且可以在其中抛出异常，你可以编写异常处理程序来捕获和处理这些异常。