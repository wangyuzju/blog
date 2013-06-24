---
layout: default
title: 学习和使用Github API
tags:
- GitHub
- API
category: web
---
#入门
+ `https://api.github.com/users/wangyuzju`获取wangyuzju的用户信息


#认证
##认证时，请求的权限对应的参数
[参数与权限对应关系](http://developer.github.com/v3/oauth/#scopes)

#学习笔记
##获得指定branch下的内容
查遍github API的说明文档，没有发现GET方法能获取指定分支下的内容。观察获取内容API`https://api.github.com/repos/wangyuzju/blog/contents`返回的内容，发现默认的文件下面会带上`?ref=master`，原来**GitHub通过ref属性**来指定分支返回内容，试了一下`https://api.github.com/repos/wangyuzju/blog/contents?ref=gh-pages`果然可以！

##关于CORS
github大部分api是支持cors的，也就是可以直接GET或者POST获取返回数据，但是在**用户认证这块却是不支持CORS**的。因此需要合理地进行设计，才能实现GitHub的全部API。

**补充**,最初提交`client_id``client_secret``code`(访问`https://github.com/login/oauth/authorize?client_id=bfaa94b476a91ae70830`之后github回调页面时传入的参数code?=XXX)至`https://github.com/login/oauth/access_token`时，是不支持CORS的，因为github API不允许将client_id和client_secret暴露出来，获取access_token这个链接如果支持CORS意味着信息硬编码到JS文件中，都暴露了，因此github**不支持提供access_token页面的CORS调用**，而获得access_token之后，访问其他链接就都支持CORS调用了

**解决办法**： 将oauth的回调处理放到服务器上，利用服务器去验证并获得access_token，然后传给我的博客，再通过access_token完成认证 --！
