# 检查字符（Character）属性

你可以根据字符的属性对它们进行分类。例如，X 是大写字母，4 是十进制数字。检查字符属性是验证最终用户输入数据的常见方法。例如，如果您在线销售图书，您的订单输入屏幕应该验证 quantity 字段中的字符都是数字。

不习惯编写全球软件的开发人员可以通过比较字符常量来确定字符的属性。例如，他们可能会这样写代码:

```java
char ch;
//...

// 这个代码是错误的!

// 检查 ch 是否是一个字母
if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z'))
    // ...

// 检查 ch 是否是一个数字
if (ch >= '0' && ch <= '9')
    // ...

// 检查 ch 是否是一个空格
if ((ch == ' ') || (ch =='\n') || (ch == '\t'))
    // ...
```

前面的代码是*错误的，*因为它仅适用于英语和其他几种语言。要国际化前面的示例，请用以下语句替换它：

```java
char ch;
// ...

// 此代码是 OK 的

if (Character.isLetter(ch))
    // ...

if (Character.isDigit(ch))
    // ...

if (Character.isSpaceChar(ch))
    // ...
```

以上 [Character](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html) 方法依赖于 Unicode 标准来确定字符的属性。Unicode 是一种支持世界上主要语言的 16 位字符编码。在 Java 编程语言中，**char 值表示 Unicode 字符**。如果您使用适当的字符方法检查 char 的属性，那么您的代码将适用于所有主要语言。例如，字符。如果字符是汉语、德语、阿拉伯语或其他语言中的字母，isLetter 方法返回 true。

下面的列表给出了一些最有用的字符比较方法。Character API 文档完全指定了这些方法。

- `isDigit`：是否是数字
- `isLetter`：是否是字母
- `isLetterOrDigit` 是否是字母或则数字
- `isLowerCase`：是否是小写字母
- `isUpperCase`：是否是大写字母
- `isSpaceChar`：是否是空格字符
- `isDefined`：是否在 Unicode 中定义过的字符

`Character.getType` 方法返回字符的 Unicode 类别。每个类别对应于 Character 类中定义的一个常量。
例如，getType 返回 Character.UPPERCASE_LETTER。要获得 getType 返回的类别常量的完整列表，请参阅 character API 文档。

下面的示例演示如何使用 getType 和字符类别常量。if 语句中的所有表达式都为真:

```java
if (Character.getType('a') == Character.LOWERCASE_LETTER)
    // ...

if (Character.getType('R') == Character.UPPERCASE_LETTER)
    // ...

if (Character.getType('>') == Character.MATH_SYMBOL)
    // ...

if (Character.getType('_') == Character.CONNECTOR_PUNCTUATION)
    // ...
```

