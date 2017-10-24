# 对象-问题和练习

## 问题

1. 以下程序出了问题？

    ```java
    public class SomethingIsWrong {
        public static void main(String[] args) {
            Rectangle myRect;
            myRect.width = 40;
            myRect.height = 50;
            System.out.println("myRect's area is " + myRect.area());
        }
    }
    ```

2. 以下代码创建一个数组和一个字符串对象。代码执行后，对这些对象有多少个引用？垃圾收集是否有资格回收？

    ```java
    ...
    String[] students = new String[10];
    String studentName = "Peter Parker";
    students[0] = studentName;
    studentName = null;
    ...
    ```

3. 程序如何销毁它创建的对象？


## 练习

1. 修复 问题1中的程序
2. 个体定下面的类，调用 NumberHolder,编写一些创建类的实例代码，初始化其两个成员变量，然后显示每个成员变量的值


## 问题 - 答案

1. 

## 练习 - 答案