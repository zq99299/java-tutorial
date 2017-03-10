# StringBuilder
> 一个可变的字符序列。此类提供一个与 StringBuffer 兼容的 API，但不保证同步。
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


