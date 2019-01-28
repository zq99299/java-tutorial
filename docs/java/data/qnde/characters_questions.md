# 问题和练习

## 问题

1. 以下字符串生成器的初始容量是多少？

    ```java
    StringBuilder sb = new StringBuilder("Able was I ere I saw Elba.");
    ```
    答：初始字符串为24 + 默认容量大小16 = 42
2. 考虑下面的字符串:

    ```java
    String hannah = "Did Hannah see bees? Hannah did.";
    ```
    1. 表达式 hannah.length() 是多少
        
        答：32
    2. 方法调用hannah.chatAt(12)返回的值是多少
        
        答：e
    3. 写一个表达式来引用hannah中的b字母
        
        答：hannah.charAt(15)
    
3. 由以下表达式返回的字符串有多长？字符串是什么？

    ```java
    "Was it a car or a cat I saw?".substring(9, 12)
    ```
    
    答：3，char，不包含12所在索引的字符
4. 在下面的程序中ComputeResult， 每个编号行执行后的result值是多少？

    ```java
        public class ComputeResult {
        public static void main(String[] args) {
            String original = "software";
            StringBuilder result = new StringBuilder("hi");
            int index = original.indexOf('a');
    
    /*1*/   result.setCharAt(0, original.charAt(0));
    /*2*/   result.setCharAt(1, original.charAt(original.length()-1));
    /*3*/   result.insert(1, original.charAt(4));
    /*4*/   result.append(original.substring(1,4));
    /*5*/   result.insert(3, (original.substring(index, index+2) + " ")); 
    
            System.out.println(result);
        }
    }
    ```
    答：
    1. si
    2. se
    3. swe
    4. sweoft
    5. swear oft
## 练习题

1. 写出两种获取"Hi, mom."字符串的方法：
    
    ```java
    String hi = "Hi, ";
    String mom = "mom.";
    ```
    答： hi.concat(mom) 和 hi + mom.
2. 写一个程序，把你全名的单词首字母打印出来

    ```java
    public class ComputeInitials {
        public static void main(String[] args) {
            String myName = "Fred F. Flintstone";
            StringBuffer myInitials = new StringBuffer();
            int length = myName.length();
    
            for (int i = 0; i < length; i++) {
                if (Character.isUpperCase(myName.charAt(i))) {
                    myInitials.append(myName.charAt(i));
                }
            }
            System.out.println("My initials are: " + myInitials);
        }
    }
    ```
3. 给定两个字符串，只保留字母并且全部转换成小写，然后按照自然顺序排列后再比较两个字符串是否相同

    ```java
    public class Anagram {
    
        public static boolean areAnagrams(String string1,
                                          String string2) {
    
            // 只保留字母
            String workingCopy1 = removeJunk(string1);
            String workingCopy2 = removeJunk(string2);
    
            // 全部转换成小写
            workingCopy1 = workingCopy1.toLowerCase();
            workingCopy2 = workingCopy2.toLowerCase();
    
            // 排序
            workingCopy1 = sort(workingCopy1);
            workingCopy2 = sort(workingCopy2);
    
            
            return workingCopy1.equals(workingCopy2);
        }
        // 只保留字母
        protected static String removeJunk(String string) {
            int i, len = string.length();
            StringBuilder dest = new StringBuilder(len);
            char c;
    
            for (i = (len - 1); i >= 0; i--) {
                c = string.charAt(i);
                // 确定指定字符是否为字母。
                if (Character.isLetter(c)) {
                    dest.append(c);
                }
            }
    
            return dest.toString();
        }
    
        protected static String sort(String string) {
            char[] charArray = string.toCharArray();
    
            java.util.Arrays.sort(charArray);
    
            return new String(charArray);
        }
    
        public static void main(String[] args) {
            String string1 = "Cosmo and Laine:";
            String string2 = "Maid, clean soon!";
    
            System.out.println();
            System.out.println("Testing whether the following "
                                       + "strings are anagrams:");
            System.out.println("    String 1: " + string1);
            System.out.println("    String 2: " + string2);
            System.out.println();
    
            if (areAnagrams(string1, string2)) {
                System.out.println("They ARE anagrams!");
            } else {
                System.out.println("They are NOT anagrams!");
            }
            System.out.println();
        }
    }
    ```