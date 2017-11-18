# 覆盖和隐藏方法

## 实例方法
具有相同签名（名称，加上其参数的数量和类型）的子类中的实例方法以及作为超类中的实例方法的返回类型将覆盖超类的方法。

子类覆盖方法的能力允许类从行为足够“接近”的超类继承，然后根据需要修改行为。覆盖方法具有相同的名称，参数的数量和类型，以及覆盖方法的返回类型。重写方法也可以返回重写方法返回的类型的子类型。这个子类型被称为_协变返回类型_。

当重写一个方法的时候，你可能想使用@Override注释来指示编译器，你打算在超类中覆盖一个方法。如果由于某种原因，编译器检测到该方法在其中一个超类中不存在，则会产生一个错误。有关更多信息@Override，请参阅 [Annotations](/content/java/annotations/index.md)。

## 静态方法

如果一个子类在超类中定义了一个与静态方法具有相同签名的静态方法，那么子类中的方法_隐藏_超类中的方法。

隐藏静态方法和重写实例方法之间的区别具有重要意义：

* 被调用的重写实例方法的版本是子类中的一个。
* 被调用的隐藏静态方法的版本取决于它是从超类还是子类调用。

考虑一个包含两个类的例子。第一个是Animal，它包含一个实例方法和一个静态方法：

```java
public class Animal {
    public static void testClassMethod() {
        System.out.println("The static method in Animal");
    }

    public void testInstanceMethod() {
        System.out.println("The instance method in Animal");
    }
}
public class Cat extends Animal {
    public static void testClassMethod() {
        System.out.println("The static method in Cat");
    }

    public void testInstanceMethod() {
        System.out.println("The instance method in Cat");
    }

    public static void main(String[] args) {
        Cat myCat = new Cat();
        Animal myAnimal = myCat;
        Animal.testClassMethod();
        myAnimal.testInstanceMethod();
        myCat.testClassMethod();
    }
}
```
程序输出

```java
The static method in Animal
The instance method in Cat
The static method in Cat
```

静态方法被隐藏，区别就在与调用方式。而实例方法被调用是子类的方法


## 接口方法

接口中的_默认方法_和 _抽象方法_像实例方法一样被继承。但是，当一个类或接口的超类型提供了具有相同签名的多个缺省方法时，Java编译器遵循继承规则来解决名称冲突。这些规则是由以下两个原则驱动的：

* 实例方法优于接口默认方法。

```java
public class Horse {
    public String identifyMyself() {
        return "I am a horse.";
    }
}
public interface Flyer {
    default public String identifyMyself() {
        return "I am able to fly.";
    }
}
public interface Mythical {
    default public String identifyMyself() {
        return "I am a mythical creature.";
    }
}
public class Pegasus extends Horse implements Flyer, Mythical {
    public static void main(String... args) {
        Pegasus myApp = new Pegasus();
        System.out.println(myApp.identifyMyself());
    }
}
```