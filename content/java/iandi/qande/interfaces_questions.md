# 问题和练习

## 问题

1. 实现`java.lang.CharSequence`接口的类必须实现什么方法？
     
2. 以下接口有什么问题？
    
    ```java
    public interface SomethingIsWrong {
        void aMethod(int aValue){
            System.out.println("Hi Mom");
        }
    }
    ```
3. 修复问题2中的接口
4. 以下接口是否有效

    ```java
    public interface Marker {
    }
    ```
    
## 练习

1. 编写一个实现java.lang包中的CharSequence接口的类。你的实现应该返回字符串。选择本书中的一个句子作为数据。写一个小main方法来测试你的类; 确保调用所有四种方法。

2. 假设你已经写了一个时间服务器，定期通知其客户当前的日期和时间。编写一个接口，服务器可以使用它来强制客户端上的特定协议。
    