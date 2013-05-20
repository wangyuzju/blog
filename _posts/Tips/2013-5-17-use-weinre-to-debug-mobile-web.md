---
layout: default
title: 使用weinre来调试移动页面
category: tips
---
毕设要做的东西涉及到ipad上网页的开发，调试起来没有chrome控制台，咋办？**使用weinre！**

#weinre能做什么？
和之前android设备上调试移动网页类似，提供一个页面，类似chrome控制台，在上面的操作会对应到
ipad或者手机上的页面。

#使用weinre
[参考链接](https://www.ibm.com/developerworks/community/blogs/94e7fded-7162-445e-8ceb-97a2140866a9/entry/debugging_mobile_javascript_with_weinre?lang=en)
##安装
`sudo npm install weinre`

##使用
+ 开启服务，如果要跨设备调试，比如用ipad访问电脑上的文件，那么指定服务的ip，例如
`weinre ----boundHost 192.168.1.112`
+ 需要调试的页面上加入**javascript**:
`<script src="http://192.168.1.112:8080/target/target-script-min.js#anonymous"></script>`，
加载页面。
+ 浏览器中打开[http://192.168.1.112:8080/client/#anonymous](http://192.168.1.112:8080/client/#anonymous),
Targets选项表示当前被调试的页面，选中，进入Elements Tab
+ 好了，远程的chrome控制台出现了，移动设备也能完美Debug了
