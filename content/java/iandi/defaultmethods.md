# 默认方法

接口部分描述了一个例子，涉及发布行业标准接口的计算机控制汽车的制造商，该接口描述了可以调用哪些方法来操作汽车。如果这些计算机控制的汽车制造商为他们的汽车增加新的功能，如飞行？这些制造商将需要指定新的方法，使其他公司（如电子制导仪器制造商）能够将其软件适用于飞行汽车。这些汽车制造商将在哪里宣布这些与飞行有关的新方法？如果将它们添加到原始接口中，那么已经实现这些接口的程序员将不得不重写它们的实现。如果将它们作为静态方法添加，那么程序员会将它们视为效用方法，而不是作为必要的核心方法。

使用默认方法，可以将新功能添加到库的接口，并确保与为这些接口的旧版本编写的代码的二进制兼容性。

考虑下面的接口

```java
import java.time.*; 
 
public interface TimeClient {
    void setTime(int hour, int minute, int second);
    void setDate(int day, int month, int year);
    void setDateAndTime(int day, int month, int year,
                               int hour, int minute, int second);
    LocalDateTime getLocalDateTime();
}
```

实现类

```java
package defaultmethods;

import java.time.*;
import java.lang.*;
import java.util.*;

public class SimpleTimeClient implements TimeClient {
    
    private LocalDateTime dateAndTime;
    
    public SimpleTimeClient() {
        dateAndTime = LocalDateTime.now();
    }
    
    public void setTime(int hour, int minute, int second) {
        LocalDate currentDate = LocalDate.from(dateAndTime);
        LocalTime timeToSet = LocalTime.of(hour, minute, second);
        dateAndTime = LocalDateTime.of(currentDate, timeToSet);
    }
    
    public void setDate(int day, int month, int year) {
        LocalDate dateToSet = LocalDate.of(day, month, year);
        LocalTime currentTime = LocalTime.from(dateAndTime);
        dateAndTime = LocalDateTime.of(dateToSet, currentTime);
    }
    
    public void setDateAndTime(int day, int month, int year,
                               int hour, int minute, int second) {
        LocalDate dateToSet = LocalDate.of(day, month, year);
        LocalTime timeToSet = LocalTime.of(hour, minute, second); 
        dateAndTime = LocalDateTime.of(dateToSet, timeToSet);
    }
    
    public LocalDateTime getLocalDateTime() {
        return dateAndTime;
    }
    
    public String toString() {
        return dateAndTime.toString();
    }
    
    public static void main(String... args) {
        TimeClient myTimeClient = new SimpleTimeClient();
        System.out.println(myTimeClient.toString());
    }
}
```