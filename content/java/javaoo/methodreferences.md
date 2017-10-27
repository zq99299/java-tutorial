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