# 匿名类

匿名类使您能够使您的代码更简洁。它们使您能够同时声明和实例化一个类。他们就像本地类，除了他们没有名字。如果您只需要使用本地类，请使用它们。

## 声明匿名类

虽然本地类是类声明，匿名类是表达式，这意味着您在另一个表达式中定义类。下面的示例 HelloWorldAnonymousClasses，frenchGreeting和spanishGreeting使用本地变量的初始化匿名类，englishGreeting而是使用本地类变量的初始化:

```java
public class HelloWorldAnonymousClasses {

    interface HelloWorld {
        public void greet();

        public void greetSomeone(String someone);
    }

    public void sayHello() {
        // 本地类
        class EnglishGreeting implements HelloWorld {
            String name = "world";

            public void greet() {
                greetSomeone("world");
            }

            public void greetSomeone(String someone) {
                name = someone;
                System.out.println("Hello " + name);
            }
        }

        HelloWorld englishGreeting = new EnglishGreeting();

        // 匿名类
        HelloWorld frenchGreeting = new HelloWorld() {
            String name = "tout le monde";

            public void greet() {
                greetSomeone("tout le monde");
            }

            public void greetSomeone(String someone) {
                name = someone;
                System.out.println("Salut " + name);
            }
        };

        // 匿名类
        HelloWorld spanishGreeting = new HelloWorld() {
            String name = "mundo";

            public void greet() {
                greetSomeone("mundo");
            }

            public void greetSomeone(String someone) {
                name = someone;
                System.out.println("Hola, " + name);
            }
        };
        englishGreeting.greet();
        frenchGreeting.greetSomeone("Fred");
        spanishGreeting.greet();
    }

    public static void main(String... args) {
        HelloWorldAnonymousClasses myApp =
                new HelloWorldAnonymousClasses();
        myApp.sayHello();
    }
}
```

## 匿名类的语法

如前所述，一个匿名类是一个表达式。匿名类表达式的语法类似于构造函数的调用，除了在代码块中包含类定义。

思考frenchGreeting对象的实例化
```java
 HelloWorld frenchGreeting = new HelloWorld() {
            String name = "tout le monde";
            public void greet() {
                greetSomeone("tout le monde");
            }
            public void greetSomeone(String someone) {
                name = someone;
                System.out.println("Salut " + name);
            }
        };
```

匿名类表达式包含以下类容：

* 使用new操作符
* （new）要实现的接口的名称或扩展的类。在这个例子中，匿名类正在实现接口HelloWorld。
* 包含构造函数的参数的括号，就像普通类实例创建表达式一样。注意：实现一个接口时，没有构造函数，所以你使用一个空的一对括号，就像这个例子一样。
* 一个身体，这是一个类声明体。更具体地说，在主体中，方法声明是允许的，但语句不是。