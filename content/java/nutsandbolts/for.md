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