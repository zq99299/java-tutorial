# 嵌套类

Java编程语言允许您在另一个类中定义一个类。这样的一个类称为_嵌套类_，这里说明如下：

```java
class OuterClass {
    ...
    class NestedClass {
        ...
    }
}
```

> **术语:** 嵌套类分为静态和非静态两类。被声明static的_嵌套类_称为_静态嵌套类_。非静态嵌套类称为_内部类_。

```java
class OuterClass {
    ...
    static class StaticNestedClass {
        ...
    }
    class InnerClass {
        ...
    }
}
```

嵌套类是其封闭类的成员。非静态嵌套类（内部类）可以访问封闭类的其他成员，即使它们被声明为私有的。静态嵌套类无法访问封闭类的其他成员。为一体的一个部件OuterClass，一个嵌套类可以声明private，public，protected，或包专用。（回想一下，外部类只能被声明public或包私有）。

## 为什么要使用嵌套类？

使用嵌套类的令人信服的原因包括：

* **这是一种仅在一个地方使用的类进行逻辑分组的方法：**如果类仅对另一个类有用，那么将它嵌入该类并将其保持在一起就是合乎逻辑的。嵌套这样的“helper classes”使他们的包更加精简。

* **封装 ： **考虑两个顶级类A和B，其中B需要访问否则将被声明的A成员private。通过在A类中隐藏B类，A的成员可以被声明为private，B可以访问它们。另外，B本身也可以从外界隐藏起来。

* **易读易维护：**将顶级类中的小类嵌套将代码更接近使用的位置。


## 静态嵌套类

与类方法和变量一样，静态嵌套类与其外部类相关联。和静态类方法一样，静态嵌套类也不能直接引用到其包围类中定义的实例变量或方法：它只能通过对象引用使用它们。

> **注意： ** 静态嵌套类与其外层类（和其他类）的实例成员一样，与任何其他顶级类一样。实际上，静态嵌套类是行为上的顶级类，已经嵌套在另一个顶级类中以便于打包。

使用封闭类名访问静态嵌套类

```java
OuterClass.StaticNestedClass
```

例如，要为静态嵌套类创建一个对象，请使用以下语法

```java
OuterClass.StaticNestedClass nestedObject =
     new OuterClass.StaticNestedClass();
```

## 内部类

与实例方法和变量一样，内部类与其封闭类的实例相关联，并可以直接访问该对象的方法和字段。另外，因为内部类与一个实例相关联，所以它不能定义任何静态成员。

内部类的实例的对象存在于外部类的实例中。考虑以下几类：

```java
class OuterClass {
    ...
    class InnerClass {
        ...
    }
}
```

OuterClass可以直接访问其封闭实例的方法和字段。

要实例化一个内部类，必须首先实例化外部类。然后，使用以下语法在外部对象内创建内部对象：

```java
OuterClass.InnerClass innerObject = outerObject.new InnerClass();
```

内部类有两种特殊类： 本地类 和 匿名类。

## Shadowing(阴影？)

如果（例如内类或方法的定义）一个类型（例如作为成员变量或参数名称）在特定范围的声明具有相同的名称作为在封闭范围另一声明，则声明阴影的声明的封闭范围。您不能仅通过其名称来引用阴影声明。以下示例 ShadowTest演示如下：

```java

public class ShadowTest {

    public int x = 0;

    class FirstLevel {

        public int x = 1;

        void methodInFirstLevel(int x) {
            System.out.println("x = " + x);
            System.out.println("this.x = " + this.x);
            System.out.println("ShadowTest.this.x = " + ShadowTest.this.x);
        }
    }

    public static void main(String... args) {
        ShadowTest st = new ShadowTest();
        ShadowTest.FirstLevel fl = st.new FirstLevel();
        fl.methodInFirstLevel(23);
    }
}
```

程序输出

```java
x = 23
this.x = 1
ShadowTest.this.x = 0
```

请注意系统变量使用不用的this方法进行区分。


## 序列化


强烈不鼓励内部类的序列化，包括 本地和 匿名类。当Java编译器编译某些构造（如内部类）时，会创建_合成结构_ ; 这些是在源代码中没有相应构造的类，方法，字段和其他结构。合成构造使Java编译器能够实现新的Java语言功能，而不会更改JVM。然而，合成结构可以在不同的Java编译器实现之间变化，这意味着.class文件也可以在不同的实现之间变化。因此，如果序列化内部类，然后使用不同的JRE实现对其进行反序列化，则可能会遇到兼容性问题。有关在编译内部类时生成的合成结构的更多信息，请参阅“ 获取方法参数名称 ”部分中的“ 隐式和合成参数 ”部分 。



