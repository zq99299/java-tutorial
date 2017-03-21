# try-with-resources

在块中可以声明一个或多个资源。程序完成后，会自动释放该资源。实现了`java.lang.AutoCloseable`（包括实现的所有对象`java.io.Closeable`）可以用来声明。

```java
static String readFirstLineFromFile(String path) throws IOException {
    try (BufferedReader br =
                   new BufferedReader(new FileReader(path))) {
        return br.readLine();
    }
}
```

在该示例中生命的资源是`BufferedReader`,声明语句出现在try后的括号中。`BufferedReader`在jdk7+实现了`java.lang.AutoCloseable`接口。因此可以在`try-with-resource`语句中声明，无论try语句是正常完成还是意外完成（BufferedReader.readLine抛出IOException），它都将被关闭。

在jdk7之前，可以使用finally块来确保资源是否关闭。

在finally块来确保资源是否关闭的话。try块中出现异常会被抛出，并需要你捕获。而使用`try-with-resource`语句，则异常会被屏蔽，可以不捕获异常，但是必须要抛出。
在JDK7+版本中，可以检索屏蔽异常。请参阅“屏蔽异常”一节。

以下是声明多个资源,使用try同样需要你捕获
```java
 @Test
    public void test() throws IOException {
        writeToFileZipFileContents("xxx.zip","xx.zip");
    }
    public static void writeToFileZipFileContents(String zipFileName,
                                                  String outputFileName)
            throws java.io.IOException {

        java.nio.charset.Charset charset =
                java.nio.charset.StandardCharsets.US_ASCII;
        java.nio.file.Path outputFilePath =
                java.nio.file.Paths.get(outputFileName);

        // Open zip file and create output file with
        // try-with-resources statement
        try (
                java.util.zip.ZipFile zf =
                        new java.util.zip.ZipFile(zipFileName);
                java.io.BufferedWriter writer =
                        java.nio.file.Files.newBufferedWriter(outputFilePath, charset)
        ) {
            // Enumerate each entry
            for (java.util.Enumeration entries =
                 zf.entries(); entries.hasMoreElements(); ) {
                // Get the entry name and write it to the output file
                String newLine = System.getProperty("line.separator");
                String zipEntryName =
                        ((java.util.zip.ZipEntry) entries.nextElement()).getName() +
                                newLine;
                writer.write(zipEntryName, 0, zipEntryName.length());
            }
        }
    }
```

多个声明使用 分号隔开，代码块终止时，无论是正常还是异常，将按照此顺序自动调用对象的`close`方法。注意，资源的`close`方法与他们创建相反的顺序调用。


try-with-resources和捕获异常示例
```java
public static void viewTable(Connection con) throws SQLException {

    String query = "select COF_NAME, SUP_ID, PRICE, SALES, TOTAL from COFFEES";

    try (Statement stmt = con.createStatement()) {
        ResultSet rs = stmt.executeQuery(query);

        while (rs.next()) {
            String coffeeName = rs.getString("COF_NAME");
            int supplierID = rs.getInt("SUP_ID");
            float price = rs.getFloat("PRICE");
            int sales = rs.getInt("SALES");
            int total = rs.getInt("TOTAL");

            System.out.println(coffeeName + ", " + supplierID + ", " + 
                               price + ", " + sales + ", " + total);
        }
    } catch (SQLException e) {
        JDBCTutorialUtilities.printSQLException(e);
    }
}
```

## 屏蔽异常
可通过Throwable[] getSuppressed()获得。添加的话用addSuppressed(Throwable exception)，这个函数一般是在try-with-resources语句中由自动调用的。