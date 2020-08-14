# JDBC 基础

在本课程中，您将学习 JDBC API 的基础知识。

- [入门指南](./gettingstarted.md)：建立了基本的数据库开发环境，并向您展示了如何编译和运行 JDBC 教程示例。
- [使用 JDBC 处理 SQL 语句](./processingsqlstatements.md)：概述了处理任何 SQL 语句所需的步骤。随后的页面更详细地描述了这些步骤：
  - [建立链接](./connecting.md)：会将您链接到数据库
  - [使用 `DataSource` 对象](./sqldatasources.md)：进行连接向您展示如何使用 `DataSource` 对象连接数据库，这是获得与数据源的连接的首选方法。
  - [处理 SQLException](./sqlexception.md)：向您展示如何处理由数据库错误引起的异常。
  - [设置表](./tables.md)：描述 JDBC 教程示例中使用的所有数据库表，以及如何使用 JDBC API 和 SQL 脚本创建和填充表。
  -  [从 Result Sets 中检索和修改值](./retrieving.md)：开发了配置数据库、发送查询和从数据库中检索数据的过程。
  - [使用预处理语句](./prepared.md)：描述了一种更灵活的创建数据库查询的方式。
  - [使用事务](./transactions.md)：显示了如何控制何时实际执行数据库查询。
- 使用 `RowSet` 对象：向您介绍  `RowSet` （行集）对象；这些对象以一种比结果集更灵活和更容易使用的方式保存表格数据。下面的页面描述了可用的不同类型的行集对象：
  - 使用 JdbcRowSet  对象
  - 使用 CachedRowSet 对象
  - 使用 JoinRowSet  对象
  - 使用 FilteredRowSet 对象
  - 使用 WebRowSet  对象
- 使用高级数据类型：向您介绍其他数据类型；下面的页面更详细地描述了这些数据类型：
  - 使用 Large 对象
  - 使用 SQLXML 对象
  - 使用 Array  对象
  - 使用 DISTINCT  数据类型
  - 使用 Structured 对象
  - 使用 Customized 自定义类型映射
  - 使用 Datalink 对象
  - 使用 RowId 对象
- [使用存储过程](./storedprocedures.md)：展示了如何创建和使用存储过程，它是一组 SQL 语句，可以像 Java 方法一样调用，具有可变的输入和输出参数。
- 使用 JDBC 和 GUI API 演示了如何将 JDBC 与 Swing API 集成。

