# PatternSyntaxException 类的方法

 [PatternSyntaxException](https://docs.oracle.com/javase/8/docs/api/java/util/regex/PatternSyntaxException.html)是未经检查的异常，指示正则表达式模式中的语法错误。PatternSyntaxException类提供了以下方法来帮助你确定是什么出了问题：
 
* `public String getDescription()`：检索错误的描述。
* `public int getIndex()`：检索错误索引。
* `public String getPattern()`：检索错误的正则表达式模式。
* `public String getMessage()`：返回一个多行字符串，其中包含语法错误及其索引的描述，错误的正则表达式模式以及模式中错误索引的可视指示。

检查异常，更新之前的测试工具类,这里就更新之前一直使用的函数就行了
```java
 public static void regexTest(String regex, String input) {
    System.out.println("===  " + regex);
    Pattern pattern = null;
    Matcher matcher = null;
    try {
        pattern = Pattern.compile(regex);
        matcher = pattern.matcher(input);
    } catch (PatternSyntaxException pse) {
        System.out.format("有一个问题，正则表达式: %n");
        System.out.format("模式是: %s%n",
                          pse.getPattern());
        System.out.format("描述是: %s%n",
                          pse.getDescription());
        System.out.format("消息是: %s%n",
                          pse.getMessage());
        System.out.format("索引为: %s%n",
                          pse.getIndex());
        System.exit(0);
    }
    boolean found = false;
    while (matcher.find()) {
        // 索引 包含头 不包含尾
        System.out.format("我发现文本中的" +
                                  " \"%s\" " +
                                  "在开始索引 %d 和 结束索引 %d.%n",
                          matcher.group(),
                          matcher.start(),
                          matcher.end());
        found = true;
    }
    if (!found) {
        System.out.format("No match found.%n");
    }
}
```