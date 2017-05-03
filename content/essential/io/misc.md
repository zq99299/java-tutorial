# 其他有用的方法

在本课程中，有一些有用的方法并不适用于其他地方，并在此处介绍。本节包括以下内容：

* 确定MIME类型
* 默认文件系统
* 路径字符串分隔符
* 文件系统的文件存储

## 确定MIME类型

要确定文件的MIME类型，您可能会发现该 [probeContentType(Path)](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#probeContentType-java.nio.file.Path-)方法很有用。例如：
```java
        try {
            Path filename = Paths.get("D:/server.xml");
            String type = Files.probeContentType(filename);
            if (type == null) {
                System.err.format("'%s' has an" + " unknown filetype.%n", filename);
            } else if (!type.equals("text/plain")) {
                System.err.format("'%s' is not" + " a plain text file.%n", filename);
            }
        } catch (IOException x) {
            System.err.println(x);
        }
```