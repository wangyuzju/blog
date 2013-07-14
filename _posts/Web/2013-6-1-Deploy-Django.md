---
layout: default
title: 部署Django
category: web
---
#<del>安装apache的mod_python模块</del>
由于默认的centos6源中没有mod\_python模块，因此需要安装RHEL EPEL Repo，方法如下

    wget http://dl.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
    wget http://rpms.famillecollet.com/enterprise/remi-release-6.rpm
    sudo rpm -Uvh remi-release-6*.rpm epel-release-6*.rpm

打开remi源

    sudo vim /etc/yum.repos.d/remi.repo

编辑`[remi]`项目下的enabled=0成为enabled=1，就可以通过yum install来安装mod\_python了，
参考[Installing RHEL EPEL Repo on Centos 5.x or 6.x](http://www.rackspace.com/knowledge_center/article/installing-rhel-epel-repo-on-centos-5x-or-6x)

**注意**：mod_python在Django1.5中已经被废弃使用，官方建议使用mod_wsgi


#使用mod_wsgi部署Django
安装好mod_wsgi，参看[django的文档](https://docs.djangoproject.com/en/1.5/howto/deployment/wsgi/modwsgi/),
注意这里**需要选择对应的版本的参考文档**，比如我的就是django 1.5。

##Apache配置

    <VirtualHost *.80>
    Alias /robots.txt /path/to/mysite.com/static/robots.txt
    Alias /favicon.ico /path/to/mysite.com/static/favicon.ico
    
    Alias /static/ /path/to/mysite.com/static/
    
    #因为使用了wsgi，所以直接针对整个根目录设置访问权限的方式无效了
    #需要分别设定静态文件目录的访问权限和Alias
    <Directory /path/to/mysite.com/static>
    Order deny,allow
    Allow from all
    </Directory>
    
    #申明使用mod_wsgi
    WSGIScriptAlias / /path/to/mysite.com/mysite/wsgi.py
    
    #开放mod_wsgi的权限
    <Directory /path/to/mysite.com/mysite>
    <Files wsgi.py>
    Order allow,deny
    Allow from all
    </Files>
    </Directory>
    <VirtualHost *.80>

注意这里，VirtualHost后面的参数`*.80`是由NameVirtualHost后的`*.80`所决定的，表示本机
任何介质上的80端口为虚拟主机。
Note that the argument to the `<VirtualHost>` 
directive must exactly match the argument to the NameVirtualHost directive.
也就是说VirtualHost之后跟的参数要和NameVirtualHost后设定的参数完全一样，也就是说不能有不同
的NameVirtualHost实体，
[参考](http://bec-systems.com/site/528/apache-and-how-to-correctly-use-namevirtualhost)

##Django配置
1. 设置了DEBUG=False之后，需要在ALLOWED_HOSTS=\[\]中添加主机名或者'\*',不然会报500错误且无法
被Apache捕捉
