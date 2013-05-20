---
layout: default
title: 安装PPTP来翻墙
category: linux
---
今天让吴妞买了Linode的服务器，果然速度飞快。ssh过去操作基本上没有延迟。（PS：一开始给的IP死活
ssh不上去，发了个ticket换了两个ip终于可以了）

#什么是VPN？
VPN可以这样理解，Linux客户端使用一个虚拟网络设备ppp0（Windows客户端也可以理解成VPN虚拟网卡）
，连接到服务器的虚拟网络设备ppp0上，这样客户端就加入了服务器端ppp0所在的网络。localip就是可以
分配给服务器端ppp0的IP地址，remoteip则是将要分配给客户端ppp0（或者虚拟网卡）的。  

#安装流程
[详细参考](http://gnailuy.com/2011/07/04/centos-vps%E4%B8%8A%E6%90%AD%E5%BB%BApptp-vpn/)
[简易参考](http://www.360doc.com/content/12/0621/16/2660674_219650596.shtml)
##1 验证内核是否加载了MPPE模块
网上说：`modprobe ppp-compress-18 && echo MPPE is ok`显示MPPE ok即说明支持，但是实际输出
确是`FATAL: Module ppp_mppe not found.`，*难道是不支持？*找了下：

>Kernel version 2.6.15及以上版本内核内置了MPPE的支持，CentOS 5的kernel是2.6.18，
所以不需要再安装MPPE模块。CentOS 5自带的ppp-2.4.4-1.el5也支持MPPE。

检测PPP是否支持MPPE的方法：`strings '/usr/sbin/pppd' |grep -i mppe | wc --lines`输出
大于30就好，我的输出42,哈哈，OK的！

##2 安装软件
1. `yum install ppp`
2. `wget http://poptop.sourceforge.net/yum/stable/packages/pptpd-1.3.4-2.el6.i686.rpm`并安装
3. `yum install iptables`

##3 配置文件
###PPP配置文件
`/etc/ppp/options.pptpd`主要配置选项如下：

    name pptpd #服务名称
    refuse-pap #拒绝、接受的加密方式
    refuse-chap
    refuse-mschap
    require-mschap-v2
    require-mppe-128
    ms-dns 8.8.8.8 #指定VPN使用的DNS服务器 + + +
    ms-dns 8.8.4.4 #为Google Public DNS  + + +
    proxyarp
    lock
    nobsdcomp
    novj
    novjccomp
    nologfd

`/etc/ppp/chap-secrets`设定账户和密码，用明文存储VPN客户的用户名、服务名称、密码和IP地址范围，每行一个账户：

    username1    pptpd    passwd1    * #pptpd对应上述选项中设置的服务名称 + + +
    username2    pptpd    passwd2    * #最后一列限制客户端IP地址，星号表示没有限制。

###pptpd配置文件
`/etc/pptpd.conf`是PPTP的配置文件，主要选项如下：

    option /etc/ppp/options.pptpd
    logwtmp
    localip 192.168.0.1
    remoteip 192.168.0.207-217
    
+ option选项指定使用/etc/ppp/options.pptpd中的配置
+ logwtmp表示使用WTMP日志。
+ localip和remoteip所处的IP段可以随意些指定，但其范围内**不要包含实际网卡eth0**的IP地址。
一般情况下，使用上面配置文件中的配置就好使了，你需要做的只是把192.168.0.207-217这个IP区间
修改成你喜欢的192.168.0.a-b，其中1<a<b<255

##4 打开内核的IP转发功能
要使VPN服务器可以作为网络请求的中转代理，能够使客户端通过VPN访问Internet，还需要开启内核的IP转发功能。
编辑`/etc/sysctl.conf`配置文件，修改成`net.ipv4.ip_forward = 1`，然后执行`sysctl -p`
生效

##5 启动pptpd守护进程

##6 配置iptables放行和转发规则
###配置防火墙有三个目的
+ 设置默认丢弃规则，保护服务器的安全；
+ 放行我们允许的数据包，提供服务；
+ 通过配置nat表的POSTROUTING链，增加NAT使得VPN客户端可以通过服务器访问互联网

###跟PPTP VPN相关的服务
+ 允许GRE(Generic Route Encapsulation)协议，PPTP使用GRE协议封装PPP数据包，然后封装成IP报文
+ 放行1723端口的PPTP服务
+ 放行状态为RELATED,ESTABLISHED的入站数据包（正常提供服务的机器上防火墙应该都已经配置了这一项）
+ 放行VPN虚拟网络设备所在的192.168.0.0/24网段与服务器网卡eth0之间的数据包转发
+ 为从VPN网段192.168.0.0/24转往网卡eth0的出站数据包做NAT


##重启iptables服务
[Iptables error – Setting chains to policy ACCEPT: security raw nat mangle filter [FAILED]错误的解决办法]
(http://wangshangyou.com/linux/66.html)

#碰到的问题
感觉还[第二篇简介](http://www.360doc.com/content/12/0621/16/2660674_219650596.shtml)实用。

1. 连接失败，查看/var/log/message发现是：`MPPE required but peer negotiation failed`
之后连接就被终止了，原来是客户端连接的时候忘记勾选MPPE加密选项了
2. 连上去无法上网：

>增加
 /sbin/iptables -t nat -A POSTROUTING -o eth0 -s 192.168.9.0/24 -j MASQUERADE
 后，查看iptables nat表，iptables -L -t nat，没有条目出现。
 多试几次，有表项出现，就好了。[原文](http://www.ipacl.net/2012/01/pptp-vpn.html)
 
照着第二篇的教程，重新设置两了下iptables规则就好了，OK！能用VPN啦～
