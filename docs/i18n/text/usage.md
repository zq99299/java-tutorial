# 用法示例

## 码点创建 String

```java
String newString(int codePoint) {
    return new String(Character.toChars(codePoint));
}
```

## 码点创建 String - 针对BMP字符进行了优化

`Character.toChars` 方法创建一个临时数组，该临时数组使用一次，然后丢弃。如果这会对性能产生负面影响，则可以使用以下针对 BMP 字符（由单个 `char` 值表示的字符）进行优化的方法。在此方法中，`toChars` 仅对补充字符进行调用。

```java
String newString(int codePoint) {
    if (Character.charCount(codePoint) == 1) {
        return String.valueOf(codePoint);
    } else {
        return new String(Character.toChars(codePoint));
    }
}
```

## 批量创建 String 

为了创建大量字符串，前面代码段的大容量版本重用了 toChars 方法使用的数组。该方法为每个码点创建一个单独的字符串实例，并且针对 BMP 字符进行了优化。

```java
String[] newStrings(int[] codePoints) {
    String[] result = new String[codePoints.length];
    char[] codeUnits = new char[2];
    for (int i = 0; i < codePoints.length; i++) {
        // 将码点解析后，存储到 codeUnits 中，并返回有几个 unicode 单元
        int count = Character.toChars(codePoints[i], codeUnits, 0);
        result[i] = new String(codeUnits, 0, count);
    }
    return result;
}
```

## 生成信息

格式化 API 支持 **补充字符**。下面的示例是生成信息的简单方法。

```java
// 推荐的
System.out.printf("Character %c is invalid.%n", codePoint);
```

下面的方法很简单，并且避免了连接，这会使文本更难以本地化，因为并非所有语言都以与英语相同的顺序向字符串中插入数值。

```java
// 不推荐的
System.out.println("Character " + String.valueOf(char) + " is invalid.");
```

