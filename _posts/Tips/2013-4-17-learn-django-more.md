---
layout: default
title: 学习Django(二)
category: tips
---

#添加用户注册、登录、管理等功能
##数据表的建立
Django以App的目录名为前缀，然后用`_`连接每一个模型的小写形式，例如`easy_note`这个App里面
有名为`Note`的模型，Django就会建立名为`easy_note_note`的数据表，因此不要随意改变App的名字
##Django模板默认`<br>`无效
因为Django的模板系统在渲染的过程中，对html标签进行了转义，`<br>`实际上变成了`&ltbt&gt`，
但是在chrome的element面板中看到的是`<br>`，因为它自动将转义符号翻译回来了，而不是原始的
**HTML源代码**，这里禁用掉Django模板的自动转义就好：\{\{ var\|safe \}\}加上safe标记就行。

##Python中的异常
try except 语句用于异常的处理，[参考](http://www.cnblogs.com/rubylouvre/archive/2011/06/22/2086644.html)
`except <ErrorName> <AppendMessage>:`用于捕获指定的异常及该异常附带的信息，BaseException
包括了所有的异常。

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

##无限长度的字符串
一开始以为用的是`models.CharField(max_length=None)`，结果在syncdb的时候报错：
`easynote.note: "data": CharFields require a "max_length" attribute that is a positive integer.`
Google之网上有人说应该用TextField（[出处](https://code.djangoproject.com/ticket/14094)）

##后台重定向提示 XXX didn't return an HttpResponse object
在views.py中的处理函数中，最后必须要返回HttpResponse对象，`render_to_response`等函数会
返回HttpResponse对象，如果需要进行重定向，那么必须使用`return redirect('obj_url')`
