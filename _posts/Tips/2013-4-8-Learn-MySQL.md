---
layout: default
title: 毕设中学习MySQL的一些笔记
category: Tips
---
#权限相关
[参考链接](http://blog.sina.com.cn/s/blog_59eadc100100j09g.html)
##创建帐号
格式为：GRANT 权限 ON 库名.表名 'user'@'连接的主机名' IDENTIFIED BY '密码'
###例子
`GRANT ALL ON *.* TO 'reader'@'localhost' IDENTIFIED BY '314428'`创建了一个对所有数据
库和数据表都有所有权限的账户reader，其密码是314428
###注意事项
+ 主机名用%表示任何，可用`192.168.0.%`限定局域网
+ 修改完权限以后一定要刷新服务`flush privileges`，或者重启服务。
+ MySQL里面的用户包含主机的信息，即一个用户要和其主机关联起来，比如要删除刚才创建的reader用户，
应使用`drop user reader@localhost`，直接`drop user reader`实际上是执行了`drop user reader@%`，
MySQL自动加上所有域的标识符%。

###ERROR 1045 (28000) 错误排查
我用`GRANT select, insert, update, delete on python.* TO 'reader'@'%' IDENTIFIED BY '314428';`
语句创建了一个reader@%的账户，也即能支持所有主机上的reader用户登录，但是在用`mysql -u reader -p`
连接时，却报`Access denied for user 'reader'@'localhost' (using password: YES)`错误。

后来网上找了下，说是加上 -h serverIP 就可以了，于是`mysql -u reader -p -h 192.168.1.112`，
果然可以！  
找了好久，终于找到原因：
>@删除那条 user 为 空、host 为 localhost 的记录。你新添加的记录被它匹配了，根本匹配不到。

>@MySQL检查客户端登录的主机名/用户名是有一定顺序的，优先匹配host，然后才匹配user。
匹配host时，又要求优先匹配确定性更大的host。比如，%.test.com 优先于 %.com，%.com 
优先于 %，不带通配符的host优先于带通配符的host。
[查看原文](https://home-laurence.rhcloud.com/blog/2012/10/mysql-error-1045-access-denied-2/)

在本例中，`mysql -u reader -p`是以reader@localhost的身份登录的，在MySQL的user表里面，又
存在localhost的匿名用户的记录，也就是说：localhost匹配到了一条记录后，就直接去匹配user，而
不会因为无法匹配到user再回过头来匹配主机为%的记录，这就导致了`mysql -u reader -p`**实际上是
以匿名的方式**来登录的,即等价于`mysql -p`，直接输入空密码就可以登录了。  
而`mysql -u reader -p -h 192.168.1.112`不会适配user表里面的localhost记录，转而选择了%
记录来验证，因此可以正常登录，因此`-h 127.0.0.1`同样会报错！

##查看当前权限
`show grants`查看当前用户权限，`show grants for dba@xxx`查看对应用户的权限

##撤销用户权限
`REVOKE ALL ON *.* from dba@localhost;`即将grant to变成revoke from



#查看用户
1. `use mysql`
2. `select * from user`

#删除用户
`DROP USER 用户名;`

#修改密码
`UPDATE USER SET PASSWORD=PASSWORD('000000') WHERE USER='xxx';`