# 使用 JdbcRowSet 对象

JdbcRowSet 对象是一个增强的 ResultSet 对象。它和 ResultSet 对象一样，维护着与数据源的连接。最大的区别是它有一组 **属性**（Properties） 和一个 **监听器通知机制**，使它成为一个 JavaBeans 组件。

JdbcRowSet 对象的主要用途之一是使 ResultSet 对象在没有这些功能的情况下可以滚动和更新。

本节包括以下主题：

- 创建 JdbcRowSet 对象
- 默认的 JdbcRowSet 对象
- 设置属性（Properties）
- 使用 JdbcRowSet 对象
- 代码示例

## 创建 JdbcRowSet 对象

你可以用不同的方式创建一个 JdbcRowSet 对象：

- 通过使用引用实现构造函数，该构造函数接收一个 ResultSet 对象。
- 通过使用引用实现构造函数，该构造函数接收一个 Connection 对象
- 通过使用引用实现的默认构造函数
- 通过使用从 RowSetProvider 类中创建的 RowSetFactory 实例。

注意：或者，你可以使用你的 JDBC 驱动程序的 JdbcRowSet 实现的构造函数。然而，RowSet 接口的实现将与参考实现不同。这些实现将具有不同的名称和构造函数。例如，Oracle JDBC 驱动程序对 JdbcRowSet 接口的实现命名为 oracle.jdbc.rowSet.OracleJDBCRowSet。

### 传递 ResultSet 对象

创建 JdbcRowSet 对象的最简单方法是生成一个 ResultSet 对象并将其传递给 JdbcRowSetImpl 构造函数。这样做不仅可以创建一个 JdbcRowSet 对象，还可以用 ResultSet 对象中的数据填充它。

注意：传递给 JdbcRowSetImpl 构造函数的 ResultSet 对象 **必须是可滚动** 的。

作为一个例子，下面的代码片段使用 Connection 对象 con 来创建一个 Statement 对象，即 stmt，然后执行一个查询。查询产生 ResultSet 对象 rs，该对象被传递给构造函数，以创建一个新的 JdbcRowSet 对象，并以 rs 中的数据进行初始化。

```java
stmt = con.createStatement(
           ResultSet.TYPE_SCROLL_SENSITIVE,
           ResultSet.CONCUR_UPDATABLE);
rs = stmt.executeQuery("select * from COFFEES");
jdbcRs = new JdbcRowSetImpl(rs);
```

与 ResultSet 对象一起创建的 JdbcRowSet 对象可以作为 ResultSet 对象的包装器。因为 RowSet 对象 rs 是可滚动和可更新的，所以 jdbcRs 也是可滚动和可更新的。如果你在没有任何参数的情况下运行了方法 createStatement，那么 rs 将不能滚动或更新，jdbcRs 也不能滚动和更新。

### 传递 Connection 对象

下面 JdbcRowSetSample 代码节选中的第一条语句创建了一个 JdbcRowSet 对象，该对象用 Connection 对象 con 连接到数据库。

```java
jdbcRs = new JdbcRowSetImpl(con);
jdbcRs.setCommand("select * from COFFEES");
jdbcRs.execute();
```

对象 jdbcRs 不包含任何数据，直到你用方法 setCommand 指定一条SQL语句，然后运行方法 execute。

对象 jdbcRs 是可滚动和可更新的；默认情况下，JdbcRowSet 和所有其他 RowSet 对象都是可滚动和可更新的，除非另有指定。请参阅默认的 JdbcRowSet 对象，以了解有关您可以指定的 JdbcRowSet 属性的更多信息。

### 使用默认构造

下面代码摘录中的第一条语句创建了一个空的 JdbcRowSet 对象。

```java
public void createJdbcRowSet(String username, String password) {

    jdbcRs = new JdbcRowSetImpl();
    jdbcRs.setCommand("select * from COFFEES");
    jdbcRs.setUrl("jdbc:myDriver:myAttribute");
    jdbcRs.setUsername(username);
    jdbcRs.setPassword(password);
    jdbcRs.execute();
    // ...
}
```

对象 jdbcRs 不包含任何数据，直到你用方法 setCommand 指定一条SQL语句，指定 JdbcResultSet 对象如何连接数据库，然后运行方法 execute。

### 使用  RowSetFactory  接口

在 Java SE 7 和更高版本的 RowSet 1.1 中，您可以使用 RowSetFactory 的实例来创建 JdbcRowSet 对象。例如，下面的代码摘录使用 RowSetFactory 接口的实例来创建 JdbcRowSet 对象 jdbcRs。

```java
public void createJdbcRowSetWithRowSetFactory(
    String username, String password)
    throws SQLException {

    RowSetFactory myRowSetFactory = null;
    JdbcRowSet jdbcRs = null;
    ResultSet rs = null;
    Statement stmt = null;

    try {
        myRowSetFactory = RowSetProvider.newFactory();
        jdbcRs = myRowSetFactory.createJdbcRowSet();

        jdbcRs.setUrl("jdbc:myDriver:myAttribute");
        jdbcRs.setUsername(username);
        jdbcRs.setPassword(password);

        jdbcRs.setCommand("select * from COFFEES");
        jdbcRs.execute();

        // ...
    }
}
```

以下语句使用默认的 RowSetFactory 实现 com.sun.rowset.RowSetFactoryImpl 创建了 RowSetProvider 对象 myRowSetFactory 。

```java
myRowSetFactory = RowSetProvider.newFactory();
```

另外，如果你的 JDBC 驱动有自己的 RowSetFactory 实现，你可以把它指定为 newFactory 方法的一个参数。

以下语句创建了 JdbcRowSet 对象 jdbcRs，并配置其数据库连接属性。

```java
jdbcRs = myRowSetFactory.createJdbcRowSet();
jdbcRs.setUrl("jdbc:myDriver:myAttribute");
jdbcRs.setUsername(username);
jdbcRs.setPassword(password);
```

RowSetFactory 接口包含了创建 RowSet 1.1 及以后版本中不同类型的 RowSet 实现的方法：

- `createCachedRowSet`
- `createFilteredRowSet`
- `createJdbcRowSet`
- `createJoinRowSet`
- `createWebRowSet`

## 默认的 JdbcRowSet 对象

当你使用默认的构造函数创建一个 JdbcRowSet 对象时，新的 JdbcRowSet 对象将具有以下属性：

- `type`: `ResultSet.TYPE_SCROLL_INSENSITIVE` （有一个可滚动的游标）
- `concurrency`: `ResultSet.CONCUR_UPDATABLE` （可更新）
- `escapeProcessing`: `true` （驱动程序将进行转义处理；当启用转义处理时，驱动程序将扫描任何转义语法，并将其转化为特定数据库能够理解的代码。）
- `maxRows`: `0` （不限行数）
- `maxFieldSize`: `0` （对列值的字节数没有限制；只适用于存储有以下内容的列 ：`BINARY`, `VARBINARY`, `LONGVARBINARY`, `CHAR`, `VARCHAR`, `LONGVARCHAR` ）
- `queryTimeout`: `0` （对于执行一个查询所需的时间没有时间限制。）
- `showDeleted`: `false` （删除的行不可见）
- `transactionIsolation`: `Connection.TRANSACTION_READ_COMMITTED` （只读取已提交的数据）
- `typeMap`: `null` （该  `RowSet ` 对象使用的与  `Connection` 对象相关联的  typeMap 为 null。）

从这个列表中你必须记住的主要事情是，一个 JdbcRowSet 和所有其他 RowSet 对象是可以滚动和更新的，除非你为这些属性设置不同的值。

## 设置属性（Properties）

默认 JdbcRowSet 对象一节列出了创建新的 JdbcRowSet 对象时默认设置的属性。**如果您使用默认构造函数**，您必须在用数据填充新的 JdbcRowSet 对象之前设置一些附加属性。

为了获得它的数据，JdbcRowSet 对象首先需要连接到数据库。以下四个属性保存了用于获取与数据库连接的信息：

- username：用户在访问数据库时提供的名称。
- password：用户的数据库密码
- url：用户要连接的数据库的 JDBC URL。
- datasourceName：用于检索已在 JNDI 命名服务中注册的 DataSource 对象的名称。

设置这些属性中的哪一个取决于你将如何建立连接。首选的方式是使用 DataSource 对象，但对你来说，在 JNDI 命名服务中注册 DataSource 对象可能并不实际，这通常是由系统管理员完成的。因此，代码示例都使用DriverManager 机制来获取连接，为此你使用 url 属性而不是 datasourceName 属性。

另一个必须设置的属性是 setCommand。这个属性是决定 JdbcRowSet 对象将包含哪些数据的查询。例如，下面这行代码通过查询 setCommand 属性，生成一个 ResultSet 对象，其中包含表 COFFEES 中的所有数据。

```java
jdbcRs.setCommand("select * from COFFEES");
```

在设置了 setCommand 属性和建立连接所需的属性后，就可以通过调用 execute 方法用数据填充 jdbcRs 对象了。

```java
jdbcRs.execute();
```

execute 方法在后台为你做了很多事情：

- 它使用你分配给 url、用户名和密码属性的值建立对数据库的连接。
- 它执行你在 setCommand 属性中设置的查询。
- 它从 ResultSet 对象中读取数据到 jdbcRs 对象中。

## 使用 JdbcRowSet 对象

在 JdbcRowSet 对象中更新、插入和删除行的方式与在可更新的 ResultSet 对象中更新、插入和删除行的方式相同。同样的，你浏览 JdbcRowSet 对象的方式与浏览可滚动的 ResultSet 对象的方式相同。

Coffee Break 连锁咖啡馆收购了另一家连锁咖啡馆，现在有一个遗留数据库，不支持滚动或更新结果集。换句话说，这个遗留数据库产生的任何 ResultSet 对象都没有可滚动的游标，其中的数据也无法修改。但是，通过创建一个 JdbcRowSet 对象，并将数据从 ResultSet 对象中填充出来，实际上可以使 ResultSet 对象可滚动和更新。

如前所述，JdbcRowSet 对象默认是可滚动和可更新的。因为它的内容与 ResultSet 对象中的内容相同，所以对JdbcRowSet 对象的操作相当于对 ResultSet 对象本身的操作。而且由于 JdbcRowSet 对象与数据库有一个持续的连接，所以它对自己的数据所做的改变也会影响到数据库中的数据。

本节包括以下主题：

- 浏览 JdbcRowSet 对象
- 更新列值
- 插入行
- 删除行

### 浏览 JdbcRowSet 对象

一个 **不可滚动的 ResultSet 对象只能使用 next 方法来向前移动它的游标**，而且它只能将游标从第一行向前移动到最后一行。然而，一个 **默认的 JdbcRowSet 对象可以使用 ResultSet 接口中定义的所有游标移动方法**。

一个 JdbcRowSet 对象可以调用方法 next，也可以调用任何其他 ResultSet 游标移动方法。例如，下面的代码行将游标移动到 jdbcRs 对象中的第四行，然后回到第三行。

```java
jdbcRs.absolute(4);
jdbcRs.previous();
```

previous 方法类似于 next 方法，它可以在 while 循环中按顺序遍历所有的行。不同的是，你必须将游标移动到最后一行之后的位置，previous 则是将游标移向起点。

### 更新列值

你更新 JdbcRowSet 对象中的数据的方式与更新 ResultSet 对象中的数据的方式相同。

假设 Coffee Break 的老板想提高一磅 Espresso 咖啡的价格。如果老板知道 Espresso 在 jdbcRs 对象的第三行，那么这样做的代码可能会像下面这样。

```java
jdbcRs.absolute(3);
jdbcRs.updateFloat("PRICE", 10.99f);
jdbcRs.updateRow();
```

这段代码将游标移动到第三行，并将列 PRICE 的值改为 10.99，然后用新的价格更新数据库。

调用方法 updateRow 更新了数据库，因为 jdbcRs 保持了与数据库的连接。对于断开连接的 RowSet 对象，情况则不同。

### 插入行

如果 Coffee Break 连锁店的老板想在他提供的咖啡中增加一条或多条咖啡，老板需要为每一条新的咖啡在 COFFEES 表中增加一条记录，就像下面 JdbcRowSetSample 中的代码片段一样。注意，由于 jdbcRs 对象总是连接到数据库，所以在 JdbcRowSet 对象中插入一条记录与在 ResultSet 对象中插入一条记录是一样的。移动游标到插入行，使用适当的 updater 方法为每一列设置一个值，然后调用方法 insertRow。

```java
jdbcRs.moveToInsertRow();
jdbcRs.updateString("COF_NAME", "HouseBlend");
jdbcRs.updateInt("SUP_ID", 49);
jdbcRs.updateFloat("PRICE", 7.99f);
jdbcRs.updateInt("SALES", 0);
jdbcRs.updateInt("TOTAL", 0);
jdbcRs.insertRow();

jdbcRs.moveToInsertRow();
jdbcRs.updateString("COF_NAME", "HouseDecaf");
jdbcRs.updateInt("SUP_ID", 49);
jdbcRs.updateFloat("PRICE", 8.99f);
jdbcRs.updateInt("SALES", 0);
jdbcRs.updateInt("TOTAL", 0);
jdbcRs.insertRow();
```

当你调用方法 insertRow 时，新的行被插入到 jdbcRs 对象中，同时也被插入到数据库中。前面的代码片段经历了两次这个过程，所以有两条新的记录被插入到 jdbcRs 对象和数据库中。

### 删除行

就像更新数据和插入新行一样，删除一条记录对于 JdbcRowSet 对象和删除 ResultSet 对象是一样的。老板想停止销售法国烘焙无咖啡因咖啡，这是 jdbcRs 对象中的最后一行。在下面的代码行中，第一行将游标移动到最后一行，第二行从 jdbcRs 对象和数据库中删除最后一行。

```java
jdbcRs.last();
jdbcRs.deleteRow();
```

## 代码示例

示例 JdbcRowSetSample 做了以下工作。

- 创建一个新的 JdbcRowSet 对象，初始化为 ResultSet 对象，ResultSet 对象是通过执行一个检索 COFFEES 表中所有记录的查询产生的。
- 将游标移动到 COFFEES 表的第三行，并更新该行的 PRICE 列。
- 插入两行新记录，一行为 HouseBlend，一行为 HouseDecaf。
- 将游标移动到最后一行，并将其删除。

下面代码在前面代码包中有了，可以统一下载尝试运行

```java
package com.oracle.tutorial.jdbc;

import com.sun.rowset.JdbcRowSetImpl;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.RowSet;
import javax.sql.rowset.JdbcRowSet;

public class JdbcRowSetSample {

  private String dbName;
  private Connection con;
  private String dbms;
  private JDBCTutorialUtilities settings;

  public JdbcRowSetSample(Connection connArg,
                          JDBCTutorialUtilities settingsArg) {
    super();
    this.con = connArg;
    this.dbName = settingsArg.dbName;
    this.dbms = settingsArg.dbms;
    this.settings = settingsArg;
  }

  public void testJdbcRowSet() throws SQLException {

    JdbcRowSet jdbcRs = null;
    ResultSet rs = null;
    Statement stmt = null;

    try {
      
        // An alternative way to create a JdbcRowSet object
      
//      stmt = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
//      rs = stmt.executeQuery("select * from COFFEES");
//      jdbcRs = new JdbcRowSetImpl(rs);
     
        // Another way to create a JdbcRowSet object
       
//      jdbcRs = new JdbcRowSetImpl();
//      jdbcRs.setCommand("select * from COFFEES");
//      jdbcRs.setUrl(this.settings.urlString);
//      jdbcRs.setUsername(this.settings.userName);
//      jdbcRs.setPassword(this.settings.password);
//      jdbcRs.execute();
      
      jdbcRs = new JdbcRowSetImpl(con);
      jdbcRs.setCommand("select * from COFFEES");
      jdbcRs.execute();
      
      jdbcRs.absolute(3);
      jdbcRs.updateFloat("PRICE", 10.99f);
      jdbcRs.updateRow();

      System.out.println("\nAfter updating the third row:");
      CoffeesTable.viewTable(con);

      jdbcRs.moveToInsertRow();
      jdbcRs.updateString("COF_NAME", "HouseBlend");
      jdbcRs.updateInt("SUP_ID", 49);
      jdbcRs.updateFloat("PRICE", 7.99f);
      jdbcRs.updateInt("SALES", 0);
      jdbcRs.updateInt("TOTAL", 0);
      jdbcRs.insertRow();

      jdbcRs.moveToInsertRow();
      jdbcRs.updateString("COF_NAME", "HouseDecaf");
      jdbcRs.updateInt("SUP_ID", 49);
      jdbcRs.updateFloat("PRICE", 8.99f);
      jdbcRs.updateInt("SALES", 0);
      jdbcRs.updateInt("TOTAL", 0);
      jdbcRs.insertRow();

      System.out.println("\nAfter inserting two rows:");
      CoffeesTable.viewTable(con);

      jdbcRs.last();
      jdbcRs.deleteRow();

      System.out.println("\nAfter deleting last row:");
      CoffeesTable.viewTable(con);


    } catch (SQLException e) {
      JDBCTutorialUtilities.printSQLException(e);
    }

    finally {
      if (stmt != null) stmt.close();
      this.con.setAutoCommit(false);
    }
  }
  
  private void outputRowSet(RowSet rs) throws SQLException {
    rs.beforeFirst();
    while (rs.next()) {
      String coffeeName = rs.getString(1);
      int supplierID = rs.getInt(2);
      float price = rs.getFloat(3);
      int sales = rs.getInt(4);
      int total = rs.getInt(5);
      System.out.println(coffeeName + ", " + supplierID + ", " + price +
                         ", " + sales + ", " + total);
      
    }
  }

  public static void main(String[] args) {
    JDBCTutorialUtilities myJDBCTutorialUtilities;
    Connection myConnection = null;

    if (args[0] == null) {
      System.err.println("Properties file not specified at command line");
      return;
    } else {
      try {
        myJDBCTutorialUtilities = new JDBCTutorialUtilities(args[0]);
      } catch (Exception e) {
        System.err.println("Problem reading properties file " + args[0]);
        e.printStackTrace();
        return;
      }
    }

    try {
      myConnection = myJDBCTutorialUtilities.getConnection();

      JdbcRowSetSample myJdbcRowSetSample =
        new JdbcRowSetSample(myConnection, myJDBCTutorialUtilities);
      myJdbcRowSetSample.testJdbcRowSet();


    } catch (SQLException e) {
      JDBCTutorialUtilities.printSQLException(e);
    } finally {
      JDBCTutorialUtilities.closeConnection(myConnection);
    }

  }

}

```

