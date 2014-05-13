---
layout: default
title: 监测DOM内容改变
category: Web
tags: FE
---

开发jquery异步加载插件asyncModule的调试功能的时候，发现append到目标元素的调试dom会因为调用了父元素的html()方法而被移除掉，因此**需要在调用html()方法之后**，再去插入调试信息dom。

#
