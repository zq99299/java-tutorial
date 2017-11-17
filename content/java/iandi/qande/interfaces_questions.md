# 问题和练习

## 问题

1. 实现`java.lang.CharSequence`接口的类必须实现什么方法？

    答案：charAt，length，subSequence和toString。
     
2. 以下接口有什么问题？
    
    ```java
    public interface SomethingIsWrong {
        void aMethod(int aValue){
            System.out.println("Hi Mom");
        }
    }
    ```
    
    答：该接口有一个实现，然而只有static和default标识的才能有方法实现
    
3. 修复问题2中的接口
    ```java
    public interface SomethingIsWrong {
        default void aMethod(int aValue) {
            System.out.println("Hi Mom");
        }
    }
    ```
4. 以下接口是否有效

    ```java
    public interface Marker {
    }
    ```
    
    答：是的。方法不是必需的。空接口可以用作类型并标记类，而不需要任何特定的方法实现。有关有用的空接口的示例，请参阅`java.io.Serializable.`
## 练习

1. 编写一个实现java.lang包中的CharSequence接口的类。你的实现应该返回字符串。选择本书中的一个句子作为数据。写一个小main方法来测试你的类; 确保调用所有四种方法。

2. 假设你已经写了一个时间服务器，定期通知其客户当前的日期和时间。编写一个接口，服务器可以使用它来强制客户端上的特定协议。
    