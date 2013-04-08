---
layout: default
title: 开发chrome插件时学习PHP的一些笔记
category: Tips
---
#关于require()和include()
PHP执行require()和include()语句时，相当于在当前位置分隔代码，然后直接将文件的内容写入到当前
文件中。
>require()函数包含进来的内容被当成当前文件的一个组成部分,所以当包含进来的文件有语法错误或者
文件不存在的时候,当前文件的PHP脚本都不再执行. 
include()函数相当于指定这个文件的路径,当被包含的文件有错时,不会影响到本身的程序运行. 
include函数可以进行判断是否包含,而require则是不管任何情况都包含进来