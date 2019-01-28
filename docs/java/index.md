# 学习 Java 语言

::: tip
教程中例子都可以打包下载，本笔记边看边敲，是在敲不会的再来源码
[官网教程的实例教程源码](http://download.oracle.com/otn-pub/java/jdk/8u171-b11-demos/512cd62ec5174c3487ac17c61aaa89e8/jdk-8u171-windows-x64-demos.zip)
:::

本课程涵盖了Java编程语言编程的基础

* [面向对象编程概念](./concepts/index.md)

    教你如何面向对象编程的核心概念：对象，消息，类和继承。本课程将展示这些概念如何转化为代码。如果您已经熟悉面向对象编程，请随时跳过本课。

* [语言基础](./nutsandbolts/index.md)

    描述了语言的传统特征，包括变量，数组，数据类型，运算符和控制流。
* 类和对象

    描述了如何编写从中创建对象的类以及如何创建和使用对象。

* 注释
    是一种元数据形式，为编译器提供信息。本课程介绍如何有效地在程序中使用注释。

* 接口和继承

    描述接口 - 它们是什么，为什么要写一个接口，以及如何编写它们。本节还介绍了您可以从另一个派生一个类的方法。也就是说，子类如何从超类继承领域和方法。您将了解到，所有类都派生自Object类，以及如何修改子类继承自超类的方法。

* 数字和字符串

    本课介绍如何使用Number和String对象本课程还向您介绍如何格式化数据输出。

* 泛型

    是Java编程语言的强大功能。它们提高了代码的类型安全性，从而在编译时更多的检测到错误。
* 包

    是Java编程语言的一个功能，可帮助您组织和构建您的类及其彼此之间的关系。


* [学习Java](/content/java/index.md)
* [面向对象编程概念](/content/java/concepts/index.md)
  * [什么是对象](/content/java/concepts/obgect.md)
  * [什么是类](/content/java/concepts/class.md)
  * [什么是继承](/content/java/concepts/inheritance.md)
  * [什么是接口](/content/java/concepts/interface.md)
  * [什么是包](/content/java/concepts/package.md)
  * [问题和练习](/content/java/concepts/qande.md)
* [语言基础](/content/java/nutsandbolts/index.md)
  * [变量](/content/java/nutsandbolts/variables.md)
    * [原始数据类型](/content/java/nutsandbolts/datatypes.md)
    * [数组](/content/java/nutsandbolts/arrays.md)
    * [变量总结](/content/java/nutsandbolts/variablesummary.md)
    * [问题和练习](/content/java/nutsandbolts/qande/variables.md)
  * [运算符](/content/java/nutsandbolts/operators.md)
    * [分配、算术和一元运算符](/content/java/nutsandbolts/op1.md)
    * [平等、关系和条件运算符](/content/java/nutsandbolts/op2.md)
    * [按位和位移操作符](/content/java/nutsandbolts/op3.md)
    * [运算符总结](/content/java/nutsandbolts/opsummary.md)
  * [表达式、语句和块](/content/java/nutsandbolts/expressions.md)
  * [表达式、语句和块问题和练习](/content/java/nutsandbolts/qande/questions_expressions.md)
  * [控制流程语句](/content/java/nutsandbolts/flow.md)
    * [if-then和if-then-else语句](/content/java/nutsandbolts/if.md)
    * [switch语句](/content/java/nutsandbolts/switch.md)
    * [while和do-while语句](/content/java/nutsandbolts/while.md)
    * [for](/content/java/nutsandbolts/for.md)
    * [分支语句](/content/java/nutsandbolts/branch.md)
    * [流程总结](/content/java/nutsandbolts/flowsummary.md)
    * [问题与练习](/content/java/nutsandbolts/qande/questions_flow.md)
* [类和对象](/content/java/javaoo/index.md)
  * [类](/content/java/javaoo/classes.md)
    * [声明类](/content/java/javaoo/classdecl.md)
    * [声明成员变量](/content/java/javaoo/variables.md)
    * [定义方法](/content/java/javaoo/methods.md)
    * [为您的class提供构造](/content/java/javaoo/constructors.md)
    * [将信息传递个方法或构造函数](/content/java/javaoo/arguments.md)
  * [对象](/content/java/javaoo/objects.md)
    * [创建对象](/content/java/javaoo/objectcreation.md)
    * [使用对象](/content/java/javaoo/usingobject.md)
  * [类的更多信息](/content/java/javaoo/more.md)
    * [从方法返回值](/content/java/javaoo/returnvalue.md)
    * [使用this关键字](/content/java/javaoo/thiskey.md)
    * [控制对类成员的访问](/content/java/javaoo/accesscontrol.md)
    * [了解类成员](/content/java/javaoo/classvars.md)
    * [初始化字段](/content/java/javaoo/initial.md)
    * [创建和使用类和对象的总结](/content/java/javaoo/summaryclasses.md)
    * [创建-问题和练习](/content/java/javaoo/qande/creating-questions.md)
    * [对象-问题和练习](/content/java/javaoo/qande/objects-questions.md)
  * [嵌套类](/content/java/javaoo/nested.md)
    * [内部类范例](/content/java/javaoo/innerclasses.md)
    * [本地类](/content/java/javaoo/localclasses.md)
    * [匿名类](/content/java/javaoo/anonymousclasses.md)
    * [Lambda表达式](/content/java/javaoo/lambdaexpressions.md)
    * [Lambda表达式-方法引用](/content/java/javaoo/methodreferences.md)
    * [何时使用嵌套类和Lambda表达式](/content/java/javaoo/whentouse.md)
    * [问题与练习-嵌套类](/content/java/javaoo/qande/nested-questions.md)
    * [枚举类型](/content/java/javaoo/enum.md)
    * [问题与练习-枚举](/content/java/javaoo/qande/enum-answers.md)
* [注解](/content/java/annotations/index.md)
  * [注解基础](/content/java/annotations/basics.md)
  * [声明一个注解类型](/content/java/annotations/declaring.md)
  * [预定义注解类型](/content/java/annotations/predefined.md)
  * [注解类型和可插拨类型系统](/content/java/annotations/type_annotations.md)
  * [重复注解](/content/java/annotations/repeating.md)
  * [问题和练习](/content/java/annotations/qande/questions.md)
* [接口和继承](/content/java/iandi/index.md)
  * [接口](/content/java/iandi/createinterface.md)
    * [定义一个接口](/content/java/iandi/interface_def.md)
    * [实现一个接口](/content/java/iandi/usinginterface.md)
    * [使用接口作为类型](/content/java/iandi/interface_as_type.md)
    * [不断发展的接口](/content/java/iandi/nogrow.md)
    * [默认方法](/content/java/iandi/defaultmethods.md)
    * [接口总结](/content/java/iandi/summary_interface.md)
    * [问题和练习](/content/java/iandi/qande/interfaces_questions.md)
  * [继承](/content/java/iandi/subclasses.md)
    * [多继承](/content/java/iandi/multipleinheritance.md)
    * [覆盖和隐藏方法](/content/java/iandi/override.md)
    * [多态性](/content/java/iandi/polymorphism.md)
    * [隐藏的字段](/content/java/iandi/hidevariables.md)
    * [使用关键字 super](/content/java/iandi/super.md)
    * [Object作为超类](/content/java/iandi/objectclass.md)
    * [编写最终类和方法-final](/content/java/iandi/final.md)
    * [抽象方法和类](/content/java/iandi/abstract.md)
    * [继承总结](/content/java/iandi/summaryinherit.md)
    * [问题和练习](/content/java/iandi/qande/inherit_questions.md)
* [数字和字符串](/content/java/data/index.md)
  * [数字-Number](/content/java/data/numbers.md)
    * [Number类](/content/java/data/numberclasses.md)
    * [格式化打印输出](/content/java/data/numberformat.md)
    * [超越基础算术](/content/java/data/beyondmath.md)
    * [总结](/content/java/data/numbersummary.md)
    * [问题和练习](/content/java/data/qande/numbers_questions.md)
  * [字符](/content/java/data/characters.md)
  * [字符串](/content/java/data/strings.md)
    * [转换数字和字符串](/content/java/data/converting.md)
    * [操纵字符串中的字符](/content/java/data/manipstrings.md)
    * [比较字符串和部分字符串](/content/java/data/comparestrings.md)
    * [StringBuilder类](/content/java/data/buffers.md)
    * [总结](/content/java/data/stringsummary.md)
  * [自动装箱和拆箱](/content/java/data/autoboxing.md)
  * [问题和练习](/content/java/data/qnde/characters_questions.md)
* [泛型](/content/java/generics/index.md)
  * [为什么要使用泛型？](/content/java/generics/why.md)
  * [泛型类型](/content/java/generics/types.md)
  * [原始类型](/content/java/generics/rawTypes.md)
  * [泛型方法](/content/java/generics/methods.md)
  * [有界类型参数](/content/java/generics/bounded.md)
  * [泛型方法和有界类型参数](/content/java/generics/boundedTypeParams.md)
  * [泛型，继承和子类型](/content/java/generics/inheritance.md)
  * [类型推断](/content/java/generics/genTypeInference.md)
  * [通配符](/content/java/generics/wildcards.md)
    * [上界通配符](/content/java/generics/upperBounded.md)
    * [无界通配符](/content/java/generics/unboundedWildcards.md)
    * [下界通配符](/content/java/generics/lowerBounded.md)
    * [通配符和子类型](/content/java/generics/subtyping.md)
    * [通配符捕获和辅助方法](/content/java/generics/capture.md)
    * [通配符使用指南](/content/java/generics/wildcardGuidelines.md)
  * [类型擦除](/content/java/generics/erasure.md)
    * [擦除泛型类型](/content/java/generics/genTypes.md)
    * [擦除泛型方法](/content/java/generics/genMethods.md)
    * [类型擦除和桥接方法的影响](/content/java/generics/bridgeMethods.md)
    * [不可确定的类型](/content/java/generics/nonReifiableVarargsType.md)
  * [对泛型的限制](/content/java/generics/restrictions.md)
  * [问题和练习](/content/java/generics/qande/generics_questions.md)
* [包package](/content/java/package/index.md)
  * [创建和使用包](/content/java/package/packages.md)
  * [创建包](/content/java/package/createpkgs.md)
  * [命名包](/content/java/package/namingpkgs.md)
  * [使用包成员](/content/java/package/usepkgs.md)
  * [管理源文件和类文件](/content/java/package/managingfiles.md)
  * [包总结](/content/java/package/summary_package.md)
