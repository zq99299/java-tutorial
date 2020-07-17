# 字符和字符串 API

Character 类封装了char 数据类型。对于 J2SE 发行版 5，许多方法被添加到字符类中以 **支持补充字符**。
这个 API 分为两类：

- 在字符和码点值之间进行转换的方法
- 验证或映射码点的有效性的方法

本节描述 Character 类中可用方法的一个子集。有关可用 api 的完整列表，请参见  [`Character`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html)  规范。

## 转换方法和字符类

下表包括在 Character 类中最有用的 **转换方法**，或有助于转换的方法。codePointAt 和 codePointBefore 方法包含在这个列表中，因为文本通常在序列中找到，比如字符串，并且这些方法可以用于提取所需的子字符串。

| Method(s)                                                    | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `toChars(int codePoint, char[] dst, int dstIndex)`<br/> `toChars(int codePoint)` | 将指定的 Unicode 码点转换为其 UTF-16 表示形式，并将其放在 char数组中。<br/>示例用法：`Character.toChars(0x10400)` |
| `toCodePoint(char high, char low)`<br/>`toCodePoint(CharSequence, int)`<br/>`toCodePoint(char[], int, int)` | 将指定的参数转换为其补充的码点值。<br/>不同的方法接受不同的输入格式。 |
| `codePointAt(char[] a, int index)`<br/>`codePointAt(char[] a, int index, int limit)`<br/>`codePointAt(CharSequence seq, int index)` | 返回指定索引处的 Unicode 码点。<br/>第三种方法采用 CharSequence，第二种方法对索引施加上限。 |
| `codePointBefore(char[] a, int index)`<br/>`codePointBefore(char[] a, int index, int start)`<br/>`codePointBefore(CharSequence seq, int index)`<br/>`codePointBefore(char[], int, int)` | 返回指定索引前的 Unicode 码点。<br/>第三个方法接受 CharSequence，其他方法接受 char 数组。<br/>第二种方法强制索引的下限。 |
| [`charCount(int codePoint)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#charCount-int-) | 对于可由单个字符表示的字符，返回值 1。<br/>对于需要两个字符的补充字符返回值 2。 |

## Character 类中验证和映射方法

以前使用 char 原始数据类型的一些方法，如 `isLowerCase(char)` 和 `isDigit(char)`，已经被支持补充字符的方法取代，如 `isLowerCase(int)` 和 `isDigit(int)`。支持前面的方法，但不支持补充字符。要创建一个全局应用程序并确保您的代码与任何语言无缝协作，建议您使用这些方法的更新形式。

**注意，** 出于性能原因，大多数接受码点的方法 **不验证码点参数的有效性**。您可以为此使用 isValidCodePoint 方法。

下表列出了 Character 类中的一些验证和映射方法。

| Method(s)                                                    | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`isValidCodePoint(int codePoint)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isValidCodePoint-int-) | 如果码点在 0x0000 到 0x10FFFF（包括 0x0000）之间，则返回true。 |
| [`isSupplementaryCodePoint(int codePoint)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isSupplementaryCodePoint-int-) | 如果码点在 0x10000 到 0x10FFFF（包括 0x10000）之间，则返回true。 |
| [`isHighSurrogate(char)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isHighSurrogate-char-) | 如果指定的`char`值在 `\uD800` 到 `\uDBFF`（包括）的高替代围内，则返回 true 。 |
| [`isLowSurrogate(char)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isLowSurrogate-char-) | 如果指定的`char`值在 `\uDC00` 到 `\uDFFF` 的低替代范围内，则返回 true 。 |
| [`isSurrogatePair(char high, char low)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isSurrogatePair-char-char-) | 如果指定的高和低代理代码值表示有效的代理对，则返回 true。    |
| [`codePointCount(CharSequence, int, int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#codePointCount-java.lang.CharSequence-int-int-) [`codePointCount(char[], int, int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#codePointCount-char:A-int-int-) | 返回`CharSequence`或`char`数组中 Unicode 码点的数量。        |
| [`isLowerCase(int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isLowerCase-int-) [`isUpperCase(int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isUpperCase-int-) | 如果指定的 Unicode 码点是小写或大写字符，则返回 true。       |
| [`isDefined(int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isDefined-int-) | 如果在 Unicode 标准中定义了指定的 Unicode 码点，则返回 true。 |
| [`isJavaIdentifierStart(char)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isJavaIdentifierStart-char-) [`isJavaIdentifierStart(int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isJavaIdentifierStart-int-) | 如果指定的字符或 Unicode 码点允许作为 Java 标识符中的第一个字符，则返回 true。 |
| [`isLetter(int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isLetter-int-) [`isDigit(int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isDigit-int-) [`isLetterOrDigit(int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isLetterOrDigit-int-) | 如果指定的 Unicode 码点是字母，数字或字母或数字，则返回 true。 |
| [`getDirectionality(int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#getDirectionality-int-) | 返回给定 Unicode 码点的 Unicode 方向性属性。                 |
| [`Character.UnicodeBlock.of(int codePoint)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.UnicodeBlock.html#of-int-) | 返回表示包含给定 Unicode 码点的 Unicode 块的对象，如果码点不是定义块的成员，则返回 null |

## String 类中的方法

String、StringBuffer 和 StringBuilder 类也有处理补充字符的构造器和方法。下表列出了一些常用的方法。
有关可用 api 的完整列表，请参阅 javadoc 中的 String、StringBuffer 和 StringBuilder 类。

| Constructor or Methods                                       | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`String(int[] codePoints, int offset, int count)`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#String-int:A-int-int-) | 分配一个新的字符串实例，该实例包含来自Unicode 码点数组的子数组的字符。 |
| [`String.codePointAt(int index)`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#codePointAt-int-) <br/>[`StringBuffer.codePointAt(int index)`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuffer.html#codePointAt-int-) <br/>[`StringBuilder.codePointAt(int index)<br/>`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html#codePointAt-int-) | 返回指定索引处的 Unicode 码点                                |
| [`String.codePointBefore(int index)`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#codePointBefore-int-) <br/>[`StringBuffer.codePointBefore(int index)`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuffer.html#codePointBefore-int-) <br/>[`StringBuilder.codePointBefore(int index)`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html#codePointBefore-int-) | 返回指定索引前的 Unicode 码点。                              |
| [`String.codePointCount(int beginIndex, int endIndex)`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#codePointCount-int-int-) <br/>[`StringBuffer.codePointCount(int beginIndex, int endIndex)`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuffer.html#codePointCount-int-int-) <br/>[`StringBuilder.codePointCount(int beginIndex, int endIndex)`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html#codePointCount-int-int-) | 返回指定范围内的 Unicode 码点的数目。                        |
| [`StringBuffer.appendCodePoint(int codePoint)`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuffer.html#appendCodePoint-int-) <br/>[`StringBuilder.appendCodePoint(int codePoint)`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html#appendCodePoint-int-) | 将指定代码指向的字符串表示追加到序列。                       |
| [`String.offsetByCodePoints(int index, int codePointOffset)`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#offsetByCodePoints-int-int-) <br/>[`StringBuffer.offsetByCodePoints(int index, int codePointOffset)`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuffer.html#offsetByCodePoints-int-int-) <br/>[`StringBuilder.offsetByCodePoints(int index, int codePointOffset)`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html#offsetByCodePoints-int-int-) | 返回与给定索引相差给定码点数目的索引。                       |
