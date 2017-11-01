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