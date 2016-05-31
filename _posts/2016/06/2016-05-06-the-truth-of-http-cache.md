---
layout: default
title: 详解 HTTP 缓存
category: Web
tags:
  - HTTP
---

HTTP协议的缓存逻辑一直让人摸不着头脑，本文将带领你全面了解传说中的HTTP缓存



## 浏览器对缓存的处理行为
主流的打开页面的方式有：

1. 直接地址栏输入
2. 按住F5刷新当前页面
3. 按住Ctrl键刷新当前页面



## HTTP 缓存机制
HTTP缓存机制由两部分组成：文档过期（）和服务器再验证（server revalidation）

## 过期日期和使用期
服务器使用 HTTP/1.0+ 的Expires 首部或 HTTP/1.1 的 Cache-Control: max-age 响应首部来
指定过期日期。两者本质上是一样，但是Cache-Control 使用的是相对日期（秒），因此更倾向于用 Cache-Control。
（Expires 指定的是绝对日期，如果服务器的时间设置不准确，就会出错）


## 服务器再验证
缓存文档过期并不意味着它和原始服务器上的最新文档有实质的区别，需要通过“服务器再验证”来确认原始文档是否发生了变化。

### 用条件方法进行再验证

HTTP 定义了 5 个条件请求头部，都以 `If-` 开头，其中对缓存再验证来说最重要的是下面两个条件首部：

+ `If-Modified-Since: <date>` 可以与 `Last-Modifeid` 响应头配合使用，如果从指定日期之后文档被修改过了，执行请求的方法，
+ `If-None-Match: <tags>` 服务器为文档提供特殊的标签，如果与服务器文档中的标签有所不同，执行请求的方法。

`If-Modified-Since` 具有以下的局限性：

1. 周期性重写某些文档，但是内容没有变化
2. 文档在一秒内发生多次变化，不能准确标注文件的新鲜度
3. 有可能存在服务器没有准确获取资源修改时间，或者与代理服务器时间不一致的情形

因此，HTTP允许被称为实体标签（ETtg）的“版本标识符”进行比较，如果实体标签被修改了，缓存就可以用“If-None-Match” 条件首部来GET文档的新副本。

### Etag 和 Last-Modified 优先级
如果服务器回送了ETag，HTTP/1.1 必须使用 Etag, 

如果HTTP/1.1 服务器同时收到 If-Modified-Since 和 If-None-Match 条件首部，只有两个条件都满足时，才能返回 304 Not Modified 响应。







## Reference
+ [http协议请求响应头中参数的疑问？？](http://zhihu.com/question/22073045/answer/27323420)
+
