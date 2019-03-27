# 更新Jar文件

Jar 工具提供了一个 u 选项，您可以通过修改它的清单或添加文件来更新现有 Jar 文件的内容。

```bash
jar uf jar-file input-file(s)
```

* u : 表示更新现有的 jar
* f : 通过文件指定
* jar-file : 文件路径
* input-file(s) : 空格分割的多个文件或单个文件

把指定的文件添加到现有的 jar 文件红，jar 中已有文件将被覆盖；也可以指定新添加的文件添加到 jar 中的哪个目录下
参考 [创建 Jar 文件部分](./buil.md)

## 列子

```bash
# 把一个文件添加到
# 这里填写的路径，会被响应的添加到jar中
$ jar uf TicTacToe.jar images/new.gif

比如下面是未添加前的jar内容
| xx.class
 |- images
   |- 1.gif
   |- new.gif     # 这个是新增的
```

使用 -c 更改路径

```bash
$ jar uf TicTacToe.jar -C images new.gif

比如下面是未添加前的 jar 内容
| xx.class
 |- images
   |- 1.gif
 |- new.gif     # 这个是新增的

-c 后面第一个是目录，第二个是文件；看起来很奇怪，看明白了吗；把目录给忽略了；我们执行下面的命令来验证猜想

$ jar uf TicTacToe.jar -C audio new.gif
audio\new.gif: 没有这个文件或目录

居然报错。原来 -c 后面第一个参数是要忽略的目录，第二个参数则是目录下的文件名；
而且是两个参数合并确定一个具体的路径；写到 jar 的时候，把目录给忽略
```
