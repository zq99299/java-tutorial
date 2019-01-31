# 不断发展的接口

考虑一下你开发的一个接口

```java
public interface DoIt {
   void doSomething(int i, double x);
   int doSomethingElse(String s);
}
```

假设在稍后的时间，你想添加第三个方法，以便现在的接口变成：

```java
public interface DoIt {

   void doSomething(int i, double x);
   int doSomethingElse(String s);
   boolean didItWork(int i, double x, String s);

}
```

如果你做了这个改变，那么所有实现旧 DoIt 接口的类将会中断，因为它们不再实现旧接口。程序员依靠这个接口会大声抗议。

尝试预测您的接口的所有用途，并从一开始就完全指定它。如果你想添加额外的方法到一个接口，你有几个选项。你可以创建一个 DoItPlus 接口来扩展 DoIt：

```java
public interface DoItPlus extends DoIt {

   boolean didItWork(int i, double x, String s);

}
```
现在，您的代码的用户可以选择继续使用旧接口或升级到新接口。

或者，您可以将您的新方法定义为 默认方法。以下示例定义了一个名为 didItWork 的默认方法 

```java
public interface DoIt {

   void doSomething(int i, double x);
   int doSomethingElse(String s);
   default boolean didItWork(int i, double x, String s) {
       // Method body 
   }

}
```

请注意，您必须提供默认方法的实现。你也可以为现有的接口定义新的 静态方法。拥有使用新的默认或静态方法增强接口的类的用户不必修改或重新编译它们以适应其他方法。
