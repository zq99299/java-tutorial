# 复制文件或目录

您可以使用该 [copy(Path, Path, CopyOption...)](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#copy-java.nio.file.Path-java.nio.file.Path-java.nio.file.CopyOption...-)方法复制文件或目录 。如果目标文件存在，复制将失败，除非指定了该`REPLACE_EXISTING`选项。

目录可以复制。但是，目录中的文件不会被复制，所以即使原始目录包含文件，新目录也是空的。

当复制符号链接时，链接的目标被复制。如果要复制链接本身，而不是链接的内容，请指定`NOFOLLOW_LINKS`或`REPLACE_EXISTING`选项。

此方法采用`varargs`参数。支持以下StandardCopyOption和LinkOption枚举：

* REPLACE_EXISTING
    
    即使目标文件已经存在也执行拷贝。如果目标是符号链接，则链接本身被复制（而不是链接的目标）。如果目标是非空目录，则副本将失败，抛出`FileAlreadyExistsException`异常。
* COPY_ATTRIBUTES 
    
    将与文件关联的文件属性复制到目标文件。支持的确切文件属性是文件系统和平台相关，但`last-modified-time`跨平台支持(该属性需要特别照顾，如下面的例子中有说道)，并被复制到目标文件。
* NOFOLLOW_LINKS
    
    表示不应遵循符号链接。如果要复制的文件是符号链接，则链接被复制（而不是链接的目标）。
    
    
如果您不熟悉enums，请参阅 枚举类型。

以下说明如何使用copy方法：
```java
import static java.nio.file.StandardCopyOption.*;
...
Files.copy(source, target, REPLACE_EXISTING);
```

除了文件复制之外，`Files`该类还定义了可用于在文件和流之间复制的方法。该[ copy(InputStream, Path, CopyOptions...)](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#copy-java.io.InputStream-java.nio.file.Path-java.nio.file.CopyOption...-)方法可用于将所有字节从输入流复制到文件。该 [copy(Path, OutputStream)](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#copy-java.nio.file.Path-java.io.OutputStream-)方法可用于将文件中的所有字节复制到输出流。

以下Copy示例使用`copy`和`Files.walkFileTree`方法来支持递归副本。有关详细信息，请参阅 **文件树** 章节。
```java
import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.nio.file.attribute.FileTime;
import java.util.EnumSet;

import static java.nio.file.FileVisitResult.CONTINUE;
import static java.nio.file.FileVisitResult.SKIP_SUBTREE;
import static java.nio.file.StandardCopyOption.COPY_ATTRIBUTES;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;


public class Copy{
    /**
     * Returns {@code true} if okay to overwrite a  file ("cp -i")
     * 当 prompt = true 的时候，如果目标文件又存在，就需要用户手动选择是否覆盖
     */
    static boolean okayToOverwrite(Path file) {
        String answer = System.console().readLine("overwrite %s (yes/no)? ", file);
        return (answer.equalsIgnoreCase("y") || answer.equalsIgnoreCase("yes"));
    }

    /**
     * 如果 prompt = true，则源文件复制到目标位置。
     * @param source   源文件
     * @param target   目标文件
     * @param prompt   是否提示用户，如果文件存在，是否覆盖
     * @param preserve 保持文件属性，且文件如果存在则覆盖
     */
    static void copyFile(Path source, Path target, boolean prompt, boolean preserve) {
        CopyOption[] options = (preserve) ?
                new CopyOption[]{COPY_ATTRIBUTES, REPLACE_EXISTING} : //   将属性复制到新文件。  替换现有的文件，如果它存在。
                new CopyOption[]{REPLACE_EXISTING};
        // 如果prompt=true，目标文件又存在,那么希望用户手动输入：该文件是否覆盖
        if (!prompt || Files.notExists(target) || okayToOverwrite(target)) {
            try {
                Files.copy(source, target, options);
            } catch (IOException x) {
                System.err.format("Unable to copy: %s: %s%n", source, x);
            }
        }
    }

    /**
     * {@code FileVisitor} ("cp -r") 递归拷贝文件树
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
         * 访问目录之前
         * @param dir
         * @param attrs
         * @return
         */
        @Override
        public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) {
            // before visiting entries in a directory we copy the directory
            // (okay if directory already exists).
            CopyOption[] options = (preserve) ?
                    new CopyOption[]{COPY_ATTRIBUTES} : new CopyOption[0];
            // 1. 在原目录中创建要访问的目录的相对路径
            // 2. 然后用目标目录链接相对路径。得到目标目录的地址
            Path newdir = target.resolve(source.relativize(dir));
            try {
                Files.copy(dir, newdir, options);
            } catch (FileAlreadyExistsException x) {
                // ignore
            } catch (IOException x) {
                System.err.format("Unable to create: %s: %s%n", newdir, x);
                return SKIP_SUBTREE; // 该目录子目录包括子文件则跳过
            }
            return CONTINUE; // 子目录包括子文件继续访问
        }

        /**
         * 访问目录之后
         * @param dir
         * @param exc
         * @return
         */
        @Override
        public FileVisitResult postVisitDirectory(Path dir, IOException exc) {
            // 目录复制完成后，如果选择了 保持属性，需要修复 最后修改时间。
            // 因为先copy目录，然后再copy文件，就在修改这个目录了。所以在访问目录完成之后，再把时间修复过来
            if (exc == null && preserve) {
                Path newdir = target.resolve(source.relativize(dir));
                try {
                    FileTime time = Files.getLastModifiedTime(dir);
                    Files.setLastModifiedTime(newdir, time);
                } catch (IOException x) {
                    System.err.format("Unable to copy all attributes to: %s: %s%n", newdir, x);
                }
            }
            return CONTINUE;
        }

        /**
         * 访问一个文件
         * @param file
         * @param attrs
         * @return
         */
        @Override
        public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {
            copyFile(file, target.resolve(source.relativize(file)),
                     prompt, preserve);
            return CONTINUE;
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
            return CONTINUE;
        }
    }

    /**
     * 如果参数不对，则打印错误信息，并退出系统
     */
    static void usage() {
        System.err.println("java Copy [-ip] source... target");
        System.err.println("java Copy -r [-ip] source-dir... target");
        System.exit(-1);
    }

    public static void main(String[] args) throws IOException {
        // 在这里 我们用ide运行，所以模拟了在控制台的输入
        // 但是 -i 选项（如果目标文件存在，提示用户是否需要覆盖） 就不能使用了，因为获取不到控制台流
        args = new String[]{"-rp", "E:\\edmweb\\file\\rcmd_data\\rcmd_1", "E:\\edmwebTest"};
        boolean recursive = false;
        boolean prompt = false;
        boolean preserve = false;

        // 处理可选操作参数
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
                    case 'r':  // 是否递归copy文件目录的所有后代
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

        // 去掉可选参数
        int remaining = args.length - argi;
        if (remaining < 2)
            usage();
        // 再减去最后的目标路径，得到1 - n 个源
        Path[] source = new Path[remaining - 1];
        int i = 0;
        while (remaining > 1) {
            source[i++] = Paths.get(args[argi++]);
            remaining--;
        }
        Path target = Paths.get(args[argi]);

        // 检查目标文件是否是一个目录
        boolean isDir = Files.isDirectory(target);

        // 复制源文件/目录 到目标目录
        for (i = 0; i < source.length; i++) {
            Path dest = (isDir) ? target.resolve(source[i].getFileName()) : target;
            // 是否递归copy该目录/文件的所有后代
            // 这里需要注意的是，由于使用了Files.walkFileTree 结合 FileVisitor 来实现。所以不管源是一个目录还是一个文件，
            // 框架已经处理好了，如果是文件就直接调用 visitFile 方法。如果是目录也会调用相应的方法
            // 所以这里是先判断是否需要递归。 这里编写代码流程感觉还是有一点不太完美。
            if (recursive) {
                // 设置处理链接文件的模式：copy 链接的内容而不是链接文件
                EnumSet<FileVisitOption> opts = EnumSet.of(FileVisitOption.FOLLOW_LINKS);
                // 自定义对文件目录中的目录或则文件设置操作
                TreeCopier tc = new TreeCopier(source[i], dest, prompt, preserve);
                Files.walkFileTree(source[i], opts, Integer.MAX_VALUE, tc);
            } else {
                // 如果不递归copy，那么就只能copy文件。
                if (Files.isDirectory(source[i])) {
                    System.err.format("%s: is a directory%n", source[i]);
                    continue;
                }
                copyFile(source[i], dest, prompt, preserve);
            }
        }
    }
}
```