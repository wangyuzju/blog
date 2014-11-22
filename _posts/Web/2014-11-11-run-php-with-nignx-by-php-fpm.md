---
layout: default
title: ngnix 使用 php-fpm 来运行php
category: Web
tags: 
- ngnix
- lemp
---
参考教程 [Install LEMP Server (Nginx, MariaDB, PHP) On CentOS 7](http://www.unixmen.com/install-lemp-server-nginx-mariadb-php-centos-7/)

## 要点
+ /etc/php.ini 软链到了 /usr/local/php5/etc/php.ini 而实际上 php5的目录不存在，是`/usr/local/php/etc/php.ini`，删掉原来的软链再 cp 。直接 cp 会报`not writing through dangling symlink`错误。
+ 默认的PHP-FPM 运行在9000端口，配置文件位于 `/etc/php-fpm.d/www.conf`，**需要将文件中的 user 和 group 设置成 ngnix 中使用的 user/group**, 最好是文件所在目录的拥有者，在 centos 上尝试了 N 次一直都是**Primary script unknown**。
+ 使用 unix socket 能提高通信性能，在 fpm 配置文件中设置 `listen = /var/run/php-fpm/php5-fpm.sock`，对应的 nginx 配置文件中设置 `fastcgi_pass   unix:/var/run/php-fpm/php5-fpm.sock;` 后`systemctl restart php-fpm`重启 php-fpm 和 ngnix 服务。

## 正确设置 nginx 和 php-fpm 的 user group 属性
nginx 和 php-fpm 的 user 和 group 最好设置成文件所在目录的拥有者（比如 www），**两者必须一致**。否则，nginx 会报 403 错误，PHP-FPM 会报**Primary script unknown**（该错误也有可能是 fastcgi\_param SCRIPT\_FILENAME 没有错误导致的，因此调试了半天，而事实上是没有相应目录的访问权限导致的!!!!）。

## 不同版本的 PHP 对 require 的路径会做不同处理
我把 Conf 错误拼写成了 conf ，在 mac 上(PHP 5.5.14)会自动处理大小写关系，正常完成程序加载，而在 centos 上(未装 PHP 直接用的 php-fpm)会直接报错。


## 添加 `$_SERVER['PATH_INFO']` 环境变量
在Apache中, 当不加配置的时候, 对于PHP脚本, AcceptPathInfo是默认接受的, 会自动设置PATH_INFO。

但是 Nginx 默认的配置文件对 PHP 的支持是很基础的，会提示404，找不到文件出错（因为 ngnix 拦截了到 php 前的大量请求）。这对于一些**使用PATH_INFO来传递关键信息的PHP框架**来说(比如Kohana, Thinkphp), 简直是致命的. 百度音乐后端使用的 Dapper 框架也正是使用了 PATH\_INFO 来进行路由分发，导致出来的一直是默认的首页。

首先将 `location ~ .php$ {` 改成 `location ~ .php {`, 交给 php 来处理。然后是添加 PATH\_INFO 环节， 
有两种方法：

方法一，通过 PHP 的 fix\_pathinfo（将 `PATH_INFO=/index.php/helloworld` 修正为 `PATH_INFO=/helloworld`）来实现:

1. 打开 php.ini 中 `cgi.fix_pathinfo` 配置项， PHP 会根据 CGI 规范来检查 SCRIPT\_FILENAME 中哪些是访问脚本和 PATH\_INFO, 并进行相应设置。例如 `/index.php/helloworld` 的 PATH\_INFO 字段为 helloworld。
2. nginx 配置文件中添加 FASTCGI\_PARAM `fastcgi_param PATH_INFO $fastcgi_script_name;`

方法二，在 nginx 中使用正则匹配出 PATH\_INFO，直接设置`fastcgi_param PATH_INFO $var_path_info;`，此时，不再需要 PHP 来进行 pathinfo 的 FIX。详细参考此文 [Nginx(PHP/fastcgi)的PATH_INFO问题](http://www.jb51.net/article/28050.htm)，**在 Dapper 框架中，使用第二种更简洁**，具体配置如下：

```
location ~ {
    fastcgi_pass 127.0.0.1:9000;
    fastcgi_param SCRIPT_FILENAME $document_root/webroot/index.php$fastcgi_script_name;
    fastcgi_param PATH_INFO $fastcgi_script_name;
    include fastcgi_params;
}
```

## session 存储目录权限问题导致 phpMyAdmin 无法登录
1. 进入 phpMyAdmin 登录后，发现总是重定向回登录页面且带了个 token： `index.php?token=xxx`, 无法正常登录
2. 改用 HTTP 验证的方式能正常登录但是进去之后的操作都报 [error: Token mismatch](http://stackoverflow.com/questions/17602093/xampp-error-token-mismatch), 发现需要设置 session.save_path
3. 照着修改了`/etc/php.ini`之后发现 phpinfo() 输出的 session.save_path 还是`/var/lib/php/session`, **为何 php-fpm 并没有使 /etc/php.ini 中的该项配置生效** ？只好先 `chmod 777 -R /var/lib/php` 使得该目录具有可访问权限，果然解决了无法登录的问题
4. 随后发现使用php-fpm时会在`/etc/php-fpm.d/www.conf`文件里面复写部分 php.ini 中的配置，里面有一行 `php_value[session.save_path] = /var/lib/php/session`，因此 phpinfo()出来的并不是 `/etc/php.ini`中的配置。 [参考此文](http://www.howtoforge.com/forums/showthread.php?t=61127)
5. 此外还碰到了 mysql 允许 locahost 匿名登录导致本地的非 root 帐号无法登录的问题，[毕设的时候就碰到过](http://blog.hellofe.com/2013/04/08/Learn-MySQL.html)


## ngnix 配置
```
server {
    listen 8000;
    server_name localhost;

    root /Users/wy/www;
    index index.html index.htm index.php;
 
    location ~ \.php$ {
        # fastcgi_pass 127.0.0.1:9000;
        fastcgi_pass  unix:/var/run/php-fpm/php5-fpm.sock;
        fastcgi_index index.php;
        # 该处一定要是 $document_root$fastcgi_script_name，否则报
        # FastCGI sent in stderr: "Primary script unknown" 错误
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }                                                                                                      
}

```

## unix socket
UNIX Domain Socket是在socket架构上发展起来的用于**同一台主机**的进程间通讯（IPC），它**不需要经过网络协议栈，不需要打包拆包、计算校验和、维护序号和应答等**，只是将应用层数据从一个进程**拷贝**到另一个进程。

UNIX Domain Socket有SOCK_DGRAM或SOCK_STREAM两种工作模式，类似于UDP和TCP，但是面向消息的UNIX Domain Socket也是可靠的，**消息既不会丢失也不会顺序错乱**。

参考资料：
[Linux下的IPC－UNIX Domain Socket](http://blog.csdn.net/guxch/article/details/7041052)
[Performance of unix sockets vs TCP ports](http://unix.stackexchange.com/questions/91774/performance-of-unix-sockets-vs-tcp-ports)
