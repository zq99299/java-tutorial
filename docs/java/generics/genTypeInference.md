# 类型推断
[[toc]]

类型推断是 Java 编译器查看每个方法调用和相应声明以确定使调用适用的类型参数（或参数）的能力，
推理算法确定参数的类型，如果可用，则确定结果被分配或返回的类型。最后，推理算法试图找到最适合所有参数的特定类型。

为了说明最后一点，在下面的例子中，推断确定传递给 pick 方法的第二个参数的类型是 Serializable：

```java
static <T> T pick(T a1, T a2) { return a2; }
Serializable s = pick("d", new ArrayList<String>());
```

::: tip
第一次遇到，两个 T 居然可以传递不一样的类型，在方法级别上的泛型类型，比如这里会第二个参数是 list，
和第一个参数的共同点 就是都是 Serializable 的子类。
如果换成自定义的类，那么返回的就是一个 Object（如果这个对象没有实现 Serializable 的话）

by 2019年2月20日15:36:51
:::

## 类型推断和泛型方法

[泛型方法](./methods.md) 引入了你输入推理的方法，它可以像普通方法那样调用泛型方法，
而不用在尖括号之间指定类型。考虑下面的例子， BoxDemo 需要 Box 类：

```java
public class Box<T> {

    private T t; // T stands for "Type"

    public void set(T t) {
        this.t = t;
    }

    public T get() {
        return t;
    }
}

public class BoxDemo {
    public static <U> void addBox(U u,
                                  java.util.List<Box<U>> boxes) {
        Box<U> box = new Box<>();
        box.set(u);
        boxes.add(box);
    }

    public static <U> void outputBoxes(java.util.List<Box<U>> boxes) {
        int counter = 0;
        for (Box<U> box : boxes) {
            U boxContents = box.get();
            System.out.println("Box #" + counter + " contains [" +
                                       boxContents.toString() + "]");
            counter++;
        }
    }

    public static void main(String[] args) {
        java.util.ArrayList<Box<Integer>> listOfIntegerBoxes =
                new java.util.ArrayList<>();
        BoxDemo.<Integer>addBox(Integer.valueOf(10), listOfIntegerBoxes);
        BoxDemo.addBox(Integer.valueOf(20), listOfIntegerBoxes);
        BoxDemo.addBox(Integer.valueOf(30), listOfIntegerBoxes);
        BoxDemo.outputBoxes(listOfIntegerBoxes);
    }
}
```
输出

```java
Box #0 contains [10]
Box #1 contains [20]
Box #2 contains [30]
```

泛型方法 addBox 定义了一个名为 U 的类型参数。通常，Java 编译器可以推断泛型方法调用的类型参数。
因此，在大多数情况下，您不必指定它们。例如，要调用泛型方法 addBox，可以使用类型声明来指定类型参数，
如下所示：

```java
BoxDemo.<Integer>addBox(Integer.valueOf(10), listOfIntegerBoxes);
```

或者，如果省略类型声明，Java 编译器会自动推断（从方法的参数）类型参数是 Integer：

```java
BoxDemo.addBox(Integer.valueOf(10), listOfIntegerBoxes);

```

## 泛型类的类型推断和实例化

只要编译器可以从上下文中推断出类型参数，就可以 用一组空的类型参数 `<>` 替换调用泛型类的构造函数所需的类型参数。
这对尖括号非正式地称为 钻石。

例如，考虑下面的变量声明：

```java
Map<String, List<String>> myMap = new HashMap<String, List<String>>();

用空的类型参数
Map <String，List <String >> myMap = new HashMap <>（）;
```

请注意，为了在泛型类实例化过程中利用类型推断，您必须使用 `<>`。
在以下示例中，编译器会生成未经检查的转换警告，因为 `HashMap()` 构造函数引用的是 HashMap 原始类型，
而不是 `Map<String, List<String>>` 类型：


```java
Map<String, List<String>> myMap = new HashMap<>();
```

## 泛型和非泛型类型的推论和泛型构造函数

请注意，构造函数在泛型类和非泛型类中都可以是泛型的（换句话说，声明它们自己的正式类型参数）。考虑下面的例子：

```java
class MyClass<X> {
  <T> MyClass(T t) {
    // ...
  }
}
```

考虑下面这个类的实例 MyClass：

```java
new MyClass<Integer>("")
```

此语句创建参数化类型 `MyClass <Integer>` 的实例；该语句明确指定泛型类 `MyClass <X>` 的正式类型参数 X 的类型是 Integer。
请注意，此泛型类的构造函数包含一个正式的类型参数，编译器推断这个泛型类的构造函数的形式类型参数的类型 T 是 String（因为这个构造函数的实际参数是一个 String 对象）。

Java SE 7 以前版本的编译器能够推断泛型构造函数的实际类型参数，类似于泛型方法。
但是，如果使用 `diamond（<>）`，则 Java SE 7 及更高版本中的编译器可以推断实例化的泛型类的实际类型参数。
考虑下面的例子：


```java
MyClass<Integer> myObject = new MyClass<>("");
```
::: tip
重要的是要注意，推理算法只适用调用参数、目标类型以及可能的显式预期返回类型来推断类型。
推理算法不会使用程序中稍后的结果。
:::

## 目标类型

Java 编译器利用目标类型来推断泛型方法调用的类型参数。表达式的目标类型是 Java 编译器期望取决于表达式出现位置的数据类型。
考虑这个方法 Collections.emptyList，声明如下：

```java
static <T> List<T> emptyList();
```

考虑下面的赋值语句：

```java
List<String> listOne = Collections.emptyList();
```

这句话是期待的一个例子  `List<String>`; 这个数据类型是目标类型。
因为方法 emptyList 返回一个  `List<T>` 类型的值，所以编译器推断类型参数 T 必须是值 String。
这可以在 Java SE 7 和 8 中使用。或者，您可以使用类型声明并指定值，T如下所示：

```java
List<String> listOne = Collections.<String>emptyList();
```

但是，在这方面这不是必要的。尽管如此，在其他情况下也是必要的。考虑以下方法：

```java
void processStringList(List<String> stringList) {
    // process stringList
}
```
假设你想用一个空的列表调用 processStringList 方法。在 Java SE 7 中，以下语句不能编译：

```java
processStringList(Collections.emptyList());
```

Java SE 7 编译器生成类似于以下内容的错误消息：

```java
List<Object> cannot be converted to List<String>
```

编译器需要一个类型参数的值 T，所以它以 Object 值开始。因此，调用 Collections.emptyList 返回一个 `List<Object>`
与 processStringList 方法不兼容的类型的值。因此，在 Java SE 7 中，您必须按如下方式指定类型参数值的值：

```java
processStringList(Collections.<String>emptyList());
```

请参阅 [Lambda表达式中的  - 目标类型](../javaoo/lambdaexpressions.md) 以 获取更多信息。
