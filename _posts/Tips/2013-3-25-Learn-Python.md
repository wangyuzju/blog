---
layout: default
title: 毕设中学习Python的一些笔记
category: Tips
---
#UDP和TCP
[原理](http://hi.baidu.com/xmbihnvkgwbbfid/item/583e5da08ee81e14a9cfb7f7)
[Py实例](http://www.cnblogs.com/wdpp/archive/2010/10/27/2386873.html)

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
##以二进制的方式读取文件
    #coding: UTF-8
    fileData = open('./sample.dat', 'rb')
##读取文件的前4个字节   #将读取的4个字节转换为long
    data_id = struct.unpack("l", fileData.read(4))
    print data_id
#二进制文件的输出
在shell中，直接print二进制文件的string格式会导致乱码，先转换成hex的形式再输出就
好了。`print data.encode('hex_codec')``print repr(data)`则会输出原始字符串。它的
输出相当于VIM里面`:%!xxd`之后，中间列的hex值加上右边列的文字值，即有的时候会出现
x0fB@这样的值  
注：socket.recvfrom(1024)会返回(data,ip)格式的Tuple，其中data是字符串格式的，这
就是我二进制文件的string格式的由来

#ord 和 chr 和 repr
Python提供了ord{转换成ASCII}和chr{转换成字符串}两个内置的函数，用于字符与ASCII码
之间的转换。  
str()一般是将数值转成字符串，所以直接输出二进制的字符串表示是乱码  
repr()是将一个对象转成字符串显示，注意只是显示用，有些对象转成字符串没有直接的意
思。如list,dict使用str()是无效的，但使用repr可以，这是为了看它们都有哪些值，为了
显示之用。

#int转换为整数
`int(12.0) //12`，`int('12',16)//按16进制数转换成十进制数`

#python多线程编程
##使用thread模块
`thread.start_new(fn, (arg1,) [,kwargs=None])`需要注意的是`(data,)`是显示申明元组
类型，其第一个变量是data，与表达式`()`区分开来，否则Python无法知道是不是变量data
的值。  
线程的结束可以等待其自然结束，也可以调用`thread.exit()`/`thread.exit_thread()`来结束
也可以通过实现threading.Thread的子类来实现一个线程对象，[详见][60]
[60]: http://www.cnblogs.com/tqsummer/archive/2011/01/25/1944771.html

#使用xml.etree.ElementTree读写xml
##查找节点
`Element.getiterator``Element.getchildren``Element.find``Element.findall`

#python连接MySQL
使用MySQLdb来与数据库进行通信[API][80]MySQL建表操作[API][81][数据类型][82]
[80]: http://bbs.blueidea.com/thread-2813296-1-1.html
[81]: http://www.isstudy.com/mysql/436.html
[82]: http://blog.csdn.net/jiemushe1814/article/details/4716069

用到的awk指令
`awk -F '\t' '$3!="" {print FNR,$3,$4}' ato_f.lst > awk.lst`
用到的自动添加分类序号的方法:
    
    #!/bin/awk -f
    #运行前
    BEGIN {
        math = 0
        english = 0
        computer = 0
        current = "g"
    }
    #运行中
    {
        if( $1 == current ){
            math++
        }else{
            current = $1
            math = 0
        }
        printf "%s%d %s %s\n", $1,math, $2, $3
    }
    #运行后
    END {
    }

##含有自增字段插入时注意问题
SQL语句的写法应该把除了自增列外的其他对应数据列罗列出来，如下面的形式：
`INSERT INTO 表名(列名1,列名2,列名3......) VALUES(值1,值2,值3........)`
或者
`INSERT INTO 表名(列名1,列名2,列名3......) SELECT 值1,值2,值3........ FROM 表名`
如果用下面的形式（不带除了字增列外的其他对应数据列）进行插入：
`INSERT INTO 表名 VALUES(值1,值2,值3........)`
或者`INSERT INTO 表名 SELECT 值1,值2,值3........ FROM 表名`
，就会出现提示的错误：**Column count doesn't match value count at row 1**


