# 建立连接

首先，需要与要使用的数据源建立连接。数据源可以是 DBMS、遗留文件系统或具有相应 JDBC 驱动程序的其他数据源。通常，JDBC 应用程序使用以下两个类中的一个连接到目标数据源：

- `DriverManager`

  这个完全实现的类将应用程序连接到由数据库 URL 指定的数据源。当这个类 **首次尝试建立连接时**，它会 [自动加载在类路径中找到的所有 JDBC 4.0 驱动程序]()。

  注意，您的应用程序必须手动加载 4.0 版本之前的 JDBC 驱动程序。

- `DataSource`

  此接口优于 DriverManager，因为它允许有关底层数据源的细节对应用程序透明。设置 `DataSource` 对象的属性，以便它表示特定的数据源。

  有关更多信息，请参见 [使用 `DataSource` 对象](./sqldatasources.md)
  
  有关使用 DataSource 类开发应用程序的更多信息，请参阅最新的 [Java EE 教程](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html)。

注意：本教程中的示例使用 DriverManager 类而不是 DataSource 类，因为它更容易使用，而且示例不需 DataSource 类的特性。

本节涵盖以下主题：

- 使用 DriverManager 类
- 指定数据库连接 url

## 使用 DriverManager 类

通过 DriverManager 类连接到 DBMS 涉及到调用  DriverManager. getconnection 方法。

下面代码片段来自 ` com.oracle.tutorial.jdbc.JDBCTutorialUtilities#getConnection()` 方法

```java
public Connection getConnection() throws SQLException {

    Connection conn = null;
    Properties connectionProps = new Properties();
    connectionProps.put("user", this.userName);
    connectionProps.put("password", this.password);

    if (this.dbms.equals("mysql")) {
        conn = DriverManager.getConnection(
                   "jdbc:" + this.dbms + "://" +
                   this.serverName +
                   ":" + this.portNumber + "/",
                   connectionProps);
    } else if (this.dbms.equals("derby")) {
        conn = DriverManager.getConnection(
                   "jdbc:" + this.dbms + ":" +
                   this.dbName +
                   ";create=true",
                   connectionProps);
    }
    System.out.println("Connected to database");
    return conn;
}
```

`DriverManager.getConnection` 建立数据库连接。这种方法需要一个数据库 URL，该 URL 根据 DBMS 的不同而不同。以下是一些数据库 url 的例子：

MySQL： `jdbc:mysql://localhost:3306/`，localhost 是托管数据库的服务器的名称，而 3306 是端口号

此方法指定使用 Properties 对象访问 DBMS 所需的用户名和密码。

**注意事项**：

- 通常，在数据库 URL 中，您还要指定要连接的现有数据库的名称，例如 `jdbc:mysql://localhost:3306/mysql`  ，连接中末尾的 mysql。表示要连接名为 mysql 的 schema

- 在 JDBC 的早期版本中，要获得一个 connection，首先必须通过调用 Class.forName 方法，来初始化 JDBC 驱动程序。这个方法需要一个 `java.sql.Driver` 类型的对象。每个 JDBC 驱动程序包含一个或多个实现 `java.sql.Driver` 接口的类。mysql 的驱动类是  `com.mysql.jdbc.Driver`，请参阅 DBMS 驱动程序的文档，获取实现 `java.sql.Driver` 的类的名称（不同版本的驱动包有可能不一样）。

  在类路径中找到的任何 JDBC 4.0 驱动程序都会自动加载。（但是，您必须使用 Class.forName 方法，手动加载JDBC 4.0 之前的任何驱动程序。)

该方法返回一个 Connection 对象，它表示与 DBMS 或特定数据库的连接。通过此对象查询数据库。

## 指定数据库连接 url

数据库连接 URL 是 DBMS JDBC 驱动程序用来连接数据库的字符串。它可以包含诸如在何处搜索数据库、要连接到的数据库的名称和配置属性等信息。数据库连接 URL 的确切语法由 DBMS 指定。

如 MySQL Connector/J Database URL 语法如下

```
jdbc:mysql://[host][,failoverhost...]
    [:port]/[database]
    [?propertyName1][=propertyValue1]
    [&propertyName2][=propertyValue2]...
```

- `host:port`：

  是托管数据库的计算机的主机名和端口号。如果没有指定，主机和端口的默认值分别是 127.0.0.1 和 3306。

- database：

  要连接的数据库的名称。如果未指定，则不使用缺省数据库建立连接。

- failover：

  是备用数据库的名称（MySQL Connector/J 支持故障转移）。

- `propertyName=propertyValue`

  表示可选的、与号分隔的属性列表。这些属性使您能够指示 MySQL Connector/J 执行各种任务。

更多信息请参见 [MySQL 参考手册](https://dev.mysql.com/doc/)。