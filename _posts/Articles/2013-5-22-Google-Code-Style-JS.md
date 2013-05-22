---
layout: default
title: Google Javascript 编码规范
category: articles
---
[原文地址](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)

#语法规则
##删除属性
使用`obj.x = null`,而不是`delete obj.x`
##this
只在constructors、methods、和closures中使用

#编码规范
##命名
+ 文件名用小写，避免不同平台大小写敏感度问题，推荐用`-`连接
+ 可选参数由`opt_`带头
+ 可变数量参数的函数，最后的参数应该命名为`var_args`，同时在@param中指出
+ 不要依赖window命名空间

#使用JSDoc来进行注释
##换行缩进4个空格
##JSDoc Tag Reference

    @fileoverview
    @author kuth@google.com (firstName lastName)
    {@code ...} 申明括号内的内容是代码
    @const / @const {type}
    @constructor //申明是构建函数
    @enum
