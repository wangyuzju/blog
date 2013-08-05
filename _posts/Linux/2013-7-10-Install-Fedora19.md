---
layout: default
title: Fedora 19 重装笔记
category: linux
tags: 
  fedora
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
<pre><code>
    [google-chrome]  
    name=google-chrome - 64-bit  
    baseurl=http://dl.google.com/linux/chrome/rpm/stable/x86_64  
    enabled=1  
    gpgcheck=1  
    gpgkey=https://dl-ssl.google.com/linux/linux_signing_key.pub  
</code></pre>
2. `sudo yum install google-chrome-stable/beta/unstable`安装对应的版本

##安装Idea
Oracle JDK下载链接居然被墙了，尼玛，vpn连上去下载也不稳定，只要使用linode下好文件之后，再scp到本地，万恶的qiang，`rpm -Uvh jdk-xxx.rpm`安装好就行。

**PS**：安装完后运行IDEA提示JAVA\_HOME变量未设置，在/etc/profile文件中加入JVM的路径即可，Oracle JDK对应的目录为`/usr/java/jdk1.7.0_25`
    
    #Oracle JDK for IDEA
    JAVA_HOME="/usr/java/jdk1.7.0_25"
    export JAVA_HOME

##安装VirtualBox
+ 下载rpm fusion的源，以支持yum安装[下载链接](http://rpmfusion.org/Configuration)
+ 安装好VirtualBox之后，需要装一下当前内核版本对应的`kmod-VirtualBox-xxx`，具体查看运行报错信息即可

**PS**: 装好之后发现无法上网，查看了下设备管理器发现VMvare的网卡前显示黄色叹号，右键 > 更新驱动 > 手动选择另外一个驱动就好了，是YLMF OS自带的驱动包覆盖了Vmware的默认驱动导致无法上网。[参考](http://blog.csdn.net/evilcode/article/details/7645479)

#装系统注意事项
今天换了ssd，重做了下系统，结果发现无法挂载原先的fedora分区，后来发现是因为两次都使用了LVM分区，而默认的组都是fedora导致无法挂载（当前系统的自动挂载占用了fedora分组），只好**重装系统换了一个分区格式**，不再使用LVM了。
