# 组合示例

前面分别描述了 try，catch和finally代码块，现在来看看前面的例子，并分析可能发生的情况

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
        PrintWriter out = null;

        try {
            System.out.println("Entering" + " try statement");

            out = new PrintWriter(new FileWriter("OutFile.txt"));
            for (int i = 0; i < SIZE; i++) {
                out.println("Value at: " + i + " = " + list.get(i));
            }
        } catch (IndexOutOfBoundsException e) {
            System.err.println("Caught IndexOutOfBoundsException: "
                                       + e.getMessage());

        } catch (IOException e) {
            System.err.println("Caught IOException: " + e.getMessage());

        } finally {
            if (out != null) {
                System.out.println("Closing PrintWriter");
                out.close();
            } else {
                System.out.println("PrintWriter not open");
            }
        }
    }
}
```

1. new FileWriter语句失败并引发IOException。
   
     这个异常有很多种可能，如不能创建或不能写入指定文件
2. list.get(i)语句失败并引发IndexOutOfBoundsException。
3. 一切成功，try块正常退出。