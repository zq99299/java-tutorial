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

1. 修复 问题 1 中的程序
2. 给定下面的类，调用 NumberHolder,编写一些创建类的实例代码，初始化其两个成员变量，然后显示每个成员变量的值

    ```java
    public class NumberHolder {
        public int anInt;
        public float aFloat;
    }
    ```

## 问题 - 答案

1. 第一题

    编译器会产生一个错误，局部代码块中的变量必须要先初始化才能使用。

2. 第二题

    students 对数组有一个引用，数组元素 0 对字符串有一个引用。两个对象都没有资格被回收，即便 studentName 被赋值成了 null。但是字符串还被数组元素 0 持有。

3. 程序没有明确的销毁对象的能力。但是可以设置对象的所有引用为 null，以便符合垃圾回收的条件。

## 练习 - 答案

1. 第一题

    ```java
    public class SomethingIsRight {
        public static void main(String[] args) {
            Rectangle myRect = new Rectangle();
            myRect.width = 40;
            myRect.height = 50;
            System.out.println("myRect's area is " + myRect.area());
        }
    }
    ```

2. 第2题

    ```java
    public class NumberHolderDisplay {
        public static void main(String[] args) {
    	NumberHolder aNumberHolder = new NumberHolder();
    	aNumberHolder.anInt = 1;
    	aNumberHolder.aFloat = 2.3f;
    	System.out.println(aNumberHolder.anInt);
    	System.out.println(aNumberHolder.aFloat);
        }
    }
    ```
