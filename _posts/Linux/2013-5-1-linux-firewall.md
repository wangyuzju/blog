---
layout: default
title: Linux中的防火墙及iptables
category: Linux
---
买了linode的服务器半个多月了，开了各种服务，防火墙的规则也多多少少写了一些，但对
于iptables的原理和配置都是一知半解，通过[鸟哥的私房菜][00]来学习一下防火墙相关的配
置。
[00]: http://linux.vbird.org/linux_server/0250simple_firewall.php

#Linux系统上防火墙的类别
1. Netfilter(封包过滤机制)，比如iptables
2. TCP Wrapper(通过程序名称来实现控制)
3. Proxy

#TCP Wrappers
分析用户端想要连接的服务名称和IP，判断是否放行。其实就是通过`/etc/hosts.allow`和
`/etc/hosts.deny`这两个文档实现。所能管理的服务包括
1.super deamon(xinetd)所管理的服务(chkconfig --list显示出的服务)，
2.**支持libwrap.so模块**的服务。

#iptables相关

##iptabls至少有3个tables
1. filter 进出本机的封包(预设table), INPUT接收，OUTPUT发送，FORWARD转发（与nat table相关）
2. nat 管理防火墙内部其他电脑
3. mangle 特殊的封包路由有关

##查看当前iptables规则
1. `sudo iptables -L -n`，`-n`表示不将hostneme转换成ip地址，可以通过`-t nat`的方式来指定输出的tbale，默认是filter其输出格式如下，不是很详细，一些细节无法体现。

    target  prot opt source     destination
    动作    协议 说明 来源ip    输出ip         说明文档

2. `sudo iptables-save`显示的是配置文件中的信息，比较详细

##ip设定规则
+ `-s``-d`分别指定输入输出ip地址
+ ip/n换算：n表示多少位固定，一共是32, 24表示前24个都是1，最后8个为0，也就是255.255.255.0
+ ip/n前加上!表示取反，即不允许

##iptables配置流程
1. 清空所有配置：`iptabls -F``iptables -X``iptables -Z`三条指令一起执行
2. 定义预设policy：`iptables -P INPUT DROP`，允许输出：`iptables -P OUTPUT ACCEPT`
生成诸如`:INPUT DROP[0:0]``:FORWARD ACCEPT[0:0]`之类的policy
3. 设定规则：详见下面规则
4. 查看改动结果：`iptables-save`

##iptables配置规则
1. `iptables [-AI 鏈名] [-io 网卡] [-p 协议] [-s ip/n] [-d ip/n] -j [ACCEPT|DROP|REJECT|LOG]`
其中，A在最后插入，I在前面插入，-i输入介质(配合INPUT)，-o输出介质(配合OUTPUT)。
LOG表示符合该规则的封包信息会写入`/var/log/messages`档案中
2. 指定端口：在ip后面加上端口信息，如`[-s] [--sport xxxx]``[-d] [--dport oooo]`
因为仅有TCP和UDP封包具有端口，所以要同时设定好`[-p udp]`或`[-p tcp]`
3. 例子:`iptables -A INPUT -i eth0 -p tcp -s 192.168.1.0/24 --sport 1024:65534 --dport ssh -j DROP`只要來自 192.168.1.0/24 的 1024:65535 埠口的封包，且想要連線到本機的 ssh port 
就予以抵擋。

#利用iptabls来实现NAT服务器
iptables 指令能夠修改 IP 封包的表頭資料，連目標或來源的 IP 位址都可以修改！
甚至連 TCP 封包表頭的 port number 也能修改。详情参考[鸟哥文档][20]
[20]: http://linux.vbird.org/linux_server/0250simple_firewall.php#nat

