# StringBuilder类

StringBuilder 对象就像 String 对象，除了它们可以被修改。在内部，这些对象被视为包含一系列字符的变长数组。在任何时候，序列的长度和内容都可以通过方法调用来改变。

应该始终使用字符串，除非字符串构建器在简单代码（参见本节末尾的示例程序）或更好的性能方面提供了优势。例如，如果您需要连接大量字符串，则附加到StringBuilder对象会更有效。

## 长度和容量
这个StringBuilder类和类一样String，有一个length()方法返回构建器中字符序列的长度。

与字符串不同，每个StringBuilder也有一个容量，即已分配的字符空间的数量。capacity()方法返回的容量总是大于或等于长度（通常大于），并会根据需要自动扩展以适应字符串的添加。

* StringBuilder()

    创建一个容量为16的空字符串生成器（16个空元素）。
* StringBuilder(CharSequence cs)
    
    构造一个包含与指定字符相同的字符串的字符串构建器CharSequence，以及一个额外的16个空元素CharSequence。
* StringBuilder(int initCapacity)
    
    用指定的初始容量创建一个空字符串生成器。
* StringBuilder(String s)

    创建一个字符串生成器，其值由指定的字符串初始化，并在字符串后面加上一个额外的16个空元素。
    
```java
// creates empty builder, capacity 16
StringBuilder sb = new StringBuilder();
// 将产生长度为9，容量为16的StringBuilder 
sb.append("Greetings");
```
![](/assets/java/data/objects-stringBuffer.gif)


StringBuilder类有一些与String类没有的长度和容量有关的方法：

* void setLength(int newLength)

    设置字符序列的长度。如果newLength小于length()，则字符序列中的最后一个字符被截断。如果newLength大于length()，则在字符序列的末尾添加空字符。
* void ensureCapacity(int minCapacity)
    
    确保容量至少等于规定的最小值。
    
多个操作（例如，append()，insert()，或setLength()）可以增加字符序列的长度,使得所得到的length()将是比当前capacity()更大。发生这种情况时，容量会自动增加。

## StringBuilder操作

对于StringBuilder来说，最常用的方法是append和insert。他们被重载多个方法以适应任意类型的数据。append方法总是在现有字符序列的末尾添加这些字符，而insert方法则在指定的位置添加字符。

这里有一些方法

* 将参数追加到此字符串构建器。数据在附加操作发生之前转换为字符串。

```java
StringBuilder append(boolean b)
StringBuilder append(char c)
StringBuilder append(char[] str)
StringBuilder append(char[] str, int offset, int len)
StringBuilder append(double d)
StringBuilder append(float f)
StringBuilder append(int i)
StringBuilder append(long lng)
StringBuilder append(Object obj)
StringBuilder append(String s)
```

* 第一种方法是删除StringBuil 序列中从开始到结束-1（包含）的子序列。第二种方法删除位于index的字符。

```java
StringBuilder delete(int start, int end)
StringBuilder deleteCharAt(int index)
```

* 将第二个参数插入到字符串构建器中。第一个整数参数表示数据要插入之前的索引。数据在插入操作发生之前转换为字符串。

```java
StringBuilder insert(int offset, boolean b)
StringBuilder insert(int offset, char c)
StringBuilder insert(int offset, char[] str)
StringBuilder insert(int index, char[] str, int offset, int len)
StringBuilder insert(int offset, double d)
StringBuilder insert(int offset, float f)
StringBuilder insert(int offset, int i)
StringBuilder insert(int offset, long lng)
StringBuilder insert(int offset, Object obj)
StringBuilder insert(int offset, String s)
```

* 替换此字符串构建器中的指定字符。

```java
StringBuilder replace(int start, int end, String s)
void setCharAt(int index, char c)
```

* 反转此字符串构建器中的字符序列。

```java
StringBuilder reverse()
```

* 返回包含构建器中字符序列的字符串。

```java
String toString()
```


## 一个例子

反转字符串
```java
public class StringDemo {
    public static void main(String[] args) {
        String palindrome = "Dot saw I was Tod";
        int len = palindrome.length();
        char[] tempCharArray = new char[len];
        char[] charArray = new char[len];

        // put original string in an
        // array of chars
        for (int i = 0; i < len; i++) {
            tempCharArray[i] =
                    palindrome.charAt(i);
        }

        // reverse array of chars
        for (int j = 0; j < len; j++) {
            charArray[j] =
                    tempCharArray[len - 1 - j];
        }

        String reversePalindrome =
                new String(charArray);
        System.out.println(reversePalindrome);
    }
}
```

如果用StringBuild会更简单

```java

public class StringBuilderDemo {
    public static void main(String[] args) {
        String palindrome = "Dot saw I was Tod";
         
        StringBuilder sb = new StringBuilder(palindrome);
        
        sb.reverse();  // reverse it
        
        System.out.println(sb);
    }
}
```

> **注意：**  还有一个StringBuffer类与StringBuilder类完全相同，只是由于其方法是同步的，所以它是线程安全的。线程将在并发课中讨论。
