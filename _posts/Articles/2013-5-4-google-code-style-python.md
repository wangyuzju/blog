---
layout: default
title: Google的Python编码规范
category: articles
---
[原文链接](http://google-styleguide.googlecode.com/svn/trunk/pyguide.html)
#语言规则
##迭代对象的方法
    for key in adict: ...
    if key not in adict: ...
    if obj in alist: ...
    for line in afile: ...
    for k, v in dict.iteritems(): .

##异常
+ 用`raise MyException('Error message')`或者`raise MyException`来抛出异常
+ 模块和包要实现自己的异常(继承自Exception)`class Error(Exception):`，可以用pass传递给上级
+ 不要使用会捕获所有异常的`except:`语句，除非re-raising或者是代码的最外层（并打印错误信息）
except会捕获所有异常，包括拼写错误，Ctrl+C终止，sys.exit()调用等等各种并不想要捕获的异常
+ 捕获异常时，用`except Error as error`，而不是`except Error, error`，后者难以理解
+ try/except语句尽量简短
+ 用finally执行不管是否出错都要执行的语句，比如关闭文件等清除操作

#编码规则
##命名规则
+ `module_name``package_name``methond_name``function_name``global_var_name`
`instance_var_name``function_parameter_name``local_var_name`
+ `ClassName``ExceptionName`
+ `GLOBAL_CONSTONT_NAME`
+ 不要使用`-`，单个字母变量，双下划线首尾的变量


## 换行
碰到较长字符串时，使用括号('hello''world!')

换行对齐，使用下面两种方式，换行缩进需要4个空格

    # Aligned with opening delimiter
    foo = long_function_name(var_one, var_two,
                             var_three, var_four)
    
    # 4-space hanging indent; nothing on first line
    foo = long_function_name(
        var_one, var_two, var_three,
        var_four)

不要使用\\换行，URL和较长的import语句不要换行，允许超出

## 空行
顶层的定义之间空2行，内部的方法定义之间空1行

## 空格
+ 括号与元素间不要留空`spam(ham[1], {eggs: 2}, [])`
+ `: ,`前面不留空，不是在行尾则后面留1个空`print x, y`
+ 访问对象属性的`[]`与对象之间不留空`dict['key'] = list[index]`
+ 当以关键字参数的形式调用时，不要在=左右留空`complex(real, imag=0.0)`
+ 不添加多余的空格用于对齐，比如注释，dict的key和value

## 注释
+ 一个函数必须要有docstring，除非不是外部可见，很短或者很明显。docstring描述的是调用方法，
而不是该函数的实现方法。需要包含Args、Returns、Raises部分
+ class的docstring的Attributes属性需要列出其公有属性

##字符串
+ 用%操作符格式化字符串，除非简单的连接两个字符串，`x = '%s, %s!' % (foo, bar)`
+ 在循环内部不要使用+，+=操作符来连接字符串，因为string格式是固定的，每次操作都会重新生成
会导致循环时间二次方倍增长，将临时字符串**放入数组**中，最后`''.join(arr)`一下



## 其他tips
+ 非直接运行py文件，比如modules，不要添加`#!/usr/bin/python`
+ 尽量少使用`()`，返回语句，if语句等不要用`()`包裹
+ 没有父类的class，那么object是其父类，`class SampleClass(object):`,会继承object具有的
基本方法：`__new__`,`__init__`,`__getattribute__`,`__hash__`,`__repr__`,`__str__`等
+ 使用with语句来打开文件和socket，`with open("hello.txt") as hellp_fp:`
+ TODO后用()注明联系方式，如果是将来需要做的事情，注明时间或事件
+ 一行只import一个module，按照`standard library -> third-party -> application-specific`的顺序
+ 模块文件名都用小写

