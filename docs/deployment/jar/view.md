# 查看Jar文件内容

查看 JAR 文件内容的命令的基本格式是：

```bash
jar tf jar-file
```
参数说明：

* t : 表示要查看 jar 文件的内容
* f : 表示从一个文件查看
* jar-file : 具体的文件路径
* v : 显示文件的大小和上次修改日期信息

同样，tf 没有固定顺序，但是中间不能有空格

## 一个例子

```bash
$ jar tf TicTacToe.jar
META-INF/
META-INF/MANIFEST.MF
TicTacToe$1.class
TicTacToe.class
TicTacToe.java
audio/
audio/beep.au
audio/ding.au
audio/return.au
audio/yahoo1.au
audio/yahoo2.au
example1.html
images/
images/cross.gif
images/not.gif

加 v 输出详细信息

$ jar tvf TicTacToe.jar
     0 Fri May 11 15:19:34 GMT+08:00 2018 META-INF/
    68 Fri May 11 15:19:34 GMT+08:00 2018 META-INF/MANIFEST.MF
   550 Thu Mar 29 07:39:22 GMT+08:00 2018 TicTacToe$1.class
  3705 Thu Mar 29 07:39:22 GMT+08:00 2018 TicTacToe.class
  9584 Thu Mar 29 07:39:22 GMT+08:00 2018 TicTacToe.java
     0 Fri May 11 15:09:34 GMT+08:00 2018 audio/
  4032 Thu Mar 29 07:39:22 GMT+08:00 2018 audio/beep.au
  2566 Thu Mar 29 07:39:22 GMT+08:00 2018 audio/ding.au
  6558 Thu Mar 29 07:39:22 GMT+08:00 2018 audio/return.au
  7834 Thu Mar 29 07:39:22 GMT+08:00 2018 audio/yahoo1.au
  7463 Thu Mar 29 07:39:22 GMT+08:00 2018 audio/yahoo2.au
   424 Thu Mar 29 07:39:22 GMT+08:00 2018 example1.html
     0 Fri May 11 15:09:34 GMT+08:00 2018 images/
   157 Thu Mar 29 07:39:22 GMT+08:00 2018 images/cross.gif
   158 Thu Mar 29 07:39:22 GMT+08:00 2018 images/not.gif
```
