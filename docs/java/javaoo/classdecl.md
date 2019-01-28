# 声明类

下列方式定义类

```java
class MyClass {
    // field, constructor, and 
    // method declarations
}
```

这是一个_ class _声明，所述类体（括号之间的区域）中包含的所有提供了用于从类中创建的对象的生命周期的代码：构造函数来初始化新的对象，声明为提供所类及其对象的状态的字段，并实现类及其对象的行为的方法。

前面的类声明是一个最小的声明。它只包含所需的类声明中的那些组件。在类声明开始时，您可以提供有关该类的更多信息，例如其超类的名称，是否实现任何接口等等。例如

```java
class MyClass extends MySuperClass implements YourInterface {
    // field, constructor, and
    // method declarations
}
```

意味着MyClass是MySuperClass的子类，它实现了YourInterface接口。

您也可以在一开始就添加public或private修饰符，这样可以看到类声明的开头行可能变得相当复杂.public和private的修饰符决定什么其他类可以访问MyClass，将在本课稍后讨论。接口和继承课程将解释如何以及为什么在类声明中使用extends和implements关键字。目前您不需要担心这些。

一般来说，类声明可以按照以下顺序包括这些组件：

1. 修饰符，如 public、private和其他一些你以后会遇到的
2. class名称，按照惯例大写首字母
3. 父类名称，如果有的话，由关键词 extends 修饰，一个类（子类）只能继承一个父类
4. 由类实现的以逗号分隔的接口列表（如果有的话）在关键字implements之前。一个类可以实现多个接口。
5. 类的本身被大括号`{}`包围