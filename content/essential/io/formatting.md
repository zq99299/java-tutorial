# 格式化

实现格式化的流对象是字符`PrintWriter`流类或 `PrintStream`字节流类的实例。

**注意：** 你可以能需要一个PrintStream实例，System.out and System.err 能返回一个PrintStream实例（更多的请查阅 命令行IO章节），当需要创建格式化的输出流时使用PrintWriter而不是PrintStream。