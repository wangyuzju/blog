---
layout: default
title: HTTP服务器(Apache, Lighttpd, nginx)浅析
category: linux
tags:
- Server
---

引言：骆老师说服务器看nginx就够了，代码精简，质量高，其他的Apache，Lighttpd都是浮云

# Apache篇

## 管理命令

+ `httpd -l` 查看加载了哪些模块
+ `httpd -V` 查看编译Apache时的配置(可以看到默认读取的配置文件的路径等)


# nginx 篇

## 安装过程
`configure`, `sudo make install`就能自动安装到`/usr/local/nginx`目录下面


##常用命令：
+ 直接 nginx 启动服务
+ `nginx -s stop|quit|reload|reopen` 分别执行相应操作
+ 发送HUP命令进行平滑重启 `kill -HUP `cat /usr/local/nginx/logs/nginx.pid`

## 基本理念
+ nginx的首要功能是一个反向代理，其次才是服务器，因此**更关注URLs**而不是文件。
+ nginx的配置是层级继承的形式，主要由三个嵌套的块构成：**HTTP-block**,**server-block**,**location block**,继承关系为http -> server -> location，还有两个特殊的location：**event-block**和设定http-block和event-block归属的**root**。需要配置的主要是前面的三个块。server-block对应Apache中的虚拟主机，location-block主要对应URI
+ 代理一切请求。过滤掉资源类型的请求，**只有当nginx无法处理请求的uri时，才将请求分发给后端程序来处理**。例如`location / {try_files $uri $uri/ /index.php;}`就能将静态文件的请求直接返回，然后再加上`/index.php`交给适配php的规则去处理。这里注意有`proxy_pass`和`fastcgi_pass`两种（暂时不知道是否和include过来的配置有关）。
    

## 配置示例
### 变量
+ `$schema`, 自动适配http或者https
+ `$requesr_uri`，请求的uri
### 语句
+ `try_files $uri =404;`, 当请求的uri不存在时，自动返回404，此时定义在后面的语句不会再被执行
+ `return 301 http://domain.com$request_uri;` 重写url
+ [完整例子](http://wiki.nginx.org/FullExample)

## 使用 Tips
+ 配置虚拟主机一直报 403， 原来为指向了自己的home目录，却没有开放home目录的711权限，只开放了home目录下www目录的755权限，没有x权限就导致nginx无法进入home目录，于是就报403了
+ 对于未匹配到的server_name, nginx默认会使用配置文件中的第一条 server {} 配置
+ nginx在选择location块来分发请求时，首先会检查严格定义的前缀，以适配到最长前缀的规则为准，然后再看这条规则是否满足其他的
正则匹配规则，如果有正则适配则采用适配到的正则规则，否则使用之前匹配到的前缀规则(When nginx selects a location block to serve a request it first checks location directives that specify prefixes, remembering location with the longest prefix, and then checks regular expressions. If there is a match with a regular expression, nginx picks this location or, otherwise, it picks the one remembered earlier.)

### 反向代理
+ `proxy_pass`, 可以指向一台机器或者一个集群(upstream).
+ 

    # 集群中的所有后台服务器的配置信息
    upstream tomcats { 
	 server 192.168.0.11:8080 weight=50; 
	 server 192.168.0.11:8081 weight=50; 
    } 

## 参考链接
+ [入门指南](http://wiki.nginx.org/GettingStarted)
+ [调试nginx](http://wiki.nginx.org/NginxDebugging)
+ [设置nginx](http://wiki.nginx.org/Configuration)
+ [如何正确配置nginx](http://huoding.com/2013/10/23/290), [理解nginx配置模型](http://blog.martinfjordvald.com/2012/08/understanding-the-nginx-configuration-inheritance-model/)
,[nginx configuration primer](http://blog.martinfjordvald.com/2010/07/nginx-primer/)


# Linux 管理相关

## 查看Linux发行版信息的方法
+ `uname -a` 查看是否有明确字眼
+ `cat /etc/issue` 例如CentOS
+ `lsb_release -a`命令，这个命令我试了一下在redhat和SUSE上好用，在aix和solaris上不能用
+ `cat /etc/*release*`

## 尽量不要设置服务器语言为中文
+ `locale -a`能列出所有支持的语系
+ `locale`查看当前语系设置
+ 尽量保留LANG和LC_ALL为"en_US.UTF-8/en_US.utf8"

## 查看开机自启动项
+ chkconfig 命令
+ `chkconfig --add/del xxx` 添加新的服务进入chkconfig列表
+ `chkconfig xxx on/off` 是否开机自启动
+ `chkconfig --list xxx` 只显示xxx的开机自启动状态

自启动项的0~6分别代表下述等级
+ 0:开机(请不要切换到此等级)
+ 1:单人使用者模式的文字界面
+ 2:多人使用者模式的文字界面,不具有网络档案系统(NFS)功能
+ 3:多人使用者模式的文字界面,具有网络档案系统(NFS)功能
+ 4:某些发行版的linux使用此等级进入x windows system
+ 5:某些发行版的linux使用此等级进入x windows system
+ 6:重新启动

# 查看某个进程的具体启动时间
使用 `ps -p PID -o lstart`,  其中，PID为某个进程的进程ID号。

    for pid in $(pgrep httpd); do 
        echo -n "${pid} " ; 
        ps -p ${pid} -o lstart | grep -v "START" ; 
    done



