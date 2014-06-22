---
layout: default
title: nginx实现浅析
category: linux
tags:
- Server
- nginx
---

参考 [The Architecture of Open Source Applications](http://www.aosabook.org/en/) 中对[ngnix](http://aosabook.org/en/nginx.html)的一篇专业文献。

# ngnix 代码结构
nginx会启动多个进程，主要有一个主进程和多个worker进程，还有一些特殊用途的进程：cache loader进程和cache manager进程。在1.x版本中所有上述进程都是单线程的。进程间使用**共享内存**的方式进行通信。

## master 进程负责
+ 读取，验证**配置**
+ 创建、绑定、关闭**socket连接**
+ 启动、终止、维护配置数量的**worker进程**
+ 平滑重配置
+ 平滑升级或者回滚nginx程序
+ 将日志写入新的文件
+ 编译嵌入的perl脚本

## worker
+ 负责处理客户端连接，提供反向代理和过滤功能，及ngnix几乎所有的其他功能，workers是实际上服务器处理日常操作的进程。
+ `run-loop`是nginx `worker` 中最复杂的部分，通过模块化、事件通知、大量的回调函数和精妙设计的计时器来实现异步操作，当不再有存储空间支持`worker`进程的时候，nginx才会阻塞
+ 不需要创建销毁进程的开销，节省了CPU资源。nginx只监测网络和存储的状态，将新连接加入到`run-loop`中，然后进行异步处理，待该请求处理完成之后释放该连接并将其从`run-loop`中移除。
+ 通过创建多个worker来支持多核CPU，创建和CPU核心个数相等的worker来最大化的利用CPU，如果负载类型是**CPU密集型**(如处理大量的TCP/IP, SSL, 压缩等)的，创建和CPU核心个数相等的worker；如果是磁盘IO密集(如提供存储的不同的内容，代理为主等)的，则可以将worker数提高到CPU核心数的1.5~2倍之间

## cache loader
+　负责检查磁盘缓存，将缓存相关数据写入nginx的内存数据库中。
+　为nginx实例提供存储在磁盘上的文件的特殊分配的目录结构，它遍历这些目录，检查缓存文件的信息，更新共享内存中的缓存内容，确定内容是最新、可用的之后退出
+　


## cache manager
是负责缓存的过期和失效，随一般的nginx操作一起常驻在内存中，当出现问题时会被master进程重启

### nginx缓存简介
+ 缓存的数据分层存放，分层和命名细节在通过配置文件指定
+ 缓存数据的key是可配置的, 通过不同的请求参数控制被缓存的内容
+ 缓存**keys和metadata存放在共享内存**中，可被cache loader, cache manager, worker访问
+ 目前不是将内容缓存在内存中，而是通过操作系统的虚拟文件系统的机制优化，将每个缓存的响应存放在不同的文件中(虚拟文件系统)，分层和命名通过配置文件指定，路径和文件名和代理URLMD5后的结果相关
+ 存放缓存内容的规则如下：1). nginx从上游服务器读到的响应内容首先会被写入缓存目录结构外的一个临时文件 2). ngnix**完成请求处理后，重命名该临时文件并移动到缓存目录**中 
+ 可以通过第三方扩展远程管理缓存


