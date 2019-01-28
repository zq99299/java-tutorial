# for

for语句提供了一种用于迭代一系列值的紧凑方法。程序员通常将其称为“for循环”，因为它反复循环的方式直到满足特定条件。for声明的一般形式可以表达如下：

```java
for (初始表达式; 终止表达式;增量表达式) {
    statement(s)
}
```

当使用此版本的for语句时，请记住：

* 初始化表达初始化回路; 当循环开始时，它被执行一次。
* 当终止表达式求值时false，循环终止。
* 增量表达式通过循环每次迭代之后被调用， 这个表达式是完全可以增加或减少一个值。

以下程序 ForDemo使用for语句的一般格式将数字1到10打印到标准输出中：
```java

class ForDemo {
    public static void main(String[] args){
         for(int i=1; i<11; i++){
              System.out.println("Count is: " + i);
         }
    }
}
```

程序输出
```java
Count is: 1
Count is: 2
Count is: 3
Count is: 4
Count is: 5
Count is: 6
Count is: 7
Count is: 8
Count is: 9
Count is: 10
```

请注意代码如何在初始化表达式中声明变量。该变量的范围从声明扩展到由for语句控制的块的结尾，因此它也可以在终止和增量表达式中使用。如果在for循环之外不需要控制语句的变量，则最好在初始化表达式中声明变量。名称i，j以及k经常被用来控制for环路; 在初始化表达式中声明它们限制了它们的使用寿命并减少了错误。

for循环的三个表达式是可选的; 可以创建无限循环，如下所示：

```java
// 无限循环
for ( ; ; ) {
    
    // your code goes here
}
The for statem
```

or语句还有另一种设计用于通过集合和 数组迭代的 形式此表格有时被称为增强的for语句，可用于使您的循环更紧凑和易于阅读。要演示，请考虑以下数组，其中保存数字1到10：

```java
int[] numbers = {1,2,3,4,5,6,7,8,9,10};
```

以下程序 EnhancedForDemo使用增强型for循环遍历数组：

```java
class EnhancedForDemo {
    public static void main(String[] args){
         int[] numbers = 
             {1,2,3,4,5,6,7,8,9,10};
         for (int item : numbers) {
             System.out.println("Count is: " + item);
         }
    }
}
```
在这个例子中，变量item保存来自数组数组的当前值。此程序的输出与以前相同：

```java
Count is: 1
Count is: 2
Count is: 3
Count is: 4
Count is: 5
Count is: 6
Count is: 7
Count is: 8
Count is: 9
Count is: 10

```

我们建议for尽可能使用这种形式的语句，而不是一般的for循环。