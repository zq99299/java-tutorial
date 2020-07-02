# 识别可用的语言环境

您可以创建具有 **有效语言和国家/地区代码** 的 **任意组合** 的 Locale，但这 **并不意味着您可以使用它**。**请记住**，**Locale 对象只是一个标识符**。将 Locale 对象传递给其他对象，然后 **由这些对象进行实际工作**。这些其他对象（我们称之为 **Locale 敏感对象**）不知道如何处理所有可能 Locale 定义。

若要找出 `Locale` 对语言环境敏感的类可以识别的定义类型，请调用该 `getAvailableLocales` 方法。如找出 DateFormat 支持的 Locale 定义

```java
import java.util.*;
import java.text.*;

public class Available {
    static public void main(String[] args) {
        Locale list[] = DateFormat.getAvailableLocales();
        for (Locale aLocale : list) {
            System.out.println(aLocale.toString());
        }
    }
}
```

输出信息如下，语言和国家/地区代码通过下划线连接

```java
ar_EG
be_BY
bg_BG
ca_ES
cs_CZ
da_DK
de_DE
...
```

还可以使用 `getDisplayName()` 方法返回更友好的本地名称

```java
Locale list[] = DateFormat.getAvailableLocales();
for (Locale aLocale : list) {
    System.out.println(aLocale.toString() + "," + aLocale.getDisplayName());
}
```

如下打印的：语言、国家代码对应的中文名称

```java
ar_AE,阿拉伯文 (阿拉伯联合酋长国)
ar_JO,阿拉伯文 (约旦)
ar_SY,阿拉伯文 (叙利亚)
hr_HR,克罗地亚文 (克罗地亚)
fr_BE,法文 (比利时)
es_PA,西班牙文 (巴拿马)
mt_MT,马耳他文 (马耳他)
```

`getDisplayName(Locale locale)`  还接受一个指定的 Locale，打印出指定的语言环境的名称。