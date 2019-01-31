# 原始类型
[[toc]]

原始类型是一个通用的类或接口没有任何类型的参数的名称。例如，给定通用 Box 类：

```java
public class Box<T> {
    public void set(T t) { /* ... */ }
    // ...
}
```
要创建 `Box <T>` 的参数化类型，可以为形式类型参数 T 提供实际的类型参数：

```java
Box<Integer> intBox = new Box<>();
```

如果省略实际的类型参数，则创建一个原始类型的 `Box <T>`：

```java
Box rawBox = new Box();
```

因此，Box 是泛型 `Box <T>` 的原始类型。但是，非泛型类或接口类型不是原始类型。

原始类型显示在传统代码中，因为很多 API 类（如 Collections 类）在 JDK 5.0 之前不是通用的。
使用原始类型时，您基本上会获得预泛型的行为 - 一个 Box 会为您提供对象。为了向后兼容，允许将参数化类型分配给其原始类型：

```java
Box<String> stringBox = new Box<>();
Box rawBox = stringBox;               // OK
```
但是，如果将原始类型分配给参数化类型，则会收到警告：

```java
Box rawBox = new Box();           // 原始类型
Box<Integer> intBox = rawBox;     // 警告：未检查的转换异常
```

如果使用原始类型来调用在相应泛型中定义的泛型方法，也会得到警告：

```java
Box<String> stringBox = new Box<>();
Box rawBox = stringBox;
rawBox.set(8);  // warning: unchecked invocation to set(T)
```

该警告显示原始类型绕过了泛型类型检查，将不安全代码的捕获推迟到运行时。因此，你应该避免使用原始类型。

[类型擦除](./erasure.md) 部分包含有关 Java 编译器如何使用原始类型的更多信息。

## 未经检查的错误消息

如前所述，将遗留代码与通用代码混合在一起时，可能会遇到类似于以下内容的警告消息：

```bash
Note: Example.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
```

在使用原始类型的旧 API 时，可能会发生这种情况，如以下示例所示：

```java
public class WarningDemo {
    public static void main(String[] args){
        Box<Integer> bi;
        bi = createBox();
    }

    static Box createBox(){
        return new Box();
    }
}
```

术语 “unchecked” 表示编译器没有足够的类型信息来执行确保类型安全所需的所有类型的检查。
虽然编译器提供了一个提示，但是默认情况下，“unchecked”警 告被禁用。要查看所有 “unchecked” 警告，请使用 -Xlint：unchecked 进行重新编译。

使用 -Xlint：unchecked 重新编译前面的示例会显示以下附加信息：

```bash
WarningDemo.java:4: warning: [unchecked] unchecked conversion
found   : Box
required: Box<java.lang.Integer>
        bi = createBox();
                      ^
1 warning
```

要完全禁用未经检查的警告，请使用 -Xlint：-unchecked 标志。该 `@SuppressWarnings(“unchecked”)` 标注抑制 unchecked 警告。
如果您对 `@SuppressWarnings` 语法不熟悉，请参阅 [注解](../annotations/index.md)。
