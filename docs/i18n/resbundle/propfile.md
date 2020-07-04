# 使用 PropertyResourceBundle 

本文通过一个 `PropertiesDemo` 示例来讲解如何使用 PropertyResourceBundle 

## 创建默认的 property 文件

默认的属性文件名就是你的 ResourceBundle 基本名称， 本例使用 LabelsBundle，默认的属性文件名则是 LabelsBundle.properties

```
# 这是默认的 LabelsBundle.properties
s1 = computer
s2 = disk
s3 = monitor
s4 = keyboard
```

第一行由 `#` 开头的是说明，等号（`=` ） 左边的是 key，右边的是信息，一旦定义，在所有的语言属性文件中，该 key 都必须要是一样的

## 根据需要创建额外的 property 文件

支持一个额外的 Locale，创建一个新的 PropertyResourceBundle  文件，比如支持一个德语（de）的属性文件，文件名为 `LabelsBundle_de.properties`，内容如下

```java
#  LabelsBundle_de.properties
s1 = Computer
s2 = Platte
s3 = Monitor
s4 = Tastatur
```

你还可以为其他的语言做支持，这里再创建一个法语的属性文件

```java
#  LabelsBundle_fr.properties
s1 = Computer
s2 = Platte
s3 = Monitor
s4 = Tastatur
```

那么最终有三个属性文件

```
LabelsBundle.properties
LabelsBundle_de.properties
LabelsBundle_fr.properties
```

## 指定支持的 Locale

```java
Locale[] supportedLocales = {
    Locale.FRENCH,
    Locale.GERMAN,
    Locale.ENGLISH
};
```

-  Locale.FRENCH： 匹配 LabelsBundle_fr.properties
- Locale.GERMAN：匹配 LabelsBundle_de.properties
- Locale.ENGLISH：没有匹配的属性文件，因此使用默认的 LabelsBundle.properties

## 创建 ResourceBundle

给定 ResourceBundle 的基础名称，和获取指定语言的 Locale 对象，获取到匹配的 ResourceBundle 对象

```java
ResourceBundle labels = ResourceBundle.getBundle("LabelsBundle", currentLocale);
```

## 获取本地化文本

```java
String value = labels.getString(key);
```

从 ResourceBundle 中获取匹配的 key 对应的文本消息

## 遍历所有的 key

这个用在测试时，查看对应的 ResourceBundle 的所有信息。

```java
ResourceBundle labels = ResourceBundle.getBundle("LabelsBundle", currentLocale);
// 返回 ResourceBundle 中的所有 key
Enumeration bundleKeys = labels.getKeys();

// 然后循环从 ResourceBundle 中获取对应的文本消息
while (bundleKeys.hasMoreElements()) {
    String key = (String)bundleKeys.nextElement();
    String value = labels.getString(key);
    System.out.println("key = " + key + ", " + "value = " + value);
}
```

下面是 Locale.GERMAN 输出的遍历信息

```
key = s3, value = Monitor
key = s4, value = Tastatur
key = s1, value = Computer
key = s2, value = Platte
```

## 运行演示程序

```java
Locale[] supportedLocales = {
    Locale.FRENCH,
    Locale.GERMAN,
    Locale.ENGLISH
};
for (Locale locale : supportedLocales) {
    ResourceBundle labels = ResourceBundle.getBundle("LabelsBundle", locale);
    System.out.println(String.format("Locale = %s, key = %s, value = %s",
                                     locale.getLanguage(), "s2", labels.getString("s2")));
}
```

打印每个 Locale 的 s2 对应的信息

```
Locale = fr, key = s2, value = Disque dur
Locale = de, key = s2, value = Platte
Locale = en, key = s2, value = disk
```

## 最终程序

```java
import java.util.Enumeration;
import java.util.Locale;
import java.util.ResourceBundle;

public class PropertiesDemo {
    static public void main(String[] args) {
        Locale[] supportedLocales = {
                Locale.FRENCH,
                Locale.GERMAN,
                Locale.ENGLISH
        };

        for (int i = 0; i < supportedLocales.length; i++) {
            displayValue(supportedLocales[i], "s2");
        }

        System.out.println();

        iterateKeys(supportedLocales[0]);

    } // main

    static void displayValue(Locale currentLocale, String key) {

        ResourceBundle labels = ResourceBundle.getBundle("LabelsBundle", currentLocale);
        String value = labels.getString(key);
        System.out.println(
                "Locale = " + currentLocale.toString() + ", " +
                        "key = " + key + ", " +
                        "value = " + value);

    } // displayValue


    static void iterateKeys(Locale currentLocale) {
        ResourceBundle labels =
                ResourceBundle.getBundle("LabelsBundle", currentLocale);

        Enumeration bundleKeys = labels.getKeys();

        while (bundleKeys.hasMoreElements()) {
            String key = (String) bundleKeys.nextElement();
            String value = labels.getString(key);
            System.out.println("key = " + key + ", " +
                    "value = " + value);
        }

    } // iterateKeys
}
```

还有记得配套的三个属性文件

```
LabelsBundle.properties
LabelsBundle_de.properties
LabelsBundle_fr.properties
```

