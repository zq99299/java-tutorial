# 创建-问题和练习

## 问题
1. 考虑下面的类

    ```java
    public class IdentifyMyParts {
        public static int x = 7;
        public int y = 3;
    }
    ```

    1. 什么是类变量
    2. 什么是实例变量
    3. 以下代码的输出是什么？
    ```java
    IdentifyMyParts a = new IdentifyMyParts();
    IdentifyMyParts b = new IdentifyMyParts();
    a.y = 5;
    b.y = 6;
    a.x = 1;
    b.x = 2;
    System.out.println("a.y = " + a.y);
    System.out.println("b.y = " + b.y);
    System.out.println("a.x = " + a.x);
    System.out.println("b.x = " + b.x);
    System.out.println("IdentifyMyParts.x = " + IdentifyMyParts.x);
    ```

## 练习

1. 写一个 class，其实例代表一张卡片的单张纸牌。扑克牌有两个不同的特征：点数和花色。确保保留您的解决方案，因为您将被要求在枚举类型中重写它。

  ::: tip
  您可以使用 assert 语句来检查您的作业。你写：

  assert（要测试的布尔表达式）;

  如果布尔表达式为 false，您将收到一条错误消息。例如，

  assert toString(ACE)=="Ace";

  应该返回 true，所以没有错误信息。
  如果您使用 assert语 句，则必须使用该 ea 标志运行程序：

  `java -ea YourProgram.class`
  :::

2. 写一个类，其实例代表一个完整的扑克牌。你也应该保留这个解决方案。

3. 写一个小程序来测试你的扑克牌。该程序可以像创建一张卡片一样简单，并显示其卡片。

## 问题 - 答案

1. 第一题

    1. x
    2. y
    3. 输出如下

    ```java
    a.y = 5
    b.y = 6    
    a.x = 2
    b.x = 2
    IdentifyMyParts.x = 2
    ```    
    因为类中 x 被定义为类变量，所以最后的值将以最后分配的值为准。

2. 第二题

    ```java
    public class Card {
        private final int rank;
        private final int suit;

        // Kinds of suits
        public final static int DIAMONDS = 1;   // 方块
        public final static int CLUBS = 2;  // 梅花
        public final static int HEARTS = 3; // 红桃
        public final static int SPADES = 4; // 黑桃

        // Kinds of ranks
        public final static int ACE = 1;
        public final static int DEUCE = 2;
        public final static int THREE = 3;
        public final static int FOUR = 4;
        public final static int FIVE = 5;
        public final static int SIX = 6;
        public final static int SEVEN = 7;
        public final static int EIGHT = 8;
        public final static int NINE = 9;
        public final static int TEN = 10;
        public final static int JACK = 11;
        public final static int QUEEN = 12;
        public final static int KING = 13;

        public Card(int rank, int suit) {
            assert isValidRank(rank);
            assert isValidSuit(suit);
            this.rank = rank;
            this.suit = suit;
        }

        public int getSuit() {
            return suit;
        }

        public int getRank() {
            return rank;
        }

        public static boolean isValidRank(int rank) {
            return ACE <= rank && rank <= KING;
        }

        public static boolean isValidSuit(int suit) {
            return DIAMONDS <= suit && suit <= SPADES;
        }

        public static String rankToString(int rank) {
            switch (rank) {
                case ACE:
                    return "Ace";
                case DEUCE:
                    return "Deuce";
                case THREE:
                    return "Three";
                case FOUR:
                    return "Four";
                case FIVE:
                    return "Five";
                case SIX:
                    return "Six";
                case SEVEN:
                    return "Seven";
                case EIGHT:
                    return "Eight";
                case NINE:
                    return "Nine";
                case TEN:
                    return "Ten";
                case JACK:
                    return "Jack";
                case QUEEN:
                    return "Queen";
                case KING:
                    return "King";
                default:
                    //Handle an illegal argument.  There are generally two
                    //ways to handle invalid arguments, throwing an exception
                    //(see the section on Handling Exceptions) or return null
                    return null;
            }
        }

        public static String suitToString(int suit) {
            switch (suit) {
                case DIAMONDS:
                    return "Diamonds";
                case CLUBS:
                    return "Clubs";
                case HEARTS:
                    return "Hearts";
                case SPADES:
                    return "Spades";
                default:
                    return null;
            }
        }

        public static void main(String[] args) {

            // 这里只单独的测试了点数和花色
            assert rankToString(ACE) == "Ace";
            assert rankToString(DEUCE) == "Deuce";
            assert rankToString(THREE) == "Three";
            assert rankToString(FOUR) == "Four";
            assert rankToString(FIVE) == "Five";
            assert rankToString(SIX) == "Six";
            assert rankToString(SEVEN) == "Seven";
            assert rankToString(EIGHT) == "Eight";
            assert rankToString(NINE) == "Nine";
            assert rankToString(TEN) == "Ten";
            assert rankToString(JACK) == "Jack";
            assert rankToString(QUEEN) == "Queen";
            assert rankToString(KING) == "King";

            assert suitToString(DIAMONDS) == "Diamonds";
            assert suitToString(CLUBS) == "Clubs";
            assert suitToString(HEARTS) == "Hearts";
            assert suitToString(SPADES) == "Spades";

        }
    }
    ```

3. 第三题

    ```java
    public class Deck {

        public static int numSuits = 4;
        public static int numRanks = 13;
        public static int numCards = numSuits * numRanks;

        private Card[][] cards;

        public Deck() {
            cards = new Card[numSuits][numRanks];
            for (int suit = Card.DIAMONDS; suit <= Card.SPADES; suit++) {
                for (int rank = Card.ACE; rank <= Card.KING; rank++) {
                    cards[suit - 1][rank - 1] = new Card(rank, suit);
                }
            }
        }

        public Card getCard(int suit, int rank) {
            return cards[suit - 1][rank - 1];
        }
    }
    ```

4. 第4题

    ```java
    public class DisplayDeck {
        public static void main(String[] args) {
            Deck deck = new Deck();
            for (int suit = Card.DIAMONDS; suit <= Card.SPADES; suit++) {
                for (int rank = Card.ACE; rank <= Card.KING; rank++) {
                    Card card = deck.getCard(suit, rank);
                    System.out.format("%s of %s%n",
                                      card.rankToString(card.getRank()),
                                      card.suitToString(card.getSuit()));
                }
            }
        }
    }
    ```
