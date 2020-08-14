# 使用预处理语句

此节包含以下内容：

- Prepared Statements 概述
- 创建一个 PreparedStatement 对象
- 为 PreparedStatement 参数提供数值。

## Prepared Statements 概述

有时，使用 PreparedStatement 对象向数据库发送 SQL 语句会更方便。这种特殊类型的语句是由你已经知道的更通用的 Statement 类派生出来的。

如果你想多次执行一个 Statement 对象，通常使用 PreparedStatement 对象来代替，可以减少执行时间。

PreparedStatement 对象的主要特点是，与 Statement 对象不同，当它被创建时，会被赋予一条 SQL 语句。这样做的好处是，在大多数情况下，这个 SQL 语句会被立即发送到 DBMS，在那里进行编译。因此，PreparedStatement 对象包含的不仅仅是一条 SQL 语句，而是一条 **已经预编译的 SQL语句**。这意味着，当 PreparedStatement 被执行时，DBMS 可以直接运行 PreparedStatement SQL 语句，而不必先编译它。

虽然 PreparedStatement 对象可以用于没有参数的 SQL 语句，但你可能最常使用它们来处理带参数的 SQL 语句。使用带参数的 SQL 语句的好处是，你可以使用相同的语句，并在每次执行时为它提供不同的值。这方面的例子见下面几节。

下面的方法 CoffeesTable.updateCoffeeSales，在 SALES 列中存储每一种咖啡在当前一周内售出的磅数，并在 TOTAL 列中更新每一种咖啡售出的总磅数。

```java
public void updateCoffeeSales(HashMap<String, Integer> salesForWeek)
    throws SQLException {

    PreparedStatement updateSales = null;
    PreparedStatement updateTotal = null;
	
    // 更新某一个咖啡当前一周售出的磅数
    String updateString =
        "update " + dbName + ".COFFEES " +
        "set SALES = ? where COF_NAME = ?";

    // 更新某一个咖啡售出的总磅数
    String updateStatement =
        "update " + dbName + ".COFFEES " +
        "set TOTAL = TOTAL + ? " +
        "where COF_NAME = ?";

    try {
        con.setAutoCommit(false);
        updateSales = con.prepareStatement(updateString);
        updateTotal = con.prepareStatement(updateStatement);

        for (Map.Entry<String, Integer> e : salesForWeek.entrySet()) {
            updateSales.setInt(1, e.getValue().intValue());
            updateSales.setString(2, e.getKey());
            updateSales.executeUpdate();
            updateTotal.setInt(1, e.getValue().intValue());
            updateTotal.setString(2, e.getKey());
            updateTotal.executeUpdate();
            con.commit();
        }
    } catch (SQLException e ) {
        JDBCTutorialUtilities.printSQLException(e);
        if (con != null) {
            try {
                System.err.print("Transaction is being rolled back");
                con.rollback();
            } catch(SQLException excep) {
                JDBCTutorialUtilities.printSQLException(excep);
            }
        }
    } finally {
        if (updateSales != null) {
            updateSales.close();
        }
        if (updateTotal != null) {
            updateTotal.close();
        }
        con.setAutoCommit(true);
    }
}
```

## 创建一个 PreparedStatement 对象

下面创建一个 PreparedStatement 对象，该对象需要两个 **输入参数**。

```java
String updateString =
    "update " + dbName + ".COFFEES " +
    "set SALES = ? where COF_NAME = ?";
updateSales = con.prepareStatement(updateString);
```

## 为 PreparedStatement 参数提供数值。

在执行 PreparedStatement 对象之前，您必须提供值来代替问号占位符（如果有的话）。通过调用在PreparedStatement 类中定义的 setter 方法来实现。下面的语句在名为 updateSales 的 PreparedStatement 中提供了两个问号占位符。

```java
updateSales.setInt(1, e.getValue().intValue());
updateSales.setString(2, e.getKey());
```

这些 setter 方法的第一个参数指定了问号占位符。在这个例子中，setInt 指定了第一个占位符，setString 指定了第二个占位符。

当一个参数被设置了一个值后，它将保留这个值，直到它被重置为另一个值，或者调用方法 clearParameters。使用 PreparedStatement 对象 updateSales，下面的代码片段说明了在重置其一个参数的值并保持另一个参数的值不变后重用一个准备好的语句。

```java
// 改变 SALES 列为 French Roast
//row to 100

updateSales.setInt(1, 100);
updateSales.setString(2, "French_Roast");
updateSales.executeUpdate();

// (第一个参数保持 100，第二个参数被重置 Espresso
updateSales.setString(2, "Espresso");
updateSales.executeUpdate();
```

### 使用循环来设置值

您通常可以通过使用 for 循环或 while 循环来设置输入参数的值，从而使编码更容易。

CoffeesTable.updateCoffeeSales 方法使用 for-each 循环来重复设置 PreparedStatement 对象 updateSales 和 updateTotal 中的值。

```java
for (Map.Entry<String, Integer> e : salesForWeek.entrySet()) {

    updateSales.setInt(1, e.getValue().intValue());
    updateSales.setString(2, e.getKey());

    // ...
}
```

CoffeesTable.updateCoffeeSales 方法需要一个参数 HashMap。HashMap 参数中的每个元素都包含一种咖啡的名称和当前一周内该种咖啡的销售数量。for-each 循环迭代 HashMap 参数中的每个元素，并在 updateSales 和 updateTotal 中设置适当的问号占位符。

### 执行 PreparedStatement 对象

与 Statement 对象一样，要执行 PreparedStatement 对象，需要调用 execute 语句：

- 如果查询只返回一个ResultSet（如 SELECT SQL 语句），则执行 executeQuery；
- 如果查询不返回一个 ResultSet（如 UPDATE SQL 语句），则执行 executeUpdate
- 如果是批量查询（如果批量更新），则执行 executeBatch

CoffeesTable.updateCoffeeSales  中的两个 PreparedStatement 对象都包含 UPDATE SQL 语句，所以都会通过调用executeUpdate 来执行。

```java
updateSales.setInt(1, e.getValue().intValue());
updateSales.setString(2, e.getKey());
updateSales.executeUpdate();

updateTotal.setInt(1, e.getValue().intValue());
updateTotal.setString(2, e.getKey());
updateTotal.executeUpdate();
con.commit();
```

当用于执行 updateSales 和 updateTotals 时，没有为 executeUpdate 提供参数；这两个 PreparedStatement 对象已经包含了要执行的 SQL 语句。

注意：在 CoffeesTable.updateCoffeeSales 的开头，自动提交模式被设置为 false。

```java
con.setAutoCommit(false);
```

因此，在调用方法 commit 之前，不会提交任何 SQL 语句。关于自动提交模式的更多信息，请参见 [Transactions](./transactions.md)。

### executeUpdate 方法的返回值

executeQuery 返回一个 ResultSet 对象，其中包含了发送到 DBMS 的查询结果，而 executeUpdate 的返回值是一个int 值，表示表的多少行被更新。例如，下面的代码显示了 executeUpdate 的返回值被分配给变量 n。

```java
updateSales.setInt(1, 50);
updateSales.setString(2, "Espresso");
int n = updateSales.executeUpdate();
// n = 1 因为有一行有变化
```

表 COFFEES 被更新；值 50 取代了 Espresso 行中 SALES 列中的值。该更新影响了表中的一行，所以 n 等于 1。

当方法 executeUpdate 用于执行 DDL（数据定义语言）语句时，例如在创建一个表时，它返回的 int 值为 0。因此，在下面的代码片段中，执行了用于创建表 COFFEES 的 DDL 语句，n 被赋值为 0。

```java
// n = 0
int n = executeUpdate(createTableCoffees); 
```

注意，当 executeUpdate 的返回值为 0 时，它可能意味着两种情况之一：

- 执行的语句是一条更新语句，受影响的行数为 0。
- 执行的语句是一条 DDL 语句。