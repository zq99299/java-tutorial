# 日期时间设计原则
Date-Time API 是使用多种设计原则开发的。

## 明确 / Clear
API 中的方法定义明确，行为清晰明了。例如，使用 null 参数值调用 Date-Time 方法通常会触发 NullPointerException。

## 流式 / Fluent

Date-Time API 提供流式接口，使代码易于阅读。因为大多数方法不允许带有空值的参数并且不返回空值，
所以可以将方法调用链接在一起，并且可以快速理解结果代码。例如：

```java
LocalDate today = LocalDate.now();
LocalDate payday = today.with(TemporalAdjusters.lastDayOfMonth()).minusDays(2);
```

## 不可变 / Immutable

Date-Time API 中的大多数类都创建了不可变的对象，这意味着在创建对象之后，它不能被修改。
要改变 [不可变对象](../../essential/concurrency/immutable.md) 的值，必须将新对象构造为原始对象的修改副本。
这也意味着根据定义，Date-Time API 是线程安全的。这会影响大部分用于创建日期或时间对象的方法的 API 的前缀 of，from 或者 with，
而不是构造函数，并且没有 set 方法。例如：

```java
LocalDate dateOfBirth = LocalDate.of(2012, Month.MAY, 14);
LocalDate firstBirthday = dateOfBirth.plusYears(1);
```

## 扩展 / Extensible

只要有可能，Date-Time API 都是可扩展的。例如，您可以定义自己的时间调节器和查询，或者构建您自己的日历系统。
