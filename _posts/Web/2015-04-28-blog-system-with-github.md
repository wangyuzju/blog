---
layout: default
title: 基于 Github 搭建增强版的 jekyll 博客系统
---

Github 的 gh-pages 相信大家都不陌生，使用 jekyll 来实现静态博客系统，代码完全存放在github上，不用担心服务器的配置和迁移问题，
然而相比起 wordpress，纯静态的gh-pages并不能很好的满足需求，比如：

+ 没有搜索功能
+ 没有后台编辑系统
+ 无法上传图片

本文将简单介绍本博客是如何使用前端技术来解决上述问题的。

## 1. 搜索功能
利用jekyll的特性，能将全部文章的标题、tag、category等信息输出成 JSON 数据用于实现基于上述信息的关键字匹配搜索，
然后前端通过 Github 请求上述数据实现搜索，jekyll 代码如下：

![输出搜索数据代码](http://labs.hellofe.com/upload/image/blog/17/8b/6a/268a53cd38c3ee0f096c546418.png)

最终的搜索效果如下图所示：

![搜索效果图](http://labs.hellofe.com/upload/image/blog/8c/d6/08/717c7799ad7296b2329dd79e85.png)


## 2. 文章编辑系统
首先需要进行 Github Oauth 认证来获取权限，点击导航栏左侧 “Gitub 登录” 按钮完成登录之后，可看到编辑按钮

![编辑按钮](http://labs.hellofe.com/upload/image/blog/bf/dd/dd/de99a3f3f46e67cdbfa9ce8974.png)

利用 Github 的API，可以获取到文章的源代码，利用 Octokat , Ace Editor, marked 等开源库，就可以实现一个前端的markdown可视化编辑系统，
效果如下图所示：

![可视化文档编辑](http://labs.hellofe.com/upload/image/blog/d7/c7/2b/345e7c2eff936c30c3dcd6a7e1.png)

这块稍微比较麻烦的是 access_token 的处理，由于 oauth 的特性，需要 server 端请求获取 access_token 之后，再重定向
回博客地址来获取 access_token。

本博客利用 Github API 来更新的效果如下所示：
![保存成功](http://labs.hellofe.com/upload/image/blog/53/26/3c/8dddfc6803d9a1ee48146e05f2.png)

## 3. 图片上传
利用之前实现的基于HTML5的图片粘贴上传工具[http://labs.hellofe.com/image](http://labs.hellofe.com/image)，只需截屏之后，将图片粘贴到网页上，就能自动上传
到服务器并获取外链地址，大大缩短图片处理时间。

+ filters http://jekyllrb.com/docs/templates/
