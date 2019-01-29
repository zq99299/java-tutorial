# 定义不可变对象的策略

以下规则定义了创建不可变对象的简单策略。不是所有记录为“不可变”的类都遵循这些规则。这并不一定意味着这些课程的创作者是马虎的 - 他们可能有充分的理由相信他们的课程在施工后永远不会改变。然而，这种策略需要复杂的分析，而不适合初学者。

1. 不提供“setter”方法 - 修改字段引用的字段或对象的方法。
2. 做所有的领域`final`和`private`。
3. 不允许子类覆盖方法。最简单的方法是将类声明为`final`。更复杂的方法是`private`在工厂方法中使构造函数和构造实例。
4. 如果实例字段包含对可变对象的引用，则不允许更改这些对象：
    1. 不提供修改可变对象的方法。
    2. 不要共享对可变对象的引用。不要存储对传递给构造函数的外部可变对象的引用; 如有必要，请创建副本，并存储对副本的引用。同样，在必要时创建内部可变对象的副本，以避免在方法中返回原件。

应用此策略可以SynchronizedRGB执行以下步骤：

1. 这个类有两种setter方法。第一个，set任意转换对象，并且在该类的不可变版本中没有位置。invert可以通过使其创建新对象而不是修改现有对象来适应第二个。
2. 所有字段都已经private; 他们进一步合格final。
3. 该类本身被声明final。
4. 只有一个字段是指一个对象，该对象本身是不可变的。因此，没有必要改变“包含”可变物体的状态的保障措施。

```java
public final class ImmutableRGB {
    // 值必须是 0 到 255.
    final private int red;
    final private int green;
    final private int blue;
    final private String name;

    private void check(int red,
                       int green,
                       int blue) {
        if (red < 0 || red > 255
                || green < 0 || green > 255
                || blue < 0 || blue > 255) {
            throw new IllegalArgumentException();
        }
    }

    public ImmutableRGB(int red,
                        int green,
                        int blue,
                        String name) {
        check(red, green, blue);
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.name = name;
    }

    // 这个rgb的算法没有什么意义吧？
    public synchronized int getRGB() {
        return ((red << 16) | (green << 8) | blue);
    }

    public synchronized String getName() {
        return name;
    }

    /**
     * 反转颜色
     */
    public ImmutableRGB invert() {
        return new ImmutableRGB(255 - red, 255 - green, 255 - blue, "Inverse of " + name);
    }
}
```