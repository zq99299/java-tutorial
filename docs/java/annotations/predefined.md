# 预定义注解类型

一组注解类型是在 Java SE API 中预定义的。 一些注解类型由Java编译器使用，一些注解类型也使用于其他注解

## Java 语言使用的注解类型

`@Deprecated，@Override，和@SuppressWarnings`是在`java.lang`中预定义的


**@Deprecated**

`@Deprecated`注解表示标记的元素已被弃用，不应再使用。只要程序使用带`@Deprecated`注解的方法，类或字段，编译器就会生成警告。当不推荐使用元素时，还应使用Javadoc`@deprecated`标记进行记录，如以下示例所示。注意在JavaDoc注释中有一个注解`@deprecated` 和 方法上的注解`@Deprecated`的区别在于首字母的大小写。这不是偶然的：它们在概念上是相关的。

```java
   // Javadoc comment follows
    /**
     * @deprecated
     * explanation of why it was deprecated
     */
    @Deprecated
    static void deprecatedMethod() { }
}
```

**@Override **

`@Override`注解通知编译器该元素意图覆盖在超类中声明的元素。接口和继承中将讨论覆盖方法 。

```java
  //  标记方法作为超类的方法
   // 已被覆盖
   @Override 
   int overriddenMethod() { }
```

  虽然在覆盖方法时不需要使用此注解，但有助于防止错误。如果标记的方法`@Override`无法正确覆盖其超类中的一个方法，则编译器会生成错误。

**@SuppressWarnings**

  `@SuppressWarnings`注解告诉编译器抑制它将会生成的特定警告。在以下示例中，使用了不推荐使用的方法，编译器通常会生成警告。但是，在这种情况下，注解会导致警告被抑制。

```java
   // 使用已弃用的方法，并告诉编译器产生警告
   @SuppressWarnings("deprecation")
    void useDeprecatedMethod() {
        // deprecation warning
        // - suppressed
        objectOne.deprecatedMethod();
    }
```

每个编译器警告都属于一个类别。Java语言规范列出了两类：`deprecation`和`unchecked`。在unchecked与来临之前，旧代码交互时，会发生警告;要抑制多个类别的警告，请使用以下语法：

```java
@SuppressWarnings({"unchecked", "deprecation"})
```

## 适用于其他注解的注解

适用于其他注解的注解称为_元注解_。在`java.lang.annotation`。中定义了几个元注解类型

**@Retention** 指定标记注解的存储方式：

* `RetentionPolicy.SOURCE` - 标记的注解仅在源级别保留，并被编译器忽略。
* `RetentionPolicy.CLASS` - 标记的注解由编译器在编译时保留，但被Java虚拟机（JVM）忽略。
* `RetentionPolicy.RUNTIME` - 标记的注解由JVM保留，因此可以由运行时环境使用。

**@Documented** 表明，每当使用指定的注解时，应使用Javadoc工具记录这些元素。（默认情况下，注解不包括在Javadoc中。）有关详细信息，请参阅 [Javadoc工具页面](https://docs.oracle.com/javase/8/docs/technotes/guides/javadoc/index.html)。

**@Target** 标记另一个注解，以限制注解可应用于哪种类型的Java元素。目标注解指定以下元素类型之一作为其值：

* `ElementType.ANNOTATION_TYPE` 可以应用于注解类型。
* `ElementType.CONSTRUCTOR` 可以应用于构造函数。
* `ElementType.FIELD` 可应用于字段。
* `ElementType.LOCAL_VARIABLE` 可以应用于局部变量。
* `ElementType.METHOD` 可以应用于方法级注解。
* `ElementType.PACKAGE` 可以应用于一个包的声明。
* `ElementType.PARAMETER` 可以应用于一个方法的参数。
* `ElementType.TYPE` 可以应用于类的任何元素。

**@Inherited** 表示注解类型可以从超级类继承（默认情况下不是这样）。当用户查询注释类型并且类没有此类型的注解时，会为该类的超类查询注解类型。此注解仅适用于类声明。

**@Repeatable** 在Java SE 8中引入，表示标记的注解可以被多次应用于相同的声明或类型使用。有关详细信息，请参阅 重复注解。