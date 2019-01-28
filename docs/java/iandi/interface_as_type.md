# 使用接口作为类
当你定义一个新的接口时，你正在定义一个新的参考数据类型。您可以在任何可以使用任何其他数据类型名称的地方使用接口名称。如果您定义了一个类型为接口的引用变量，则您分配给它的任何对象都必须是实现该接口的类的实例。

为一个例子，下面是一个在一对对象中查找最大对象的方法，对于从一个类实例化的任何对象，这些对象实现Relatable：

```java
public Object findLargest(Object object1, Object object2) {
   Relatable obj1 = (Relatable)object1;
   Relatable obj2 = (Relatable)object2;
   if ((obj1).isLargerThan(obj2) > 0)
      return object1;
   else 
      return object2;
}
```

通过转换object1为一个Relatable类型，它可以调用该isLargerThan方法。

如果你Relatable在各种各样的类中实现，那么从任何这些类实例化的对象都可以与findLargest()方法进行比较，只要两个对象是相同的类。同样，他们都可以用下面的方法比较：

```java
public Object findSmallest(Object object1, Object object2) {
   Relatable obj1 = (Relatable)object1;
   Relatable obj2 = (Relatable)object2;
   if ((obj1).isLargerThan(obj2) < 0)
      return object1;
   else 
      return object2;
}

public boolean isEqual(Object object1, Object object2) {
   Relatable obj1 = (Relatable)object1;
   Relatable obj2 = (Relatable)object2;
   if ( (obj1).isLargerThan(obj2) == 0)
      return true;
   else 
      return false;
}
```
这些方法适用于任何“Relatable的”对象，不管它们的类继承是什么.当他们实现时Relatable，他们可以是他们自己的类（或超类）类型和Relatable类型。这给了他们一些多重继承的优点，他们可以从超类和接口都有行为。