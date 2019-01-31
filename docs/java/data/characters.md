# 字符
[[toc]]

大多数情况下，如果使用单个字符值，则将使用原始 char 类型。例如：

```java
char ch = 'a';
// Unicode 字符
char uniChar = '\u03A9';
// 一个字符数组
char[] charArray = { 'a', 'b', 'c', 'd', 'e' };
```

然而，有时需要使用 char 作为对象，例如，将对象作为方法参数。Java 编程语言提供了一个 **包装类** ，为了这个目的包装 char 到一个 Character 对象。Character 包含单个字段，其类型为 char。 Character 类还提供了许多有用的类（即静态）方法来处理字符。

你可以使用构造函数来构造一个 Character

```java
Character ch = new Character('a');
```

Character 在某些情况下，Java 编译器也会为你创建一个对象。例如，如果您将一个基元传递给 char 期望对象的方法，编译器会自动将 char 转换为 Character。
如果转换是以其他方式进行，则此功能称为自动装箱或拆箱。有关自动装箱和拆箱的更多信息，请参阅 [自动装箱和拆箱](./autoboxing.md)。

::: tip
这个 Character 类是不可变的，所以一旦它被创建，一个 Character 对象就不能被改变。
:::

下表列出了 Character 类中最有用的一些方法，但并不详尽。有关此类中所有方法（超过 50个）的完整列表，请参阅 java.lang.Character API 规范。

* 确定指定的 char 值是分别是一个字母还是一个数字。

    ```java
    boolean isLetter(char ch)
    boolean isDigit(char ch)
    ```

* 确定指定的 char 值是否为空白。

    ```java
    boolean isWhitespace(char ch)
    ```
* 确定指定的 char 值是分别是大写还是小写。

    ```java
    boolean isUpperCase(char ch)
    boolean isLowerCase(char ch)
    ```
* 返回指定 char 值的大写或小写形式。

    ```java
    char toUpperCase(char ch)
    char toLowerCase(char ch)
    ```
* 返回 String 表示指定字符值的对象 - 即一个字符的字符串。

    ```java
    toString(char ch)
    ```

## 转义序列
以反斜杠（`\`）开头的字符是转义序列，对编译器有特殊意义。下表显示了 Java 转义字符：

| 转义字符 | 描述                             |
|----------|----------------------------------|
| `\t`       | 在此处插入一个 tab。              |
| `\b`       | 在这一点上在文本中插入一个退格。 |
| `\n`       | 此时在文本中插入换行符。         |
| `\r`       | 此时在文本中插入一个回车符。     |
| `\f`       | 在此处插入一个换页符。           |
| `\'`       | 此时在文本中插入单引号字符。     |
| `\"`       | 此时在文本中插入一个双引号字符。 |
| `\\`       | 此时在文本中插入一个反斜杠字符。 |

当在打印语句中遇到转义序列时，编译器会相应地解释它。例如，如果要将引号放在引号内，则必须在内部引号中使用转义序列 「\」，以打印该句子

```java
She said "Hello!" to me.

应该这样写
System.out.println("She said \"Hello!\" to me.");
```
