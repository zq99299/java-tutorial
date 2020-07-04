## 使用 ListResourceBundle

本节通过一个 `ListDemo` 来讲解如何使用

## 创建 ListResourceBundle 的子类

这里创建支持三种 Locale 的 ListResourceBundle  子类

```java
StatsBundle_en_CA.class
StatsBundle_fr_FR.class
StatsBundle_ja_JP.class
```

这是其中一个类的实现

```java
import java.util.*;
public class StatsBundle_ja_JP extends ListResourceBundle {
    public Object[][] getContents() {
        return contents;
    }

    private Object[][] contents = {
        { "GDP", new Integer(21300) },
        { "Population", new Integer(125449703) },
        { "Literacy", new Double(0.99) },
    };
}
```

这里 key 对应的不再只有字符串了，而是两个 Integer 和一个 double 类型的消息。

## 指定 Locale

```java
Locale[] supportedLocales = {
    new Locale("en", "CA"),
    new Locale("ja", "JP"),
    new Locale("fr", "FR")
};
```

定义支持的三个语言环境  Locale，每一个 Locale 对应一个  ListResourceBundle  子类

## 创建 ListResourceBundle 

```java
ResourceBundle stats = ResourceBundle.getBundle("StatsBundle", currentLocale);
```

getBundle 方法搜索名称以 StatsBundle 开头的类，后跟指定区域设置的语言和国家/地区代码。例如，如果使用 ja 和 JP 代码创建当前 Locale，getBundle 将返回 ListResourceBundle  子类 StatsBundle_ja_JP

## 获取消息

```java
Double lit = (Double)stats.getObject("Literacy");
```

通过 getObject 获取，然后强转成原本的类型。

## 运行程序

本章列出来一个 StatsBundle_ja_JP 的实现类，另外另个你自行实现下，然后放在 classpath 下就可以

```java
import java.util.Locale;
import java.util.ResourceBundle;

public class ListDemo {
    static public void main(String[] args) {

        Locale[] supportedLocales = {
                new Locale("en", "CA"),
                new Locale("ja", "JP"),
                new Locale("fr", "FR")
        };

        for (int i = 0; i < supportedLocales.length; i++) {
            System.out.println("Locale = " + supportedLocales[i]);
            displayValues(supportedLocales[i]);
            System.out.println();
        }

    } // main

    static void displayValues(Locale currentLocale) {

        // 特别需要注意的是这里的 baseName
        // 源码里面支持 class 和 properties 两种方式
        // 先查找的就是 class，所以如果你的 ListResourceBundle 子类有包名的话，需要给到完整的包名
        ResourceBundle stats = ResourceBundle.getBundle("com.java.StatsBundle", currentLocale);

        Integer gdp = (Integer) stats.getObject("GDP");
        System.out.println("GDP = " + gdp.toString());
        Integer pop = (Integer) stats.getObject("Population");
        System.out.println("Population = " + pop.toString());
        Double lit = (Double) stats.getObject("Literacy");
        System.out.println("Literacy = " + lit.toString());

    } // displayValues
}
```

运行输出如下

```bash
Locale = en_CA
GDP = 113000
Population = 126489
Literacy = 0.5

Locale = ja_JP
GDP = 21300
Population = 125449703
Literacy = 0.99

Locale = fr_FR
GDP = 113000
Population = 126489
Literacy = 0.5
```

