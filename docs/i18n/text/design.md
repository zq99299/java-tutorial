# 设计注意事项

要使用任何脚本编写适合任何语言的无缝代码，需要记住几件事。

- 考虑：避免使用 `char` 数据类型的方法。

  避免使用 char 原语数据类型或使用 char 数据类型的方法，因为使用该数据类型的代码不能用于补充字符。对于采用 char 类型参数的方法，在可能的情况下使用对应的 int 方法。例如，使用 `Character.isDigit(int)` 方法而不是 `Character.isDigit(char)` 方法。
  
- 考虑：使用该 `isValidCodePoint` 方法来验证码点值。

  码点被定义为 int 数据类型，允许在从 0x0000 到 0x10FFFF 的码点值有效范围之外的值。出于性能原因，采用码点值作为参数的方法不检查参数的有效性，但是您可以使用 isValidCodePoint 方法检查该值。

- 考虑：使用 `codePointCount` 方法对字符进行计数。

  `length()` 方法返回字符串中的代码单元数或 16 位字符值。如果字符串包含补充字符，计数可能会引起误解，因为它不能反映真实的码点数量。要获得字符数(包括补充字符)的准确计数，请使用 codePointCount 方法。

- 考虑：使用

  - `String.toUpperCase(int codePoint)`
  - `String.toLowerCase(int codePoint)`
  - `Character.toUpperCase(int codePoint)`
  - `Character.toLowerCase(int codePoint)`

  原因：虽然 `Character.toUpperCase(int)` 和 `Character.toLowerCase(int)`  方法可以处理代码点值，但是有些字符不能一对一地转换。例如，小写的德语字符 「ß」在转换为大写时就变成了两个字符「SS」。
  同样的，小的希腊字符也会因在弦中的位置而不同。`Character.toUpperCase(int)` 和`Character.toLowerCase(int)` 方法不能处理这些类型的问题;

  然而： `String.toUpperCase` 和 `String.toLowerCase` 方法可以正确处理这些情况。

- 考虑：删除字符时要小心

  当调用索引指向补充字符的 `StringBuilder.deleteCharAt(int index)` 或 `StringBuffer.deleteCharAt(int index)` 方法时，只删除该字符的前半部分(第一个 char 值)。
  首先，调用 ` Character.charCount` 方法确定要删除几个索引

- 考虑：在序列中反转字符时要小心

  在对包含补充字符的文本调用 `StringBuffer.reverse()` 或 `StringBuilder.reverse()` 方法时，由于补充字符由两个 char 组成，那么将会颠倒他们，组成的值就是错误的，代理对

  






