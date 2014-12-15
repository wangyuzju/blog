---
layout: default
title:  script 标签的非阻塞加载
category: fe
tags: 
---


浏览器对于 script 的默认处理方式：阻塞并等待加载完毕，然后接着解析后面的html，其时序图如下所示：
![script](http://www.growingwiththeweb.com/images/2014/02/26/script.svg)

如果文件加载速度很慢的话，有没有什么办法能避免出现这种长时间的白屏呢？


## 方法一：动态创建 script 标签
对于动态创建的 script 标签，浏览器会在不阻塞页面执行的同时加载 js 文件，当文件加载完毕之后进行执行，其特点是**动态创建的 JS 执行顺序没有保障**，即同时创建多个 script 标签加载外链 js，先加载完毕的 js 先执行。

## 方法二：async 属性
async 属性的表现类似于动态创建 script 标签，其时序图如下所示：
![script-async](http://www.growingwiththeweb.com/images/2014/02/26/script-async.svg)
使用 async 带来的好处是不阻塞 html 的解析，带来的问题就是这些外链**js 文件不再保持原先的顺序执行**，因此如果有先后依赖的话就会报错。

## 方法三：defer 属性
defer 属性不阻止页面解析的同时，并不立即执行单个加载完毕的 js 文件，而是等页面完成解析并且全部 defer 标签加载完毕之后，再**顺序执行**，使用 defer 带来的好处是既不阻塞页面解析又保证了文件的执行顺序，其时序图如下：
![script-defer](http://www.growingwiththeweb.com/images/2014/02/26/script-defer.svg)


## Reference
+ [async-vs-defer-attributes](http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)
