# 匿名类

匿名类使您能够使您的代码更简洁。它们使您能够同时声明和实例化一个类。他们就像本地类，除了他们没有名字。如果您只需要使用本地类，请使用它们。

## 声明匿名类

虽然本地类是类声明，匿名类是表达式，这意味着您在另一个表达式中定义类。下面的示例 HelloWorldAnonymousClasses、frenchGreeting 和 spanishGreeting 使用本地变量的初始化匿名类，englishGreeting 而是使用本地类变量的初始化:

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

思考 frenchGreeting 对象的实例化

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

* 使用 new 操作符
* （new）要实现的接口的名称或扩展的类。在这个例子中，匿名类正在实现接口 HelloWorld。
* 包含构造函数的参数的括号，就像普通类实例创建表达式一样。注意：实现一个接口时，没有构造函数，所以你使用一个空的一对括号，就像这个例子一样。
* 一个身体，这是一个类声明体。更具体地说，在主体中，方法声明是允许的

## 访问封闭范围的本地变量，以及声明和访问匿名类成员

像本地类一样，匿名类可以 [捕获变量 - 访问封闭类的成员](./localclasses.md) ; 它们对包围范围的局部变量具有相同的访问权限：

* 匿名类可以访问其封闭类的成员。
* 匿名类不能访问其封闭范围内未被声明为 final 或最终确定的局部变量。
* 像嵌套类一样，匿名类中的类型声明（如变量）会影响包含相同名称的封闭范围内的任何其他声明。有关详细信息，请参阅 [阴影 - 嵌套类中的阴影](./nested.md)。

匿名课程与本地类的成员也有相同的限制：

* 您不能在匿名类中声明静态初始化程序或成员接口。
* 匿名类可以有静态成员，只要它们是常量变量。

请注意，您可以在匿名类中声明以下内容：

* 字段
* 额外的方法（即使他们没有实现任何超类型的方法）
* 实例初始化器
* 本地类

但是，您无法在匿名类中声明构造函数。


## 匿名类的例子

匿名类通常用于图形用户界面（GUI）应用程序。考虑 JavaFX 的例子。此示例创建一个包含 Say'Hello World' 按钮的框架。匿名类表达式突出显示：

该类的语法在图形界面章节才会讲到，但是本人暂时不打算看这一章节的。

HelloWorld.java

```java
public class HelloWorld extends Application {
    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) {
        primaryStage.setTitle("Hello World!");
        Button btn = new Button();
        btn.setText("Say 'Hello World'");
        // 匿名类在这里使用的
        btn.setOnAction(new EventHandler<ActionEvent>() {

            @Override
            public void handle(ActionEvent event) {
                System.out.println("Hello World!");
            }
        });

        StackPane root = new StackPane();
        root.getChildren().add(btn);
        primaryStage.setScene(new Scene(root, 300, 250));
        primaryStage.show();
    }
}
```

因为该 `EventHandler<ActionEvent>` 接口只包含一个方法，您可以使用 lambda 表达式而不是匿名类表达式。有关详细信息，请参阅 [Lambda表达式](./lambdaexpressions.md)  一节 。

匿名类是实现包含两个或更多方法的接口的理想选择。以下 JavaFX 示例来自 UI 控件的自定义部分。突出显示的代码创建一个仅接受数值的文本字段。它重新定义了默认实现 TextField ，通过重写 replaceText 和 replaceSelection 。

```java
import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.geometry.Insets;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;

public class CustomTextFieldSample extends Application {

    final static Label label = new Label();

    @Override
    public void start(Stage stage) {
        Group root = new Group();
        Scene scene = new Scene(root, 300, 150);
        stage.setScene(scene);
        stage.setTitle("Text Field Sample");

        GridPane grid = new GridPane();
        grid.setPadding(new Insets(10, 10, 10, 10));
        grid.setVgap(5);
        grid.setHgap(5);

        scene.setRoot(grid);
        final Label dollar = new Label("$");
        GridPane.setConstraints(dollar, 0, 0);
        grid.getChildren().add(dollar);

        final TextField sum = new TextField() {
            @Override
            public void replaceText(int start, int end, String text) {
                if (!text.matches("[a-z, A-Z]")) {
                    super.replaceText(start, end, text);
                }
                label.setText("Enter a numeric value");
            }

            @Override
            public void replaceSelection(String text) {
                if (!text.matches("[a-z, A-Z]")) {
                    super.replaceSelection(text);
                }
            }
        };

        sum.setPromptText("Enter the total");
        sum.setPrefColumnCount(10);
        GridPane.setConstraints(sum, 1, 0);
        grid.getChildren().add(sum);

        Button submit = new Button("Submit");
        GridPane.setConstraints(submit, 2, 0);
        grid.getChildren().add(submit);

        submit.setOnAction(new EventHandler<ActionEvent>() {
            @Override
            public void handle(ActionEvent e) {
                label.setText(null);
            }
        });

        GridPane.setConstraints(label, 0, 1);
        GridPane.setColumnSpan(label, 3);
        grid.getChildren().add(label);

        scene.setRoot(grid);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
```
