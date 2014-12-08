---
layout: default
title: \@media 中 device-width 和 width 的区别
category: Web
tags: css3
---

@media 标签可以说是响应式网页的开发基础，[W3C中的定义看这里](http://www.w3.org/TR/css3-mediaqueries/#media1)。其主要由**媒体类型（Media Type）**和 **媒体特性（Media Query）**两部分组成。

## Media Type
设定后面规则生效的展示类型，包括all（全部）,screen（屏幕）,print（页面打印或打邱预览模式）等等

## Media Query
设定后面规则生效的条件

## 注意事项：

+ width 指的是可视区域的宽度，当页面 scale 被设置成 0.5 时，其值会放大一倍。
+ device-width 是设备实际的宽度，不会随着屏幕的旋转而改变，因此并不适合开发响应式网站。

比如 iphone5s 的屏幕分辨率宽为 640，由于 retina 显示策略，当 scale 设置为1的时候，对应的media 中取到的 width 为320，当 scale 设置为0.5的时候，width为640，而 device-width 始终是320。

## 总结
1. device-width 只和设备的分辨率有关，一般是分辨率/2，且不会随着手机旋转而改变其值
2. width 会和 viewport 的 scale 属性相关，为页面的可视区域的宽度

<div style="color:red">
  Android 某些版本的Webview，screen.width 取到的是设备的物理分辨率，相应的 device-width 也变成了物理分辨率，因此在 Android 平台下面使用 device-width 是一个坑非常多的解决方案（因为统计器 chrome 浏览器又表现正常）。没有任何意义。
</div>
