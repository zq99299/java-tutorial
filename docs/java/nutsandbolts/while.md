# while 和 do-while 语句

该 while 声明在特定条件为 true 下持续执行一组语句。其语法可以表示为：

```java
while (expression) {
     statement(s)
}
```

该 while 语句评估表达式，它必须返回一个 boolean 值。如果表达式的计算结果为 true，该 while 语句将执行该块中的语句。该 while 语句继续测试表达式并执行其块，直到表达式求值为止 false。使用 while 语句打印从 1 到 10 的值可以像下面的 WhileDemo 程序一样完成：

```java
class WhileDemo {
    public static void main(String[] args){
        int count = 1;
        while (count < 11) {
            System.out.println("Count is: " + count);
            count++;
        }
    }
}
```

您可以使用以下 while 语句实现无限循环：

```java
while(true){
    // 你的代码在这里
}
```

Java 编程语言还提供了一个 do-while 语句，可以表示如下：

```java
do {
     statement(s)
} while (expression)
```

dow-while 是后评估表达式，因此，do 块中的语句总是至少执行一次，如以下 DoWhileDemo 程序所示 ：

```java

class DoWhileDemo {
    public static void main(String[] args){
        int count = 1;
        do {
            System.out.println("Count is: " + count);
            count++;
        } while (count < 11);
    }
}
```
