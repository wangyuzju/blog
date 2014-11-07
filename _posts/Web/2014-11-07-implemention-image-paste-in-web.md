---
layout: default
title: 网页实现复制系统剪切版中图片功能
category: Web
tags: 
---

使用 github 写博客的一个问题就是图片上传不太方便，于是想要做一个自己的图片服务，方便地将剪切板中的图片上传到服务器并返回一个可以使用的外部地址，以方便在博客中插入图片。只要解决了如何在网页中复制图片即可

这篇 [HTML5 JavaScript Pasting Image Data in Chrome](http://strd6.com/2011/09/html5-javascript-pasting-image-data-in-chrome/) 11年的文章就已经做到了，主要是利用了 FileReader 来加载图片内容。

+ [FilerReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)
+ [如何在web应用程序中使用文件](https://developer.mozilla.org/zh-CN/docs/Using_files_from_web_applications)
