---
layout: default
title: Fedora 19 重装笔记
category: linux
---

#开篇
今天入职，发了工作笔记本x230，据说可以用linux系统，于是果断Fedora 19撸起，安装的时候小郁闷，第一次装好之后想输入中文直接删除了d-bus服务，装了fcitx，结果发现不能用，只好重装fedora了（后来才发现只要在language里面设置一下就好了 --!，囧）

#安装完成后的操作
##安装yum的remove-leaves插件，删除残留依赖
1. `sudo yum install yum-plugin-remove-with-leaves.noarch`
2. 配置默认启用插件，编辑`/etc/yum/pluginconf.d/remove-with-leaves.conf`，去掉`remove_always=1`前面的注释即可

##删除用不到的软件
    sudo yum remove empathy
    sudo yum remove evolution
    
##安装chrome浏览器
1. 添加chrome的源 在`/etc/yum.repos.d/`目录下面创建`google-chrome.repo`文件并写入以下内容：

    [google-chrome]  
    name=google-chrome - 64-bit  
    baseurl=http://dl.google.com/linux/chrome/rpm/stable/x86_64  
    enabled=1  
    gpgcheck=1  
    gpgkey=https://dl-ssl.google.com/linux/linux_signing_key.pub  

2. `sudo yum install google-chrome-stable/beta/unstable`安装对应的版本

##
