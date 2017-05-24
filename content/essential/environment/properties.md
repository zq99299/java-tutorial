# 属性（properties）
属性是作为键/值对管理的配置值。在每一对中，键和值都是两个 String值。该键标识并用于检索该值，就像变量名称用于检索变量的值一样。例如，能够下载文件的应用程序可能会使用名为“download.lastDirectory”的属性来跟踪最后一次下载所用的目录。

要管理属性，请创建实例 `java.util.Properties`。该类提供了以下方法：

* 将键/值对Properties从流中加载到对象中，
* 从其键中检索一个值，
* 列出key及其value，
* 列举key
* 将属性保存到流。

有关流的介绍，请参阅[基本I / O课程中的 I / O流部分 ](/content/essential/io/streams.md)。
![](/assets/essential/environment/environment-1loads.gif)

* Starting Up

    当应用程序启动时，前三个框中的操作会发生。
    
    1. 首先，应用程序将默认属性从众所周知的位置加载到Properties对象中。通常，默认属性将与应用程序的.class其他资源文件一起存储在磁盘上的文件中。
    2. 接下来，应用程序创建另一个Properties对象，并加载从上次运行应用程序时保存的属性。许多应用程序在每个用户的基础上存储属性，因此此步骤中加载的属性通常位于该应用程序在用户主目录中维护的特定目录中的特定文件中。
    3. 最后，应用程序使用默认和记住的属性来初始化自身。
    
    这里的关键是一致性。
* Running
    
    在执行应用程序期间，用户可能会在“首选项”窗口中更改某些设置，并更新Properties对象以反映这些更改。如果用户更改在以后的会话中被记住，则必须保存它们。
    
* Exiting

    退出后，应用程序将属性保存到其知名位置，以便在下次启动应用程序时再次加载该属性。
    
## 设置属性对象
以下Java代码执行前面部分描述的前两个步骤：加载默认属性并加载记住的属性：
```java
. . .
// 创建并加载默认值
Properties defaultProps = new Properties();
FileInputStream in = new FileInputStream("defaultProperties");
defaultProps.load(in);
in.close();

// 创建应用程序属性
Properties applicationProps = new Properties(defaultProps);

// 现在加载属性
in = new FileInputStream("appProperties");
applicationProps.load(in);
in.close();
. . .
```

首先，应用程序设置一个默认`Properties`对象。此对象包含要在其他地方未显式设置值时要使用的一组属性。然后，`load`方法从名为defaultProperties的文件读取默认值。

接下来，应用程序使用不同的构造函数创建第二个`Properties`对象`applicationProps`，其中包含默认值`defaultProps`。当检索到属性时，默认值将起作用。如果找不到该属性`applicationProps`，则搜索其默认列表。

最后，代码`applicationProps`从一个名为的文件中加载一组属性`appProperties`。该文件中的属性是从上次调用应用程序中保存的属性，如下一节所述。