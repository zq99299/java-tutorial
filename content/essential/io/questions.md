# 问题和练习 ： 基本I/O

## 问题

1. 你将用什么类和方法来读取位于大文件末端附近已知位置的几条数据？

2. 在调用format时，指示新行的最佳方式是什么？

3. 如何确定文件的MIME类型？

4. 您将用什么方法来确定文件是否是符号链接？

### 答案
1. Files.newByteChannel返回一个实例SeekableByteChannel，允许您从（或写入）文件中的任何位置读取。 [随机访问文件](/content/essential/io/rafs.md)
2. 使用 `%n` 参数 而不是 `\n` [格式化](//content/essential/io/formatting.md) 
3. `Files.probeContentType`方法使用平台的底层文件类型检测器来评估和返回MIME类型。 [其他有用的方法](/content/essential/io/misc.md)
4. `Files.isSymbolicLink`方法。[ 符号链接或其他](//content/essential/io/links.md)


## 练习

### 练习1
编写一个例子来计算特定字符（例如e）出现在文件中的次数。字符可以在命令行中指定。您可以使用 xanadu.txt输入文件。

```java
public class CountLetter {
    private char lookFor; //需要统计的目标字符
    private Path file; // 需要在该文件中查找文件

    public CountLetter(char lookFor, Path file) {
        this.lookFor = lookFor;
        this.file = file;
    }

    /** 开始统计 */
    public int count() {
        int count = 0;
        try {
            BufferedReader reader = Files.newBufferedReader(file, Charset.forName("utf-8"));
            String line = null;
            while ((line = reader.readLine()) != null) {
                for (int i = 0; i < line.length(); i++) {
                    if (lookFor == line.charAt(i)) {
                        count++;
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return count;
    }

    static void usage() {
        System.out.println("usage: java CountLetter <letter>");
        System.exit(-1);
    }

    public static void main(String[] args) {
        // 在idea中模拟命令行，输入参数
        args = new String[]{"e"};

        if (args.length != 1 || args[0].length() != 1) {
            usage();
        }
        char lookFor = args[0].charAt(0);
        Path file = Paths.get("d20170313-jdk-sources-code/src/test/resources/xanadu.txt");
        System.out.println(file.toAbsolutePath());
        int count = new CountLetter(lookFor, file).count();
        System.out.format("字符 '%c',在文件 '%s' 中出现了 %d 次.%n", lookFor, file, count);
    }

}
```

### 练习2.
文件 datafile以一个单一的方式开始long，告诉您int同一文件中单个数据的偏移量。编写一个获取int数据的程序。什么是int数据？

官方 datafile 文件链接已经404了，所以下面这断代码是标识啥意思。我没有看明白，直接忽略跳过该练习
```java
public class FindInt {
    private Path file;

    FindInt(Path file) {
        this.file = file;
    }

    public int seek() throws IOException {
        int num = -1;

        try (SeekableByteChannel fc = Files.newByteChannel(file)) {

            ByteBuffer buf = ByteBuffer.allocate(8);

            //Get the offset into the file.
            fc.read(buf);
            long offset = buf.getLong(0);

            //Seek to the offset location.
            fc.position(offset);
            buf.rewind();

            //Read the 'secret' value.
            fc.read(buf);
            num = buf.getInt(0);
        } catch (IOException x) {
            System.err.println(x);
        }
        return num;
    }

    public static void main(String[] args) throws IOException {
        Path file = Paths.get("datafile");
        int num = new FindInt(file).seek();
        System.out.println("The value is " + num);
    }
}
```