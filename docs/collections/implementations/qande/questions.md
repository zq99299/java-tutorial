# 问题和练习

## 问题
1. 您打算编写使用几个基本集合接口的程序：Set，List，Queue，和 Map。您不确定哪个实现最好，
所以您决定使用通用实现，直到您更好地了解您的程序如何在现实世界中运行。这些是哪些实现？

    答：

    - Set：HashSet
    - List：ArrayList
    - Queue：LinkedList
    - Map：HashMap

2. 如果你需要一个 Set 提供有序迭代的实现，你应该使用哪个类？

    答：TreeSet 保证排序后的集合按照元素顺序升序排列，按照元素的自然顺序或 Comparator 提供的顺序排序。

3. 您使用哪个类来访问包装器实现？
    答：您使用的 Collections 是提供对集合进行操作或返回集合的静态方法的类。

## 练习

写一个程序，读取由第一个命令行参数指定的文本文件到一个 List。然后程序应该从文件中打印出随机的行，
打印的行数由第二个命令行参数指定。编写程序，以便一次分配正确大小的集合，而不是在读入文件时逐渐扩展。
提示：要确定文件中的行数，使用 java.io.File.length 获取文件的大小，然后除以平均线的假定大小。

答：由于要随机访问，所以我们使用 ArrayList。通过文件大小除以 50 来估计，然后翻倍

```java
import java.util.*;
import java.io.*;

public class FileList {
    public static void main(String[] args) {
        final int assumedLineLength = 50;
        File file = new File(args[0]);
        List<String> fileList =
            new ArrayList<String>((int)(file.length() / assumedLineLength) * 2);
        BufferedReader reader = null;
        int lineCount = 0;
        try {
            reader = new BufferedReader(new FileReader(file));
            for (String line = reader.readLine(); line != null;
                    line = reader.readLine()) {
                fileList.add(line);
                lineCount++;
            }
        } catch (IOException e) {
            System.err.format("Could not read %s: %s%n", file, e);
            System.exit(1);
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {}
            }
        }
        int repeats = Integer.parseInt(args[1]);
        Random random = new Random();
        for (int i = 0; i < repeats; i++) {
            System.out.format("%d: %s%n", i,
                    fileList.get(random.nextInt(lineCount - 1)));
        }
    }
}
```

这个程序实际上大部分时间是在文件中读取的，所以预先分配 ArrayList 对它的性能影响不大。
当您的程序重复创建大型 ArrayList 对象而不介入 I / O  时，提前指定初始容量更有用。
