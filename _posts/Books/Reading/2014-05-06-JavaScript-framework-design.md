---
layout: default
tags: Reading
title: JavaScript框架设计 读书笔记
doubanID: 25858070
---

# CH01 种子模块

## 1.2 对象扩展
### Object.prototype.keys 方法的简易实现
```
var a = [];
for (a[a.length] in Obj);
return a;
```
直接**在for...in的过程中就把对象的key赋值给了数组**。

## 1.4 类型的判定

## 1.5 domReady
1. 支持DOMContentLoaded事件的直接使用该事件
2. [IE则采用调用doScroll方法是否报错来检测DOM是否构建完成](http://javascript.nwbox.com/IEContentLoaded/)/给script标签添加defer属性（仅仅ie6支持），会在dom构建完后触发readystatechange属性

## 1.6 无冲突处理
执行jQuery库前，将jQuery, $变量缓存到_jQuery, _$变量中，调用$.noConflict()时还原，并真正的jQuery返回便于重命名。


# CH14 动画引擎


## [更多动画相关知识](https://github.com/RubyLouvre/jsbook/issues/67)
+ **css动画的原理**——给元素创建自己layer，而非与页面上大部分的元素共用layer。
+ 
