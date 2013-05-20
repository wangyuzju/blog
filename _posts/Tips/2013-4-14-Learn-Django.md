---
layout: default
title: 学习Django（一）
category: tips
---
#摘要
The Django Book前七章的学习笔记，以及实践中碰到的问题

#一些小技巧
##快速调试
`assert False`能出发Django的错误页面，可以查看局部变量核程序语句
##app和project
系统对app有一个约定： 如果你使用了Django的数据库层（模型），你 必须创建一个Django app
##应每次都给成功的POST请求做重定向
这就是web开发的最佳实践。
##views.py（视图）中不要硬编码URL
把URL逻辑放在了视图中并不优雅，因为URL的变更意味着需要对视图作出相应修该。
优雅的解决方法是，利用URLconf从顶向下的解析顺序这个特点，在URLconf中进行URL的处理

#Django中的MVC -- MTC
+ M 代表模型（Model），即数据存取层。 该层处理与数据相关的所有事务： 如何存取、如何验证有效性、包含哪些行为以及数据之间的关系等。
+ T 代表模板(Template)，即表现层。 该层处理与表现相关的决定： 如何在页面或其他类型文档中进行显示。
+ V 代表视图（View），即业务逻辑层。 该层包含存取模型及调取恰当模板的相关逻辑。 你可以把它看作模型与模板之间的桥梁。

#数据模型
##使用数据库API
1. 创建APP：`python manage.py startapp books`，创建app目录
2. 在models.py编写models层(数据存取层)，相当于创建数据库，`class Publisher(models.Model):`
实现models.Model的子类：Publisher。
3. 在project中启用该app，settings.py里面`'INSTALLED_APPS=()'`中加入`'books',`
4. `python manage.py validate`验证无错后，`python manage.py sqlall books`来生成实现
数据层的创建数据表的数据库语句。（Django会自动根据settings里面配置的数据库生成对应的语句）
5. `python manage.py syncdb`向数据库提交上述指令，创建数据表（它会根据 `INSTALLED_APPS` 
里设置的app来检查数据库， 如果表不存在，它就会创建它。 需要注意的是， syncdb 并不能将模型的
修改或删除同步到数据库；如果修改或删除了一个模型，并想把它提交到数据库，syncdb并不会做出任何处理。）
6  然后，就可以`from books.models import Publisher`引入Publisher模型，调用
`p1 = Publisher(key1=value1, key2=value2, ...)`之后，再调用`p1.save()`就可以将数据写入
数据库，`Publisher.objects`是数据库中和Publisher相关的数据集合的API，
`Publisher.objects.all()`获取全部对象（使用`Publisher.objects.create(...)`可以创建一条
记录并且立即更新到数据库中，而不必在调用save()）

Tips：

+ 实现models.Model类的 __unicode__():方法，可以打印更有意义的信息。（该方法定义了一个对象
的字符串表示）
+ 实现class Meta:`ordering = ['name']`属性设定默认的排序方式
+ 字段可选：blank=True,如` email = models.EmailField(blank=True)`

##数据查询API：objects
+ `all()`可以返回全部记录
+ `filter(key1=value1, key2=value2)`相当于条件查询，同时，
`key__contains='', icontains(大小写无关的LIKE),startswith和endswith, range`如其字面所述
+ `get()`获取单个对象，当存在多个结果或不存在结果时，就会抛出异常
+ `order_by()`进行排序，在value前加`-`号表示逆向，可直接链在filter()语句后面使用
+ 语句最后指定`[N]`可以限定查询返回条目
+ update(key=value)更新某一条记录，而设定get()返回的对象的属性后再save()会全部更新，不安全。
+ delete()删除

##数据管理后台 Admin
它读取Model中的元数据，然后提供一个强大而且可以使用的界面，网站管理者可以用它立即工作。

###contirb包
django.contrib是一套庞大的功能集，它是Django基本代码的组成部分，Django框架就是由众多包含附加组件(add-on)的基本代码构成的。
包括admin，auth，sessions，comments等功能

###开启Admin
1. 在settings.py中的`INSTALLED_APP`中加入`django.contirb.admin`，并确保
`auth,contenttypes,sessions`开启（admin所需），
2. 确保`MIDDLEWARE_CLASSS`包含`'django.middleware.common.CommonMiddleware'`，
`'django.contrib.sessions.middleware.SessionMiddleware'`和
`'django.contrib.auth.middleware.AuthenticationMiddleware'` 
3. 运行`python manage.py syncdb`生成数据表
4. 运行`python manage.py createsuperuser`创建管理员帐号
5. urls.py里面添加对/admin/路径的解析
6. 添加需要接续的Model：在app模块下创建`admin.py`，然后输入：`admin.site.register(Publisher)`
并引入相应的admin和Publisher.

#请求信息: GET, POST etc ...
##从request对象中获取数据
+ URL相关：`path`，`get_host`，`get_full_path`，`is_secure`
+ META（Dict类型）下面包含：`HTTP_REFERER`，`HTTP_USER_AGENT`，`REMOTE_ADDR`，用try/except
或者get()语句来访问，避免key不存在的情况
+ GET（类Dict对象）
+ POST

#Django自带form系统
1. `from django import forms`
2. `class ContactForm(forms.Form):`实现该类，添加比如
`email = forms.EmailField(requied=False)`等表单字段
3. ContactForm()返回一个对象，可以提供不同形式的HTML，
ContactForm({'field1': 'value1', ...})返回的对象可以验证数据合法性，同时`f.cleaned_data`
会返回相应的Python类型数据
 
#碰到的问题
##指定绝对路径的模板路径
Django的`TEMPLATE_DIR`选项要求必须是绝对路径，因此，使用下述语句来获取绝对路径
`os.path.join(os.path.dirname(__file__), 'templates').replace('\\','/'),`，`__file__`
变量会被自动设置为代码所在的 Python 模块文件名，即当前文件路径名。
之前由于错误操作，在`TEMPLATE_LADERS`里面加入了空字符串选项，导致Django报错，排查了好久...

##使用jinja2模板
网上都说Django自带的模板弱爆了，于是尝试下推荐的jinja2模板。除了安装jinja2之外，需要实现
jinja2的Loader来使用Django自带的模板系统的API，[参考此文](http://exyr.org/2010/Jinja-in-Django/)
但是，它的`env = jinja2.Environment(loader=jinja2.FileSystemLoader(app_template_dirs))`
语句有问题，使用`app_template_dirs`并不包含`TEMPLATE_DIRS`中设定的路径，将这部分替换成
`settings.TEMPLATE_DIRS`并将脚本放在项目的根目录下面，然后设定`TEMPLATE_LOADERS`中注释
掉其他该选项，并加入`'jinja2_for_django.Loader',`就可以了。

##ManyToManyField的读写
[参考](https://docs.djangoproject.com/en/dev/topics/db/examples/many_to_many/)

在读写ManyToManyField类型的字段时，要把它当成一个Model来操作，比如`authors = models.ManyToManyField(Author)`
那么在写入的时候，要先save()好新建Model比如t1，然后t1.authors.add()插入，t1.authors.all()
读取，ti.author.creat()新建多个...详细参看链接

#urls.py书写总结
+ 使用其他文件内的配置来解析某些URL，**使用url函数**(据我估计应该是url函数将第一个前缀参数与
include提供的urls.py内的条目结合起来，进行判断...)
`url(r'^graphic/', include('graphic.urls'))`
+ 书写正则时，一定要加上`/$`,不然Django会将后面的任意内容都匹配到这个视图去，造成混乱，`/`
则是url结束的标志，比如使用`data/$`，由于Django会自动加上`/`因此访问data会自动被Django转换
成data/进行适配，访问`data/`或者`data`均可，而使用`data$`时，Django不会自动将data/转换成
data进行适配 ，也就是说此时只能通过data进行访问，data/是无法访问的。**建议使用data\/$**
的形式。

#csrftoken导致的POST请求403 forbidden
今天在测试时，发现ipad上的POST请求被403了，排查了以下原来是cookie中并没有csrftoken，那么
Django在什么情况下才会设置这个cookie呢？

1. 模板文件中使用了{\% csrf_token \%}时，Django发现token被渲染，于是通过CsrfViewMiddleware
下的process_response在浏览器中设置key为csrftoken的Cookie，
2. 处理GET请求时，使用`request.META["CSRF_COOKIE_USED"] = True`强制更新Cookie中的
csrftoken值

[参考链接](http://stackoverflow.com/questions/13412653/django-no-csrftoken-in-cookie)
