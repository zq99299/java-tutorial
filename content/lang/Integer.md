# Integer
![](/assets/lang/Integer.png)
> Integer 类在对象中包装了一个基本类型 int 的值。Integer 类型的对象包含一个 int 类型的字段。 

> 此外，该类提供了多个方法，能在 int 类型和 String 类型之间互相转换，还提供了处理 int 类型时非常有用的其他一些常量和方法。 


先来看看顶层类
# Number
> 抽象类 Number 是 BigDecimal、BigInteger、Byte、Double、Float、Integer、Long 和 Short 类的超类。 

> Number 的子类必须提供将表示的数值转换为 byte、double、float、int、long 和 short 的方法。 

提供的数值转换方法实现很简单：都是直接强转的。（目标类型）value,


测试
```java
    Integer integer = new Integer(123);
    Integer a = 123;
    System.out.println(integer.longValue());
```

#  Integer(int value) 
由这里可以看出来。Integer也是不可变的。
```java
    // 使用基本类型 int 来存储值
    private final int value;
    public Integer(int value) {
        this.value = value;
    }
```

# compareTo(Integer anotherInteger)
> 在数字上比较两个 Integer 对象。 
> 接口 Comparable<Integer> 中的 compareTo

```java
--------- Test ------------
        Integer a = 123;
        int b = 123;
        System.out.println(a.compareTo(b));
```

```java
    public int compareTo(Integer anotherInteger) {
        return compare(this.value, anotherInteger.value);
    }
    public static int compare(int x, int y) {
        return (x < y) ? -1 : ((x == y) ? 0 : 1);
    }
```
使用了最简单的方式来对比数字的大小。

但是这种设计值得学习，公用静态compare方法，数字比较通用。 自己的compareTo方法，更面向对象。