# Lambda表达式-方法引用

您使用 lambda表达式创建匿名方法。然而，有时，lambda表达式只能调用现有方法。在这些情况下，通过名称来引用现有的方法往往更为清楚。方法参考使您能够做到这一点; 对于已经有名称的方法，它们是紧凑的，易于阅读的lambda表达式。

再次考虑Lambda表达式中Person讨论的 类 ：

```java
public class Person {
    public enum Sex {
        MALE, FEMALE
    }

    String name;
    LocalDate birthday;
    Sex gender;
    String emailAddress;
    int age;

    public Person(String name, LocalDate birthday, Sex gender, String emailAddress, int age) {
        this.name = name;
        this.birthday = birthday;
        this.gender = gender;
        this.emailAddress = emailAddress;
        this.age = age;
    }

    public int getAge() {
        return this.age;
    }

    @Override
    public String toString() {
        return "Persion{" +
                "name='" + name + '\'' +
                ", birthday=" + birthday +
                ", gender=" + gender +
                ", emailAddress='" + emailAddress + '\'' +
                ", age=" + age +
                '}';
    }

    public void printPerson() {
        System.out.println(this.toString());
    }

    public Sex getGender() {
        return gender;
    }

    public String getEmailAddress() {
        return emailAddress;
    }
    public LocalDate getBirthday() {
        return birthday;
    }
    public static int compareByAge(Person a, Person b) {
        return a.birthday.compareTo(b.birthday);
    }
}
```

假设您的社交网络应用程序的成员包含在一个数组中，并且您想按年龄排序数组。您可以使用以下代码

```java
    Person[] rosterAsArray = roster.toArray(new Person[roster.size()]);

    class PersonAgeComparator implements Comparator<Person> {
        public int compare(Person a, Person b) {
            return a.getBirthday().compareTo(b.getBirthday());
        }
    }
    Arrays.sort(rosterAsArray, new PersonAgeComparator());
```

此调用的方法签名sort如下：

```java
static <T> void sort(T[] a, Comparator<? super T> c)
```

请注意，该接口Comparator是一个功能接口。因此，您可以使用lambda表达式，而不是定义然后创建实现Comparator以下功能的类的新实例：

```java
Arrays.sort(rosterAsArray,
                    (Person a, Person b) -> {
                        return a.getBirthday().compareTo(b.getBirthday());
                    }
        );
```

然而，这种比较两个Person实例的出生日期的方法已经存在Person.compareByAge。您可以在lambda表达式的正文中调用此方法：

```java
Arrays.sort(rosterAsArray,
    (a, b) -> Person.compareByAge(a, b)
);
```
方法引用Person::compareByAge在语义上与lambda表达式相同`(a, b) -> Person.compareByAge(a, b)`。每个都有以下特点：

* 它的形参列表是`Comparator<Person>.compare`带来的`(Person, Person)`。(形参一样)
* 它的身体调用方法Person.compareByAge。

## 方法引用的方式

有以下四种方式


| 方式	| 例
|--------
| 引用静态方法	| ContainingClass::staticMethodName
| 引用特定对象的实例方法	| containingObject::instanceMethodName
| 引用特定类型的任意对象的实例方法	| ContainingType::methodName
| 引用构造函数	| ClassName::new

### 引用静态方法
方法引用`Person::compareByAge`是对静态方法的引用。

### 引用特定对象的实例方法

以下是对特定对象的实例方法的引用的示例：

```java
class ComparisonProvider {
    public int compareByName(Person a, Person b) {
        return a.getName().compareTo(b.getName());
    }
        
    public int compareByAge(Person a, Person b) {
        return a.getBirthday().compareTo(b.getBirthday());
    }
}
ComparisonProvider myComparisonProvider = new ComparisonProvider();
Arrays.sort(rosterAsArray, myComparisonProvider::compareByName);
```
不要奇怪，方法引用就是使用 "::" 来引用
方法引用`myComparisonProvider::compareByName` 调用`compareByName`作为myComparisonProvider对象一部分的方法
JRE推断方法类型参数，在这种情况下是(Person, Person)。

### 引用特定类型的任意对象的实例方法

以下是对特定类型的任意对象的实例方法的引用的示例：

```java
String[] stringArray = { "Barbara", "James", "Mary", "John",
    "Patricia", "Robert", "Michael", "Linda" };
Arrays.sort(stringArray, String::compareToIgnoreCase);

// 这里根据 定义的变量 stringArray 去推导目标类型，如果不符合后面传入的方法引用所对应的类型，将报错 
```

该方法参考等效lambda表达式`String::compareToIgnoreCase`将有正式的参数列表`(String a, String b)`，其中a和b是用于更好地描述这个例子中的任意名称。方法引用将调用该方法`a.compareToIgnoreCase(b)`。