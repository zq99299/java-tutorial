# 对象排序

List可以如下排序
```java
Collections.sort(l);
```

如果是一个`List<String>`那么将是按照自然顺序排序。如果是一个`List<Data>`，它将按时间顺序排序。这是怎么回事？只要提供一个实现了`Comparable`接口的比较器，就能自动排序了。下表总结了Java平台中一些类的比较性

| 类 | 自然排序
|----------------
| Byte	| 带符号数字
| Character	| 无符号数值
| Long	| 带符号数字
| Integer	| 带符号数字
| Short	| 带符号数字
| Double	| 带符号数字
| Float	| 带符号数字
| BigInteger	| 带符号数字
| BigDecimal	| 带符号数字
| Boolean	| Boolean.FALSE < Boolean.TRUE
| File	| 路径名上的系统相关的词典
| String	| 词典
| Date	| 按时间顺序
| CollationKey	| 语言特定词典

如果你视图排序一个列表，其中的元素不实现`Comparable`，`Collections.sort(list)`将抛出一个 `ClassCastException`。但是你可以指定一个自己的比较器进进行排序，`Collections.sort(list, comparator)`

## 编写自己的可比较类型
`Comparable`接口包括以下方法 
```java
public interface Comparable<T> {
    public int compareTo(T o);
}
```
该方法接收对象与指定对象的进行比较，并根据返回值：等于还是大于指定对象，返回一个付整数，0 ，或则正整数。如果指定的对象不能与接收对象进行比较，则抛出`ClassCastException`

也就是在自定义对象中编写该对象以什么进行一个排序。
```java
class Name implements Comparable<Name> {
    private final String firstName, lastName;

    public Name(String firstName, String lastName) {
        // 根据业务校验
        if (firstName == null || lastName == null)
            throw new NullPointerException();
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String firstName() {
        return firstName;
    }

    public String lastName() {
        return lastName;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Name))
            return false;
        Name n = (Name) o;
        return n.firstName.equals(firstName) && n.lastName.equals(lastName);
    }

    @Override
    public int hashCode() {
        return 31 * firstName.hashCode() + lastName.hashCode();
    }

    @Override
    public String toString() {
        return firstName + " " + lastName;
    }

    @Override
    public int compareTo(Name n) {
        int lastCmp = lastName.compareTo(n.lastName);
        return (lastCmp != 0 ? lastCmp : firstName.compareTo(n.firstName));
    }
}
```
上面的例子说明了以下几点：
* `Name` 对象是不可变的，对于被用作`Sets`中的元素或则作为`Map`中的键来说，是有必要的
* 构成函数检查null，良好的约束习惯
* 重写`hashCode`方法。且需要重写`equals`方法（两个equals相等的对象，hashCode必须相等）
* 重写`toString`方法，因此可以能打印良好的阅读格式。这是一个好习惯，特别是对于那些放入集合的对象。

Name的compareTo使用了自然顺序的排序方法。

## 比较器
如果你想按照自定义的顺序来排序的话，可以使用比较器`Collections.sort(list, comparator)`

```java
public interface Comparator<T> {
    int compare(T o1, T o2);
}
```

使用这种方式需要注意的就是：对于放入`TreeSet(Comparator<? super E> comparator) ` 集合中的时候，需要注意全面的比较，如果指比对该对象中的 几个属性，那么在插入集合的时候，就有可能造成bug。一切都需要根据自己的业务规则来编写比较器。