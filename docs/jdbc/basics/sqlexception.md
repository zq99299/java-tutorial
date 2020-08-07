# 处理 SQLException

包含以下主题：

- SQLException 概述
- 检索异常
- 检索警告
- 分类的 SQLException
- SQLException 的其他子类

## SQLException 概述

当 JDBC 在与数据源交互过程中遇到错误时，它会抛出一个 SQLException 实例，而不是抛出 Exception （此上下文中的数据源表示连接对象所连接的数据库）SQLException 实例包含以下信息，可以帮助您确定错误的原因：

- 错误的描述：通过调用 `SQLException.getMessage` 方法来检索包含此描述的字符串对象

- SQLState code

  这些代码及其各自的含义已经由  `ISO/ANSI and Open Group (X/Open)` 标准化，尽管有些代码保留给数据库供应商自己定义。这个字符串对象由五个字母数字字符组成。通过调用 `SQLException.getSQLState` 方法来检索此代码。

- 错误代码 Error Code：

  这是一个整数值，标识导致抛出 SQLException 实例的错误。它的值和意义是特定于实现的，可能是底层数据源返回的实际错误代码。通过调用 `SQLException.getErrorCode` 方法来检索错误。

- cause 原因
  SQLException 实例可能具有因果关系，其中包含一个或多个可抛出的对象，这些对象会导致抛出 SQLException实例。要导航这个原因链，可以递归地调用 `SQLException.getCause` 方法，直到返回空值。

- 对任何链接异常的引用。

  如果出现多个错误，则通过此链引用异常。通过调用 `SQLException.getNextException` 方法来检索这些异常

## 检索异常

下面的代码片段来自 `com.oracle.tutorial.jdbc.JDBCTutorialUtilities#printSQLException` 打印了上述所说的几个点

```java
public static void printSQLException(SQLException ex) {

    for (Throwable e : ex) {
        if (e instanceof SQLException) {
            if (ignoreSQLException(
                ((SQLException)e).
                getSQLState()) == false) {

                e.printStackTrace(System.err);
                System.err.println("SQLState: " +
                    ((SQLException)e).getSQLState());

                System.err.println("Error Code: " +
                    ((SQLException)e).getErrorCode());

                System.err.println("Message: " + e.getMessage());

                Throwable t = ex.getCause();
                while(t != null) {
                    System.out.println("Cause: " + t);
                    t = t.getCause();
                }
            }
        }
    }
}
```

例如，如果调用 `com.oracle.tutorial.jdbc.CoffeesTable#dropTable` 方法，如果 COFFEES 表不存在，并且删除了对 `com.oracle.tutorial.jdbc.JDBCTutorialUtilities#ignoreSQLException` 方法的调用，那么就会打印出如下的信息：

```
SQLState: 42Y55
Error Code: 30000
Message: 'DROP TABLE' cannot be performed on
'TESTDB.COFFEES' because it does not exist.
```

您可以先检索 SQLState，然后相应地处理 SQLException，而不是输出 SQLException 信息。
例如，如果 SQLState 是 `42Y55` ,`JDBCTutorialUtilities.ignoreSQLException`  就会返回 true，就会导致 `JDBCTutorialUtilities.printSQLException` 方法忽略打印该 SQLException 的异常信息

```java
public static boolean ignoreSQLException(String sqlState) {

    if (sqlState == null) {
        System.out.println("The SQL state is not defined!");
        return false;
    }

    // X0Y32: Jar file already exists in schema
    if (sqlState.equalsIgnoreCase("X0Y32"))
        return true;

    // 表已存在
    // 42Y55: Table already exists in schema
    if (sqlState.equalsIgnoreCase("42Y55"))
        return true;

    return false;
}
```

## 检索警告

SQLWarning 对象是 SQLException 处理数据库访问警告的子类。警告不会像异常那样停止应用程序的执行;
它们只是提醒用户有些事情没有按计划发生。例如，一个警告可能让您知道您试图撤销的特权没有被撤销。
或者一个警告可能告诉您在请求断开时发生了错误。

可以在 Connection 对象，Statement 对象（包括 PreparedStatement 和 CallableStatement 对象）或 ResultSet 对象上报告警告。这些类每个都有一个 getWarnings 方法，您必须调用该方法才能查看在调用对象上报告的第一个警告。如果 getWarnings 返回警告 SQLWarning，则可以对其调用  getNextWarning 以获得任何其他警告。执行一条语句会自动清除上一条语句中的警告，因此它们不会累积。但是，这意味着，如果要检索语句中报告的警告，则必须在执行另一条语句之前执行此操作。

JDBCTutorialUtilities 中的以下方法说明了如何获取有关 Statement 或 ResultSet 对象上报告的任何警告的完整信息：

```java
public static void getWarningsFromResultSet(ResultSet rs)
    throws SQLException {
    JDBCTutorialUtilities.printWarnings(rs.getWarnings());
}

public static void getWarningsFromStatement(Statement stmt)
    throws SQLException {
    JDBCTutorialUtilities.printWarnings(stmt.getWarnings());
}

public static void printWarnings(SQLWarning warning)
    throws SQLException {

    if (warning != null) {
        System.out.println("\n---Warning---\n");

    while (warning != null) {
        System.out.println("Message: " + warning.getMessage());
        System.out.println("SQLState: " + warning.getSQLState());
        System.out.print("Vendor error code: ");
        System.out.println(warning.getErrorCode());
        System.out.println("");
        warning = warning.getNextWarning();
    }
}
```

最常见的警告是 DataTruncation 警告，它是 SQLWarning 的子类。所有 DataTruncation 对象的 SQLState 均为01004，表示读取或写入数据有问题。通过 DataTruncation 方法，您可以找出在哪个列或参数数据中被截断，截断是在读取还是写入操作上进行的，应该传送多少字节以及实际传送了多少字节。

## 分类的 SQLException

您的 JDBC 驱动程序可能会抛出一个 SQLException 子类，该子类对应于一个常见的 SQLState 或一个与特定SQLState 类值无关的常见错误状态。这使您能够编写更可移植的错误处理代码。这些异常是下列类之一的子类：

- `SQLNonTransientException`
- `SQLTransientException`
- `SQLRecoverableException`

请参阅 java 的最新 Javadoc。有关这些子类的更多信息，请查看  `java.sql` 包或 JDBC 驱动程序的文档。

## SQLException 的其他子类

下面的 SQLException 子类也可以被抛出：

- BatchUpdateException

  在批处理更新操作期间发生错误时抛出。除了 SQLException 提供的信息外，BatchUpdateException 还提供了发生错误之前执行的所有语句的更新计数。

- SQLClientInfoException

  无法在连接上设置一个或多个客户端信息属性时引发。除了 SQLException 提供的信息之外，SQLClientInfoException 还提供了一个未设置的客户端信息属性列表。