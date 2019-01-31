# 问题与练习-枚举
[[toc]]

## 问题

1. 枚举类型可以是 `java.lang.String` 的子类？

    答案：不能。 因为所有枚举都隐式继承 `java.lang.Enum`。因为一个类只能继承一个父类，所以 Java 语言不支持多个继承状态，因此枚举不能继承其他任何东西。

## 练习

1. 在 [前面的练习中写了 Card 类](./creating-questions.md)，这里使用枚举类型重写，以便它代表具有枚举类型的卡的排名和顺序。

2. [重写 Deck 类](./creating-questions.md)

## 练习-答案

### 第一题

看下之前的实现思路：花色和点数分开（因为点数可以复用）；那么这里改成枚举的话，就很清楚了。

```java
public enum Suit {
    DIAMONDS, // 方块
    CLUBS, // 梅花
    HEARTS, // 红套
    SPADES // 黑桃
}
public enum Rank {
    DEUCE, THREE, FOUR, FIVE, SIX, SEVEN,
    EIGHT, NINE, TEN, JACK, QUEEN, KING, ACE
}
// 然后卡牌内部使用枚举来表示具体的某一个牌面
public class Card3 {
    private final Rank rank;
    private final Suit suit;

    public Card3(Rank rank, Suit suit) {
        this.rank = rank;
        this.suit = suit;
    }

    public Suit getSuit() {
        return suit;
    }

    public Rank getRank() {
        return rank;
    }

    public String toString() {
        return rank + " of " + suit;
    }
}
```

### 第二题

瞬间感觉之前的练习好随意。。。明明之前也可以使用这种一维数组的，非要用二维的去

```java
public class Deck3 {
    private Card3[] cards;
    public Deck3() {
        Suit[] suits = Suit.values();
        Rank[] ranks = Rank.values();
        int numSuits = suits.length;
        int numRanks = ranks.length;
        int numCards = numSuits * numRanks;
        cards = new Card3[numCards];

        int count = 0;
        for (Suit suit : suits) {
            for (Rank rank : ranks) {
                cards[count++] = new Card3(rank, suit);
            }
        }
        System.out.println(Arrays.toString(cards));
    }

    public static void main(String[] args) {
        new Deck3();
    }
}
```
