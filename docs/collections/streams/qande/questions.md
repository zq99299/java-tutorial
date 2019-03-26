# 问题与练习

## 问题

1. 一系列的聚合操作被称为＿＿。

    答：管道
2. 每个管道包含零个或多个＿＿操作。

    答：中间
3. 每个管道以＿＿操作结束。

    答：终端
4. 什么样的操作产生另一个流作为其输出？

    答：中间
5. 描述 forEach 集合操作与增强 for 语句或迭代器的不同之处 。

    答：The forEach aggregate operation lets the system decide "how" the iteration takes place. Using aggregate operations lets you focus on "what" instead of "how."

    这一段没有看明白
6. True 或 False：一个流类似于一个集合，因为它是一个存储元素的数据结构。

    答：false；与集合不同，流不是数据结构。它通过流水线从一个来源传送值。
7. 识别此代码中的中间和终端操作：
    ```java
    double average = roster
        .stream()
        .filter(p -> p.getGender() == Person.Sex.MALE)
        .mapToInt(Person::getAge)
        .average()
        .getAsDouble();
    ```
    答：中间操作有：filter，mapToInt，
    终端：average
    终端操作 average 返回一个 OptionalDouble。然后在该返回的对象上调用 getAsDouble 方法.有关操作是中间还是终端的信息，查阅 API 规范总是一个好主意 。
8. `p -> p.getGender() == Person.Sex.MALE` 是一个什么样的例子

    答：lambda 表达式
9. `Person::getAge` 是一个什么样的例子

    答：lambda 表达式-方法引用
10. 结合流内容并返回一个值的终端操作被称为什么？

    答：Reduction 操作
11. Stream.reduce 方法和 Stream.collect 方法之间的一个重要区别。

    答：Stream.reduce处理元素时总是创建一个新的值。 Stream.collect 修改（或改变）现有值。
12. 如果你想处理一个名称流，提取男性名字，并将它们存储在一个新的 List，将是 Stream.reduce 或 Stream.collect 最合适的操作使用？

    答： collect
    例子
    ```java
    List<String> namesOfMaleMembersCollect = roster
    .stream()
    .filter(p -> p.getGender() == Person.Sex.MALE)
    .map(p -> p.getName())
    .collect(Collectors.toList());
    ```
13. 对或错：聚合操作可以实现非线程安全集合的并行性。

    答：没错，只要你在操作时不要修改（改变）底层集合。
14. 除非另有说明，流总是串行的。你如何要求并行处理一个流？

    答：通过调用 parallelStream() 而不是通过调用 stream() 获取并行流。

## 练习

1. 练习：使用 lambda 表达式将下面的 for 增强语句写为流水线。提示：使用 filter 中间操作和 forEach 终端操作。
    ```java
    for (Person p : roster) {
                if (p.getGender() == Person.Sex.MALE) {
                    System.out.println(p.getName());
                }
            }
    ```
    答：
    ```java
            roster.stream()
                    .filter(p -> p.getGender() == Person.Sex.MALE)
                    .forEach(p -> {
                        System.out.println(p.getName());
                    });
            roster.stream()
                    .filter(p -> p.getGender() == Person.Sex.MALE)
                    .map(p -> p.getName())
                    .forEach(name -> System.out.println(name));
    ```

2. 将以下代码转换为使用 lambda 表达式和聚合操作（而不是嵌套 for 循环）的新实现 。提示：请管道调用的 filter，sorted 和 collect 操作，按照这个顺序。

    ```java
        public List<Album> mockAlbums() {
            List<Album> albums = new ArrayList<>();
            // 模拟数据
            for (int i = 0; i < 5; i++) {
                ArrayList<Track> tracks = new ArrayList<>();
                albums.add(new Album("A" + i, tracks));
                for (int j = 0; j < 5; j++) {
                    tracks.add(new Track(j));
                }
            }
            Collections.shuffle(albums);

            return albums;
        }
            @Test
        public void fun16() {

            List<Album> albums = mockAlbums();
            // 题目
            List<Album> favs = new ArrayList<>();
            for (Album a : albums) {
                boolean hasFavorite = false;
                for (Track t : a.getTracks()) {
                    if (t.getRating() >= 4) {
                        hasFavorite = true;
                        break;
                    }
                }
                // 注意看这个循环，是 tracks里面只要有大于4的
                // 就把 a 加入到集合里面，不是加入track
                if (hasFavorite)
                    favs.add(a);
            }
            Collections.sort(favs, new Comparator<Album>() {
                public int compare(Album a1, Album a2) {
                    return a1.getName().compareTo(a2.getName());
                }
            });
            System.out.println("");
        }
    ```
    答：
    ```java
     @Test
    public void fun17() {
        List<Album> albums = mockAlbums();

        albums.stream()
                .filter(a -> a.getTracks().stream().anyMatch(t -> t.getRating() >= 4))
                .sorted(Comparator.comparing(Album::getName))
                .collect(Collectors.toList());
        System.out.println("");
    }
    ```

    在这里，我们使用了流操作来简化三个主要步骤 - 识别专辑中的任何曲目是否具有至少 4（anyMatch）的评分，
    排序以及与我们的标准相匹配的专辑集合 List。该 Comparator.comparing() 方法采用提取 Comparable 排序键的函数，并返回一个 Comparator 在该键上进行比较的函数。 
