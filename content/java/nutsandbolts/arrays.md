# 数组

一个数组是保持单一类型的值的固定数目的容器对象。创建数组时，建立数组的长度。创建后，其长度是固定的。本节将更详细地讨论数组

![](/assets/java/nutsandbolts/objects-tenElementArray.gif)

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