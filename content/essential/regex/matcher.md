# Matcher 的方法

本节介绍了Matcher类的一些其他有用的方法。为了方便起见，下列方法根据功能进行分组。

## 索引方法

索引方法提供了有用的索引值，它们精确地显示了输入字符串中匹配的位置：

* `public int start()`：返回上一个匹配的起始索引。
* `public int start(int group)`：返回上次匹配操作期间给定组捕获的子序列的起始索引。
* `public int end()`：返回最后一个字符匹配后的偏移量。
* `public int end(int group)`：返回在上一次匹配操作期间由给定组捕获的子序列的最后一个字符之后的偏移量。

## 检查方法

* `public boolean lookingAt()`：尝试将输入序列从区域开头开始与模式相匹配。
* `public boolean find()`：尝试找到匹配模式的输入序列的下一个子序列。
* `public boolean find(int start)`：重置此匹配器，然后尝试从指定的索引开始找到与模式匹配的输入序列的下一个子序列。
* `public boolean matches()`：尝试将整个区域与模式进行匹配。

## 替换方法

替换方法是替换输入字符串中的文本的有用方法。.

* `public Matcher appendReplacement(StringBuffer sb, String replacement)`：执行非终端附加和替换步骤。
* `public StringBuffer appendTail(StringBuffer sb)`：实现终端附加和替换步骤。
* `public String replaceAll(String replacement)`：将与模式匹配的输入序列的每个子序列替换为给定的替换字符串。
* `public String replaceFirst(String replacement)`：将与模式匹配的输入序列的第一个子序列替换为给定的替换字符串。
* `public static String quoteReplacement(String s)`：返回String指定的文字替换String。该方法产生一个在类的方法中String作为文字替换s的appendReplacement方法Matcher。所String产生的字符串s将作为字面序列处理。斜杠（'\'）和美元符号（'$'）将没有特殊意义。