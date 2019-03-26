# Contributing to Java-tutorial

## 关于排版 

排版遵循 [中文文案排版指北](https://github.com/zq99299/chinese-copywriting-guidelines) ，
可以让文章整体看起来很舒服。所以尽量遵循该排版规则

## 关于图片存储

```
|- chapter
  |- git
    |- assets    # 图片和当前编辑文件在同一目录的 assets 中
      |- imageA  
      |- imageB
    |- github.md   
```

建议使用 Atom 编辑器中的 markdown-img-paste 插件，
该插件最方便的在于只要复制图片，然后使用快捷键 ctrl + shift + v 粘贴图片， 就完成了 Markdown 的图片插入，
默认保存在当前文件的 assets 中。

## 经验

经历过单独在 csdn 发布 -> 使用 Gitbook 发布 -> 再把部分 Gitbook 转换成 vuerpess -> 单独写 md 的经历总结出来：

- 图片和 md 文档在同目录保存，就近原则
- 图片路径使用相对路径如 `./imageA.png`
- 文档中的相关引用路径都使用相对路径
- 良好的目录组织

以上几点对于移植还是单独在 gitHub 上阅读都比较方便

## 纠正与错误
有相关排版或则翻译不清楚的，可以提交 issues
