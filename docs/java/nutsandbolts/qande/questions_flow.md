# 问题与练习

##  问题

1. Java编程语言支持的最基本的控制流语句是`___`语句。
2. `___`语句允许任意数量的可能的执行路径。
3. `___`语句与语句相似while，但在循环的`___`处评估其表达式。
4. 你怎么用for语句写一个无限循环？
5. 你怎么用while语句写一个无限循环？

### 答案

1. if-then
2. switch
3. do-while,底部
4. `for(;;){}`
5. `while(true){}`

## 练习
请考虑以下代码

```java
if (aNumber >= 0)
    if (aNumber == 0)
        System.out.println("first string");
else System.out.println("second string");
System.out.println("third string");
```

1. 你认为如果aNumber是3 ，代码将产生什么输出？
2. 编写一个包含以前代码段的测试程序; make aNumber3.程序的输出是什么？是你预测的吗？解释为什么输出是什么; 换句话说，代码片段的控制流程是什么？
3. 仅使用空格和换行符，重新格式化代码段，使控件流程更容易理解。
4. 使用括号{和}来进一步澄清代码。

### 答案

1. 第一项

    ```java
    second string
    third string
    ```

2. 第二项

    ```java
    class NestedIf {
    public static void main(String[] args) {
	     int aNumber = 3;

            if (aNumber >= 0)
                if (aNumber == 0) System.out.println("first string");
            else System.out.println("second string");
            System.out.println("third string");
        }
    }
    ```

3. 第三项目

    ```java
        if (aNumber >= 0)
            if (aNumber == 0)
                System.out.println("first string");
        else
            System.out.println("second string");

        System.out.println("third string");

    ```

4. 第 4 项

    ```java
      if (aNumber >= 0) {
          if (aNumber == 0) {
              System.out.println("first string");
          } else {
              System.out.println("second string");
          }
      }

      System.out.println("third string");
    ```
