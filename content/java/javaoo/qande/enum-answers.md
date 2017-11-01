# 问题与练习-枚举

## 问题

1. 枚举类型可以是`java.lang.String`的子类？
    
    答案：不能。 因为所有枚举都隐式继承`java.lang.Enum`。因为一个类只能继承一个父类，所以Java语言不支持多个继承状态，因此枚举不能继承其他任何东西。

## 练习

1. 在[前面的练习中写了Card类](/content/java/javaoo/qande/creating-questions.md)，这里使用枚举类型重写，以便它代表具有枚举类型的卡的排名和顺序。

2. [重写 Deck 类](/content/java/javaoo/qande/creating-questions.md)

