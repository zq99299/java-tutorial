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