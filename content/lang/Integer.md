# Integer
![](/assets/lang/Integer.png)
> Integer 类在对象中包装了一个基本类型 int 的值。Integer 类型的对象包含一个 int 类型的字段。 

> 此外，该类提供了多个方法，能在 int 类型和 String 类型之间互相转换，还提供了处理 int 类型时非常有用的其他一些常量和方法。 


先来看看顶层类
# Number
> 抽象类 Number 是 BigDecimal、BigInteger、Byte、Double、Float、Integer、Long 和 Short 类的超类。 

> Number 的子类必须提供将表示的数值转换为 byte、double、float、int、long 和 short 的方法。 

提供的数值转换方法实现很简单：都是直接强转的。（目标类型）value,


# 测试
```java
Integer integer = new Integer(123);
Integer a = 123;
int b = 123;
int c = 127;
int d = 128;
int e = 129;
int f = 127;
int g = 128;
System.out.println(a.compareTo(b));
System.out.println(a.equals(b));
System.out.println(a.hashCode());
System.out.println(Integer.signum(b));
System.out.println(Integer.valueOf("-5"));
System.out.println(b == a);
System.out.println(integer == a);
System.out.println(integer.longValue());
System.out.println(a + b + e + d + c);
```

##  Integer(int value) 
由这里可以看出来。Integer也是不可变的。
```java
    // 使用基本类型 int 来存储值
    private final int value;
    public Integer(int value) {
        this.value = value;
    }
```

## compareTo(Integer anotherInteger)
> 在数字上比较两个 Integer 对象。 
> 接口 Comparable<Integer> 中的 compareTo

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

## boolean equals(Object obj)
```java
    //重写了方法，不对比地址。直接比较 数值。
    public boolean equals(Object obj) {
        if (obj instanceof Integer) {
            return value == ((Integer)obj).intValue();
        }
        return false;
    }
    public int hashCode() {
        // 直接返回的数值
        return value;
    }
```

## int signum(int i)
> 返回指定 int 值的符号函数。（如果指定值为负，则返回 －1；如果指定值为零，则返回 0；如果指定的值为正，则返回 1。） 
```java
    public static int signum(int i) {
        // HD, Section 2-7
        return (i >> 31) | (-i >>> 31);
    }
```
这个函数还挺有用的。就是不知道为什么是 31 ？

## Integer valueOf(String s)
> 返回一个表示指定的 int 值的 Integer 实例。如果不需要新的 Integer 实例，则通常应优先使用该方法，而不是构造方法 Integer(int)，因为该方法有可能通过缓存经常请求的值而显著提高空间和时间性能。 

```java
    // 能解析多种类型的值
    public static Integer valueOf(String s) throws NumberFormatException {
        // parseInt 里面的实现我感觉有点偏底层了，要了解码点才好理解，就不看了
        return Integer.valueOf(parseInt(s, 10));
    }
    public static Integer valueOf(int i) {
        assert IntegerCache.high >= 127; // 该范围还必须 大于等于127.所以在配置的时候也要小心
        if (i >= IntegerCache.low && i <= IntegerCache.high)
            return IntegerCache.cache[i + (-IntegerCache.low)];
            
        // 不在缓存范围内的就返回新实例
        return new Integer(i);
    }
    // 该类对 -128 到 127 的值 进行了缓存。
    private static class IntegerCache {
        static final int low = -128;
        static final int high;
        static final Integer cache[];

        static {
            // high value may be configured by property
            int h = 127;
            // h 的范围可配
            String integerCacheHighPropValue =
                sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
            if (integerCacheHighPropValue != null) {
                int i = parseInt(integerCacheHighPropValue);
                i = Math.max(i, 127);
                // Maximum array size is Integer.MAX_VALUE
                h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
            }
            high = h;
            // 使用数组存储实例化的对象
            cache = new Integer[(high - low) + 1];
            int j = low;
            for(int k = 0; k < cache.length; k++)
                cache[k] = new Integer(j++);
        }

        private IntegerCache() {}
    }
```

该方法是一个很有意思的事情。面试题中经常靠这个知识点。
先来看一下测试代码 和 编译生成的 class 文件。
```java
---------- Test ----------
        Integer integer = new Integer(123);
        Integer a = 123;
        int b = 123;
        int c = 127;
        int d = 128;
        int e = 129;
        int f = 127;
        int g = 128;
        System.out.println(a.compareTo(b));
        System.out.println(a.equals(b));
        System.out.println(a.hashCode());
        System.out.println(Integer.signum(b));
        System.out.println(Integer.valueOf("-5"));
        System.out.println(b == a);
        System.out.println(integer == a);
        System.out.println(integer.longValue());
        System.out.println(a + b + e + d + c);
        
---------- class ----------
        Integer integer = new Integer(123);
        Integer a = Integer.valueOf(123);
        byte b = 123;
        byte c = 127;
        short d = 128;
        short e = 129;
        boolean f = true;
        boolean g = true;
        System.out.println(a.compareTo(Integer.valueOf(b)));
        System.out.println(a.equals(Integer.valueOf(b)));
        System.out.println(a.hashCode());
        System.out.println(Integer.signum(b));
        System.out.println(Integer.valueOf("-5"));
        System.out.println(b == a.intValue());
        System.out.println(integer == a);
        System.out.println(integer.longValue());
        System.out.println(a.intValue() + b + e + d + c);
        
```

对比下可以看出来，在编译时期做了很多操作。
1. 自动装箱 使用了Integer.valueOf()
2. 对于各个数值的范围使用了对应的类型，减少占用空间
3. 对于没有使用的值，直接使用boolean类型
4. 在基本类型和 包装类型 == 比较的时候，自动拆箱了
5. 对象间 == 是比较内存地址。

看完这个其实就明白了。网络上的面试题你就能知道是为什么了
```java
    Integer int1 = Integer.valueOf("100");
    Integer int2 = Integer.valueOf("100");
    System.out.println(int1 == int2); // true
    Integer int1 = Integer.valueOf("128");
    Integer int2 = Integer.valueOf("128");
    System.out.println(int1 == int2); // false
```


# 总结
1. 自动装箱 使用了Integer.valueOf()
2. 对于各个数值的范围使用了对应的类型，减少占用空间
3. 对于没有使用的值，直接使用boolean类型
4. 在基本类型和 包装类型 == 比较的时候，自动拆箱了
5. 对象间 == 是比较内存地址。
6. 对-127~128之间的数值做了缓存，结合底层编译的优化，在这区间频繁出现的数字将大大提高性能


