---
layout: default
title: 毕设中学习MySQL的一些笔记
category: tips
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

##查看用户
1. `use mysql`
2. `select * from user`

##删除用户
`DROP USER 用户名;`

##修改密码
`UPDATE USER SET PASSWORD=PASSWORD('000000') WHERE USER='xxx';`

#时间字段格式TIMESTAMP，DATETIME，INT
+ DATETIM和TIMESTAMP类型所占的存储空间不同，前者8个字节，后者4个字节，这样造成的后果是
两者能表示的时间范围不同。前者范围为1000-01-01 00:00:00 ~ 9999-12-31 23:59:59，后者范围
为1970-01-01 08:00:01到2038-01-19 11:14:07。所以可以看到TIMESTAMP支持的范围比DATATIME
要小,容易出现超出的情况.
+ 默认情况下，insert、update 数据时，TIMESTAMP列会自动以当前时间（CURRENT_TIMESTAMP）填充/更新。
+ TIMESTAMP比较受时区timezone的影响以及MYSQL版本和服务器的SQL MODE的影响
+ DATETIME和TIMESTAMP相对于int来说有一系列的时间函数可以用

所以一般来说，我比较倾向选择DATETIME，至于你说到索引的问题，选择DATETIME作为索引，
如果碰到大量数据查询慢的情况，也可以分区表解决。

#MySQL多表查询
项目中，需要查询某一数据点的详细信息和所有数据点的数目，需要进行多表查询，最后写成的语句是

    select recordid,datacount From ato_data 
    LEFT JOIN ato_record_info on ato_data.trainid=ato_record_info.trainid 
    WHERE ato_data.trainid = "CCATO01L" AND ato_data.time = "20120905_113012" 
    AND g4 >= -9002 ORDER BY g4 LIMIT 1;

##关于ERROR 1052 (23000): Column 'trainid' in where clause is ambiguous
这是因为多表查询的时候几个表中**同时出现了某个相同的列名**，而在查询条件WHERE后面又没有指定
是那个表，而引起的，又或者是查询结果里面有两个相同的列名，而没有指定是哪个表。使用的时候可以在
mysql查询前面加表名以避免出现错误（比如上面我就加了ato_data前缀，而选则的数据并没有出现重合，
因此可以不必加前缀）

##多表连接 inner join, left join, right join, full join, cross join 
+ inner join:  两表都满足的组合
+ full outer:  两表相同的组合在一起，A表有，B表没有的数据（显示为null）
+ A表 left join B表: 以A表为基础，A表的全部数据，B表有的组合
+ A表 right join B表: 以B表为基础，B表的全部数据，A表的有的组合。

语法[参考这里](http://lhx1026.iteye.com/blog/512776)

囧。。。经过测试，join操作会极大的增大查询时间，对于我这个不是最佳解决方案咯，还是放回到2个
query中去查询了。。。

##发现一个奇怪的事情
查询时，加上LIMIT会缩短时间（一旦数量足够就会自动停止查询，因此时间会缩短），但是对于int类型
的数据，在查询时在数字两边加上引号，例如`recordid="2873"`比不加引号要快的多！，测试代码：

    select recordid  From ato_data WHERE recordid="2873" AND trainid = "CCATO01L"
     AND time = "20120905_115616" ORDER BY recordid LIMIT 1;

真是奇怪。。好吧，经过测试没什么影响，估计是和计算机当时的运行情况相关，但是第一点还是有效的。
