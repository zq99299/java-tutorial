# 编写最终类和方法 - final

你可以声明一些或所有类的方法是 **最终** 的，在方法声明中使用关键字 final 来表示该方法不能被子类覆盖。这个 Object 类是这样做的 - 它的一些方法是 final。

你可能希望做一个最终的方法，如果它有一个不应该被改变的实现，并且这个对象的一致状态是关键的。例如，你可能想让 ChessAlgorithm 这个  类的 getFirstPlayer 方法最终：

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

从构造函数调用的方法通常应该被声明为 final。如果构造函数调用非 final 方法，则子类可能会以令人惊讶的或不希望的结果重新定义该方法。

请注意，你也可以声明一个完整的 final 类。一个声明为 final 的类不能被子类化,例如，在创建像 String 类这样的不可变类时，这是特别有用的。
