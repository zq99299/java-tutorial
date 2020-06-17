# 下载扩展

这个是 `java.applet.Applet;` 则知识点，笔者跳过；

大概意思是：可以通过以下两种请求头，从远程下载，当 `jre/lib/ext` 目录中没有这个包的时候，就会从远程下载。

- Class-Path ： 如 `Class-Path: RectangleArea.jar` 
- Extension-List 