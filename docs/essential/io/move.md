# 移动文件或目录

您可以使用该
[move(Path, Path, CopyOption...)](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#move-java.nio.file.Path-java.nio.file.Path-java.nio.file.CopyOption...-)
方法移动文件或目录 。如果目标文件存在，则该移动将失败，除非指定了该 `REPLACE_EXISTING` 选项。

空目录可以移动。如果目录不为空，则可以移动目录，而不移动该目录的内容。在 UNIX 系统上，移动同一分区中的目录通常包括重命名目录。
在这种情况下，即使目录包含文件，此方法仍然可行。

此方法采用 `varargs` 参数 - 支持以下 `StandardCopyOption` 枚举：

* **REPLACE_EXISTING** - 即使目标文件已经存在，也执行移动。如果目标是符号链接，则替换符号链接，但指向的内容不受影响。
* **ATOMIC_MOVE** - 作为原子文件操作执行移动。如果文件系统不支持原子移动，则抛出异常。使用 ATOMIC_MOVE 您可以将文件移动到目录中，并确保观看目录的任何进程访问完整的文件。

以下说明如何使用 move 方法：

```java
import static java.nio.file.StandardCopyOption.*;
...
Files.move(source, target, REPLACE_EXISTING);
```

该方法最常用于文件树递归机制
