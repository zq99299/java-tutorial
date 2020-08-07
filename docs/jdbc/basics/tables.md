# 设置表

这个页面描述了 JDBC 教程中使用的所有表以及如何创建它们：

- COFFEES Table
- SUPPLIERS Table
- COF_INVENTORY Table
- MERCH_INVENTORY Table
- COFFEE_HOUSES Table
- DATA_REPOSITORY Table
- Creating Tables
- Populating Tables

## COFFEES 表

COFFEES 表的信息，存储在 Coffee Break 中出售的咖啡信息·：

| `COF_NAME`         | `SUP_ID` | `PRICE` | `SALES` | `TOTAL` |
| ------------------ | -------- | ------- | ------- | ------- |
| Colombian          | 101      | 7.99    | 0       | 0       |
| French_Roast       | 49       | 8.99    | 0       | 0       |
| Espresso           | 150      | 9.99    | 0       | 0       |
| Colombian_Decaf    | 101      | 8.99    | 0       | 0       |
| French_Roast_Decaf | 49       | 9.99    | 0       | 0       |

下面描述咖啡表中的每一列：

- `COF_NAME` ：储存咖啡的名称。

  保存 SQL 类型 VARCHAR 的值，最大长度为 32 个字符。由于所销售的每种咖啡的名称不同，因此名称唯一地标识特定的咖啡并作为主键

- `SUP_ID：`咖啡店有一个标识咖啡供应商的号码。

  保存 SQL INTEGER 类型的值。它被定义为引用 supplier 表中的列 SUP_ID 的外键。因此，DBMS 将强制这一列中的每个值与供应者表中相应列中的一个值相匹配。

- `PRICE` ：储存每磅咖啡的成本。

  使用 SQL 类型的 FLOAT 保存值，因为它需要保存带有小数点的值。（请注意，货币值通常存储在 SQL 类型的DECIMAL或 NUMERIC 中，但由于 dbms 之间的差异，并避免与早期的不兼容）

- `SALES` ：商店在这一周卖出的咖啡的磅数。
  保存 SQL INTEGER 类型的值。

- `TOTAL` ：商店出售的咖啡到目前为止的磅数。
  保存 SQL INTEGER 类型的值。

## SUPPLIERS  表

SUPPLIERS   表存储关于每个供应商的信息：

| `SUP_ID` | `SUP_NAME`      | `STREET`         | `CITY`       | `STATE` | `ZIP` |
| -------- | --------------- | ---------------- | ------------ | ------- | ----- |
| 101      | Acme, Inc.      | 99 Market Street | Groundsville | CA      | 95199 |
| 49       | Superior Coffee | 1 Party Place    | Mendocino    | CA      | 95460 |
| 150      | The High Ground | 100 Coffee Lane  | Meadows      | CA      | 93966 |

下面介绍了 SUPPLIERS 表中的每个列：

- `SUP_ID`：标识咖啡供应商的编号

   `INTEGER` 类型，主键

- `SUP_NAME`：咖啡供应商的名称。

- `STREET`, `CITY`, `STATE`, and `ZIP`：这些列存储咖啡供应商的地址。

## COF_INVENTORY 表

COF_INVENTORY 表存储有关每个仓库中存储的咖啡量的信息：

| `WAREHOUSE_ID` | `COF_NAME`        | `SUP_ID` | `QUAN` | `DATE_VAL` |
| -------------- | ----------------- | -------- | ------ | ---------- |
| 1234           | House_Blend       | 49       | 0      | 2006_04_01 |
| 1234           | House_Blend_Decaf | 49       | 0      | 2006_04_01 |
| 1234           | Colombian         | 101      | 0      | 2006_04_01 |
| 1234           | French_Roast      | 49       | 0      | 2006_04_01 |
| 1234           | Espresso          | 150      | 0      | 2006_04_01 |
| 1234           | Colombian_Decaf   | 101      | 0      | 2006_04_01 |

- `WAREHOUSE_ID`：仓库的编号

- `COF_NAME`：咖啡的名称

- `SUP_ID`：供应商的编号

- `QUAN`：可用商品的数量

- `DATE`：上次更新时间

  timestamp 类型

## MERCH_INVENTORY 

存储有关库存中非咖啡商品数量的信息：

| `ITEM_ID` | `ITEM_NAME` | `SUP_ID` | `QUAN` | `DATE`     |
| --------- | ----------- | -------- | ------ | ---------- |
| 00001234  | Cup_Large   | 00456    | 28     | 2006_04_01 |
| 00001235  | Cup_Small   | 00456    | 36     | 2006_04_01 |
| 00001236  | Saucer      | 00456    | 64     | 2006_04_01 |
| 00001287  | Carafe      | 00456    | 12     | 2006_04_01 |
| 00006931  | Carafe      | 00927    | 3      | 2006_04_01 |
| 00006935  | PotHolder   | 00927    | 88     | 2006_04_01 |
| 00006977  | Napkin      | 00927    | 108    | 2006_04_01 |
| 00006979  | Towel       | 00927    | 24     | 2006_04_01 |
| 00004488  | CofMaker    | 08732    | 5      | 2006_04_01 |
| 00004490  | CofGrinder  | 08732    | 9      | 2006_04_01 |
| 00004495  | EspMaker    | 08732    | 4      | 2006_04_01 |
| 00006914  | Cookbook    | 00927    | 12     | 2006_04_01 |

- `ITEM_ID`：标识项目的数字
- `ITEM_NAME`： 项目的名称
- `SUP_ID`：供应商的编号。
- `QUAN`：可用的数量
- `DATE`：上次更新时间

## COFFEE_HOUSES 表

存放咖啡馆的位置：

| `STORE_ID` | `CITY`     | `COFFEE` | `MERCH` | `TOTAL` |
| ---------- | ---------- | -------- | ------- | ------- |
| 10023      | Mendocino  | 3450     | 2005    | 5455    |
| 33002      | Seattle    | 4699     | 3109    | 7808    |
| 10040      | SF         | 5386     | 2841    | 8227    |
| 32001      | Portland   | 3147     | 3579    | 6726    |
| 10042      | SF         | 2863     | 1874    | 4710    |
| 10024      | Sacramento | 1987     | 2341    | 4328    |
| 10039      | Carmel     | 2691     | 1121    | 3812    |
| 10041      | LA         | 1533     | 1007    | 2540    |
| 33005      | Olympia    | 2733     | 1550    | 4283    |
| 33010      | Seattle    | 3210     | 2177    | 5387    |
| 10035      | SF         | 1922     | 1056    | 2978    |
| 10037      | LA         | 2143     | 1876    | 4019    |
| 10034      | San_Jose   | 1234     | 1032    | 2266    |
| 32004      | Eugene     | 1356     | 1112    | 2468    |

- `STORE_ID`：咖啡馆的标识 ID

  除其他事项外，它指示咖啡馆所在的城市。例如，以  10 开头的值表示该州为加利福尼亚州。以 32 开头的值表示俄勒冈州，以 33 开头的值表示华盛顿州。

- `CITY`：咖啡馆所在城市的名称。

- `COFFEE`： 已售出的咖啡量

- `MERCH`：已售商品数量

- `TOTAL`：出售的咖啡和商品的总量

## DATA_REPOSITORY 表

存储URL，这些 URL 引用了 Coffee Break 的文档和其他感兴趣的数据。populate_tables.sql 脚本不会向该表添加任何数据。下面介绍了此表中的每个列：

- `DOCUMENT_NAME`：标识 URL 的字符串。
- `URL`：URL

## 创建表

您可以使用 Apache Ant 或 JDBC API 创建表。这里只讲解使用 JDBC API，另外有了 sql 脚本，随意找个 GUI 工具也可以创建这些表

下面代码片段来自  `SuppliersTable.createTable` 方法

```java
public void createTable() throws SQLException {
    String createString =
        "create table " + dbName +
        ".SUPPLIERS " +
        "(SUP_ID integer NOT NULL, " +
        "SUP_NAME varchar(40) NOT NULL, " +
        "STREET varchar(40) NOT NULL, " +
        "CITY varchar(20) NOT NULL, " +
        "STATE char(2) NOT NULL, " +
        "ZIP char(5), " +
        "PRIMARY KEY (SUP_ID))";

    Statement stmt = null;
    try {
        stmt = con.createStatement();
        stmt.executeUpdate(createString);
    } catch (SQLException e) {
        JDBCTutorialUtilities.printSQLException(e);
    } finally {
        if (stmt != null) { stmt.close(); }
    }
}
```

下面代码片段来自 ` CoffeesTable.createTable`

```java
 public void createTable() throws SQLException {
    String createString =
        "create table " + dbName +
        ".COFFEES " +
        "(COF_NAME varchar(32) NOT NULL, " +
        "SUP_ID int NOT NULL, " +
        "PRICE float NOT NULL, " +
        "SALES integer NOT NULL, " +
        "TOTAL integer NOT NULL, " +
        "PRIMARY KEY (COF_NAME), " +
        "FOREIGN KEY (SUP_ID) REFERENCES " +
        dbName + ".SUPPLIERS (SUP_ID))";

    Statement stmt = null;
    try {
        stmt = con.createStatement();
        stmt.executeUpdate(createString);
    } catch (SQLException e) {
        JDBCTutorialUtilities.printSQLException(e);
    } finally {
        if (stmt != null) { stmt.close(); }
    }
}
```

在这两种方法中，con 是一个 Connection 对象，dbName 是在其中创建表的数据库的名称。

要执行 SQL 查询（例如由 String createString 指定的查询），请使用 Statement 对象。若要创建 Statement 对象，请从现有 Connection 对象调用 `Connection.createStatement` 方法。要执行 SQL 查询，请调用 `Statement.executeUpdate` 方法。

当创建它们的连接关闭时，所有 Statement 对象也将关闭。但是，良好的编码习惯是在完成处理后立即显式关闭Statement 对象。这允许立即释放该语句使用的任何外部资源。通过调用 Statement.close 方法关闭一条语句。将此语句放置在 final 中，以确保即使由于抛出异常（例如 SQLException）而中断了正常的程序流，也可以将其关闭。

注意：必须在 COFFEES 之前创建 SUPPLIERS 表，因为 COFFEES 包含引用 SUPPLIERS 的外键 SUP_ID。

## 填充表数据

同样这里展示 JDBC API，另外同样的，有了 SQL 数据脚本，随便找个 GUI 工具也能导入

下面代码片段来自 `SuppliersTable.populateTable` 

```java
public void populateTable() throws SQLException {

    Statement stmt = null;
    try {
        stmt = con.createStatement();
        stmt.executeUpdate(
            "insert into " + dbName +
            ".SUPPLIERS " +
            "values(49, 'Superior Coffee', " +
            "'1 Party Place', " +
            "'Mendocino', 'CA', '95460')");

        stmt.executeUpdate(
            "insert into " + dbName +
            ".SUPPLIERS " +
            "values(101, 'Acme, Inc.', " +
            "'99 Market Street', " +
            "'Groundsville', 'CA', '95199')");

        stmt.executeUpdate(
            "insert into " + dbName +
            ".SUPPLIERS " +
            "values(150, " +
            "'The High Ground', " +
            "'100 Coffee Lane', " +
            "'Meadows', 'CA', '93966')");
    } catch (SQLException e) {
        JDBCTutorialUtilities.printSQLException(e);
    } finally {
        if (stmt != null) { stmt.close(); }
    }
}
```

下面代码片段来自 `CoffeesTable.populateTable`

```java
public void populateTable() throws SQLException {

    Statement stmt = null;
    try {
        stmt = con.createStatement();
        stmt.executeUpdate(
            "insert into " + dbName +
            ".COFFEES " +
            "values('Colombian', 00101, " +
            "7.99, 0, 0)");

        stmt.executeUpdate(
            "insert into " + dbName +
            ".COFFEES " +
            "values('French_Roast', " +
            "00049, 8.99, 0, 0)");

        stmt.executeUpdate(
            "insert into " + dbName +
            ".COFFEES " +
            "values('Espresso', 00150, 9.99, 0, 0)");

        stmt.executeUpdate(
            "insert into " + dbName +
            ".COFFEES " +
            "values('Colombian_Decaf', " +
            "00101, 8.99, 0, 0)");

        stmt.executeUpdate(
            "insert into " + dbName +
            ".COFFEES " +
            "values('French_Roast_Decaf', " +
            "00049, 9.99, 0, 0)");
    } catch (SQLException e) {
        JDBCTutorialUtilities.printSQLException(e);
    } finally {
        if (stmt != null) {
          stmt.close();
        }
    }
}
```

