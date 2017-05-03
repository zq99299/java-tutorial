# 问题和练习 ： 基本I/O

## 问题

1. 你将用什么类和方法来读取位于大文件末端附近已知位置的几条数据？

2. 在调用format时，指示新行的最佳方式是什么？

3. 如何确定文件的MIME类型？

4. 您将用什么方法来确定文件是否是符号链接？

### 答案
1. Files.newByteChannel返回一个实例SeekableByteChannel，允许您从（或写入）文件中的任何位置读取。 [随机访问文件](/content/essential/io/rafs.md)
2. 使用 `%n` 参数 而不是 `\n` [格式化](//content/essential/io/formatting.md) 
3. `Files.probeContentType`方法使用平台的底层文件类型检测器来评估和返回MIME类型。 [其他有用的方法](/content/essential/io/misc.md)
4. `Files.isSymbolicLink`方法。[ 符号链接或其他](//content/essential/io/links.md)