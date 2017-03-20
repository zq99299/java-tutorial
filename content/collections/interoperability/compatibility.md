# 兼容性
Java集合框架的目的是要保证核心之间完全的互操作性，并且被用来代表在Java平台的早期版本中集合类型： Vector， Hashtable， Array和 Enumeration。在本节中，您将学习如何将旧集合转换为Java框架集合，反之亦然。

## 向上兼容

假设你使用的是一个API，它返回一个旧集合再调用另外一个需要新集合的方法。为了是使两个API平滑地互相操作，你必须将就集合转换为现代集合。如：数组转换成List
```java
Foo[] result = oldMethod(arg);
newMethod(Arrays.asList(result));
```
如果旧的API返回Vector或Hashtable，你有没有工作，因为Vector被改装来实现List接口，并且Hashtable被改进来实现Map。因此，Vector可以直接传递给调用的任何方法Collection或一个List。

也许一个API可能会返回一个Enumeration代表对象的集合。该Collections.list方法的转化Enumeration成Collection。

## 向后兼容

将现代集合转换为旧的集合。
如`Collection.toArray`
或则
```java
        Set<String> requiredAttrs = new HashSet<>();
        requiredAttrs.add("7");
        requiredAttrs.add("8");
        // 要注意这个，给定的数组如果长度小于源，那么将会新建一个与源容量相等的数据返回
        String[] array = requiredAttrs.toArray(new String[requiredAttrs.size()]);
        // 从这里也能够看出来。数组的toString不符合现代集合框架的约定。需要使用工具类来打印
        System.out.println(Arrays.toString(array));
```