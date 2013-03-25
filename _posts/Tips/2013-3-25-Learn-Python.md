---
layout: default
title: 毕设中学习Python的一些笔记
category: Tips
---
#struct 二进制处理相关
有的时候需要用python处理二进制数据，比如，存取文件，socket操作时.这时候，可以使用
python的struct模块来完成.可以用 struct来处理c语言中的结构体.
##pack(fmt, v1, v2 ... )
按照给定的格式(fmt)，把数据封装成字符串(实际上是类似于c结构体的字节流)
##unpack(fmt, string)
按照给定的格式(fmt)，返回解析出来的tuple
##calcsize(fmt)
计算给定的格式(fmt)占用多少字节的内存
##fmt的格式说明
[点击查看](http://www.cnblogs.com/gala/archive/2011/09/22/2184801.html)
#ord 和 chr
Python提供了ord{转换成ASCII}和chr{转换成字符串}两个内置的函数，用于字符与ASCII码
之间的转换。
#int转换为整数
`int(12.0) //12`，`int('12',16)//按16进制数转换成十进制数`
#使用xml.etree.ElementTree读写xml
##查找节点
`Element.getiterator``Element.getchildren``Element.find``Element.findall`
