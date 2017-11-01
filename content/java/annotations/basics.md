# 注解基础

## 注解的格式

在其最简单的形式中，注解如下所示：

```java
@Entity
```

在以下示例中，注解的名称为 Override

```java
@Override
void mySuperMethod() { ... }
```

该注解可包括元件，其可被指定或未指定，并且有值的那些元素：

```java
@Author(
   name = "Benjamin Franklin",
   date = "3/27/2003"
)
class MyClass() { ... }

或则

@SuppressWarnings(value = "unchecked")
void myMethod() { ... }
```

如果只有一个元素命名为value，那么该名称可以省略，如：

```java
@SuppressWarnings("unchecked")
void myMethod() { ... }
```

如果注解没有元素，则可以省略括号，如前面的@Override示例所示。

在同一声明中也可以使用多个注解：

```java
@Author(name = "Jane Doe")
@EBook
class MyClass { ... }
```

如果注解具有相同的类型，那么这称为重复注释：

```java
@Author(name = "Jane Doe")
@Author(name = "John Smith")
class MyClass { ... }
```

从Java SE 8版本开始支持重复注释。有关详细信息，请参阅 重复注释。

注解类型可以是在Java API中 `java.lang or java.lang.annotation`包 中定义的类型；在前面的例子，Override并且SuppressWarnings是 预定义的Java注解。也可以定义自己的注解类型。上一个示例中的Author和Ebook注释是自定义注解类型。


## 可以使用注解的位置

注解可以应用于声明：类，字段，方法和其他程序元素的声明。在声明中使用时，每个注解通常按照惯例出现在自己的行上。

从Java SE 8版本开始，注解也可以应用于类型的使用。这里有些例子：

类实例创建表达式：
```java
 new @Interned MyObject();
```
类型转换：
```java
  myString = (@NonNull String) str;
```
implements：
```java
   class UnmodifiableList<T> implements
        @Readonly List<@Readonly T> { ... }
```
抛出异常声明：
```java
void monitorTemperature() throws
        @Critical TemperatureException { ... }
```

这种注解形式称为类型注解。有关详细信息，请参阅 类型注解和可插入类型系统。
