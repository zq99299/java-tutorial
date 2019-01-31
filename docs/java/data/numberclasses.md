# Number 类

使用数字时，大部分时间在代码中使用原始类型。例如：

```java
int i = 500;
float gpa = 3.65f;
byte mask = 0xff;
```

然而，有理由使用对象代替原始类型，Java 平台为每个基本数据类型提供 **包装类** 。这些类将原始类型包装起来。通常情况下，包装是由编译器完成的。

所有数字包装类都是 Number 抽象类的子类：

![](./assets/objects-numberHierarchy.gif)

::: tip
这里 Number 没有讨论其他四个子类。BigDecimal 和 BigInteger 用于高精度计算。AtomicInteger 和 AtomicLong 用于多线程应用程序。
:::

有三个原因可以使用一个 Number 对象而不是原始的：

1. 作为一个期望对象的方法的参数（在处理数字集合时经常使用）。
2. 要使用由类定义的常量（如 MIN_VALUE 和 MAX_VALUE），它们提供数据类型的上限和下限。
3. 使用类方法将值转换为其他基本类型以及从其他基本类型转换值，转换为字符串和从字符串转换，以及在数字系统（十进制，八进制，十六进制，二进制）之间进行转换。

下表列出了所有子类实现 Number 类的实例方法（Markdown 不支持表格合并我也是没有办法）

* 将此 Number 对象的值转换为返回的原始数据类型。

    ```java
    byte byteValue()
    short shortValue()
    int intValue()
    long longValue()
    float floatValue()
    double doubleValue()
    ```
* 将这个 Number 对象与参数进行比较。

    ```java
    int compareTo(Byte anotherByte)
    int compareTo(Double anotherDouble)
    int compareTo(Float anotherFloat)
    int compareTo(Integer anotherInteger)
    int compareTo(Long anotherLong)
    int compareTo(Short anotherShort)
    ```

* 确定这个数字对象是否等于参数。

    如果参数不是 null 并且是相同类型的对象并具有相同的数值，则方法返回 true。
    对 Java API 文档中描述的 Double 和 Float 对象有一些额外的要求。

    ```java
    boolean equals(Object obj)
    ```

每个 Number 类都包含其他方法，这些方法可用于将数字转换为字符串以及在数字系统之间进行转换。
下表列出了 Integer 类中的方法。其他 Number 类的方法是相似的：

| 方法                                        | 描述                                                                                                                                                         |
|---------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| static Integer decode(String s)             | 将字符串解码为整数。可以接受十进制，八进制或十六进制数字的字符串表示作为输入。                                                                               |
| static int parseInt(String s)               | 返回一个整数（仅限十进制）。                                                                                                                                 |
| static int parseInt(String s, int radix)    | 以给定的十进制，二进制，八进制或十六进制（radix 分别等于 10、2、8 或 16）数字的字符串表示形式返回一个整数作为输入。                                          |
| String toString()                           | 返回 Integer 的 String 表示形式。                                                                                                                            |
| static String toString(int i)               | 返回 String 表示指定整数的对象。                                                                                                                             |
| static Integer valueOf(int i)               | 返回一个 Integer 持有指定基元的值的对象。                                                                                                                    |
| static Integer valueOf(String s)            | 返回一个 Integer 持有指定字符串表示的值的对象。                                                                                                              |
| static Integer valueOf(String s, int radix) | 返回一个 Integer 持有指定字符串表示形式的整数值的对象，用 radix 的值进行解析。例如，如果 s=“333” 且 radix = 8，则该方法返回八进制数 333 的十进制整数等效值。 |
