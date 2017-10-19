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

未标记的break语句终止最内层switch，for，while，或do-while语句，但标记的break终止一个外部语句。以下程序 BreakWithLabelDemo与上一个程序类似，但使用嵌套for循环来搜索二维数组中的值。当找到该值时，标记break终止外部for循环（标记为“search”）：

```java
class BreakWithLabelDemo {
    public static void main(String[] args) {

        int[][] arrayOfInts = { 
            { 32, 87, 3, 589 },
            { 12, 1076, 2000, 8 },
            { 622, 127, 77, 955 }
        };
        int searchfor = 12;

        int i;
        int j = 0;
        boolean foundIt = false;

    search:
        for (i = 0; i < arrayOfInts.length; i++) {
            for (j = 0; j < arrayOfInts[i].length;
                 j++) {
                if (arrayOfInts[i][j] == searchfor) {
                    foundIt = true;
                    break search;
                }
            }
        }

        if (foundIt) {
            System.out.println("Found " + searchfor + " at " + i + ", " + j);
        } else {
            System.out.println(searchfor + " not in the array");
        }
    }
}
```
程序输出：

```java
Found 12 at 1, 0
```

该break声明终止标签语句; 它不会将控制流转移到标签上。控制流被传递到标签（终止）语句之后的语句。

## continue

continue 语句跳过的当前迭代for，while或do-while循环。未标记的跳到最内层循环的结尾，并评估boolean控制循环的表达式， ContinueDemo逐步执行String，计算字母“p”的出现。如果当前字符不是p，则该continue语句跳过循环的其余部分，并转到下一个字符。如果是 “p”，程序会增加字母数。

```java

class ContinueDemo {
    public static void main(String[] args) {

        String searchMe = "peter piper picked a " + "peck of pickled peppers";
        int max = searchMe.length();
        int numPs = 0;

        for (int i = 0; i < max; i++) {
            // interested only in p's
            if (searchMe.charAt(i) != 'p')
                continue;

            // process p's
            numPs++;
        }
        System.out.println("Found " + numPs + " p's in the string.");
    }
}
```

程序输出

```java
Found 9 p's in the string.
```
