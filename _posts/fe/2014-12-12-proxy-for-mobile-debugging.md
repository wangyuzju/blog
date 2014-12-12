---
layout: default
title: 移动端代理请求方案
category: fe
tags: 
---


不同于传统电脑上的代理，可以通过修改 host，使用 switchSharp 等手段方便的映射线上文件到线下，那么移动端上该如何去做这件事情呢？

## HTTP proxy
使用 HTTP proxy，直接代理全部的HTTP请求，然后通过 HTTP proxy server 根据情况去转发请求或者返回待映射的文件

### 优势
只需维护好 server 转发规则即可

### 劣势
全部流量都需要经过 server 转发，如果请求量很大而 server 出口带宽不够的话，速度会是个问题


## PAC（Proxy auto-config）
**代理自动配置**（Proxy auto-config）是一种网页浏览器技术，用于定义浏览器该如何自动选择适当的代理服务器来访问一个网址。一个PAC文件包含一个JavaScript形式的函数`FindProxyForURL(url, host)`。并设置网页服务器将这个文件的MIME类型声明为 `application/x-ns-proxy-autoconfig`, 如下所示：

```
function FindProxyForURL(url, host) {
    if (shExpMatch(url, "http://play.baidu.com/*") ||
            shExpMatch(url, "http://weibo.com/enimo*")) {
        return "DIRECT";
    }
    return "PROXY 172.22.114.19:9527";
}
```

### 优势
不需要全部流量转发，仅仅适配相应的请求

### 劣势
兼容性不是很好，比如有些手机如小米等并不支持 PAC，PAC文件的缓存更新并不由系统控制，而是由浏览器来控制
