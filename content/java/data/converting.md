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

> 注意：  每个Number包装原始数字类型的子类也提供了一个parseXXXX()方法（例如，parseFloat()），可用于将字符串转换为基本数字。由于返回的是原始类型而不是对象，因此该parseFloat()方法比valueOf()方法更直接。例如，在ValueOfDemo程序中，我们可以使用：
```java
float a = Float.parseFloat(args[0]);
float b = Float.parseFloat(args[1]);
```

## 将数字转换为字符串
有时您需要将数字转换为字符串，因为您需要对其字符串形式的值进行操作。有几个简单的方法可以将数字转换为字符串：

```java
int i;
// 用空字符串 + 数字
String s1 = "" + i;

或

String s2 = String.valueOf(i);
```

每个Number子类都包含一个类方法，toString()它将把它的基本类型转换为一个字符串。例如：

```java
int i;
double d;
String s3 = Integer.toString(i); 
String s4 = Double.toString(d); 
```

示例使用该toString方法将数字转换为字符串。程序然后使用一些字符串方法来计算小数点前后的位数：

```java
  public static void main(String[] args) {
        double d = 858.48;
        String s = Double.toString(d);
        
        int dot = s.indexOf('.');
        
        System.out.println(dot + " digits " +
            "before decimal point.");
        System.out.println( (s.length() - dot - 1) +
            " digits after decimal point.");
    }
```

输出

```java
3 digits before decimal point.
2 digits after decimal point.
```