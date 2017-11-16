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

假设你想为TimeClient接口添加新的功能，比如通过一个ZonedDateTime对象来指定一个时区的能力 （它就像一个 LocalDateTime对象，除了存储时区信息）：

```java
public interface TimeClient {
    void setTime(int hour, int minute, int second);
    void setDate(int day, int month, int year);
    void setDateAndTime(int day, int month, int year,
        int hour, int minute, int second);
    LocalDateTime getLocalDateTime();                           
    ZonedDateTime getZonedDateTime(String zoneString);
}
```

在对TimeClient接口进行修改之后，还需要修改类SimpleTimeClient并实现该方法getZonedDateTime。但是，不要getZonedDateTime像abstract以前的例子那样离开，而应该定义一个默认的实现。（请记住， 抽象方法是没有实现声明的方法。）

```java
package defaultmethods;
 
import java.time.*;

public interface TimeClient {
    void setTime(int hour, int minute, int second);
    void setDate(int day, int month, int year);
    void setDateAndTime(int day, int month, int year,
                               int hour, int minute, int second);
    LocalDateTime getLocalDateTime();
    
    static ZoneId getZoneId (String zoneString) {
        try {
            return ZoneId.of(zoneString);
        } catch (DateTimeException e) {
            System.err.println("Invalid time zone: " + zoneString +
                "; using default time zone instead.");
            return ZoneId.systemDefault();
        }
    }
        
    default ZonedDateTime getZonedDateTime(String zoneString) {
        return ZonedDateTime.of(getLocalDateTime(), getZoneId(zoneString));
    }
}
```