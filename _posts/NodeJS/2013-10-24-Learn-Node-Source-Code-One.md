---
layout: default
title: NodeJS源码详解——process对象
category: nodejs
tags:
- C++
- NodeJS
---
简单学习了Google的V8之后，决定开始学习NodeJS源代码的一个系列。

# process对象
process对象中的大部分属性都是使用c++实现的，在node.cc(2300-2514)中的`void SetupProcessObject()`函数中定义。process在C++中是一个JS对象(ObjectTemplate类型对象o_tmpl的实例，通过o_tmpl->NewInstance()生成)，并作为参数传入到Node的初始化JS代码中去。

## 核心的process.binding
