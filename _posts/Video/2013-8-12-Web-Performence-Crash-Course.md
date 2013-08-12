---
layout: default
category: video
title: 来自google的网站性能优化教程
tags:
- 性能
---
教程视频链接[Critical rendering path](http://www.youtube.com/watch?v=PkOBnYxqj3k&list=PLS3jzvALRSe6uP9gVfXLCG6nWo7M0hAJY&index=4)

#一些笔记
+ HTML文件会一边下载，一边解析并构建DOM树，CSS则不同，只能加载完整之后再进行解析。将CSS文件拆分成几个较小的部分会带来好处，因为可以逐渐的计算和渲染css（尤其是在Mobile上面）
+ 加载的css没有被下载并解析好之前，页面会阻塞，**不会呈现任何内容**。
+ DOM tree和CSSOM tree一起组成Render tree，具有display none属性的元素不会出现在Render tree中。
