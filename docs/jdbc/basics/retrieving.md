# 从 Result Sets 中检索和修改值

`CoffeesTable.viewTable` 方法输出 COFFEES 表的内容，并演示 ResultSet 对象和游标的用法：

```java
public static void viewTable(Connection con, String dbName)
    throws SQLException {

    Statement stmt = null;
    String query =
        "select COF_NAME, SUP_ID, PRICE, " +
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

ResultSet 对象是代表数据库结果集的数据表，通常通过执行查询数据库的语句来生成该结果集。例如，当CoffeeTables.viewTable 方法通过 Statement 对象 stmt 执行查询时，将创建一个 ResultSet rs。请注意，可以通过实现 Statement 接口的任何对象（包括 PreparedStatement，CallableStatement 和 RowSet）来创建 ResultSet 对象。

您通过游标访问 ResultSet 对象中的数据。请注意，此游标不是数据库游标。该游标是一个指向 ResultSet 中的一行数据的指针。最初，游标位于第一行之前。ResultSet.next 方法 将游标移动到下一行。如果游标位于最后一行之后，则此方法返回 false。此方法使用 while 循环重复调用 ResultSet.next 方法，以遍历 ResultSe t中的所有数据。

此页面包含以下主题：

- ResultSet 接口
- 从行中检索列值
- 游标
- 更新 ResultSet 对象中的行
- 使用 Statement 对象进行批处理更新
- 在 ResultSet 对象中插入行

## ResultSet 接口

ResultSet 接口提供了用于 **检索** 和  **处理已执行查询的结果** 的方法，并且 ResultSet 对象可以具有不同的功能和特性。这些特征是类型，并发性和游标可保留性。

ResultSet 对象的敏感度由三种不同的 ResultSet 类型之一确定：

- `TYPE_FORWARD_ONLY`:

  结果集 **无法滚动**；它的游标只能从第一行之前移到最后一行之后。结果集中包含的行取决于基础数据库如何生成结果。也就是说，它包含在执行查询时或在检索行时满足查询条件的行。

- `TYPE_SCROLL_INSENSITIVE`

  结果 **可以滚动**；它的游标可以相对于当前位置 **向前和向后移动**，并且可以移动到绝对位置。结果集在打开时对基础数据源所做的更改不敏感。它包含在执行查询时或在检索行时满足查询条件的行。

- `TYPE_SCROLL_SENSITIVE`

  结果可以滚动；它的游标可以相对于当前位置 **向前和向后移动**，并且可以移动到绝对位置。结果集反映在 **结果集保持打开状态时对基础数据源所做的更改**。

默认的 ResultSet 类型为 TYPE_FORWARD_ONLY。

注意：并非所有数据库和 JDBC 驱动程序都支持所有 ResultSet 类型。如果支持指定的 ResultSet 类型，则`DatabaseMetaData.supportsResultSetType` 方法返回 true，否则返回 false。

### ResultSet 并发

ResultSet 对象的并发确定支持什么级别的更新功能。

有两个并发级别：

- CONCUR_READ_ONLY：无法使用 ResultSet 接口更新 ResultSet 对象。
- CONCUR_UPDATABLE：可以使用 ResultSet 接口更新 ResultSet 对象。

默认的 ResultSet 并发性是 CONCUR_READ_ONLY。

### ResultSet 游标保留能力

调用 `Connection.commit` 方法可以关闭在当前事务期间创建的 ResultSet 对象。但是，在某些情况下，这可能不是所需的行为。 ResultSet 属性的可保持性使应用程序可以控制在调用 commit 时是否关闭 ResultSet 对象（游标）。

可以将以下 ResultSet 常量提供给 Connection 方法的 createStatement，prepareStatement 和 prepareCall：

- HOLD_CURSORS_OVER_COMMIT

  ResultSet 游标未关闭；它们是可保持的：调用方法 commit 时，它们保持打开状态。如果您的应用程序主要使用只读的 ResultSet 对象，则可保持游标可能是理想的选择。

- CLOSE_CURSORS_AT_COMMIT

  调用 commit 方法时，将关闭 ResultSet 对象（游标）。调用此方法时关闭游标可以提高某些应用程序的性能。

默认的游标可保留性取决于您的 DBMS。

注意：并非所有的 JDBC 驱动程序和数据库都支持可保留和不可保留的游标。以下方法JDBCTutorialUtilities.cursorHoldabilitySupport 输出 ResultSet 对象的默认游标可保留性，以及是否支持HOLD_CURSORS_OVER_COMMIT 和 CLOSE_CURSORS_AT_COMMIT：

```java
public static void cursorHoldabilitySupport(Connection conn)
    throws SQLException {

    DatabaseMetaData dbMetaData = conn.getMetaData();
    System.out.println("ResultSet.HOLD_CURSORS_OVER_COMMIT = " +
        ResultSet.HOLD_CURSORS_OVER_COMMIT);

    System.out.println("ResultSet.CLOSE_CURSORS_AT_COMMIT = " +
        ResultSet.CLOSE_CURSORS_AT_COMMIT);

    System.out.println("Default cursor holdability: " +
        dbMetaData.getResultSetHoldability());

    System.out.println("Supports HOLD_CURSORS_OVER_COMMIT? " +
        dbMetaData.supportsResultSetHoldability(
            ResultSet.HOLD_CURSORS_OVER_COMMIT));

    System.out.println("Supports CLOSE_CURSORS_AT_COMMIT? " +
        dbMetaData.supportsResultSetHoldability(
            ResultSet.CLOSE_CURSORS_AT_COMMIT));
}
```



## 从 Rows 中检索列值

ResultSet 接口声明用于从当前行中检索列值的 getter 方法（例如，getBoolean 和 getLong）。您可以使用列的索引号或列的别名或名称来检索值。列索引通常更有效。列从 1 开始编号。为了实现最大的可移植性，应按从左到右的顺序读取每一行中的结果集列，并且每一列只能读取一次。

例如，以下方法 `CoffeesTable.alternateViewTable` 通过数字检索列值：

```java
public static void alternateViewTable(Connection con)
    throws SQLException {

    Statement stmt = null;
    String query =
        "select COF_NAME, SUP_ID, PRICE, " +
        "SALES, TOTAL from COFFEES";

    try {
        stmt = con.createStatement();
        ResultSet rs = stmt.executeQuery(query);
        while (rs.next()) {
            String coffeeName = rs.getString(1);
            int supplierID = rs.getInt(2);
            float price = rs.getFloat(3);
            int sales = rs.getInt(4);
            int total = rs.getInt(5);
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

用 `getterXX(String columnLabel)` 方法，参数不区分大小写。如果多个列具有与该字符串相同的别名或名称时，将返回第一个匹配列的值。当在生成结果集的 SQL 查询中使用列别名和名称时，可以使用使用字符串而不是整数的选项。对于在查询中未明确命名的列（例如，`select * from COFFEES`），最好使用列号。如果使用了列名，则开发人员应保证使用列别名唯一地引用了预期的列。列别名有效地重命名结果集的列。要指定列别名，请在 SELECT 语句中使用 SQL AS 子句。

请注意，尽管建议使用 getString 方法来检索 SQL 类型 CHAR 和 VARCHAR，但可以使用它检索任何基本的 SQL 类型。使用 getString 获取所有值可能非常有用，但是也有其局限性。例如，如果用于检索数字类型，则 getString 会将数字值转换为 Java String 对象，并且必须先将该值转换回数字类型，然后才能将其用作数字。无论如何，在将该值视为字符串的情况下，没有任何缺点。此外，如果您希望应用程序检索 SQL3 类型以外的任何标准 SQL 类型的值，请使用 getString 方法。

## 游标

如前所述，您可以通过游标访问 ResultSet 对象中的数据，该游标指向 ResultSet 对象中的一行。但是，当首次创建ResultSet 对象时，游标将位于第一行之前。 CoffeeTables.viewTable 方法通过调用 ResultSet.next 方法来移动游标。还有其他方法可以移动游标：

- next

  将游标向前移动一行。如果游标现在位于一行上，则返回 true；如果游标位于最后一行之后，则返回 false。

- previous

  向后移动游标一行。如果游标现在位于一行上，则返回 true；如果游标位于第一行之前，则返回 false。

- first

  将游标移动到 ResultSet 对象的第一行。如果游标现在位于第一行，则返回 true；如果 ResultSet 对象不包含任何行，则返回 false。

- last

  将游标移动到 ResultSet 对象的最后一行。如果游标现在位于最后一行，则返回 true；如果 ResultSet 对象不包含任何行，则返回 false。

- beforeFirst

  将游标定位在 ResultSet 对象的开始位置，第一行之前。如果 ResultSet 对象不包含任何行，则此方法无效。

- afterLast

  将游标定位在 ResultSet 对象的末尾，最后一行之后。如果 ResultSet 对象不包含任何行，则此方法无效。

- `relative(int rows)`

  相对于当前位置移动游标。

- `absolute(int row)`

  将游标定位在参数行指定的行上。

注意，ResultSet 的默认敏感性是 TYPE_FORWARD_ONLY，这意味着它不能滚动；如果无法滚动 ResultSet，则不能调用移动游标的这些方法中的任何一个，next 除外。下一节中描述的 `CoffeesTable.modifyPrices` 方法演示了如何移动 ResultSet 的游标。


## 更新 ResultSet 对象中的行

您不能更新默认的 ResultSet 对象，并且只能将其游标向前移动。但是，您可以创建可以滚动（游标可以向后移动或移动到绝对位置）和更新的 ResultSet 对象。

以下方法 `CoffeesTable.modifyPrices` 将每行的 PRICE 列乘以参数百分比：

```java
public void modifyPrices(float percentage) throws SQLException {

    Statement stmt = null;
    try {
        stmt = con.createStatement();
        stmt = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
                   ResultSet.CONCUR_UPDATABLE);
        ResultSet uprs = stmt.executeQuery(
            "SELECT * FROM " + dbName + ".COFFEES");

        while (uprs.next()) {
            float f = uprs.getFloat("PRICE");
            uprs.updateFloat( "PRICE", f * percentage);
            uprs.updateRow();
        }

    } catch (SQLException e ) {
        JDBCTutorialUtilities.printSQLException(e);
    } finally {
        if (stmt != null) { stmt.close(); }
    }
}
```

字段 ResultSet.TYPE_SCROLL_SENSITIVE 会创建一个 ResultSet 对象，该对象的游标可以相对于当前位置和绝对位置向前和向后移动。字段 ResultSet.CONCUR_UPDATABLE 创建一个可以更新的 ResultSet 对象。有关可以指定用来修改 ResultSet 对象的行为的其他字段，请参见 ResultSet Javadoc。

方法 ResultSet.updateFloat 方法更新指定的列（在本示例中，PRICE 的游标所在行中具有指定的浮点值。ResultSet 包含各种更新程序方法，这些方法使您可以更新各种数据类型的列值。这些更新程序方法将修改数据库；您 **必须调用方法** `ResultSet.updateRow` 来更新数据库。

## 使用 Statement 对象进行批处理更新

Statement ，PreparedStatement 和 CallableStatement 对象具有与其关联的命令列表。该列表可能包含用于更新，插入或删除行的语句；它也可能包含 DDL 语句，例如 CREATE TABLE 和 DROP TABLE。但是，它不能包含将产生ResultSet 对象的语句，例如 SELECT 语句。换句话说，列表只能包含产生更新计数的语句。

该列表在创建时与 Statement 对象相关联，最初是空的。您可以使用 addBatch 方法将 SQL 命令添加到此列表，并使用 clearBatch 方法将其清空。完成将语句添加到列表后，请调用 executeBatch 方法将它们全部发送到数据库以作为一个单元或批处理执行。

例如，以下方法 CoffeesTable.batchUpdate 通过批处理执行将四行数据添加到 COFFEES 表：

```java
public void batchUpdate() throws SQLException {

    Statement stmt = null;
    try {
        this.con.setAutoCommit(false);
        stmt = this.con.createStatement();

        stmt.addBatch(
            "INSERT INTO COFFEES " +
            "VALUES('Amaretto', 49, 9.99, 0, 0)");

        stmt.addBatch(
            "INSERT INTO COFFEES " +
            "VALUES('Hazelnut', 49, 9.99, 0, 0)");

        stmt.addBatch(
            "INSERT INTO COFFEES " +
            "VALUES('Amaretto_decaf', 49, " +
            "10.99, 0, 0)");

        stmt.addBatch(
            "INSERT INTO COFFEES " +
            "VALUES('Hazelnut_decaf', 49, " +
            "10.99, 0, 0)");

        int [] updateCounts = stmt.executeBatch();
        this.con.commit();

    } catch(BatchUpdateException b) {
        JDBCTutorialUtilities.printBatchUpdateException(b);
    } catch(SQLException ex) {
        JDBCTutorialUtilities.printSQLException(ex);
    } finally {
        if (stmt != null) { stmt.close(); }
        this.con.setAutoCommit(true);
    }
}
```

下面一行禁用连接对象 con 的自动提交模式，以便在调用 executeBatch 方法时不会自动提交或回滚事务。

```java
this.con.setAutoCommit(false);
```

为了允许正确的错误处理，您应该在开始批量更新之前始终禁用自动提交模式。

Statement.addBatch 方法将命令添加到与 Statement 对象 stmt 相关联的命令列表中。在此示例中，这些命令都是INSERT INTO 语句，每个命令添加一行包含五个列值的行。 COF_NAME 列和 PRICE 列的值分别是咖啡的名称和价格。每行中的第二个值是 49，因为这是供应商 Superior Coffee 的标识号。最后两个值，即 SALES 和 TOTAL 列的条目，开始都是零，因为还没有销售。 （SALES 是该行在本周售出的磅数；TOTAL  是该咖啡的所有累计销售总额。）

下面的行将添加到其命令列表中的四个 SQL 命令发送到数据库中，以作为批处理执行：

```java
int [] updateCounts = stmt.executeBatch();
```

请注意，stmt 使用 executeBatch 方法发送批量插入，而不是 executeUpdate 方法，后者仅发送一个命令并返回单个更新计数。 DBMS 按照添加到命令列表中的顺序执行命令，因此它将首先添加 Amaretto 的行，然后添加Hazelnut 的行，然后添加 Amaretto decaf 的行，最后添加 Hazelnut decaf 的行。如果所有四个命令都成功执行，则DBMS 将按执行顺序返回每个命令的更新计数。指示每个命令影响多少行的更新计数存储在数组 updateCounts 中。

如果批处理中的所有四个命令都成功执行，updateCounts 将包含四个值，所有值都为 1，因为插入会影响一行。
与 stmt 关联的命令列表现在是空的，因为前面添加的四个命令是在 stmt 调用 executeBatch 方法时发送到数据库的。您可以在任何时候使用 clearBatch 方法显式地清空这个命令列表。

Connection.commit 方法使对 COFFEES 表的更新批处理成为永久更新。由于以前已禁用此连接的自动提交模式，因此需要显式调用此方法。

下一行为当前 Connection 对象启用自动提交模式。

```java
this.con.setAutoCommit(true);
```

现在，示例中的每个语句在执行后将自动提交，不再需要调用方法commit。

### 执行参数化的批量更新

也可以进行参数化的批处理更新，如以下代码片段所示，其中 con 是 Connection 对象：

```java
con.setAutoCommit(false);
PreparedStatement pstmt = con.prepareStatement(
                              "INSERT INTO COFFEES VALUES( " +
                              "?, ?, ?, ?, ?)");
pstmt.setString(1, "Amaretto");
pstmt.setInt(2, 49);
pstmt.setFloat(3, 9.99);
pstmt.setInt(4, 0);
pstmt.setInt(5, 0);
pstmt.addBatch();

pstmt.setString(1, "Hazelnut");
pstmt.setInt(2, 49);
pstmt.setFloat(3, 9.99);
pstmt.setInt(4, 0);
pstmt.setInt(5, 0);
pstmt.addBatch();

// ... 以此类推
// type of coffee

int [] updateCounts = pstmt.executeBatch();
con.commit();
con.setAutoCommit(true);
```

### 处理批量更新异常

如果：

1. 添加到批处理中的一条 SQL 语句产生了一个结果集（通常是一个查询），
2. 或者批处理中的一条 SQL 语句由于其他原因没有成功执行，那么在调用 executeBatch 方法时，您将获得一个BatchUpdateException 异常

您不应该在一批 SQL 命令中添加查询（SELECT 语句），因为方法 executeBatch 会返回更新计数的数组，并且期望成功执行的每个 SQL 语句都有更新计数。这意味着只有返回更新计数的命令（如 INSERT INTO，UPDATE，DELETE 之类的命令）或返回 0 的命令（如 CREATE TABLE，DROP TABLE，ALTER TABLE）才能使用 executeBatch 方法成功地成批执行。

BatchUpdateException 包含一个更新计数数组，该数组与方法 executeBatch 返回的数组相似。在这两种情况下，更新计数与产生它们的命令的顺序相同。这将告诉您批处理中成功执行了多少个命令以及它们是哪个。例如，如果成功执行了五个命令，则数组将包含五个数字：第一个数字是第一个命令的更新计数，第二个是第二个命令的更新计数，依此类推。

BatchUpdateException 派生自 SQLException。这意味着您可以与 SQLException 对象一起使用所有可用的方法。以下方法 JDBCTutorialUtilities.printBatchUpdateException 打印所有 SQLException 信息以及 BatchUpdateException 对象中包含的更新计数。因为 BatchUpdateException.getUpdateCounts 返回一个 int 数组，所以代码使用 for 循环来打印每个更新计数：

```java
public static void printBatchUpdateException(BatchUpdateException b) {

    System.err.println("----BatchUpdateException----");
    System.err.println("SQLState:  " + b.getSQLState());
    System.err.println("Message:  " + b.getMessage());
    System.err.println("Vendor:  " + b.getErrorCode());
    System.err.print("Update counts:  ");
    int [] updateCounts = b.getUpdateCounts();

    for (int i = 0; i < updateCounts.length; i++) {
        System.err.print(updateCounts[i] + "   ");
    }
}
```



## 在 ResultSet 对象中插入行

注意：不是所有 JDBC 驱动程序都支持使用 ResultSet 接口插入新行。如果您试图插入一个新行，而您的 JDBC 驱动程序数据库不支持该特性，则会抛出一个 SQLFeatureNotSupportedException 异常。

以下方法 CoffeesTable.insertRow 通过 ResultSet 对象将一行插入到 COFFEES 中：

```java
public void insertRow(String coffeeName, int supplierID,
                      float price, int sales, int total)
    throws SQLException {

    Statement stmt = null;
    try {
        stmt = con.createStatement(
            ResultSet.TYPE_SCROLL_SENSITIVE
            ResultSet.CONCUR_UPDATABLE);

        ResultSet uprs = stmt.executeQuery(
            "SELECT * FROM " + dbName +
            ".COFFEES");

        uprs.moveToInsertRow();
        uprs.updateString("COF_NAME", coffeeName);
        uprs.updateInt("SUP_ID", supplierID);
        uprs.updateFloat("PRICE", price);
        uprs.updateInt("SALES", sales);
        uprs.updateInt("TOTAL", total);

        uprs.insertRow();
        uprs.beforeFirst();
    } catch (SQLException e ) {
        JDBCTutorialUtilities.printSQLException(e);
    } finally {
        if (stmt != null) { stmt.close(); }
    }
}
```

本示例使用两个参数 ResultSet.TYPE_SCROLL_SENSITIVE 和 ResultSet.CONCUR_UPDATABLE 调用 Connection.createStatement 方法。第一个值使 ResultSet 对象的游标向前和向后移动。如果要在 ResultSet 对象中插入行，则需要第二个值 ResultSet.CONCUR_UPDATABLE。它指定它可以更新。

在 getter 方法中使用字符串的相同规定也适用于 updater 方法。

`ResultSet.moveToInsertRow` 方法 **将游标移动到插入行**。插入行是与可更新结果集关联的特殊行。它实际上是一个缓冲区，可以在将行插入结果集中之前通过调用 updater 方法来构造新行。例如，此方法调用 ResultSet.updateString  将插入行的 COF_NAME 列更新为 Kona。

`ResultSet.insertRow` 方法将插入行的内容插入 ResultSet 对象和 **数据库** 中。

注意：使用 ResultSet.insertRow 插入一行后，应将游标移动到插入行以外的其他行。例如，此示例使用方法ResultSet.beforeFirst 将其移动到结果集中的第一行之前。如果您的应用程序的另一部分使用相同的结果集，并且游标仍指向插入行，则可能会出现意外的结果。