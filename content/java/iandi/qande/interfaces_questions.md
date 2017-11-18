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

    答：其实我没有看明白下面这个例子讲的是啥，为啥要反转什么的。难道是上面题目的翻译有问题？
    ```java
    public class CharSequenceDemo implements CharSequence {
        private String s;
    
        public CharSequenceDemo(String s) {
            //It would be much more efficient to just reverse the string
            //in the constructor. But a lot less fun!
            this.s = s;
        }
    
        //If the string is backwards, the end is the beginning!
        private int fromEnd(int i) {
            return s.length() - 1 - i;
        }
    
        public char charAt(int i) {
            if ((i < 0) || (i >= s.length())) {
                throw new StringIndexOutOfBoundsException(i);
            }
            return s.charAt(fromEnd(i));
        }
    
        public int length() {
            return s.length();
        }
    
        public CharSequence subSequence(int start, int end) {
            if (start < 0) {
                throw new StringIndexOutOfBoundsException(start);
            }
            if (end > s.length()) {
                throw new StringIndexOutOfBoundsException(end);
            }
            if (start > end) {
                throw new StringIndexOutOfBoundsException(start - end);
            }
            StringBuilder sub = 
                new StringBuilder(s.subSequence(fromEnd(end), fromEnd(start)));
            return sub.reverse();
        }
    
        public String toString() {
            StringBuilder s = new StringBuilder(this.s);
            return s.reverse().toString();
        }
    
        //Random int from 0 to max. As random() generates values between 0 and 0.9999
        private static int random(int max) {
            return (int) Math.round(Math.random() * (max+1));
        }
    
        public static void main(String[] args) {
            CharSequenceDemo s =
                new CharSequenceDemo("Write a class that implements the CharSequence interface found in the java.lang package.");
    
            //exercise charAt() and length()
            for (int i = 0; i < s.length(); i++) {
                System.out.print(s.charAt(i));
            }
            
            System.out.println("");
    
            //exercise subSequence() and length();
            int start = random(s.length() - 1);
            int end = random(s.length() - 1 - start) + start;
            System.out.println(s.subSequence(start, end));
    
            //exercise toString();
            System.out.println(s);
    
        }
    }
    ```
    

2. 假设你已经写了一个时间服务器，定期通知其客户当前的日期和时间。编写一个接口，服务器可以使用它来强制客户端上的特定协议。

    答：还是没有明白题目的意思是啥
    ```java
    import java.time.*; 
     
    public interface TimeClient {
        void setTime(int hour, int minute, int second);
        void setDate(int day, int month, int year);
        void setDateAndTime(int day, int month, int year,
                                   int hour, int minute, int second);
        LocalDateTime getLocalDateTime();
    }
```
    