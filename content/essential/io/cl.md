# 命令行I/O
程序通常从命令行运行，并在命令行环境中与用户进行交互。Java平台通过两种方式支持这种交互：通过标准流和控制台。

## 标准流
标准流是许多操作系统的特征。默认情况下，它们从键盘读取输入并输出到显示器。它们还支持文件和程序之间的I / O，但该功能由命令行解释器而不是程序控制。

Java平台支持三种标准流：
* 标准输入，通过访问System.in; 
* 标准输出，通过System.out; 
* 标准错误，通过访问System.err。

这些对象是自动定义的，不需要打开。

标准输出和标准错误，均为输出。单独进行错误输出允许用户将常规输出转移到文件，并仍然能够读取错误消息。有关更多信息，请参阅命令行解释器的文档。

您可能希望标准流是字符流，但是由于历史原因，它们是字节流。System.out 和 System.err定义为 PrintStream对象。虽然技术上是字节流，但是PrintStream利用内部字符流对象来模拟字符流的许多特征。

相反，System.in是没有字符流特征的字节流。要使用标准输入作为字符流，使用InputStreamReader包装System.in
```java
InputStreamReader cin = new InputStreamReader(System.in);
```

## 控制台

标准流的更高级替代方案是控制台。这是一个单一的预定义类型的对象， `Console`类它具有标准流提供的大部分功能，另外还有其他特性。控制台特别适用于安全的密码输入。控制台对象还通过其`reader`和`writer`方法提供真正的字符流的输入和输出流。

在程序可以使用控制台之前，必须通过调用来尝试检索控制台对象`System.console()`。如果`Console`对象可用，则此方法返回。如果`System.console`返回NULL，则不允许控制台操作，因为操作系统不支持，或因为程序在非交互环境中启动。

控制台对象通过其`readPassword`方法支持安全密码输入。此方法有助于以两种方式保护密码输入。

* 首先，它抑制回音，所以密码在用户的屏幕上不可见。
* 第二，readPassword返回一个字符数组，而不是一个String，所以密码可以被覆盖，一旦不再需要就将其从内存中删除。

该 Password 示例是用于更改用户密码的原型程序。它演示了几种Console方法。
```java
public class Password {
    public static void main(String args[]) throws IOException {

        Console c = System.console();
        if (c == null) {
            System.err.println("No console.");
            System.exit(1);
        }
        // 明文能回显到控制台的
        String login = c.readLine("Enter your login: ");
        // 没有回显，看不见自己输入的是什么
        char[] oldPassword = c.readPassword("Enter your old password: ");

        if (verify(login, oldPassword)) {
            boolean noMatch;
            do {
                char[] newPassword1 = c.readPassword("Enter your new password: ");
                char[] newPassword2 = c.readPassword("Enter new password again: ");
                noMatch = !Arrays.equals(newPassword1, newPassword2);
                if (noMatch) {
                    c.format("Passwords don't match. Try again.%n");
                } else {
                    change(login, newPassword1);
                    c.format("Password for %s changed.%n", login);
                }
                Arrays.fill(newPassword1, ' ');
                Arrays.fill(newPassword2, ' ');
            }
            while (noMatch);
        }

        Arrays.fill(oldPassword, ' ');
    }

    // Dummy change method.
    static boolean verify(String login, char[] password) {
        // This method always returns
        // true in this example.
        // Modify this method to verify
        // password according to your rules.
        return true;
    }

    // Dummy change method.
    static void change(String login, char[] password) {
        // Modify this method to change
        // password according to your rules.
    }
}
```