# if-then和if-then-else语句
[[toc]]

## if-then 语句
if-then 语句是所有控制流语句中最基本的。它告诉您的程序只有在特定测试评估为 true 时执行某段代码。例如，只有当自行车已经运动时，Bicycle 类才允许制动器降低自行车的速度。该方法的一个可能的实现可以如下：

```java
void applyBrakes() {
    // “if” 子句：自行车必须在移动中，才能降低速度
    if (isMoving){
        // "then" 子句 ： 降低当前速度
        currentSpeed--;
    }
}
```

如果此测试评估为 false（意味着自行车不运动），则控制跳转到 if-then 语句的末尾。

另外，打开和关闭大括号是可选的，只要 then 子句只包含一个语句：

```java
void applyBrakes() {
    if (isMoving)
        currentSpeed--;
}
```

决定何时忽略大括号是个人品味的问题。省略它们可以使代码更脆弱。如果第二个语句后来添加到 then 子句中，常见的错误是忘记添加新的必需大括号。编译器无法捕获这种错误; 你会得到错误的结果。

## if-then-else 语句

if-then-else 当 if 子句求值时，该语句提供执行的辅助路径 false。如果在自行车不动时应用制动器，则可以使用方法中的 if-then-else 声明 applyBrakes 来采取一些措施。在这种情况下，动作是简单地打印一条错误消息，指出自行车已经停止。

```java
void applyBrakes() {
    if (isMoving) {
        currentSpeed--;
    } else {
        System.err.println("自行车已经停止了!");
    }
}
```

以下程序 IfElseDemo 根据测试成绩的值分配成绩：A 分数为 90％ 或以上，B 分数为 80％ 或以上，等等。

```java
class IfElseDemo {
    public static void main(String[] args) {

        int testscore = 76;
        char grade;

        if (testscore >= 90) {
            grade = 'A';
        } else if (testscore >= 80) {
            grade = 'B';
        } else if (testscore >= 70) {
            grade = 'C';
        } else if (testscore >= 60) {
            grade = 'D';
        } else {
            grade = 'F';
        }
        System.out.println("Grade = " + grade);
    }
}
```

这个程序输出

```java
Grade = C
```

您可能已经注意到，testscore 在复合语句中可以满足多个表达式的值：76 >= 70 和 76 >= 60。然而，一旦满足条件，则执行适当的语句，（grade = 'C';）并且不评估其余条件。
