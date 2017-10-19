# if-then和if-then-else语句

## if-then 语句
if-then语句是所有控制流语句中最基本的。它告诉您的程序只有在特定测试评估为true时执行某段代码。例如，只有当自行车已经运动时，Bicycle该类才允许制动器降低自行车的速度。该方法的一个可能的实现可以如下：

```java
void applyBrakes() {
    // “if” 子句：自行车必须在移动中，才能降低速度
    if (isMoving){ 
        // "then" 子句 ： 降低当前速度
        currentSpeed--;
    }
}
```

## if-then-else 语句