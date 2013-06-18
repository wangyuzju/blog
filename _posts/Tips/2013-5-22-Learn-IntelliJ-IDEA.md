---
layout: default
title: 学习IntelliJ IDEA
category: tips
tags: 
- IDEA
---

#快捷键
##跳转
+ ctrl b跳到变量申明处
+ ctrl \[ | \]跳到相应的闭合处 


##显示
+ ctrl F12快速显示文档结构
+ ctrl shift i显示当前函数的定义
+ ctrl p显示详细参数
+ ctrl ~切换主题

##切换
+ alt left|right切换打开文件标签

##操作
+ ctrl alt T 包裹代码 ctrl shift del删除包裹
+ ctrl x 删除当前行
+ ctrl r查找替换 ctrl shift r全局查找替换
+ ctrl shift up | down 当前行上移下移
+ ctrl d复制上一行并插入
+ ctrl shift u切换大小写
+ ctrl F11添加/删除标签

##选中
+ ctrl shift \[ | \] 选中块代码，并跳转到闭合处


##注释
+ ctrl / 行内注释 ctrl shift / 多行注释

#配置记录
##soft wrap 设置换行显示
在用markdown写博文的时候，发现手动换行控制文本长度的方式是错误的--！，因为html会自动将换行符号解析成一个空格，所以在博文排版的时候，就会出现问题咯。而且手动控制换行在博文需要修改的时候，就会异常蛋疼，因为加了几个字就超出了。其实应该设置编辑器换行显示，而不是真正的在文件中进行换行。**查找[帮助文档](http://www.jetbrains.com/idea/webhelp/editor.html)**，发现应该设置soft wrap，就会在文本超出编辑器视窗时自动进行换行，设置show all soft wraps可以在有编辑器换行的地方都显示箭头以区分。

#使用注意事项
##设定tags格式错误导致无法生成静态文件 
(2013-6-18)在设定文章tags时，由于遗漏了标签名和分隔符`-`之间的空格，导致jeklly无法生成新的最新静态文件

