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

**coffin居然也有这个问题**，尼码，用了`coffin.shortcuts.render_to_response`，所有的
调试信息都木有了！还是换回原先的`jinja2_django_loader`了，至少还能保留对app下模板查找
路径的信息

##解决csrf的限制来使用POST方法处理表单
关键是在生成的form中，加入`csrf_token`（由Django生成），因此，在调用生成表单页面的
`render_to_response('registration/signup.html', c)`方法时，传入包含`csrf_token`变量
的Context，其简单方法就是在原有的Context变量c的基础上，调用`c.update(csrf(request))`。
[官方文档](https://docs.djangoproject.com/en/dev/ref/contrib/csrf/)。

##坑爹的关键字参数
Django模型层查找数据库的API所采用的是关键字参数，即User.objects.get(username='wangyu')
这就意味者我将username用变量来替代是错误的，这个问题导致我数据库明明有字段了，却还是返回允许，
之后只好硬编码来解决了，非常丑陋
