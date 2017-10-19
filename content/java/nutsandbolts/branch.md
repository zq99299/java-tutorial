# 分支语句

## break 语句

break语句有两种形式：标记和未标记。在之前的switch语句讨论中，您看到了未标记的形式。您还可以使用未标记的break终止for，while或do-while循环，如下面的 BreakDemo程序：

···java
class BreakDemo {
    public static void main(String[] args) {

        int[] arrayOfInts = 
            { 32, 87, 3, 589,
              12, 1076, 2000,
              8, 622, 127 };
        int searchfor = 12;

        int i;
        boolean foundIt = false;

        for (i = 0; i < arrayOfInts.length; i++) {
            if (arrayOfInts[i] == searchfor) {
                foundIt = true;
                break;
            }
        }

        if (foundIt) {
            System.out.println("Found " + searchfor + " at index " + i);
        } else {
            System.out.println(searchfor + " not in the array");
        }
    }
}
···

该程序搜索数组中的数字12。for当找到该值时终止循环。控制流程然后在for循环后传输到语句。该程序的输出是：

```java
Found 12 at index 4
```