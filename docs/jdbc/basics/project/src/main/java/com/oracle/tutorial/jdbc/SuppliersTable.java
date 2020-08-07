/*
 * Copyright (c) 1995, 2011, Oracle and/or its affiliates. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   - Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *
 *   - Neither the name of Oracle or the names of its
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

package com.oracle.tutorial.jdbc;

import java.net.URL;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class SuppliersTable {

    private String dbName;
    private Connection con;
    private String dbms;

    public SuppliersTable(Connection connArg, String dbNameArg, String dbmsArg) {
        super();
        this.con = connArg;
        this.dbName = dbNameArg;
        this.dbms = dbmsArg;
    }

    public void createTable() throws SQLException {
        String createString =
                "create table SUPPLIERS " + "(SUP_ID integer NOT NULL, " +
                        "SUP_NAME varchar(40) NOT NULL, " + "STREET varchar(40) NOT NULL, " +
                        "CITY varchar(20) NOT NULL, " + "STATE char(2) NOT NULL, " +
                        "ZIP char(5), " + "PRIMARY KEY (SUP_ID))";
        Statement stmt = null;
        try {
            stmt = con.createStatement();
            stmt.executeUpdate(createString);
        } catch (SQLException e) {
            JDBCTutorialUtilities.printSQLException(e);
        } finally {
            if (stmt != null) {
                stmt.close();
            }
        }
    }

    public void dropTable() throws SQLException {
        Statement stmt = null;
        try {
            stmt = con.createStatement();
            if (this.dbms.equals("mysql")) {
                System.out.println("Dropping table SUPPLIERS from MySQL");
                stmt.executeUpdate("DROP TABLE IF EXISTS SUPPLIERS");
            } else if (this.dbms.equals("derby")) {
                stmt.executeUpdate("DROP TABLE SUPPLIERS");
            }
        } catch (SQLException e) {
            JDBCTutorialUtilities.printSQLException(e);
        } finally {
            if (stmt != null) {
                stmt.close();
            }
        }

    }

    public void populateTable() throws SQLException {
        Statement stmt = null;
        try {
            stmt = con.createStatement();
            stmt.executeUpdate("insert into SUPPLIERS " +
                    "values(49, 'Superior Coffee', '1 Party Place', " +
                    "'Mendocino', 'CA', '95460')");
            stmt.executeUpdate("insert into SUPPLIERS " +
                    "values(101, 'Acme, Inc.', '99 Market Street', " +
                    "'Groundsville', 'CA', '95199')");
            stmt.executeUpdate("insert into SUPPLIERS " +
                    "values(150, 'The High Ground', '100 Coffee Lane', " +
                    "'Meadows', 'CA', '93966')");
        } catch (SQLException e) {
            JDBCTutorialUtilities.printSQLException(e);
        } finally {
            if (stmt != null) {
                stmt.close();
            }
        }
    }

    public void viewSuppliers() throws SQLException {

        Statement stmt = null;
        String query = "select SUP_NAME, SUP_ID from SUPPLIERS";
        try {
            stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(query);

            System.out.println("Suppliers and their ID Numbers:");

            while (rs.next()) {
                String s = rs.getString("SUP_NAME");
                int n = rs.getInt("SUP_ID");
                System.out.println(s + "   " + n);
            }

        } catch (SQLException e) {
            JDBCTutorialUtilities.printSQLException(e);
        } finally {
            if (stmt != null) {
                stmt.close();
            }
        }
    }


    public static void viewTable(Connection con) throws SQLException {
        Statement stmt = null;
        String query =
                "select SUP_ID, SUP_NAME, STREET, CITY, STATE, ZIP from SUPPLIERS";
        try {
            stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            while (rs.next()) {
                int supplierID = rs.getInt("SUP_ID");
                String supplierName = rs.getString("SUP_NAME");
                String street = rs.getString("STREET");
                String city = rs.getString("CITY");
                String state = rs.getString("STATE");
                String zip = rs.getString("ZIP");
                System.out.println(supplierName + "(" + supplierID + "): " + street +
                        ", " + city + ", " + state + ", " + zip);
            }
        } catch (SQLException e) {
            JDBCTutorialUtilities.printSQLException(e);
        } finally {
            if (stmt != null) {
                stmt.close();
            }
        }
    }

    public static void main(String[] args) {
        // 我们改成固定的路径，因为只针对 mysql 测试
        final URL resource = JDBCTutorialUtilities.class.getResource("/properties/mysql-sample-properties.xml");
        String propertiesFileName = resource.getPath();

        JDBCTutorialUtilities myJDBCTutorialUtilities;
        Connection myConnection = null;
        if (propertiesFileName == null) {
            System.err.println("Properties file not specified at command line");
            return;
        } else {
            try {
                // 这里去解析配置文件
                myJDBCTutorialUtilities = new JDBCTutorialUtilities(propertiesFileName);
            } catch (Exception e) {
                System.err.println("Problem reading properties file " + propertiesFileName);
                e.printStackTrace();
                return;
            }
        }
        try {
            // 通过 DriverManager.getConnection 获取一个连接，里面用到的信息就是上面解析的 xml 中的文件
            // 由于是 JDBC 4.0 后的 数据源，所以 DriverManager 会自动扫描在类路径下的 java.sql.Driver 实现类
            // 这里就会自动加载 mysql 驱动包中的 com.mysql.jdbc.Driver 类
            myConnection = myJDBCTutorialUtilities.getConnection();

            // Java DB does not have an SQL create database command; it does require createDatabase
//      JDBCTutorialUtilities.createDatabase(myConnection,
//                                           myJDBCTutorialUtilities.dbName,
//                                           myJDBCTutorialUtilities.dbms);
//
//      JDBCTutorialUtilities.initializeTables(myConnection,
//                                             myJDBCTutorialUtilities.dbName,
//                                             myJDBCTutorialUtilities.dbms);

//            // 为了测试创建表的 SQL ，我们这里按照该方法调用方式，新创建了该类，然后调用它
//            final SuppliersTable suppliersTable = new SuppliersTable(myConnection, myJDBCTutorialUtilities.dbName, myJDBCTutorialUtilities.dbms);
//            // 创建表
//            suppliersTable.createTable();
//            // 填充测试数据
//            suppliersTable.populateTable();
//            // 这里创建表，和测试数据这些，在 com.oracle.tutorial.jdbc.JDBCTutorialUtilities.initializeTables 中都有一个统一的初始化操作
//            // 所以，只是为了自己尝试的时候在这里临时写上


            System.out.println("\nContents of SUPPLIERS table:");
            SuppliersTable.viewTable(myConnection);


        } catch (SQLException e) {
            JDBCTutorialUtilities.printSQLException(e);
        } finally {
            JDBCTutorialUtilities.closeConnection(myConnection);
        }
    }
}
