# 总结

您使用的包装类 Byte、Double、Float、Integer、Long 或 Short 包裹一个原始类型在对象中。
Java 编译器会在需要时自动为您封装原始类型，并在必要时对其进行拆箱。

Number 类包括常量和常用的类方法。MIN_VALUE 和 MAX_VALUE 常量，最大和最小值。
byteValue、shortValue 和类似的方法将一个数值类型转到另一个。valueOf 方法将字符串转换为数字，toString 方法将数字转换为字符串。

要格式化包含输出数字的字符串，可以使用 PrintStream 中的 `printf()` 或 `format()` 。
或者，您可以使用 NumberFormat 类来使用模式自定义数字格式。

Math 类包含各种数学方法，用于执行数学函数，其中包括指数，对数，和三角函数的方法。
Math 包括 `random()` 用于生成随机数的基本算术函数，如绝对值和舍入，以及方法。
