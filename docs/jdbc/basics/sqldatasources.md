# 使用 `DataSource` 对象

本节介绍 DataSource 对象，它们是获得到数据源连接的首选方法。除了稍后将解释的其他优点外，DataSource 对象还可以提供 **连接池** 和 **分布式事务**。此功能对于企业数据库计算是必不可少的。特别是，它对于企业 javabean （EJB） 技术来说是不可或缺的。

本节向您展示如何使用 DataSource 接口获取连接，以及如何使用分布式事务和连接池。这两种方法都只涉及 JDBC 应用程序中很少的代码更改。

为部署使这些操作成为可能的类而执行的工作（系统管理员通常使用工具（如 Apache Tomcat 或 Oracle WebLogic Server ））随所部署的数据源对象的类型而变化。因此，本节的大部分内容将专门介绍系统管理员如何设置环境，以便程序员可以使用 DataSource 对象来获取连接。

所涵盖的主题如下：

- 使用 `DataSource` 对象获取连接
- 部署基本 `DataSource` 对象
- 部署其他  `DataSource`  实现
- 获取和使用池连接
- 部署分布式事务
- 为分布式事务使用连接



##  使用 `DataSource` 对象获取连接

在 [建立链接](./connecting.md) 时，您学习了如何使用 DriverManager 类获取连接。本节向您展示如何使用 DataSource 对象来获得到数据源的连接，这是首选的方法。

由实现  `DataSource`  的类实例化的对象表示特定的 DBMS 或其他数据源，如文件。 `DataSource`  对象表示特定的 DBMS 或其他数据源，比如文件。如果一个公司使用多个数据源，它将为每个数据源部署一个单独的  `DataSource`  对象。 `DataSource` 接口是由驱动程序供应商实现的。它可以通过三种不同的方式实现：

- 基本的 DataSource 实现标准的 Connection 对象，这些对象没有被池化或在分布式事务中使用。
- 支持连接池的 DataSource 实现生成参与连接池的 Connection ，即可回收的连接。
- 支持分布式事务的 DataSource 实现生成可用于分布式事务的连接对象，即访问两个或多个 DBMS 服务器的事务。

JDBC 驱动程序至少应包括一个基本的 `DataSource`  实现。例如，MySQL 的  `com.mysql.jdbc.jdbc2.optional.MysqlDataSource`。

**支持分布式事务** 的 DataSource 类通常也实现对 **连接池** 的支持。例如，EJB 供应商提供的 DataSource 类几乎总是同时支持连接池和分布式事务。

从前面的例子中可以看出，假设咖啡馆连锁店的所有者决定通过在互联网上销售咖啡来进一步扩张。随着预期的 **大量在线业务**，所有者肯定会 **需要连接池**。打开和关闭连接涉及 **大量的开销**，所有者预计这个在线订购系统将需要大量的查询和更新。**使用连接池，可以反复使用连接池**，避免为每次数据库访问创建新连接的开销。此外，所有者现在有第二个 DBMS，其中包含最近收购的咖啡烘焙公司的数据。这意味着所有者希望能够同时使用旧的DBMS 服务器和新的 DBMS 服务器来编写 **分布式事务**。

连锁店所有者重新配置了计算机系统，以服务于新的、更大的客户群。所有者已经购买了最新的 JDBC 驱动程序和与之协同工作的 EJB 应用程序服务器，以便能够使用分布式事务并获得连接池带来的提高的性能。有许多 JDBC 驱动程序与最近购买的 EJB 服务器兼容。所有者现在有一个 **三层体系结构**：

- 中间层是一个新的 EJB 应用程序服务器和 JDBC 驱动程序，
- 第三层是两个 DBMS 服务器。
- 发出请求的客户端计算机是第一层。

##  部署基本 `DataSource` 对象

系统管理员需要部署 DataSource 对象，以便 Coffee Break 的编程团队可以开始使用它们。部署一个数据源对象由三个任务组成：

1. 创建 `DataSource` 类实例
2. 设置它的属性
3. 向使用 Java 命名和目录接口（JNDI） API 的命名服务注册它

首先，考虑最基本的情况，即使用 DataSource 接口的基本实现，即不支持连接池或分布式事务的实现。在这种情况下，只需要部署一个 `DataSource`  对象。DataSource 的基本实现产生的连接与 DriverManager 类产生的连接类型相同。

### 创建 `DataSource` 类实例并设置其属性

假设一个只想要基本实现数据源的公司从 JDBC 供应商 DB Access Inc 购买了一个驱动程序。这个驱动程序包含类 `com.dbaccess.BasicDataSource` 实现 `DataSource`   接口。下面的代码摘录创建了 BasicDataSource 类的实例并设置了它的属性。在部署了 BasicDataSource 实例之后，程序员可以调用  `DataSource.getConnection` 方法获取到公司数据库 CUSTOMER_ACCOUNTS 的连接。首先，系统管理员使用默认构造函数创建 BasicDataSource 对象
系统管理员然后设置三个属性。请注意，以下代码通常是由部署工具执行的：

```java
com.dbaccess.BasicDataSource ds = new com.dbaccess.BasicDataSource();
ds.setServerName("grinder");
ds.setDatabaseName("CUSTOMER_ACCOUNTS");
ds.setDescription("Customer accounts database for billing");
```

变量 ds 现在表示安装在服务器上的数据库 CUSTOMER_ACCOUNTS。由 BasicDataSource 对象 ds 生成的任何连接都是到数据库 CUSTOMER_ACCOUNTS 的连接。

###  向使用 JNDI API 的命名服务注册 `DataSource` 对象

设置好属性后，系统管理员可以用 JNDI （Java 命名和目录接口）命名服务注册 BasicDataSource 对象。所使用的特定命名服务通常由系统属性决定，这里没有显示该属性。下面的代码摘录注册了 BasicDataSource 对象并将其与逻辑名称 `jdbc/billingDB` 绑定：

```java
Context ctx = new InitialContext();
ctx.bind("jdbc/billingDB", ds);
```

此代码使用 JNDI API。第一行创建了一个 InitialContext 对象，它作为名称的起点，类似于文件系统中的根目录。
第二行将 BasicDataSource 对象 ds 关联或绑定到逻辑名称 jdbc/billingDB。在下一段代码摘录中，为命名服务提供这个逻辑名称，它将返回 BasicDataSource 对象。逻辑名可以是任何字符串。在本例中，公司决定使用名称billingDB 作为 CUSTOMER_ACCOUNTS 数据库的逻辑名称。

在前面的示例中，jdbc 是初始上下文下的一个子上下文，就像根目录下的目录是一个子目录一样。jdbc/billingDB 的名称类似于路径名，其中路径中的最后一项类似于文件名。在本例中，billingDB 是给基本数据源对象 ds 的逻辑名。子上下文 jdbc 是为绑定到数据源对象的逻辑名称保留的，因此 jdbc 将始终是数据源逻辑名称的第一部分。

### 使用部署的 DataSource 对象

在系统管理员部署基本数据源实现之后，就可以供程序员使用了。这意味着程序员可以提供绑定到数据源类实例的逻辑数据源名称，而 JNDI 命名服务将返回该数据源类的实例。然后可以在该数据源对象上调用 `getConnection` 方法，以获得到它表示的数据源的连接。例如，程序员可能编写以下两行代码来获取产生到数据库CUSTOMER_ACCOUNTS 连接的 DataSource 对象。

```java
Context ctx = new InitialContext();
DataSource ds = (DataSource)ctx.lookup("jdbc/billingDB");
```

简单说，就是把创建好的 DataSource 放到了某个对象中，以便外部使用时，直接获取

第一行代码获取一个初始上下文，作为检索数据源对象的起点。当您向方法查找提供逻辑名称 jdbc/billingDB 时，该方法返回系统管理员在部署时绑定到 jdbc/billingDB 的数据源对象。因为方法查找的返回值是一个 Java 对象，所以在将其分配给变量 ds 之前，我们必须将其强制转换为更具体的数据源类型。

变量 ds 是 `com.dbaccess.BasicDataSource` 类的一个实例。实现了 DataSource 接口 `*ds*.getConnection`  获得 CUSTOMER_ACCOUNTS 数据库的连接。

```java
Connection con = ds.getConnection("fernanda","brewed");
```

getConnection 方法只需要用户名和密码，因为变量 ds 在其属性中拥有建立与 CUSTOMER_ACCOUNTS 数据库的连接所需的其余信息，比如数据库名称和位置。

### `DataSource`  对象的优点

由于它的属性，DataSource 对象是获得连接比 DriverManager 类更好的选择。程序员不再需要在他们的应用程序中**硬编码驱动程序名称或 JDBC URL**，这使它们 **更具有可移植性**。此外，`DataSource`   属性使代码维护更加简单。如果有更改，系统管理员可以更新 `DataSource`  属性，而不必关心更改连接到数据源的每个应用程序。例如，如果数据源被移动到另一个服务器，系统管理员所要做的就是将 serverName 属性设置为新服务器名。

除了可移植性和易于维护外，使用 DataSource 对象获取连接还可以提供其他优势。当实现 DataSource 接口以与`ConnectionPoolDataSource` 实现一起工作时，由该 DataSource 类的实例产生的所有连接将 **自动成为池连接**。
类似地，当 DataSource 实现与 XADataSource 类一起工作时，它产生的所有连接将 **自动成为可以在分布式事务中使用的连接**。下一节将展示如何部署这些类型的数据源实现。

##  部署其他  `DataSource`  实现

系统管理员或其他具有此能力的人员可以部署 DataSource 对象，**以便它产生的连接是池连接。** 要做到这一点，他或她首先部署一个 **ConnectionPoolDataSource** 对象，然后部署一个实现来使用它的数据源对象。ConnectionPoolDataSource 对象的属性被设置，以便它表示将要生成连接的数据源。在向 JNDI 命名服务注册了ConnectionPoolDataSource 对象之后，就部署了数据源对象。通常，数据源对象只需要设置两个属性：`description` and `dataSourceName`。给 dataSourceName 属性的值是标识以前部署的 ConnectionPoolDataSource 对象的逻辑名称，该对象包含建立连接所需的属性。

部署了 ConnectionPoolDataSource 和 DataSource 对象后，可以调用 `DataSource.getConnection` 获取一个池连接。此连接将连接到 ConnectionPoolDataSource 对象的属性中指定的数据源。

下面的示例描述了咖啡休息时系统管理员如何部署实现来提供池连接的 DataSource 对象。系统管理员通常会使用部署工具，因此本部分中显示的代码片段是部署工具将执行的代码。

为了获得更好的性能，Coffee Break 公司从 DB Access 公司购买了一个 JDBC 驱动程序，其中包括 `com.dbaccess.ConnectionPoolDS` 类。它实现 ConnectionPoolDataSource 接口。系统管理员创建这个类的一个实例，设置它的属性，并用 JNDI 命名服务注册它。咖啡休息时间购买了 `com.applogic.PooledDataSource` 来自其 EJB 服务器供应商 Application Logic, Inc。PooledDataSource 通过使用 ConnectionPoolDataSource 和com.dbaccess.ConnectionPoolDS 提供的底层支持来实现连接池。

必须首先部署 ConnectionPoolDataSource 对象。下面的代码创建了 `com.dbaccess.ConnectionPoolDS` 的实例。并设置其属性：

```java
com.dbaccess.ConnectionPoolDS cpds = new com.dbaccess.ConnectionPoolDS();
cpds.setServerName("creamer");
cpds.setDatabaseName("COFFEEBREAK");
cpds.setPortNumber(9040);
cpds.setDescription("Connection pooling for " + "COFFEEBREAK DBMS");
```

在部署了 ConnectionPoolDataSource 对象之后，系统管理员将部署 DataSource 对象。下面的代码注册 `com.dbaccess.ConnectionPoolDS`  使用 JNDI 命名服务的 cpds 对象。注意，与 cpds 变量相关联的逻辑名在子上下文 jdbc 下添加了子上下文池，这类似于在分层文件系统中向另一个子目录添加一个子目录。

```java
Context ctx = new InitialContext();
ctx.bind("jdbc/pool/fastCoffeeDB", cpds);
```

接下来，实现与 cpds 变量和其他与 com.dbaccess.ConnectionPoolDS 类交互的 DataSource 类将被部署，
下面的代码创建该类的实例并设置其属性。注意，`com.applogic.PooledDataSource` 实例只设置了两个属性。
之所以设置 description 属性，是因为它总是必需的。设置的另一个属性 `dataSourceName`  为 cpds 提供了逻辑JNDI 名称，它是 `com.dbaccess.ConnectionPoolDS`  的一个实例。换句话说，cpds 表示将为数据源对象实现连接池的 ConnectionPoolDataSource 对象。

下面的代码可能是由部署工具执行的，它创建了一个 PooledDataSource 对象，设置它的属性，并将其绑定到逻辑名称 jdbc/fastCoffeeDB：

```java
com.applogic.PooledDataSource ds = new com.applogic.PooledDataSource();
ds.setDescription("produces pooled connections to COFFEEBREAK");
ds.setDataSourceName("jdbc/pool/fastCoffeeDB");
Context ctx = new InitialContext();
ctx.bind("jdbc/fastCoffeeDB", ds)
```

此时，部署了一个 DataSource 对象，应用程序可以从该对象获得到数据库 COFFEEBREAK 的池连接。

##  获取和使用池连接

##  部署分布式事务

##  为分布式事务使用连接

