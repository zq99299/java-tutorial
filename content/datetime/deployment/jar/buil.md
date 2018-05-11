# 创建Jar文件

创建JAR文件的基本格式是：

```
jar cf jar-file input-file(s)
```

参数解释：

* c : 表示要创建一个jar文件
* f : 表示要输出到一个文件中
* jar-file : 生成jar文件的具体名称。惯例是xxx.jar,后缀名称不是强制的
* input-file\(s\) : 可以输入一个或多个文件，包含`*`通配符,如果是一个目录则递归添加到jar归档中

c和f选项可以按任意顺序出现，但是它们之间不应该有任何空格。

这个命令将生成一个压缩JAR文件并将其放入当前目录中。该司令部还将为JAR存档生成一个默认的清单文件。

> **注意:**
JAR文件中的元数据，例如条目名称、注释和清单的内容，必须是UTF8编码。


您可以将这些附加选项添加到基本命令的cf选项中：

| option | 描述
|--------|------
| v | 输出每个被添加到jar中的文件详细路径
| 0 | 不压缩jar文件
| M | 不生成默认的清单文件
| m | 使用现有清单文件，命令格式`jar cmf jar-file existing-manifest input-file(s)`; 清单文件必须以newLine或则回车结束，否则不会正确解析
| -c| 在执行命令期间更改目录。后面有例子解说

**注意:**
当你创建一个JAR文件时，创建的时间存储在JAR文件中。因此，即使JAR文件的内容没有改变，当您多次创建JAR文件时，产生的文件也不是完全相同的。当您在构建环境中使用JAR文件时，您应该意识到这一点。建议您在清单文件中使用版本化信息，而不是创建时间，来控制JAR文件的版本。请参阅设置包版本信息部分。

## 一个例子


> 官网教程的实例教程源码下载：http://download.oracle.com/otn-pub/java/jdk/8u171-b11-demos/512cd62ec5174c3487ac17c61aaa89e8/jdk-8u171-windows-x64-demos.zip

当前要演示的例子在demo\applets\TicTacToe 中，在该目录运行以下命令

```bash
jar cvf TicTacToe.jar TicTacToe.class audio images
```
由于使用了v命令，使用会详细的输出以下信息
```
$ jar cvf TicTacToe.jar TicTacToe.class audio images
已添加清单
正在添加: TicTacToe.class(输入 = 3705) (输出 = 2232)(压缩了 39%)
正在添加: audio/(输入 = 0) (输出 = 0)(存储了 0%)
正在添加: audio/beep.au(输入 = 4032) (输出 = 3572)(压缩了 11%)
正在添加: audio/ding.au(输入 = 2566) (输出 = 2055)(压缩了 19%)
正在添加: audio/return.au(输入 = 6558) (输出 = 4401)(压缩了 32%)
正在添加: audio/yahoo1.au(输入 = 7834) (输出 = 6985)(压缩了 10%)
正在添加: audio/yahoo2.au(输入 = 7463) (输出 = 4607)(压缩了 38%)
正在添加: images/(输入 = 0) (输出 = 0)(存储了 0%)
正在添加: images/cross.gif(输入 = 157) (输出 = 160)(压缩了 -1%)
正在添加: images/not.gif(输入 = 158) (输出 = 161)(压缩了 -1%)
```

默认是压缩的，可以使用0不压缩; 在文件小的情况下不压缩会比压缩好，业务浏览器不用解压了；大的情况下压缩后能节约网络的传输时间

```java
$ jar cvf0 TicTacToe.jar TicTacToe.class audio images
已添加清单
正在添加: TicTacToe.class(输入 = 3705) (输出 = 3705)(存储了 0
正在添加: audio/(输入 = 0) (输出 = 0)(存储了 0%)
正在添加: audio/beep.au(输入 = 4032) (输出 = 4032)(存储了 0%)
正在添加: audio/ding.au(输入 = 2566) (输出 = 2566)(存储了 0%)
正在添加: audio/return.au(输入 = 6558) (输出 = 6558)(存储了 0
正在添加: audio/yahoo1.au(输入 = 7834) (输出 = 7834)(存储了 0
正在添加: audio/yahoo2.au(输入 = 7463) (输出 = 7463)(存储了 0
正在添加: images/(输入 = 0) (输出 = 0)(存储了 0%)
正在添加: images/cross.gif(输入 = 157) (输出 = 157)(存储了 0%
正在添加: images/not.gif(输入 = 158) (输出 = 158)(存储了 0%)
```

还可以使用通配符
```bash
jar cvf TicTacToe.jar *
```

还可以使用-C指定目标目录归档在jar中的路径
```bash
jar cf ImageAudio.jar -C images . -C audio .
```



