---
layout: default
title: 入职之后的一些软件配置
category: tips
---
#连接Baidu无线后准入程序安装
下载了相应程序发现缺少库文件无法运行，联系IT支持之后让技术人员ssh过来解决了问题，步骤如下

1. ldd bnac 显示缺少对应的动态库libcrypto.so.6
2. 使用find命令找到本机中不同版本的libcrypto.so动态库的位置，并做软链接即可。例子：`ln -s /usr/lib64/libcrypto.so.10 /lib64/libcrypto.so.6`
3. 再次运行bnac `./bnac -u username -p passwd`

#外网上内网
上公司内网需要VPN，一般是装Cisco的VPN客户端。Linux系统下碰到一些问题，安装客户端之后无法打开，得到回复的邮件是查看[这个页面](http://wiki.babel.baidu.com/twiki/bin/view/Com/BPIT/%E7%99%BE%E5%BA%A6VPN%E7%B3%BB%E7%BB%9F)，下载运行后发现报错`error while loading shared libraries: libpangox-1.0.so.0:`，网上找了个[解决方案](http://note.ninehills.info/cisco-vpn-in-opensuse.html)，在Fedora19下**需要安装pangox-compat程序**。

