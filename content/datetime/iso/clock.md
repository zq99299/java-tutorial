# clock
大多基于temporal对象都提供了一个无参数的`now()`方法，它提供了使用系统时钟和默认时区的当前日期和时间。这些基于时间的对象还提供了一个单参数now([clock](https://docs.oracle.com/javase/8/docs/api/java/time/Clock.html))方法，允许您传入另一个时钟。

当前日期和时间取决于时区，对于全球化应用程序，`clock`是确保日期/时间使用正确时区创建所必需的。。因此，虽然Clock类的使用是可选的，但此功能允许您测试您的代码是否适用于其他时区，或者使用时间不变的固定时钟。

Clock是一个抽象类，所以不能创建它的一个实例。以下工厂方法可用于测试。

* Clock.offset（Clock，Duration）返回一个被指定持续时间偏移的时钟。
* Clock.systemUTC（）返回表示格林尼治/ UTC时区的时钟。
* Clock.fixed（Instant，ZoneId）总是返回相同的 Instant。对于这个时钟，时间停滞不前。