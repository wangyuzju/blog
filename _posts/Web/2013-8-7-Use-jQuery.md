---
layout: default
title: jQuery使用笔记
category: web
tags:
- jQuery
---

#offset的坑
对一个隐藏元素使用offset()方法，返回的对象的top值是**页面的滚动值**，没有参考价值。
