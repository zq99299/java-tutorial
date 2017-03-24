# 数据流
数据流支持原始数据类型值的二进制I / O操作，`boolean`, `char`, `byte`, `short`, `int`, `long`, `float`, and `double`以及字符串值。所有数据流都实现 `DataInput`接口或 `DataOutput`接口。本节重点介绍这些接口中最广泛使用的实现， `DataInputStream`以及 `DataOutputStream`。

该 DataStreams示例通过写出一组数据记录来演示数据流，然后再次读取它们。每个记录由与发票上的项目相关的三个值组成，如下表所示：

| 订单记录	| 数据类型	| 数据描述	| 输出方法	| 输入法方法| 样品值
|--------------------------------------
| 1	| double	| 项目价格	| DataOutputStream.writeDouble	| DataInputStream.readDouble  | 19.99
| 2	| int	        | 单位数        | DataOutputStream.writeInt	| DataInputStream.readInt	| 12
| 3	| String	| 商品描述	| DataOutputStream.writeUTF	| DataInputStream.readUTF      | Java T-Shirt"
