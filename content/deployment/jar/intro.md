# 了解签名和验证

Java™平台使您能够对JAR文件进行数字签名。您出于同样的原因对文件进行数字签名，您可以使用钢笔和墨水签署纸质文档 - 让读者知道您编写了文档，或者至少文档已获得您的批准。

例如，当你签署一封信时，每个认可你签名的人都可以确认你写了这封信。同样，当您对文件进行数字签名时，任何“识别”您的数字签名的人都知道该文件来自您。“识别”电子签名的过程称为**验证**。

当JAR文件被签名时，您也可以选择为签名加上时间戳。与在纸质文档上添加日期类似，对签名加上时间标记标识了JAR文件签名的时间。时间戳可用于验证用于签署JAR文件的证书在签名时是否有效。

签名和验证文件的能力是Java平台安全架构的重要组成部分。安全性由运行时有效的安全策略控制。您可以配置该策略以将安全权限授予小程序和应用程序。例如，您可以授予applet执行正常禁止操作的权限，例如读取和写入本地文件或运行本地可执行程序。如果您已经下载了一些由可信实体签署的代码，那么您可以将此事实用作决定分配给代码的安全权限的标准。

一旦您（或您的浏览器）确认小程序来自可信来源，您可以让平台放松安全限制，让小程序执行通常会被禁止的操作。受信任的小程序可以具有由有效的策略文件指定的自由。

Java平台能够签名和验证通过使用特殊的数字称为公共和私有密钥。公钥和私钥是成对出现的，它们扮演着互补的角色。

私钥是可以用来签名文件的电子“笔”。顾名思义，您的私钥只有您自己知道，因此其他人无法“伪造”您的签名。使用您的私钥签名的文件只能通过相应的公钥验证。

但是，公钥和私钥本身不足以真正验证签名。即使您已验证签名文件包含匹配的密钥对，仍然需要某种方法来确认公钥实际上来自它声称来自的签名者。


因此，需要另外一个元素来进行签名和验证工作。该附加元素是签名者在签名的JAR文件中包含的证书。证书是来自公认证书颁发机构的数字签名声明，表明谁拥有特定的公钥。认证机构是实体（通常是专门从事数字安全的公司），在整个行业中都受到信任，为密钥及其所有者签发证书。对于签名的JAR文件，证书指示谁拥有JAR文件中包含的公钥。

当您签署一个JAR文件时，您的公钥将与相关证书一起放入存档中，以便任何想要验证您的签名的人都可以轻松使用它。

总结数字签名：

* 签名者使用私钥签名JAR文件。
* 相应的公钥和它的证书一起被放置在JAR文件中，以便任何想要验证签名的人都可以使用它。

## Digests and the Signature File

在签署JAR文件时，归档文件中的每个文件都会在归档文件清单中给出一个摘要条目。以下是这样一个条目的例子：

```
Name: test/classes/ClassOne.class
SHA1-Digest: TD1GZt8G11dXY2p4olSZPc5Rj64=
```

摘要值是文件内容的哈希或编码表示，就像它们在签名时一样。当且仅当文件本身发生更改时，文件的摘要才会更改。

当签名 JAR文件时，会自动生成签名文件并将其放入JAR文件的META-INF目录中，该目录是包含该存档清单的相同目录。签名文件具有扩展名为.SF的文件名。这是一个签名文件内容的例子：

```
Signature-Version: 1.0
SHA1-Digest-Manifest: h1yS+K9T7DyHtZrtI+LxvgqaMYM=
Created-By: 1.7.0_06 (Oracle Corporation)

Name: test/classes/ClassOne.class
SHA1-Digest: fcav7ShIG6i86xPepmitOVo4vWY=

Name: test/classes/ClassTwo.class
SHA1-Digest: xrQem9snnPhLySDiZyclMlsFdtM=

Name: test/images/ImageOne.gif
SHA1-Digest: kdHbE7kL9ZHLgK7akHttYV4XIa0=

Name: test/images/ImageTwo.gif
SHA1-Digest: mF0D5zpk68R4oaxEqoS9Q7nhm60=
```

如您所见，签名文件包含归档文件的摘要条目，它们与清单中的摘要值条目类似。但是，虽然清单中的摘要值是从文件本身计算的，但签名文件中的摘要值是根据清单中的相应条目计算得出的。签名文件还包含整个清单的摘要值（请参阅上例中的SHA1-Digest-Manifest标题）。


当正在验证已签名的JAR文件时，将重新计算每个文件的摘要并与清单中记录的摘要进行比较，以确保JAR文件的内容自签名以来未发生更改。作为附加检查，重新计算清单文件本身的摘要值，并将其与签名文件中记录的值进行比较。

您可以在JDK™文档的[Manifest Format](https://docs.oracle.com/javase/8/docs/technotes/guides/jar/jar.html#JAR_Manifest)页面上阅读有关签名文件的附加信息 。

## 签名块文件
除签名文件外，在签名 JAR文件时，签名块文件自动放置在META-INF目录中。与清单文件或签名文件不同，签名块文件不可读。

签名块文件包含验证所必需的两个元素：

用签名者的私钥生成的JAR文件的数字签名
包含签名者公钥的证书，供任何想验证签名JAR文件的人使用
签名块文件名通常会有一个.DSA扩展名，表明它们是由默认的数字签名算法创建的。如果使用与某些其他标准算法相关的密钥进行签名，则可以使用其他文件扩展名。


## 相关文档
有关密钥，证书和证书颁发机构的更多信息，请参阅

* [JDK安全工具](https://docs.oracle.com/javase/8/docs/technotes/tools/index.html#security)
* [X.509证书](https://docs.oracle.com/javase/8/docs/technotes/guides/security/cert3.html)

有关Java平台安全体系结构的更多信息，请参阅此相关文档：

* [Java SE中的安全特性](https://docs.oracle.com/javase/tutorial/security/index.html)
* [Java SE安全性](http://www.oracle.com/technetwork/java/javase/tech/index-jsp-136007.html)
* [安全工具](https://docs.oracle.com/javase/8/docs/technotes/tools/index.html#security)