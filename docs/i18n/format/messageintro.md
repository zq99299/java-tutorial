# 文本信息

我们都喜欢使用让我们知道正在发生什么的程序。程序经常通过显示状态和错误信息来通知我们。当然，这些信息需要进行翻译，以便世界各地的终端用户能够理解。[隔离指定 Locale 数据](../resbundle/) 一节讨论了可翻译的文本信息。
通常，在将信息字符串移动到 ResourceBundle 之后就完成了操作。但是，如果在信息中嵌入了 **可变数据**，则必须采取一些额外的步骤来为翻译做好准备。

下面一段文本信息，**粗体部分** 是变量数据

The disk named **MyDisk** contains **300** files.
The current balance of account **#34-09-222** is **$2,745.72**.
**405,390** people have visited your website since **January 1, 2009**.
Delete all files older than **120** days.

您可能会试图通过以下方式 **拼接字符串** 来构造上述列表中的最后一条信息:

```java
double numDays;
ResourceBundle msgBundle;
// ...
String message = msgBundle.getString(
                     "deleteolder" +
                     numDays.toString() +
                     msgBundle.getString("days"));
```

这种方法在英语中很有效，但是对于那些动词出现在句子末尾的语言来说就不适用了。由于此信息的 **词序是硬编码** 的，因此本地化人员无法为所有语言创建语法上正确的翻译。

如果需要使用复合信息，如何使程序可本地化?您可以通过使用 MessageFormat 类来做到这一点，它是本节的主题。

:::  warning 

复合信息很难翻译，因为信息文本是分散的。如果您使用复合信息，则本地化将花费更长的时间并且花费更多。因此，**仅应在必要时使用复合信息**。

:::



- [处理复合信息](./messageFormat.md)

  复合信息可以包含几种类型的变量：日期、时间、字符串、数字、货币和百分比。
  要以与 Locale 无关的方式格式化复合信息，需要构造一个应用于 MessageFormat 对象的模式。

- [处理复数](./choiceFormat.md)

  如果单词的复数形式和单数形式都可以的话，信息中的单词通常会有所变化。
  通过 ChoiceFormat 类，可以将数字映射到单词或短语，从而构造语法正确的信息。

