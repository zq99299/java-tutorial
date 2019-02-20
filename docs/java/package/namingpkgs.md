# 命名包

随着全世界的程序员使用 Java 编程语言编写类和接口，许多程序员可能会为不同的类型使用相同的名称。
实际上，前面的例子就是这样的：它在 java.awt 包中已经有一个 Rectangle 类的时候定义了一个 Rectangle 类。
尽管如此，编译器允许两个类具有相同的名称（如果它们位于不同的包中）。每个 Rectangle 类的完全限定名称包括包名称。
也就是说，完全限定的名称 graphics 中的类 Rectangle 限定名称是 graphics.Rectangle，
和的完全限定名 java.awt 中的类 Rectangle，限定名称是 java.awt.Rectangle。

除非两个独立的程序员使用相同的名字来包装它。

## 命名约定

包名称全部写成小写，以避免与类或接口的名称冲突。

公司使用反向的互联网域名来开始他们的软件包名称，例如，com.example.mypackage

单个公司内发生的名称冲突需要在该公司内按照惯例进行处理，也许通过在公司名称（例如 com.example.region.mypackage）之后包含区域或项目名称来处理。

Java 语言中的包本身是以 java. 或开始的 javax.

在某些情况下，互联网域名可能不是有效的软件包名称。如果域名包含连字符或其他特殊字符，
如果包名称以非法用作 Java 名称开头的数字或其他字符开头，或者包名称包含保留的 Java 关键字，
如「int」。在这种情况下，建议的约定是增加一个下划线。例如：

Domain Name                 | Package Name Prefix
----------------------------|----------------------------
hyphenated-name.example.org | `org.example.hyphenated_name`
example.int                 | `int_.example`
123name.example.com         | `com.example._123name`
