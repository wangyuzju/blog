---
layout: default
title: 学习Django(二)
category: Tips
---

#添加用户注册、登录、管理等功能



#碰到的问题

##关于模板文件的加载顺序
模板文件会按照`TEMPLATE_LOADERS`里面注册的顺序调用加载器来加载，默认的
`'django.template.loaders.filesystem.Loader'`按照`TEMPLATE_DIRS`中注册的路径来查找文件，
`'django.template.loaders.app_directories.Loader'`则是自动的在各个app根下面的templates
目录里面查找。

##Mixing Django with Jinja2 without losing template debugging
[参考](http://www.mellowmorning.com/2010/08/24/mixing-django-with-jinja2-without-losing-template-debugging/)
这个还是用到了coffin，于是干脆直接用coffin算了，[参看这篇](http://blog.slashpoundbang.com/post/22886203363/using-jinja2-in-django-with-coffin-the-easy-way)

一开始还对比着原先的Loader来修改jinja2_django，结果发现是徒劳的，只好用coffin了，唉。。。