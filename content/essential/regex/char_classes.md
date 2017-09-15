# 字符类

如果您浏览 [Pattern](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html)类规范，您将看到总结支持的正则表达式构造的表。在“字符类”部分，您将找到以下内容：

| - | 描述
|----------
| [abc]          | a、b 或 c（简单类） 
| [^abc]         | 任何字符，除了 a、b 或 c（否定） 
| [a-zA-Z]       | a 到 z 或 A 到 Z，两头的字母包括在内（范围） 
| [a-d[m-p]]     | a 到 d 或 m 到 p：[a-dm-p]（并集） 
| [a-z&&[def]]     | d、e 或 f（交集） 
| [a-z&&[^bc]]     |  a 到 z，除了 b 和 c：[ad-z]（减去） 
| [a-z&&[^m-p]]    | a 到 z，而非 m 到 p：[a-lq-z]（减去） 
