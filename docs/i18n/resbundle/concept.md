# 关于 ResourceBundle 类

## ResourceBundle 与 Locale 的关系

从概念上讲，每个`ResourceBundle`是一组共享相同基本 name 的相关子类。下面的列表显示了一组相关的子类，`ButtonLabel`是基本 name。基本 name 后面的字符表示语言 code，国家 code 和变体。

```
ButtonLabel
ButtonLabel_de
ButtonLabel_en_GB
ButtonLabel_fr_CA_UNIX
```

比如，`ButtonLabel_en_GB`,  en 表示英语， GB 表示英国。

要选择适当的 `ResourceBundle`，请调用 `ResourceBundle.getBundle` 方法。下面例子为 法国语言、加拿大国家、UNIX 平台 的 Locale 匹配了 `ResourceBundle`

```java
Locale currentLocale = new Locale("fr", "CA", "UNIX");
ResourceBundle introLabels = ResourceBundle.getBundle("ButtonLabel", currentLocale);
```

如果指定语言环境的 ResourceBundle 类不存在，getBundle 将尝试查找最接近的匹配项。例如，如果`ButtonLabel_fr_CA_UNIX` 是想要的类，默认的语言环境是 `en_US`， getBundle 会按照以下顺序查找类：

```java
ButtonLabel_fr_CA_UNIX
ButtonLabel_fr_CA
ButtonLabel_fr
ButtonLabel_en_US
ButtonLabel_en
ButtonLabel
```

简单说，一个 `ResourceBundle` 有三个参数，将逐渐减少参数匹配：

- 如果没有匹配上，则使用默认的语言环境，
- 如果获取不到默认的语言环境对应的 `ResourceBundle`，则使用没有任何语言配置的 `ResourceBundle`
- 如果没有语言配置的默认 `ResourceBundle` 也找不到，则抛出一个  MissingResourceException  异常，所以你应该提供一个没有后缀的 `ResourceBundle` 

## ListResourceBundle 和 PropertyResourceBundle 子类

抽象类  `ResourceBundle  `有两个子类: 

- `PropertyResourceBundle `

  由 properties 文件支持， properties 文件是包含可翻译文本的文本文件， Properties files 不是 Java 源码的一部分，并且它们只能包含 String 对象。如果要保存其他类型的对象，可以使用  `ListResourceBundle `

-  `ListResourceBundle `

  ListResourceBundle 类使用方便的 List 管理资源。每个 `ListResourceBundle ` 都有 class 文件支持。您可以在 ListResourceBundle 中存储任何特定于 Locale 的对象。若要添加对其他 Locale 的支持，请创建另一个源文件并将其编译为  class 文件。

对这两个类的实例，在后面有讲解。

`ResourceBundle `类是灵活的。如果你第一次将文本放在了 `PropertyResourceBundle ` 中，然后想要使用  `ListResourceBundle `，这对代码没有影响。如下获取一个指定 Locale 的 ResourceBundle，无不管他的实现是什么

```java
ResourceBundle introLabels = ResourceBundle.getBundle("ButtonLabel", currentLocale);
```

## Key-Value 对

`ResourceBundle` 对象包含 key-value 的二维数组。

```java
class ButtonLabel_en extends ListResourceBundle {
    static final Object[][] contents = {
        {"OkKey", "OK"},
        {"CancelKey", "Cancel"},
    };

    // 英文版本
    @Override
    public Object[][] getContents() {
        return contents;
    }
}
```

不要被这个二维数组初始化搞懵逼了，其实就是把一个 kv 值放到了一个数组里面，一维数组里面就是如下的 kv 对应的值

```
[OkKey, OK]
[CancelKey, Cancel]
```

获取的时候，使用 key 获取 value

```java
String okLabel = ButtonLabel.getString("OkKey");
```

在 `ButtonLabel.properties `  文件内容中，上面的信息就是下面这样

```
OkKey = OK
CancelKey = Cancel
```

