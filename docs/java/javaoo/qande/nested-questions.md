# 问题与练习-嵌套类

## 问题

1. 以下程序没有编译。你需要做什么来使它编译？为什么？

	```java
	public class Problem {
		String s;
		static class Inner {
			void testMethod() {
			   s = "Set from Inner";
			}
		}
	}
	```
	答案：删除Inner的static声明。静态内部类不能访问外部类的实例字段
	
2. 使用Java API文档 [Box（在javax.swing程序包中）](https://docs.oracle.com/javase/8/docs/api/javax/swing/Box.html)帮助您回答以下问题。 	

	* 静态嵌套类Box定义什么？
		答案：Box.Filler
	
	* 什么内部类Box定义？
		答案：Box.AccessibleBox

	* Box内在类的超类是什么？
		答案：[java.awt.]Container.AccessibleAWTContainer
	
	* Box你可以从任何类中使用哪些嵌套类？
		答案：Box.Filler

	* 如何创建一个实例Box的Filler类？
		答案：new Box.Filler(minDimension, prefDimension, maxDimension)

## 练习

1. 获取文件 Class1.java。编译并运行Class1。什么是输出？
	```java
	public class Class1 {
	    protected InnerClass1 ic;
	
	    public Class1() {
			ic = new InnerClass1();
	    }
	
	    public void displayStrings() {
			System.out.println(ic.getString() + ".");
			System.out.println(ic.getAnotherString() + ".");
	    }
	
	    static public void main(String[] args) {
	        Class1 c1 = new Class1();
			c1.displayStrings();
	    }
	
	    protected class InnerClass1 {
			public String getString() {
			    return "InnerClass1: getString invoked";
			}
			
			public String getAnotherString() {
			    return "InnerClass1: getAnotherString invoked";
			}
	    }
	}
	```
	答案：
	```java
	InnerClass1: getString invoked.
	InnerClass1: getAnotherString invoked.
	```












