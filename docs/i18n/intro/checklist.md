# 检查清单

初次编写时，许多程序尚未国际化。这些程序可能是作为原型开始的，或者可能不打算在国际范围内发行。如果必须国际化现有程序，请执行以下步骤：

## 识别国际化相关数据

文本消息是随语言环境变化最明显的数据形式，但是其他类型可能会因为地区语言而异，下面列出了随语言环境变化相关的数据示例：

- 文本消息
- GUI 组件上的标签
- 在线帮助
- 声音
- 色彩
- 图形
- icons
- 日期
- 时间
- 数值
- 货币
- 尺寸
- 电话号码
- 荣誉称号和个人头衔
- 邮政地址
- 页面布局

## 隔离资源包中的可翻译文本

翻译成本很高。通过隔离必须在 ResourceBundle 对象中翻译的文本，可以帮助降低成本。可翻译文本包括状态消息、错误消息、日志文件条目和 GUI 组件标签。此文本被硬编码为尚未国际化的程序。您需要查找向最终用户显示的所有硬编码文本。例如，您应该清理代码，例如：

```java
String buttonLabel = "OK";
// ...
JButton okButton = new JButton(buttonLabel);
```

你应该将 buttonLabel 的值提取到语言语言属性文件中去。

## 处理复合消息

复合消息包含可变数据。在消息「磁盘包含 1100 个文件」中，整数 1100 可能有所不同。这个消息很难翻译，因为整数在句子中的位置在所有语言中并不相同。以下消息是不可翻译的，因为句子元素的顺序是通过连接硬编码的：

```java
Integer fileCount;
// ...
String diskStatus = "The disk contains " + fileCount.toString() + " files";
```

只要有可能，就应该避免构造复合消息，因为它们很难翻译。但是，如果您的应用程序需要复合消息，您可以使用[格式化中数字和货币](../format/numberintro.md)  技术来处理它们。

## 格式化日期和时间

日期和时间格式因地区和语言而异。如果您的代码包含如下语句，则需要对其进行更改：

```java
Double amount;
TextField amountField;
// ...
String displayAmount = amount.toString();
amountField.setText(displayAmount);
```

如果使用日期格式的类，则您的应用程序可以在世界各地正确显示日期和时间。有关示例和说明，请参见 [格式化中日期和时间](../format/dateintro.md) 部分 。

## 使用 Unicode 字符属性

下面的代码尝试验证字符是字母：

```java
char ch;
// 此代码不正确
if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z'))
```

请注意这样的代码，因为它不适用于英语以外的语言

字符比较方法使用 Unicode 标准来标识字符属性。因此，您应该将以前的代码替换为以下内容：

```java
char ch;
// ...
if (Character.isLetter(ch))
```

有关 Character 比较方法的更多信息，请参阅  [检查字符属性](..//text/charintro.md)

## 正确比较字符串

对文本进行排序时，经常比较字符串。如果显示文本，则不应使用 String 类的比较方法。尚未国际化的程序可能会比较字符串，如下所示：

```java
String target;
String candidate;
// ...
if (target.equals(candidate)) {
// ...
if (target.compareTo(candidate) < 0) {
// ...
```

String.equals 和 String.compareTo 方法执行二进制比较，在大多数语言中排序时无效。相反，您应该使用 Collator 类，该类在比 [较字符串部分中进行了介绍](../text/collationintro.html)。

## 转换非 Unicode 文本

Java 编程语言中的字符以 Unicode 编码。如果您的应用程序处理非 Unicode 文本，则可能需要将其转换为 Unicode。有关更多信息，请参见 [转换非 Unicode 文本部分](../text/convertintro.html)

