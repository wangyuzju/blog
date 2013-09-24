---
layout: default
title: 学习BootStrap3 & Foundation4
category: web
tags:
- BootStrap
---

# 栅格系统
## 启用Grid
添加viewport属性： `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

## 四种Grid 
1. col-xs-*: 全分辨率支持

2. col-sm-*: 分辨率 >= 768

3. col-md-*: 分辨率 >= 992

4. col-lg-*: 分辨率 >= 1200

###原理
  1. 当分辨率满足使用的栅格的条件时，进行栅格布局，否则退化为正常DIV布局(即指定的col-xx-x无效)。由于col-xs支持全分辨率，因此永远会采用栅格布局。
  2. 可以设定多个Grid类，当某一条件不满足时，会check另外的条件，**优先级： lg > md > sm > xs **
