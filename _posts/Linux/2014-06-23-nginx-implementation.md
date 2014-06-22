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

## worker
+ `run-loop`是nginx `worker` 中最复杂的部分，通过模块化、事件通知、大量的回调函数和精妙设计的计时器来实现异步操作，当不再有存储空间支持`worker`进程的时候，nginx才会阻塞
+ 不需要创建销毁进程的开销，节省了CPU资源。nginx只监测网络和存储的状态，将新连接加入到`run-loop`中，然后进行异步处理，待该请求处理完成之后释放该连接并将其从`run-loop`中移除。
+ 
