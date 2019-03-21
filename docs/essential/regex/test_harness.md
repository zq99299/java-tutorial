# 测试

本节定义了一个可重用的测试工具， RegexTestHarness.java 用于探索此 API 支持的正则表达式结构。
运行此代码的命令是 java RegexTestHarness; 如果没有在命令行中输入参数。应用程序反复循环，
提示用户正则表达式和输入字符串。使用此测试工具是可选的，但您可能会发现方便查看以下页面中讨论的测试用例。

```java
public class RegexTestHarness {
    public static void main(String[] args) {
        Console console = System.console();
        if (console == null) {
            System.err.println("No console.");
            System.exit(1);
        }
        while (true) {

            Pattern pattern =
                    Pattern.compile(console.readLine("%nEnter your regex: "));

            Matcher matcher =
                    pattern.matcher(console.readLine("Enter input string to search: "));

            boolean found = false;
            while (matcher.find()) {
                console.format("I found the text" +
                                       " \"%s\" starting at " +
                                       "index %d and ending at index %d.%n",
                               matcher.group(),
                               matcher.start(),
                               matcher.end());
                found = true;
            }
            if (!found) {
                console.format("No match found.%n");
            }
        }
    }

    @Test
    public void test() {
        //  在文本中：这里的列子是： 查找 ab 或则 b
        regexTest("a*b", "abxbbbbbbb");
    }

    public static void regexTest(String regex, String input) {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
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
}
```

为了方便在 ide 中使用，我编写了 regexTest 函数 和 test 测试例子。输出结果如下：

```bash
我发现文本中的 "ab" 在开始索引 0 和 结束索引 2.
我发现文本中的 "b" 在开始索引 3 和 结束索引 4.
我发现文本中的 "b" 在开始索引 4 和 结束索引 5.
我发现文本中的 "b" 在开始索引 5 和 结束索引 6.
我发现文本中的 "b" 在开始索引 6 和 结束索引 7.
我发现文本中的 "b" 在开始索引 7 和 结束索引 8.
我发现文本中的 "b" 在开始索引 8 和 结束索引 9.
我发现文本中的 "b" 在开始索引 9 和 结束索引 10.
```
