# 问题 和 练习

## Questions

1. 以下代是否合法?

    ```java
    try {
        
    } finally {
        
    }
    ```
    答：合法的

2. 以下处理程序可以捕获什么异常类型

    ```
    catch (Exception e) {
         
    }
    ```
    答：几乎所有类型（除Error外）。但是这可能是一个糟糕的实现，因为你丢失了有关正在抛出的异常类型的有价值的信息。

3. 这段异常处理程序是否有问题？编译会出错吗？
    ```java
    try {
    
    } catch (Exception e) {
        
    } catch (ArithmeticException a) {
        
    }
    ```
    答：广泛来看是没有问题的，编译不会出错，
但是有一个问题，第二个捕获永远都不会执行，这是一个不好的代码。如果只是这样一断空代码的话，class编译后，这端代码将不会看到，也就是被编译的时候忽略了。

Add a readList method to ListOfNumbers.java. This method should read in int values from a file, print each value, and append them to the end of the vector. You should catch all appropriate errors. You will also need a text file containing numbers to read in.
Modify the following cat method so that it will compile.
public static void cat(File file) {
    RandomAccessFile input = null;
    String line = null;

    try {
        input = new RandomAccessFile(file, "r");
        while ((line = input.readLine()) != null) {
            System.out.println(line);
        }
        return;
    } finally {
        if (input != null) {
            input.close();
        }
    }
}