# 预定义字符类

[Pattern](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html) API包含了一些有用的**预定义的字符类**，他提供了常用的正则表达式的简写

| 构造	| 描述
| --------------
| .	| 任何字符（可能或可能不匹配行终止符）
| \d	| 数字： [0-9]
| \D	| 非数字： [^0-9]
| \s	| 空白字符： [ \t\n\x0B\f\r]
| \S	| 非空格字符： [^\s]
| \w	| 字词： [a-zA-Z_0-9]
| \W	| 非字词： [^\w]