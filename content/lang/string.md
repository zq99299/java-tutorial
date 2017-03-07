![](/assets/lang/string.png)

# 三个顶层接口
1. Serializable : 类通过实现 java.io.Serializable 接口以启用其序列化功能。未实现此接口的类将无法使其任何状态序列化或反序列化。可序列化类的所有子类型本身都是可序列化的。序列化接口没有方法或字段，仅用于标识可序列化的语义。
2. Comparable<String> : 此接口强行对实现它的每个类的对象进行整体排序。这种排序被称为类的自然排序，类的 compareTo 方法被称为它的自然比较方法。
3. CharSequence : CharSequence 是 char 值的一个可读序列。此接口对许多不同种类的 char 序列提供统一的只读访问。char 值表示 Basic Multilingual Plane (BMP) 或代理项中的一个字符。有关详细信息，请参阅 Unicode 字符表示形式。 

三个顶层接口表示String至少拥有这几个接口的方法实现。

# 开始测试
```java
String hello = new String("你好hee");
        System.out.println(hello.charAt(0));
        hello.compareTo("你");
        hello.compareToIgnoreCase("你好Hee");
```

```
    // 使用char数组存储字符串的值
    private final char value[];

    /** Cache the hash code for the string */
    private int hash; // Default to 0
    
    public String(String original) {
        this.value = original.value;
        this.hash = original.hash;
    }
    
    // 获取指定索引位置的char
    public char charAt(int index) {
        // 做了一个索引越界判断
        if ((index < 0) || (index >= value.length)) {
            throw new StringIndexOutOfBoundsException(index);
        }
        return value[index];
    }
    
```

## compareTo(String anotherString)
按字典顺序比较两个字符串。

那么什么是字典顺序呢?先来看看`Unicode 字符表示形式`
> char 数据类型（和 Character 对象封装的值）基于原始的 Unicode 规范，将字符定义为固定宽度的 16 位实体。
> char 值表示 Basic Multilingual Plane (BMP) 代码点，其中包括代理项代码点，或 UTF-16 编码的代码单元。int 值表示所有 Unicode 代码点，包括增补代码点。

也就是说一个`char`类型对应一个整数。这个整数的大小就是字典顺序

```java
    public int compareTo(String anotherString) {
        int len1 = value.length;
        int len2 = anotherString.value.length;
        int lim = Math.min(len1, len2);
        char v1[] = value;
        char v2[] = anotherString.value;

        int k = 0;
        // 循环最小的那个字符串长度
        while (k < lim) {
            char c1 = v1[k];
            char c2 = v2[k];
            // 不相等的话，就直接返回了，节约了对比时间
            if (c1 != c2) {
                return c1 - c2;
            }
            k++;
        }
        // 如果短串相等，那么直接返回
        // 如：len1 = abc,len2 = ab
        // 由于短串全部相等，那么这里长度相剪：3-2 = 1， 1串大于二串
        // 如果：len1 = ab,len2 = abc, 2-3=-1, 1串小于二串
        // 如果正好相等，那么返回0；

        return len1 - len2;
    }

```

## compareToIgnoreCase(String str)
按字典顺序比较两个字符串。忽略大小写。
```java
  public int compareToIgnoreCase(String str) {
        return CASE_INSENSITIVE_ORDER.compare(this, str);
  }
  public static final Comparator<String> CASE_INSENSITIVE_ORDER
                                         = new CaseInsensitiveComparator();
    private static class CaseInsensitiveComparator
            implements Comparator<String>, java.io.Serializable {
        // use serialVersionUID from JDK 1.2.2 for interoperability
        private static final long serialVersionUID = 8575799808933029326L;

        public int compare(String s1, String s2) {
            int n1 = s1.length();
            int n2 = s2.length();
            int min = Math.min(n1, n2);
            // 和compareTo一样的套路，对比最小串长度
            for (int i = 0; i < min; i++) {
                char c1 = s1.charAt(i);
                char c2 = s2.charAt(i);
                if (c1 != c2) { // 码点不相等，全部转换成大写
                    c1 = Character.toUpperCase(c1);
                    c2 = Character.toUpperCase(c2);
                    if (c1 != c2) { // 还不相等，就全部转换成小写
                        c1 = Character.toLowerCase(c1);
                        c2 = Character.toLowerCase(c2);
                        if (c1 != c2) { // 还不相等，直接返回了。 对Unicode不熟悉，本人不知道在什么情况下会出现这种情况
                            // No overflow because of numeric promotion
                            return c1 - c2;
                        }
                    }
                }
            }
            return n1 - n2;
        }
    }
```
