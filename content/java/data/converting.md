# 转换数字和字符串
## 将字符串转换为数字
例如，一个程序经常以字符串对象中的数字数据结束 - 例如用户输入的值。

在Number包的原始数字类型（ Byte， Integer， Double， Float， Long，和 Short）每个提供命名一个类的方法valueOf，一个字符串转换到该类型的一个对象。下面是一个例子，它从命令行获取两个字符串，将它们转换为数字，并对这些值执行算术运算：

```java
// 模拟从命令行启动的，传入了2个参数
         String[] args = new String[]{"4.5", "87.2"};
        // this program requires two
        // arguments on the command line
        if (args.length == 2) {
            // convert strings to numbers
            float a = (Float.valueOf(args[0])).floatValue();
            float b = (Float.valueOf(args[1])).floatValue();

            // 做一些算术
            System.out.println("a + b = " +
                                       (a + b));
            System.out.println("a - b = " +
                                       (a - b));
            System.out.println("a * b = " +
                                       (a * b));
            System.out.println("a / b = " +
                                       (a / b));
            System.out.println("a % b = " +
                                       (a % b));
        } else {
            System.out.println("This program " +
                                       "requires two command-line arguments.");
        }
```

程序输出

```java
a + b = 91.7
a - b = -82.7
a * b = 392.4
a / b = 0.051605508
a % b = 4.5
```