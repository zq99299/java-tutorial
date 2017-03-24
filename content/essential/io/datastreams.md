# 数据流
数据流支持原始数据类型值的二进制I / O操作，`boolean`, `char`, `byte`, `short`, `int`, `long`, `float`, and `double`以及字符串值。所有数据流都实现 `DataInput`接口或 `DataOutput`接口。本节重点介绍这些接口中最广泛使用的实现， `DataInputStream`以及 `DataOutputStream`。

该 DataStreams示例通过写出一组数据记录来演示数据流，然后再次读取它们。每个记录由与发票上的项目相关的三个值组成，如下表所示：

| 订单记录	| 数据类型	| 数据描述	| 输出方法	| 输入法方法| 样品值
|--------------------------------------
| 1	| double	| 项目价格	| DataOutputStream.writeDouble	| DataInputStream.readDouble  | 19.99
| 2	| int	        | 单位数        | DataOutputStream.writeInt	| DataInputStream.readInt	| 12
| 3	| String	| 商品描述	| DataOutputStream.writeUTF	| DataInputStream.readUTF      | Java T-Shirt"


```java
public class DataStreams {
    // 定义一些模拟数据
    static final String dataFile = "invoicedata";

    static final double[] prices = {19.99, 9.99, 15.99, 3.99, 4.99};
    static final int[] units = {12, 8, 13, 29, 50};
    static final String[] descs = {"Java T-shirt",
            "Java Mug",
            "Duke Juggling Dolls",
            "Java Pin",
            "Java Key Chain"};

    public static void main(String[] args) throws IOException {
        DataOutputStream out = null;

        try {
            // 打开输出流，由于DataOutputStream只能将其创建为现有字节流对象的包装器，因此提供缓冲的文件输出字节流。
            out = new DataOutputStream(new BufferedOutputStream(new FileOutputStream(dataFile)));

            // 把值写入输出流中
            for (int i = 0; i < prices.length; i++) {
                out.writeDouble(prices[i]);
                out.writeInt(units[i]);
                //该writeUTF方法String以UTF-8的修改形式写出值。这是一个可变宽度的字符编码，对于常见的西方字符只需要一个字节。
                out.writeUTF(descs[i]);
            }
        } finally {
            out.close();
        }

        DataInputStream in = null;
        double total = 0.0;
        try {
            in = new DataInputStream(new BufferedInputStream(new FileInputStream(dataFile)));

            double price;
            int unit;
            String desc;

            try {
                while (true) {
                    price = in.readDouble();
                    unit = in.readInt();
                    desc = in.readUTF();
                    System.out.format("You ordered %d units of %s at $%.2f%n",
                                      unit, desc, price);
                    total += unit * price;
                }
            } catch (EOFException e) {
            }
            System.out.format("For a TOTAL of: $%.2f%n", total);
        } finally {
            in.close();
        }
    }
}
```

需要特别注意的是：输入流判断是否结束，不是按普通流那样判断一个返回值，而是通过：`EOFException`异常。
此异常主要被数据输入流用来表明到达流的末尾。注意，其他许多输入操作返回一个特殊值表示到达流的末尾，而不是抛出异常。 