# 重复注解

在某些情况下，您要将相同的注释应用于声明或类型使用。从Java SE 8版本开始，_重复注解_使您能够做到这一点。

例如，您正在编写代码以使用定时服务，使您能够在给定时间或某个时间表上运行方法，类似于UNIX cron服务。现在，您要设置一个计时器来运行doPeriodicCleanup方法，在本月的最后一天和每个星期五的11:00 pm。要设置运行定时器，请创建`@Schedule`注释并将其应用到doPeriodicCleanup方法两次。第一个用途指定了该月的最后一天，第二个用于指定星期五为11p.m.，如下面的代码示例所示：

```java
@Schedule(dayOfMonth="last")
@Schedule(dayOfWeek="Fri", hour="23")
public void doPeriodicCleanup() { ... }
```

前面的示例将注解应用于方法。您可以在使用标准注解的任何位置重复注解。例如，您有一个用于处理未经授权的访问异常的类。您可以为管理员注解一个`@Alert`注解，另一个用于管理员注解类：

```java
@Alert(role="Manager")
@Alert(role="Administrator")
public class UnauthorizedAccessException extends SecurityException { ... }
```

出于兼容性原因，重复注解存储在由Java编译器自动生成的容器注解中。为了使编译器执行此操作，您的代码中需要两个声明。


## 步骤1：声明可重复的注解类型

注解类型必须用`@Repeatable`元注解标记。以下示例定义了一个自定义的`@Schedule`可重复注解类型：

```java
import java.lang.annotation.Repeatable;

@Repeatable(Schedules.class)
public @interface Schedule {
  String dayOfMonth() default "first";
  String dayOfWeek() default "Mon";
  int hour() default 12;
}
```

`@Repeatable`元注解 的值在括号中是Java编译器生成的容器注解的类型，用于存储重复注解。在此示例中，包含注解类型是`Schedules`，因此重复的`@Schedule`注解存储在`@Schedules`注解中。

对声明应用相同的注解，而不首先声明它可重复，导致编译时错误。

## 步骤2：声明包含注解类型

包含注解类型必须具有value数组类型的元素。数组类型的组件类型必须是可重复的注解类型。Schedules包含注解类型的声明如下：

```java
public @interface Schedules {
    Schedule[] value();
}
```

最终效果就类似下面这样，定义可重复注解后，可重复使用

```java
public class DisplayDeck {
    @Repeatable(Schedules.class)
    public @interface Schedule {
        String dayOfMonth() default "first";

        String dayOfWeek() default "Mon";

        int hour() default 12;
    }

    public @interface Schedules {
        Schedule[] value();
    }

    public @interface Nomore {

    }

    @Schedule(dayOfMonth = "x")
    @Schedule(dayOfMonth = "x")
    @Schedule(dayOfMonth = "x")
    @Nomore 
    @Nomore // 这个没有使用可重复注解，在idea中直接报错
    public static void main(String[] args) {
    }
}
```

## 检索注释
Reflection API中有几种可用于检索注释的方法。返回单个注解的方法（如 `AnnotatedElement.getAnnotation（Class <T>）`）的行为不变。因为如果存在所请求类型的一个注解，它们只返回单个注解。如果存在多个请求类型的注解，您可以先获取它们的容器注解来获取它们。这样，旧版代码继续运行。在Java SE 8中引入了其他方法，通过容器注解扫描以一次返回多个注解，如 `AnnotatedElement.getAnnotationsByType（Class <T>）`。参见 [AnnotatedElement](https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/AnnotatedElement.html) 有关所有可用方法的信息的类规范。


## 设计注意事项

设计注解类型时，必须考虑该类型注解的基数。现在可以使用注解零次，一次，或者如果注解的类型被标记为`@Repeatable`多次。也可以通过使用@Target元注解来限制注解类型的使用位置。例如，您可以创建只能在方法和字段上使用的可重复注解类型。重要的是仔细设计注解类型，以确保使用注解的程序员发现它尽可能灵活和强大。

