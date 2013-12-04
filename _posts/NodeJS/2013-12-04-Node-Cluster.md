  ---
layout: default
title: NodeJS学习笔记 -- cluster
category: nodejs
tags: 
  NodeJS
---

# cluster简介
cluster模块fork出来的进程之间并不会共享数据，实际上每个子work之间都是整个程序重新运算一遍。\n
参考以下文章: 
+ [cluster模块是如何工作的](http://stackoverflow.com/questions/9830741/how-does-the-cluster-module-work-in-node-js)
+ [cluster 模块共享端口的原理](http://onlinevillage.blogspot.com/2011/11/how-nodejs-multiprocess-load-balancing.html)

