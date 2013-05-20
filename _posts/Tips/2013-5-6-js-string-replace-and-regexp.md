---
layout: default
title: JS字符串的replace()方法与Date对象
category: tips
---
#replace()
JS在进行字符串的替换操作时，调用`replace(RegExp, arg2)`其中的arg2既可以是字符串，也可以是
一个构造函数，这个函数在正则表达式每适配到一次时，会自动传入相应的参数并调用产生替换字符串。
`fn(matcheStr, capture1, capture2, ..., offset, originStr)`,matchStr为适配正则表达式的字符串，
capture为在字符串中使用正则表达式的`(...)`所捕获的$1, $2, ...,offset为str在原始字符串中
的偏移量，originStr为原始字符串。

#创建指定日期的Date对象
    new Date('2013-5-6')
    new Date('2013, 5, 6')
    new Date(2013, 4, 6)
    //Mon May 06 2013 00:00:00 GMT+0800 (CST)
    new Date('2013-05-06')    
    new Date(Date.UTC(2013, 4, 6))
    //Mon May 06 2013 08:00:00 GMT+0800 (CST)
+ 传入表示日期的字符串参数，如`new Date('2013, 5, 6')`，JS会自动调用`Date.parse()`方法，
将其转换为毫秒数生成2013年5月6日0时0分0秒的时间对象
+ 传入表示日期的数字参数，如`new Date(2013, 4, 6)`，JS会使用`Date.UTC()`处理参数的方法来创建Date对象。
与上者的区别就是**月份基于0**,**小时数基于0**,因此这里用4不是用5！而其他分钟，秒等则以1为单位，
但是创建的日期是基于本地时间，而不是GMT时间。调用new Date(Date.UTC(2013, 4, 6))生成的是
GMT时间与第一个相同。如下所示。


