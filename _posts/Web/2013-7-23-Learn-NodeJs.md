---
layout: default
title: NodeJS学习笔记
category: web
tags: 
  NodeJS
---

#console最大输出3层
今天打算实现一个nodejs的脚本，用于将项目中不再使用的图片清理出去，在用console.log查看输出结果的时候，发现深层的目录直接输出为[object]，开始还以为是递归程序出问题了，排查了下发现程序并没有出现问题。观察输出的格式终于得道了：当一个对象过深时，不再自动展开该对象内容，而是**直接输出对象的类型替代**


#fs.watch模块的坑
+ 如果是监视一个文件目录的话，默认并不递归，也就是只能监视一个目录下面的文件变动，子目录的变动不会有反映
+ 被监视的文件目录本身发生变化（比如重命名），也会触发rename事件，且返回的文件名始终是该目录名。目录内假如也有该名字的文件夹，重命名时也会触发rename事件，区别在于**父目录的rename只触发一次，即原始文件名，子目录的rename触发两次，原始文件名和新文件名**

#http.request的坑
+ 请求文件时，请带上绝对路径"/"，写好的程序一直报400，查看了apache的错误日志（/etc/httpd/logs/error_log）的最后几行，发现`Invalid URI in request POST index.php HTTP/1.1`，再对比前面的其他错误`Undefined index: to in /var/www/html/index.php`，猜测是不是index.php前面少了一个绝对路径符号/？这才想起来**HTTP协议里面报头请求的路径是绝对路径**，导致一直400报错。。。是浏览器自动将相对路径转换成绝对路径。
+ 当请求的服务器异常时（比如关闭），会抛出Error: connect ECONNREFUSED错误，并且提示Unhandled 'error' event，但是明明将http.request放在我的try catch代码段里面的，估计和js的try catch机制有关：如果子层没有抛出孙子层的异常，那么**无法直接在外层捕获孙子层的异常，**，这个问题其实是我的书写错误，http.request的异常处理应该注册在返回的对象的error事件中，参考stackoverflow[此文](http://stackoverflow.com/questions/8381198/catching-econnrefused-in-node-js-with-http-request)

#PHP webserver的坑
+ php处理上传文件，首先`_$FILES[]`变量里面根据上传文件的name值来作为文件的key，文件的内容存放在该key下的key为tmp\_name的路径中，即访问路径为`$_FILES["XXX"]["tmp_name"]`
+ selinux真是恶心的东西，重启之后发现存放上传文件的时候服务器报permission denied错误，但是明明之前试过是可以的，唯一的不同就是之前执行过关闭selinux的指令（好吧，我一直以为设置过不自动启动了的--!）``
