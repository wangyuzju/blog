---
layout: default
title: ngnix 使用 php-fpm 来运行php
category: Web
tags: ngnix
---
参考教程 [Install LEMP Server (Nginx, MariaDB, PHP) On CentOS 7](http://www.unixmen.com/install-lemp-server-nginx-mariadb-php-centos-7/)

## 要点
+ /etc/php.ini 软链到了 /usr/local/php5/etc/php.ini 而实际上 php5的目录不存在，是`/usr/local/php/etc/php.ini`，删掉原来的软链再 cp 。直接 cp 会报`not writing through dangling symlink`错误。
+ 默认的PHP-FPM 运行在9000端口，配置文件位于 `/etc/php-fpm.d/www.conf`，需要将文件中的 user 和 group 设置成 ngnix 中使用的 user/group。
+ 使用 unix socket 能提高通信性能，在 fpm 配置文件中设置 `listen = /var/run/php-fpm/php5-fpm.sock`，对应的 nginx 配置文件中设置 `fastcgi_pass   unix:/var/run/php-fpm/php5-fpm.sock;` 后`systemctl restart php-fpm`重启 php-fpm 和 ngnix 服务。

## unix socket
UNIX Domain Socket是在socket架构上发展起来的用于**同一台主机**的进程间通讯（IPC），它**不需要经过网络协议栈，不需要打包拆包、计算校验和、维护序号和应答等**，只是将应用层数据从一个进程**拷贝**到另一个进程。

UNIX Domain Socket有SOCK_DGRAM或SOCK_STREAM两种工作模式，类似于UDP和TCP，但是面向消息的UNIX Domain Socket也是可靠的，**消息既不会丢失也不会顺序错乱**。

参考资料：
[Linux下的IPC－UNIX Domain Socket](http://blog.csdn.net/guxch/article/details/7041052)
[Performance of unix sockets vs TCP ports](http://unix.stackexchange.com/questions/91774/performance-of-unix-sockets-vs-tcp-ports)
