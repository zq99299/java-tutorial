# 入门指南

本教程附带的示例代码创建了一个数据库，供名为 The coffee Break 的小咖啡馆的所有者使用。在这家咖啡馆，咖啡豆按磅出售，煮好的咖啡按杯出售。

::: tip

注意：本教程将不会教你如何搭建一个开发环境，因为您能看到这里，说明您已经是一个 java 入门者了。

由于官网这一章节的教程，有很多工具等都是比较落后的，甚至很多年都已经不在世面上存在了。

所以本章，将会安装笔者现在的开发知识进行讲解。最主要的无非是创建一个 maven 或则 gradle 的 java 项目，引用 mysql 驱动包。

改造完成后的代码文件和结构，会在此文章末尾附上完整代码，可以先按照目录结构在本地创建好项目，然后在阅读的时候，可以运行测试。

:::

以下步骤配置一个 JDBC 开发环境，您可以使用它编译和运行教程示例：

1. 在计算机上安装最新版本的 Java SE SDK
2. 如果需要，安装数据库管理系统（DBMS）
3. 从数据库供应商安装 JDBC 驱动程序
4. 安装 Gradle 6.x 版本
5. 下载示例代码
6. 准备练习用的数据库和表数据

## 1. 在计算机上安装最新版本的 Java SE SDK

在计算机上安装最新版本的 Java SE SDK。确保环境变量中包含 Java SE SDK `bin` 目录的完整目录路径，`PATH `以便您可以从任何目录运行 Java 编译器和 Java 应用程序启动器。

## 2. 如果需要，安装数据库管理系统（DBMS）

您可以使用 Java DB，它是最新版本的 Java SE SDK 附带的。本教程已经测试了以下 DBMS：

- [Java DB](http://www.oracle.com/technetwork/java/javadb/overview/index.html)：别考虑这个了。2015 年 6 月开始，JavaDB 不再包含在最新版本的 JDK 中。
- [MySQL](http://www.mysql.com/)

注意，如果您使用的是另一个 DBMS，那么您可能必须修改教程示例的代码。

## 3. 从数据库供应商安装 JDBC 驱动程序

使用 MySQL 在这里获取驱动包 [Connector/J](http://www.mysql.com/products/connector/)。

JDBC 驱动程序有许多可能的实现。这些实现分类如下：

- Type 1：将 JDBC API 实现为映射到另一个数据访问 API（如 ODBC （开放数据库连接））的驱动程序。这种类型的驱动程序通常依赖于本机库，这限制了它们的可移植性。JDBC-ODBC 桥是 Type 1 驱动程序的一个示例。

  注意：应该将 JDBC-ODBC 桥视为一种过渡性解决方案。Oracle 不支持它。考虑仅在 DBMS 不提供只支持 java的 JDBC 驱动程序时使用它。

- Type 2：部分用 Java 编程语言和部分用本机代码编写的驱动程序。这些驱动程序使用特定于它们所连接的数据源的本地客户端库。同样，由于本机代码的存在，它们的可移植性受到了限制。Oracle 的 OCI （Oracle Call Interface）客户端驱动程序是 Type 2 驱动程序的一个示例。

- Type 3：使用纯 Java 客户机并使用与数据库无关的协议与中间件服务器通信的驱动程序。然后，中间件服务器将客户机的请求传递给数据源。

- Type 4：纯 Java 驱动程序，为特定数据源实现网络协议。客户端直接连接到数据源。

检查您的 DBMS 附带了哪些驱动程序类型。Java DB 附带了两个 Type 4 驱动程序，一个嵌入式驱动程序和一个网络客户端驱动程序。MySQL Connector/J 是一个 Type 4 驱动程序。

安装 JDBC 驱动程序通常包括将驱动程序复制到您的计算机，然后将其位置添加到您的类路径中。此外，除了 Type 4 驱动程序之外，许多 JDBC 驱动程序都需要安装客户端 API。通常不需要其他特殊配置。

## 4. 安装 Gradle 6.x 版本

不会教你如何安装，可以使用您自己熟悉的 maven 之类的来构建 java 项目

## 5. 下载示例代码

你可以不下载此示例，笔者会在讲解过程中，逐步的贴出来。

可以下载官方给定的压缩包，但是笔者不准备这样做，笔者会下载压缩包，并挑选出 mysql 相关的文件，并使用 idea + greadle 来构建这个练习项目

示例代码  [JDBCTutorial.zip](https://docs.oracle.com/javase/tutorial/jdbc/basics/examples/zipfiles/JDBCTutorial.zip) 文件，由以下文件组成：

- ```
  properties
  ```

  - `javadb-build-properties.xml`
  - `javadb-sample-properties.xml`
  - `mysql-build-properties.xml`
  - `mysql-sample-properties.xml`

- ```
  sql
  ```

  - ```
    javadb
    ```

    - `create-procedures.sql`
    - `create-tables.sql`
    - `drop-tables.sql`
    - `populate-tables.sql`

  - ```
    mysql
    ```

    - `create-procedures.sql`
    - `create-tables.sql`
    - `drop-tables.sql`
    - `populate-tables.sql`

- ```
  src/com/oracle/tutorial/jdbc
  ```

  - `CachedRowSetSample.java`
  - `CityFilter.java`
  - `ClobSample.java`
  - `CoffeesFrame.java`
  - `CoffeesTable.java`
  - `CoffeesTableModel.java`
  - `DatalinkSample.java`
  - `ExampleRowSetListener.java`
  - `FilteredRowSetSample.java`
  - `JdbcRowSetSample.java`
  - `JDBCTutorialUtilities.java`
  - `JoinSample.java`
  - `ProductInformationTable.java`
  - `RSSFeedsTable.java`
  - `StateFilter.java`
  - `StoredProcedureJavaDBSample.java`
  - `StoredProcedureMySQLSample.java`
  - `SuppliersTable.java`
  - `WebRowSetSample.java`

- ```
  txt
  ```

  - `colombian-description.txt`

- ```
  xml
  ```

  - `rss-coffee-industry-news.xml`
  - `rss-the-coffee-break-blog.xml`

- `build.xml`

创建一个目录来包含示例的所有文件。这些步骤将此目录称为 `<JDBC tutorial 目录>`。将 JDBCTutorial.zip 解压缩到 `<JDBC tutorial目录>` 中。

##  准备练习用的数据库和表数据

create-tables.sql 创建表结构的 sql 文件

```sql
create table SUPPLIERS
  (SUP_ID integer NOT NULL,
  SUP_NAME varchar(40) NOT NULL,
  STREET varchar(40) NOT NULL,
  CITY varchar(20) NOT NULL,
  STATE char(2) NOT NULL,
  ZIP char(5),
  PRIMARY KEY (SUP_ID));
  
create table COFFEES
  (COF_NAME varchar(32) NOT NULL,
  SUP_ID int NOT NULL,
  PRICE numeric(10,2) NOT NULL,
  SALES integer NOT NULL,
  TOTAL integer NOT NULL,
  PRIMARY KEY (COF_NAME),
  FOREIGN KEY (SUP_ID) REFERENCES SUPPLIERS (SUP_ID));
  
create table COFFEE_DESCRIPTIONS
  (COF_NAME varchar(32) NOT NULL,
  COF_DESC blob NOT NULL,
  PRIMARY KEY (COF_NAME),
  FOREIGN KEY (COF_NAME) REFERENCES COFFEES (COF_NAME));

create table RSS_FEEDS
  (RSS_NAME varchar(32) NOT NULL,
  RSS_FEED_XML longtext NOT NULL,
  PRIMARY KEY (RSS_NAME));
  
create table COF_INVENTORY
  (WAREHOUSE_ID integer NOT NULL,
  COF_NAME varchar(32) NOT NULL,
  SUP_ID int NOT NULL,
  QUAN int NOT NULL,
  DATE_VAL timestamp,
  FOREIGN KEY (COF_NAME) REFERENCES COFFEES (COF_NAME),
  FOREIGN KEY (SUP_ID) REFERENCES SUPPLIERS (SUP_ID));
  
create table MERCH_INVENTORY
  (ITEM_ID integer NOT NULL,
  ITEM_NAME varchar(20),
  SUP_ID int,
  QUAN int,
  DATE_VAL timestamp,
  PRIMARY KEY (ITEM_ID),
  FOREIGN KEY (SUP_ID) REFERENCES SUPPLIERS (SUP_ID));
  
create table COFFEE_HOUSES
  (STORE_ID integer NOT NULL,
  CITY varchar(32),
  COFFEE int NOT NULL,
  MERCH int NOT NULL,
  TOTAL int NOT NULL,
  PRIMARY KEY (STORE_ID));
  
create table DATA_REPOSITORY
  (DOCUMENT_NAME varchar(50),
  URL varchar(200));
```

populate-tables.sql 插入测试数据的 SQL 文件

```sql
insert into SUPPLIERS values(49,  'Superior Coffee', '1 Party Place', 'Mendocino', 'CA', '95460');
insert into SUPPLIERS values(101, 'Acme, Inc.', '99 Market Street', 'Groundsville', 'CA', '95199');
insert into SUPPLIERS values(150, 'The High Ground', '100 Coffee Lane', 'Meadows', 'CA', '93966');
insert into SUPPLIERS values(456, 'Restaurant Supplies, Inc.', '200 Magnolia Street', 'Meadows', 'CA', '93966');
insert into SUPPLIERS values(927, 'Professional Kitchen', '300 Daisy Avenue', 'Groundsville', 'CA', '95199');

insert into COFFEES values('Colombian',          101, 7.99, 0, 0);
insert into COFFEES values('French_Roast',       49,  8.99, 0, 0);
insert into COFFEES values('Espresso',           150, 9.99, 0, 0);
insert into COFFEES values('Colombian_Decaf',    101, 8.99, 0, 0);
insert into COFFEES values('French_Roast_Decaf', 049, 9.99, 0, 0);

insert into COF_INVENTORY values(1234, 'Colombian',       101, 0, '2006-04-01');
insert into COF_INVENTORY values(1234, 'French_Roast',    49,  0, '2006-04-01');
insert into COF_INVENTORY values(1234, 'Espresso',        150, 0, '2006-04-01');
insert into COF_INVENTORY values(1234, 'Colombian_Decaf', 101, 0, '2006-04-01');

insert into MERCH_INVENTORY values(00001234, 'Cup_Large', 456, 28, '2006-04-01');
insert into MERCH_INVENTORY values(00001235, 'Cup_Small', 456, 36, '2006-04-01');
insert into MERCH_INVENTORY values(00001236, 'Saucer', 456, 64, '2006-04-01');
insert into MERCH_INVENTORY values(00001287, 'Carafe', 456, 12, '2006-04-01');
insert into MERCH_INVENTORY values(00006931, 'Carafe', 927, 3, '2006-04-01');
insert into MERCH_INVENTORY values(00006935, 'PotHolder', 927, 88, '2006-04-01');
insert into MERCH_INVENTORY values(00006977, 'Napkin', 927, 108, '2006-04-01');
insert into MERCH_INVENTORY values(00006979, 'Towel', 927, 24, '2006-04-01');
insert into MERCH_INVENTORY values(00004488, 'CofMaker', 456, 5, '2006-04-01');
insert into MERCH_INVENTORY values(00004490, 'CofGrinder', 456, 9, '2006-04-01');
insert into MERCH_INVENTORY values(00004495, 'EspMaker', 456, 4, '2006-04-01');
insert into MERCH_INVENTORY values(00006914, 'Cookbook', 927, 12, '2006-04-01');

insert into COFFEE_HOUSES values(10023, 'Mendocino', 3450, 2005, 5455);
insert into COFFEE_HOUSES values(33002, 'Seattle', 4699, 3109, 7808);
insert into COFFEE_HOUSES values(10040, 'SF', 5386, 2841, 8227);
insert into COFFEE_HOUSES values(32001, 'Portland', 3147, 3579, 6726);
insert into COFFEE_HOUSES values(10042, 'SF', 2863, 1874, 4710);
insert into COFFEE_HOUSES values(10024, 'Sacramento', 1987, 2341, 4328);
insert into COFFEE_HOUSES values(10039, 'Carmel', 2691, 1121, 3812);
insert into COFFEE_HOUSES values(10041, 'LA', 1533, 1007, 2540);
insert into COFFEE_HOUSES values(33005, 'Olympia', 2733, 1550, 4283);
insert into COFFEE_HOUSES values(33010, 'Seattle', 3210, 2177, 5387);
insert into COFFEE_HOUSES values(10035, 'SF', 1922, 1056, 2978);
insert into COFFEE_HOUSES values(10037, 'LA', 2143, 1876, 4019);
insert into COFFEE_HOUSES values(10034, 'San_Jose', 1234, 1032, 2266);
insert into COFFEE_HOUSES values(32004, 'Eugene', 1356, 1112, 2468);

```

