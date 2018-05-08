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