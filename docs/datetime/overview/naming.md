# 方法命名约定

Date-Time API在丰富的类中提供了丰富的方法。尽可能使方法名称在类之间保持一致。例如，许多类提供了一种`now`的方法，该方法捕获与该类相关的当前时刻的日期或时间值。有从允许从一个类转换到另一个类的方法。

还有关于方法名称前缀的标准化。由于Date-Time API中的大多数类都是不可变的，因此API不包含set方法。(在创建之后，不可变对象的值不能改变) 下表列出了常用的前缀：


| Prefix | Method Type | Use
| ------|--------|----
| of	| static factory	| 创建工厂主要验证输入参数的实例，而不是转换它们。
| from	| static factory	| 将输入参数转换为目标类的实例，这可能会导致输入信息丢失。
| parse	| static factory	| 分析输入字符串以生成目标类的实例。
| format| instance	| 使用指定的格式化程序来格式化时间对象中的值以生成字符串。
| get	| instance	| 返回目标对象状态的一部分。
| is	| instance	| 查询目标对象的状态。
| with	| instance	| 返回一个元素已更改的目标对象的副本; 类似set方法，不过是返回一个新的对象
| plus	| instance	| 加上时间量返回目标对象的副本。
| minus	| instance	| 减去时间量返回目标对象的副本。
| to	| instance	| 将此对象转换为另一种类型
| at	| instance	|将此对象与另一个组合起来。