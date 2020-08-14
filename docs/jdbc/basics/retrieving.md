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

下面一行禁用连接对象con的自动提交模式，以便在调用executeBatch方法时不会自动提交或回滚事务。

## 在 ResultSet 对象中插入行