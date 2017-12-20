# 不可确定的类型

[类型擦除](/content/java/generics/erasure.md)部分讨论编译器除去与类型参数和类型参数有关的信息的过程。类型擦除与可变参数（也称为可变参数）方法相关，其可变参数形式参数具有不可确定类型。有关可变参数方法的更多信息，请参阅[将信息传递给方法或构造函数的可变参数部分](/content/java/javaoo/arguments.md)。

* 不可确定的类型
* 堆污染
* 具有不可确定形式参数的可变参数法的潜在弱点
* 使用不可维护的形式参数的可变参数方法预防警告

## 不可确定的类型

可重用类型是一种类型，其类型信息在运行时完全可用。这包括基元，非泛型类型，原始类型和未绑定通配符的调用。

不可修饰类型是在编译时通过类型擦除来删除信息的类型 - 调用未定义为无界通配符的泛型类型。不可修饰的类型在运行时没有提供所有的信息。不可否定类型的例子是`List <String>`和`List <Number>`; JVM在运行时无法区分这些类型。如泛型限制所示，在某些情况下，不可重用的类型不能使用：例如，在表达式的实例中，或作为数组中的元素。

## 堆污染

当参数化类型的变量引用不是该参数化类型的对象时，会发生堆污染。如果程序在编译时执行了一些导致未经检查的警告的操作，则会出现这种情况。一个未经检查的警告如果产生，无论是在编译时或运行时（的编译时间类型检查规则的范围内），操作涉及一个参数化的类型的正确性（例如，流延或方法调用）不能验证。例如，在混合原始类型和参数化类型时，或执行未经检查的转换时会发生堆污染。

在正常情况下，当所有代码被同时编译时，编译器会发出一个未经检查的警告，以引起您注意潜在的堆污染。如果分别编译代码的各个部分，则很难检测到堆污染的潜在风险。如果你确保你的代码编译没有警告，那么不会发生堆污染。

## 具有不可确定形式参数的可变参数法的潜在弱点

包含可变参数输入参数的通用方法可能导致堆污染。

考虑下面的ArrayBuilder类：

```java
public class ArrayBuilder {

  public static <T> void addToList (List<T> listArg, T... elements) {
    for (T x : elements) {
      listArg.add(x);
    }
  }

  public static void faultyMethod(List<String>... l) {
    Object[] objectArray = l;     // Valid
    objectArray[0] = Arrays.asList(42);
    String s = l[0].get(0);       // ClassCastException thrown here
  }

}
```

以下示例HeapPollutionExample使用ArrayBuiler类：

```java
public class HeapPollutionExample {

  public static void main(String[] args) {

    List<String> stringListA = new ArrayList<String>();
    List<String> stringListB = new ArrayList<String>();

    ArrayBuilder.addToList(stringListA, "Seven", "Eight", "Nine");
    ArrayBuilder.addToList(stringListB, "Ten", "Eleven", "Twelve");
    List<List<String>> listOfStringLists =
      new ArrayList<List<String>>();
    ArrayBuilder.addToList(listOfStringLists,
      stringListA, stringListB);

    ArrayBuilder.faultyMethod(Arrays.asList("Hello!"), Arrays.asList("World!"));
  }
}
```

编译时，ArrayBuilder.addToList方法的定义会产生以下警告：

```java
warning: [varargs] Possible heap pollution from parameterized vararg type T
```

当编译器遇到可变参数方法时，它将可变参数形式参数转换为数组。但是，Java编程语言不允许创建参数化类型的数组。在该方法中ArrayBuilder.addToList，编译器将可变参数形式参数T... elements转换为形式参数T[] elements，即数组。但是，由于类型擦除，编译器将可变参数形式参数转换为Object[] elements。因此，堆污染有可能。

以下语句将可变参数形式参数l指定给Object数组objectArgs：

```java
Object[] objectArray = l;
```

这一说法可能会引入堆积污染。l可以将与可变参数形式参数的参数化类型匹配的值分配给该变量objectArray，并且因此可以被分配给该变量l。但是，编译器不会在此语句中生成未经检查的警告。编译器已经生成了警告，当它翻译了可变参数的形式参数`List<String>`... l的形式参数List[] l。这个声明是有效的; 该变量l具有类型List[]，这是一个子类型Object[]。


因此，如果您将List任何类型的对象分配给数组的任何数组组件，则编译器不会发出警告或错误objectArray，如以下语句所示：

```java
objectArray[0] = Arrays.asList(42);
```

## 防止具有不可确定的形式参数的可变参数方法的警告


如果声明了一个参数为可变参数类型的可变参数方法，并且ClassCastException由于不正确地处理可变参数形式参数而确保方法的主体不会引发其他类似的异常，则可以防止编译器生成的警告通过向静态和非构造函数方法声明添加以下注释，以获得这些可变参数方法：

```java
@SafeVarargs
```

@SafeVarargs注释是该方法的合同的书面一部分; 该注解断言该方法的实现不会不当地处理可变参数形式参数。

通过在方法声明中添加以下内容，也可能（虽然不太理想）压制这样的警告：

```java
@SuppressWarnings({"unchecked", "varargs"})
```

但是，这种方法不会抑制该方法的调用网站产生的警告。如果您对@SuppressWarnings语法不熟悉，请参阅 注解。


> :exclamation: 完全没看懂这一节讲的
> https://docs.oracle.com/javase/tutorial/java/generics/nonReifiableVarargsType.html