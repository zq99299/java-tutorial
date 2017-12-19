# 删除泛型类型

在类型擦除过程中，Java编译器擦除所有类型参数，并在类型参数有界的情况下用它的第一个边界替换每个类型参数; 如果类型参数是无界的，那么它将替换为Object。

考虑以下泛型类，它表示单向链表中的一个节点：

```java
public class Node<T> {

    private T data;
    private Node<T> next;

    public Node(T data, Node<T> next) {
        this.data = data;
        this.next = next;
    }

    public T getData() {
        return data;
    }
}
```

由于参数T是无界的，因此Java编译器将其替换为Object

```java
public class Node {

    private Object data;
    private Node next;

    public Node(Object data, Node next) {
        this.data = data;
        this.next = next;
    }

    public Object getData() { return data; }
    // ...
}
```

在下面的例子中，通用的Node类使用了一个有界的类型参数：

```java
public class Node<T extends Comparable<T>> {

    private T data;
    private Node<T> next;

    public Node(T data, Node<T> next) {
        this.data = data;
        this.next = next;
    }

    public T getData() {
        return data;
    }
    // ...
}
```
Java编译器用第一个绑定类Comparable替换有界的类型参数T
```java
public class Node {

    private Comparable data;
    private Node next;

    public Node(Comparable data, Node next) {
        this.data = data;
        this.next = next;
    }

    public Comparable getData() { return data; }
    // ...
}
```