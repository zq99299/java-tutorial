# System的其他方法

本节介绍一些System前面部分中没有介绍的方法。

arrayCopy ： 方法有效地在数组之间复制数据。有关详细信息，请参阅 语言基础课程中的 [数组](http://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html)。

`currentTimeMillis`(单位毫秒)和 `nanoTime`(单位毫微妙)方法可用于一个应用程序的执行期间测量的时间间隔是有用的。要测量以毫秒为单位的时间间隔，请在间隔`currentTimeMillis`的开始和结束处调用两次，并减去从第二个值返回的第一个值。类似地，调用`nanoTime`两次测量以毫秒为单位的间隔

