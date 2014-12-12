---
layout: default
title: 前端自动化测试之selenium
category: fe
tags: 
---


## 术语解释

+ **selenium IDE**，firefox 下的一款插件，用于录制 test case， 用于回放自动测试
+ **[Selenium WebDriver](http://docs.seleniumhq.org/docs/03_webdriver.jsp)**，即 Selenium 2，使用专用 driver 直接调取浏览器 API 来进行测试
+ **Selenium RC**， 即 Selenium 1 （是一个http代理程序）。因为使用 JavaScript 来进行测试，因此需要本地起一个http代理来避免跨域问题
+ **[RemoteWebDriver]**, RemoteWebDriver 由 Server 和 Client 两部分组成
    + **[RemoteWebDriver Server](https://code.google.com/p/selenium/wiki/RemoteWebDriverServer)**, 是一个 Java 写的服务器，始终运行在需要跑测试代码的浏览器所在的机器上面。然后远程机器C1就可以通过 webDriver 协议访问这台机器S，并在这台机器S上运行C1的测试代码。可以通过命令行运行`java -jar selenium-server-standalone-{VERSION}.jar`启动 RemoteWebDriver Server 或者使用对应语言的 API 启动。
    + **[RemoteWebDriver Client](https://code.google.com/p/selenium/wiki/RemoteWebDriver)**, 启动测试的客户端程序。能分离进行测试的机器和运行测试代码的浏览器所在的机器，因此可以对当前操作系统不支持的浏览器进行测试。但是需要测试服务器上一直运行，测试服务器返回的文字结束符可能会有问题，会对测试造成一定的延迟。
+ **Selenium-Grid**,





## Links
+ [如何搭建一个类似于 BrowserStack 的跨浏览器测试平台？](http://www.zhihu.com/question/20495622/answer/21924976)
+ [Selenium-Grid工作方式](http://blog.csdn.net/five3/article/details/9428655)
+ [Selenium Documentation](http://docs.seleniumhq.org/docs/)
