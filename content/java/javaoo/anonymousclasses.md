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