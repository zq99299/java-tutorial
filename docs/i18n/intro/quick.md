# 一个简单的例子

如果您不熟悉软件国际化，那么此课程适合您。本课使用一个简单的示例演示如何国际化程序，以便它以适当的语言显示文本消息。您将学习 `Locale` 和 `ResourceBundle` 对象如何协同工作以及如何使用属性文件。

- 国际化之前：

  源代码的第一个版本包含我们要显示的消息的硬编码英语版本。这不是您编写国际化软件的方式。

- 国际化之后：

  这是国际化后我们的源代码外观的预览。

- 运行示例程序

  要运行示例程序，请在命令行上指定语言和国家。本节向您展示了一些示例。

- 国际化示例程序

  程序国际化仅需几个步骤。您会惊讶于它是如此的容易。

## 国际化之前

假设你编写了一个显示三个消息的程序，如下：

```java
public class NotI18N {

    static public void main(String[] args) {

        System.out.println("Hello.");
        System.out.println("How are you?");
        System.out.println("Goodbye.");
    }
}
```

您已经确定该程序需要向居住在 **法国** 和 **德国** 的人们显示相同的消息。不幸的是，您的编程人员不是多语种，因此您需要帮助将消息翻译成法语和德语。由于 **翻译员不是程序员**，因此您必须 **将消息从源代码移到文本文件中**，翻译员可以对其进行编辑。另外，该程序必须足够灵活，以便它可以显示其他语言的消息，但是现在还没有人知道这些语言是什么。

该程序似乎需要国际化。

## 国际化之后

一个程序和 三个语言文件：

- MessagesBundle.properties：主语言文件
- MessagesBundle_de_DE.properties：德语
- MessagesBundle_en_US.properties：英语
- MessagesBundle_fr_FR.properties：法语

I18NSample.java

```java
import java.util.*;

public class I18NSample {

    static public void main(String[] args) {

        String language;
        String country;

        if (args.length != 2) {
            language = new String("en");
            country = new String("US");
        } else {
            language = new String(args[0]);
            country = new String(args[1]);
        }

        Locale currentLocale;
        ResourceBundle messages;

        currentLocale = new Locale(language, country);

        messages = ResourceBundle.getBundle("MessagesBundle", currentLocale);
        System.out.println(messages.getString("greetings"));
        System.out.println(messages.getString("inquiry"));
        System.out.println(messages.getString("farewell"));
    }
}
```

MessagesBundle.properties
```
greetings = Hello.
farewell = Goodbye.
inquiry = How are you?
```

MessagesBundle_de_DE.properties

```
greetings = Hallo.
farewell = Tschüß.
inquiry = Wie geht's?
```

MessagesBundle_en_US.properties

```
greetings = Hello.
farewell = Goodbye.
inquiry = How are you?
```

MessagesBundle_fr_FR.properties

```
greetings = Bonjour.
farewell = Au revoir.
inquiry = Comment allez-vous?
```

## 运行示例程序

允许在命令行上指定 **语言** 和 **国家/地区**，这里指定法语，和法国

```bash
% java I18NSample fr FR
Bonjour.
Comment allez-vous?
Au revoir.
```
这里指定英语和美国
```bash
% java I18NSample en US
Hello.
How are you?
Goodbye.
```

## 国际化示例程序

如果查看国际化的源代码，您会注意到 **硬编码的英语消息已被删除**。因为消息不再是硬编码的，并且因为 **语言代码是在运行时指定的**，所以同一可执行文件可以在全球范围内分发。本地化无需重新编译。该计划已国际化。

您可能想知道消息文本发生了什么，或者 **语言和国家/地区代码的含义**，下面来解释这些概念

### 1. 创建属性文件

属性文件存储有关程序或环境的特征的信息。属性文件为纯文本格式。

- MessagesBundle.properties：默认属性文件
- MessagesBundle_de_DE.properties：把默认的属性文件翻译成德语的属性文件

注意：属性文件名很重要，德语属性文件中的「de」表示语言代码，「DE」表示德国/低区代码。创建 **Locale** 对象时会使用这些代码

### 2. 定义语言环境

`Locale` 对象标识特定的 **语言和国家**。以下语句定义了 `Locale`，其语言为英语，国家/地区为美国：

```java
aLocale = new Locale("en","US");
```

下面演示在加拿大和法国，创建法语的语言环境

```java
caLocale = new Locale("fr","CA");
frLocale = new Locale("fr","FR");
```

程序可以不用硬编码，语言和国家可以通过命令行传递给程序。

Locale 对象只是标识符。定义语言环境之后，将其传递给其他执行有用任务的对象，比如：格式化日期和数字。这些对象对语言环境敏感，因为它们的行为会根据语言环境而变化。ResourceBundle 是语言环境敏感对象的一个例子。

### 3. 创建一个 ResourceBundle

`ResourceBundle` 对象包含特定于语言环境的对象。您可以使用 `ResourceBundle` 对象来 **隔离对语言环境敏感的数据**，比如可翻译的文本。在示例程序中，`ResourceBundle ` 由包含我们想要显示的消息文本的 **属性文件** 支持。

```java
messages = ResourceBundle.getBundle("MessagesBundle", currentLocale);
```

第一个参数 `MessagesBundle`，指的是以下属性文件家族，它是文件名的前缀

```
MessagesBundle_en_US.properties
MessagesBundle_fr_FR.properties
MessagesBundle_de_DE.properties
```

第二个参数 currentLocale，指定了使用哪一个语言环境文件，当对应语言环境的 ResourceBundle 创建出来之后，就可以从该对象中获取翻译的语言了

### 4. 从 ResourceBundle 中获取文本

```java
String msg1 = messages.getString("greetings");
```

属性文件中以 **键值对** 的形式存在，获取翻译文本需要使用 **键**，来获取对应的 **消息文本**

## 结论

如您所见，国际化程序并不难。它需要一些计划和一些额外的编码，但是好处是巨大的。为了向您提供国际化过程的概述，本课中的示例程序被故意简化了。阅读后面的课程时，您将了解 Java 编程语言的更高级的国际化功能。