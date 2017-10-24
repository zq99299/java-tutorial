# 内部类范例

要看到正在使用的内部类，首先考虑一个数组。在下面的示例中，创建一个数组，用整数值填充数组，然后按升序排列数组的均匀索引值。

* DataStructure 外部类，在构造函数中用连续的整数填充数组
* EvenIterator 内部类，实现了 DataStructureIterator 接口，它扩展了接口。迭代器用于遍历数据结构，通常具有测试最后一个元素的方法，检索当前元素，兵移动到下一个元素。
* main 方法 测试

```java
public class DataStructure {
    // 创建数组
    private final static int SIZE = 15;
    private int[] arrayOfInts = new int[SIZE];

    public DataStructure() {
        // 填充数组
        for (int i = 0; i < SIZE; i++) {
            arrayOfInts[i] = i;
        }
    }

    public void printEven() {

        // Print out values of even indices of the array
        DataStructureIterator iterator = this.new EvenIterator();
        while (iterator.hasNext()) {
            System.out.print(iterator.next() + " ");
        }
        System.out.println();
    }

    // 扩展一个自定义的　Iterator
    interface DataStructureIterator extends java.util.Iterator<Integer> {
    }

    private class EvenIterator implements DataStructureIterator {

        // 从头开始遍历数组
        private int nextIndex = 0;

        @Override
        public boolean hasNext() {

            // 检查当前元素是否是数组中的最后一个元素
            return (nextIndex <= SIZE - 1);
        }

        @Override
        public Integer next() {

            // 记录当前索引的值
            Integer retValue = Integer.valueOf(arrayOfInts[nextIndex]);

            // 获取下一个偶数元素
            nextIndex += 2;
            return retValue;
        }
    }

    public static void main(String s[]) {
        // 打印偶数项索引的值
        DataStructure ds = new DataStructure();
        ds.printEven();
    }
}
```

输出为

```java
0 2 4 6 8 10 12 14 
```

请注意，EvenIterator使用arrayOfInts方法引用DataStructure对象的实例变量。

您可以使用内部类来实现助手类，如本例中所示的类。要处理用户接口事件，您必须知道如何使用内部类，因为事件处理机制可以广泛使用它们。


## 本地和匿名类
还有两种类型的内部类。您可以在方法体内声明一个内部类。这些类被称为 _本地类_。您也可以在方法正文中声明一个内部类，而不必命名该类。这些类被称为 _匿名类_。

## 修饰符
您可以对外部类的其他成员使用内部类使用相同的修饰符。例如，您可以使用访问修饰符
private，public和protected限制对内部类的访问，就像使用它们来限制对其他类成员的访问一样。













