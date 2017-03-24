# 扫描
`Scanner`对象可用于将格式化的输入分解为令牌，并根据其数据类型翻译各个令牌。

## 解析令牌输入
默认情况下，`Scanner`使用空格分隔标记。（空格标记包括空格，制表符和行终止符），有关完整列表，请参阅`Character.isWhitespace`，要知道`Scanner`是如何工作的，我们来看看 ScanXan一个读取单个单词 xanadu.txt并打印出来的程序：
```java
public class ScanXan {
    public static void main(String[] args) throws IOException {

        Scanner s = null;

        try {
            s = new Scanner(new BufferedReader(new FileReader("xanadu.txt")));

            while (s.hasNext()) {
                System.out.println(s.next());
            }
        } finally {
            if (s != null) {
                s.close();
            }
        }
    }
}
```
输出
```java
------------- xanadu.txt ------------------
I
n Xanadu did Kubla Khan
A stately pleasure-dome decree:
Where Alph, the sacred river, ran
Through caverns measureless to man
Down to a sunless sea.
中文

------------- 输出 ------------------
I
n
Xanadu
did
Kubla
Khan
...
```
