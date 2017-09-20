# PatternSyntaxException 类的方法

 [PatternSyntaxException](https://docs.oracle.com/javase/8/docs/api/java/util/regex/PatternSyntaxException.html)是未经检查的异常，指示正则表达式模式中的语法错误。PatternSyntaxException类提供了以下方法来帮助你确定是什么出了问题：
 
* `public String getDescription()`：检索错误的描述。
* `public int getIndex()`：检索错误索引。
* `public String getPattern()`：检索错误的正则表达式模式。
* `public String getMessage()`：返回一个多行字符串，其中包含语法错误及其索引的描述，错误的正则表达式模式以及模式中错误索引的可视指示。