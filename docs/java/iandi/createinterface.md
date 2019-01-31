# 接口
[[toc]]

软件工程中有许多情况，对于不同的程序员群体来说，同意一个「契约」来阐明他们的软件如何相互作用是非常重要的。每个组都应该能够编写自己的代码，而不需要知道如何编写其他组的代码。一般来说，**接口** 就是这样的合同。

例如，想象一个未来的社会，在这个社会中，电脑控制的机器人汽车在没有操作人员的情况下通过城市街道运送乘客。汽车制造商编写运行汽车停止的软件（当然是 Java），启动、加速、左转、等等。另一个工业集团，电子制导仪器制造商，使计算机系统接收 GPS（全球定位系统）的位置数据和无线传输的交通状况，并使用该信息来驱动汽车。

汽车制造商必须发布一个行业标准接口，详细说明可以调用什么方法使车辆移动（任何制造商生产的任何汽车）。然后指导制造商可以编写调用接口中描述的方法来指挥汽车的软件。工业组织都不需要知道其他组织的软件是如何实施的。实际上，每个组织都认为它的软件是高度专有的，并且保留随时修改它的权利，只要它继续遵守公布的接口。


## Java 中的接口

在 Java 编程语言中，一个 **接口** 是一个引用类型，类似于类，它可以只包含常量，方法签名，默认的方法，静态方法和嵌套类型。方法体仅存在于默认方法和静态方法中。接口不能被实例化 - 它们只能由类实现或由其他接口继承。继承将在本课稍后讨论。

定义一个接口类似于创建一个新的类：

```java
public interface OperateCar {

   // 常量声明，如果有的话

   // 方法签名

   // 一个枚举值 RIGHT, LEFT
   int turn(Direction direction,
            double radius,
            double startSpeed,
            double endSpeed);
   int changeLanes(Direction direction,
                   double startSpeed,
                   double endSpeed);
   int signalTurn(Direction direction,
                  boolean signalOn);
   int getRadarFront(double distanceToCar,
                     double speedOfCar);
   int getRadarRear(double distanceToCar,
                    double speedOfCar);
         ......
   // 更多的方法签名
}
```

请注意，方法签名没有大括号，并以分号结尾。

要使用接口，您需要编写一个实现接口的类。当一个可实例化的类实现一个接口时，它为接口中声明的每个方法提供一个方法体。例如，

```java
public class OperateBMW760i implements OperateCar {

    // the OperateCar method signatures, with implementation --
    // for example:
    int signalTurn(Direction direction, boolean signalOn) {
       // code to turn BMW's LEFT turn indicator lights on
       // code to turn BMW's LEFT turn indicator lights off
       // code to turn BMW's RIGHT turn indicator lights on
       // code to turn BMW's RIGHT turn indicator lights off
    }

    // other members, as needed -- for example, helper classes not
    // visible to clients of the interface
}
```

在上面的机器人汽车示例中，汽车制造商将实现接口。当然，雪佛兰的实施与丰田的实现将大不相同，但两家制造商将坚持相同的接口。作为接口客户的指导制造商将构建使用汽车位置的 GPS 数据，数字街道地图和交通数据来驱动汽车的系统。这样做时，指导系统将调用接口方法：转弯、变道、制动、加速等等。

## 接口作为API

机器人车的例子显示了一个接口被用作工业标准的应用程序编程接口（API）。API 在商业软件产品中也很常见。通常情况下，一家公司销售一个软件包，其中包含另一家公司想要在自己的软件产品中使用的复杂方法。一个例子就是出售给制造最终用户图形程序的公司的一套数字图像处理方法。图像处理公司编写它的类来实现一个接口，并将其公开给客户。图形公司然后使用接口中定义的签名和返回类型来调用图像处理方法。虽然图像处理公司的 API 是公开的（对其客户），但其 API 的实现仍然是一个严密保密的秘密 - 事实上
