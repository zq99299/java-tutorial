# 网络资源国际化

在现代 Internet 社区中，许多用户不再满足于仅使用 ASCII 符号来标识域名或 web 资源。例如，他们希望能够使用阿拉伯文或中文的本地字符注册一个新域。这就是为什么网络资源国际化是万维网拓宽视野的基石。

本课描述了网络域名资源的国际化。

## 国际化域名

历史上，一个互联网域名只包含 ASCII 符号。随着 Internet 的普及和在世界各地的采用，支持域名国际化变得很有必要，特别是支持包含 Unicode 字符的域名。

采用 IDNA (Internationalizing Domain Names in Applications, IDNA) 机制作为标准，将 Unicode 字符转换为标准 ASCII域名，从而保持域名系统的稳定性。该系统执行查找服务，将用户友好的名称转换为网络地址。

国际化域名的示例：

- `http://清华大学.cn`
- `http://www.транспорт.com`

如果访问这些链接，将会看到地址栏中显示的 Unicode 域名被 ASCII 字符串替换。

为了在应用程序中实现类似的功能，java.net.IDN 类提供了在 ASCII 和非 ASCII 格式之间转换域名的方法。

| Method                                                       | Purpose                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`toASCII(String)`](https://docs.oracle.com/javase/8/docs/api/java/net/IDN.html#toASCII-java.lang.String-) [`toASCII(String, flag)`](https://docs.oracle.com/javase/8/docs/api/java/net/IDN.html#toASCII-java.lang.String-int-) | 在向域名解析系统发送 IDN 或向需要 ASCII 字符的文件(如 DNS 主文件)写入 IDN 之前使用。<br/>如果输入字符串不符合 RFC 3490，这些方法会抛出一个 IllegalArgumentException。 |
| [`toUnicode(String)`](https://docs.oracle.com/javase/8/docs/api/java/net/IDN.html#toUnicode-java.lang.String-) [`toUnicode(String, flag)`](https://docs.oracle.com/javase/8/docs/api/java/net/IDN.html#toUnicode-java.lang.String-int-) | 在向用户显示名称时使用，例如从 DNS 区域获得的名称。<br/>此方法将字符串从 ASCII 兼容编码(ACE) 转换为 Unicode 代码点。<br/>这种方法永远不会失败;<br/>在出现错误时，输入字符串保持不变，并且返回时未修改。 |

可选的标志参数指定转换过程的行为。

- ALLOW_UNASSIGNED 标志允许包含 Unicode 3.2 中未分配的代码点。
- USE_STD3_ASCII_RULES 标志确保 STD-3 ASCII 规则得到遵守。

这些标志可以单独使用，也可以通过 `|` 一起使用。如果这两个标志都不需要，则使用方法的单参数版本。

