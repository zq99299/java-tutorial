# 自定义资源包加载

前面已经学会了如何创建和访问 ResourceBundle 类，本节扩展你的知识，如何利用 ResourceBundle.Control 类功能。

创建 ResourceBundle.Control 是为了指定 **如何查找和实例化 ResourceBundle** 。它定义了一组在捆绑加载过程中由 ResourceBundle.getBundle 工厂方法调用的回调方法。

ResourceBundle.getBundle 工厂方法调用的是另外一个提供了 Control 类的重载方法

```java
public static final ResourceBundle getBundle(
    String baseName,
    ResourceBundle.Control cont
    // ...
```

以下示例程序称为 RBControl.java，演示了如何定义自己的中文区域 Locale 的搜索路径。

## 创建  properties  文件

- RBControl.properties ：默认的，用英文

  ```
  region: global
  language: English
  ```

- RBControl_zh.properties ：语言是简体中文

  ```
  language: Simplified Chinese
  ```

- RBControl_zh_cn.properties ：地区是中国

  ```
  region: China
  ```

- RBControl_zh_hk.properties ：地区是香港

  ```
  region: Hong Kong
  ```

- RBControl_zh_tw.properties ：地区是台湾

  ```
  region: Taiwan
  language: Traditional Chinese
  ```

## 创建 ResourceBundle 实例

```java
private static void test(Locale locale) {
    ResourceBundle rb = ResourceBundle.getBundle(
                            "RBControl",
                            locale,
                            new ResourceBundle.Control() {
                                    // ...
                            }
                        );
```

使用 ResourceBundle.getBundle 工厂方法：基本名称、指定的 Locale、自定义的 Control

## 调用 `getCandidateLocales`  方法

```java
new ResourceBundle.Control() {
    @Override
    public List<Locale> getCandidateLocales(
                            String baseName,
                            Locale locale) {
                // ...                                        
    }
}
```

返回一个 Locale 的候选列表

```java
if (baseName == null)
    throw new NullPointerException();

if (locale.equals(new Locale("zh", "HK"))) {
    return Arrays.asList(
               locale,
               Locale.TAIWAN,
               // 这里没有把 Locale.CHINESE 加入
               Locale.ROOT);
} else if (locale.equals(Locale.TAIWAN)) {
    return Arrays.asList(
               locale,
               // 这里没有把 Locale.CHINESE 加入
               Locale.ROOT);
}
// 
```

**注意：最后一个元素的候选  Locale 必须是 ROOT。**

其他的可以根据自己的逻辑来返回 Locale

## 调用测试类

```java
public static void main(String[] args) {
    test(Locale.CHINA);
    test(new Locale("zh", "HK"));
    test(Locale.TAIWAN);
    test(Locale.CANADA);
}
```

## 完整程序

```java
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.ResourceBundle;

public class RBControl {
    public static void main(String[] args) {
        test(Locale.CHINA);
        test(new Locale("zh", "HK"));
        test(Locale.TAIWAN);
        test(Locale.CANADA);
    }

    private static void test(Locale locale) {
        ResourceBundle rb = ResourceBundle.getBundle(
                "RBControl",
                locale,
                new ResourceBundle.Control() {
                    @Override
                    public List<Locale> getCandidateLocales(String baseName, Locale locale) {
                        if (baseName == null)
                            throw new NullPointerException();
                        // 这里只判断了香港 和 台湾
                        if (locale.equals(new Locale("zh", "HK"))) {
                            return Arrays.asList(
                                    locale,
                                    Locale.TAIWAN,
                                    // no Locale.CHINESE here
                                    Locale.ROOT);
                        } else if (locale.equals(Locale.TAIWAN)) {
                            return Arrays.asList(
                                    locale,
                                    // no Locale.CHINESE here
                                    Locale.ROOT);
                        }
                        // 其他的由父类去加载
                        return super.getCandidateLocales(baseName, locale);
                    }
                });
        System.out.println("locale: " + locale);
        System.out.println("\tregion: " + rb.getString("region"));
        System.out.println("\tlanguage: " + rb.getString("language"));
    }
}
```

运行输出如下

```
locale: zh_CN
	region: China
	language: Simplified Chinese
locale: zh_HK
	region: Hong Kong
	language: Traditional Chinese
locale: zh_TW
	region: Taiwan
	language: Traditional Chinese
locale: en_CA
	region: China
	language: Simplified Chinese
```

我们定义的只判定了 zh_HK 和 zh_TW ，其他的由父类查找匹配。

另外 Control 类中还有以下两个有趣的方法：

- getTimeToLive：确定多长时间资源包可以在缓存中存在
- needsReload ：如果一个资源包缓存过期了，调用该方法来确定是否重新加载资源包