# 本地类

本地类是在 **块** 中定义的类。它是花括号之间的一组零个或多个语句。您通常会发现方法正文中定义的本地类。

## 定义本第类

你可以在任何块中定义一个本地类（[有关详细信息请参考 - 表达式、语句和块](../nutsandbolts/expressions.md)）。 例如，您可以在方法体，for 循环或 if 子句中定义本地类 。

以下示例验证两个电话号码，在方法中定义了本地类 validatePhoneNumber

```java
public class LocalClassExample {
    static String regularExpression = "[^0-9]";

    public static void validatePhoneNumber(String phoneNumber1, String phoneNumber2) {
//        final int numberLength = 10;
        int numberLength = 10; // jdk8以上有效

        class PhoneNumber {

            String formattedPhoneNumber = null;

            PhoneNumber(String phoneNumber) {
                // numberLength = 7;
                String currentNumber = phoneNumber.replaceAll(
                        regularExpression, "");
                if (currentNumber.length() == numberLength)
                    formattedPhoneNumber = currentNumber;
                else
                    formattedPhoneNumber = null;
            }

            public String getNumber() {
                return formattedPhoneNumber;
            }

            // Valid in JDK 8 and later:
//            public void printOriginalNumbers() {
//                System.out.println("Original numbers are " + phoneNumber1 +
//                    " and " + phoneNumber2);
//            }
        }

        PhoneNumber myNumber1 = new PhoneNumber(phoneNumber1);
        PhoneNumber myNumber2 = new PhoneNumber(phoneNumber2);

        // Valid in JDK 8 and later:
//        myNumber1.printOriginalNumbers();

        if (myNumber1.getNumber() == null)
            System.out.println("First number is invalid");
        else
            System.out.println("First number is " + myNumber1.getNumber());
        if (myNumber2.getNumber() == null)
            System.out.println("Second number is invalid");
        else
            System.out.println("Second number is " + myNumber2.getNumber());

    }

    public static void main(String... args) {
        validatePhoneNumber("123-456-7890", "456-7890");
    }
}
```

::: tip
Valid in JDK 8 and later：在 7 中的某些语法必须是 final 或则引用类型的才可使用。
:::

这个例子使用正则除去非 0-9 之间的字符，然后验证它的长度是否等于 10（北美的电话号码的长度），程序输出

```java
First number is 1234567890
Second number is invalid
```

## 访问封闭类的成员

本地类可以访问其封闭类的成员。在前面的例子中，PhoneNumber 构造函数访问该成员 LocalClassExample.regularExpression。

另外，本地类可以访问局部变量。但是，本地类只能访问被声明为 final 的局部变量。当本地类访问本地变量或包围块的参数时，它会捕获该变量或参数。例如，PhoneNumber 构造函数可以访问局部变量 numberLength，因为它被声明为 final； numberLength 是一个捕获的变量。

然而，从 Java SE 8 开始，本地类可以访问最终或有效最终的封闭块的局部变量和参数。其值在初始化后永远不会更改的变量或参数是最终的。例如，假设变量 numberLength 未声明为 final，并且在 PhoneNumber 构造函数中添加突出显示的赋值语句，将有效电话号码的长度更改为 7 位数：

```java
PhoneNumber(String phoneNumber) {
    numberLength = 7;
    String currentNumber = phoneNumber.replaceAll(
        regularExpression, "");
    if (currentNumber.length() == numberLength)
        formattedPhoneNumber = currentNumber;
    else
        formattedPhoneNumber = null;
}
```

::: tip
在 java8 中也就是说，只要在使用前声明了就可以
:::

由于这个赋值语句，该变量 numberLength 不再有效地成为最终的。因此，Java 编译器会生成类似于 内部类引用的局部变量必须是 final 或有效的 final 的错误消息，其中内部类 PhoneNumber 尝试访问 numberLength 变量：

```java
if（currentNumber.length() == numberLength）
```

从 Java SE 8 开始，如果您在方法中声明本地类，则可以访问该方法的参数。例如，您可以在 PhoneNumber 本地类中定义以下方法：

```java
public void printOriginalNumbers() {
    System.out.println("Original numbers are " + phoneNumber1 +
        " and " + phoneNumber2);
}
```

## 阴影和本地类

一个类型的声明（如一个变量）在一个本地类中的阴影声明中的封闭范围内具有相同的名称。有关详细信息，请参阅 [嵌套类-阴影](./nested.md)。

## 本地类与内部类相似

本地类与内部类相似，因为它们无法定义或声明任何静态成员。静态方法中的本地类（如静态方法 PhoneNumber 中定义的类）validatePhoneNumber 只能引用封闭类的静态成员。例如，如果没有将成员变量定义 regularExpression 为静态，则 Java 编译器会生成类似于 “非静态变量无法从静态上下文引用” 的错误 regularExpression。

本地类是非静态的，因为它们可以访问封闭块的实例成员。因此，它们不能包含大多数类型的静态声明。

您不能在块内声明一个接口; 接口本身就是静态的。例如，以下代码摘录不会编译，因为接口 HelloThere 是在方法体内定义的 greetInEnglish：

```java
public void greetInEnglish() {
        interface HelloThere {
           public void greet();
        }
        class EnglishHelloThere implements HelloThere {
            public void greet() {
                System.out.println("Hello " + name);
            }
        }
        HelloThere myGreeting = new EnglishHelloThere();
        myGreeting.greet();
    }
```

您不能在本地类中声明静态初始化程序或成员接口。以下代码摘录无法编译，因为该方法 EnglishGoodbye.sayGoodbye 已被声明 static。编译器生成类似于 “修饰符”的错误，当遇到此方法定义时，静态 “只允许在常量变量声明中”：

```java
public void sayGoodbyeInEnglish() {
        class EnglishGoodbye {
            public static void sayGoodbye() {
                System.out.println("Bye bye");
            }
        }
        EnglishGoodbye.sayGoodbye();
    }
```

本地类可以有静态成员，只要它们是常量变量(编译时常量表达式通常是一个字符串或一个算术表达式，可以在编译时进行评估)。以下代码摘录编译，因为静态成员 EnglishGoodbye.farewell 是一个常量变量：

```java
public void sayGoodbyeInEnglish() {
        class EnglishGoodbye {
            public static final String farewell = "Bye bye";
            public void sayGoodbye() {
                System.out.println(farewell);
            }
        }
        EnglishGoodbye myEnglishGoodbye = new EnglishGoodbye();
        myEnglishGoodbye.sayGoodbye();
    }
````
