# 使用事物

有些时候，你不希望一张报表生效，除非另一张报表完成。例如，当 "咖啡小憩 " 的经营者更新每周售出的咖啡数量时，经营者也希望更新到目前为止售出的总数量。但是，每周的销售量和总销售量 **应该同时更新**，否则，数据将不一致。**确保两个动作都发生或两个动作都不发生** 的方法是使用事务。**一个事务是一组作为单位执行的一个或多个语句**，所以要么所有的语句都被执行，要么没有一个语句被执行。

本页包括以下主题：

- 禁用自动提交模式
- 提交事物
- 使用事物来保护数据完整性
- 设置和回滚到保存点
- 释放保存点
- 何时调用方法回滚

##  禁用自动提交模式

当一个 **连接被创建时**，**它处于自动提交模式**。这 **意味着每个单独的 SQL 语句都被视为一个事务**，并在执行后立即自动提交。更准确地说，默认情况下，SQL 语句在完成时而不是在执行时被提交。当一条语句的所有结果集和更新计数都被检索到时，该语句才算完成。然而，几乎在所有的情况下，一条语句都是在执行完之后才完成的，因此也是提交的。

允许将两条或多条语句组合成一个事务的方法是 **禁用自动提交模式**。下面的代码演示了这一点，其中 con 是一个活动连接。

```java
con.setAutoCommit(false);
```

##  提交事物

在禁用自动提交模式后，在明确调用方法提交之前，不会提交任何 SQL 语句。在上一次调用方法 commit 之后执行的所有语句都会被包含在当前事务中，并作为一个单元一起提交。下面的方法 CoffeesTable.updateCoffeeSales，其中 con 是一个活动连接，说明了一个事务。

```java
public void updateCoffeeSales(HashMap<String, Integer> salesForWeek)
    throws SQLException {

    PreparedStatement updateSales = null;
    PreparedStatement updateTotal = null;

    String updateString =
        "update " + dbName + ".COFFEES " +
        "set SALES = ? where COF_NAME = ?";

    String updateStatement =
        "update " + dbName + ".COFFEES " +
        "set TOTAL = TOTAL + ? " +
        "where COF_NAME = ?";

    try {
        // 禁用自动提交模式
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
            // 执行完两个语句提交一次，下一次又属于一个新的事物了
            con.commit();
        }
    } catch (SQLException e ) {
        JDBCTutorialUtilities.printSQLException(e);
        if (con != null) {
            try {
                System.err.print("Transaction is being rolled back");
                // 如果有异常，则回滚
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

在这个方法中，连接 con 的自动提交模式被禁用，这意味着当方法 commit 被调用时，两个准备好的语句updateSales 和 updateTotal 一起提交。每当调用提交方法时（无论是启用自动提交模式时自动提交，还是禁用自动提交模式时显式提交），事务中的所有语句所产生的变化都将被永久化。在本例中，这意味着哥伦比亚咖啡的SALES 和 TOTAL 列已经被改为 50（如果 TOTAL 之前是 0），并将保留这个值，直到它们被另一条更新语句更改。

`con.setAutoCommit(true)`；启用了自动提交模式，也就是每条语句完成后再次自动提交。然后，你又回到了默认状态，你不必自己调用方法提交。**建议只在事务模式下禁用自动提交模式**。这样可以避免为多条语句持有数据库锁，从而增加与其他用户发生冲突的可能性。

##  使用事物来保护数据完整性

除了将语句作为一个单元组合在一起执行外，事务还可以帮助维护表中数据的完整性。例如，想象一下，一个员工应该在表 COFFEES 中输入新的咖啡价格，但推迟了几天才输入。在此期间，价格上涨，今天老板正在输入更高的价格。在老板试图更新表的同时，员工终于开始输入现在过时的价格。在插入过时的价格后，雇员意识到它们不再有效，于是调用连接方法回滚来撤销它们的影响。方法回滚会中止一个事务，并将值恢复到尝试更新之前的状态）。同时，所有者正在执行一个 SELECT 语句并打印新的价格。在这种情况下，所有者有可能会打印一个已经回滚到以前的值的价格，使得打印的价格不正确。

这种情况可以通过使用事务来避免，为两个用户同时访问数据时产生的冲突提供一定程度的保护。

为了避免在事务过程中发生冲突，**DBMS 使用锁**，即阻止他人访问事务所访问的数据的机制。（注意，**在自动提交模式下，每条语句都是一个事务，锁只为一条语句保留**）。锁被设置后，它一直有效，直到事务被提交或回滚。例如，一个 DBMS 可以锁定表的一条记录，直到表的更新被提交。这个锁的作用是防止用户获得脏读，即在一个值被永久化之前读取它。（访问一个尚未提交的更新值被认为是脏读，因为该值有可能被回滚到之前的值。如果你读取一个后来被回滚的值，你将读取一个无效的值。）

锁的设置方式由所谓的事务隔离级别决定，其范围可以从完全不支持事务到支持执行非常严格访问规则的事务。

事务隔离级别的一个例子是 TRANSACTION_READ_COMMITTED，它将不允许访问一个值，直到它被提交之后。换句话说，如果事务隔离级别设置为 TRANSACTION_READ_COMMITTED，DBMS 就不允许发生脏读。 Connection 接口包括五个值，它们代表了你在 JDBC 中可以使用的事务隔离级别。

| Isolation Level<br/> 隔离级别  | Transactions <br/>  事物 | Dirty Reads<br/>脏读 | Non-Repeatable Reads<br/>不可重复读 | Phantom Reads<br/>幻读 |
| ------------------------------ | ------------------------ | -------------------- | ----------------------------------- | ---------------------- |
| `TRANSACTION_NONE`             | 不支持                   | 不适用               | 不适用                              | 不适用                 |
| `TRANSACTION_READ_COMMITTED`   | Supported                | Prevented            | Allowed                             | Allowed                |
| `TRANSACTION_READ_UNCOMMITTED` | Supported                | Allowed              | Allowed                             | Allowed                |
| `TRANSACTION_REPEATABLE_READ`  | Supported                | Prevented            | Prevented                           | Allowed                |
| `TRANSACTION_SERIALIZABLE`     | Supported                | Prevented            | Prevented                           | Prevented              |

当事务 A 检索一条行，事务 B 随后更新该行，事务 A 随后再次检索同一条行时，就会发生 **不可重复读**。事务 A 两次检索同一行，但看到的数据不同。

当事务 A 检索到一组满足给定条件的行时，事务 B 随后插入或更新了一条行，使该行现在满足了事务 A 中的条件，随后事务 A 重复了条件检索，这时就发生了 **幻读**。事务 A 现在看到了一条额外的行。这条行被称为幻象。

注意：一个 JDBC 驱动程序可能不支持所有的事务隔离级别。如果一个驱动程序不支持在调用setTransactionIsolation 时指定的隔离级别，该驱动程序可以替换一个更高、更严格的事务隔离级别。如果驱动程序不能替代更高的事务级别，它将抛出一个 SQLException。使用方法DatabaseMetaData.supportTransactionIsolationLevel 来确定驱动程序是否支持给定级别。

##  设置和回滚到保存点

Connection.setSavepoint 方法，在当前事务中设置一个 Savepoint 对象。Connection.rollback 方法重载了一个Savepoint 参数。

下面的方法 CoffeesTable.modifyPricesByPercentage 将特定咖啡的价格提高一个百分比，即 priceModifier。但是，如果新的价格大于指定的价格 maximumPrice，那么价格将恢复到原来的价格。

```java
  public void modifyPricesByPercentage(String coffeeName, float priceModifier,
                                       float maximumPrice) throws SQLException {
    con.setAutoCommit(false);

    Statement getPrice = null;
    Statement updatePrice = null;
    ResultSet rs = null;
    String query =
      "SELECT COF_NAME, PRICE FROM COFFEES " + "WHERE COF_NAME = '" +
      coffeeName + "'";

    try {
      // 设置一个保存点
      Savepoint save1 = con.setSavepoint();
      getPrice =
          con.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
      updatePrice = con.createStatement();

      // 查询价格
      if (!getPrice.execute(query)) {
        System.out.println("Could not find entry for coffee named " +
                           coffeeName);
      } else {
        rs = getPrice.getResultSet();
        rs.first();
        float oldPrice = rs.getFloat("PRICE");
        float newPrice = oldPrice + (oldPrice * priceModifier);
        System.out.println("Old price of " + coffeeName + " is " + oldPrice);
        System.out.println("New price of " + coffeeName + " is " + newPrice);
        System.out.println("Performing update...");
        // 将新价格更新
        updatePrice.executeUpdate("UPDATE COFFEES SET PRICE = " + newPrice +
                                  " WHERE COF_NAME = '" + coffeeName + "'");
        System.out.println("\nCOFFEES table after update:");
        CoffeesTable.viewTable(con);

        // 如果新价格大于 maximumPrice，则回滚修改
        if (newPrice > maximumPrice) {
          System.out.println("\nThe new price, " + newPrice +
                             ", is greater than the maximum " + "price, " +
                             maximumPrice +
                             ". Rolling back the transaction...");
          con.rollback(save1);
          System.out.println("\nCOFFEES table after rollback:");
          CoffeesTable.viewTable(con);
        }
        con.commit();
      }
    } catch (SQLException e) {
      JDBCTutorialUtilities.printSQLException(e);
    } finally {
      if (getPrice != null) { getPrice.close(); }
      if (updatePrice != null) { updatePrice.close(); }
      con.setAutoCommit(true);
    }
  }
```

下面的语句指定当调用提交方法时，从 getPrice 查询生成的 ResultSet 对象的游标被关闭。注意，如果你的 DBMs 不支持 ResultSet.CLOSE_CURSORS_AT_COMMIT，那么这个常量将被忽略。

```java
getPrice = con.prepareStatement(query, ResultSet.CLOSE_CURSORS_AT_COMMIT);
```

该方法首先用以下语句创建一个保存点。

```java
Savepoint save1 = con.setSavepoint();
```

该方法检查新价格是否大于 maximumPrice 值。如果是这样，该方法就会用以下语句回滚事物。

```java
con.rollback(save1);
```

因此，当该方法通过调用 Connection.commit 方法来提交事务时，它将不会提交其关联的 Savepoint 已被回滚的任何行；它将提交所有其他更新的行。

##  释放保存点

方法 Connection.releaseSavepoint 将一个 Savepoint 对象作为参数，并从当前事务中删除它。

当一个保存点被释放后，如果试图在回滚操作中引用它，就会产生一个 SQLException。在事务中创建的任何保存点都会在事务提交或整个事务回滚时自动释放并变得无效。将一个事务回滚到一个保存点，会自动释放在保存点之后创建的任何其他保存点，并使其无效。

##  何时调用方法回滚

如前所述，调用方法回滚会终止一个事务，并将任何被修改的值返回到它们之前的值。如果你试图在一个事务中执行一个或多个语句，并得到一个 SQLException，调用方法回滚来结束事务，并重新开始事务。这是了解什么已经提交和什么没有提交的唯一方法。捕获一个 SQLException 告诉你有些事情是错误的，但它并不能告诉你什么是被提交的，什么是没有被提交的。因为你不能指望什么都没有提交，所以调用方法回滚是确定的唯一方法。

CoffeesTable.updateCoffeeSales 方法演示了一个事务，并包含一个调用方法回滚的捕获块。如果应用程序继续并使用事务的结果，那么在捕获块中对回滚方法的这个调用可以防止使用可能不正确的数据。