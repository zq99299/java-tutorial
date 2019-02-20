# 创建包

要创建一个包，你需要为这个包选择一个名称（命名约定将在下一节中讨论），并在每个包含类型（类，接口，枚举和注解类型）的源文件的顶部放置一个具有该名称的语句）。

包语句（例如，package graphics;）必须是源文件中的第一行。每个源文件中只能有一个包语句，并且它适用于文件中的所有类型。

::: tip
如果您将多个类型放在单个源文件中，则只能有一个类型 public，并且必须与源文件具有相同的名称。

例如，您可以在文件 Circle.java 中定义 public class Circle，
在文件 Draggable.java 中定义 public interface Draggable，
在文件中 Day.java 中定义 public enum Day 等等。

您可以将非公开类型与公共类型包含在同一个文件中（除非非公共类型很小并且与公共类型密切相关，否则这是非常不鼓励的），
但只有公共类型可以从包。所有的顶级非公开类型都将是私有的。
:::



如果将上一节中列出的图形接口和类放在一个名为 graphics 的包中 ，则需要六个源文件，如下所示：

```java
//in the Draggable.java file
package graphics;
public interface Draggable {
    . . .
}

//in the Graphic.java file
package graphics;
public abstract class Graphic {
    . . .
}

//in the Circle.java file
package graphics;
public class Circle extends Graphic
    implements Draggable {
    . . .
}

//in the Rectangle.java file
package graphics;
public class Rectangle extends Graphic
    implements Draggable {
    . . .
}

//in the Point.java file
package graphics;
public class Point extends Graphic
    implements Draggable {
    . . .
}

//in the Line.java file
package graphics;
public class Line extends Graphic
    implements Draggable {
    . . .
}
```

如果您不使用 package 语句，则类型将以未命名的程序包结尾。一般来说，一个未命名的软件包只适用于小型或临时应用程序，
或者当您刚刚开始开发过程时。否则，类和接口属于命名包。
