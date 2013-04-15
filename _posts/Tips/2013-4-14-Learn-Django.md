---
layout: default
title: 学习Django
category: Tips
---

#一些小技巧
##快速调试
`assert False`能出发Django的错误页面，可以查看局部变量核程序语句

#碰到的问题
##指定绝对路径的模板路径
Django的TEMPLATE_DIR选项要求必须是绝对路径，因此，使用下述语句来获取绝对路径
`os.path.join(os.path.dirname(__file__), 'templates').replace('\\','/'),`，`__file__`
变量会被自动设置为代码所在的 Python 模块文件名，即当前文件路径名。
之前由于错误操作，在TEMPLATE_LADERS里面加入了空字符串选项，导致Django报错，排查了好久...

##使用jinja2模板
网上都说Django自带的模板弱爆了，于是尝试下推荐的jinja2模板。除了安装jinja2之外，需要实现
jinja2的Loader来使用Django自带的模板系统的API，[参考此文](http://exyr.org/2010/Jinja-in-Django/)
但是，它的`env = jinja2.Environment(loader=jinja2.FileSystemLoader(app_template_dirs))`
语句有问题，使用`app_template_dirs`并不包含`TEMPLATE_DIRS`中设定的路径，将这部分替换成
`settings.TEMPLATE_DIRS`并将脚本放在项目的根目录下面，然后设定`TEMPLATE_LOADERS`中注释
掉其他该选项，并加入`'jinja2_for_django.Loader',`就可以了。

