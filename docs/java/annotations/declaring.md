# 声明一个注解类型

许多注解替换代码中的注释

假设一个软件组传统上是通过提供重要信息的注释来启动每个类的主体：

```java
public class Generation3List extends Generation2List {

   // Author: John Doe
   // Date: 3/17/2002
   // Current revision: 6
   // Last modified: 4/12/2004
   // By: Jane Doe
   // Reviewers: Alice, Bill, Cindy

   // class code goes here

}
```

要使用注解添加相同的元数据，您必须首先定义注解类型。这样做的语法是：

```java
@interface ClassPreamble {
   String author();
   String date();
   int currentRevision() default 1;
   String lastModified() default "N/A";
   String lastModifiedBy() default "N/A";
   // Note use of array
   String[] reviewers();
}
```

注解类型定义看起来类似于接口定义，其中关键字 interface 前面加「@」符号。注解类型是一种接口形式，将在后面的课程中介绍。目前，您不需要了解。

上一个注解定义的主体包含注解类型元素声明，它看起来很像方法。请注意，它们可以定义可选的默认值。

在定义注解类型之后，您可以使用该类型的注解，其中填充的值如下所示：

```java
@ClassPreamble (
   author = "John Doe",
   date = "3/17/2002",
   currentRevision = 6,
   lastModified = "4/12/2004",
   lastModifiedBy = "Jane Doe",
   // Note array notation
   reviewers = {"Alice", "Bob", "Cindy"}
)
public class Generation3List extends Generation2List {

// class code goes here

}
```

::: tip
要使信息 `@ClassPreamble` 出现在 Javadoc 生成的文档中，您必须使用注解 `@Documented` 对 `@ClassPreamble` 定义进行注解：
:::

```java
// import this to use @Documented
import java.lang.annotation.*;

@Documented
@interface ClassPreamble {

   // Annotation element definitions

}
```
