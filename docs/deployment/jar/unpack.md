# 提取/解压Jar文件内容

用于提取JAR文件内容的基本命令是：

```bash
jar xf jar-file [archived-file(s)]
```

命令和参数：

* x : 表示要提取；extract的缩写
* f : 从文件
* jar-file : 具体的文件
* archived-file(s) : 可选参数，要提取的指定文件由空格隔开，不指定则提取所有的文件

解压到当前文件路径，需要小心，如果当前文件有同名文件则会被覆盖；

## 一个例子

使用之前的jar；要注意，解压的时候是不包含一个目录名的；

```bash
$ jar xf TicTacToe.jar TicTacToe.class images/cross.gif

会把TicTacToe.jar中的以下文件解压到当前目录
TicTacToe.class 
images/cross.gif

不加参数则解压所有的文件
$ jar xf TicTacToe.jar
```