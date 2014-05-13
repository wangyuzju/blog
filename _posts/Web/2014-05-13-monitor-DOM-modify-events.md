---
layout: default
title: 监测DOM内容变化
category: Web
tags: FE
---

开发jquery异步加载插件——asyncModule.js的调试功能的时候，发现append到父元素下的调试dom因为模块内部js调用了父元素的html()方法而被移除，
