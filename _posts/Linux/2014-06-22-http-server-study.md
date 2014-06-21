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

# PS

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



