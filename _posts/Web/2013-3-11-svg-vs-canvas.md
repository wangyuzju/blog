---
layout: default
title: SVG和CANVAS的一些比较
category: web
---
昨天去群核公司面试，做的是一个SVG技术相关的插件[raphaeljs](http://raphaeljs.com/)的应用

[全文参考](http://msdn.microsoft.com/zh-tw/library/ie/gg193983\(v=vs.85\).aspx)
#SVG是什么？
SVG 是一种使用 XML 描述 2D 图形的语言。  
SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。您可以为某个元素附加 JavaScript 事件处理器。
在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。
#CANVAS是什么？
Canvas 通过 JavaScript 来绘制 2D 图形。  
Canvas 是逐像素进行渲染的。在 canvas 中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。
如果其**位置发生变化**，那么整个场景也需要**重新绘制**，包括任何或许已被图形覆盖的对象。
#两者的比较
##SVG特点
+ 不依赖分辨率
+ 支持事件处理器
+ 最适合带有大型渲染区域的应用程序（比如谷歌地图）
+ 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）
+ 不适合游戏应用

###SVG应用场景
+ [非常牛逼的demo](http://ie.microsoft.com/testdrive/Graphics/RealWorldDataAndDiagrams/Default.xhtml)
+ 高逼真度文件，比如医学图像等
+ 静态影像（可缩放）

##Canvas特点
+ 依赖分辨率
+ 不支持事件处理器
+ 弱的文本渲染能力
+ 能够以 .png 或 .jpg 格式保存结果图像
+ 最适合图像密集型的游戏，其中的许多对象会被频繁重绘

###Canvas应用场景
+ [一些demo](http://ie.microsoft.com/testdrive/Graphics/RealWorldDataAndDiagrams/Default.xhtml)
+ 高效能（滤镜，光源追踪程序）
+ 非交互即时资料输出
+ 复杂场景，即时运算动画
+ 视讯剪辑

