---
layout: default
title: Python的参数
category: Tips
---

#位置参数 VS 关键字参数
+ 位置参数调用，参数的顺序确定了传入的值被赋给哪个参数
+ 关键字参数调用，指定参数的名字和传入的值来调用

下列调用方式等价

    #定义
    def sell(item, price, quantity):
        print "Selling %s unit(s) of %s at %s" % (quantity, item, price)
    
    sell('Socks', '$2.50', 6)
    sell(item='Socks', price='$2.50', quantity=6) #可以乱序
    sell(quantity=6, item='Socks', price='$2.50')
    ...
    sell('Socks', quantity=6, price='$2.50') #可以混合使用


#Python中的可变参数
+ *args参数运行时，捕获所有位置参数，组成Tuple
+ **kwargs运行时，捕获所有关键字参数，组成Dict

例子

    def foo(*args, **kwargs):
        print "Positional arguments are:"
        print args
        print "Keyword arguments are:"
        print kwargs
     
     >>> foo(1, 2, 3)   #全部被*args捕获
     Positional arguments are:
     (1, 2, 3)
     Keyword arguments are:
     {}
     >>> foo(1, 2, name='Adrian', framework='Django') #关键字参数被**kwargs捕获
     Positional arguments are:
     (1, 2)
     Keyword arguments are:
     {'framework': 'Django', 'name': 'Adrian'}

