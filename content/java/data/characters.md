# 字符

大多数情况下，如果使用单个字符值，则将使用原始char类型。例如：

```java
char ch = 'a'; 
// Unicode 字符
char uniChar = '\u03A9';
// 一个字符数组
char[] charArray = { 'a', 'b', 'c', 'd', 'e' };
```

然而，有时需要使用char作为对象，例如，将对象作为方法参数。Java编程语言提供了一个_包装类_，为了这个目的“包装”char到一个Character对象。Character包含单个字段，其类型为char。 Character类还提供了许多有用的类（即静态）方法来处理字符。

你可以使用构造函数来构造一个character

```java
Character ch = new Character('a');
```

Character在某些情况下，Java编译器也会为你创建一个对象。例如，如果您将一个基元传递给char期望对象的方法，编译器会自动将char转换为Character。如果转换是以其他方式进行，则此功能称为自动装箱或取消装箱。有关自动装箱和拆箱的更多信息，请参阅 自动装箱和拆箱。

> 注意：这个Character类是不可变的，所以一旦它被创建，一个Character对象就不能被改变。

下表列出了Character类中最有用的一些方法，但并不详尽。有关此类中所有方法（超过50个）的完整列表，请参阅 java.lang.Character API规范。

* 确定指定的char值是分别是一个字母还是一个数字。
    ```java
    boolean isLetter(char ch)
    boolean isDigit(char ch)
    ```
* 确定指定的char值是否为空白。
    ```java
    boolean isWhitespace(char ch)
    ```
* 确定指定的char值是分别是大写还是小写。
    ```java
    boolean isUpperCase(char ch)
    boolean isLowerCase(char ch)
    ```
* 返回指定char值的大写或小写形式。
    ```java
    char toUpperCase(char ch)
    char toLowerCase(char ch)
    ```
* 返回String表示指定字符值的对象 - 即一个字符的字符串。
    ```java
    toString(char ch)
    ```