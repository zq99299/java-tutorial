# 默认方法
[[toc]]

接口部分描述了一个例子，涉及发布行业标准接口的计算机控制汽车的制造商，该接口描述了可以调用哪些方法来操作汽车。如果这些计算机控制的汽车制造商为他们的汽车增加新的功能，如飞行？这些制造商将需要指定新的方法，使其他公司（如电子制导仪器制造商）能够将其软件适用于飞行汽车。这些汽车制造商将在哪里宣布这些与飞行有关的新方法？如果将它们添加到原始接口中，那么已经实现这些接口的程序员将不得不重写它们的实现。如果将它们作为静态方法添加，那么程序员会将它们视为有效方法，而不是作为必要的核心方法。

使用默认方法，可以将新功能添加到库的接口，并确保与为这些接口的旧版本编写的代码的二进制兼容性。

考虑下面的接口

```java
import java.time.*;

public interface TimeClient {
    void setTime(int hour, int minute, int second);
    void setDate(int day, int month, int year);
    void setDateAndTime(int day, int month, int year,
                               int hour, int minute, int second);
    LocalDateTime getLocalDateTime();
}
```

实现类

```java
package defaultmethods;

import java.time.*;
import java.lang.*;
import java.util.*;

public class SimpleTimeClient implements TimeClient {

    private LocalDateTime dateAndTime;

    public SimpleTimeClient() {
        dateAndTime = LocalDateTime.now();
    }

    public void setTime(int hour, int minute, int second) {
        LocalDate currentDate = LocalDate.from(dateAndTime);
        LocalTime timeToSet = LocalTime.of(hour, minute, second);
        dateAndTime = LocalDateTime.of(currentDate, timeToSet);
    }

    public void setDate(int day, int month, int year) {
        LocalDate dateToSet = LocalDate.of(day, month, year);
        LocalTime currentTime = LocalTime.from(dateAndTime);
        dateAndTime = LocalDateTime.of(dateToSet, currentTime);
    }

    public void setDateAndTime(int day, int month, int year,
                               int hour, int minute, int second) {
        LocalDate dateToSet = LocalDate.of(day, month, year);
        LocalTime timeToSet = LocalTime.of(hour, minute, second);
        dateAndTime = LocalDateTime.of(dateToSet, timeToSet);
    }

    public LocalDateTime getLocalDateTime() {
        return dateAndTime;
    }

    public String toString() {
        return dateAndTime.toString();
    }

    public static void main(String... args) {
        TimeClient myTimeClient = new SimpleTimeClient();
        System.out.println(myTimeClient.toString());
    }
}
```

假设你想为 TimeClient 接口添加新的功能，比如通过一个 ZonedDateTime 对象来指定一个时区的能力 （它就像一个 LocalDateTime 对象，除了存储时区信息）：

```java
public interface TimeClient {
    void setTime(int hour, int minute, int second);
    void setDate(int day, int month, int year);
    void setDateAndTime(int day, int month, int year,
        int hour, int minute, int second);
    LocalDateTime getLocalDateTime();                           
    ZonedDateTime getZonedDateTime(String zoneString);
}
```

在对 TimeClient 接口进行修改之后，还需要修改 SimpleTimeClient 类并实现 getZonedDateTime 方法。
但是，应该定义一个默认的实现。（请记住， 抽象方法是没有实现声明的方法。）

```java
package defaultmethods;

import java.time.*;

public interface TimeClient {
    void setTime(int hour, int minute, int second);
    void setDate(int day, int month, int year);
    void setDateAndTime(int day, int month, int year,
                               int hour, int minute, int second);
    LocalDateTime getLocalDateTime();

    static ZoneId getZoneId (String zoneString) {
        try {
            return ZoneId.of(zoneString);
        } catch (DateTimeException e) {
            System.err.println("Invalid time zone: " + zoneString +
                "; using default time zone instead.");
            return ZoneId.systemDefault();
        }
    }

    default ZonedDateTime getZonedDateTime(String zoneString) {
        return ZonedDateTime.of(getLocalDateTime(), getZoneId(zoneString));
    }
}
```

您可以使用  default 来申明为默认方法。接口中的所有方法声明（包括默认方法）都是隐式的 public，所以可以省略 public 修饰符。

使用这个接口，你不需要修改这个 SimpleTimeClient 类，这个类（以及任何实现这个接口的类）将会拥有已经定义好的 getZonedDateTime 方法。以下示例从 TestSimpleTimeClient 调用方法：getZonedDateTimeSimpleTimeClient

```java
package defaultmethods;

import java.time.*;
import java.lang.*;
import java.util.*;

public class TestSimpleTimeClient {
    public static void main(String... args) {
        TimeClient myTimeClient = new SimpleTimeClient();
        System.out.println("Current time: " + myTimeClient.toString());
        System.out.println("Time in California: " +
            myTimeClient.getZonedDateTime("Blah blah").toString());
    }
}
```

## 继承包含默认方法的接口

继承包含默认方法的接口时，可以执行以下操作：

* 根本不提及默认的方法，这可以让你的扩展接口继承默认的方法。
* 重新声明默认的方法，这使得它 abstract。
* 重新定义覆盖它的默认方法。

假设你扩展接口 TimeClient 如下：

```java
public interface AnotherTimeClient extends TimeClient { }
```

任何实现 TimeClient 接口的类，都将具有由默认方法的实现

假设你扩展 TimeClient 接口如下：

```java
public interface AbstractZoneTimeClient extends TimeClient {
    public ZonedDateTime getZonedDateTime(String zoneString);
}
```

任何实现这个 AbstractZoneTimeClient 接口的类 都必须实现 getZonedDateTime 这个方法; 此方法与接口中的所有其他非默认（和非静态）方法一样是 abstract 的。

假设你扩展 TimeClient 接口如下：

```java
public interface HandleInvalidTimeZoneClient extends TimeClient {
    default public ZonedDateTime getZonedDateTime(String zoneString) {
        try {
            return ZonedDateTime.of(getLocalDateTime(),ZoneId.of(zoneString));
        } catch (DateTimeException e) {
            System.err.println("Invalid zone ID: " + zoneString +
                "; using the default time zone instead.");
            return ZonedDateTime.of(getLocalDateTime(),ZoneId.systemDefault());
        }
    }
}
```

任何实现 HandleInvalidTimeZoneClient 的类将使用该接口指定的实现，而不是由 TimeClient 接口指定的实现


## 静态方法

除了默认方法之外，您还可以在接口中定义 **静态方法**。（静态方法是一个与定义它的类相关联的方法，而不是与任何对象相关联的类的每个实例共享其静态方法）这使得您可以更轻松地在库中组织帮助器方法；您可以在同一个接口中保留特定于接口的静态方法，而不是在单独的类中。以下示例定义了一个静态方法，用于检索 ZoneId 与时区标识符对应的 对象; 如果没有 ZoneId 对应于给定标识符的对象，则使用系统默认时区。（因此，您可以简化 getZonedDateTime 方法）：


```java
public interface TimeClient {
    // ...
    static public ZoneId getZoneId (String zoneString) {
        try {
            return ZoneId.of(zoneString);
        } catch (DateTimeException e) {
            System.err.println("Invalid time zone: " + zoneString +
                "; using default time zone instead.");
            return ZoneId.systemDefault();
        }
    }

    default public ZonedDateTime getZonedDateTime(String zoneString) {
        return ZonedDateTime.of(getLocalDateTime(), getZoneId(zoneString));
    }    
}
```

与类中的静态方法类似，您可以指定接口中的方法定义是一个静态方法 ，在方法签名的开始处具有 static 关键字。包含静态方法的接口中的所有方法声明都是隐式的 public，所以可以省略 public 修饰符。

## 将默认方法集成到现有的库中


默认方法使您能够为现有接口添加新功能，并确保与为这些接口的旧版本编写的代码保持二进制兼容性。特别是，使用默认方法可以将接受 lambda 表达式的方法添加为现有接口的参数。本节演示如何 Comparator 使用默认和静态方法增强接口。

::: tip
科普下：Jdk8 的 Comparator 接口有好多默认方法和静态方法
:::

考虑之前所练习的卡牌和一副牌的实现类。这里将用新知识重写

```java
// 一张牌继承了Comparable，可实现排序
public interface Card extends Comparable<Card> {

    // 比点比花的牌技中 花色顺序如下
    public enum Suit {
        DIAMONDS(1, "Diamonds"), // 方块
        CLUBS(2, "Clubs"), // 梅花
        HEARTS(3, "Hearts"),// 红桃
        SPADES(4, "Spades"); // 黑桃

        private final int value;
        private final String text;

        Suit(int value, String text) {
            this.value = value;
            this.text = text;
        }

        public int value() {
            return value;
        }

        public String text() {
            return text;
        }
    }

    public enum Rank {
        DEUCE(2, "Two"),
        THREE(3, "Three"),
        FOUR(4, "Four"),
        FIVE(5, "Five"),
        SIX(6, "Six"),
        SEVEN(7, "Seven"),
        EIGHT(8, "Eight"),
        NINE(9, "Nine"),
        TEN(10, "Ten"),
        JACK(11, "Jack"),
        QUEEN(12, "Queen"),
        KING(13, "King"),
        ACE(14, "Ace");
        private final int value;
        private final String text;

        Rank(int value, String text) {
            this.value = value;
            this.text = text;
        }

        public int value() {
            return value;
        }

        public String text() {
            return text;
        }
    }

    public Card.Suit getSuit();

    public Card.Rank getRank();
}


// 一副牌的接口，定义了各种方法
public interface Deck {

    List<Card> getCards();

    Deck deckFactory();

    int size();

    void addCard(Card card);

    void addCards(List<Card> cards);

    void addDeck(Deck deck);
    /** 洗牌 */
    void shuffle();

    /** 从小到大排序 */
    void sort();

    /** 自定义排序 */
    void sort(Comparator<Card> c);

    /** 返回整副牌的牌值字符串 */
    String deckToString();

    Map<Integer, Deck> deal(int players, int numberOfCards) throws IllegalArgumentException;

}


// 一张牌的实现，且实现了可比较大小的方法 compareTo
public class PlayingCard implements Card {
    // 一张牌由两个元素组成，牌面值和花色
    private Card.Rank rank;
    private Card.Suit suit;

    public PlayingCard(Card.Rank rank, Card.Suit suit) {
        this.rank = rank;
        this.suit = suit;
    }

    public Card.Suit getSuit() {
        return suit;
    }

    public Card.Rank getRank() {
        return rank;
    }

    public boolean equals(Object obj) {
        if (obj instanceof Card) {
            if (((Card) obj).getRank() == this.rank &&
                    ((Card) obj).getSuit() == this.suit) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }


    public int hashCode() {
        return ((suit.value() - 1) * 13) + rank.value();
    }

    public int compareTo(Card o) {
        return this.hashCode() - o.hashCode();
    }

    public String toString() {
        return this.rank.text() + " of " + this.suit.text();
    }

    public static void main(String... args) {
        new PlayingCard(Rank.ACE, Suit.DIAMONDS);
        new PlayingCard(Rank.KING, Suit.SPADES);
    }
}

// 一副牌的实现，和 main 方法中的测试
public class StandardDeck implements Deck {

    private List<Card> entireDeck;

    public StandardDeck(List<Card> existingList) {
        this.entireDeck = existingList;
    }

    public StandardDeck() {
        this.entireDeck = new ArrayList<>();
        for (Card.Suit s : Card.Suit.values()) {
            for (Card.Rank r : Card.Rank.values()) {
                this.entireDeck.add(new PlayingCard(r, s));
            }
        }
    }

    public Deck deckFactory() {
        return new StandardDeck(new ArrayList<Card>());
    }

    public int size() {
        return entireDeck.size();
    }

    public List<Card> getCards() {
        return entireDeck;
    }

    public void addCard(Card card) {
        entireDeck.add(card);
    }

    public void addCards(List<Card> cards) {
        entireDeck.addAll(cards);
    }


    public void addDeck(Deck deck) {
        List<Card> listToAdd = deck.getCards();
        entireDeck.addAll(listToAdd);
    }

    public void sort() {
        Collections.sort(entireDeck);
    }

    public void sort(Comparator<Card> c) {
        Collections.sort(entireDeck, c);
    }


    public void shuffle() {
        Collections.shuffle(entireDeck);
    }

    public Map<Integer, Deck> deal(int players, int numberOfCards)
            throws IllegalArgumentException {
        int cardsDealt = players * numberOfCards;
        int sizeOfDeck = entireDeck.size();
        if (cardsDealt > sizeOfDeck) {
            throw new IllegalArgumentException(
                    "Number of players (" + players +
                            ") times number of cards to be dealt (" + numberOfCards +
                            ") is greater than the number of cards in the deck (" +
                            sizeOfDeck + ").");
        }

        Map<Integer, List<Card>> dealtDeck = entireDeck
                .stream()
                .collect(
                        Collectors.groupingBy(
                                card -> {
                                    int cardIndex = entireDeck.indexOf(card);
                                    if (cardIndex >= cardsDealt) return (players + 1);
                                    else return (cardIndex % players) + 1;
                                }));

        // Convert Map<Integer, List<Card>> to Map<Integer, Deck>
        Map<Integer, Deck> mapToReturn = new HashMap<>();

        for (int i = 1; i <= (players + 1); i++) {
            Deck currentDeck = deckFactory();
            currentDeck.addCards(dealtDeck.get(i));
            mapToReturn.put(i, currentDeck);
        }
        return mapToReturn;
    }

    public String deckToString() {
        // 拉姆达表达式 遍历牌值，并按回车符分割每张牌值
        return this.entireDeck
                .stream()
                .map(Card::toString)
                .collect(Collectors.joining("\n"));
    }

    public static void main(String... args) {
        StandardDeck myDeck = new StandardDeck();
        System.out.println("创建牌:");
        myDeck.sort();
        System.out.println("从小到大整理牌");
        System.out.println(myDeck.deckToString());
        myDeck.shuffle();
        // 按点数排列，相同的则再次按花色排列，从小到大 - 传统的写法
        myDeck.sort(new SortByRankThenSuit());
        System.out.println("按点数排列，相同的则再次按花色排列，从小到大 - 传统的写法");
        System.out.println(myDeck.deckToString());
        myDeck.shuffle();
        // 按点数排列，相同的则再次按花色排列，从小到大 - 拉姆达表达式
        myDeck.sort(
                Comparator.comparing(Card::getRank)
                        .thenComparing(Comparator.comparing(Card::getSuit)));
        System.out.println("按点数排列，相同的则再次按花色排列，从小到大 - 拉姆达表达式");
        System.out.println(myDeck.deckToString());
        myDeck.sort(
                Comparator.comparing(Card::getRank)
                        .reversed() // 把结果反转
                        .thenComparing(Comparator.comparing(Card::getSuit)));
        System.out.println("按点数排列（从大到小），相同的则再次按花色排列（从小到大） - 拉姆达表达式");
        System.out.println(myDeck.deckToString());
    }
}

// 传统的比较器
public class SortByRankThenSuit implements Comparator<Card> {
    public int compare(Card firstCard, Card secondCard) {
        int compVal =
                firstCard.getRank().value() - secondCard.getRank().value();
        if (compVal != 0)
            return compVal;
        else
            return firstCard.getSuit().value() - secondCard.getSuit().value();
    }
}
```

在这里例子里面，最重要的是演示，拉姆达表达式的排序中用到的 Comparator 接口的默认方法和静态方法。

要自己提供一个比较器的话，传统的写法 `SortByRankThenSuit`，但是，这种方法太冗长了; 它会更好，如果你可以指定哪些要排序，而不是如何要排序。假设您是编写 Comparatorjiek 的开发人员。你可以添加什么样的默认或静态方法 Comparator 来使其他开发人员更容易地指定排序条件？

首先，假设你想按照牌点大小排列，不管花色，你可以这样调用

```java
myDeck.sort((o1, o2) -> {
  return o1.getRank().value() - o2.getRank().value()
});
```

因为接口 Comparator 是一个 功能接口，所以可以使用 lambda 表达式作为 sort 方法的参数。在这个例子中，lambda 表达式比较两个整数值。


如果他们可以通过 Comparator 调用方法来创建一个实例，那么对于开发者来说会更简单。特别是，如果您的开发人员可以创建一个 Comparator 实例来比较任何可以从诸如 getValue 或 hashCode 之类的方法返回数值的对象，这将会很有帮助，Comparator 接口已得到增强，这种能力与静态方法 comparing：

```java
myDeck.sort(Comparator.comparing(card -> card.getRank()));
```

在这个列子中，还可以使用方法引用

```java
myDeck.sort(Comparator.comparing(Card::getRank));
```

这个调用更好地演示了要排序的内容，而不是如何去做。

这个 Comparator 接口已经增强了其他版本的静态方法 comparing，例如 comparingDouble， comparingLong 可以让你创建 Comparator 比较其他数据类型的实例。

假设您的开发人员想要创建一个 Comparator 可以比较具有多个条件的对象的实例。例如，你如何按照牌点数排列一副扑克牌，然后是花色？和以前一样，您可以使用 lambda 表达式来指定这些排序条件：

```java
myDeck.sort(
    (firstCard, secondCard) -> {
        int compare =
            firstCard.getRank().value() - secondCard.getRank().value();
        if (compare != 0)
            return compare;
        else
            return firstCard.getSuit().value() - secondCard.getSuit().value();
    }      
);
```

也可以从 Comparator 中构建一系列实例，那么会更简单。Comparato r接口已经使用默认的方法增强了这个功能 thenComparing：

```java
myDeck.sort(
    Comparator
        .comparing(Card::getRank)
        .thenComparing(Comparator.comparing(Card::getSuit)));
```

该 Comparator 接口已被其他版本的默认方法 thenComparing（如 thenComparingDouble 和 thenComparingLong）增强，使您可以构建 Comparator 比较其他数据类型的实例。

假设您的开发人员想要创建一个 Comparator 实例，使其能够以相反的顺序对一组对象进行排序。例如，你如何按照牌点从高到低的顺序排列扑克牌，从 Ace 到 Two（而不是从 Two 到 Ace）？和以前一样，你可以指定另一个 lambda 表达式。但是，如果他们可以通过 Comparator 调用一个方法来反转现有的，那么开发人员会更简单。这个 Comparator 接口已经使用默认的方法增强了这个功能 reversed：

```java
myDeck.sort(
        Comparator.comparing(Card::getRank)
                .reversed() // 把结果反转
                .thenComparing(Comparator.comparing(Card::getSuit)));
```

本示例演示了如何使用 Comparator 默认方法，静态方法，lambda 表达式和方法引用增强接口，以创建更多富有表现力的库方法，这些方法的功能程序员可以通过查看如何调用它们来快速推断。使用这些结构来增强库中的接口。
