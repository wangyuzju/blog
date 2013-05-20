---
layout: default
title: 毕设中学习Node.js的一些笔记
category: tips
---
#nodejs处理二进制文件
Node 有一个二进制缓冲实现 Buffer，这个伪类（pseudo-class）提供了一系列处理二进
制数据的 API，简化了那些需要处理二进制数据的任务。缓冲的长度由字节数据的长度决定，
而且可以随机的设置和获取缓冲内的字节数据。
注意：Buffer类有一个特殊的地方，缓冲内的字节数据所占用的内存不是分配在
JavaScrpIt VM 内存堆上的，也就是说这些对象不会被 JavaScript 的垃圾回收算法处理，
取而代之的是一个不会被修改的永久内存地址，这也避免了因缓冲内容的内存复制所造成的
CPU浪费。

+ 可以用一个 UTF-8 字符串创建缓冲，像这样：`var buf = new Buffer(‘Hello World!’);`
+ 也可以用指定编码的字符串创建缓冲：`var buf = new Buffer('8b76fde713ce', 'base64');`
+ 如果没有数据来初始化缓冲，可以用指定的容量大小来创建一个空缓冲：`var buf = new
Buffer(1024); // 创建一个 1024(Byte) 的缓冲`,此时缓冲的数据并没有被初始化成 0，而是随
机数据。
