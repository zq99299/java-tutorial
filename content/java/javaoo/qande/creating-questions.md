# 创建-问题和练习

## 问题
1. 考虑下面的类
    
    ```java
    public class IdentifyMyParts {
        public static int x = 7; 
        public int y = 3; 
    }
    ```
    
    1. 什么是类变量
    2. 什么是实例变量
    3. 以下代码的输出是什么？
    ```java
    IdentifyMyParts a = new IdentifyMyParts();
    IdentifyMyParts b = new IdentifyMyParts();
    a.y = 5;
    b.y = 6;
    a.x = 1;
    b.x = 2;
    System.out.println("a.y = " + a.y);
    System.out.println("b.y = " + b.y);
    System.out.println("a.x = " + a.x);
    System.out.println("b.x = " + b.x);
    System.out.println("IdentifyMyParts.x = " + IdentifyMyParts.x);
    ```

## 练习

1. 写一个class，其实例代表一张卡片的单张纸牌。扑克牌有两个不同的特征：点数和花色。确保保留您的解决方案，因为您将被要求在枚举类型中重写它。

      **提示：**
        您可以使用assert语句来检查您的作业。你写：
        
        assert（要测试的布尔表达式）; 
        
        如果布尔表达式为false，您将收到一条错误消息。例如，
       
        assert toString（ACE）==“Ace”;
       
        应该返回true，所以没有错误信息。
        如果您使用assert语句，则必须使用该ea标志运行程序：
        `java -ea YourProgram.class`
        
2. 写一个类，其实例代表一个完整的扑克牌。你也应该保留这个解决方案。

3. 写一个小程序来测试你的甲板和卡牌。该程序可以像创建一张卡片一样简单，并显示其卡片。

## 问题 - 答案

1. 第一题
    
    1. x
    2. y
    3. 输出如下
    
    ```java
        a.y = 5
        b.y = 6    
        a.x = 2
        b.x = 2
        IdentifyMyParts.x = 2
    ```    
        因为类中x被定义为类变量，所以最后的值将以最后分配的值为准。



