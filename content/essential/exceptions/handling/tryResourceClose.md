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

下面是上面的示例 被编译成的class文件。可以看到try-with-resources也就是一个语法糖被编译后还是使用try,catch,finally来处理的。最后抛出一个异常。

仔细看只有finally中关闭资源的异常被 屏蔽了。“var5.addSuppressed(var32);”,而且也能获得屏蔽的异常列表。这样的话，就能解决又不丢失异常信息，又能捕获且传递被屏蔽的异常了。
```java
    public static void writeToFileZipFileContents(String zipFileName, String outputFileName) {
        Charset charset = StandardCharsets.US_ASCII;
        Path outputFilePath = Paths.get(outputFileName, new String[0]);

        try {
            ZipFile e = new ZipFile(zipFileName);
            Throwable var5 = null;

            try {
                BufferedWriter writer = Files.newBufferedWriter(outputFilePath, charset, new OpenOption[0]);
                Throwable var7 = null;

                try {
                    Enumeration entries = e.entries();

                    while (entries.hasMoreElements()) {
                        String newLine = System.getProperty("line.separator");
                        String zipEntryName = ((ZipEntry) entries.nextElement()).getName() + newLine;
                        writer.write(zipEntryName, 0, zipEntryName.length());
                    }
                } catch (Throwable var34) {
                    var7 = var34;
                    throw var34;
                } finally {
                    if (writer != null) {
                        if (var7 != null) {
                            try {
                                writer.close();
                            } catch (Throwable var33) {
                                var7.addSuppressed(var33);
                            }
                        } else {
                            writer.close();
                        }
                    }

                }
            } catch (Throwable var36) {
                var5 = var36;
                throw var36;
            } finally {
                if (e != null) {
                    if (var5 != null) {
                        try {
                            e.close();
                        } catch (Throwable var32) {
                            var5.addSuppressed(var32);
                        }
                    } else {
                        e.close();
                    }
                }

            }
        } catch (IOException var38) {
            (new Throwable(var38)).addSuppressed(var38);
        }

    }
```

## 实现可自动关闭或可变比接口的类
有关实现这些接口的类的列表，请参阅AutoCloseable和 Closeable接口的Javadoc 。
```java
public interface AutoCloseable {
     void close() throws Exception;
}
public interface Closeable extends AutoCloseable {
    public void close() throws IOException;
}
```
Closeable 扩展 AutoCloseable 接口，并且复写了close方法。抛出了一个具体的IO异常。


