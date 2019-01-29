# 时间查询/queries

 TemporalQuery可用于检索来自基于时间的对象的信息。
 
 ## 预定义的查询
 
  TemporalQueries类（注意复数）提供多个预定义的查询，包括当应用程序不能识别基于时间的对象的类型是有用的方法。与调节器一样，预定义的查询被定义为静态方法，并被设计为与 静态导入语句一起使用。
  
  [precision](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/TemporalQueries.html#precision--) 
  
```java
 // 精度查询，不过返回的是英文
        TemporalQuery<TemporalUnit> query = TemporalQueries.precision();
        System.out.printf("LocalDate precision is %s%n",
                          LocalDate.now().query(query));
        System.out.printf("LocalDateTime precision is %s%n",
                          LocalDateTime.now().query(query));
        System.out.printf("Year precision is %s%n",
                          Year.now().query(query));
        System.out.printf("YearMonth precision is %s%n",
                          YearMonth.now().query(query));
        System.out.printf("Instant precision is %s%n",
                          Instant.now().query(query));
```

输出

```java
LocalDate precision is Days
LocalDateTime precision is Nanos
Year precision is Years
YearMonth precision is Months
Instant precision is Nanos
```

## 自定义查询

下列程序：查询一个日子是否是家人重要的日子

```java
@Test
    public void fun29() {
        LocalDate date = LocalDate.now();
        // 不使用拉姆达表达式查询
        Boolean isFamilyVacation = date.query(new FamilyVacations());

        // 使用拉姆达表达式查询
        Boolean isFamilyBirthday = date.query(FamilyBirthdays::isFamilyBirthday);

        if (isFamilyVacation.booleanValue() || isFamilyBirthday.booleanValue())
            System.out.printf("%s 是一个重要的日子!%n", date);
        else
            System.out.printf("%s 不是一个重要的日子.%n", date);
    }
    
    // 该日子 去游乐园玩耍的日子
    public class FamilyVacations implements TemporalQuery<Boolean> {
        @Override
        public Boolean queryFrom(TemporalAccessor date) {
            int month = date.get(ChronoField.MONTH_OF_YEAR);
            int day = date.get(ChronoField.DAY_OF_MONTH);

            // Disneyland over Spring Break
            // 4月 3号 ~ 4月8号 （包括）
            if ((month == Month.APRIL.getValue()) && ((day >= 3) && (day <= 8)))
                return Boolean.TRUE;

            // Smith family reunion on Lake Saugatuck
            // 8月 8号~14号 （包括）
            if ((month == Month.AUGUST.getValue()) && ((day >= 8) && (day <= 14)))
                return Boolean.TRUE;

            return Boolean.FALSE;
        }
    }

    // 该日子 检查是否是家人的生日
    public static class FamilyBirthdays {
        // 只检查月和日
        public static Boolean isFamilyBirthday(TemporalAccessor date) {
            int month = date.get(ChronoField.MONTH_OF_YEAR);
            int day = date.get(ChronoField.DAY_OF_MONTH);

            // Angie's 的生日是4月3号
            if ((month == Month.APRIL.getValue()) && (day == 3))
                return Boolean.TRUE;

            // Sue's 的生日是6月18号
            if ((month == Month.JUNE.getValue()) && (day == 18))
                return Boolean.TRUE;

            // Joe's 的生日是5月29号
            if ((month == Month.MAY.getValue()) && (day == 29))
                return Boolean.TRUE;

            return Boolean.FALSE;
        }
    }
```
