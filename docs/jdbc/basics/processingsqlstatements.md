# 使用 JDBC 处理 SQL 语句

通常，要使用 JDBC 处理任何 SQL 语句，请按照以下步骤操作：

1. 建立连接
2. 创建一个语句
3. 执行查询
4. 处理 ResultSet 对象
5. 关闭连接

::: tip

讲解模式以官网主线为主

:::

本教程使用此代码来演示这些步骤，此方法输出 COFFEES 表的内容，代码位置 `com.oracle.tutorial.jdbc.CoffeesTable#viewTable`

```java
public static void viewTable(Connection con, String dbName)
    throws SQLException {

    Statement stmt = null;
    String query = "select COF_NAME, SUP_ID, PRICE, " +
                   "SALES, TOTAL " +
                   "from " + dbName + ".COFFEES";
    try {
        stmt = con.createStatement();
        ResultSet rs = stmt.executeQuery(query);
        while (rs.next()) {
            String coffeeName = rs.getString("COF_NAME");
            int supplierID = rs.getInt("SUP_ID");
            float price = rs.getFloat("PRICE");
            int sales = rs.getInt("SALES");
            int total = rs.getInt("TOTAL");
            System.out.println(coffeeName + "\t" + supplierID +
                               "\t" + price + "\t" + sales +
                               "\t" + total);
        }
    } catch (SQLException e ) {
        JDBCTutorialUtilities.printSQLException(e);
    } finally {
        if (stmt != null) { stmt.close(); }
    }
}
```

## 1. 建立连接

首先，与您想要使用的数据源建立连接。数据源可以是 DBMS、遗留文件系统或具有相应 JDBC 驱动程序的其他数据源。此连接由 Connection 对象表示。有关更多信息，请参 [见建立连接](./connecting.md)。

## 2. 创建一个语句 Statement

`Statement` 是表示 SQL 语句的接口。您执行 `Statement` 对象，它们将生成 `ResultSet` 对象，该对象是表示数据库结果集的数据表。您需要一个 `Connection`  对象来创建一个 `Statement` 对象。

如上面片段中的 

```java
stmt = con.createStatement();
```

有三种不同类型的 `Statement`：

- `Statement`：用于实现不带参数的简单 SQL 语句。

- `PreparedStatement`：

  扩展 `Statement`，用于预编译可能包含 **输入参数** 的 SQL 语句。有关更多信息，请参见 [使用预处理语句](./prepared.md)

- `CallableStatement`：

  扩展 `PreparedStatement`，用于执行可能包含输入和输出参数的 **存储过程**。有关更多信息，请参见 存储过程

## 3. 执行查询

要执行查询语句，使用 `Statement` 对象调用 `execute` 方法，如下所示：

- `execute`

  如果查询返回的第一个对象是 ResultSet 对象，则返回 true。

  如果查询可以返回一个或多个 ResultSet 对象，则使用此方法。

  通过重复调用 `Statement.getResultSet` 来检索查询返回的 ResultSet 对象。

- `executeQuery`：返回一个 ResultSet 对象。

- `executeUpdate`

  返回一个整数，表示受 SQL 语句影响的行数。如果您正在使用 INSERT、DELETE 或 UPDATE SQL 语句，请使用此方法。

如下代码片段，执行一个查询

```java
   ResultSet rs = stmt.executeQuery(query);
```

有关更多信息，请参考 [从 Result Sets 中检索和修改值](./retrieving.md)

## 4. 处理 ResultSet 对象

您可以通过游标访问 ResultSet 对象中的数据。注意，**此游标不是数据库游标**。此游标是指向 ResultSet 对象中的一行数据的指针。**最初，游标定位在第一行之前**。可以调用在 ResultSet 对象中定义的各种方法来移动游标。

如下片段代码，通过 `rs.next()` 方法，将游标向前移动一行，每次调用 next 时，该方法都会在游标当前所在的行中输出数据

```java
 try {
        stmt = con.createStatement();
        ResultSet rs = stmt.executeQuery(query);
        while (rs.next()) {
            String coffeeName = rs.getString("COF_NAME");
            int supplierID = rs.getInt("SUP_ID");
            float price = rs.getFloat("PRICE");
            int sales = rs.getInt("SALES");
            int total = rs.getInt("TOTAL");
            System.out.println(coffeeName + "\t" + supplierID +
                               "\t" + price + "\t" + sales +
                               "\t" + total);
        }
    }
```

有关更多信息，请参考 [从 Result Sets 中检索和修改值](./retrieving.md)

## 5. 关闭连接

使用完后 `Statement`，调用 `Statement.close` 方法，以立即释放其使用的资源。当您调用此方法时，其`ResultSet `对象将关闭。

如下代码片段，在 finally 中关闭，确保能释放资源，而不管是否抛出了 `SQLException`

```java
finally {
    if (stmt != null) { stmt.close(); }
}
```

JDBC `SQLException`在与数据源交互期间遇到错误时抛出。有关更多信息，请参见 [处理 SQLException](./sqlexception.md)。

在 JDBC 4.1（在 Java SE release 7 及以后版本中提供）中，您可以使用 try-with-resources 语句来自动关闭连接、语句和 ResultSet 对象，而不管是否抛出了 SQLException。自动资源语句由一个 try 语句和一个或多个已声明的资源组成。例如可以修改本节最开始的代码片段为如下方式来自动关闭资源

```java
public static void viewTable(Connection con) throws SQLException {

    String query = "select COF_NAME, SUP_ID, PRICE, " +
                   "SALES, TOTAL " +
                   "from COFFEES";

    try (Statement stmt = con.createStatement()) {

        ResultSet rs = stmt.executeQuery(query);

        while (rs.next()) {
            String coffeeName = rs.getString("COF_NAME");
            int supplierID = rs.getInt("SUP_ID");
            float price = rs.getFloat("PRICE");
            int sales = rs.getInt("SALES");
            int total = rs.getInt("TOTAL");
            System.out.println(coffeeName + ", " + supplierID +
                               ", " + price + ", " + sales +
                               ", " + total);
        }
    } catch (SQLException e) {
        JDBCTutorialUtilities.printSQLException(e);
    }
}
```

下面的语句是一个 try-with-resources 语句，它声明了一个资源 stmt，当 try 块终止时，该资源将自动关闭：

```java
try (Statement stmt = con.createStatement()) {
    // ...
}
```

有关更多信息，请参考此章节 [ try-with-resources](/essential/exceptions/tryResourceClose.md)