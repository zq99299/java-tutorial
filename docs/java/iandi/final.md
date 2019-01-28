# 编写最终类和方法-final

你可以声明一些或所有类的方法是_最终_的，final在方法声明中使用关键字来表示该方法不能被子类覆盖。这个Object类是这样做的 - 它的一些方法是final。

你可能希望做一个最后的方法，如果它有一个不应该被改变的实现，并且这个对象的一致状态是关键的。例如，你可能想让getFirstPlayer这个ChessAlgorithm类的方法最终：

```java
class ChessAlgorithm {
    enum ChessPlayer { WHITE, BLACK }
    ...
    final ChessPlayer getFirstPlayer() {
        return ChessPlayer.WHITE;
    }
    ...
}
```

从构造函数调用的方法通常应该被声明为final。如果构造函数调用非final方法，则子类可能会以令人惊讶的或不希望的结果重新定义该方法。

请注意，你也可以声明一个完整的final类。一个声明为final的类不能被子类化,例如，在创建像String类这样的不可变类时，这是特别有用的。