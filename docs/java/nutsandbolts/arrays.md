# 数组

一个数组是保持单一类型的值的固定数目的容器对象。创建数组时，建立数组的长度。创建后，其长度是固定的。本节将更详细地讨论数组

![](./assets/objects-tenElementArray.gif)

数组中的每个项目称为元素，每个元素都由其数字索引访问。如上图所示，编号从0开始。例如，第9个元素将在索引8处被访问。

以下程序， ArrayDemo创建一个整数数组，在数组中放置一些值，并将每个值打印到标准输出。
```java
class ArrayDemo {
    public static void main(String[] args) {
        // declares an array of integers
        int[] anArray;

        // allocates memory for 10 integers
        anArray = new int[10];

        // initialize first element
        anArray[0] = 100;
        // initialize second element
        anArray[1] = 200;
        // and so forth
        anArray[2] = 300;
        anArray[3] = 400;
        anArray[4] = 500;
        anArray[5] = 600;
        anArray[6] = 700;
        anArray[7] = 800;
        anArray[8] = 900;
        anArray[9] = 1000;

        System.out.println("Element at index 0: "
                           + anArray[0]);
        System.out.println("Element at index 1: "
                           + anArray[1]);
        System.out.println("Element at index 2: "
                           + anArray[2]);
        System.out.println("Element at index 3: "
                           + anArray[3]);
        System.out.println("Element at index 4: "
                           + anArray[4]);
        System.out.println("Element at index 5: "
                           + anArray[5]);
        System.out.println("Element at index 6: "
                           + anArray[6]);
        System.out.println("Element at index 7: "
                           + anArray[7]);
        System.out.println("Element at index 8: "
                           + anArray[8]);
        System.out.println("Element at index 9: "
                           + anArray[9]);
    }
}
```
这是输出
```java
Element at index 0: 100
Element at index 1: 200
Element at index 2: 300
Element at index 3: 400
Element at index 4: 500
Element at index 5: 600
Element at index 6: 700
Element at index 7: 800
Element at index 8: 900
Element at index 9: 1000
```

在现实世界的编程情境中，您可能会使用一个受支持的循环结构来迭代数组的每个元素，而不是像前面的例子一样单独写入每一行。但是，该示例清楚地说明了阵列语法。您将在控制流部分了解各种循环结构（for，while，和do-while） 。


## 声明一个变量来引用数组

上面的程序使用以下代码声明一个数组（命名）
```java
int [] anArray;
```
与其他类型的变量一样，数组声明有两个组件：数组的类型和数组的名称。数组的类型写成type[]，其中type包含的元素的数据类型在哪里; 括号是表示该变量保存数组的特殊符号.数组的大小不是其类型的一部分（这就是为什么括号为空）。数组的名称可以是任何您想要的名称，前提是它遵循以前在[命名](/content/java/nutsandbolts/variables.md)部分中讨论的规则和约定 。与其他类型的变量一样，声明实际上并不创建数组; 它只是告诉编译器，该变量将保存指定类型的数组。

类似地，您可以声明其他类型的数组：
```java
byte[] anArrayOfBytes;
short[] anArrayOfShorts;
long[] anArrayOfLongs;
float[] anArrayOfFloats;
double[] anArrayOfDoubles;
boolean[] anArrayOfBooleans;
char[] anArrayOfChars;
String[] anArrayOfStrings;
```

您也可以在数组名称后放置括号：
```java
//这个表格是不鼓励的
float anArrayOfFloats [];
```

然而，不鼓励这种形式; 括号标识数组类型，并应显示类型名称。

## 创建，初始化和访问数组
建数组的一种方式是使用new操作符。程序中的下一个语句ArrayDemo为10个整数元素分配一个具有足够内存的数组，并将数组分配给该anArray变量。
```java
//创建一个整数数组
anArray = new int [10];
```
```java
如果缺少此语句，则编译器会打印如下所示的错误，编译失败：

ArrayDemo.java:4：变量anArray可能尚未初始化。
```
接下来的几行将值分配给数组的每个元素：
```java
anArray[0] = 100; // initialize first element
anArray[1] = 200; // initialize second element
anArray[2] = 300; // and so forth
```
每个数组元素都由其数字索引访问：
```java
System.out.println("Element 1 at index 0: " + anArray[0]);
System.out.println("Element 2 at index 1: " + anArray[1]);
System.out.println("Element 3 at index 2: " + anArray[2]);
```

或者，您可以使用快捷方式语法来创建和初始化数组：
```java
int[] anArray = {
    100, 200, 300,
    400, 500, 600,
    700, 800, 900, 1000
};
```
这里，数组的长度由大括号之间提供的值的数量确定，并用逗号分隔。

您还可以通过使用两个或多个括号来声明数组数组（也称为多维数组）例如,String[][] names。因此，每个元素都必须由相应数量的索引值访问。
在Java编程语言中，多维数组是一个数组，其组件本身就是数组。这与C或Fortran中的数组不同。这样做的结果是允许行的长度变化，如以下MultiDimArrayDemo程序所示 ：
```java
class MultiDimArrayDemo {
    public static void main(String[] args) {
        String[][] names = {
            {"Mr. ", "Mrs. ", "Ms. "},
            {"Smith", "Jones"}
        };
        // Mr. Smith
        System.out.println(names[0][0] + names[1][0]);
        // Ms. Jones
        System.out.println(names[0][2] + names[1][1]);
    }
}
```
输出
```java
Mr. Smith
Ms. Jones
```
最后，您可以使用内置length属性来确定任何数组的大小。以下代码将数组的大小打印到标准输出：
```java
 System.out.println（anArray.length）;
 ```

 ## 复制数组

 System类有一个arraycopy，可以使用有效地将数据从一个数组复制到另一个的方法：
```java
public static void arraycopy(Object src, int srcPos,
                             Object dest, int destPos, int length)
```
这两个Object参数指定了从源数组复制到目标数组中，三个int参数指定源数组中的起始位置，目标数组中的起始位置和要复制的数组元素的数量。

以下程序， ArrayCopyDemo声明一系列char元素，拼写“decaffeinated”一词。它使用`System.arraycopy`方法将数组的子序列复制到第二个数组中：
```java
class ArrayCopyDemo {
    public static void main(String[] args) {
        char[] copyFrom = { 'd', 'e', 'c', 'a', 'f', 'f', 'e',
			    'i', 'n', 'a', 't', 'e', 'd' };
        char[] copyTo = new char[7];

        System.arraycopy(copyFrom, 2, copyTo, 0, 7);
        System.out.println(new String(copyTo));
    }
}
```
该程序的输出是：
```java
caffein
```

## 数组操作

数组是编程中使用的强大而有用的概念。Java SE提供了执行与数组相关的一些最常见操作的方法。例如， ArrayCopyDemo示例使用System类的arraycopy方法，而不是手动迭代源数组的元素，

为了方便起见，Java SE提供了几种在`java.util.Arrays`类中执行数组操作（常见任务，如复制，排序和搜索数组）的方法 。例如，可以将前面的示例修改为使用`java.util.Arrays`类的copyOfRange方法.，如您在ArrayCopyOfDemo示例中可以看到的 。不同之处在于，使用该copyOfRange方法不需要在调用方法之前创建目标数组，因为方法返回了目标数组：
```java
class ArrayCopyOfDemo {
    public static void main(String[] args) {

        char[] copyFrom = {'d', 'e', 'c', 'a', 'f', 'f', 'e',
            'i', 'n', 'a', 't', 'e', 'd'};

        char[] copyTo = java.util.Arrays.copyOfRange(copyFrom, 2, 9);

        System.out.println(new String(copyTo));
    }
}
```
如您所见，该程序的输出也是`caffein`,尽管它需要较少的代码。需要注意的是第二个参数和第三个参数，标识要复制的范围索引，从2（含）到9(不含)。

在`java.util.Arrays`类中由方法提供的一些其他有用的操作是：

* binarySearch : 搜索数组以获取特定值以获取其放置的索引
* equals : 比较两个数组以确定它们是否相等
* fill : 填充数组，在每个索引中放置一个特定的值
* sort 或 parallelSort（Java8+） ： 将数组排列成升序。大型数组在多处理器系统上的parallelSort比sort更快
