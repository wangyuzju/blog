---
layout: default
title: NodeJS学习笔记 -- cluster
category: nodejs
tags: 
  NodeJS
---

# cluster简介
cluster模块fork出来的进程之间并不会共享数据，实际上每个子work之间都是整个程序重新运算一遍。

参考以下文章: 
+ [cluster模块是如何工作的](http://stackoverflow.com/questions/9830741/how-does-the-cluster-module-work-in-node-js)
+ [cluster 模块共享端口的原理](http://onlinevillage.blogspot.com/2011/11/how-nodejs-multiprocess-load-balancing.html)

## 共享端口原理
Then net.Server.listen checks to see if process.env.NODE_WORKER_ID is set. If so, then the current process is a child created cluster. Instead of trying to start accepting connections on this port, a file handle is requested from the parent process:
调用listen方法的时候，如果检测到当前进程是cluster fork出来的进程，就不是监听这个端口，而是从父进程中请求一个处理句炳

