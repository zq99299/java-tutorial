# StringBuilder
> 一个可变的字符序列。此类提供一个与 StringBuffer 兼容的 API，但不保证同步。该类被设计用作 StringBuffer 的一个简易替换，用在字符串缓冲区被单个线程使用的时候（这种情况很普遍）。
在 StringBuilder 上的主要操作是 append 和 insert 方法，可重载这些方法，以接受任意类型的数据。每个方法都能有效地将给定的数据转换成字符串，然后将该字符串的字符追加或插入到字符串生成器中。append 方法始终将这些字符添加到生成器的末端；而 insert 方法则在指定的点添加字符。 

![](/assets/lang/StringBuild接口和继承接口.png)

![](/assets/lang/StringBuild实现和继承的方法.png)

从图上可以看到关系，这里说一下：实线蓝色箭头是继承类，虚线绿色箭头是实现接口。

图是用idea中在你要查看的类名上点击：diagrams 功能查看的。后续文章将会再贴出详细的继承方法图了。

先看官网文档这几个类的意思和区别：部分类常见的也就不说明了。


# 接口和继承类简要说明
## Appendable
> 能够被添加 char 序列和值的对象。要添加的字符应该是有效的 Unicode 字符

## AbstractStringBuilder
> 实现了一个可修改的字符串。在任何时候，它包含一些特定的字符序列，但序列的长度和内容可以通过某些方法调用改变。

思路是：
从最简单的构造入手，
再把顶层接口的方法解析了，因为是最少的。也最能代表这个类至少有哪些功能。

```java
  char[] value;
```

# 分析
Test
```java
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append('A');
        stringBuilder.append("中国");
        stringBuilder.append(true);
```
## new StringBuilder()
```java
    public StringBuilder() {
        // 默认初始化16个char长度
        super(16);
    }
```
使用类父类的构造，来看看父类构造;
```java
------------ AbstractStringBuilder -----------------
  char[] value; //存储容器
  int count; //正真的使用量
    AbstractStringBuilder(int capacity) {
        value = new char[capacity];
    }
```

可以看出来，这里和String底层都是使用char数组来存储的。

## StringBuilder append(char c)
```java
    @Override
    public StringBuilder append(char c) {
        super.append(c);
        return this;
    }
```
```java
------------ AbstractStringBuilder -----------------
    @Override
    public AbstractStringBuilder append(char c) {
        ensureCapacityInternal(count + 1);
        value[count++] = c;
        return this;
    }
    // 确保内部容量
    private void ensureCapacityInternal(int minimumCapacity) {
        // overflow-conscious code
        // 如果当前所需要的容量大于了 容器的容量就扩容
        if (minimumCapacity - value.length > 0)
            expandCapacity(minimumCapacity);
    }
    // 扩大容量
    void expandCapacity(int minimumCapacity) {
        // 源容量的2倍 + 2
        int newCapacity = value.length * 2 + 2;
        if (newCapacity - minimumCapacity < 0)
            newCapacity = minimumCapacity;
        if (newCapacity < 0) {
            if (minimumCapacity < 0) // overflow
                throw new OutOfMemoryError();
            newCapacity = Integer.MAX_VALUE;
        }
        // 上面校验了新容量和旧所需容量的 正确性
        // copy值到新的数组中
        value = Arrays.copyOf(value, newCapacity);
    }
```

### 小结
在使用appen的时候，如果能确定大概需要多少容量，最好提前初始化合适的容量，减少扩容操作。

## StringBuilder append(String str) 
```java
    @Override
    public StringBuilder append(String str) {
        super.append(str);
        return this;
    }
```
```java
------------ AbstractStringBuilder -----------------
    public AbstractStringBuilder append(String str) {
        if (str == null)
            return appendNull();
        int len = str.length();
        // 把字符串 还是使用了String内部的数组复制操作。
        ensureCapacityInternal(count + len);
        //将字符从此字符串复制到目标字符数组。
        // 参数依次是：从哪一个范围内的字符复制到 value数组中，从value数组中的 count 位置开始赋值
        str.getChars(0, len, value, count);
        count += len;
        return this;
    }
```

## AbstractStringBuilder append(boolean b) 
这个就很有意思了：原来是手动写死的。手动转换成char插入
```java
------------ AbstractStringBuilder -----------------

    public AbstractStringBuilder append(boolean b) {
        if (b) {
            ensureCapacityInternal(count + 4);
            value[count++] = 't';
            value[count++] = 'r';
            value[count++] = 'u';
            value[count++] = 'e';
        } else {
            ensureCapacityInternal(count + 5);
            value[count++] = 'f';
            value[count++] = 'a';
            value[count++] = 'l';
            value[count++] = 's';
            value[count++] = 'e';
        }
        return this;
    }
```

## append 小结
所有的append内部实现都是把对应的数据类型转换成 char ，在插入的，而不是像我们自己实现那样把所有的都转换成String，

String、Integer、Long 都有 getChars 这个方法，把自己转换成char再copy到目标数组中去。


## indexOf
该方法到最后也是直接调用的是 String自身的公用查找函数。

然后来看看APi中说道最主要的下一个函数

## StringBuilder insert(int offset, String str)  
```java
------------ AbstractStringBuilder -----------------

    public AbstractStringBuilder insert(int offset, String str) {
        if ((offset < 0) || (offset > length()))
            throw new StringIndexOutOfBoundsException(offset);
        if (str == null)
            str = "null";
        int len = str.length();
        ensureCapacityInternal(count + len);
        // 上个函数用得很频繁哇。把offset + 插入的字符串长度后的字符往后挪（copy过去）
        // 这是个原生方法，性能应该会很好
        System.arraycopy(value, offset, value, offset + len, count - offset);
        // 挪完之后再从offset处把插入的字符串copy过去，这样就完成了乾坤大挪移
        str.getChars(value, offset);
        
        count += len;
        return this;
    }
```
### 小结
都是增加字符，所以和 append一样都调用了 确保内部容量的函数。两步重要的实现插入：
1. 把要插入处+插入字符的长度后的所有值都往后挪动
2. 再把插入字符copy到 插入处。

## StringBuilder reverse()
反转函数，在实际中用到的几率还是很少的，但是呢这个源码思路真的挺不错的；

```java
------------ AbstractStringBuilder -----------------
 public AbstractStringBuilder reverse() {
        boolean hasSurrogates = false;
        int n = count - 1;
        for (int j = (n-1) >> 1; j >= 0; j--) {
            int k = n - j;
            char cj = value[j];
            char ck = value[k];
            value[j] = ck;
            value[k] = cj;
            // 这个是判断是否不代理码点
            if (Character.isSurrogate(cj) ||
                Character.isSurrogate(ck)) {
                hasSurrogates = true;
            }
        }
        if (hasSurrogates) {
            // 是代理码点的话用另外一种方式反转
            reverseAllValidSurrogatePairs();
        }
        return this;
    }
```
上面的代码用的值交换的原理，在冒泡排序里面会用到类似的交换技巧。
我们把上面的简化一下
```java
    @Test
    public void t1() {
        StringBuilder sb = new StringBuilder("1234567");
        System.out.println(sb);
        System.out.println(reverse(sb.toString()));
        sb.reverse();
        System.out.println(sb);

    }

    // 反转此字符串
    public String reverse(String str) {
        char[] chars = str.toCharArray();
        int length = str.length();
        // 从中间值开始往两边扩散 对换位置
        int n = length - 1; //数组从0开始，防止越界
        // 注意这里的 left的值
        for (int left = (n - 1) / 2; left >= 0; left--) {
            int right = n - left;
            System.out.println(String.format("left=%d,right=%d", left, right));
            char leftChar = chars[left]; //左边
            char rightChar = chars[right]; //右边
            chars[left] = rightChar;
            chars[right] = leftChar;
        }
        return new String(chars);
    }
```
来看看测试结果：
```java
当要转换的字符串是奇数的时候（索引是偶数）
left = (n - 1) / 2    |  left = (n) / 2
1234567               |  1234567
left=2,right=4        |  left=3,right=3
left=1,right=5        |  left=2,right=4
left=0,right=6        |  left=1,right=5
7654321               |  left=0,right=6
                      |  7654321 
                      
                      
当要转换的字符串是偶数的时候（索引是奇数）
left = (n - 1) / 2    |  left = (n) / 2
123456                |  123456
left=2,right=3        |  left=2,right=3
left=1,right=4        |  left=1,right=4
left=0,right=5        |  left=0,right=5
654321                |  7654321 
                      
```

从测试结果看来，n-1 的主要结果就是为了在奇数字符串（索引为偶数）的时候，对半分的话，会造成right和left得到同一个值，同一个值不应该再交换的。

## String substring(int start, int end)
substring 也是经常用到的，来看看
```java
------------ AbstractStringBuilder -----------------

    public String substring(int start, int end) {
        if (start < 0)
            throw new StringIndexOutOfBoundsException(start);
        if (end > count)
            throw new StringIndexOutOfBoundsException(end);
        if (start > end)
            throw new StringIndexOutOfBoundsException(end - start);
        // 利用了 我们经常在IO中读取流的时候的一个方式    
        return new String(value, start, end - start);
    }
    而 String构成函数里面的实现是这样的：从value中offset开始赋值到offset+count结束(不包括)
    Arrays.copyOfRange(value, offset, offset+count);
    
```

# 总结
1. StringBuilder 线程是不安全的
2. 底层也是使用 char数组来作为容器，因为是可变的，所以也有扩容（和集合体系中的扩容类似）
3. 可变字符序列
4. indexOf 函数委托String自身的公用indexOf函数
5. 适当分配初始容量有助于提高性能


reverse的原理实现值得学习：对半分，然后首尾交换。

# StringBuilder 和 StringBuffer 的区别
通过原来源码来看的话：

1. StringBuffer 线程安全
    StringBuffer 绝大部分的API都是直接加`synchronized`修饰，保证多线程中的安全性
2. 他们绝大部分API都是委托AbstractStringBuilder来操作。StringBuffer只是重写后加了锁





