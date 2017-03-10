# StringBuilder

![](/assets/lang/StringBuild接口和继承接口.png)

![](/assets/lang/StringBuild实现和继承的方法.png)

从图上可以看到关系，这里说一下：实线蓝色箭头是继承类，虚线绿色箭头是实现接口。

图是用idea中在你要查看的类名上点击：diagrams 功能查看的。后续文章将会再贴出详细的继承方法图了。

先看官网文档这几个类的意思和区别：部分类常见的也就不说明了。

# 接口和继承类简要说明
## Appendable
能够被添加 char 序列和值的对象。要添加的字符应该是有效的 Unicode 字符
Appendable append(char c) 
          向此 Appendable 添加指定字符。 
 Appendable append(CharSequence csq) 
          向此 Appendable 添加指定的字符序列。 
 Appendable append(CharSequence csq, int start, int end) 
          向此 Appendable 添加指定字符序列的子序列。 

## AbstractStringBuilder




