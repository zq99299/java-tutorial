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

您可以指定接口中的方法定义是default在方法签名开始处的关键字的默认方法。接口中的所有方法声明（包括默认方法）都是隐式的public，所以可以省略public修饰符。

使用这个接口，你不需要修改这个类SimpleTimeClient，这个类（以及任何实现这个接口的类TimeClient）将会拥有getZonedDateTime已经定义好的方法。以下示例从以下实例 TestSimpleTimeClient调用方法：getZonedDateTimeSimpleTimeClient

```java
package defaultmethods;
 
import java.time.*;
import java.lang.*;
import java.util.*;

public class TestSimpleTimeClient {
    public static void main(String... args) {
        TimeClient myTimeClient = new SimpleTimeClient();
        System.out.println("Current time: " + myTimeClient.toString());
        System.out.println("Time in California: " +
            myTimeClient.getZonedDateTime("Blah blah").toString());
    }
}
```

## 继承包含默认方法的接口

继承包含默认方法的接口时，可以执行以下操作：

* 根本不提及默认的方法，这可以让你的扩展接口继承默认的方法。
* 重新声明默认的方法，这使得它abstract。
* 重新定义覆盖它的默认方法。

假设你扩展接口TimeClient如下：

```java
public interface AnotherTimeClient extends TimeClient { }
```

任何实现TimeClient接口的类，都将具有由默认方法的实现

假设你扩展接口TimeClient如下：

```java
public interface AbstractZoneTimeClient extends TimeClient {
    public ZonedDateTime getZonedDateTime(String zoneString);
}
```

任何实现这个接口的类AbstractZoneTimeClient都必须实现这个方法getZonedDateTime; 此方法abstract与接口中的所有其他非默认（和非静态）方法一样。

假设你扩展接口TimeClient如下：

```java
public interface HandleInvalidTimeZoneClient extends TimeClient {
    default public ZonedDateTime getZonedDateTime(String zoneString) {
        try {
            return ZonedDateTime.of(getLocalDateTime(),ZoneId.of(zoneString)); 
        } catch (DateTimeException e) {
            System.err.println("Invalid zone ID: " + zoneString +
                "; using the default time zone instead.");
            return ZonedDateTime.of(getLocalDateTime(),ZoneId.systemDefault());
        }
    }
}
```

任何实现该接口的类HandleInvalidTimeZoneClient将使用getZonedDateTime由此接口指定的实现，而不是由接口TimeClient。指定的实现


## 静态方法

除了默认方法之外，您还可以在接口中定义 静态方法。（静态方法是一个与定义它的类相关联的方法，而不是与任何对象相关联的类的每个实例共享其静态方法）这使得您可以更轻松地在库中组织帮助器方法; 您可以在同一个接口中保留特定于接口的静态方法，而不是在单独的类中。以下示例定义了一个静态方法，用于检索ZoneId与时区标识符对应的 对象; 如果没有ZoneId对应于给定标识符的对象，则使用系统默认时区。（因此，您可以简化该方法getZonedDateTime）：


```java
public interface TimeClient {
    // ...
    static public ZoneId getZoneId (String zoneString) {
        try {
            return ZoneId.of(zoneString);
        } catch (DateTimeException e) {
            System.err.println("Invalid time zone: " + zoneString +
                "; using default time zone instead.");
            return ZoneId.systemDefault();
        }
    }

    default public ZonedDateTime getZonedDateTime(String zoneString) {
        return ZonedDateTime.of(getLocalDateTime(), getZoneId(zoneString));
    }    
}
```

与类中的静态方法类似，您可以指定接口中的方法定义是一个静态方法static，在方法签名的开始处具有关键字。包含静态方法的接口中的所有方法声明都是隐式的public，所以可以省略public修饰符。

## 将默认方法集成到现有的库中


默认方法使您能够为现有接口添加新功能，并确保与为这些接口的旧版本编写的代码保持二进制兼容性。特别是，使用默认方法可以将接受lambda表达式的方法添加为现有接口的参数。本节演示如何 Comparator使用默认和静态方法增强接口。

