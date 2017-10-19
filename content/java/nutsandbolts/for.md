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