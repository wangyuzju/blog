---
layout: default
title: Fedora 19 重装笔记 [update Fedora 20]
category: linux
tags: 
  fedora
---
# UPDATE
一年之后的今天2014/7/25，又有机会重装Fedora20，U盘启动的安装上碰到了不少问题：

1. 首先是官方的 liveuse-creator 已经**无效**了，做出来的启动盘没任何反映
2. 使用 UltralISO 制作U盘(文件->打开->启动->写入磁盘映像即可) [Fedora 20 详细安装过程（图文详解）包括U盘制造过程](http://www.myexception.cn/other/1622957.html)
3. 修改U盘下isolinux/syslinux 文件中的root=live:CDLABEL=Fedora-Live-Desktop-x86_64-20-1 为U盘的名字，例如**FEDORA-20-2**，不然在安装的过程中，会找不到启动盘
4. 记得进入Windous删除一个分区用来安装Linux, 磁盘管理 [Win8如何创建、删除或格式化硬盘分区](http://product.pconline.com.cn/itbk/software/win8/1211/3059944.html)

## 无法输入中文
1. Fedora18之后需要在控制面板里面去设置输入法。以前的im-chooser不能正常使用了。否则会出现：“GDBus.Error...”
2. 设置里面点“区域＆语言／Region&Language”
3. 在“输入源／Input Sources“中点添加按钮，添加你想要输入法，应该就能输入中文了。

## ssh 代理
`ssh -qTfnN -D 7070 wy@hellofe.com` 在7070端口，参数详细解释：

+ f: 在开始执行前进行后台运行，便于输入密码等
+ n: 重定向stdin到/dev/null，当后台运行时必须要加上该参数
+ N: 不执行远程命令，当仅仅用于端口转发时非常有用
+ T: 禁止伪tty的分配
+ q: 静默模式，忽略掉大部分警告和诊断信息

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
###使用官方的RPM进行安装
使用rpm-fusion安装报错，发现原来直接用[官方的RPM包](https://www.virtualbox.org/wiki/Linux_Downloads)安装好简单

+ rpm -ivh 发现报错`Recompiling VirtualBox kernel modules                      [FAILED]`
+ 查了[这个帖子](http://forums.fedoraforum.org/archive/index.php/t-237427.html)，装了下kernel-devel
+ 再执行`sudo /etc/init.d/vboxdrv setup`就可以了，so easy

+ <del>下载rpm fusion的源，以支持yum安装[下载链接](http://rpmfusion.org/Configuration)</del>
+ <del>安装好VirtualBox之后，需要装一下当前内核版本对应的`kmod-VirtualBox-xxx`，具体查看运行报错信息即可</del>

**PS**: 装好之后发现无法上网，查看了下设备管理器发现VMvare的网卡前显示黄色叹号，右键 > 更新驱动 > 手动选择另外一个驱动就好了，是YLMF OS自带的驱动包覆盖了Vmware的默认驱动导致无法上网。[参考](http://blog.csdn.net/evilcode/article/details/7645479)


#装系统注意事项
今天换了ssd，重做了下系统，结果发现无法挂载原先的fedora分区，后来发现是因为两次都使用了LVM分区，而默认的组都是fedora导致无法挂载（当前系统的自动挂载占用了fedora分组），只好**重装系统换了一个分区格式**，不再使用LVM了。
