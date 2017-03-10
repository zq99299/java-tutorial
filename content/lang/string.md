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
** 总结下：**
写了一个自定义比较器。实现的思路是：
1. 循环对比短串的码点
2. 全部转换成大写对比
3. 全部转换成小写对比

## concat(String str)
将指定字符串连接到此字符串的结尾。
```java
"hello".concat("hee");
```
```java
    public String concat(String str) {
        int otherLen = str.length();
        // 如果str为空串，则直接返回自己，也就是不连接
        if (otherLen == 0) {
            return this;
        }
        int len = value.length;
        // 把旧值扩容到一个新数组中去，没有值的下标索引处用 0 补充
        char buf[] = Arrays.copyOf(value, len + otherLen);
        // 把要链接的字符串填充到新的数组中。
        str.getChars(buf, len);
        // 返回一个新串
        return new String(buf, true);
    }
    
    /**
    @param dst 新数组容器
    @param dstBegin 开始索引
    */
    void getChars(char dst[], int dstBegin) {
        //  从指定源数组中复制一个数组，复制从指定的位置开始，到目标数组的指定位置结束。
        // 要注意这里的 value，已经不是连接前的字符串了（hello），这个方法而是“hee”对象里面的了
        System.arraycopy(value, 0, dst, dstBegin, value.length);
    }
```

## boolean contains(CharSequence s) 
当且仅当此字符串包含指定的 char 值序列时，返回 true。 

```java
    public boolean contains(CharSequence s) {
        return indexOf(s.toString()) > -1;
    }
    //  返回指定字符在此字符串中第一次出现处的索引。
    public int indexOf(String str) {
        return indexOf(str, 0);
    }
    //  返回指定字符在此字符串中第一次出现处的索引。在指定位置开始搜索
    public int indexOf(String str, int fromIndex) {
        return indexOf(value, 0, value.length,
                str.value, 0, str.value.length, fromIndex);
    }
    //  shared by String and StringBuffer 该方法是一个共享方法
    // 在源数组中搜索目标数组
    static int indexOf(char[] source, int sourceOffset, int sourceCount,
            char[] target, int targetOffset, int targetCount,
            int fromIndex) {
        // 由于是共享方法，应该是避免某种bug的判断吧
        if (fromIndex >= sourceCount) {
            return (targetCount == 0 ? sourceCount : -1);
        }
        // 这里还要做健壮性判断，难道是明白该方法只能在某处为使用吗？
        if (fromIndex < 0) {
            fromIndex = 0;
        }
        if (targetCount == 0) {
            return fromIndex;
        }
        
        // 获取第一个要搜索的字符
        char first = target[targetOffset];
        // max = 0 + (源长度 - 目标长度)
        int max = sourceOffset + (sourceCount - targetCount);

        for (int i = sourceOffset + fromIndex; i <= max; i++) {
            /* Look for first character. */
            // 如果从索引开始处（对于string来说，都是从0开始）
            // 不等于第一个字符，那么就死循环对比
            if (source[i] != first) {
                while (++i <= max && source[i] != first);
            }


            /* Found first character, now look at the rest of v2 */
            // 如果 i <= max 说明 第一个字符找到了。接下来寻找后面的所有字符
            if (i <= max) {
                int j = i + 1; // 从第一个字符后面一个开始找起
                int end = j + targetCount - 1; // 因为已经找到了一个字符，所以还需要寻找targetCount - 1 次
                //
                for (int k = targetOffset + 1; j < end && source[j]
                        == target[k]; j++, k++);

                if (j == end) {
                    /* Found whole string. */
                    return i - sourceOffset;
                }
            }
        }
        return -1;
    }
```
上面的代码`在源数组中搜索目标数组`是具体的实现，因为是和`StringBuffer` 公用，看起来很费劲，下面把它简化抽取出来：
```java
@Test
    public void test1() throws UnsupportedEncodingException {
        System.out.println(indexOf("我是中国人", "中国"));

    }

    private int indexOf(String sourceStr, String targetStr) {
        char[] source = sourceStr.toCharArray();
        char[] target = targetStr.toCharArray();
        int sourceCount = source.length;
        int targetCount = target.length;

        // 第一个字符
        char first = target[0];
        int max = 0 + (sourceCount - targetCount);

        for (int i = 0; i <= max; i++) {
            // 先找第一个字符
            if (source[i] != first) {
                while (++i <= max && source[i] != first) ;
            }
            if (i <= max) {
                int j = i + 1; // 从找到的后一个字符开始
                // 最难的就是在这个地方，什么时候结束
                int end = j + targetCount - 1;
                for (int k = 1; j < end; k++) {
                   // 这里才明白为什么  end = j + targetCount - 1; 有可能大于 targetCount
                    // 是因为 要取源索引的next值
                    // 这里不会造成下标越界，就是条件 j < end
                    // 真的太巧妙了。我反正是没有真正明白
                    if (source[j] == target[k]) {
                        j++;
                    }
                }
                // 如果 两个相等，就表示上面的循环中取到的每一个值 都是相等的
                // 否则就标识后面的字符有不相等的
                if (j == end) {
                    /* Found whole string. */
                    // 返回第一个字符所在的索引位置
                    return i - 0;
                }
            }
        }
        return -1;
    }
```
来看下搜索的原理图：
![](/assets/lang/indexOf算法示意图.png)

1. 先找第一个字符，如果找到了再找后面的字符。
2. 也就是 j 和 k 只要匹配就都+1，往后匹配下一对。
3. 最难的就是 end，循环多少次了。要保证匹配的字符循环完成，又要取到对应的源字符值。


## int hashCode()
原来hashCode 是根据这个公式来计算的。
```java
    public int hashCode() {
        int h = hash;
        if (h == 0 && value.length > 0) {
            char val[] = value;

            for (int i = 0; i < value.length; i++) {
                h = 31 * h + val[i]; // 累加码点
            }
            hash = h;
        }
        return h;
    }
```

## boolean equals(Object anObject) 

```java 
    public boolean equals(Object anObject) {
        if (this == anObject) {  // 先对比内存地址，这里和 Object中的对比一致
            return true;
        }
        // 然后指对比String类型
        if (anObject instanceof String) {
            String anotherString = (String) anObject;
            int n = value.length;
            // 如果两个值的长度相等，那么就有可能内容一致
            if (n == anotherString.value.length) {
                char v1[] = value;
                char v2[] = anotherString.value;
                int i = 0;
                // 循环判定码点是否相同
                while (n-- != 0) {
                    if (v1[i] != v2[i])
                            return false;
                    i++;
                }
                return true;
            }
        }
        return false;
    }
```

总结如下：
1. 先比较内存地址
2. 再比较字符串长度
3. 再挨个比较内容（码点）

## intern
> 返回字符串对象的规范化表示形式。 
一个初始为空的字符串池，它由类 String 私有地维护。 

> 当调用 intern 方法时，如果池已经包含一个等于此 String 对象的字符串（用 equals(Object) 方法确定），则返回池中的字符串。否则，将此 String 对象添加到池中，并返回此 String 对象的引用。 

> 它遵循以下规则：对于任意两个字符串 s 和 t，当且仅当 s.equals(t) 为 true 时，s.intern() == t.intern() 才为 true。 

> 所有字面值字符串和字符串赋值常量表达式都使用 intern 方法进行操作。字符串字面值在 Java Language Specification 的 §3.10.5 定义。 


> 返回：
> 一个字符串，内容与此字符串相同，但一定取自具有唯一字符串的池。


```java
class TestDemo {
    public static void main(String[] args) {
        String hello = "Hello", lo = "lo";
        System.out.print((hello == "Hello") + " ");
        System.out.print((Other.hello == hello) + " ");
//        System.out.print((other.Other.hello == hello) + " ");
        System.out.print((hello == ("Hel"+"lo")) + " ");
        System.out.print((hello == ("Hel"+lo)) + " ");
        System.out.println(hello == ("Hel"+lo).intern());
    }
}
class Other { static String hello = "Hello"; }

true true true false false
```
> http://docs.oracle.com/javase/specs/jls/se7/html/jls-3.html#d5e1287

文档里面的说明部分英文没看懂是啥意思：但是有以下几点：
1. 字面量 相加是在编译事情合并的。因此相等
2. 字面量 + 变量 是在运行事情创建的，因此是不等的。


# 总结
1. 底层使用Char数组存储
2. 字面量字符串相+，在编译时期合并，放入常量池中
3. 字面量+变量，总是在运行时期new String。
4. intern 函数将把词字符串放入常量池并返回常量池的引用，但是不是改变当前变量的引用
5. hashCode 是根据`h = 31 * h + val[i]; `循环该字符串的长度次数累加码点得到的
6. compareTo 按字典顺序比较，两两比较char的Unicode码点大小实现的。
7. compareToIgnoreCase 忽略大小写是内部定义了一个比较器，比较器实现内部实现为
# 结束语

这一章节看下来，发下里面很多方法都是偏底层的。复杂度很高。基本上我就放弃了。看了几个常用的方法。





