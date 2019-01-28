# 总结

您使用的包装类，Byte，Double，Float，Integer，Long或Short-包裹一个原始类型在对象中。Java编译器会在需要时自动为您封装（框）原始类型，并在必要时对其进行拆箱。

Number类包括常量和常用的类方法。MIN_VALUE和MAX_VALUE 常量，最大和最小值。byteValue，shortValue和类似的方法将一个数值类型转到另一个。valueOf方法将字符串转换为数字，toString方法将数字转换为字符串。

要格式化包含输出数字的字符串，可以使用PrintStream中的printf()或format()。或者，您可以使用NumberFormat类来使用模式自定义数字格式。

Math类包含各种数学方法，用于执行数学函数，其中包括指数，对数，和三角函数的方法。Math还包括random()用于生成随机数的基本算术函数，如绝对值和舍入，以及方法。