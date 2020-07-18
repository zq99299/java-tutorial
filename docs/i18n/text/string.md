# 字节编码和字符串

如果 **字节数组包含非 Unicode 文本**，您可以使用 **字符串构造函数** 方法之一 **将该文本转换为 Unicode**。相反，您可以将字符串对象转换为使用该字符串的非 unicode 字符的字节数组。调用 String.getBytes 方法在调用这些方法时，将 **编码标识符（encoding ）** 指定为参数之一。

下面的示例在 UTF-8 和 Unicode 之间转换字符。UTF-8 是一种 Unicode 传输格式，对于 UNIX 文件系统是安全的。

首先创建一个包含 Unicode 的字符串

```java
String original = new String("A" + "\u00ea" + "\u00f1" + "\u00fc" + "C");
```

打印 original 时，显示

```
AêñüC
```

要将字符串对象转换为 UTF-8，调用 getBytes 方法并指定适当的编码标识符作为参数。getBytes 方法返回 UTF-8 格式的字节数组。

若要从非 unicode 字节数组创建字符串对象，请使用编码参数调用字符串构造函数。做这些调用的代码是封闭在一个 try 块，以防指定的编码是不支持的：

```java
try {
 // 将 unicode 字符串转成 utf8 字节数组
    byte[] utf8Bytes = original.getBytes("UTF8");
    // 将 unicode 字符串转成默认编码（笔者这里也是 utf8） 字节数组
    byte[] defaultBytes = original.getBytes();

    //
    String roundTrip = new String(utf8Bytes, "UTF8");
    System.out.println("roundTrip = " + roundTrip);

    System.out.println();
    // 打印 unicode 转成 utf8 的字节数组
    printBytes(utf8Bytes, "utf8Bytes");
    System.out.println();
    printBytes(defaultBytes, "defaultBytes");
} 
catch (UnsupportedEncodingException e) {
    e.printStackTrace();
}
```

打印出 utf8Bytes 和 defaultBytes 数组中的值，以演示重要的一点：**转换后的文本的长度可能与源文本的长度不同。**  一些 Unicode 字符可以转换成单个字节，另一些可以转换成成对或三个一组字节。

```java
public static void printBytes(byte[] array, String name) {
    for (int k = 0; k < array.length; k++) {
        System.out.println(name + "[" + k + "] = " + "0x" +
            UnicodeFormatter.byteToHex(array[k]));
    }
}
```

完整程序如下：

```java
import java.io.UnsupportedEncodingException;

import java.io.*;
import java.util.*;

public class StringConverter {

    public static void printBytes(byte[] array, String name) {
        for (int k = 0; k < array.length; k++) {
            System.out.println(name + "[" + k + "] = " + "0x" +
                    UnicodeFormatter.byteToHex(array[k]));
        }
    }

    public static void main(String[] args) {

        System.out.println(System.getProperty("file.encoding"));
        String original = new String("A" + "\u00ea" + "\u00f1"
                + "\u00fc" + "C");

        System.out.println("original = " + original);
        System.out.println();

        try {
            // 将 unicode 字符串转成 utf8 字节数组
            byte[] utf8Bytes = original.getBytes("UTF8");
            // 将 unicode 字符串转成默认编码（笔者这里也是 utf8） 字节数组
            byte[] defaultBytes = original.getBytes();

            //
            String roundTrip = new String(utf8Bytes, "UTF8");
            System.out.println("roundTrip = " + roundTrip);

            System.out.println();
            // 打印 unicode 转成 utf8 的字节数组
            printBytes(utf8Bytes, "utf8Bytes");
            System.out.println();
            printBytes(defaultBytes, "defaultBytes");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

    } // main

}

```

工具类

```java

import java.io.*;

public class UnicodeFormatter {

    static public String byteToHex(byte b) {
        // Returns hex String representation of byte b
        char hexDigit[] = {
                '0', '1', '2', '3', '4', '5', '6', '7',
                '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'
        };
        char[] array = {hexDigit[(b >> 4) & 0x0f], hexDigit[b & 0x0f]};
        return new String(array);
    }

    static public String charToHex(char c) {
        // Returns hex String representation of char c
        byte hi = (byte) (c >>> 8);
        byte lo = (byte) (c & 0xff);
        return byteToHex(hi) + byteToHex(lo);
    }

} // class
```

输出如下

```java
utf8Bytes[0] = 0x41
utf8Bytes[1] = 0xc3
utf8Bytes[2] = 0xaa
utf8Bytes[3] = 0xc3
utf8Bytes[4] = 0xb1
utf8Bytes[5] = 0xc3
utf8Bytes[6] = 0xbc
utf8Bytes[7] = 0x43
defaultBytes[0] = 0x41
defaultBytes[1] = 0xea
defaultBytes[2] = 0xf1
defaultBytes[3] = 0xfc
defaultBytes[4] = 0x43
```

以上输出不是笔者本地的输出结果，因为笔者本地环境的默认 Locale 就是 UTF8，所以他们输出是一样的

