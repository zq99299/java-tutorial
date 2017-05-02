# 走（walk?）文件树

您是否需要创建一个递归访问文件树中的所有文件的应用程序？也许您需要删除树中的每个`.class`结尾的文件，或查找去年没有访问的每个文件。你可以用[FileVisitor](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileVisitor.html)接口来做到这 一点。

本节包括以下内容

* FileVisitor接口
* 开始流程
* 创建FileVisitor时的注意事项
* 控制流
* 例子

## FileVisitor接口
要走一个文件树，你首先需要实现一个`FileVisitor`,指定遍历过程中关键点所需的行为：访问文件时，在访问目录之前，访问目录之后，或发生故障时。该接口有四种方法对应于这些情况：

* preVisitDirectory 
    
    在访问目录的条目之前调用。
* postVisitDirectory
    
    在访问目录中的所有条目之后调用。如果遇到任何错误，则将特定异常传递给该方法。
* visitFile 

    在被访问的文件上调用。该文件`BasicFileAttributes`被传递到该方法，或者您可以使用 文件属性包来读取一组特定的属性。例如，您可以选择读取文件`DosFileAttributeView`以确定文件是否具有“隐藏”位设置。
* visitFileFailed

    当文件无法访问时调用。该特定异常传递给该方法。您可以选择是否抛出异常，将其打印到控制台或日志文件等等。
    
如果你并不想要全部的四种方法，您可以扩展 `SimpleFileVisitor`该类。实现该接口访问树中的所有文件，并在遇到IOError错误时抛出异常。您可以扩展此类，仅覆盖所需的方法。


这是一个扩展`SimpleFileVisitor`到打印文件树中的所有条目的示例。它打印条目是否是常规文件，符号链接，目录或其他“未指定”类型的文件。它还打印每个文件的大小（以字节为单位）。任何遇到的异常都会打印到控制台。

```java
public class PrintFiles extends SimpleFileVisitor<Path> {
    // 打印有关信息
    // 打印文件的类型
    @Override
    public FileVisitResult visitFile(Path file,
                                     BasicFileAttributes attr) {
        if (attr.isSymbolicLink()) {
            System.out.format("Symbolic link: %s ", file);
        } else if (attr.isRegularFile()) {
            System.out.format("Regular（常规） file: %s ", file);
        } else {
            System.out.format("Other: %s ", file);
        }
        System.out.println("(" + attr.size() + "bytes)");
        return FileVisitResult.CONTINUE;
    }

    // 打印所访问的每个目录
    @Override
    public FileVisitResult postVisitDirectory(Path dir,
                                              IOException exc) {
        System.out.format("Directory: %s%n", dir);
        return FileVisitResult.CONTINUE;
    }

    // 如果发生错误应该覆盖此方法，让用户知道
    // 如果不用覆盖此访问将抛出IO异常
    @Override
    public FileVisitResult visitFileFailed(Path file,
                                           IOException exc) {
        System.err.println(exc);
        return FileVisitResult.CONTINUE;
    }
 }   
```
## 开始流程
一旦你实现了`FileVisitor`，你如何启动它？Files中有两种walkFileTree方法。

* walkFileTree(Path, FileVisitor)
* walkFileTree(Path, Set<FileVisitOption>, int, FileVisitor)

**第一种：**只需要一个起点和一个`FileVisitor`实例。您可以按以下方式调用文件访问者：
```java
Path startingDir = Paths.get("g:/");
PrintFiles pf = new PrintFiles();
Files.walkFileTree(startingDir, pf);
```

**第二种：**使您能够额外指定访问级别数量和一组`FileVisitOption`枚举的限制。如果要确保此方法遍历整个文件树，可以指定`Integer.MAX_VALUE`最大深度参数。

您可以指定`FileVisitOption`枚举，`FOLLOW_LINKS`这表示应遵循符号链接。
```java
       Path startingDir = Paths.get("g:/");

        EnumSet<FileVisitOption> opts = EnumSet.of(FileVisitOption.FOLLOW_LINKS);
        FileVisitor fileVisitor = new PrintFiles();
        Files.walkFileTree(startingDir, opts, Integer.MAX_VALUE, fileVisitor);
```
## 创建FileVisitor时的注意事项

文件树首先是深度走过的，但是您不能对子目录访问的迭代顺序进行任何假设。

如果您的程序将更改文件系统，则需要仔细考虑如何实现FileVisitor。

例如，

1. 如果您正在编写递归删除，则在删除目录本身之前首先删除目录中的文件。在这种情况下，您将在`postVisitDirectory`中删除目录。

2. 如果您正在编写递归副本，则`preVisitDirectory`在尝试将文件复制到其中之前创建新目录如果要保留源目录的属性（类似于`UNIX cp -p`命令），则需要在文件复制后执行此操作`postVisitDirectory`。该 Copy示例显示如何执行此操作。 以下示例是模拟`UNIX cp -p`命令的功能：
```java
public class Copy {

    /**
     * Returns {@code true} if okay
     * 如果返回true则覆盖文件，在控制台提示用户是否选择进行覆盖文件，处理("cp -i")命令
     */
    static boolean okayToOverwrite(Path file) {
        String answer = System.console().readLine("overwrite %s (yes/no)? ", file);
        return (answer.equalsIgnoreCase("y") || answer.equalsIgnoreCase("yes"));
    }

    /**
     * @param source   源文件
     * @param target   目标路径
     * @param prompt   当文件重复的时候是否提示 并让用户选择是否进行覆盖
     * @param preserve 是否保留属性
     */
    static void copyFile(Path source, Path target, boolean prompt, boolean preserve) {
        // 可以看到这里如果保留属性的话，提供的参数也只是多了一个 COPY_ATTRIBUTES
        CopyOption[] options = (preserve) ?
                new CopyOption[]{StandardCopyOption.COPY_ATTRIBUTES, StandardCopyOption.REPLACE_EXISTING} :
                new CopyOption[]{StandardCopyOption.REPLACE_EXISTING};
        // 如果 提示，那么就判断该文件是否已经存在，如果已经存在，则让用户决定是否覆盖
        if (!prompt || Files.notExists(target) || okayToOverwrite(target)) {
            try {
                Files.copy(source, target, options);
            } catch (IOException x) {
                System.err.format("Unable to copy: %s: %s%n", source, x);
            }
        }
    }

    /**
     * {@code FileVisitor} 拷贝一个文件树 模仿命令("cp -r")
     */
    static class TreeCopier implements FileVisitor<Path> {
        private final Path source;
        private final Path target;
        private final boolean prompt;
        private final boolean preserve;

        TreeCopier(Path source, Path target, boolean prompt, boolean preserve) {
            this.source = source;
            this.target = target;
            this.prompt = prompt;
            this.preserve = preserve;
        }

        /**
         * 访问目录前
         * @param dir
         * @param attrs
         * @return
         */
        @Override
        public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) {
            // 在访问目录前，我们先复制该目录
            // (okay if directory already exists).
            CopyOption[] options = (preserve) ?
                    new CopyOption[]{StandardCopyOption.COPY_ATTRIBUTES} : new CopyOption[0];

            Path newdir = target.resolve(source.relativize(dir));
            try {
                Files.copy(dir, newdir, options);
            } catch (FileAlreadyExistsException x) {
                // ignore
            } catch (IOException x) {
                System.err.format("Unable to create: %s: %s%n", newdir, x);
                return FileVisitResult.SKIP_SUBTREE;
            }
            return FileVisitResult.CONTINUE;
        }

        /**
         * 访问具体的文件
         * @param file
         * @param attrs
         * @return
         */
        public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {
            copyFile(file, target.resolve(source.relativize(file)),
                     prompt, preserve);
            return FileVisitResult.CONTINUE;
        }

        /**
         * 访问目录后，该目录中的文件都访问完成之后
         * @param dir
         * @param exc
         * @return
         */
        @Override
        public FileVisitResult postVisitDirectory(Path dir, IOException exc) {
            // 如果没有异常且需要copy源文件的属性的话
            // 就需要修复最后修改该目录的时间为源文件的修改时间
            if (exc == null && preserve) {
                Path newdir = target.resolve(source.relativize(dir));
                try {
                    FileTime time = Files.getLastModifiedTime(dir);
                    Files.setLastModifiedTime(newdir, time);
                } catch (IOException x) {
                    System.err.format("Unable to copy all attributes to: %s: %s%n", newdir, x);
                }
            }
            return FileVisitResult.CONTINUE;
        }

        /**
         * 访问文件失败
         * @param file
         * @param exc
         * @return
         */
        @Override
        public FileVisitResult visitFileFailed(Path file, IOException exc) {
            if (exc instanceof FileSystemLoopException) {
                System.err.println("cycle detected: " + file);
            } else {
                System.err.format("Unable to copy: %s: %s%n", file, exc);
            }
            return FileVisitResult.CONTINUE;
        }
    }

    /**
     * 如果输入的命令不对，则提示该如何使用命令
     */
    static void usage() {
        System.err.println("java Copy [-ip] source... target");
        System.err.println("java Copy -r [-ip] source-dir... target");
        System.exit(-1);
    }

    public static void main(String[] args) throws IOException {
        // 在这里 我们用ide运行，所以模拟了在控制台的输入
        // 但是 -i 选项（如果目标文件存在，提示用户是否需要覆盖） 就不能使用了，因为获取不到控制台流
        args = new String[]{"-rp", "G:\\系统维护", "E:\\系统维护"};

        boolean recursive = false;   // r : 是否递归
        boolean prompt = false; // i: 是否提示（当文件存在的时候，是否提示覆盖）
        boolean preserve = false; // p: 是否保持文件属性，且文件如果存在则覆盖

        // 处理选项对应的值，且统计选项个数
        int argi = 0;
        while (argi < args.length) {
            String arg = args[argi];
            if (!arg.startsWith("-"))
                break;
            if (arg.length() < 2)
                usage();
            for (int i = 1; i < arg.length(); i++) {
                char c = arg.charAt(i);
                switch (c) {
                    case 'r':
                        recursive = true;
                        break;
                    case 'i':
                        prompt = true;
                        break;
                    case 'p':
                        preserve = true;
                        break;
                    default:
                        usage();
                }
            }
            argi++;
        }

        // 剩余的参数是源文件和目标位置参数
        int remaining = args.length - argi;
        if (remaining < 2)
            usage();
        // 再减去最后的目标路径，得到1 - n 个源
        // 支持多个源 copy到一个目标路径中
        Path[] source = new Path[remaining - 1]; // 声明一个源文件数组
        int i = 0;
        while (remaining > 1) {
            source[i++] = Paths.get(args[argi++]); // 获取源文件路径
            remaining--;
        }
        // 获得目标路径
        Path target = Paths.get(args[argi]);

        // 检测目标路径是否是一个目录
        boolean isDir = Files.isDirectory(target);

        // copy源文件到目标路径
        for (i = 0; i < source.length; i++) {
            Path dest = (isDir) ? target.resolve(source[i].getFileName()) : target;

            if (recursive) { // 是否递归处理
                // follow links when copying files
                EnumSet<FileVisitOption> opts = EnumSet.of(FileVisitOption.FOLLOW_LINKS);
                TreeCopier tc = new TreeCopier(source[i], dest, prompt, preserve);
                Files.walkFileTree(source[i], opts, Integer.MAX_VALUE, tc);
            } else { // 不递归的话，就处理一层
                // 不使用递归模式的话，那么就只处理 文件而不处理目录
                if (Files.isDirectory(source[i])) {
                    System.err.format("%s: is a directory%n", source[i]);
                    continue;
                }
                // copy 文件
                copyFile(source[i], dest, prompt, preserve);
            }
        }
    }
}
```

3. 如果您正在编写文件搜索，请在`visitFile`方法中执行比较。此方法查找与您的条件匹配的所有文件，但找不到目录。如果要同时查找文件和目录，还必须使用`preVisitDirectory`或`postVisitDirectory`方法进行比较。该 Find示例显示如何执行此操作。
```java
public class Find {
    /**
     * A {@code FileVisitor} that finds
     * 查找匹配的所有文件
     */
    public static class Finder
            extends SimpleFileVisitor<Path> {

        private final PathMatcher matcher;
        private int numMatches = 0;

        Finder(String pattern) {
            matcher = FileSystems.getDefault()
                    .getPathMatcher("glob:" + pattern); // 使用 glob 模式创建匹配器
        }

        /**
         * 使用比较器进行匹配 文件或则目录的名称
         * @param file
         */
        void find(Path file) {
            Path name = file.getFileName();
            if (name != null && matcher.matches(name)) {
                numMatches++;
                System.out.println(file);
            }
        }

        /**
         * 打印匹配到的总个数
         */
        void done() {
            System.out.println("Matched: "
                                       + numMatches);
        }

        /**
         * 在访问文件的时候，调用模式匹配文件
         * @param file
         * @param attrs
         * @return
         */
        @Override
        public FileVisitResult visitFile(Path file,
                                         BasicFileAttributes attrs) {
            find(file);
            return FileVisitResult.CONTINUE;
        }

        /**
         * 在访问目录前调用调用模式匹配文件
         * @param dir
         * @param attrs
         * @return
         */
        @Override
        public FileVisitResult preVisitDirectory(Path dir,
                                                 BasicFileAttributes attrs) {
            find(dir);
            return FileVisitResult.CONTINUE;
        }

        /**
         * 访问文件失败时 打印错误信息
         * @param file
         * @param exc
         * @return
         */
        @Override
        public FileVisitResult visitFileFailed(Path file,
                                               IOException exc) {
            System.err.println(exc);
            return FileVisitResult.CONTINUE;
        }
    }

    /**
     * 使用方式
     */
    static void usage() {
        System.err.println("java Find <path>" +
                                   " -name \"<glob_pattern>\"");
        System.exit(-1);
    }

    public static void main(String[] args)
            throws IOException {
        // 我们在这里模拟命令行方式进行调试
        // 该命令含义：在d盘中查找所有以.xml 结尾的文件
        args = new String[]{"D:\\", "-name", "*.{xml}"};
        // 支持 在 指定路径 按-name 匹配的方式
        if (args.length < 3 || !args[1].equals("-name"))
            usage();

        Path startingDir = Paths.get(args[0]);
        String pattern = args[2];

        Finder finder = new Finder(pattern);
        Files.walkFileTree(startingDir, finder);
        finder.done();
    }
}
```

4. 您需要决定是否要遵循符号链接。如果要删除文件，例如，以下符号链接可能不可取。如果要复制文件树，可能需要允许。默认情况下，`walkFileTree`不遵循符号链接。

    该visitFile方法被调用为文件。如果您指定了该`FOLLOW_LINKS`选项，并且您的文件树具有到父目录的循环链接，则循环目录将在该`visitFileFailed`方法中报告`FileSystemLoopException`。以下代码片段显示了如何捕获循环链接，并从上面的Copy示例中获取 ：
```java
@Override
public FileVisitResult
    visitFileFailed(Path file,
        IOException exc) {
    if (exc instanceof FileSystemLoopException) {
        System.err.println("cycle detected: " + file);
    } else {
        System.err.format("Unable to copy:" + " %s: %s%n", file, exc);
    }
    return CONTINUE;
}
```
遵循符号链接也就是说，任何时候访问到的都是链接对应的实际文件。在copy的时候，那么就会出现循环被copy的情况。这种情况只有在程序跟随符号链接时才会发生。

## 控制流程
也许你想走文件树寻找一个特定的目录，当找到你想要的进程终止。也许你想跳过具体的目录。

这些`FileVisitor`方法返回一个 `FileVisitResult`值。您可以中止文件行进过程或控制是否通过`FileVisitor`方法返回的值访问目录：

* CONTINUE - 表示文件走路应该继续。如果该`preVisitDirectory`方法返回`CONTINUE`，则该目录被访问。
* TERMINATE - 立即中止文件行走。在返回此值后，不再调用文件行走方法。
* SKIP_SUBTREE- 当`preVisitDirectory`返回此值时，将跳过指定的目录及其子目录。这个树枝是“修剪出来”的树。
* SKIP_SIBLINGS- 当`preVisitDirectory`返回此值时，指定的目录不被访问，`postVisitDirectory`不被调用，并且不再访问未访问的兄弟姐妹。如果从该`postVisitDirectory`方法返回，则不再访问进一步的兄弟姐妹。本质上，在指定的目录中没有任何进一步的发生。

在此代码片段中，将跳过任何名为SCCS的目录：
```java
public FileVisitResult
     preVisitDirectory(Path dir,
         BasicFileAttributes attrs) {
    (if (dir.getFileName().toString().equals("SCCS")) {
         return SKIP_SUBTREE;
    }
    return CONTINUE;
}
```

在这段代码片段中，只要找到一个特定的文件，文件名被打印到标准输出，文件行走终止：
```java
Path lookingFor = ...;

public FileVisitResult
    visitFile(Path file,
        BasicFileAttributes attr) {
    if (file.getFileName().equals(lookingFor)) {
        System.out.println("Located file: " + file);
        return TERMINATE;
    }
    return CONTINUE;
}
```
## 例子