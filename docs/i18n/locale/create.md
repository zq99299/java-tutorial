# 创建 Locale

有几种创建 `Locale` 对象的方法。无论使用哪种技术，创建都可以像指定语言代码一样简单。但是，您可以通过设置区域（也称为“国家/地区”）和变体代码来进一步区分语言环境。如果使用的是 JDK 7 发行版或更高版本，则还可以指定脚本代码和 Unicode 语言环境扩展。

创建 `Locale` 对象的四种方法是：

- `Locale.Builder` 类
- `Locale` 构造函数
- `Locale.forLanguageTag` 工厂方法
- `Locale` 常量 / Constants

## Locale.Builder 类

Locale.Builder 工具类可用于构造符合 IETF BCP 47 语法的 Locale 对象。例如，若要指定法语和加拿大国家/地区，可以调用 Locale.Builder 构造函数，然后将 setter 方法链接如下：

```java
Locale aLocale = new Locale.Builder().setLanguage("fr").setRegion("CA").build();
```

下面为美国和英国创建英文 Locale 对象

```java
Locale bLocale = new Locale.Builder().setLanguage("en").setRegion("US").build();
Locale cLocale = new Locale.Builder().setLanguage("en").setRegion("GB").build();
```

下面为俄语创建 Locale 对象

```java
Locale dLocale = new Locale.Builder().setLanguage("ru").setScript("Cyrl").build();
```

## Locale 构造函数

`Locale` 类中提供了三个可用于创建 `Locale` 对象的构造函数：

- [`Locale(String language)`](https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html#Locale-java.lang.String-)
- [`Locale(String language, String country)`](https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html#Locale-java.lang.String-java.lang.String-)
- [`Locale(String language, String country, String variant)`](https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html#Locale-java.lang.String-java.lang.String-java.lang.String-)

```java
// 加拿大法语
aLocale = new Locale("fr", "CA");
// 美国和英国的英语
bLocale = new Locale("en", "US");
cLocale = new Locale("en", "GB");
// 俄语
dLocale = new Locale("ru");
```

`Locale` 在低于JDK 7 的发行版中，无法在对象上设置脚本代码。

## Locale.forLanguageTag 工厂方法

如果您具有符合 IETF BCP 47 标准的语言标签字符串，则可以使用 Java SE 7 发行版中引入的   [`forLanguageTag(String)`](https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html#forLanguageTag-java.lang.String-) 工厂方法。例如：

```java
Locale aLocale = Locale.forLanguageTag("en-US");
Locale bLocale = Locale.forLanguageTag("ja-JP-u-ca-japanese");
```

##  Locale 常量

为了您的方便，`Locale` 类提供 了一些语言和国家/地区的 [常量](https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html#field_summary)。例如：

```java
cLocale = Locale.JAPAN;
dLocale = Locale.CANADA_FRENCH;
```

当你使用常量时，Locale 中的国家/地区（Region）是不确定的

```java
j1Locale = Locale.JAPANESE;
j2Locale = new Locale.Builder().setLanguage("ja").build();
j3Locale = new Locale("ja");
```

下面三个也是等效的

```java
j4Locale = Locale.JAPAN;
j5Locale = new Locale.Builder().setLanguage("ja").setRegion("JP").build();
j6Locale = new Locale("ja", "JP");
```

## 代码

以下各节讨论语言代码和可选脚本、区域和变体代码。下面只列出了本节示例相关的代码

### 语言代码

| 语言代码 | 描述   |
| -------- | ------ |
| `de`     | 德语   |
| `en`     | 英语   |
| `fr`     | 法文   |
| `ru`     | 俄语   |
| `ja`     | 日本   |
| `jv`     | 爪哇语 |
| `ko`     | 韩语   |
| `zh`     | 中文   |

### 脚本代码

脚本代码以大写字母开头，后跟三个小写字母，符合 ISO 15924 标准。 [ISO 15924 完整代码](http://unicode.org/iso15924/iso15924-codes.html)。

| 脚本代码 | 描述   |
| -------- | ------ |
| `Arab`   | 阿拉伯 |
| `Cyrl`   | 西里尔 |
| `Kana`   | 片假名 |
| `Latn`   | 拉丁   |

有三种用于检索 Locale 脚本信息的方法：

- [`getScript()`](https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html#getScript)

  返回对象的 4 个字母的脚本代码 `Locale`。如果没有为语言环境定义脚本，则返回一个空字符串。

- [`getDisplayScript()`](https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html#getDisplayScript) 

  返回适合显示给用户的语言环境脚本的名称。如果可能，该名称将被本地化为默认语言环境。因此，例如，如果脚本代码为  「Latn」，则对于英语语言环境，返回的 diplay 脚本名称将为字符串 「 Latin」。

- [`getDisplayScript(Locale)`](https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html#getDisplayScript-java.util.Locale)
  
  如果可能，返回 Locale 指定区域设置的显示名称。

### 地区/国家代码

区域（国家/地区）代码由符合 ISO 3166 标准的两个或三个大写字母组成，或三个符合 UN M.49 标准的大写字母。[完整代码可以在该网址上找到](http://www.chemie.fu-berlin.de/diverse/doc/ISO_3166.html)

| A-2代码 | A-3代码 | 数字代码 | 描述       |
| ------- | ------- | -------- | ---------- |
| `AU`    | `AUS`   | `036`    | 澳大利亚   |
| `BR`    | `BRA`   | `076`    | 巴西       |
| `CA`    | `CAN`   | `124`    | 加拿大     |
| `CN`    | `CHN`   | `156`    | 中国       |
| `DE`    | `DEU`   | `276`    | 德国       |
| `FR`    | `FRA`   | `250`    | 法国       |
| `IN`    | `IND`   | `356`    | 印度       |
| `RU`    | `RUS`   | `643`    | 俄罗斯联邦 |
| `US`    | `USA`   | `840`    | 美国       |

### 变体代码

可选变体代码（variant）可用于进一步区分 Locale 。例如，变体代码可用于指示区域代码未涵盖的辩证差异。

**版本说明：**  在 Java SE 7 发行**版**之前，有时使用变体代码来标识并非特定于语言或地区的差异。例如，它可能已被用来识别 Windows 或 UNIX 等计算平台之间的差异。在 IETF BCP 47 标准下，不建议使用此方法。要定义与您的环境相关的非语言特定的变体，请使用扩展机制，如 [BCP 47 扩展中所述](./extensions.md)。

从符合 IETF BCP 47 标准的 Java SE 7 版本开始，变体代码专门用于指示 **定义语言或方言的其他变体**。IETF BCP 47 标准对变体子标记施加句法限制。可以在该页面中查找对应的 *variant*

例如，Java SE 使用变体代码来支持泰语。按照惯例，第 1 个和 th_TH 的 NumberFormat 对象将使用通用的阿拉伯数字形状或阿拉伯数字来设置泰语数字的格式。但是， th_TH_TH 使用泰语数字形状

```java
String outputString = new String();
Locale[] thaiLocale = {
    new Locale("th"),
    new Locale("th", "TH"),
    new Locale("th", "TH", "TH")  // 使用了变体
};

for (Locale locale : thaiLocale) {
    NumberFormat nf = NumberFormat.getNumberInstance(locale);
    outputString = outputString + locale.toString() + ": ";
    outputString = outputString + nf.format(573.34) + "\n";
}
System.out.println(outputString);

打印信息如下
    
th: 573.34
th_TH: 573.34
th_TH_TH_#u-nu-thai: ๕๗๓.๓๔             // 这里使用了泰语符号来显示 573.34
```

