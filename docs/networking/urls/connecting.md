# 连接到一个URL

成功创建URL对象后，可以调用URL对象的openConnection方法来获取URLConnection对象或其协议特定的子类之一，例如 java.net.HttpURLConnection

您可以使用此URLConnection对象来设置连接前可能需要的参数和常规请求属性。只有在URLConnection.connect调用该方法时才会启动到由URL表示的远程对象的连接。当你这样做时，你正在通过网络初始化Java程序和URL之间的通信链接。例如，以下代码打开到该站点的连接example.com：

```java
try {
            URL myURL = new URL("http://example.com/");
            URLConnection myURLConnection = myURL.openConnection();
            myURLConnection.connect();
        } catch (MalformedURLException e) {
            // new URL() failed
            // ...
        } catch (IOException e) {
            // openConnection() failed
            // ...
        }
```

URLConnection每次通过调用openConnection此URL的协议处理程序的方法创建一个新对象。

您并不总是需要显式调用该connect方法来启动连接。如果需要，取决于连接的操作（如getInputStream，getOutputStream等）将隐式执行连接。

既然已经成功地连接到您的URL，您可以使用URLConnection对象来执行诸如读取或写入连接之类的操作。下一节将向您展示如何操作。