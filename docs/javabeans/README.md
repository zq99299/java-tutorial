# JavaBeans

JavaBeans™ 使重用软件组件变得容易。开发人员可以使用他人编写的软件组件，而无需了解其内部工作原理。

要了解为什么软件组件很有用，请考虑一个工人在组装汽车。例如，她没有从头开始构建收音机，而只是获得了一个收音机并将其与汽车的其余部分连接起来。

[本章官网链接](https://docs.oracle.com/javase/tutorial/javabeans/index.html)

由于本章的示例是大部分都偏向 GUI 程序，包括  BeanInfo 之类的都是为了 GUI 组件能够更好的工作，所以本章剔除 GUI 相关知识，只抽取部分知识讲解



## 编写 JavaBeans 组件

Bean 是一种 Java 类，其方法名称遵循 JavaBeans 准则。Bean 构建器工具使用*自省*检查 Bean 类。基于此检查，Bean Builder 工具可以确定 Bean 的属性，方法和事件。

下面讲解 JavaBeans 有关属性、方法、和事件的准则

### 属性

要在 bean 类中定义属性，请提供 `public getter` 和 `setter` 方法。例如，下面的方法定义了一个名为 `mouthWidth` 的 `int` 属性：

```java
public class FaceBean {
    private int mMouthWidth = 90;

    public int getMouthWidth() {
        return mMouthWidth;
    }
    
    public void setMouthWidth(int mw) {
        mMouthWidth = mw;
    }
}
```

本例写了一个可读可写的属性，也可以只有 get 方法（只读）或则只有 set 方法（只写）。

boolean 属性情况特殊，允许使用 `is`  而不是 `get` 定义访问方法。如

```java
public boolean isRunning() {
    // ...
}
```

在以下各节中提供了基本属性的各种专门知识，并在其中进行了描述。

#### 索引属性

一个*索引*属性是一个数组，而不是一个单一的值。在这种情况下，bean 类提供了一种获取和设置整个数组的方法。下面为一个名为 mTestGrades 的 `int[]`  属性定义的访问器

```java
public int[] getTestGrades() {
    return mTestGrades;
}

public void setTestGrades(int[] tg) {
    mTestGrades = tg;
}
```

对于索引属性，bean 类还提供了获取和设置数组的特定元素的方法。

```java
public int getTestGrades(int index) {
    return mTestGrades[index];
}

public void setTestGrades(int index, int grade) {
    mTestGrades[index] = grade;
}
```

#### 绑定属性

当*绑定*属性的值更改时，它会通知侦听器。这有两个含义：

1. bean 类包括 `addPropertyChangeListener()` 和 `removePropertyChangeListener()` 用于管理 bean 的侦听器的方法。
2. 当绑定属性改变好，bean 将发送一个 PropertyChangeEvent 到其注册的侦听器。

```java
import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;

public class FaceBean {
    private int mMouthWidth = 90;
    private PropertyChangeSupport mPcs = new PropertyChangeSupport(this);

    public int getMouthWidth() {
        return mMouthWidth;
    }

    public void setMouthWidth(int mw) {
        int oldMouthWidth = mMouthWidth;
        mMouthWidth = mw;
        mPcs.firePropertyChange("mouthWidth", oldMouthWidth, mw);
    }

    public void addPropertyChangeListener(PropertyChangeListener listener) {
        mPcs.addPropertyChangeListener(listener);
    }

    public void removePropertyChangeListener(PropertyChangeListener listener) {
        mPcs.removePropertyChangeListener(listener);
    }
}
```

想要监听这个 bean 的属性变化，可以使用如上的方式，支持使用监听器（背景是 GUI 程序，所以有类似的监听器思想）

##### 约束属性

约束属性是一类特殊的 **绑定属性**。对于受约束的属性，bean 跟踪一组 **否决侦听器**。当一个受约束的属性即将更改时，将咨询侦听器有关更改的信息。**任何侦听器都有机会否决更改**，在这种情况下，属性将保持不变。

否决侦听器与属性更改侦听器是分开的。幸运的是 `java.beans` 包中有一个 `VetoableChangeSupport` 类，它极大地简化了受约束的属性。

如下使用：

```java
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;
import java.beans.PropertyVetoException;
import java.beans.VetoableChangeListener;
import java.beans.VetoableChangeSupport;
import java.util.concurrent.TimeUnit;

public class FaceBean {
    private int mMouthWidth = 90;
    // 属性监听器
    private PropertyChangeSupport mPcs = new PropertyChangeSupport(this);

    // 约束属性，否决监听器
    private VetoableChangeSupport mVcs = new VetoableChangeSupport(this);

    public int getMouthWidth() {
        return mMouthWidth;
    }

    public void setMouthWidth(int mw) throws PropertyVetoException {
        int oldMouthWidth = mMouthWidth;
        // 先调用否决监听器
        mVcs.fireVetoableChange("mouthWidth", oldMouthWidth, mw);

        mMouthWidth = mw;
        // 属性更改后，再调用属性监听器
        mPcs.firePropertyChange("mouthWidth", oldMouthWidth, mw);
    }

    public void addPropertyChangeListener(PropertyChangeListener listener) {
        mPcs.addPropertyChangeListener(listener);
    }

    public void removePropertyChangeListener(PropertyChangeListener listener) {
        mPcs.removePropertyChangeListener(listener);
    }

    public void addVetoableChangeListener(VetoableChangeListener listener) {
        mVcs.addVetoableChangeListener(listener);
    }

    public void removeVetoableChangeListener(VetoableChangeListener listener) {
        mVcs.removeVetoableChangeListener(listener);
    }

    public static void main(String[] args) throws PropertyVetoException, InterruptedException {
        final FaceBean faceBean = new FaceBean();

        // 注册属性监听器
        faceBean.addPropertyChangeListener(new PropertyChangeListener() {
            @Override
            public void propertyChange(PropertyChangeEvent evt) {
                System.out.println(evt);
            }
        });

        // 注册否决监听器
        faceBean.addVetoableChangeListener(new VetoableChangeListener() {
            @Override
            public void vetoableChange(PropertyChangeEvent evt) throws PropertyVetoException {
                // 模拟拒绝修改
                throw new PropertyVetoException("拒绝修改此属性", evt);
            }
        });
        // 尝试改变属性
        faceBean.setMouthWidth(100);
        TimeUnit.SECONDS.sleep(10);
    }
}
```

运行测试后，将看到如下的异常信息

```
Exception in thread "main" java.beans.PropertyVetoException: 拒绝修改此属性
	at FaceBean$2.vetoableChange(FaceBean.java:54)
	at java.beans.VetoableChangeSupport.fireVetoableChange(VetoableChangeSupport.java:375)
	at java.beans.VetoableChangeSupport.fireVetoableChange(VetoableChangeSupport.java:271)
	at java.beans.VetoableChangeSupport.fireVetoableChange(VetoableChangeSupport.java:299)
	at FaceBean.setMouthWidth(FaceBean.java:20)
	at FaceBean.main(FaceBean.java:57)
```

### 方法

Bean 的*方法*就是它可以做的事情。不属于 属性定义的任何 public 方法都是 bean 方法。当在 NetBeans 等构建器工具的上下文中使用 Bean 时，可以将 Bean 的方法用作应用程序的一部分。例如，您可以按一次按钮来调用 bean 的方法之一。

可以到，这里还是很重的 GUI 程序的身影

### 事件

bean 类可以触发任何类型的事件，包括自定义事件。与属性一样，事件由特定的方法名称模式标识。

```java
public void add<Event>Listener(<Event>Listener a)
public void remove<Event>Listener(<Event>Listener a)
```

侦听器类型必须是 `java.util.EventListener` 的子类。

例如，Swing JButton 是一个 bean，当用户单击它时，它会触发操作事件。JButton 包括以下方法(实际上继承自AbstractButton)，它们是事件的 bean 模式:

```java
public void addActionListener(ActionListener l);
public void removeActionListener(ActionListener l);
```

### BeanInfo

简单说 BeanInfo 是一个类，比如一个类有很多属性，包括事件监听器等，可以使用 BeanInfo 来帮助 GUI 程序呈现这个类的属性，在 GUI 程序上进行修改之类的概念。

## 高级 JavaBeans 主题

### Bean 持久性

当 bean 的属性、字段和状态信息被保存到存储中或从存储中检索时，bean 具有持久性属性。组件模型提供了一种持久性机制，允许将组件的状态存储在非易失性位置，以便以后检索。

使持久性成为可能的机制称为 **序列化**。对象序列化是指将对象转换为 **数据流** 并将其写入存储器。然后，使用该bean 的任何 applet、应用程序或工具都可以通过反序列化来 **“重构”** 它。然后 **将对象恢复到其原始状态**。

例如，Java 应用程序可以将 Microsoft Windows 机器上的框架窗口序列化，序列化后的文件可以通过电子邮件发送到 Solaris 机器上，然后 Java 应用程序可以将框架窗口恢复到 Microsoft Windows 机器上存在的确切状态。

然后，使用该 bean 的任何 applet、应用程序或工具都可以通过反序列化来 **“重构”** 它。

所有 bean 必须持久。要持久，您的 bean 必须通过实现 [`java.io.Serializable`](https://docs.oracle.com/javase/8/docs/api/java/io/Serializable.html)  或则 [`java.io.Externalizable`](https://docs.oracle.com/javase/8/docs/api/java/io/Externalizable.html)  接口

这些接口为您提供了 **自动序列化** 和 **自定义序列化** 的选择。如果一个类的继承层次结构中的任何一个类实现了Serializable 或 Externalizable，那么这个类就是可序列化的。

### 可序列化的类

任何类都是可序列化的，只要该类或父类实现了[`java.io.Serializable`](https://docs.oracle.com/javase/8/docs/api/java/io/Serializable.html)  接口，可序列化类的例子包括Component、String、Date、Vector 和 Hashtable。因此，Component 的任何子类，包括 Applet，都可以序列化。值得注意的 **不支持序列化的类** 包括 Image、Thread、Socket 和 InputStream。试图序列化这些类型的对象将导致NotSerializableException 异常。

Java 对象序列化 API 自动将可序列化对象的 **大多数字段序列化到存储流**。这包括基本类型、数组和字符串。API 不会序列化或反序列化标记为瞬态或静态的字段。

### 控制序列化

您可以控制 bean 所经历的序列化级别。三种控制串行化的方法是：

- 自动序列化，由 Serializable 接口实现。Java 序列化软件序列化整个对象，除了 **瞬态（transient）** 和 **静态（static）** 字段。
- 定制的序列化。通过使用 瞬态(或静态)修饰符标记，**选择性地排除** 不希望序列化的字段。
- 自定义文件格式，由外部化接口及其两个方法实现。bean 是以特定的文件格式编写的。

#### 默认序列化 Serializable 接口

Serializable 接口通过使用 Java 对象序列化工具来提供自动序列化。Serializable **不声明任何方法**；它充当一个 标**记**，告诉对象序列化工具您的 bean 类是可序列化的。将类标记为 Serializable 意味着您正在告诉 Java 虚拟机(JVM)，您已经确保您的类 **将使用默认的序列化**。下面是一些关于使用 Serializable 接口的要点：

- 实现 Serializable 的类必须能够访问 **超类型** 的 **无参数构造函数**。在重新构造时，将访问这些方法。
- 如果已经在超类中实现了 Serializable，则不需要在类中实现它。
- 除了静态和瞬态字段外，所有字段都是序列化的。使用瞬态修饰符可指定不希望序列化的字段和不可序列化的类。

#### 使用 transient 关键字进行选择性序列化

若要在可序列化对象中从序列化中排除字段，请用临时修饰符标记字段。

```java
transient int status;
```

**默认序列化** 不会序列化瞬态和静态字段。

#### 选择性序列化：writeObject 和 readObject

如果可序列化的类包含以下两个方法中的 **任何一个(签名必须准确)**，则 **默认的序列化将不会发生**。

```java
private void writeObject(java.io.ObjectOutputStream out)
    throws IOException;
private void readObject(java.io.ObjectInputStream in)
    throws IOException, ClassNotFoundException;
```

您可以通过编写自己的 writeObject 和 readObject 方法实现来控制如何序列化更复杂的对象。当您需要对序列化的对象进行更大程度的控制时，或者当您需要向序列化流中添加非对象数据成员的数据时，请实现 writeObject 和 readObject 来序列化和反序列化对象。

####  外部化接口 Externalizable 

当您需要完全控制 bean 的序列化时(例如，在编写和读取特定文件格式时)，请使用 Externalizable 接口。要使用Externalizable 接口，您需要实现两个方法：readExternal 和 writeExternal。实现 Externalizable 的类 **必须有一个无参数的构造函数**。

### 长期持久性

长期持久性是一种允许以 XML 格式保存 bean 的模型。

关于 XML 格式和如何为非 bean 实现长期持久性的信息可以在 [XML Schema](https://www.oracle.com/technical-resources/articles/java/persistence3.html) 和使用 [XMLEncoder](https://www.oracle.com/technical-resources/articles/java/persistence4.html) 中找到。

#### Encoder 和 Decoder

[`XMLEncoder`](https://docs.oracle.com/javase/8/docs/api/java/beans/XMLEncoder.html) 类被分配来编写可序列化对象的文本表示的输出文件。下面的代码片段是一个用 XML 格式编写 Java bean 及其属性的例子：

```java
XMLEncoder encoder = new XMLEncoder(
    new BufferedOutputStream(
        new FileOutputStream("Beanarchive.xml")));

encoder.writeObject(object);
encoder.close();
```

[`XMLDecoder`](https://docs.oracle.com/javase/8/docs/api/java/beans/XMLDecoder.html) 类读取用 XMLEncoder 创建的 XML 文档：

```java
XMLDecoder decoder = new XMLDecoder(
    new BufferedInputStream(
        new FileInputStream("Beanarchive.xml")));

Object object = decoder.readObject();
decoder.close();
```

### 什么是 XML？

一个 XML bean 存档有它自己的特定语法，包括以下标记来表示每个 bean 元素：

- 描述 XML 版本和编码类型的 XML 声明

- 包含 bean 的所有对象元素的 `<java>` 标签

- 一个 `<object>` 标记，用于表示从序列化的形式重新构造对象所需的一组方法调用

  ```xml
  <object class="javax.swing.JButton" method="new">
      <string>Ok</string>
  </object>
  
  或则
  
  <object class="javax.swing.JButton">
      <void method="setText">
          <string>Cancel</string>
      </void>
  </object>
  ```

- 定义适当基本类型的标签：

  - `<boolean>`
  - `<byte>`
  - `<char>`
  - `<short>`
  - `<int>`
  - `<long>`
  - `<float>`
  - `<double>`
  
  例如 `<int>5555</int>`
  
- 表示类实例的 `<class>` 标记。

  ```xml
  <class>java.swing.JFrame</class>
  ```

- 用于定义数组的 `<array> ` 标签

  ```xml
  <array class="java.lang.String" length="5">
  </array>
  ```

下面是将 SimpleBean 组件生成的 XML 存档的内容：

```java
<?xml version="1.0" encoding="UTF-8" ?>
<java>
  <object class="javax.swing.JFrame">
    <void method="add">
      <object class="java.awt.BorderLayout" field="CENTER"/>
      <object class="SimpleBean"/>
    </void>
    <void property="defaultCloseOperation">
      <object class="javax.swing.WindowConstants" field="DISPOSE_ON_CLOSE"/>
    </void>
    <void method="pack"/>
    <void property="visible">
      <boolean>true</boolean>
    </void>
  </object>
</java>
```

### Bean 定制

定制提供了一种修改应用程序构建器中 bean 的外观和行为的方法，从而使其满足您的特定需求。对于 bean 开发人员来说，有几个级别的定制可以让其他开发人员从 bean 的潜在功能中获得最大的好处。

以下连结对学习属性编辑器和自定义器非常有用：

- [`PropertyEditor`](https://docs.oracle.com/javase/8/docs/api/java/beans/PropertyEditor.html) interface
- [`PropertyEditorSupport`](https://docs.oracle.com/javase/8/docs/api/java/beans/PropertyEditorSupport.html) class
- [`PropertyEditorManager`](https://docs.oracle.com/javase/8/docs/api/java/beans/PropertyEditorManager.html) class
- [`Customizer`](https://docs.oracle.com/javase/8/docs/api/java/beans/Customizer.html) interface
- [`BeanInfo`](https://docs.oracle.com/javase/8/docs/api/java/beans/BeanInfo.html) interface

大部分是 GUI 相关的，这里就不展开了
