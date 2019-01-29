# 其他配置实用程序

这是一些其他配置实用程序的摘要。

的首选项API允许应用程序存储和在与实现相关的后备存储器检索配置数据。支持异步更新，并且可以通过多个线程甚至多个应用程序安全地更新同一组首选项。有关详细信息，请参阅“ [首选项API指南](https://docs.oracle.com/javase/8/docs/technotes/guides/preferences/index.html)”。

部署在JAR存档中的应用程序使用清单来描述存档的内容。有关更多信息，请参阅[JAR文件](http://docs.oracle.com/javase/tutorial/deployment/jar/index.html)中的 [打包程序](http://docs.oracle.com/javase/tutorial/deployment/jar/index.html)课程。

配置Java Web Start应用包含在JNLP文件。有关更多信息，请参阅[ Java Web Start课程](http://docs.oracle.com/javase/tutorial/deployment/webstart/index.html)。

配置Java插件小程序的部分被用来嵌入在网页中applet的HTML标记来确定。根据小应用程序和浏览器，这些标签可以包括`<applet>，<object>，<embed>，和<param>`。有关更多信息，请参阅 Java Applet课程。[](http://docs.oracle.com/javase/tutorial/deployment/applet/index.html)

该课程 java.util.ServiceLoader提供了一个简单的服务提供者设施。服务提供者是一种服务的实现 - 一组众所周知的接口和（通常是抽象的）类。服务提供商中的类通常实现接口并对服务中定义的类进行子类化。服务提供商可以作为扩展安装（请参阅 [扩展机制](http://docs.oracle.com/javase/tutorial/ext/index.html)）。提供商也可以通过将它们添加到类路径或其他平台特定方式来提供。
